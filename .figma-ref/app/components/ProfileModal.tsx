import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, Award, Star, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  educator: {
    name: string;
    role: string;
    email: string;
    phone: string;
    courses: number;
    rating: number;
    avatar: string;
  };
}

const expertiseTags = [
  'Advanced Mathematics',
  'Calculus',
  'Linear Algebra',
  'Statistics',
  'Research Methods',
  'Curriculum Development',
  'Online Teaching',
  'Student Mentorship',
];

const additionalInfo = {
  location: 'Stanford University, CA',
  experience: '12 years',
  education: 'PhD in Mathematics',
  specialization: 'Computational Mathematics & Data Science',
  publications: '23 Research Papers',
  awards: 'Excellence in Teaching Award 2025',
  availability: 'Available for consultation',
};

export function ProfileModal({ isOpen, onClose, educator }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-br from-violet-500 via-purple-600 to-pink-500 p-8 rounded-t-3xl">
                <motion.button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="relative"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white/30 shadow-2xl">
                      <div className={`w-full h-full ${educator.avatar} flex items-center justify-center text-white text-3xl font-bold`}>
                        {educator.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full border-4 border-white shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  </motion.div>

                  {/* Basic Info */}
                  <div className="flex-1 text-white">
                    <motion.h2
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl font-bold mb-2"
                    >
                      {educator.name}
                    </motion.h2>
                    <motion.p
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-white/90 text-lg mb-4"
                    >
                      {educator.role}
                    </motion.p>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit"
                    >
                      <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                      <span className="font-bold text-lg">{educator.rating}</span>
                      <span className="text-white/80 text-sm">Rating</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Contact Information */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-medium">Email</p>
                        <p className="text-sm text-gray-900 truncate">{educator.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium">Phone</p>
                        <p className="text-sm text-gray-900">{educator.phone}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Professional Details */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-violet-500" />
                      <span>{additionalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Briefcase className="w-4 h-4 text-violet-500" />
                      <span>{additionalInfo.experience} Experience</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <GraduationCap className="w-4 h-4 text-violet-500" />
                      <span>{additionalInfo.education}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Award className="w-4 h-4 text-violet-500" />
                      <span>{educator.courses} Active Courses</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-violet-500" />
                      <span>{additionalInfo.availability}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Expertise Tags */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Expertise Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {expertiseTags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 rounded-full text-sm font-medium border border-violet-200 hover:border-violet-300 transition-colors cursor-pointer"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements & Recognition</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                      <div className="flex items-center gap-3">
                        <Award className="w-6 h-6 text-amber-600" />
                        <div>
                          <p className="font-semibold text-gray-900">{additionalInfo.awards}</p>
                          <p className="text-sm text-gray-600">Recognized for outstanding teaching performance</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-semibold text-gray-900">{additionalInfo.publications}</p>
                          <p className="text-sm text-gray-600">Published in peer-reviewed journals</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3"
                >
                  <motion.button
                    className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Schedule Meeting
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
