"use client";

import React, { useState, useEffect } from 'react';
import { Shield, ChevronRight, ArrowLeft, Check, Zap, Globe, Lock, UserCheck, Building, AlertCircle } from 'lucide-react';

interface ConnectedWallet {
  type: string;
  address: string;
  name: string;
}

// Define proper types for Starknet wallet
interface StarknetWallet {
  enable: () => Promise<string[]>;
  getSelectedAddress: () => Promise<string>;
}

interface WindowWithStarknet extends Window {
  starknet?: StarknetWallet;
}

const AuthPage = () => {
  const [selectedRole, setSelectedRole] = useState<'worker' | 'employer' | null>(null);
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [step, setStep] = useState<'checking' | 'connect-required' | 'role-selection'>('checking');

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      // Check for Starknet wallet
      if (typeof window !== 'undefined' && (window as WindowWithStarknet).starknet) {
        const starknet = (window as WindowWithStarknet).starknet;
        
        try {
          const accounts = await starknet!.getSelectedAddress();
          if (accounts) {
            const mockWallet = {
              type: 'starknet',
              address: accounts,
              name: 'Starknet Wallet'
            };
            setConnectedWallet(mockWallet);
            setStep('role-selection');
            return;
          }
        } catch (error) {
          console.log('Starknet wallet not connected');
        }
      }
      
      // Check session storage for demo connection
      const storedWallet = sessionStorage.getItem('connectedWallet');
      const storedAddress = sessionStorage.getItem('walletAddress');
      
      if (storedWallet && storedAddress) {
        setConnectedWallet({
          type: JSON.parse(storedWallet).type || 'starknet',
          address: storedAddress,
          name: JSON.parse(storedWallet).name || 'Starknet Wallet'
        });
        setStep('role-selection');
      } else {
        setStep('connect-required');
      }
    } catch (error) {
      console.error('Wallet check failed:', error);
      setStep('connect-required');
    }
  };

  const connectWallet = async (walletType: string = 'argent') => {
    setIsConnecting(true);
    
    try {
      // Try real Starknet wallet first
      if (typeof window !== 'undefined' && (window as WindowWithStarknet).starknet) {
        const starknet = (window as WindowWithStarknet).starknet;
        const accounts = await starknet!.enable();
        
        if (accounts && accounts.length > 0) {
          const wallet = {
            type: 'starknet',
            address: accounts[0],
            name: 'Starknet Wallet'
          };
          
          setConnectedWallet(wallet);
          sessionStorage.setItem('connectedWallet', JSON.stringify(wallet));
          sessionStorage.setItem('walletAddress', accounts[0]);
          setStep('role-selection');
          setIsConnecting(false);
          return;
        }
      }
      
      // Fallback demo connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const demoWallet = {
        type: walletType,
        address: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
        name: walletType === 'argent' ? 'Argent X' : 'Braavos Wallet'
      };
      
      setConnectedWallet(demoWallet);
      sessionStorage.setItem('connectedWallet', JSON.stringify(demoWallet));
      sessionStorage.setItem('walletAddress', demoWallet.address);
      setStep('role-selection');
      
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert('Failed to connect wallet. Please ensure you have a Starknet wallet installed and try again.');
    }
    
    setIsConnecting(false);
  };

  const handleRoleSelection = (role: 'worker' | 'employer') => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole || !connectedWallet) return;
    
    setIsLoading(true);
    
    // Store user data
    sessionStorage.setItem('userRole', selectedRole);
    sessionStorage.setItem('walletAddress', connectedWallet.address);
    sessionStorage.setItem('connectedWallet', JSON.stringify(connectedWallet));
    
    // Simulate profile creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to appropriate dashboard
    if (selectedRole === 'worker') {
      window.location.href = '/worker-dashboard';
    } else {
      window.location.href = '/employer-dashboard';
    }
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  // Loading state
  if (step === 'checking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold mb-2">Checking Wallet Connection</h2>
          <p className="text-gray-400">Verifying your Starknet wallet...</p>
        </div>
      </div>
    );
  }

  // Wallet connection required
  if (step === 'connect-required') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">SpectralPay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Connection Prompt */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Wallet Required</h2>
              <p className="text-gray-400 mb-8">
                You need to connect your Starknet wallet to access SpectralPay and start working anonymously.
              </p>
            </div>

            {/* Wallet Options */}
            <div className="space-y-4 mb-8">
              <button
                onClick={() => connectWallet('argent')}
                disabled={isConnecting}
                className="w-full bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600 hover:border-teal-500 rounded-xl p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-white">Argent X</h3>
                    <p className="text-sm text-gray-400">Most popular Starknet wallet</p>
                  </div>
                  {isConnecting ? (
                    <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              <button
                onClick={() => connectWallet('braavos')}
                disabled={isConnecting}
                className="w-full bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600 hover:border-teal-500 rounded-xl p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-white">Braavos</h3>
                    <p className="text-sm text-gray-400">Advanced Starknet wallet</p>
                  </div>
                  {isConnecting ? (
                    <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                {"Don't have a Starknet wallet?"} 
                <a href="https://www.argent.xyz/argent-x/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 ml-1">
                  Install Argent X
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Role selection (main flow)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">SpectralPay</span>
            </div>
            
            {/* Wallet Status - Mobile friendly */}
            {connectedWallet && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-teal-500/20 rounded-lg flex items-center justify-center">
                    <Check className="w-4 h-4 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Connected</p>
                    <p className="text-sm font-medium">{connectedWallet.name}</p>
                    <p className="text-xs font-mono text-gray-300">{connectedWallet.address}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="inline-block bg-teal-500/10 text-teal-400 px-4 py-2 rounded-full text-sm font-medium">
                🎭 Anonymous Identity Setup
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Choose Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                Anonymous Role
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your identity stays hidden, but your work speaks volumes. Select how you want to participate in the anonymous economy.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12 max-w-5xl mx-auto">
            {/* Worker Card */}
            <div
              onClick={() => handleRoleSelection('worker')}
              className={`relative bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedRole === 'worker' 
                  ? 'border-teal-500 bg-teal-500/10 shadow-2xl shadow-teal-500/20' 
                  : 'border-gray-700 hover:border-teal-500/50'
              }`}
            >
              {selectedRole === 'worker' && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <UserCheck className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{"I'm a Worker"}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Find anonymous work opportunities and get paid without revealing your identity. Build your reputation through quality work, not personal data.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-300">Browse anonymous job listings globally</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-300">Build reputation without revealing identity</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-300">Receive secure, instant payments via escrow</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-300">Work for multiple clients safely & anonymously</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <span className="text-sm text-gray-400">Perfect for freelancers & contractors</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Employer Card */}
            <div
              onClick={() => handleRoleSelection('employer')}
              className={`relative bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedRole === 'employer' 
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-2xl shadow-emerald-500/20' 
                  : 'border-gray-700 hover:border-emerald-500/50'
              }`}
            >
              {selectedRole === 'employer' && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{"I'm an Employer"}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Hire talented anonymous workers and pay them securely without collecting personal data. Focus on skills, not identities.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-300">Post anonymous job listings instantly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-300">Access global talent pool without bias</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-300">Automated escrow & milestone payments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-300">Reduced compliance risks & legal issues</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <span className="text-sm text-gray-400">Perfect for companies & startups</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 mb-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-center">Why Choose Anonymous Work?</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-teal-400" />
                </div>
                <h4 className="font-semibold mb-2">Complete Privacy</h4>
                <p className="text-sm text-gray-400">Your identity remains completely hidden from all parties</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-semibold mb-2">Global Access</h4>
                <p className="text-sm text-gray-400">Work with anyone, anywhere, without location or identity bias</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-teal-400" />
                </div>
                <h4 className="font-semibold mb-2">Instant Payments</h4>
                <p className="text-sm text-gray-400">Secure, automated payments via smart contracts on Starknet</p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={handleContinue}
              disabled={!selectedRole || isLoading}
              className="inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 sm:px-12 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Creating Anonymous Profile...
                </>
              ) : (
                <>
                  Continue as {selectedRole === 'worker' ? 'Anonymous Worker' : 'Anonymous Employer'}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
            
            {!selectedRole && (
              <p className="text-sm text-gray-400 mt-3">Please select a role to continue</p>
            )}
          </div>

          {/* Security Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-3 max-w-md">
              <Shield className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span className="text-sm text-gray-400">
                Your wallet signature creates your anonymous identity. No personal data is stored or shared.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;