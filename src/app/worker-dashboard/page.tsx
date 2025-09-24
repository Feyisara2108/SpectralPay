"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  ArrowRight,
  Settings,
  LogOut,
  Briefcase,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ChevronDown,
} from "lucide-react";

interface ConnectedWallet {
  type: string;
  address: string;
  name: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  budget: string;
  duration: string;
  skills: string[];
  description: string;
  posted: string;
  applications: number;
  location: string;
  urgent?: boolean;
}

interface WorkItem {
  id: string;
  title: string;
  client: string;
  status: "in-progress" | "pending-review" | "completed" | "payment-released";
  progress: number;
  deadline: string;
  amount: string;
}

type Tab = "jobs" | "my-work" | "payments";

const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("jobs");
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const storedWallet = sessionStorage.getItem("connectedWallet");
    const storedAddress = sessionStorage.getItem("walletAddress");

    if (storedWallet && storedAddress) {
      setConnectedWallet({
        ...JSON.parse(storedWallet),
        address: storedAddress,
      });
    }
  }, []);

  const availableJobs: Job[] = [
    {
      id: "1",
      title: "UI/UX Designer",
      company: "PipalPhantom",
      budget: "$25 Propanes",
      duration: "2-3 weeks",
      skills: ["Figma", "UI Design", "Prototyping"],
      description:
        "Design modern dashboard interfaces for our anonymous payment platform. Need someone with strong UI/UX skills.",
      posted: "2 hours ago",
      applications: 12,
      location: "Remote",
      urgent: true,
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "Anonymous Corp",
      budget: "$25 panhimic",
      duration: "1-2 weeks",
      skills: ["React", "TypeScript", "Tailwind"],
      description:
        "Build responsive React components for our web3 application. Experience with wallet integration preferred.",
      posted: "5 hours ago",
      applications: 8,
      location: "Global",
    },
    {
      id: "3",
      title: "Logo Designer",
      company: "Stealth Startup",
      budget: "$17 gowinos",
      duration: "1 week",
      skills: ["Illustrator", "Branding", "Logo Design"],
      description:
        "Create professional logo and brand identity for anonymous freelance platform.",
      posted: "1 day ago",
      applications: 24,
      location: "Remote",
    },
  ];

  const myWork: WorkItem[] = [
    {
      id: "1",
      title: "Dashboard Design",
      client: "Client #7823",
      status: "in-progress",
      progress: 75,
      deadline: "2 days",
      amount: "$1,300",
    },
    {
      id: "2",
      title: "UI/UX Redesign",
      client: "Client #4521",
      status: "pending-review",
      progress: 100,
      deadline: "Under review",
      amount: "$850",
    },
  ];

  const payments = [
    { id: "1", project: "Logo Design", amount: "$1,300", status: "Released", date: "Today" },
    { id: "2", project: "UI Components", amount: "$750", status: "Escrow", date: "2 days ago" },
  ];

  const allSkills = [
    "React",
    "TypeScript",
    "Figma",
    "UI Design",
    "Logo Design",
    "Branding",
    "Tailwind",
    "Node.js",
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const getStatusColor = (status: WorkItem["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/10";
      case "in-progress":
        return "text-blue-400 bg-blue-400/10";
      case "pending-review":
        return "text-yellow-400 bg-yellow-400/10";
      case "payment-released":
        return "text-teal-400 bg-teal-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  const filteredJobs = availableJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkills =
      selectedSkills.length === 0 || selectedSkills.some((skill) => job.skills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* your full JSX code here (unchanged from before) */}
      
    </div>
  );
};

export default WorkerDashboard;
























// "use client";

// import React, { useState, useEffect } from 'react';
// import { 
//   Shield, 
//   Search, 
//   Filter, 
//   MapPin, 
//   Clock, 
//   DollarSign, 
//   Eye, 
//   ArrowRight, 
//   Settings, 
//   LogOut,
//   User,
//   Briefcase,
//   TrendingUp,
//   CheckCircle,
//   AlertCircle,
//   MoreVertical,
//   ChevronDown
// } from 'lucide-react';

// interface ConnectedWallet {
//   type: string;
//   address: string;
//   name: string;
// }

// interface Job {
//   id: string;
//   title: string;
//   company: string;
//   budget: string;
//   duration: string;
//   skills: string[];
//   description: string;
//   posted: string;
//   applications: number;
//   location: string;
//   urgent?: boolean;
// }

// interface WorkItem {
//   id: string;
//   title: string;
//   client: string;
//   status: 'in-progress' | 'pending-review' | 'completed' | 'payment-released';
//   progress: number;
//   deadline: string;
//   amount: string;
// }

// const WorkerDashboard = () => {
//   const [activeTab, setActiveTab] = useState<'jobs' | 'my-work' | 'payments'>('jobs');
//   const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     // Load wallet info from session
//     const storedWallet = sessionStorage.getItem('connectedWallet');
//     const storedAddress = sessionStorage.getItem('walletAddress');
    
//     if (storedWallet && storedAddress) {
//       setConnectedWallet({
//         ...JSON.parse(storedWallet),
//         address: storedAddress
//       });
//     }
//   }, []);

//   // Mock data - in real app, fetch from API
//   const availableJobs: Job[] = [
//     {
//       id: '1',
//       title: 'UI/UX Designer',
//       company: 'PipalPhantom',
//       budget: '$25 Propanes',
//       duration: '2-3 weeks',
//       skills: ['Figma', 'UI Design', 'Prototyping'],
//       description: 'Design modern dashboard interfaces for our anonymous payment platform. Need someone with strong UI/UX skills.',
//       posted: '2 hours ago',
//       applications: 12,
//       location: 'Remote',
//       urgent: true
//     },
//     {
//       id: '2',
//       title: 'Frontend Developer',
//       company: 'Anonymous Corp',
//       budget: '$25 panhimic',
//       duration: '1-2 weeks',
//       skills: ['React', 'TypeScript', 'Tailwind'],
//       description: 'Build responsive React components for our web3 application. Experience with wallet integration preferred.',
//       posted: '5 hours ago',
//       applications: 8,
//       location: 'Global'
//     },
//     {
//       id: '3',
//       title: 'Logo Designer',
//       company: 'Stealth Startup',
//       budget: '$17 gowinos',
//       duration: '1 week',
//       skills: ['Illustrator', 'Branding', 'Logo Design'],
//       description: 'Create professional logo and brand identity for anonymous freelance platform.',
//       posted: '1 day ago',
//       applications: 24,
//       location: 'Remote'
//     }
//   ];

//   const myWork: WorkItem[] = [
//     {
//       id: '1',
//       title: 'Dashboard Design',
//       client: 'Client #7823',
//       status: 'in-progress',
//       progress: 75,
//       deadline: '2 days',
//       amount: '$1,300'
//     },
//     {
//       id: '2',
//       title: 'UI/UX Redesign',
//       client: 'Client #4521',
//       status: 'pending-review',
//       progress: 100,
//       deadline: 'Under review',
//       amount: '$850'
//     }
//   ];

//   const payments = [
//     { id: '1', project: 'Logo Design', amount: '$1,300', status: 'Released', date: 'Today' },
//     { id: '2', project: 'UI Components', amount: '$750', status: 'Escrow', date: '2 days ago' }
//   ];

//   const allSkills = ['React', 'TypeScript', 'Figma', 'UI Design', 'Logo Design', 'Branding', 'Tailwind', 'Node.js'];

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/';
//   };

//   const handleBackToAuth = () => {
//     window.location.href = '/auth';
//   };

//   const getStatusColor = (status: WorkItem['status']) => {
//     switch (status) {
//       case 'completed': return 'text-green-400 bg-green-400/10';
//       case 'in-progress': return 'text-blue-400 bg-blue-400/10';
//       case 'pending-review': return 'text-yellow-400 bg-yellow-400/10';
//       case 'payment-released': return 'text-teal-400 bg-teal-400/10';
//       default: return 'text-gray-400 bg-gray-400/10';
//     }
//   };

//   const filteredJobs = availableJobs.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
//     const matchesSkills = selectedSkills.length === 0 || 
//                          selectedSkills.some(skill => job.skills.includes(skill));
//     return matchesSearch && matchesSkills;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
//       {/* Header */}
//       <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
//         <div className="px-4 sm:px-6 lg:px-8 py-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               {/* Logo */}
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
//                   <Shield className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-xl font-bold">Worker Dashboard</h1>
//                   <p className="text-sm text-gray-400">Anonymous ID: Worker #1247</p>
//                 </div>
//               </div>

//               {/* Wallet & Actions */}
//               <div className="flex items-center space-x-4">
//                 {connectedWallet && (
//                   <div className="hidden sm:flex items-center space-x-3 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     <div>
//                       <p className="text-xs text-gray-400">{connectedWallet.name}</p>
//                       <p className="text-sm font-mono">{connectedWallet.address}</p>
//                     </div>
//                   </div>
//                 )}
                
//                 <div className="flex items-center space-x-2">
//                   <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
//                     <Settings className="w-5 h-5 text-gray-400" />
//                   </button>
//                   <button 
//                     onClick={handleLogout}
//                     className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
//                   >
//                     <LogOut className="w-5 h-5 text-gray-400" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="border-b border-gray-800">
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <nav className="flex space-x-8 overflow-x-auto">
//               {[
//                 { id: 'jobs', label: 'Jobs Feed', icon: Search },
//                 { id: 'my-work', label: 'My Work', icon: Briefcase },
//                 { id: 'payments', label: 'Payments', icon: DollarSign }
//               ].map(({ id, label, icon: Icon }) => (
//                 <button
//                   key={id}
//                   onClick={() => setActiveTab(id as any)}
//                   className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
//                     activeTab === id
//                       ? 'border-teal-500 text-teal-400'
//                       : 'border-transparent text-gray-400 hover:text-white'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="font-medium">{label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="px-4 sm:px-6 lg:px-8 py-8">
//         <div className="max-w-7xl mx-auto">
          
//           {/* Jobs Feed Tab */}
//           {activeTab === 'jobs' && (
//             <div className="space-y-6">
//               {/* Search & Filters */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search jobs, skills, or companies..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                   />
//                 </div>
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="flex items-center space-x-2 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors"
//                 >
//                   <Filter className="w-5 h-5" />
//                   <span>Filters</span>
//                   <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
//                 </button>
//               </div>

//               {/* Skills Filter */}
//               {showFilters && (
//                 <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
//                   <h3 className="font-semibold mb-3">Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {allSkills.map((skill) => (
//                       <button
//                         key={skill}
//                         onClick={() => {
//                           setSelectedSkills(prev => 
//                             prev.includes(skill) 
//                               ? prev.filter(s => s !== skill)
//                               : [...prev, skill]
//                           );
//                         }}
//                         className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                           selectedSkills.includes(skill)
//                             ? 'bg-teal-500 text-white'
//                             : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         }`}
//                       >
//                         {skill}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Job Cards */}
//               <div className="grid gap-6">
//                 {filteredJobs.map((job) => (
//                   <div
//                     key={job.id}
//                     className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-teal-500/50 transition-all"
//                   >
//                     <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
//                       <div className="flex-1">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <div className="flex items-center space-x-2 mb-2">
//                               <h3 className="text-xl font-semibold">{job.title}</h3>
//                               {job.urgent && (
//                                 <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-full text-xs">
//                                   Urgent
//                                 </span>
//                               )}
//                             </div>
//                             <p className="text-gray-400">{job.company}</p>
//                           </div>
//                           <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
//                             <MoreVertical className="w-5 h-5 text-gray-400" />
//                           </button>
//                         </div>

//                         <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

//                         <div className="flex flex-wrap gap-2 mb-4">
//                           {job.skills.map((skill) => (
//                             <span
//                               key={skill}
//                               className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-sm"
//                             >
//                               {skill}
//                             </span>
//                           ))}
//                         </div>

//                         <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
//                           <div className="flex items-center space-x-1">
//                             <DollarSign className="w-4 h-4" />
//                             <span>{job.budget}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <Clock className="w-4 h-4" />
//                             <span>{job.duration}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <MapPin className="w-4 h-4" />
//                             <span>{job.location}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <Eye className="w-4 h-4" />
//                             <span>{job.applications} applications</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
//                         <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 px-6 py-3 rounded-lg font-semibold transition-all">
//                           <span>Apply Now</span>
//                           <ArrowRight className="w-4 h-4" />
//                         </button>
//                         <button className="flex items-center justify-center space-x-2 border border-gray-600 hover:border-teal-500 px-6 py-3 rounded-lg font-semibold transition-all hover:bg-teal-500/10">
//                           <span>View Details</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* My Work Tab */}
//           {activeTab === 'my-work' && (
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold">My Active Projects</h2>
//                 <div className="text-sm text-gray-400">
//                   {myWork.length} active projects
//                 </div>
//               </div>

//               <div className="grid gap-6">
//                 {myWork.map((work) => (
//                   <div
//                     key={work.id}
//                     className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
//                   >
//                     <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between mb-3">
//                           <h3 className="text-xl font-semibold">{work.title}</h3>
//                           <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(work.status)}`}>
//                             {work.status.replace('-', ' ')}
//                           </span>
//                         </div>
                        
//                         <p className="text-gray-400 mb-4">{work.client}</p>
                        
//                         <div className="space-y-3">
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="text-gray-400">Progress</span>
//                             <span className="text-teal-400">{work.progress}%</span>
//                           </div>
//                           <div className="w-full bg-gray-700 rounded-full h-2">
//                             <div 
//                               className="bg-gradient-to-r from-teal-500 to-emerald-600 h-2 rounded-full transition-all"
//                               style={{ width: `${work.progress}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="lg:text-right">
//                         <div className="text-2xl font-bold text-teal-400 mb-2">{work.amount}</div>
//                         <div className="text-sm text-gray-400">Due: {work.deadline}</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Payments Tab */}
//           {activeTab === 'payments' && (
//             <div className="space-y-6">
//               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                   <div className="flex items-center space-x-3 mb-2">
//                     <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
//                       <DollarSign className="w-6 h-6 text-teal-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-400">Total Earned</p>
//                       <p className="text-2xl font-bold">$2,050</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                   <div className="flex items-center space-x-3 mb-2">
//                     <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
//                       <Clock className="w-6 h-6 text-yellow-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-400">In Escrow</p>
//                       <p className="text-2xl font-bold">$750</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                   <div className="flex items-center space-x-3 mb-2">
//                     <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
//                       <CheckCircle className="w-6 h-6 text-green-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-400">Released</p>
//                       <p className="text-2xl font-bold">$1,300</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                   <div className="flex items-center space-x-3 mb-2">
//                     <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
//                       <TrendingUp className="w-6 h-6 text-emerald-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-400">This Month</p>
//                       <p className="text-2xl font-bold">$1,300</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
//                 <div className="p-6 border-b border-gray-700">
//                   <h3 className="text-xl font-semibold">Payment History</h3>
//                 </div>
//                 <div className="divide-y divide-gray-700">
//                   {payments.map((payment) => (
//                     <div key={payment.id} className="p-6 flex items-center justify-between">
//                       <div>
//                         <h4 className="font-semibold">{payment.project}</h4>
//                         <p className="text-sm text-gray-400">{payment.date}</p>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-xl font-bold">{payment.amount}</div>
//                         <div className={`text-sm ${payment.status === 'Released' ? 'text-green-400' : 'text-yellow-400'}`}>
//                           {payment.status}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkerDashboard;







// THE FUNCTIONAL ONEEEE

// "use client";

// import React, { useState, useEffect } from 'react';
// import { 
//   Shield, 
//   Search, 
//   Filter, 
//   MapPin, 
//   Clock, 
//   DollarSign, 
//   Eye, 
//   ArrowRight, 
//   Settings, 
//   LogOut,
//   User,
//   Briefcase,
//   TrendingUp,
//   CheckCircle,
//   AlertCircle,
//   MoreVertical,
//   ChevronDown,
//   X,
//   Check
// } from 'lucide-react';

// interface ConnectedWallet {
//   type: string;
//   address: string;
//   name: string;
// }

// interface Job {
//   id: string;
//   title: string;
//   company: string;
//   budget: string;
//   duration: string;
//   skills: string[];
//   description: string;
//   posted: string;
//   applications: number;
//   location: string;
//   urgent?: boolean;
//   applied?: boolean;
// }

// interface WorkItem {
//   id: string;
//   title: string;
//   client: string;
//   status: 'in-progress' | 'pending-review' | 'completed' | 'payment-released';
//   progress: number;
//   deadline: string;
//   amount: string;
// }

// const WorkerDashboard = () => {
//   const [activeTab, setActiveTab] = useState<'jobs' | 'my-work' | 'payments'>('jobs');
//   const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [showJobDetails, setShowJobDetails] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   useEffect(() => {
//     // Load wallet info from session
//     const storedWallet = sessionStorage.getItem('connectedWallet');
//     const storedAddress = sessionStorage.getItem('walletAddress');
    
//     if (storedWallet && storedAddress) {
//       setConnectedWallet({
//         ...JSON.parse(storedWallet),
//         address: storedAddress
//       });
//     }

//     // Initialize jobs data
//     const initialJobs: Job[] = [
//       {
//         id: '1',
//         title: 'UI/UX Designer',
//         company: 'PipalPhantom',
//         budget: '$25 Propanes',
//         duration: '2-3 weeks',
//         skills: ['Figma', 'UI Design', 'Prototyping'],
//         description: 'Design modern dashboard interfaces for our anonymous payment platform. Need someone with strong UI/UX skills and experience with crypto/web3 interfaces. You will be working on user flows, wireframes, and high-fidelity prototypes.',
//         posted: '2 hours ago',
//         applications: 12,
//         location: 'Remote',
//         urgent: true,
//         applied: false
//       },
//       {
//         id: '2',
//         title: 'Frontend Developer',
//         company: 'Anonymous Corp',
//         budget: '$25 panhimic',
//         duration: '1-2 weeks',
//         skills: ['React', 'TypeScript', 'Tailwind'],
//         description: 'Build responsive React components for our web3 application. Experience with wallet integration preferred. You will work on creating reusable UI components and implementing wallet connection functionality.',
//         posted: '5 hours ago',
//         applications: 8,
//         location: 'Global',
//         applied: false
//       },
//       {
//         id: '3',
//         title: 'Logo Designer',
//         company: 'Stealth Startup',
//         budget: '$17 gowinos',
//         duration: '1 week',
//         skills: ['Illustrator', 'Branding', 'Logo Design'],
//         description: 'Create professional logo and brand identity for anonymous freelance platform. Need someone who can create clean, modern designs that convey trust and professionalism in the blockchain space.',
//         posted: '1 day ago',
//         applications: 24,
//         location: 'Remote',
//         applied: false
//       }
//     ];

//     setJobs(initialJobs);
//   }, []);

//   const myWork: WorkItem[] = [
//     {
//       id: '1',
//       title: 'Dashboard Design',
//       client: 'Client #7823',
//       status: 'in-progress',
//       progress: 75,
//       deadline: '2 days',
//       amount: '$1,300'
//     },
//     {
//       id: '2',
//       title: 'UI/UX Redesign',
//       client: 'Client #4521',
//       status: 'pending-review',
//       progress: 100,
//       deadline: 'Under review',
//       amount: '$850'
//     }
//   ];

//   const payments = [
//     { id: '1', project: 'Logo Design', amount: '$1,300', status: 'Released', date: 'Today' },
//     { id: '2', project: 'UI Components', amount: '$750', status: 'Escrow', date: '2 days ago' }
//   ];

//   const allSkills = ['React', 'TypeScript', 'Figma', 'UI Design', 'Logo Design', 'Branding', 'Tailwind', 'Node.js'];

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/';
//   };

//   const handleBackToAuth = () => {
//     window.location.href = '/auth';
//   };

//   const getStatusColor = (status: WorkItem['status']) => {
//     switch (status) {
//       case 'completed': return 'text-green-400 bg-green-400/10';
//       case 'in-progress': return 'text-blue-400 bg-blue-400/10';
//       case 'pending-review': return 'text-yellow-400 bg-yellow-400/10';
//       case 'payment-released': return 'text-teal-400 bg-teal-400/10';
//       default: return 'text-gray-400 bg-gray-400/10';
//     }
//   };

//   const handleApplyJob = (jobId: string) => {
//     // Update the job application status
//     setJobs(prevJobs => 
//       prevJobs.map(job => 
//         job.id === jobId 
//           ? { ...job, applied: true, applications: job.applications + 1 }
//           : job
//       )
//     );

//     // Store application data
//     const applicationData = {
//       jobId,
//       appliedAt: new Date().toISOString(),
//       status: 'pending',
//       walletAddress: connectedWallet?.address
//     };
    
//     sessionStorage.setItem(`application_${jobId}`, JSON.stringify(applicationData));
    
//     // Show success message
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 3000);
//   };

