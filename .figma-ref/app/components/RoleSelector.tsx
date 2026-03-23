import { motion } from 'motion/react';
import { User, GraduationCap, Briefcase, Users, Shield } from 'lucide-react';

export type UserRole = 'admin' | 'tutor' | 'student' | 'parent' | 'hiring';

interface RoleSelectorProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roles: { id: UserRole; label: string; icon: typeof User; color: string; description: string }[] = [
  { 
    id: 'admin', 
    label: 'Admin', 
    icon: Shield, 
    color: 'from-indigo-500 to-indigo-600',
    description: 'Full system access'
  },
  { 
    id: 'tutor', 
    label: 'Tutor', 
    icon: GraduationCap, 
    color: 'from-indigo-500 to-indigo-600',
    description: 'Teaching & course management'
  },
  { 
    id: 'student', 
    label: 'Student', 
    icon: User, 
    color: 'from-indigo-500 to-indigo-600',
    description: 'Learning & courses'
  },
  { 
    id: 'parent', 
    label: 'Parent', 
    icon: Users, 
    color: 'from-indigo-500 to-indigo-600',
    description: 'Monitor child progress'
  },
  { 
    id: 'hiring', 
    label: 'Hiring', 
    icon: Briefcase, 
    color: 'from-indigo-500 to-indigo-600',
    description: 'Recruitment & placement'
  },
];

export function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 shadow-2xl mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Switch Role View</p>
          <p className="text-sm text-slate-300">Experience the platform from different perspectives</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = currentRole === role.id;
          
          return (
            <motion.button
              key={role.id}
              onClick={() => onRoleChange(role.id)}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive ? 'text-white shadow-xl shadow-indigo-500/30 ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-slate-800' : 'text-slate-400 hover:bg-slate-700/50'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeRole"
                  className={`absolute inset-0 bg-gradient-to-br ${role.color} rounded-xl`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'scale-110' : ''}`} />
              <div className="relative z-10 text-center">
                <div className="font-semibold">{role.label}</div>
                <div className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                  {role.description}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}