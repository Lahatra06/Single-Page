import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Heart, Sparkles as SparklesIcon } from 'lucide-react';
import { FloatingHearts } from '@/app/components/FloatingHearts';
import { Sparkles } from '@/app/components/Sparkles';
import { LoveLetter } from '@/app/components/LoveLetter';
import { ConfettiExplosion } from '@/app/components/ConfettiExplosion';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export default function App() {
  const [letterRevealed, setLetterRevealed] = useState(false);
  const [heartBeats, setHeartBeats] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [response, setResponse] = useState<'yes' | 'no' | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    // Show hint after a few seconds
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleHeartClick = async () => {
    setHeartBeats((prev) => prev + 1);

    // Animate heart
    await controls.start({
      scale: [1, 1.3, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 },
    });

    // After 3 clicks, reveal the letter
    if (heartBeats >= 2) {
      setTimeout(() => {
        setLetterRevealed(true);
      }, 500);
    }
  };

  const handleResponse = (answer: 'yes' | 'no') => {
    setResponse(answer);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-rose-300 via-pink-200 to-orange-200" />
      
      {/* Background image with overlay */}
      <div className="fixed inset-0 opacity-30">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1618137551367-f444a9cfe8a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHN1bnNldCUyMHBpbmslMjBza3l8ZW58MXx8fHwxNzY5NDk1OTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Romantic sunset"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated elements */}
      <FloatingHearts />
      <Sparkles count={30} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 drop-shadow-lg">
            Pour Toi
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-2xl text-white/90 font-light tracking-wide drop-shadow-md"
          >
            Un message du cœur t'attend...
          </motion.p>
        </motion.div>

        {/* Interactive heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="relative mb-8"
        >
          <motion.button
            onClick={handleHeartClick}
            animate={controls}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative group cursor-pointer focus:outline-none"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-rose-400/50 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Heart */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart
                className="w-32 h-32 md:w-40 md:h-40 relative z-10"
                fill="#ff1744"
                stroke="#ffffff"
                strokeWidth={2}
              />
            </motion.div>

            {/* Progress indicator */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i < heartBeats
                      ? 'bg-white scale-110 shadow-lg'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.button>
        </motion.div>

        {/* Hint text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showHint ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="text-center mt-16"
        >
          <motion.p
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-white text-lg md:text-xl font-light flex items-center gap-2 justify-center drop-shadow-lg"
          >
            <SparklesIcon className="w-5 h-5" />
            Clique sur le cœur pour révéler le secret...
            <SparklesIcon className="w-5 h-5" />
          </motion.p>
          {heartBeats > 0 && heartBeats < 3 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/80 mt-4 text-sm"
            >
              Encore {3 - heartBeats} fois... 💖
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Love Letter Modal */}
      <LoveLetter isVisible={letterRevealed} onResponse={handleResponse} />

      {/* Confetti for Yes response */}
      {response === 'yes' && <ConfettiExplosion />}

      {/* Decorative elements when letter is revealed */}
      {letterRevealed && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -100],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
              >
                {Math.random() > 0.5 ? '💝' : '✨'}
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}