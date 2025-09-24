"use client";

import React, { useState } from 'react';
import { ChevronDown, Shield, Check, Users, Globe, Lock, Zap, ArrowRight, Menu, X } from 'lucide-react';

interface ConnectedWallet {
  type: string;
  address: string;
  name: string;
}

const LandingPage = () => {
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Mock wallet connection for demo
  const connectWallet = async (walletType: string) => {
    setIsConnecting(true);
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockAddress = walletType === 'argent' 
      ? '0x1234...abcd' 
      : '0x5678...efgh';
    
    setConnectedWallet({
      type: walletType,
      address: mockAddress,
      name: walletType === 'argent' ? 'Argent X' : 'Braavos'
    });
    setIsWalletDropdownOpen(false);
    setIsConnecting(false);
  };

  const disconnectWallet = () => {
    setConnectedWallet(null);
  };

  const walletOptions = [
    {
      id: 'argent',
      name: 'Argent X',
      icon: '🛡️',
      description: 'Most popular Starknet wallet'
    },
    {
      id: 'braavos',
      name: 'Braavos',
      icon: '⚡',
      description: 'Advanced Starknet wallet'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">SpectralPay</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#security" className="text-gray-300 hover:text-white transition-colors">
              Security
            </a>
            
            {/* Wallet Connection */}
            <div className="relative">
              {!connectedWallet ? (
                <div className="relative">
                  <button
                    onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                    disabled={isConnecting}
                    className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all disabled:opacity-50"
                  >
                    {isConnecting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <span>Connect Wallet</span>
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {isWalletDropdownOpen && !isConnecting && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
                      <div className="p-4 border-b border-gray-700">
                        <h3 className="font-semibold text-white">Connect Starknet Wallet</h3>
                        <p className="text-sm text-gray-400 mt-1">Choose your preferred wallet</p>
                      </div>
                      {walletOptions.map((wallet) => (
                        <button
                          key={wallet.id}
                          onClick={() => connectWallet(wallet.id)}
                          className="w-full p-4 hover:bg-gray-700 transition-colors flex items-center space-x-3 text-left"
                        >
                          <span className="text-2xl">{wallet.icon}</span>
                          <div>
                            <div className="font-medium text-white">{wallet.name}</div>
                            <div className="text-sm text-gray-400">{wallet.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-800 px-4 py-2 rounded-lg">
                    <div className="text-sm text-gray-400">{connectedWallet.name}</div>
                    <div className="text-sm font-mono">{connectedWallet.address}</div>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-6 space-y-4">
            <a href="/how-it-works" className="block text-gray-300 hover:text-white">
              How it Works
            </a>
            <a href="#features" className="block text-gray-300 hover:text-white">
              Features
            </a>
            <a href="#security" className="block text-gray-300 hover:text-white">
              Security
            </a>
            
            {!connectedWallet ? (
              <div className="pt-4 border-t border-gray-700">
                <button
                  onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 px-6 py-3 rounded-lg font-semibold"
                >
                  Connect Wallet
                </button>
                
                {isWalletDropdownOpen && (
                  <div className="mt-2 space-y-2">
                    {walletOptions.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => {
                          connectWallet(wallet.id);
                          setIsMenuOpen(false);
                        }}
                        className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center space-x-3"
                      >
                        <span className="text-xl">{wallet.icon}</span>
                        <div className="text-left">
                          <div className="font-medium">{wallet.name}</div>
                          <div className="text-xs text-gray-400">{wallet.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-700">
                <div className="bg-gray-700 px-4 py-3 rounded-lg mb-2">
                  <div className="text-sm text-gray-400">{connectedWallet.name}</div>
                  <div className="text-sm font-mono">{connectedWallet.address}</div>
                </div>
                <button
                  onClick={() => {
                    disconnectWallet();
                    setIsMenuOpen(false);
                  }}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-block bg-teal-500/10 text-teal-400 px-4 py-2 rounded-full text-sm font-medium">
                  🚀 Built for Starknet Hackathon
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Work and pay
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                  without revealing
                </span>
                who you are
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The first anonymous payment platform where privacy meets compliance. 
                Work freely, get paid fairly, stay completely anonymous.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="/auth"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
                >
                  {"I'm a Worker"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/auth"
                  className="inline-flex items-center justify-center border-2 border-gray-600 hover:border-teal-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-teal-500/10"
                >
                  {"I'm an Employer"}
                </a>
              </div>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-teal-400" />
                  <span>Privacy by Default</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-teal-400" />
                  <span>Fair Pay</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-teal-400" />
                  <span>Full Compliance</span>
                </div>
              </div>
            </div>

            <div className="lg:pl-12">
              <div className="relative">
                {/* Main Shield Logo */}
                <div className="w-80 h-80 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="w-32 h-32 bg-gray-900/80 rounded-2xl flex items-center justify-center">
                      <div className="w-16 h-10 bg-white rounded-full relative overflow-hidden">
                        <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-teal-400 rounded-full mr-1"></div>
                          <div className="w-2 h-2 bg-teal-400 rounded-full ml-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-teal-500 p-3 rounded-xl animate-bounce">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 p-3 rounded-xl animate-pulse">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose Anonymous Payments?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of work where your skills matter more than your identity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-teal-500/50 transition-all">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Complete Privacy</h3>
              <p className="text-gray-400">
                Work for anyone without revealing your identity. Your reputation is built on work quality, not personal information.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Global Access</h3>
              <p className="text-gray-400">
                Work with companies worldwide without location bias. Get paid fairly based on your skills, not your geography.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-teal-500/50 transition-all">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Matching</h3>
              <p className="text-gray-400">
                Our AI matches anonymous workers with employers based purely on skills and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-teal-400 mb-2">50M+</div>
              <div className="text-gray-400">Americans Freelance</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">78%</div>
              <div className="text-gray-400">Worry About Privacy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-400 mb-2">$4.45M</div>
              <div className="text-gray-400">Avg. Data Breach Cost</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">100%</div>
              <div className="text-gray-400">Anonymous & Legal</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-teal-600/10 to-emerald-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Work Anonymously?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of workers and employers building the future of anonymous work
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth"
              className="inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/how-it-works"
              className="inline-flex items-center justify-center border-2 border-gray-600 hover:border-teal-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-teal-500/10"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">SpectralPay</span>
              </div>
              <p className="text-gray-400 mb-6">
                {"The world's first anonymous payment platform. Work freely, get paid fairly."}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 SpectralPay. All rights reserved. Built for Starknet Hackathon.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-400">Powered by</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                <span className="text-sm font-semibold">Starknet</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;





// <div
//           className={`relative transition-all duration-1000 delay-300 lg:pl-12 ${
//             isVisible
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-10"
//           }`}
//         >
//           <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80">
//             {/* Animated Shield */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="relative">
//                 <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full animate-pulse"></div>
//                 <div className="absolute inset-6 sm:inset-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
//                   <Shield className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Eye className="w-12 h-12 sm:w-16 sm:h-16 text-gray-900" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Floating Elements */}
//             <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gray-800 p-2 sm:p-3 rounded-lg shadow-lg animate-bounce delay-1000">
//               <Lock className="w-4 h-4 sm:w-6 sm:h-6 text-teal-400" />
//             </div>
//             <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-gray-800 p-2 sm:p-3 rounded-lg shadow-lg animate-bounce delay-500">
//               <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
//             </div>
//             <div className="absolute top-1/2 right-0 bg-gray-800 p-2 sm:p-3 rounded-lg shadow-lg animate-bounce delay-700">
//               <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400" />
//             </div>
//           </div>
//         </div>





  // <div className="flex items-center space-x-2">
  //           <div className="relative">
  //             <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
  //             <div className="relative bg-gradient-to-br from-teal-500 to-cyan-500 p-2 rounded-full shadow-lg">
  //               <Shield className="w-8 h-8 text-white" />
  //             </div>
  //           </div>
  //           <span className="text-xl font-bold">ShieldNet</span>
  //         </div>
