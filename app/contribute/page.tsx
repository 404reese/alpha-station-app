"use client";

import React from 'react';
import { Heart, DollarSign, Server, Database, Zap, Coffee, ArrowLeft, Copy } from 'lucide-react';
import { Spotlight } from '../../components/ui/spotlight';
import Link from 'next/link';
import { Footer } from '@/components/layout';
import Image from 'next/image';

export default function Contribute() {
  const [copiedUPI, setCopiedUPI] = React.useState(false);

  const UPI_ID = "reese@upi"; 

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

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
              <Heart className="h-16 w-16 text-stone-400 mx-auto mb-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-stone-100 mb-6 tracking-tight">
              Support 
              <span className="font-medium bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                {" "}OfCampus
              </span>
            </h1>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Help us keep OfCampus free and accessible for all students. Your contribution directly supports our mission to democratize education.
            </p>
          </div>

          {/* Why We Need Support Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-8 border border-stone-700/50">
              <h2 className="text-2xl font-semibold text-stone-100 mb-6 flex items-center gap-3">
                <Server className="h-6 w-6 text-stone-400" />
                Our Costs
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Database className="h-5 w-5 text-stone-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-stone-200">Cloud Storage</h3>
                    <p className="text-stone-400 text-sm">Storing study materials, videos, and user data securely</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Server className="h-5 w-5 text-stone-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-stone-200">Hosting & Infrastructure</h3>
                    <p className="text-stone-400 text-sm">Reliable servers to keep the platform running 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-stone-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-stone-200">API Calls & Services</h3>
                    <p className="text-stone-400 text-sm">YouTube API, AI features, and third-party integrations</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-stone-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-stone-200">Domain & Security</h3>
                    <p className="text-stone-400 text-sm">SSL certificates, domain registration, and security tools</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-8 border border-stone-700/50">
              <h2 className="text-2xl font-semibold text-stone-100 mb-6 flex items-center gap-3">
                <Coffee className="h-6 w-6 text-stone-400" />
                What We're Building
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-2 border-stone-500 pl-4">
                  <h3 className="font-medium text-stone-200">AI-Powered Study Assistant</h3>
                  <p className="text-stone-400 text-sm">Personalized learning recommendations and smart content curation</p>
                </div>
                
                <div className="border-l-2 border-stone-500 pl-4">
                  <h3 className="font-medium text-stone-200">Enhanced Collaboration Tools</h3>
                  <p className="text-stone-400 text-sm">Real-time study groups, peer-to-peer learning, and discussion forums</p>
                </div>
                
                <div className="border-l-2 border-stone-500 pl-4">
                  <h3 className="font-medium text-stone-200">Mobile App</h3>
                  <p className="text-stone-400 text-sm">Native iOS and Android apps for learning on the go</p>
                </div>
                
                <div className="border-l-2 border-stone-500 pl-4">
                  <h3 className="font-medium text-stone-200">Advanced Analytics</h3>
                  <p className="text-stone-400 text-sm">Progress tracking, learning insights, and performance analytics</p>
                </div>
                
                <div className="border-l-2 border-stone-500 pl-4">
                  <h3 className="font-medium text-stone-200">Content Expansion</h3>
                  <p className="text-stone-400 text-sm">More subjects, languages, and educational resources</p>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Section */}
          <div className="bg-gradient-to-r from-stone-800/70 to-stone-700/70 backdrop-blur-sm rounded-xl p-8 border border-stone-600/50 text-center">
            <h2 className="text-3xl font-semibold text-stone-100 mb-6">
              Make a Contribution
            </h2>
            
            <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
              Every contribution, no matter how small, helps us maintain and improve OfCampus. 
              Your support enables us to keep the platform free for all students.
            </p>

            {/* UPI Payment Section */}
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-xl p-6 mb-6">
                {/* QR Code Placeholder */}
                <div className="bg-stone-100 border-2 border-dashed border-stone-300 rounded-lg p-8 mb-4">
                  <div className="text-center text-stone-600">
                    <Image src="/upi.png" alt="QR Code" className="w-full h-full object-cover" width={200} height={200} />
                  </div>
                </div>
                
              
                {/* UPI ID */}
                <div className="bg-stone-50 rounded-lg p-4 border">
                  <p className="text-sm text-stone-600 mb-2">UPI ID:</p>
                  <div className="flex items-center justify-between bg-white rounded border p-3">
                    <span className="font-mono text-stone-800 text-sm">{UPI_ID}</span>
                    <button
                      onClick={handleCopyUPI}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Copy className="h-4 w-4 text-stone-500" />
                      <span className="text-sm font-medium">
                        {copiedUPI ? 'Copied!' : 'Copy'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Apps */}
              <div className="text-stone-300 text-sm mb-6">
                <p className="mb-2">Supported UPI Apps:</p>
                <div className="flex justify-center gap-4 text-xs">
                  <span className="bg-stone-700 px-3 py-1 rounded-full">PhonePe</span>
                  <span className="bg-stone-700 px-3 py-1 rounded-full">Paytm</span>
                  <span className="bg-stone-700 px-3 py-1 rounded-full">Google Pay</span>
                  <span className="bg-stone-700 px-3 py-1 rounded-full">BHIM</span>
                </div>
              </div>

              {/* Thank You Message */}
              <div className="text-stone-400 text-sm">
                <p>🙏 Thank you for supporting education and making OfCampus possible!</p>
              </div>
            </div>
          </div>

          {/* Transparency Note */}
          <div className="mt-12 text-center">
            <p className="text-stone-500 text-sm max-w-2xl mx-auto">
              We believe in transparency. All contributions go directly towards maintaining and improving the platform. 
              We're committed to keeping OfCampus free and accessible for all students worldwide.
            </p>
          </div>
        </div>
      </div>
      <Footer isDark />
    </div>
  );
}