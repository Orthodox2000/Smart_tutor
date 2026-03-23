import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Sparkles, BookOpen, Users, Award } from 'lucide-react';

interface SplashScreenProps {
  isOpen: boolean;
}

export function SplashScreen({ isOpen }: SplashScreenProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 z-[100] flex items-center justify-center"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -30, 0],
                  y: [0, -50, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.4, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center">
              {/* Logo container with multiple animations */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  duration: 0.8 
                }}
                className="mb-8 relative"
              >
                {/* Outer rotating ring */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-48 h-48 border-4 border-white/30 rounded-full" />
                </motion.div>

                {/* Middle pulsing ring */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-40 h-40 bg-white/20 rounded-full backdrop-blur-sm" />
                </motion.div>

                {/* Center logo */}
                <motion.div
                  className="relative w-32 h-32 mx-auto bg-white rounded-3xl shadow-2xl flex items-center justify-center"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <GraduationCap className="w-16 h-16 text-violet-600" />
                  </motion.div>

                  {/* Sparkles around logo */}
                  {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                    <motion.div
                      key={angle}
                      className="absolute"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        x: Math.cos((angle * Math.PI) / 180) * 80,
                        y: Math.sin((angle * Math.PI) / 180) * 80,
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Brand name */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-4"
              >
                <h1 className="text-7xl font-bold text-white mb-2 tracking-tight">
                  SmartIQ
                </h1>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="h-1 w-48 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4"
                />
                <p className="text-2xl text-white/90 font-medium">
                  Pro Platform
                </p>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-white/80 text-lg mb-8 max-w-md mx-auto"
              >
                Empowering Education Through Innovation
              </motion.p>

              {/* Feature icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex items-center justify-center gap-8"
              >
                {[
                  { icon: Users, label: 'Educators' },
                  { icon: BookOpen, label: 'Courses' },
                  { icon: Award, label: 'Excellence' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 1.4 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.2 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-white/80 text-sm font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Loading indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="mt-12"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2.5 h-2.5 bg-white rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                <p className="text-white/70 text-sm font-medium">
                  Loading your experience...
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
