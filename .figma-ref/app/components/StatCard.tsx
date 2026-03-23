import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  index: number;
}

export function StatCard({ title, value, change, icon: Icon, color, index }: StatCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      {/* Background gradient on hover */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${color}`}
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
      />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-slate-400 text-sm mb-1">{title}</p>
          <motion.h3 
            className="text-3xl font-bold text-slate-100 mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
          >
            {value}
          </motion.h3>
          <motion.div 
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isPositive 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <span>{change}</span>
            <span className="text-slate-500">this month</span>
          </motion.div>
        </div>
        
        <motion.div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color} shadow-lg shadow-indigo-500/30`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}