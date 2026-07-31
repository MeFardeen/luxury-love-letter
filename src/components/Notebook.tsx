import { useRef, useCallback, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { notebookPages } from '../data/message';

// Cast because react-pageflip typings might complain with React 19
const FlipBook = HTMLFlipBook as any;

// ── Audio ──────────────────────────────────────────────────────────────────
const pageTurnAudio = typeof window !== 'undefined' ? new Audio('/audio/page-turn.mp3') : null;
if (pageTurnAudio) pageTurnAudio.volume = 0.55;

let lastPlayTime = 0;

function playPageTurn() {
  if (!pageTurnAudio) return;
  const now = Date.now();
  if (now - lastPlayTime < 300) return; // Prevent rapid restarts from state transitions
  lastPlayTime = now;
  
  pageTurnAudio.currentTime = 0;
  pageTurnAudio.play().catch(() => {/* autoplay policy — ignore */});
}

export default function Notebook({ onFinish }: { onFinish: () => void }) {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = notebookPages.length + 1; // plus the close page

  const goNext = () => bookRef.current?.pageFlip().flipNext();
  const goPrev = () => bookRef.current?.pageFlip().flipPrev();

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const onChangeState = useCallback((e: any) => {
    if (e.data === 'flipping' || e.data === 'user_fold') {
      // Play sound immediately when user grabs the page or a flip animation starts
      playPageTurn();
    }
  }, []);

  return (
    <section className="min-h-[100dvh] bg-[#1A000A] flex flex-col items-center justify-center p-4 md:p-8 pb-32 md:pb-36 z-10 relative">
      {/* Notebook Background Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <Sparkles 
            count={120} 
            scale={14} 
            size={3.5} 
            speed={0.3} 
            opacity={0.4} 
            color="#FFF" 
          />
        </Canvas>
      </div>
      
      <div className="relative w-full max-w-[430px] md:max-w-[700px] aspect-[3/4] md:aspect-[4/3] z-10">
        <FlipBook
          width={430}
          height={573}
          size="stretch"
          minWidth={300}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1350}
          maxShadowOpacity={0.35}
          showCover={false}
          usePortrait={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          onChangeState={onChangeState}
          ref={bookRef}
          className="shadow-2xl rounded-r-2xl rounded-l-md overflow-hidden border-l-[16px] border-[#2A0010]"
        >
          {notebookPages.map((text, i) => (
            <div key={i} className="page paper-texture bg-[#F4EFE3] overflow-hidden p-8 md:p-14 flex flex-col justify-center">
              <p className="font-handwritingPrimary text-fluid-handwriting text-charcoal whitespace-pre-wrap leading-[1.7] relative z-10">
                {text}
              </p>
              {i === 7 && (
                <div className="mt-4 mx-auto flex-shrink-0 relative z-10" style={{ width: '40%', maxWidth: '140px' }}>
                  <div className="bg-ivory shadow-md p-1 pb-3 border-t-4 border-champagne" style={{ transform: 'rotate(-3deg)' }}>
                    <img
                      src="/images/image_243c1f.jpg"
                      alt="Memory"
                      className="w-full h-auto object-contain block"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Final page to close */}
          <div className="page paper-texture bg-[#F4EFE3] flex flex-col items-center justify-center p-8">
            <h3 className="font-heading text-fluid-h1 text-oxblood mb-8 text-center drop-shadow-sm">The End</h3>
            <button
              onClick={onFinish}
              className="px-8 py-4 rounded-full bg-oxblood text-champagne font-bodySecondary uppercase tracking-[0.2em] text-xs md:text-sm shadow-xl hover:scale-105 transition-transform"
            >
              Close Notebook
            </button>
          </div>
        </FlipBook>
      </div>
      
      {/* Navigation */}
      <div className="absolute bottom-12 md:bottom-16 left-0 right-0 flex justify-center items-center gap-8 z-20">
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-ivory/80 text-oxblood shadow-lg disabled:opacity-30 backdrop-blur-md transition-opacity"
        >
          ←
        </button>
        <span className="font-heading text-ivory tracking-widest text-sm drop-shadow-md">
          PAGE {currentPage + 1}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages - 1}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-ivory/80 text-oxblood shadow-lg backdrop-blur-md disabled:opacity-30 transition-opacity"
        >
          →
        </button>
      </div>
    </section>
  );
}
