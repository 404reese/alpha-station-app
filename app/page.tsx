"use client";

import React from 'react';
import { ArrowRight, BookOpen, Calculator, Code, MessageCircle, Users } from 'lucide-react';
import { AppLayout } from '../components/layout';
import { Spotlight } from '../components/ui/spotlight';

export default function Home() {
  return (
    <AppLayout activePage="Home" showSidebar={false} showFooter={true} showNavbar={false}>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className='h-screen relative'>
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900 to-stone-800">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>

            {/* NEW: Ambient spotlight + orbs */}
            <Spotlight className="pointer-events-none absolute -top-40 -left-32 h-[640px] w-[640px] opacity-40" />
            <Spotlight className="pointer-events-none absolute top-1/4 right-0 h-[520px] w-[520px] opacity-30 blur-2xl"
              fill="rgba(255,140,0,0.35)" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full bg-red-500/10 blur-3xl animate-pulse" />
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center max-w-4xl mx-auto">
            {/* Simple badge */}
            <div className="mb-8">
              <span className="inline-block px-4 py-2 text-sm font-medium text-stone-400 bg-stone-800 rounded-full">
                Academic Platform
              </span>
            </div>

            {/* Clean heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-stone-100 mb-6 tracking-tight">
              Welcome to
              <br />
              <span className="font-medium bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
                OfCampus
              </span>
            </h1>
            <h2 className="text-base md:text-lg lg:text-xl font-light italic text-stone-400 mb-6">
              <span className="font-medium bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
                Formally Class Connect
              </span>
            </h2>

            {/* Simple subtitle */}
            <p className="text-lg md:text-xl text-stone-400 max-w-2xl mb-12 font-light leading-relaxed">
              A simple platform for students to access study materials, tools, and connect with peers.
            </p>

            {/* Minimal CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                onClick={() => window.location.href = "/dashboard"}
              >
                Get Started
              </button>
              
              <button className="px-8 py-3 text-stone-300 border border-stone-600 rounded-lg hover:border-stone-500 hover:bg-stone-800 transition-colors font-medium">
                Learn More
              </button>
            </div>

            {/* Simple feature indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-stone-800 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-stone-400" />
                </div>
                <p className="text-sm text-stone-400 font-medium">Study</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-stone-800 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-stone-400" />
                </div>
                <p className="text-sm text-stone-400 font-medium">Calculate</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-stone-800 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-stone-400" />
                </div>
                <p className="text-sm text-stone-400 font-medium">Code</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-stone-800 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-stone-400" />
                </div>
                <p className="text-sm text-stone-400 font-medium">Connect</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {/* <section className="py-20 bg-stone-900">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-stone-100 mb-16">
              Everything You Need to <span className="text-orange-500">Excel</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
              <div className="bg-stone-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-orange-900 rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-100 mb-4">Study Resources</h3>
                <p className="text-stone-400 mb-6">
                  Access comprehensive notes, question banks, and previous year papers across all subjects and semesters.
                </p>
                <a href="/study" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                  Browse Resources →
                </a>
              </div>

            
              <div className="bg-stone-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-100 mb-4">AI Calculator</h3>
                <p className="text-stone-400 mb-6">
                  Solve complex mathematical problems with our intelligent calculator that shows step-by-step solutions.
                </p>
                <a href="/calculator" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                  Try Calculator →
                </a>
              </div>

           
              <div className="bg-stone-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mb-6">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-100 mb-4">Class Coder</h3>
                <p className="text-stone-400 mb-6">
                  Get coding help, debug programs, and learn programming concepts with AI-powered assistance.
                </p>
                <a href="/coder" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                  Start Coding →
                </a>
              </div>
        
              <div className="bg-stone-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-6">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-100 mb-4">Chat with PDFs</h3>
                <p className="text-stone-400 mb-6">
                  Upload any PDF and have intelligent conversations about its content. Perfect for studying documents.
                </p>
                <a href="/coming-soon" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                  Chat Now →
                </a>
              </div>

             
              <div className="bg-stone-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-red-900 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-100 mb-4">Join Community</h3>
                <p className="text-stone-400 mb-6">
                  Connect with fellow students, share knowledge, and collaborate on academic projects.
                </p>
                <a href="/community" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                  Join Now →
                </a>
              </div>

            
              <div className="bg-stone-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-indigo-900 rounded-lg flex items-center justify-center mb-6">
                  <div className="w-6 h-6 bg-indigo-600 rounded-sm"></div>
                </div>
                <h3 className="text-xl font-semibold text-stone-100 mb-4">Mobile App</h3>
                <p className="text-stone-400 mb-6">
                  Take your learning on the go with our mobile app. Study anywhere, anytime with offline access.
                </p>
                <a href="/coming-soon" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                  Download App →
                </a>
              </div>
            </div>
          </div>
        </section> */}

        {/* Stats Section */}
        <section className="py-20 bg-stone-800">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-stone-100 mb-16">
              Trusted by Students Worldwide
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">10K+</div>
                <div className="text-stone-400">Active Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">5K+</div>
                <div className="text-stone-400">Study Materials</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">100+</div>
                <div className="text-stone-400">Universities</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">50+</div>
                <div className="text-stone-400">Subjects</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students who are already using Class Connect to excel in their studies.
            </p>
            <a 
              href="/study" 
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Start Learning Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}