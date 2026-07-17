import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

// Canvas-based transparent video renderer.
// Works on ALL browsers (including iOS Safari) by manually removing
// black pixels frame-by-frame — no codec or CSS blend-mode dependency.
function TransparentVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const render = () => {
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        canvas.width = video.videoWidth || 512;
        canvas.height = video.videoHeight || 512;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;

        // Remove dark/black pixels — threshold tuned for near-black backgrounds
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r + g + b) / 3;
          if (brightness < 40) {
            data[i + 3] = 0; // fully transparent
          } else if (brightness < 80) {
            // Soft edge anti-aliasing
            data[i + 3] = Math.round(((brightness - 40) / 40) * 255);
          }
        }

        ctx.putImageData(frame, 0, 0);
      }
      rafRef.current = requestAnimationFrame(render);
    };

    video.addEventListener('play', () => {
      rafRef.current = requestAnimationFrame(render);
    });

    video.play().catch(() => { });

    return () => {
      cancelAnimationFrame(rafRef.current);
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