//   const handleViewDetails = (job: Job) => {
//     setSelectedJob(job);
//     setShowJobDetails(true);
//   };

//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
//     const matchesSkills = selectedSkills.length === 0 || 
//                          selectedSkills.some(skill => job.skills.includes(skill));
//     return matchesSearch && matchesSkills;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
//       {/* Success Message */}
//       {showSuccessMessage && (
//         <div className="fixed top-4 right-4 bg-green-500/90 backdrop-blur-sm border border-green-400 rounded-lg p-4 flex items-center space-x-2 z-50 animate-in slide-in-from-top">
//           <Check className="w-5 h-5 text-white" />
//           <span className="text-white font-medium">Application submitted successfully!</span>
//         </div>
//       )}

//       {/* Job Details Modal */}
//       {showJobDetails && selectedJob && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between p-6 border-b border-gray-700">
//               <h2 className="text-2xl font-bold">Job Details</h2>
//               <button 
//                 onClick={() => setShowJobDetails(false)}
//                 className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
            
//             <div className="p-6 space-y-6">
//               <div>
//                 <div className="flex items-center space-x-2 mb-2">
//                   <h3 className="text-2xl font-bold">{selectedJob.title}</h3>
//                   {selectedJob.urgent && (
//                     <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm">
//                       Urgent
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-lg text-gray-400 mb-4">{selectedJob.company}</p>
//               </div>

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div className="bg-gray-700/50 rounded-lg p-4">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <DollarSign className="w-5 h-5 text-teal-400" />
//                     <span className="text-sm text-gray-400">Budget</span>
//                   </div>
//                   <p className="text-xl font-bold">{selectedJob.budget}</p>
//                 </div>
                
