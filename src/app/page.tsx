"use client";

import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, ArrowRight, Eye, DollarSign, Lock, Globe, Users, Zap } from 'lucide-react';

const SpectralPayLanding = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-700/50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-teal-400" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye className="w-4 h-4 text-gray-900" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              SpectralPay
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/how-it-works" className="text-gray-300 hover:text-teal-400 transition-colors">How it Works</a>
            <a href="#features" className="text-gray-300 hover:text-teal-400 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-teal-400 transition-colors">Pricing</a>
          </nav>
          <a href="/auth" className="bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded-lg transition-colors inline-block">
            Log-in
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Work and pay{' '}
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  without revealing
                </span>{' '}
                who you are
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The first platform where employers can hire talent and workers can get paid while maintaining complete anonymity. Privacy by design, compliance by default.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="/worker-dashboard" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 flex items-center justify-center group">
                  I'm a Worker
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/employer-dashboard" className="border-2 border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 inline-block text-center">
                  I'm an Employer
                </a>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-teal-400 mr-3" />
                  Privacy by Default
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-teal-400 mr-3" />
                  Fair Pay
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-teal-400 mr-3" />
                  Full Compliance
                </div>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative mx-auto w-80 h-80">
                {/* Animated Shield */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute inset-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
                      <Shield className="w-32 h-32 text-white" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Eye className="w-16 h-16 text-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 bg-gray-800 p-3 rounded-lg shadow-lg animate-bounce delay-1000">
                  <Lock className="w-6 h-6 text-teal-400" />
                </div>
                <div className="absolute bottom-4 left-4 bg-gray-800 p-3 rounded-lg shadow-lg animate-bounce delay-500">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <div className="absolute top-1/2 right-0 bg-gray-800 p-3 rounded-lg shadow-lg animate-bounce delay-700">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-teal-400">50M+</div>
              <div className="text-gray-300">Americans freelance regularly</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-teal-400">78%</div>
              <div className="text-gray-300">Worry about data collection</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-teal-400">$4.45M</div>
              <div className="text-gray-300">Average cost of data breach</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-teal-400">65%</div>
              <div className="text-gray-300">Companies want better privacy</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 px-6" id="how-it-works">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-12">How SpectralPay Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Anonymous Profiles</h3>
              <p className="text-gray-400">Create work identity without revealing personal info</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Smart Matching</h3>
              <p className="text-gray-400">AI matches skills to jobs automatically</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Secure Escrow</h3>
              <p className="text-gray-400">Payments protected until work is verified</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Auto Release</h3>
              <p className="text-gray-400">Instant payment with full compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work Anonymously?</h2>
          <p className="text-xl mb-8 text-teal-100">
            Join the future of work where your skills matter more than your identity
          </p>
          <a href="/auth" className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block">
            Get Started Today
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-teal-400" />
                <span className="text-xl font-bold text-teal-400">SpectralPay</span>
              </div>
              <p className="text-gray-400">Anonymous payments for the modern workforce</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-teal-400">How it Works</a></li>
                <li><a href="#" className="hover:text-teal-400">Pricing</a></li>
                <li><a href="#" className="hover:text-teal-400">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-teal-400">Help Center</a></li>
                <li><a href="#" className="hover:text-teal-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-teal-400">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-400">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SpectralPay. All rights reserved. Built for the hackathon.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpectralPayLanding;