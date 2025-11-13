'use client'
import React, { useState, useEffect } from 'react'
import { User, Mail, Calendar, Settings, LogOut, X } from 'lucide-react'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
  isDark?: boolean
}

interface User {
  name: string
  email: string
  image: string
  joinedDate: string
}

const UserProfileCard = ({ isOpen, onClose, isDark = false }: UserProfileProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get user from localStorage (mock data)
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    onClose()
    window.location.href = '/'
  }

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
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Profile Card */}
      <div className={`fixed top-20 right-6 w-80 ${themeClasses.bgPrimary} rounded-lg shadow-lg border ${themeClasses.border} z-50 overflow-hidden`}>
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
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-stone-800 rounded-full"></div>
              </div>
              <div>
                <h4 className={`text-xl font-semibold ${themeClasses.textPrimary}`}>
                  {user.name}
                </h4>
                <p className={`text-sm ${themeClasses.textSecondary}`}>
                  Active now
                </p>
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
              <div className="flex items-center space-x-3">
                <Calendar className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                <span className={`text-sm ${themeClasses.textSecondary}`}>
                  Joined {new Date(user.joinedDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button 
                onClick={() => {
                  window.location.href = '/profile'
                  onClose()
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${themeClasses.hoverBg} transition-colors`}
              >
                <User className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                <span className={`text-sm ${themeClasses.textPrimary}`}>
                  View Profile
                </span>
              </button>
              
              <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${themeClasses.hoverBg} transition-colors`}>
                <Settings className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                <span className={`text-sm ${themeClasses.textPrimary}`}>
                  Settings
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
              <User className={`w-8 h-8 ${themeClasses.textSecondary}`} />
            </div>
            <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>
              You're not signed in
            </p>
            <button
              onClick={() => window.location.href = '/auth'}
              className="w-full px-4 py-2 bg-stone-600 hover:bg-stone-700 dark:bg-stone-600 dark:hover:bg-stone-500 text-white rounded-md transition-colors"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default UserProfileCard