//                 <div className="bg-gray-700/50 rounded-lg p-4">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <Clock className="w-5 h-5 text-teal-400" />
//                     <span className="text-sm text-gray-400">Duration</span>
//                   </div>
//                   <p className="text-xl font-bold">{selectedJob.duration}</p>
//                 </div>
                
//                 <div className="bg-gray-700/50 rounded-lg p-4">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <MapPin className="w-5 h-5 text-teal-400" />
//                     <span className="text-sm text-gray-400">Location</span>
//                   </div>
//                   <p className="text-xl font-bold">{selectedJob.location}</p>
//                 </div>
                
//                 <div className="bg-gray-700/50 rounded-lg p-4">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <Eye className="w-5 h-5 text-teal-400" />
//                     <span className="text-sm text-gray-400">Applications</span>
//                   </div>
//                   <p className="text-xl font-bold">{selectedJob.applications}</p>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="text-lg font-semibold mb-3">Required Skills</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedJob.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-sm"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h4 className="text-lg font-semibold mb-3">Description</h4>
//                 <p className="text-gray-300 leading-relaxed">{selectedJob.description}</p>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 {selectedJob.applied ? (
//                   <div className="flex items-center space-x-2 bg-green-500/10 text-green-400 px-6 py-3 rounded-lg font-semibold">
//                     <Check className="w-5 h-5" />
//                     <span>Applied</span>
//                   </div>
//                 ) : (
//                   <button 
//                     onClick={() => {
//                       handleApplyJob(selectedJob.id);
//                       setShowJobDetails(false);
//                     }}
//                     className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 px-6 py-3 rounded-lg font-semibold transition-all"
//                   >
//                     <span>Apply Now</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                 )}
//                 <button 
//                   onClick={() => setShowJobDetails(false)}
//                   className="border border-gray-600 hover:border-teal-500 px-6 py-3 rounded-lg font-semibold transition-all hover:bg-teal-500/10"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
//         <div className="px-4 sm:px-6 lg:px-8 py-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               {/* Logo */}
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
//                   <Shield className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-xl font-bold">Worker Dashboard</h1>
//                   <p className="text-sm text-gray-400">Anonymous ID: Worker #1247</p>
//                 </div>
//               </div>

