import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  Settings, 
  BarChart3,
  GraduationCap,
  ClipboardList,
  UserPlus,
  Award,
  FileText,
  MessageSquare,
  Bell,
  CreditCard,
  Target,
  Video,
  FolderOpen,
  TrendingUp,
  Shield,
  Star,
  Building2,
  UserCheck,
  BriefcaseBusiness,
  Search,
  HeartHandshake,
  User
} from 'lucide-react';
import { UserRole } from './RoleSelector';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: UserRole;
}

// Define menu items for each role with proper access control
const roleMenuItems: Record<UserRole, { id: string; label: string; icon: typeof LayoutDashboard }[]> = {
  admin: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'educators', label: 'All Educators', icon: Users },
    { id: 'courses', label: 'All Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ],
  tutor: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-courses', label: 'My Courses', icon: BookOpen },
    { id: 'students', label: 'My Students', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'grading', label: 'Grading', icon: Award },
    { id: 'resources', label: 'Resources', icon: FolderOpen },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'My Profile', icon: User },
  ],
  student: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'educators', label: 'Find Tutors', icon: Search },
    { id: 'my-courses', label: 'My Courses', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'grades', label: 'My Grades', icon: Award },
    { id: 'schedule', label: 'Class Schedule', icon: Calendar },
    { id: 'library', label: 'Library', icon: FolderOpen },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ],
  parent: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'children', label: 'My Children', icon: Users },
    { id: 'educators', label: 'View Tutors', icon: GraduationCap },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ],
  hiring: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'educators', label: 'Browse Talent', icon: Search },
    { id: 'shortlisted', label: 'Shortlisted', icon: Star },
    { id: 'interviews', label: 'Interviews', icon: Video },
    { id: 'placements', label: 'Placements', icon: BriefcaseBusiness },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
  ],
};

// Role-specific user info
const roleUserInfo: Record<UserRole, { name: string; initials: string; title: string; gradient: string }> = {
  admin: { name: 'John Doe', initials: 'JD', title: 'System Administrator', gradient: 'from-indigo-500 to-indigo-600' },
  tutor: { name: 'Sarah Johnson', initials: 'SJ', title: 'Mathematics Professor', gradient: 'from-indigo-500 to-indigo-600' },
  student: { name: 'Alex Chen', initials: 'AC', title: 'Computer Science Student', gradient: 'from-indigo-500 to-indigo-600' },
  parent: { name: 'Maria Garcia', initials: 'MG', title: 'Parent - Grade 10', gradient: 'from-indigo-500 to-indigo-600' },
  hiring: { name: 'Robert Smith', initials: 'RS', title: 'HR - Tech Corp', gradient: 'from-indigo-500 to-indigo-600' },
};

export function Sidebar({ activeTab, setActiveTab, currentRole }: SidebarProps) {
  const menuItems = roleMenuItems[currentRole];
  const userInfo = roleUserInfo[currentRole];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-slate-800 border-r border-slate-700/50 h-screen sticky top-0 flex flex-col shadow-2xl"
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">
              SmartIQ
            </h1>
            <p className="text-xs text-slate-400">Pro Platform</p>
          </div>
        </motion.div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive 
                  ? 'text-white shadow-lg shadow-indigo-500/30' 
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <Icon className={`w-5 h-5 relative z-10 transition-transform duration-300 ${
                isActive ? 'scale-110' : 'group-hover:scale-110'
              }`} />
              
              <span className="relative z-10 font-medium">
                {item.label}
              </span>
              
              {!isActive && (
                <motion.div
                  className="absolute inset-0 bg-slate-700/30 rounded-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* User Profile */}
      <motion.div 
        className="p-4 border-t border-slate-700/50"
        whileHover={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer group">
          <motion.div 
            className={`w-10 h-10 bg-gradient-to-br ${userInfo.gradient} rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {userInfo.initials}
          </motion.div>
          <div className="flex-1">
            <p className="font-medium text-sm text-slate-100">{userInfo.name}</p>
            <p className="text-xs text-slate-400">{userInfo.title}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}