import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { StatCard } from './StatCard';
import { CourseCard } from './CourseCard';
import { Users, BookOpen, CheckSquare, Award, Calendar, TrendingUp } from 'lucide-react';

interface TutorDashboardProps {
  onLogout: () => void;
}

export function TutorDashboard({ onLogout }: TutorDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tutorStats = [
    { 
      title: 'My Students', 
      value: '124', 
      change: '+12%', 
      icon: Users, 
      gradient: 'from-blue-500 to-cyan-600',
      trend: 'up'
    },
    { 
      title: 'Active Courses', 
      value: '8', 
      change: '+2', 
      icon: BookOpen, 
      gradient: 'from-emerald-500 to-teal-600',
      trend: 'up'
    },
    { 
      title: 'Pending Assignments', 
      value: '42', 
      change: '-8', 
      icon: CheckSquare, 
      gradient: 'from-amber-500 to-orange-600',
      trend: 'down'
    },
    { 
      title: 'Average Rating', 
      value: '4.8', 
      change: '+0.2', 
      icon: Award, 
      gradient: 'from-violet-500 to-purple-600',
      trend: 'up'
    },
  ];

  const myCourses = [
    {
      title: 'Advanced Mathematics',
      instructor: 'You',
      students: 45,
      progress: 75,
      image: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      rating: 4.8,
      duration: '12 weeks'
    },
    {
      title: 'Physics Fundamentals',
      instructor: 'You',
      students: 38,
      progress: 60,
      image: 'bg-gradient-to-br from-purple-400 to-pink-500',
      rating: 4.9,
      duration: '10 weeks'
    },
    {
      title: 'Calculus I',
      instructor: 'You',
      students: 52,
      progress: 85,
      image: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      rating: 4.7,
      duration: '14 weeks'
    },
  ];

  const recentActivities = [
    { action: 'New student enrolled', course: 'Advanced Mathematics', time: '2 hours ago', type: 'enrollment' },
    { action: 'Assignment submitted', course: 'Physics Fundamentals', time: '4 hours ago', type: 'submission' },
    { action: 'Question asked', course: 'Calculus I', time: '6 hours ago', type: 'question' },
    { action: 'Course completed', course: 'Advanced Mathematics', time: '1 day ago', type: 'completion' },
  ];

  const upcomingClasses = [
    { title: 'Advanced Mathematics', time: 'Today, 10:00 AM', students: 45, room: 'Room 301' },
    { title: 'Physics Fundamentals', time: 'Today, 2:00 PM', students: 38, room: 'Room 205' },
    { title: 'Calculus I', time: 'Tomorrow, 11:00 AM', students: 52, room: 'Room 301' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} currentRole="tutor" />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title={activeTab === 'dashboard' ? 'Tutor Dashboard' : 'My Courses'} 
          subtitle={activeTab === 'dashboard' ? 'Welcome back, Professor! Here\'s your teaching overview.' : 'Manage and track your courses'}
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
                  {tutorStats.map((stat, index) => (
                    <StatCard key={stat.title} {...stat} index={index} />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Upcoming Classes */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-blue-500" />
                        Upcoming Classes
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {upcomingClasses.map((class_, index) => (
                        <motion.div
                          key={class_.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ x: 5 }}
                          className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer group"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {class_.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{class_.time}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{class_.students} students</p>
                            <p className="text-xs text-gray-500 mt-1">{class_.room}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Recent Activities */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-violet-500" />
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === 'enrollment' ? 'bg-emerald-500' :
                            activity.type === 'submission' ? 'bg-blue-500' :
                            activity.type === 'question' ? 'bg-amber-500' :
                            'bg-violet-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.course}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* My Courses */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">My Courses</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      Create New Course
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myCourses.map((course, index) => (
                      <CourseCard key={course.title} {...course} index={index} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