//               {/* Wallet & Actions */}
//               <div className="flex items-center space-x-4">
//                 {connectedWallet && (
//                   <div className="hidden sm:flex items-center space-x-3 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     <div>
//                       <p className="text-xs text-gray-400">{connectedWallet.name}</p>
//                       <p className="text-sm font-mono">{connectedWallet.address}</p>
//                     </div>
//                   </div>
//                 )}
                
//                 <div className="flex items-center space-x-2">
//                   <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
//                     <Settings className="w-5 h-5 text-gray-400" />
//                   </button>
//                   <button 
//                     onClick={handleLogout}
//                     className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
//                   >
//                     <LogOut className="w-5 h-5 text-gray-400" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="border-b border-gray-800">
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <nav className="flex space-x-8 overflow-x-auto">
//               {[
//                 { id: 'jobs', label: 'Jobs Feed', icon: Search },
//                 { id: 'my-work', label: 'My Work', icon: Briefcase },
//                 { id: 'payments', label: 'Payments', icon: DollarSign }
//               ].map(({ id, label, icon: Icon }) => (
//                 <button
//                   key={id}
//                   onClick={() => setActiveTab(id as any)}
//                   className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
//                     activeTab === id
//                       ? 'border-teal-500 text-teal-400'
//                       : 'border-transparent text-gray-400 hover:text-white'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="font-medium">{label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="px-4 sm:px-6 lg:px-8 py-8">
//         <div className="max-w-7xl mx-auto">
          
