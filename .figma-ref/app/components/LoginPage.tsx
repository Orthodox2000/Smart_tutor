import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Mail, Lock, ArrowRight, Sparkles, Award, Users, Eye, EyeOff, Phone, Chrome, Facebook, Apple } from 'lucide-react';
import { UserRole } from './RoleSelector';

interface LoginPageProps {
  onLogin: (role: UserRole, email: string, password: string) => void;
}

type LoginType = 'tutor' | 'student';
type LoginMethod = 'email' | 'phone';

export function LoginPage({ onLogin }: LoginPageProps) {
  const [loginType, setLoginType] = useState<LoginType>('student');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      if (loginMethod === 'phone') {
        // Use phone number as identifier
        onLogin(loginType, `${countryCode}${phoneNumber}`, password);
      } else {
        onLogin(loginType, email, password);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      onLogin(loginType, `${provider}user@smartiq.com`, 'social-auth');
      setIsLoading(false);
    }, 1500);
  };

  const roleConfig = {
    tutor: {
      title: 'Tutor Portal',
      subtitle: 'Empower minds, shape futures',
      bgColor: 'bg-slate-900',
      accentColor: '#6366f1', // Indigo - unified accent
      accentLight: '#818cf8',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
      ringColor: 'focus:ring-indigo-500',
      textColor: 'text-indigo-600',
      icon: GraduationCap,
      features: ['Manage Your Courses', 'Track Student Progress', 'Create Assignments'],
    },
    student: {
      title: 'Student Portal',
      subtitle: 'Learn, grow, and achieve excellence',
      bgColor: 'bg-slate-900',
      accentColor: '#6366f1', // Indigo - unified accent
      accentLight: '#818cf8',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
      ringColor: 'focus:ring-indigo-500',
      textColor: 'text-indigo-600',
      icon: BookOpen,
      features: ['Access Your Courses', 'Submit Assignments', 'Track Your Progress'],
    },
  };

  const config = roleConfig[loginType];
  const Icon = config.icon;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`hidden lg:flex lg:w-1/2 ${config.bgColor} p-12 flex-col justify-between relative overflow-hidden`}
        style={{
          boxShadow: 'inset -4px 0 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: config.accentColor }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: config.accentLight }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 mb-16"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">SmartIQ</h1>
              <p className="text-white/80 text-sm">Pro Platform</p>
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-6">
            <motion.div
              key={loginType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-white mb-4">{config.title}</h2>
              <p className="text-xl text-white/90">{config.subtitle}</p>
            </motion.div>

            <div className="space-y-4 pt-8">
              {config.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="relative z-10">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-4xl font-bold text-white">2000+</div>
              <div className="text-white/80">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">500+</div>
              <div className="text-white/80">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">4.9★</div>
              <div className="text-white/80">Rating</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full max-w-md"
        >
          {/* Login Type Toggle */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-3 text-center">Select your role</p>
            <div className="grid grid-cols-2 gap-3 p-2 bg-white rounded-2xl shadow-md">
              {(['student', 'tutor'] as LoginType[]).map((type) => {
                const isActive = loginType === type;
                const typeConfig = roleConfig[type];
                return (
                  <motion.button
                    key={type}
                    onClick={() => setLoginType(type)}
                    className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isActive ? 'text-white shadow-lg' : 'text-gray-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeLogin"
                        className={`absolute inset-0 ${typeConfig.buttonColor} rounded-xl`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ boxShadow: `0 4px 12px ${typeConfig.accentColor}40` }}
                      />
                    )}
                    <span className="relative z-10 capitalize">{type}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <motion.div
            key={loginType}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h3>
              <p className="text-gray-600">Sign in to continue your journey</p>
            </div>

            {/* Login Method Tabs */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                {(['email', 'phone'] as LoginMethod[]).map((method) => {
                  const isActive = loginMethod === method;
                  return (
                    <motion.button
                      key={method}
                      type="button"
                      onClick={() => setLoginMethod(method)}
                      className={`relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                        isActive ? 'text-gray-900' : 'text-gray-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeMethod"
                          className="absolute inset-0 bg-white rounded-lg shadow-sm"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {method === 'email' ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                        {method === 'email' ? 'Email' : 'Phone'}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email or Phone Input */}
              <motion.div
                key={loginMethod}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {loginMethod === 'email' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className={`w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 ${config.ringColor} focus:border-transparent transition-all shadow-sm`}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div className="relative w-24">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className={`w-full px-3 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 ${config.ringColor} focus:border-transparent transition-all appearance-none bg-white shadow-sm`}
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+86">🇨🇳 +86</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+33">🇫🇷 +33</option>
                        </select>
                      </div>
                      <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          placeholder="555-123-4567"
                          required
                          className={`w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 ${config.ringColor} focus:border-transparent transition-all shadow-sm`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className={`w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 ${config.ringColor} focus:border-transparent transition-all shadow-sm`}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className={`w-4 h-4 rounded border-gray-300 ${config.textColor.replace('text-', 'text-')} ${config.ringColor} transition-colors`}
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                </label>
                <a href="#" className={`text-sm ${config.textColor} hover:opacity-80 font-medium transition-opacity`}>
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 ${config.buttonColor} text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2`}
                style={{ boxShadow: `0 4px 16px ${config.accentColor}30` }}
                whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${config.accentColor}40` }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <motion.button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Chrome className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Google</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Apple className="w-5 h-5 text-gray-900 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Apple</span>
              </motion.button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <a href="#" className={`${config.textColor} hover:opacity-80 font-semibold transition-opacity`}>
                  Sign up now
                </a>
              </p>
            </div>
          </motion.div>

          {/* Quick Demo Login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-gray-500 mb-2">Quick Demo Access</p>
            <div className="flex gap-2 justify-center text-xs">
              <button
                onClick={() => {
                  setEmail(`demo${loginType}@smartiq.com`);
                  setPassword('demo123');
                }}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Use Demo Credentials
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}