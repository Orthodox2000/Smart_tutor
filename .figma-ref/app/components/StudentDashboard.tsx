import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { StatCard } from './StatCard';
import { CourseCard } from './CourseCard';
import { EducatorCard } from './EducatorCard';
import { ProfileModal } from './ProfileModal';
import { BookOpen, CheckSquare, Award, Clock, Search, Filter } from 'lucide-react';

interface StudentDashboardProps {
  onLogout: () => void;
}

interface Educator {
  name: string;
  role: string;
  email: string;
  phone: string;
  courses: number;
  rating: number;
  avatar: string;
  expertise: string[];
  bio: string;
  experience: string;
  education: string;
}

export function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEducator, setSelectedEducator] = useState<Educator | null>(null);

  const studentStats = [
    { 
      title: 'Enrolled Courses', 
      value: '6', 
      change: '+2', 
      icon: BookOpen, 
      gradient: 'from-violet-500 to-purple-600',
      trend: 'up'
    },
    { 
      title: 'Assignments Due', 
      value: '8', 
      change: '-3', 
      icon: CheckSquare, 
      gradient: 'from-pink-500 to-rose-600',
      trend: 'down'
    },
    { 
      title: 'Average Grade', 
      value: '88%', 
      change: '+5%', 
      icon: Award, 
      gradient: 'from-emerald-500 to-teal-600',
      trend: 'up'
    },
    { 
      title: 'Study Hours', 
      value: '42h', 
      change: '+8h', 
      icon: Clock, 
      gradient: 'from-amber-500 to-orange-600',
      trend: 'up'
    },
  ];

  const enrolledCourses = [
    {
      title: 'Advanced Mathematics',
      instructor: 'Dr. Sarah Johnson',
      students: 45,
      progress: 75,
      image: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      rating: 4.8,
      duration: '12 weeks'
    },
    {
      title: 'Physics Fundamentals',
      instructor: 'Prof. Michael Chen',
      students: 38,
      progress: 60,
      image: 'bg-gradient-to-br from-purple-400 to-pink-500',
      rating: 4.9,
      duration: '10 weeks'
    },
    {
      title: 'Computer Science 101',
      instructor: 'Dr. Emily Davis',
      students: 62,
      progress: 85,
      image: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      rating: 4.7,
      duration: '14 weeks'
    },
  ];

  const availableTutors: Educator[] = [
    { 
      name: 'Dr. Sarah Johnson', 
      role: 'Mathematics Professor', 
      email: 'sarah.j@smartiq.com',
      phone: '+1 (555) 123-4567',
      courses: 8,
      rating: 4.8,
      avatar: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      expertise: ['Calculus', 'Linear Algebra', 'Statistics'],
      bio: 'Passionate mathematics educator with 15+ years of experience in higher education.',
      experience: '15 years',
      education: 'PhD in Mathematics, MIT'
    },
    { 
      name: 'Prof. Michael Chen', 
      role: 'Physics Expert', 
      email: 'michael.c@smartiq.com',
      phone: '+1 (555) 234-5678',
      courses: 6,
      rating: 4.9,
      avatar: 'bg-gradient-to-br from-purple-400 to-pink-500',
      expertise: ['Quantum Physics', 'Thermodynamics', 'Mechanics'],
      bio: 'Dedicated physics professor helping students understand complex concepts.',
      experience: '12 years',
      education: 'PhD in Physics, Stanford'
    },
    { 
      name: 'Dr. Emily Davis', 
      role: 'Computer Science', 
      email: 'emily.d@smartiq.com',
      phone: '+1 (555) 345-6789',
      courses: 10,
      rating: 4.7,
      avatar: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      expertise: ['Algorithms', 'Data Structures', 'AI/ML'],
      bio: 'Innovative CS educator specializing in practical programming skills.',
      experience: '10 years',
      education: 'PhD in Computer Science, Berkeley'
    },
  ];

  const upcomingAssignments = [
    { title: 'Calculus Problem Set 5', course: 'Advanced Mathematics', dueDate: 'Tomorrow', priority: 'high' },
    { title: 'Physics Lab Report', course: 'Physics Fundamentals', dueDate: 'In 3 days', priority: 'medium' },
    { title: 'Algorithm Analysis', course: 'Computer Science 101', dueDate: 'In 5 days', priority: 'low' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} currentRole="student" />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title={
            activeTab === 'dashboard' ? 'Student Dashboard' : 
            activeTab === 'educators' ? 'Find Your Perfect Tutor' :
            'My Courses'
          } 
          subtitle={
            activeTab === 'dashboard' ? 'Welcome back! Continue your learning journey.' :
            activeTab === 'educators' ? 'Explore qualified tutors and enroll in their courses' :
            'Manage your enrolled courses'
          }
          onLogout={onLogout}
        />
        
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {studentStats.map((stat, index) => (
                    <StatCard key={stat.title} {...stat} index={index} />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Upcoming Assignments */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <CheckSquare className="w-6 h-6 text-violet-500" />
                        Upcoming Assignments
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {upcomingAssignments.map((assignment, index) => (
                        <motion.div
                          key={assignment.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ x: 5 }}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group ${
                            assignment.priority === 'high' 
                              ? 'border-rose-200 bg-rose-50/50 hover:bg-rose-50' 
                              : assignment.priority === 'medium'
                              ? 'border-amber-200 bg-amber-50/50 hover:bg-amber-50'
                              : 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50'
                          }`}
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">
                              {assignment.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{assignment.course}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              assignment.priority === 'high' 
                                ? 'bg-rose-100 text-rose-700' 
                                : assignment.priority === 'medium'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {assignment.dueDate}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      View All Assignments
                    </motion.button>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Find Tutors', icon: Search, color: 'from-blue-500 to-cyan-600' },
                        { label: 'My Courses', icon: BookOpen, color: 'from-violet-500 to-purple-600' },
                        { label: 'My Grades', icon: Award, color: 'from-emerald-500 to-teal-600' },
                        { label: 'Schedule', icon: Clock, color: 'from-pink-500 to-rose-600' },
                      ].map((action, index) => {
                        const ActionIcon = action.icon;
                        return (
                          <motion.button
                            key={action.label}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => action.label === 'Find Tutors' && setActiveTab('educators')}
                            className={`w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all`}
                          >
                            <ActionIcon className="w-5 h-5" />
                            <span className="font-medium">{action.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                {/* Enrolled Courses */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">My Enrolled Courses</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('educators')}
                      className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      Browse More Courses
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((course, index) => (
                      <CourseCard key={course.title} {...course} index={index} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'educators' && (
              <motion.div
                key="educators"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Search and Filter */}
                <div className="mb-6 flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tutors by name, subject, or expertise..."
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-all"
                  >
                    <Filter className="w-5 h-5" />
                    <span className="font-medium">Filter</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableTutors.map((tutor, index) => (
                    <EducatorCard
                      key={tutor.email}
                      {...tutor}
                      index={index}
                      onViewProfile={() => setSelectedEducator(tutor)}
                      onShortlist={() => {}}
                      onRequestInterview={() => {}}
                      onEnroll={() => console.log('Enroll clicked for', tutor.name)}
                      onContact={() => console.log('Contact clicked for', tutor.name)}
                      isShortlisted={false}
                      interviewRequested={false}
                      currentUserRole="student"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={!!selectedEducator}
        onClose={() => setSelectedEducator(null)}
        educator={selectedEducator}
      />
    </div>
  );
}