//           {/* Jobs Feed Tab */}
//           {activeTab === 'jobs' && (
//             <div className="space-y-6">
//               {/* Search & Filters */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search jobs, skills, or companies..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                   />
//                 </div>
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="flex items-center space-x-2 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors"
//                 >
//                   <Filter className="w-5 h-5" />
//                   <span>Filters</span>
//                   <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
//                 </button>
//               </div>

//               {/* Skills Filter */}
//               {showFilters && (
//                 <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
//                   <h3 className="font-semibold mb-3">Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {allSkills.map((skill) => (
//                       <button
//                         key={skill}
//                         onClick={() => {
//                           setSelectedSkills(prev => 
//                             prev.includes(skill) 
//                               ? prev.filter(s => s !== skill)
//                               : [...prev, skill]
//                           );
//                         }}
//                         className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                           selectedSkills.includes(skill)
//                             ? 'bg-teal-500 text-white'
//                             : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         }`}
//                       >
//                         {skill}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Job Cards */}
//               <div className="grid gap-6">
//                 {filteredJobs.map((job) => (
//                   <div
//                     key={job.id}
//                     className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-teal-500/50 transition-all"
//                   >
//                     <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
//                       <div className="flex-1">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <div className="flex items-center space-x-2 mb-2">
//                               <h3 className="text-xl font-semibold">{job.title}</h3>
//                               {job.urgent && (
//                                 <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-full text-xs">
//                                   Urgent
//                                 </span>
//                               )}
//                               {job.applied && (
//                                 <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs flex items-center space-x-1">
//                                   <Check className="w-3 h-3" />
//                                   <span>Applied</span>
//                                 </span>
//                               )}
//                             </div>
//                             <p className="text-gray-400">{job.company}</p>
//                           </div>
//                         </div>

