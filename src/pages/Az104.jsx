import React, { useState } from 'react';
import { 
  Users, 
  Database, 
  Cpu, 
  Network, 
  Activity, 
  ChevronRight, 
  ChevronDown, 
  Info,
  Lightbulb,
  CheckCircle2,
  X
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const examData = [
    {
      id: 0,
      title: "Manage Azure Identities & Governance",
      percentage: "20–25%",
      icon: <Users className="w-8 h-8" />,
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      subtopics: [
        {
          name: "Microsoft Entra (AD)",
          items: [
            { 
              title: "Create users/groups", 
              details: "Focus on bulk updates using CSV, dynamic group membership rules (user.department -eq 'Sales'), and administrative units.",
              tips: "Know the difference between Security groups and Microsoft 365 groups."
            },
            { 
              title: "Manage properties & licenses", 
              details: "Understand group-based licensing and how to resolve license conflicts.",
              tips: "Directly assigned licenses stay even if a user is removed from a group."
            },
            { 
              title: "External users", 
              details: "B2B collaboration, guest user settings, and external identity providers.",
              tips: "Guest users have limited permissions by default."
            },
            { 
              title: "SSPR configuration", 
              details: "Self-Service Password Reset requirements: authentication methods (Email, SMS, App) and registration enforcement.",
              tips: "Requires Microsoft Entra ID P1 or P2 license."
            }
          ]
        },
        {
          name: "Access Control",
          items: [
            { 
              title: "Built-in Azure roles", 
              details: "Owner vs Contributor vs Reader. Contributor cannot grant access to others.",
              tips: "User Access Administrator is the only role that can manage RBAC without being an Owner."
            },
            { 
              title: "Role assignment at scope", 
              details: "Inheritance flows from Management Group -> Subscription -> Resource Group -> Resource.",
              tips: "Deny assignments take precedence over allow assignments."
            }
          ]
        }
      ]
    },
    {
      id: 1,
      title: "Implement & Manage Storage",
      percentage: "15–20%",
      icon: <Database className="w-8 h-8" />,
      color: "bg-cyan-600",
      lightColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      textColor: "text-cyan-700",
      subtopics: [
        {
          name: "Storage Access",
          items: [
            { 
              title: "Firewalls & VNETs", 
              details: "Restricting access to specific IP ranges or specific subnets using Service Endpoints.",
              tips: "Trusted Microsoft services must be explicitly allowed."
            },
            { 
              title: "SAS tokens", 
              details: "Account SAS vs Service SAS. Using stored access policies to revoke tokens.",
              tips: "Always prefer User Delegation SAS (Entra ID) over Account Keys."
            }
          ]
        },
        {
          name: "Storage Accounts",
          items: [
            { 
              title: "Redundancy (LRS, GRS, etc.)", 
              details: "LRS (3 copies, 1 DC), ZRS (3 copies, 3 zones), GRS (6 copies, 2 regions).",
              tips: "Know that RA-GRS provides read-only access to the secondary region."
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Deploy & Manage Compute Resources",
      percentage: "20–25%",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-indigo-600",
      lightColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
      subtopics: [
        {
          name: "Virtual Machines",
          items: [
            { 
              title: "VM Creation", 
              details: "OS types, sizing (vCPUs/RAM), and region selection.",
              tips: "VMs must be in the same region as the VNET they connect to."
            },
            { 
              title: "Availability Sets/Zones", 
              details: "AS protects against hardware failure (Fault Domains) and updates (Update Domains). AZ protects against entire DC failure.",
              tips: "Availability Zones provide a 99.99% SLA."
            },
            { 
              title: "Scale Sets (VMSS)", 
              details: "Auto-scaling based on metrics (CPU, Memory). Horizontal vs Vertical scaling.",
              tips: "Overprovisioning allows VMSS to spin up extra VMs to ensure successful deployment."
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Implement & Manage Virtual Networking",
      percentage: "15–20%",
      icon: <Network className="w-8 h-8" />,
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      subtopics: [
        {
          name: "Network Security",
          items: [
            { 
              title: "NSGs & ASGs", 
              details: "Security rules (Priority 100-65000). Application Security Groups allow grouping by function (e.g., 'WebServers').",
              tips: "Default rules allow internal VNET traffic and outbound Internet traffic."
            },
            { 
              title: "Azure Bastion", 
              details: "Secure RDP/SSH via browser without exposing public IPs on VMs.",
              tips: "Bastion is deployed in a dedicated subnet named 'AzureBastionSubnet'."
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Monitor & Maintain Resources",
      percentage: "10–15%",
      icon: <Activity className="w-8 h-8" />,
      color: "bg-rose-600",
      lightColor: "bg-rose-50",
      borderColor: "border-rose-200",
      textColor: "text-rose-700",
      subtopics: [
        {
          name: "Monitoring",
          items: [
            { 
              title: "Log Analytics Queries", 
              details: "Using Kusto Query Language (KQL) to filter and aggregate logs.",
              tips: "Common command: 'Heartbeat | summarize count() by bin(TimeGenerated, 1h), Computer'."
            }
          ]
        },
        {
          name: "Backup & Recovery",
          items: [
            { 
              title: "Recovery Services Vaults", 
              details: "Storage for VM backups and Azure Site Recovery data.",
              tips: "Soft Delete for backups is enabled by default (14-day retention)."
            }
          ]
        }
      ]
    }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center md:text-left border-b border-slate-200 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl leading-tight">
                AZ-104 <span className="text-blue-600">Azure Administrator</span>
              </h1>
              <p className="mt-2 text-lg text-slate-600 font-medium">Interactive Knowledge Map</p>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-white shadow-sm border border-slate-200 text-slate-700 rounded-2xl text-sm font-semibold">
              <Info className="w-4 h-4 mr-2 text-blue-500" />
              Click skills for deep-dive details
            </div>
          </div>
        </header>

        {/* Domain Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {examData.map((domain) => (
            <button
              key={domain.id}
              onClick={() => { setActiveTab(domain.id); setSelectedItem(null); }}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center group ${
                activeTab === domain.id 
                ? `${domain.borderColor} ${domain.lightColor} shadow-md scale-105` 
                : 'border-transparent bg-white hover:bg-slate-100'
              }`}
            >
              <div className={`p-2 rounded-xl transition-transform group-hover:scale-110 ${domain.color} text-white mb-2`}>
                {React.cloneElement(domain.icon, { className: "w-5 h-5" })}
              </div>
              <span className={`text-sm font-black ${domain.textColor}`}>{domain.percentage}</span>
            </button>
          ))}
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* List Section */}
          <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl ${examData[activeTab].color} text-white shadow-lg`}>
                  {examData[activeTab].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{examData[activeTab].title}</h3>
                  <p className="text-slate-500 font-medium tracking-wide">Domain {activeTab + 1} • {examData[activeTab].percentage}</p>
                </div>
              </div>

              <div className="space-y-10">
                {examData[activeTab].subtopics.map((sub, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-100">
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${examData[activeTab].color}`}></div>
                    <h4 className={`text-md font-bold uppercase tracking-widest mb-4 ${examData[activeTab].textColor}`}>{sub.name}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {sub.items.map((item, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleItemClick(item)}
                          className={`group flex items-center justify-between text-left p-4 rounded-xl transition-all border ${
                            selectedItem?.title === item.title 
                            ? `${examData[activeTab].borderColor} ${examData[activeTab].lightColor} ring-1 ring-inset ${examData[activeTab].borderColor}` 
                            : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 hover:shadow-md'
                          }`}
                        >
                          <span className="font-semibold text-slate-700 flex items-center gap-3">
                            <CheckCircle2 className={`w-4 h-4 ${selectedItem?.title === item.title ? examData[activeTab].textColor : 'text-slate-300'}`} />
                            {item.title}
                          </span>
                          <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${examData[activeTab].textColor}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Pane */}
          <div className="lg:w-96 flex flex-col">
            {selectedItem ? (
              <div className="bg-slate-900 rounded-3xl p-8 text-white sticky top-8 shadow-2xl animate-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-2 rounded-lg ${examData[activeTab].color} bg-opacity-20`}>
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold mb-4">{selectedItem.title}</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Concepts</h4>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      {selectedItem.details}
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl bg-white/5 border border-white/10`}>
                    <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Info className="w-3 h-3" /> Exam Tip
                    </h4>
                    <p className="text-slate-300 text-sm italic">
                      "{selectedItem.tips}"
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Part of Domain {activeTab + 1}</p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] sticky top-8">
                <div className="bg-slate-200 p-4 rounded-full mb-4">
                  <ChevronRight className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-semibold">Select a skill to see <br/>study notes & exam tips</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar Footer */}
        <div className="mt-12 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Weight Distribution</h2>
            <span className="text-xs text-slate-500 italic">Percentages vary slightly per exam instance</span>
          </div>
          <div className="flex h-4 w-full rounded-full overflow-hidden bg-slate-100">
            {examData.map((domain) => {
              const avg = parseInt(domain.percentage.split('–')[0]);
              return (
                <div 
                  key={domain.id}
                  style={{ flex: avg }}
                  className={`${domain.color} border-r border-white/20 last:border-0`}
                  title={`${domain.title}: ${domain.percentage}`}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-5 mt-3 text-[10px] font-bold text-slate-400">
             {examData.map(d => <div key={d.id} className="text-center">{d.percentage}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
