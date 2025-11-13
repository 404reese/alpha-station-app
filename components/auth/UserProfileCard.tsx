'use client'
import React from 'react'
import { User as UserIcon, Mail, Calendar, Settings, LogOut, X, Shield, GraduationCap, BookOpen } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
  isDark?: boolean
}

const UserProfileCard = ({ isOpen, onClose, isDark = false }: UserProfileProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user?.firstName) {
      return user.firstName;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const getRoleBadge = () => {
    const roleConfig = {
      superadmin: { icon: Shield, label: 'Super Admin', color: 'text-red-500 bg-red-500/10' },
      teacher: { icon: BookOpen, label: 'Teacher', color: 'text-blue-500 bg-blue-500/10' },
      student: { icon: GraduationCap, label: 'Student', color: 'text-green-500 bg-green-500/10' }
    };
    return roleConfig[user?.role || 'student'];
  };

  const role = getRoleBadge();

  const themeClasses = {
    bgPrimary: isDark ? 'bg-stone-800' : 'bg-white',
    bgSecondary: isDark ? 'bg-stone-700' : 'bg-stone-50',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-600',
    border: isDark ? 'border-stone-600' : 'border-stone-200',
    hoverBg: isDark ? 'hover:bg-stone-600' : 'hover:bg-stone-100',
  }

  if (!isOpen) return null

  return (
    <div 
      data-profile-card
      className={`fixed top-20 right-6 w-80 ${themeClasses.bgPrimary} rounded-lg shadow-2xl border ${themeClasses.border} z-50 overflow-hidden`}
    >
        {/* Header */}
        <div className={`${themeClasses.bgSecondary} px-6 py-4 border-b ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
              Profile
            </h3>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg ${themeClasses.hoverBg} transition-colors`}
            >
              <X className={`w-4 h-4 ${themeClasses.textSecondary}`} />
            </button>
          </div>
        </div>

        {user ? (
          <div className="p-6">
            {/* User Info */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-3">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-stone-800 rounded-full"></div>
                </div>
                <div>
                  <h4 className={`text-xl font-semibold ${themeClasses.textPrimary}`}>
                    {getUserDisplayName()}
                  </h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Active now
                  </p>
                </div>
              </div>
              
              {/* Role Badge */}
              <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full ${role.color}`}>
                <role.icon className="w-4 h-4" />
                <span className="text-xs font-medium">{role.label}</span>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Mail className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                <span className={`text-sm ${themeClasses.textSecondary}`}>
                  {user.email}
                </span>
              </div>
              {user.lastLogin && (
                <div className="flex items-center space-x-3">
                  <Calendar className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                  <span className={`text-sm ${themeClasses.textSecondary}`}>
                    Last login: {new Date(user.lastLogin).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button 
                onClick={() => {
                  router.push('/profile');
                  onClose();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${themeClasses.hoverBg} transition-colors`}
              >
                <UserIcon className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                <span className={`text-sm ${themeClasses.textPrimary}`}>
                  View Profile
                </span>
              </button>
              
              <button 
                onClick={() => {
                  const dashboardRoute = user.role === 'superadmin' ? '/admin' : user.role === 'teacher' ? '/dashboard' : '/student';
                  router.push(dashboardRoute);
                  onClose();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${themeClasses.hoverBg} transition-colors`}
              >
                <Settings className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                <span className={`text-sm ${themeClasses.textPrimary}`}>
                  Dashboard
                </span>
              </button>
              
              <hr className={`my-3 border ${themeClasses.border}`} />
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">
                  Sign Out
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className={`w-16 h-16 mx-auto mb-4 ${themeClasses.bgSecondary} rounded-full flex items-center justify-center`}>
              <UserIcon className={`w-8 h-8 ${themeClasses.textSecondary}`} />
            </div>
            <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>
              You're not signed in
            </p>
            <button
              onClick={() => {
                router.push('/login');
                onClose();
              }}
              className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
  )
}

export default UserProfileCard