//                         <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

//                         <div className="flex flex-wrap gap-2 mb-4">
//                           {job.skills.map((skill) => (
//                             <span
//                               key={skill}
//                               className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-sm"
//                             >
//                               {skill}
//                             </span>
//                           ))}
//                         </div>

//                         <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
//                           <div className="flex items-center space-x-1">
//                             <DollarSign className="w-4 h-4" />
//                             <span>{job.budget}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <Clock className="w-4 h-4" />
//                             <span>{job.duration}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <MapPin className="w-4 h-4" />
//                             <span>{job.location}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <Eye className="w-4 h-4" />
//                             <span>{job.applications} applications</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
//                         {job.applied ? (
//                           <div className="flex items-center justify-center space-x-2 bg-green-500/10 text-green-400 px-6 py-3 rounded-lg font-semibold">
//                             <Check className="w-4 h-4" />
//                             <span>Applied</span>
//                           </div>
//                         ) : (
//                           <button 
//                             onClick={() => handleApplyJob(job.id)}
//                             className="flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 px-6 py-3 rounded-lg font-semibold transition-all"
//                           >
//                             <span>Apply Now</span>
//                             <ArrowRight className="w-4 h-4" />
//                           </button>
//                         )}
//                         <button 
//                           onClick={() => handleViewDetails(job)}
//                           className="flex items-center justify-center space-x-2 border border-gray-600 hover:border-teal-500 px-6 py-3 rounded-lg font-semibold transition-all hover:bg-teal-500/10"
//                         >
//                           <span>View Details</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* My Work Tab */}
//           {activeTab === 'my-work' && (
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold">My Active Projects</h2>
//                 <div className="text-sm text-gray-400">
//                   {myWork.length} active projects
//                 </div>
//               </div>

