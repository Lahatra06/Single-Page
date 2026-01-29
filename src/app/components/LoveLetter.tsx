import { motion } from 'motion/react';
import { useState } from 'react';
import { Heart, HeartCrack } from 'lucide-react';

interface LoveLetterProps {
  isVisible: boolean;
  onResponse: (answer: 'yes' | 'no') => void;
}

export function LoveLetter({ isVisible, onResponse }: LoveLetterProps) {
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  const handleAnswer = (response: 'yes' | 'no') => {
    setAnswer(response);
    setAnswered(true);
    onResponse(response);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Envelope effect */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-rose-200/50 relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-rose-200/30 to-transparent rounded-br-full" />
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-rose-200/30 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-rose-200/30 to-transparent rounded-tr-full" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-rose-200/30 to-transparent rounded-tl-full" />

          {/* Letter content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative z-10"
          >
            {!answered ? (
              <>
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="inline-block text-6xl mb-4"
                  >
                    💕
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-serif text-rose-900 mb-2">
                    Mon Amour
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
                </div>

                <div className="space-y-4 text-rose-950/90 leading-relaxed font-serif text-base md:text-lg">
                  <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-rose-600 first-letter:mr-1 first-letter:float-left">
                    Chaque battement de mon cœur murmure ton nom, chaque étoile dans le ciel
                    reflète l'éclat de ton sourire. Tu es la mélodie qui enchante mes jours,
                    la lumière qui illumine mes nuits.
                  </p>

                  <p>
                    Dans tes yeux, j'ai trouvé un univers infini où je veux me perdre pour
                    toujours. Ton rire est la plus douce des symphonies, et ta présence, le
                    plus précieux des cadeaux.
                  </p>

                  <p>
                    Je t'aime au-delà des mots, au-delà du temps. Tu es mon aujourd'hui,
                    mon demain, mon toujours. Avec toi, chaque instant devient une éternité
                    de bonheur.
                  </p>

                  <p className="text-center italic pt-4">
                    Tu es mon rêve devenu réalité,<br />
                    mon soleil après la pluie,<br />
                    mon éternelle raison d'aimer.
                  </p>

                  <div className="text-center pt-6">
                    <p className="text-2xl font-serif text-rose-700">
                      Je t'aime infiniment 💖
                    </p>
                  </div>
                </div>

                {/* Signature */}
                <div className="mt-8 text-right">
                  <p className="text-xl font-serif text-rose-800 italic">
                    Pour toujours tien/tienne,
                  </p>
                  <p className="text-2xl font-serif text-rose-900 mt-2">
                    Ton/Ta admirateur/admiratrice secret(e)
                  </p>
                </div>

                {/* Response buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="mt-12 pt-8 border-t-2 border-rose-200/50"
                >
                  <p className="text-center text-rose-900 font-serif text-xl mb-6">
                    Veux-tu partager cette aventure avec moi ? ✨
                  </p>
                  <div className="flex gap-4 justify-center">
                    <motion.button
                      onClick={() => handleAnswer('yes')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow font-serif text-lg"
                    >
                      <Heart className="w-5 h-5" fill="currentColor" />
                      Oui, mille fois oui !
                    </motion.button>
                    <motion.button
                      onClick={() => handleAnswer('no')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow font-serif text-lg"
                    >
                      <HeartCrack className="w-5 h-5" />
                      Non, désolé(e)
                    </motion.button>
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                {answer === 'yes' ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.8 }}
                      className="text-9xl mb-6"
                    >
                      🎉
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4">
                      Tu me rends si heureux/heureuse !
                    </h2>
                    <p className="text-xl md:text-2xl text-rose-700 font-serif mb-6">
                      C'est le début de notre belle histoire... 💖
                    </p>
                    <div className="space-y-3 text-rose-800">
                      <p className="text-lg italic">Notre amour brillera comme mille étoiles</p>
                      <p className="text-lg italic">Chaque jour sera une nouvelle aventure</p>
                      <p className="text-lg italic">Ensemble, pour toujours ✨</p>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.8 }}
                      className="text-9xl mb-6"
                    >
                      💔
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif text-gray-700 mb-4">
                      Je comprends...
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 font-serif mb-6">
                      Même si cela me brise le cœur
                    </p>
                    <div className="space-y-3 text-gray-700">
                      <p className="text-lg italic">Je respecte ton choix</p>
                      <p className="text-lg italic">Mon amour restera sincère</p>
                      <p className="text-lg italic">Tu resteras toujours dans mon cœur 🌹</p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Floating particles inside letter */}
          {!answered && Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-rose-300/40 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}