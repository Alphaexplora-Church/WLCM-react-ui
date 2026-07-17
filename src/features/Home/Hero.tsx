import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

// Canvas-based transparent video renderer.
// Works on ALL browsers (including iOS Safari) by manually removing
// black pixels — no codec or CSS blend-mode dependency.
//
// The black-removal math runs on the GPU via a WebGL fragment shader, not a
// JS pixel loop. A JS loop is O(width*height) on a single CPU thread, so
// raising resolution makes it quadratically slower — that's what caused the
// lag at higher HARD_CAP_DIMENSION values. The shader processes every pixel
// in parallel, so resolution can go much higher before it costs anything
// noticeable. A getImageData/putImageData fallback is kept for the rare
// browser without WebGL.
const HARD_CAP_DIMENSION = 1000;

const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  void main() {
    v_texCoord = vec2((a_position.x + 1.0) / 2.0, (1.0 - a_position.y) / 2.0);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Same brightness threshold/ramp as the original JS pixel loop (40-80 range),
// just evaluated per-pixel on the GPU instead of in a JS for-loop.
const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  uniform sampler2D u_video;
  varying vec2 v_texCoord;
  void main() {
    vec4 color = texture2D(u_video, v_texCoord);
    float brightness = (color.r + color.g + color.b) / 3.0;
    float alpha = clamp((brightness - (40.0 / 255.0)) / (40.0 / 255.0), 0.0, 1.0);
    gl_FragColor = vec4(color.rgb, alpha);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function setupWebGL(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  const positionLoc = gl.getAttribLocation(program, 'a_position');
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  return { program, positionBuffer, positionLoc, texture };
}

function TransparentVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let lastWidth = 0;
    let lastHeight = 0;

    const getTargetSize = () => {
      const nativeW = video.videoWidth || HARD_CAP_DIMENSION;
      const nativeH = video.videoHeight || HARD_CAP_DIMENSION;

      // Target resolution = actual rendered CSS size * device pixel ratio,
      // capped so we never exceed source resolution or the hard cap.
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayMax = Math.max(rect.width, rect.height) * dpr || HARD_CAP_DIMENSION;
      const targetMax = Math.min(HARD_CAP_DIMENSION, displayMax, Math.max(nativeW, nativeH));

      const scale = targetMax / Math.max(nativeW, nativeH);
      return { width: Math.round(nativeW * scale), height: Math.round(nativeH * scale) };
    };

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    }) as WebGLRenderingContext | null;

    const webglSetup = gl ? setupWebGL(gl) : null;

    let processFrame: () => void;

    if (gl && webglSetup) {
      const { program, positionBuffer, positionLoc, texture } = webglSetup;

      processFrame = () => {
        if (video.readyState < video.HAVE_CURRENT_DATA) return;

        const { width, height } = getTargetSize();
        if (width !== lastWidth || height !== lastHeight) {
          canvas.width = width;
          canvas.height = height;
          lastWidth = width;
          lastHeight = height;
          gl.viewport(0, 0, width, height);
        }

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };
    } else {
      // Fallback: CPU pixel loop for browsers without WebGL support.
      const ctx2d = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx2d) return;

      processFrame = () => {
        if (video.readyState < video.HAVE_CURRENT_DATA) return;

        const { width, height } = getTargetSize();
        if (width !== lastWidth || height !== lastHeight) {
          canvas.width = width;
          canvas.height = height;
          lastWidth = width;
          lastHeight = height;
        }

        ctx2d.drawImage(video, 0, 0, width, height);

        const frame = ctx2d.getImageData(0, 0, width, height);
        const data = frame.data;

        for (let i = 0; i < data.length; i += 4) {
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (brightness < 40) {
            data[i + 3] = 0;
          } else if (brightness < 80) {
            data[i + 3] = Math.round(((brightness - 40) / 40) * 255);
          }
        }

        ctx2d.putImageData(frame, 0, 0);
      };
    }

    const supportsVfc = typeof video.requestVideoFrameCallback === 'function';

    const loop = () => {
      if (!runningRef.current) return;
      processFrame();
      if (supportsVfc) {
        // Only re-processes when the video actually has a new frame,
        // instead of on every display refresh (avoids redundant work at 60-120Hz)
        video.requestVideoFrameCallback(loop);
      } else {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const start = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      if (supportsVfc) {
        video.requestVideoFrameCallback(loop);
      } else {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const stop = () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };

    // Pause processing entirely when the hero scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
          start();
        } else {
          video.pause();
          stop();
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Pause when the tab is backgrounded
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        stop();
      } else if (canvas.getBoundingClientRect().top < window.innerHeight) {
        video.play().catch(() => { });
        start();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    video.addEventListener('play', start);
    video.play().catch(() => { });

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.removeEventListener('play', start);
      stop();
      if (gl && webglSetup) {
        gl.deleteProgram(webglSetup.program);
        gl.deleteBuffer(webglSetup.positionBuffer);
        gl.deleteTexture(webglSetup.texture);
      }
    };
  }, []);

  return (
    <>
      {/* Hidden video element — just used as pixel source */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{ display: 'none' }}
        crossOrigin="anonymous"
      />
      {/* Canvas renders the video with black pixels stripped */}
      <canvas ref={canvasRef} className={className} />
    </>
  );
}

export default function Hero() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative px-4 sm:px-6 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img

          alt="Welcome Background"
          className="w-full h-full object-cover blur-[6px] scale-105 grayscale-[30%] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-teal/40 via-deep-teal/80 to-deep-teal" />
      </div>

      {/* LOGO LOCKUP CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center z-20 w-full max-w-5xl mx-auto mt-10 md:mt-16"
      >
        <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-12 lg:gap-16 mb-2 md:mb-4">
          <span className="font-sans text-soft-linen font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase">
            Estd
          </span>

          {/* CENTRAL VIDEO/LOGO CONTAINER */}
          <div className="relative w-60 sm:w-64 md:w-80 lg:w-96 aspect-square flex items-center justify-center">

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[150%] h-[150%] bg-soft-linen rounded-full blur-[40px] md:blur-[60px] z-0 pointer-events-none"
            />

            {/* Canvas-based transparent video — works on iOS Safari, Android, and all browsers */}
            <TransparentVideo
              src="https://res.cloudinary.com/ldbgnurm/video/upload/v1784180515/tree_k8icru.mp4"
              className="relative z-10 w-full h-full object-contain scale-[1.8] md:scale-[1.8]"
            />
          </div>

          <span className="font-sans text-soft-linen font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase">
            2002
          </span>
        </div>

        <div className="text-center w-full">
          <h1 className="font-serif text-[2.75rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] leading-[1] text-soft-linen tracking-tighter lowercase">
            WORDS OF LIFE
          </h1>
          <p className="font-sans text-soft-linen uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[12px] sm:text-[14px] md:text-[18px] mt-2 sm:mt-4 md:mt-6 font-semibold">
            christian ministries inc.
          </p>
        </div>
      </motion.div>

      {/* --- SCROLL INDICATOR REMOVED HERE --- */}

    </section>
  );
}