//               <div className="grid gap-6">
//                 {myWork.map((work) => (
//                   <div
//                     key={work.id}
//                     className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
//                   >
//                     <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between mb-3">
//                           <h3 className="text-xl font-semibold">{work.title}</h3>
//                           <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(work.status)}`}>
//                             {work.status.replace('-', ' ')}
//                           </span>
//                         </div>
                        
//                         <p className="text-gray-400 mb-4">{work.client}</p>
                        
//                         <div className="space-y-3">
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="text-gray-400">Progress</span>
//                             <span className="text-teal-400">{work.progress}%</span>
//                           </div>
//                           <div className="w-full bg-gray-700 rounded-full h-2">
//                             <div 
//                               className="bg-gradient-to-r from-teal-500 to-emerald-600 h-2 rounded-full transition-all"
//                               style={{ width: `${work.progress}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="lg:text-right">
//                         <div className="text-2xl font-bold text-teal-400 mb-2">{work.amount}</div>
//                         <div className="text-sm text-gray-400">Due: {work.deadline}</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Payments Tab */}
//           {activeTab === 'payments' && (
//             <div className="space-y-6">
//               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                   <div className="flex items-center space-x-3 mb-2">
//                     <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
//                       <DollarSign className="w-6 h-6 text-teal-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-400">Total Earned</p>
//                       <p className="text-2xl font-bold">$2,050</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                   <div className="flex items-center space-x-3 mb-2">
//                     <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
//                       <Clock className="w-6 h-6 text-yellow-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-400">In Escrow</p>
//                       <p className="text-2xl font-bold">$750</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                   <div className="flex items-center space-x-3 mb-2">
//                     <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
//                       <CheckCircle className="w-6 h-6 text-green-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-400">Released</p>
//                       <p className="text-2xl font-bold">$1,300</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                   <div className="flex items-center space-x-3 mb-2">
//                     <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
//                       <TrendingUp className="w-6 h-6 text-emerald-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-400">This Month</p>
//                       <p className="text-2xl font-bold">$1,300</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
//                 <div className="p-6 border-b border-gray-700">
//                   <h3 className="text-xl font-semibold">Payment History</h3>
//                 </div>
//                 <div className="divide-y divide-gray-700">
//                   {payments.map((payment) => (
//                     <div key={payment.id} className="p-6 flex items-center justify-between">
//                       <div>
//                         <h4 className="font-semibold">{payment.project}</h4>
//                         <p className="text-sm text-gray-400">{payment.date}</p>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-xl font-bold">{payment.amount}</div>
//                         <div className={`text-sm ${payment.status === 'Released' ? 'text-green-400' : 'text-yellow-400'}`}>
//                           {payment.status}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkerDashboard;