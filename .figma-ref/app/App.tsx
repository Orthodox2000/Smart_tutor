import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoginPage } from './components/LoginPage';
import { TutorDashboard } from './components/TutorDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { EducatorCard } from './components/EducatorCard';
import { CourseCard } from './components/CourseCard';
import { RoleSelector, UserRole } from './components/RoleSelector';
import { ProfileModal } from './components/ProfileModal';
import { SplashScreen } from './components/SplashScreen';
import { getEducatorPageTitle, getEducatorPageSubtitle, getRolePermissions } from './utils/rolePermissions';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';

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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEducator, setSelectedEducator] = useState<Educator | null>(null);
  const [shortlistedEducators, setShortlistedEducators] = useState<Set<string>>(new Set());
  const [interviewRequests, setInterviewRequests] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (role: UserRole, email: string, password: string) => {
    // In a real app, you would validate credentials here
    console.log('Login attempt:', { role, email });
    setCurrentRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentRole('admin');
    setActiveTab('dashboard');
  };

  // If not authenticated, show login page (after splash screen)
  if (!isAuthenticated && !isLoading) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show separate dashboards for Tutor and Student
  if (isAuthenticated && (currentRole === 'tutor' || currentRole === 'student')) {
    return (
      <>
        <SplashScreen isOpen={isLoading} />
        {!isLoading && (
          <>
            {currentRole === 'tutor' && <TutorDashboard onLogout={handleLogout} />}
            {currentRole === 'student' && <StudentDashboard onLogout={handleLogout} />}
          </>
        )}
      </>
    );
  }

  const handleShortlist = (email: string) => {
    setShortlistedEducators(prev => {
      const newSet = new Set(prev);
      if (newSet.has(email)) {
        newSet.delete(email);
      } else {
        newSet.add(email);
      }
      return newSet;
    });
  };

  const handleInterviewRequest = (email: string) => {
    setInterviewRequests(prev => {
      const newSet = new Set(prev);
      newSet.add(email);
      return newSet;
    });
  };

  // Data for Admin, Parent, and Hiring roles
  const stats = [
    { 
      title: 'Total Educators', 
      value: '248', 
      change: '+12%', 
      icon: Users, 
      gradient: 'from-indigo-500 to-indigo-600',
      trend: 'up'
    },
    { 
      title: 'Active Courses', 
      value: '124', 
      change: '+8%', 
      icon: BookOpen, 
      gradient: 'from-indigo-500 to-indigo-600',
      trend: 'up'
    },
    { 
      title: 'Enrollment Rate', 
      value: '89%', 
      change: '+5%', 
      icon: TrendingUp, 
      gradient: 'from-indigo-500 to-indigo-600',
      trend: 'up'
    },
    { 
      title: 'Success Rate', 
      value: '94%', 
      change: '+3%', 
      icon: Award, 
      gradient: 'from-indigo-500 to-indigo-600',
      trend: 'up'
    },
  ];

  const educators: Educator[] = [
    { 
      name: 'Dr. Sarah Johnson', 
      role: 'Mathematics Professor', 
      email: 'sarah.j@smartiq.com',
      phone: '+1 (555) 123-4567',
      courses: 8,
      rating: 4.8,
      avatar: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
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
      avatar: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
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
      avatar: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      expertise: ['Algorithms', 'Data Structures', 'AI/ML'],
      bio: 'Innovative CS educator specializing in practical programming skills.',
      experience: '10 years',
      education: 'PhD in Computer Science, Berkeley'
    },
    { 
      name: 'Prof. James Wilson', 
      role: 'Chemistry Specialist', 
      email: 'james.w@smartiq.com',
      phone: '+1 (555) 456-7890',
      courses: 7,
      rating: 4.6,
      avatar: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      expertise: ['Organic Chemistry', 'Biochemistry', 'Lab Techniques'],
      bio: 'Experienced chemistry professor with a focus on hands-on learning.',
      experience: '14 years',
      education: 'PhD in Chemistry, Harvard'
    },
    { 
      name: 'Dr. Maria Garcia', 
      role: 'Literature & Arts', 
      email: 'maria.g@smartiq.com',
      phone: '+1 (555) 567-8901',
      courses: 5,
      rating: 4.9,
      avatar: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      expertise: ['Creative Writing', 'Literary Analysis', 'Poetry'],
      bio: 'Award-winning author and educator passionate about literary arts.',
      experience: '11 years',
      education: 'PhD in Literature, Yale'
    },
    { 
      name: 'Prof. David Lee', 
      role: 'Business & Economics', 
      email: 'david.l@smartiq.com',
      phone: '+1 (555) 678-9012',
      courses: 9,
      rating: 4.8,
      avatar: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      expertise: ['Finance', 'Marketing', 'Entrepreneurship'],
      bio: 'Former CEO turned educator, bringing real-world experience to the classroom.',
      experience: '18 years',
      education: 'MBA, Wharton School'
    },
  ];

  const courses = [
    {
      title: 'Advanced Mathematics',
      instructor: 'Dr. Sarah Johnson',
      students: 45,
      progress: 75,
      image: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      rating: 4.8,
      duration: '12 weeks',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    {
      title: 'Physics Fundamentals',
      instructor: 'Prof. Michael Chen',
      students: 38,
      progress: 60,
      image: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      rating: 4.9,
      duration: '10 weeks',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    {
      title: 'Computer Science 101',
      instructor: 'Dr. Emily Davis',
      students: 62,
      progress: 85,
      image: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      rating: 4.7,
      duration: '14 weeks',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    {
      title: 'Organic Chemistry',
      instructor: 'Prof. James Wilson',
      students: 34,
      progress: 55,
      image: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      rating: 4.6,
      duration: '11 weeks',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    {
      title: 'Creative Writing',
      instructor: 'Dr. Maria Garcia',
      students: 28,
      progress: 70,
      image: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      rating: 4.9,
      duration: '8 weeks',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    {
      title: 'Business Strategy',
      instructor: 'Prof. David Lee',
      students: 51,
      progress: 80,
      image: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      rating: 4.8,
      duration: '13 weeks',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
  ];

  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Welcome back! Here\'s what\'s happening today.' };
      case 'educators':
        return { title: getEducatorPageTitle(currentRole), subtitle: getEducatorPageSubtitle(currentRole) };
      case 'courses':
        return { title: 'Courses', subtitle: 'Browse and manage all available courses.' };
      default:
        return { title: 'Dashboard', subtitle: 'Welcome back! Here\'s what\'s happening today.' };
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} currentRole={currentRole} />
      
      <div className="flex-1 overflow-auto">
        <Header {...getHeaderInfo()} />
        
        <main className="p-8">
          {/* Role Selector */}
          <RoleSelector currentRole={currentRole} onRoleChange={setCurrentRole} />

          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <StatCard key={stat.title} {...stat} index={index} />
                  ))}
                </div>

                {/* Quick Overview Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Recent Educators */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-slate-100">Top Educators</h2>
                      <motion.button
                        className="text-indigo-400 text-sm font-medium hover:text-indigo-300"
                        whileHover={{ x: 5 }}
                      >
                        View All →
                      </motion.button>
                    </div>
                    <div className="space-y-4">
                      {educators.slice(0, 3).map((educator, index) => (
                        <motion.div
                          key={educator.email}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ x: 5, backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
                          className="flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer"
                        >
                          <div className={`w-12 h-12 rounded-xl ${educator.avatar} flex items-center justify-center text-white font-semibold shadow-lg`}>
                            {educator.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-100">{educator.name}</p>
                            <p className="text-sm text-slate-400">{educator.role}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-indigo-400">{educator.courses}</p>
                            <p className="text-xs text-slate-500">Courses</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Active Courses */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-slate-100">Popular Courses</h2>
                      <motion.button
                        className="text-indigo-400 text-sm font-medium hover:text-indigo-300"
                        whileHover={{ x: 5 }}
                      >
                        View All →
                      </motion.button>
                    </div>
                    <div className="space-y-4">
                      {courses.slice(0, 3).map((course, index) => (
                        <motion.div
                          key={course.title}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ x: 5, backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
                          className="flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer"
                        >
                          <div className={`w-12 h-12 rounded-xl ${course.color} flex items-center justify-center shadow-lg`}>
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-100 line-clamp-1">{course.title}</p>
                            <p className="text-sm text-slate-400">{course.students} students</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-emerald-400">{course.progress}%</p>
                            <p className="text-xs text-slate-500">Complete</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {educators.map((educator, index) => (
                  <EducatorCard 
                    key={educator.email} 
                    {...educator} 
                    index={index} 
                    onViewProfile={() => setSelectedEducator(educator)}
                    onShortlist={() => handleShortlist(educator.email)}
                    onRequestInterview={() => handleInterviewRequest(educator.email)}
                    onEnroll={() => console.log('Enroll clicked for', educator.name)}
                    onContact={() => console.log('Contact clicked for', educator.name)}
                    isShortlisted={shortlistedEducators.has(educator.email)}
                    interviewRequested={interviewRequests.has(educator.email)}
                    currentUserRole={currentRole}
                  />
                ))}
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {courses.map((course, index) => (
                  <CourseCard key={course.title} {...course} index={index} />
                ))}
              </motion.div>
            )}

            {!['dashboard', 'educators', 'courses'].includes(activeTab) && (
              <motion.div
                key="coming-soon"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center h-96"
              >
                <div className="text-center">
                  <motion.div
                    className="w-32 h-32 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-700/50 shadow-2xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-2">Coming Soon</h3>
                  <p className="text-slate-400">This section is under development</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Profile Modal */}
      {selectedEducator && (
        <ProfileModal
          isOpen={!!selectedEducator}
          onClose={() => setSelectedEducator(null)}
          educator={selectedEducator}
        />
      )}

      {/* Splash Screen */}
      <SplashScreen isOpen={isLoading} />
    </div>
  );
}