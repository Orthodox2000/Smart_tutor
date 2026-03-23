import { motion } from 'motion/react';
import { Users, Clock, TrendingUp, BookOpen } from 'lucide-react';

interface CourseCardProps {
  title: string;
  instructor: string;
  students: number;
  duration: string;
  progress: number;
  category: string;
  color: string;
  index: number;
}

export function CourseCard({
  title,
  instructor,
  students,
  duration,
  progress,
  category,
  color,
  index
}: CourseCardProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, rotateX: -15 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 group cursor-pointer"
    >
      {/* Header with gradient */}
      <motion.div
        className={`h-32 bg-gradient-to-br ${color} relative overflow-hidden`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute bottom-4 left-4 right-4">
          <motion.div
            className="inline-block px-3 py-1 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-lg text-xs font-semibold text-slate-200"
            whileHover={{ scale: 1.1 }}
          >
            {category}
          </motion.div>
        </div>
        <div className="absolute top-4 right-4">
          <motion.div
            className="w-12 h-12 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-xl flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <BookOpen className="w-6 h-6 text-indigo-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className="text-lg font-bold text-slate-100 mb-2 line-clamp-2"
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>
        <p className="text-sm text-slate-400 mb-4">by {instructor}</p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Course Progress</span>
            <span className="text-xs font-semibold text-indigo-400">{progress}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <motion.div
            className="flex items-center gap-1 group/item"
            whileHover={{ scale: 1.1 }}
          >
            <Users className="w-4 h-4 text-indigo-400 group-hover/item:scale-125 transition-transform" />
            <span>{students}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1 group/item"
            whileHover={{ scale: 1.1 }}
          >
            <Clock className="w-4 h-4 text-indigo-400 group-hover/item:scale-125 transition-transform" />
            <span>{duration}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1 group/item ml-auto"
            whileHover={{ scale: 1.1 }}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Active</span>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.button
          className="mt-4 w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Manage Course
        </motion.button>
      </div>
    </motion.div>
  );
}