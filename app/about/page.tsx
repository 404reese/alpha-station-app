"use client";

import React from 'react';
import { Target, Heart, Users, Code, Lightbulb, ArrowLeft, Github, Linkedin, Mail } from 'lucide-react';
import { Spotlight } from '../../components/ui/spotlight';
import Link from 'next/link';
import { Footer } from '@/components/layout';

export default function About() {
  const developers = [
    {
      name: "404reese",
      role: "Lead Developer & Founder",
      description: "Full-stack developer passionate about democratizing education through technology.",
      github: "https://github.com/404reese",
      linkedin: "#",
      email: "contact@404reese.dev"
    }
    // Add more developers here as the team grows
  ];

  const contributors = [
    {
      name: "Open Source Community",
      contribution: "Bug reports, feature suggestions, and code contributions",
      type: "Community"
    },
    {
      name: "Beta Testers",
      contribution: "Early testing and feedback on new features",
      type: "Testing"
    },
    {
      name: "Content Contributors",
      contribution: "Educational resources and study materials",
      type: "Content"
    }
    // Add specific contributors as they join
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-800">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <Spotlight className="pointer-events-none absolute -top-40 -left-32 h-[640px] w-[640px] opacity-40" />
      <Spotlight className="pointer-events-none absolute top-1/4 right-0 h-[520px] w-[520px] opacity-30 blur-2xl"
        fill="rgba(255,140,0,0.35)" />
      
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full bg-red-500/10 blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="pt-8 px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-300 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <Users className="h-16 w-16 text-stone-400 mx-auto mb-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-stone-100 mb-6 tracking-tight">
              About 
              <span className="font-medium bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                {" "}OfCampus
              </span>
            </h1>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed">
              A non-profit initiative dedicated to making quality education accessible to every student, everywhere.
            </p>
          </div>
          
          {/* Core Developers Section */}
<div className="mb-16">
            <h2 className="text-3xl font-semibold text-stone-100 mb-8 text-center flex items-center justify-center gap-3">
              <Code className="h-8 w-8 text-stone-400" />
              Core Developers
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developers.map((developer, index) => (
                <div key={index} className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700/50">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">
                        {developer.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-stone-100">{developer.name}</h3>
                    <p className="text-stone-400 text-sm">{developer.role}</p>
                  </div>
                  
                  <p className="text-stone-300 text-sm mb-4 text-center leading-relaxed">
                    {developer.description}
                  </p>
                  
                  <div className="flex justify-center gap-3">
                    {developer.github && (
                      <a 
                        href={developer.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-stone-700 hover:bg-stone-600 rounded-lg transition-colors"
                      >
                        <Github className="h-4 w-4 text-stone-300" />
                      </a>
                    )}
                    {developer.linkedin && developer.linkedin !== "#" && (
                      <a 
                        href={developer.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-stone-700 hover:bg-stone-600 rounded-lg transition-colors"
                      >
                        <Linkedin className="h-4 w-4 text-stone-300" />
                      </a>
                    )}
                    {developer.email && (
                      <a 
                        href={`mailto:${developer.email}`}
                        className="p-2 bg-stone-700 hover:bg-stone-600 rounded-lg transition-colors"
                      >
                        <Mail className="h-4 w-4 text-stone-300" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contributors Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-stone-100 mb-8 text-center flex items-center justify-center gap-3">
              <Users className="h-8 w-8 text-stone-400" />
              Contributors & Community
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {contributors.map((contributor, index) => (
                <div key={index} className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700/50">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-stone-700 text-stone-300 text-xs rounded-full mb-3">
                      {contributor.type}
                    </span>
                    <h3 className="text-lg font-semibold text-stone-100">{contributor.name}</h3>
                  </div>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    {contributor.contribution}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="bg-stone-800/30 backdrop-blur-sm rounded-xl p-6 border border-stone-700/30 text-center">
              <h3 className="text-xl font-semibold text-stone-100 mb-4">Want to Contribute?</h3>
              <p className="text-stone-300 mb-6 max-w-2xl mx-auto">
                We welcome contributions from developers, designers, educators, and students. 
                Whether it's code, content, bug reports, or feature suggestions - every contribution helps make OfCampus better.
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  href="/contribute" 
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium"
                >
                  Support the Project
                </Link>
                <a 
                  href="https://github.com/404reese/classconnect-v3.3" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-stone-700 text-stone-200 rounded-lg hover:bg-stone-600 transition-colors font-medium flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
          {/* Vision & Mission Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-8 border border-stone-700/50">
              <h2 className="text-2xl font-semibold text-stone-100 mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-stone-400" />
                Our Vision
              </h2>
              
              <p className="text-stone-300 leading-relaxed mb-4">
                To create a world where every student has access to high-quality educational resources, 
                regardless of their economic background or geographical location.
              </p>
              
              <p className="text-stone-400 leading-relaxed">
                We envision a future where education is truly democratized, where learning is collaborative, 
                and where technology serves as a bridge to knowledge rather than a barrier.
              </p>
            </div>

            <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-8 border border-stone-700/50">
              <h2 className="text-2xl font-semibold text-stone-100 mb-6 flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-stone-400" />
                Our Mission
              </h2>
              
              <div className="space-y-3">
                <div className="border-l-2 border-orange-500 pl-4">
                  <p className="text-stone-300 text-sm font-medium">Accessibility</p>
                  <p className="text-stone-400 text-sm">Provide free, high-quality educational resources to all students</p>
                </div>
                
                <div className="border-l-2 border-orange-500 pl-4">
                  <p className="text-stone-300 text-sm font-medium">Innovation</p>
                  <p className="text-stone-400 text-sm">Leverage cutting-edge technology to enhance learning experiences</p>
                </div>
                
                <div className="border-l-2 border-orange-500 pl-4">
                  <p className="text-stone-300 text-sm font-medium">Community</p>
                  <p className="text-stone-400 text-sm">Foster collaborative learning and knowledge sharing</p>
                </div>
                
                <div className="border-l-2 border-orange-500 pl-4">
                  <p className="text-stone-300 text-sm font-medium">Impact</p>
                  <p className="text-stone-400 text-sm">Create measurable positive impact on educational outcomes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Non-Profit Information */}
          <div className="bg-gradient-to-r from-stone-800/70 to-stone-700/70 backdrop-blur-sm rounded-xl p-8 border border-stone-600/50 mb-16">
            <h2 className="text-3xl font-semibold text-stone-100 mb-6 flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-400" />
              We Are Non-Profit
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium text-stone-200 mb-4">Our Commitment</h3>
                <p className="text-stone-300 leading-relaxed mb-4">
                  OfCampus operates as a non-profit initiative. Every contribution we receive goes directly 
                  towards improving the platform, maintaining our infrastructure, and expanding our reach.
                </p>
                <p className="text-stone-400 leading-relaxed">
                  We believe education should be free and accessible. Our commitment is to keep OfCampus 
                  completely free for students worldwide, forever.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-stone-200 mb-4">Transparency</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-300 text-sm">100% of donations go towards platform development and maintenance</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-300 text-sm">Open source codebase for complete transparency</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-300 text-sm">Regular updates on how funds are utilized</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-300 text-sm">No advertisements or data selling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Developers Section */}
          

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-stone-100 mb-4">Get in Touch</h2>
            <p className="text-stone-400 mb-6 max-w-2xl mx-auto">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="mailto:hello@ofcampus.org" 
                className="flex items-center gap-2 px-4 py-2 bg-stone-700 text-stone-200 rounded-lg hover:bg-stone-600 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </a>
              <a 
                href="https://github.com/404reese/classconnect-v3.3/discussions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-stone-700 text-stone-200 rounded-lg hover:bg-stone-600 transition-colors"
              >
                <Github className="h-4 w-4" />
                Discussions
              </a>
            </div>
          </div>
          
        </div>
        <Footer isDark/>
      </div>
    </div>
  );
}