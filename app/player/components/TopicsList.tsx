import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Clock } from 'lucide-react';
import type { Subject, Module, Topic } from '../page';

interface TopicsListProps {
  subject: Subject;
  currentTopic: Topic | null;
  onTopicSelect: (topic: Topic) => void;
  isDark: boolean;
}

const TopicsList: React.FC<TopicsListProps> = ({ 
  subject, 
  currentTopic, 
  onTopicSelect, 
  isDark 
}) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(subject.modules.map(m => m.id)) // Expand all modules by default
  );

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const themeClasses = {
    // Background colors
    bgSecondary: isDark ? 'bg-stone-800' : 'bg-white',
    bgTertiary: isDark ? 'bg-stone-700' : 'bg-stone-100',
    bgQuaternary: isDark ? 'bg-stone-600' : 'bg-stone-50',
    bgActive: isDark ? 'bg-orange-900/30' : 'bg-orange-100',
    
    // Text colors
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    textSubtle: isDark ? 'text-stone-500' : 'text-stone-500',
    
    // Border colors
    borderPrimary: isDark ? 'border-stone-700' : 'border-stone-200',
    borderSecondary: isDark ? 'border-stone-600' : 'border-stone-100',
    
    // Hover states
    hoverBg: isDark ? 'hover:bg-stone-700' : 'hover:bg-stone-50',
    hoverBgSecondary: isDark ? 'hover:bg-stone-600' : 'hover:bg-stone-200',
  };

  return (
    <div className="space-y-3">
      {subject.modules.map((module) => {
        const isExpanded = expandedModules.has(module.id);
        
        return (
          <div key={module.id} className={`${themeClasses.bgTertiary} rounded-lg border ${themeClasses.borderPrimary}`}>
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className={`w-full px-4 py-3 flex items-center justify-between ${themeClasses.hoverBg} rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50`}
            >
              <div className="flex items-center space-x-3">
                {isExpanded ? (
                  <ChevronDown className={`w-4 h-4 ${themeClasses.textMuted}`} />
                ) : (
                  <ChevronRight className={`w-4 h-4 ${themeClasses.textMuted}`} />
                )}
                <div className="text-left">
                  <h4 className={`font-medium ${themeClasses.textPrimary} text-sm`}>
                    {module.title}
                  </h4>
                  <p className={`${themeClasses.textMuted} text-xs mt-1 line-clamp-2`}>
                    {module.description}
                  </p>
                </div>
              </div>
              <div className={`text-xs ${themeClasses.textSubtle} bg-orange-500/10 px-2 py-1 rounded-full`}>
                {module.topics.length} topics
              </div>
            </button>

            {/* Topics List */}
            {isExpanded && (
              <div className="px-2 pb-3 space-y-1">
                {module.topics.map((topic, index) => {
                  const isActive = currentTopic?.id === topic.id;
                  
                  return (
                    <button
                      key={topic.id}
                      onClick={() => onTopicSelect(topic)}
                      className={`w-full p-3 rounded-md text-left transition-all duration-200 group ${
                        isActive 
                          ? `${themeClasses.bgActive} border-l-4 border-orange-500` 
                          : `${themeClasses.hoverBgSecondary} hover:border-l-4 hover:border-orange-300`
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 ${
                          isActive 
                            ? 'bg-orange-500 text-white' 
                            : `${themeClasses.bgQuaternary} ${themeClasses.textMuted} group-hover:bg-orange-500 group-hover:text-white`
                        } transition-colors`}>
                          <Play className="w-3 h-3" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h5 className={`font-medium text-sm ${
                            isActive ? 'text-orange-600' : themeClasses.textPrimary
                          } line-clamp-2 group-hover:text-orange-600 transition-colors`}>
                            {topic.title}
                          </h5>
                          
                          {topic.description && (
                            <p className={`${themeClasses.textMuted} text-xs mt-1 line-clamp-2`}>
                              {topic.description}
                            </p>
                          )}
                          
                          {topic.duration && (
                            <div className={`flex items-center space-x-1 mt-2 ${themeClasses.textSubtle} text-xs`}>
                              <Clock className="w-3 h-3" />
                              <span>{topic.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TopicsList;