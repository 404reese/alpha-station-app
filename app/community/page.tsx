"use client";

import React from 'react';
import { Rocket, MessageCircle, ExternalLink, Users } from 'lucide-react';
import { AppLayout } from '../../components/layout';
import { useTheme } from '../../components/providers/ThemeProvider';

export default function CommunityPage() {
  const { isDark } = useTheme();

  const themeClasses = {
    // Background colors
    bgPrimary: isDark ? 'bg-stone-900' : 'bg-stone-50',
    bgSecondary: isDark ? 'bg-stone-800' : 'bg-white',
    bgTertiary: isDark ? 'bg-stone-700' : 'bg-stone-100',
    
    // Text colors
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    
    // Border colors
    borderPrimary: isDark ? 'border-stone-700' : 'border-stone-200',
    borderSecondary: isDark ? 'border-stone-600' : 'border-stone-100',
  };

  const communityLinks = [
    {
      name: 'Discord',
      description: 'Join our Discord server for real-time discussions, study groups, and community support',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
        </svg>
      ),
      color: 'bg-indigo-500 hover:bg-indigo-600',
      textColor: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      url: 'https://discord.gg/your-server-id', // Replace with actual Discord invite link
      buttonText: 'Join Discord'
    },
    {
      name: 'WhatsApp',
      description: 'Connect with fellow students and get quick updates through our WhatsApp community',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      url: 'https://chat.whatsapp.com/your-group-invite', // Replace with actual WhatsApp group invite link
      buttonText: 'Join WhatsApp'
    }
  ];

  return (
    <AppLayout activePage="Join Community" showFooter={true}>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-orange-500">Join Community</h1>
              <p className={`text-sm ${themeClasses.textMuted} mt-1`}>
                Connect with your peers
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className={`${themeClasses.bgSecondary} rounded-lg border ${themeClasses.borderPrimary} p-8 shadow-lg`}>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-light ${themeClasses.textPrimary} mb-4`}>
                Join Our
                <br />
                <span className="font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Student Community
                </span>
              </h2>
              <p className={`text-lg ${themeClasses.textSecondary} max-w-2xl mx-auto leading-relaxed`}>
                Connect with thousands of students, share knowledge, get help with studies, and stay updated with the latest announcements.
              </p>
            </div>

            {/* Community Links */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {communityLinks.map((link, index) => (
                <div
                  key={index}
                  className={`${themeClasses.bgTertiary} border ${themeClasses.borderSecondary} rounded-xl p-6 hover:shadow-lg transition-all duration-200`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${link.bgColor} border ${link.borderColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <div className={link.textColor}>
                        {link.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-2`}>
                        {link.name}
                      </h3>
                      <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                        {link.description}
                      </p>
                      
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-4 py-2 ${link.color} text-white rounded-lg transition-colors duration-200 font-medium text-sm`}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {link.buttonText}
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderSecondary} rounded-lg p-6 max-w-2xl mx-auto`}>
                <h3 className={`text-lg font-medium ${themeClasses.textPrimary} mb-3`}>
                  Community Guidelines
                </h3>
                <div className={`text-sm ${themeClasses.textSecondary} space-y-2`}>
                  <p>• Be respectful and helpful to fellow students</p>
                  <p>• Share knowledge and resources freely</p>
                  <p>• Keep discussions academic and constructive</p>
                  <p>• No spam or promotional content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}