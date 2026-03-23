import { motion } from 'motion/react';
import { Mail, Phone, Award, Star, Heart, UserCheck, MessageSquare, BookOpen } from 'lucide-react';
import { UserRole } from './RoleSelector';
import { getRolePermissions } from '../utils/rolePermissions';

interface EducatorCardProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  courses: number;
  rating: number;
  avatar: string;
  index: number;
  onViewProfile: () => void;
  onShortlist: () => void;
  onRequestInterview: () => void;
  onEnroll?: () => void;
  onContact?: () => void;
  isShortlisted: boolean;
  interviewRequested: boolean;
  currentUserRole: UserRole;
}

export function EducatorCard({ 
  name, 
  role, 
  email, 
  phone, 
  courses, 
  rating, 
  avatar,
  index,
  onViewProfile,
  onShortlist,
  onRequestInterview,
  onEnroll,
  onContact,
  isShortlisted,
  interviewRequested,
  currentUserRole
}: EducatorCardProps) {
  const permissions = getRolePermissions(currentUserRole);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ y: -10 }}
      className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 group cursor-pointer relative overflow-hidden"
    >
      {/* Gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      
      {/* Shortlisted Badge */}
      {isShortlisted && permissions.canShortlist && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 z-20 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg shadow-indigo-500/30"
        >
          <Heart className="w-3 h-3 fill-white" />
          Shortlisted
        </motion.div>
      )}

      {/* Interview Requested Badge */}
      {interviewRequested && permissions.canRequestInterview && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 z-20 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg shadow-emerald-500/30"
        >
          <UserCheck className="w-3 h-3" />
          Interview Requested
        </motion.div>
      )}
      
      <div className="relative z-10">
        {/* Avatar and Rating */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-slate-700 shadow-lg">
              <div className={`w-full h-full ${avatar} flex items-center justify-center text-white text-xl font-bold`}>
                {name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <motion.div
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-slate-800"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            />
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full"
            whileHover={{ scale: 1.1 }}
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-amber-400">{rating}</span>
          </motion.div>
        </div>

        {/* Info */}
        <motion.h3 
          className="text-lg font-bold text-slate-100 mb-1"
          whileHover={{ x: 5 }}
        >
          {name}
        </motion.h3>
        <p className="text-sm text-indigo-400 font-medium mb-4">{role}</p>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <motion.div 
            className="flex items-center gap-2 text-sm text-slate-400 group/item"
            whileHover={{ x: 5 }}
          >
            <Mail className="w-4 h-4 text-indigo-400 group-hover/item:scale-125 transition-transform" />
            <span className="truncate">{email}</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 text-sm text-slate-400 group/item"
            whileHover={{ x: 5 }}
          >
            <Phone className="w-4 h-4 text-indigo-400 group-hover/item:scale-125 transition-transform" />
            <span>{phone}</span>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          className="flex items-center gap-2 mb-4 pt-4 border-t border-slate-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <Award className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-medium text-slate-100">{courses} Courses</span>
        </motion.div>

        {/* Role-based Action Buttons */}
        <div className="space-y-2">
          {/* View Profile - Available to all roles */}
          <motion.button
            onClick={onViewProfile}
            className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Profile
          </motion.button>
          
          {/* Hiring Role - Shortlist and Interview */}
          {permissions.canShortlist && permissions.canRequestInterview && (
            <div className="flex gap-2">
              <motion.button
                onClick={onShortlist}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  isShortlisted
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-white' : ''}`} />
                {isShortlisted ? 'Shortlisted' : 'Shortlist'}
              </motion.button>
              
              <motion.button
                onClick={onRequestInterview}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  interviewRequested
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={interviewRequested}
              >
                <UserCheck className="w-4 h-4" />
                {interviewRequested ? 'Requested' : 'Interview'}
              </motion.button>
            </div>
          )}

          {/* Student Role - Enroll in Courses */}
          {permissions.canEnroll && onEnroll && (
            <motion.button
              onClick={onEnroll}
              className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BookOpen className="w-4 h-4" />
              Enroll in Courses
            </motion.button>
          )}

          {/* Contact Button - For Parent, Student, Admin */}
          {(currentUserRole === 'parent' || currentUserRole === 'student' || currentUserRole === 'admin') && onContact && (
            <motion.button
              onClick={onContact}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 text-slate-300 text-sm font-medium rounded-xl hover:bg-slate-700 hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquare className="w-4 h-4" />
              Contact Tutor
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}