'use client'
import React, { useState, useEffect } from 'react'
import { ArrowLeft, User, Mail, Calendar, MapPin, Phone, Edit, Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface User {
  name: string
  email: string
  image: string
  joinedDate: string
  bio?: string
  location?: string
  phone?: string
}

const UserProfilePage = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setEditForm(parsedUser)
    }
  }, [])

  const handleSave = () => {
    if (editForm) {
      localStorage.setItem('user', JSON.stringify(editForm))
      setUser(editForm)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditForm(user)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof User, value: string) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value })
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-stone-700 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-stone-500" />
          </div>
          <p className="text-stone-400 mb-4">You're not signed in</p>
          <button
            onClick={() => router.push('/auth')}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-900">
      {/* Header */}
      <div className="bg-stone-800 shadow-sm border-b border-stone-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-stone-700 rounded-md transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-stone-400" />
              </button>
              <h1 className="text-2xl font-bold text-stone-100">
                Profile
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-stone-400 hover:bg-stone-700 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-stone-800 rounded-lg shadow-sm border border-stone-700 overflow-hidden">
          {/* Cover & Avatar Section */}
          <div className="relative h-32 bg-gradient-to-r from-stone-600 to-stone-700">
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-stone-800 object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-stone-800 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-16 pb-8 px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-300 mb-2">
                    Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm?.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-stone-700 text-stone-100"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-stone-100">
                      {user.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-300 mb-2">
                    Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-stone-500" />
                    <span className="text-stone-100">
                      {user.email}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-300 mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-stone-500" />
                    <span className="text-stone-100">
                      {new Date(user.joinedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-300 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editForm?.bio || ''}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="w-full px-3 py-2 border border-stone-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-stone-700 text-stone-100 resize-none"
                    />
                  ) : (
                    <p className="text-stone-400">
                      {user.bio || 'No bio available'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-300 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm?.location || ''}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Your location"
                      className="w-full px-3 py-2 border border-stone-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-stone-700 text-stone-100"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-stone-500" />
                      <span className="text-stone-100">
                        {user.location || 'Not specified'}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-300 mb-2">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm?.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Your phone number"
                      className="w-full px-3 py-2 border border-stone-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-stone-700 text-stone-100"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-stone-500" />
                      <span className="text-stone-100">
                        {user.phone || 'Not specified'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
            <h3 className="text-lg font-semibold text-stone-100 mb-2">
              Study Sessions
            </h3>
            <p className="text-3xl font-bold text-stone-400">24</p>
            <p className="text-sm text-stone-500">This month</p>
          </div>
          
          <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
            <h3 className="text-lg font-semibold text-stone-100 mb-2">
              Files Uploaded
            </h3>
            <p className="text-3xl font-bold text-green-600">12</p>
            <p className="text-sm text-stone-500">Total</p>
          </div>
          
          <div className="bg-stone-800 rounded-lg p-6 border border-stone-700">
            <h3 className="text-lg font-semibold text-stone-100 mb-2">
              Community Points
            </h3>
            <p className="text-3xl font-bold text-stone-400">156</p>
            <p className="text-sm text-stone-500">All time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage