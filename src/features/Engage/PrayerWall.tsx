import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrayerNote {
  id: string;
  name: string;
  prayer: string;
  x: number;
  y: number;
  color: string;
  rotation: number;
  date: string;
}

const COLORS = [
  'bg-soft-linen',
  'bg-harvest-orange/90',
  'bg-deep-teal/80',
  'bg-midnight-teal border border-soft-linen/20'
];

const TEXT_COLORS = [
  'text-midnight-teal',
  'text-soft-linen',
  'text-soft-linen',
  'text-soft-linen'
];

const BOARD_WIDTH = 2000;
const BOARD_HEIGHT = 1500;

export default function PrayerWall() {
  const [notes, setNotes] = useState<PrayerNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<PrayerNote | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newPrayer, setNewPrayer] = useState('');
  const [newName, setNewName] = useState('');

  const boardRef = useRef<HTMLDivElement>(null);

  // Initialize with some sample prayers
  useEffect(() => {
    const initialNotes: PrayerNote[] = [
      {
        id: '1',
        name: 'Sarah',
        prayer: "Praying for my family's health and guidance in this upcoming year.",
        x: BOARD_WIDTH / 2 - 100,
        y: BOARD_HEIGHT / 2 - 100,
        color: 0,
        rotation: -2,
        date: new Date().toLocaleDateString(),
      },
      {
        id: '2',
        name: 'Michael',
        prayer: 'Thankful for the new job opportunity. Praying for wisdom in my new role.',
        x: BOARD_WIDTH / 2 + 150,
        y: BOARD_HEIGHT / 2 - 50,
        color: 1,
        rotation: 3,
        date: new Date().toLocaleDateString(),
      },
      {
        id: '3',
        name: 'Anonymous',
        prayer: "Please pray for my mother's recovery from surgery.",
        x: BOARD_WIDTH / 2 - 250,
        y: BOARD_HEIGHT / 2 + 100,
        color: 2,
        rotation: -1,
        date: new Date().toLocaleDateString(),
      }
    ].map(n => ({ ...n, color: COLORS[n.color], textColor: TEXT_COLORS[n.color] })) as any;
    
    setNotes(initialNotes);
    
    // Center the board scroll initially
    if (boardRef.current) {
      boardRef.current.scrollLeft = (BOARD_WIDTH - window.innerWidth) / 2;
      boardRef.current.scrollTop = (BOARD_HEIGHT - window.innerHeight) / 2;
    }
  }, []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayer.trim()) return;

    // Randomize position slightly around the center of current view
    const viewCenterX = boardRef.current ? boardRef.current.scrollLeft + window.innerWidth / 2 : BOARD_WIDTH / 2;
    const viewCenterY = boardRef.current ? boardRef.current.scrollTop + window.innerHeight / 2 : BOARD_HEIGHT / 2;
    
    const randomColorIdx = Math.floor(Math.random() * COLORS.length);

    const newNote: PrayerNote = {
      id: Date.now().toString(),
      name: newName.trim() || 'Anonymous',
      prayer: newPrayer.trim(),
      x: viewCenterX - 100 + (Math.random() * 100 - 50),
      y: viewCenterY - 100 + (Math.random() * 100 - 50),
      color: COLORS[randomColorIdx],
      rotation: Math.random() * 10 - 5,
      date: new Date().toLocaleDateString(),
    };

    // Cast because we want to inject textColor dynamically for display purposes
    (newNote as any).textColor = TEXT_COLORS[randomColorIdx];

    setNotes([...notes, newNote]);
    setNewPrayer('');
    setNewName('');
    setIsAdding(false);
  };

  const updateNotePosition = (id: string, newX: number, newY: number) => {
    setNotes(prev => prev.map(note => note.id === id ? { ...note, x: newX, y: newY } : note));
  };

  return (
    <div className="relative w-full h-screen bg-midnight-teal overflow-hidden flex flex-col">
      {/* Subtle texture for the 'wall' */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #E6EDEF 0%, transparent 80%)' }} 
      />

      {/* Header & Controls Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 md:p-10 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] font-bold mb-2 block">
            Engage
          </span>
          <h1 className="text-3xl md:text-5xl text-soft-linen font-serif lowercase tracking-tight" style={{ fontFamily: 'Vogun, serif' }}>
            Prayer Wall
          </h1>
          <p className="text-soft-linen/50 font-sans text-xs md:text-sm mt-2 max-w-sm">
            Drag to pan the wall. Drag cards to move them. Click to read.
          </p>
        </div>
        
        <button
          onClick={() => setIsAdding(true)}
          className="pointer-events-auto flex items-center gap-2 bg-harvest-orange text-midnight-teal px-5 py-3 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-harvest-orange/90 transition-transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Prayer
        </button>
      </div>

      {/* Draggable Board Viewport */}
      <div 
        ref={boardRef}
        className="flex-1 overflow-auto cursor-grab active:cursor-grabbing hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT, position: 'relative' }}>
          
          {/* Notes */}
          {notes.map((note) => {
            const tColor = (note as any).textColor;
            return (
              <motion.div
                key={note.id}
                layoutId={`note-${note.id}`}
                drag
                dragMomentum={false}
                onDragEnd={(e, info) => {
                  updateNotePosition(note.id, note.x + info.offset.x, note.y + info.offset.y);
                }}
                whileDrag={{ scale: 1.05, zIndex: 10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)" }}
                whileHover={{ scale: 1.02, zIndex: 5 }}
                className={`absolute w-56 p-5 rounded-xl cursor-pointer shadow-xl backdrop-blur-sm ${note.color} ${tColor}`}
                style={{ 
                  x: note.x, 
                  y: note.y, 
                  rotate: note.rotation 
                }}
                onClick={(e) => {
                  // Ignore click if it was a drag
                  if (e.defaultPrevented) return;
                  setSelectedNote(note);
                }}
              >
                <div className="font-sans text-xs mb-3 flex justify-between items-center opacity-70">
                  <span className="font-bold uppercase tracking-wider truncate max-w-[100px]">{note.name}</span>
                  <span className="text-[10px]">{note.date}</span>
                </div>
                <p className="font-serif text-sm leading-relaxed line-clamp-4">
                  "{note.prayer}"
                </p>
                
                {/* Visual "Pin" or Tape effect (optional embellishment) */}
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-sm bg-black/10 rotate-[-2deg]`} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-teal/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-midnight-teal border border-soft-linen/10 p-8 rounded-2xl w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setIsAdding(false)}
                className="absolute top-4 right-4 text-soft-linen/50 hover:text-soft-linen transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-3xl text-soft-linen font-serif lowercase tracking-tight mb-6" style={{ fontFamily: 'Vogun, serif' }}>
                Share your prayer
              </h2>
              
              <form onSubmit={handleAddNote} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-soft-linen/50">Your Name (Optional)</label>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Anonymous"
                    className="w-full px-4 py-3 rounded-xl border border-soft-linen/10 bg-soft-linen/5 text-soft-linen font-sans text-sm placeholder:text-soft-linen/30 focus:outline-none focus:border-harvest-orange transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-soft-linen/50">Prayer Request *</label>
                  <textarea
                    required
                    value={newPrayer}
                    onChange={(e) => setNewPrayer(e.target.value)}
                    placeholder="What can we pray for?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-soft-linen/10 bg-soft-linen/5 text-soft-linen font-sans text-sm placeholder:text-soft-linen/30 focus:outline-none focus:border-harvest-orange transition-colors resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 mt-2 rounded-xl bg-harvest-orange text-midnight-teal font-sans text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-harvest-orange/90 transition-colors"
                >
                  Post to Wall
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Note View */}
      <AnimatePresence>
        {selectedNote && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNote(null)}
              className="fixed inset-0 z-40 bg-midnight-teal/60 backdrop-blur-md cursor-pointer"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`note-${selectedNote.id}`}
                className={`w-full max-w-lg p-8 md:p-12 rounded-2xl shadow-2xl pointer-events-auto ${selectedNote.color} ${(selectedNote as any).textColor}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-sans font-bold uppercase tracking-[0.2em] text-sm opacity-70">
                      {selectedNote.name}
                    </h3>
                    <p className="font-sans text-xs opacity-50 mt-1">{selectedNote.date}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedNote(null)}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="font-serif text-xl md:text-2xl leading-relaxed">
                  "{selectedNote.prayer}"
                </p>
                
                {/* Embellishment lines */}
                <div className="mt-8 pt-6 border-t border-current opacity-10 flex justify-between items-center">
                  <span className="font-sans text-[10px] uppercase tracking-widest">Words of Life</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      
      {/* Global style override for hiding scrollbars on webkit just in case */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
