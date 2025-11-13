"use client";
import React, { useState, useEffect } from 'react';
import { AppLayout } from '../../components/layout';
import { useTheme } from '../../components/providers/ThemeProvider';
import TopicsList from './components/TopicsList';
import YouTubePlayer from './components/YouTubePlayer';
import { useSearchParams } from 'next/navigation';

// Type definitions for future database integration
export interface Topic {
  id: string;
  title: string;
  videoId: string;
  duration?: string;
  description?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  name: string;
  modules: Module[];
}

export default function VideoPlayerPage() {
  const { isDark } = useTheme();
  const searchParams = useSearchParams();
  
  // Current video state
  const [currentVideo, setCurrentVideo] = useState<Topic | null>(null);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);

  // Sample data structure (to be replaced with database integration)
  const sampleData: Subject[] = [
    {
      id: "os",
      name: "Operating Systems",
      modules: [
        {
          id: "module1",
          title: "Module 1: Introduction to OS",
          description: "Understanding process states, scheduling and management",
          topics: [
            {
              id: "os-1-1",
              title: "Topic 1: OS Overview",
              videoId: "26QPDBe-NB8",
              duration: "25:30",
              description: "Introduction to Operating Systems concepts"
            },
            {
              id: "os-1-2", 
              title: "Topic 2: Process Management",
              videoId: "4rLW7zg21gI",
              duration: "18:45",
              description: "Understanding process states, scheduling and management"
            },
            {
              id: "os-1-3",
              title: "Topic 3: Memory Management", 
              videoId: "qdkxXygc3rE",
              duration: "22:15",
              description: "Memory allocation and virtual memory concepts"
            },
            {
              id: "os-1-4",
              title: "Topic 4: File Systems",
              videoId: "KN8YgJnShPM",
              duration: "19:30",
              description: "File system structure and operations"
            }
          ]
        },
        {
          id: "module2", 
          title: "Module 2: Concurrency & Scheduling",
          description: "Advanced scheduling algorithms and concurrency control",
          topics: [
            {
              id: "os-2-1",
              title: "Topic 1: Process Scheduling",
              videoId: "EWkQl0n0w5M",
              duration: "28:20",
              description: "CPU scheduling algorithms and their implementation"
            },
            {
              id: "os-2-2",
              title: "Topic 2: Concurrency",
              videoId: "9axbGI6Vta0",
              duration: "24:10",
              description: "Threads, synchronization and parallel processing"
            },
            {
              id: "os-2-3",
              title: "Topic 3: Mutual Exclusion",
              videoId: "J4LVwzBiUIU",
              duration: "21:45",
              description: "Synchronization primitives and deadlock prevention"
            }
          ]
        },
        {
          id: "module3",
          title: "Module 3: Advanced Topics", 
          description: "Distributed systems and security concepts",
          topics: [
            {
              id: "os-3-1",
              title: "Topic 1: Distributed Systems",
              videoId: "ajjOEltiZm4",
              duration: "32:15",
              description: "Distributed computing principles and protocols"
            },
            {
              id: "os-3-2",
              title: "Topic 2: Security & Protection",
              videoId: "InXVVy7zjn4",
              duration: "26:40",
              description: "System security mechanisms and protection models"
            }
          ]
        }
      ]
    },
    {
      id: "dsa",
      name: "Data Structures & Algorithms",
      modules: [
        {
          id: "dsa-module1",
          title: "Module 1: Basic Data Structures",
          description: "Fundamental data structures and their applications",
          topics: [
            {
              id: "dsa-1-1",
              title: "Topic 1: Arrays & Strings",
              videoId: "55l-aZ7_F24",
              duration: "30:25",
              description: "Array operations and string manipulation techniques"
            },
            {
              id: "dsa-1-2",
              title: "Topic 2: Linked Lists",
              videoId: "R9PTBwOzceo",
              duration: "27:15",
              description: "Singly and doubly linked list implementations"
            }
          ]
        }
      ]
    }
  ];

  // Initialize data on component mount
  useEffect(() => {
    // Get subject and topic from URL params (for database integration)
    const subjectParam = searchParams.get('subject') || 'os';
    const topicParam = searchParams.get('topic');
    
    const subject = sampleData.find(s => s.id === subjectParam) || sampleData[0];
    setCurrentSubject(subject);
    
    if (topicParam) {
      // Find the specific topic across all modules
      for (const module of subject.modules) {
        const topic = module.topics.find(t => t.id === topicParam);
        if (topic) {
          setCurrentVideo(topic);
          break;
        }
      }
    } else {
      // Default to first topic of first module
      setCurrentVideo(subject.modules[0]?.topics[0] || null);
    }
  }, [searchParams]);

  const handleTopicSelect = (topic: Topic) => {
    setCurrentVideo(topic);
    // Update URL for deep linking (future database integration)
    const url = new URL(window.location.href);
    url.searchParams.set('topic', topic.id);
    window.history.pushState({}, '', url.toString());
  };

  const themeClasses = {
    // Background colors
    bgPrimary: isDark ? 'bg-stone-900' : 'bg-stone-50',
    bgSecondary: isDark ? 'bg-stone-800' : 'bg-white',
    
    // Text colors
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
  };

  return (
    <AppLayout activePage="Video Player" showFooter={false}>
      <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Left Sidebar - Topics List */}
          <div className={`w-80 ${themeClasses.bgSecondary} border-r border-stone-700 overflow-y-auto`}>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-orange-500 mb-4">
                {currentSubject?.name || 'Loading...'}
              </h2>
              {currentSubject && (
                <TopicsList
                  subject={currentSubject}
                  currentTopic={currentVideo}
                  onTopicSelect={handleTopicSelect}
                  isDark={isDark}
                />
              )}
            </div>
          </div>

          {/* Right Side - Video Player */}
          <div className="flex-1 flex flex-col">
            {currentVideo ? (
              <YouTubePlayer
                topic={currentVideo}
                isDark={isDark}
              />
            ) : (
              <div className={`flex-1 flex items-center justify-center ${themeClasses.bgPrimary}`}>
                <div className="text-center">
                  <h3 className={`text-xl font-medium ${themeClasses.textPrimary} mb-2`}>
                    Select a topic to start watching
                  </h3>
                  <p className={`${themeClasses.textPrimary} opacity-60`}>
                    Choose a video from the topics list on the left
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}