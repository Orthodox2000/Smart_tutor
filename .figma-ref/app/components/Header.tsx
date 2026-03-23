import { motion } from 'motion/react';
import { Search, Bell, Plus, LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  onLogout?: () => void;
}

export function Header({ title, subtitle, onLogout }: HeaderProps) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800 border-b border-slate-700/50 px-8 py-6 sticky top-0 z-40 backdrop-blur-lg bg-slate-800/90 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            className="text-3xl font-bold text-slate-100 mb-1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-slate-400"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-80 pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            />
          </motion.div>

          {/* Notifications */}
          <motion.button
            className="relative w-12 h-12 bg-slate-700/50 hover:bg-slate-700 rounded-xl flex items-center justify-center group transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
            <motion.span
              className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* Add New Button */}
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>Add New</span>
          </motion.button>

          {/* Logout Button */}
          {onLogout && (
            <motion.button
              onClick={onLogout}
              className="px-4 py-3 bg-slate-700/50 hover:bg-red-600 text-slate-300 hover:text-white font-medium rounded-xl flex items-center gap-2 transition-all duration-300 border border-slate-600/50 hover:border-red-500"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}