import React, { useState } from 'react';
import { 
  Users, 
  Database, 
  Cpu, 
  Network, 
  Activity, 
  ChevronRight, 
  Info,
  Lightbulb,
  CheckCircle2,
  X,
  AlertTriangle,
  Layers,
  Target
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
          name: "Microsoft Entra (ID)",
          items: [
            { 
              title: "Create users/groups", 
              details: "Manage user/group properties, properties, and licenses. Use dynamic membership rules (e.g., user.department -eq 'Marketing') for automation.",
              tips: "Know the specific user attributes used in dynamic rules and bulk CSV operations. Managed Identities are preferred over service principals to avoid secret management.",
              gotcha: "You cannot delete a user or group if they have a license directly assigned. Resource lifecycle boundaries are defined at the RG level, not the user level."
            },
            { 
              title: "External users & SSPR", 
              details: "B2B collaboration involves inviting guest users. Self-Service Password Reset (SSPR) requires specific license levels and configuration of auth methods.",
              tips: "Sequence for custom domains: Add -> DNS (TXT/MX) -> Verify. DNS verification is a hard requirement.",
              gotcha: "Mixing up B2B (Guest) vs B2C (Customer) use cases. SSPR needs to be enabled for a group or all users, not individual resources."
            }
          ]
        },
        {
          name: "Access & Governance",
          items: [
            { 
              title: "RBAC & Scope", 
              details: "Hierarchy: Management Group > Subscription > Resource Group > Resource. Permissions are additive and inherited.",
              tips: "Contributor can do everything except grant access. User Access Administrator handles RBAC. Managed identities avoid secret leakage.",
              gotcha: "Mixing up RBAC vs Policy. RBAC = WHO can do it. Policy = WHAT is allowed (state/governance). Assigning at Subscription instead of RG violates Least Privilege."
            },
            { 
              title: "Azure Policy & Costs", 
              details: "Enforce, Deny, or Audit resource configurations. Manage costs with alerts, budgets, and Advisor recommendations.",
              tips: "Use Policies to restrict VM sizes or allowed regions across a subscription for governance at scale.",
              gotcha: "Policy does NOT grant access. If a policy allows a VM type but the user lacks RBAC Contributor, they still can't create it."
            },
            { 
              title: "Locks & Tags", 
              details: "Locks: CanNotDelete vs ReadOnly. Tags: Key-value pairs for cost allocation and organization.",
              tips: "Locks apply to all users, even Owners. Tags do NOT inherit from RG to Resource by default.",
              gotcha: "A ReadOnly lock on a Storage Account prevents anyone from even listing access keys, blocking data plane operations."
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
          name: "Storage Configuration",
          items: [
            { 
              title: "Storage Accounts & Replication", 
              details: "LRS, ZRS, GRS, GZRS. Configure redundancy and object replication across accounts.",
              tips: "RA-GRS provides Read Access to secondary. ZRS is best for high availability within a region.",
              gotcha: "GRS does NOT provide read access to the secondary unless it is RA-GRS or a failover is initiated manually."
            },
            { 
              title: "Access & Security", 
              details: "Firewalls, VNET integration, SAS tokens, and Stored Access Policies. Manage keys and identity-based access for Files.",
              tips: "Use User-Delegation SAS (Entra ID) for better security than Account Keys. SAS tokens provide limited-time scoped access.",
              gotcha: "Changing a storage account key immediately invalidates all applications currently using that specific key. Use Stored Access Policies to revoke SAS easily."
            }
          ]
        },
        {
          name: "Data Management",
          items: [
            { 
              title: "Blob & File Tiers", 
              details: "Hot, Cool, Archive. Lifecycle management moves data based on age or last access.",
              tips: "Azure File Sync is the key for hybrid/on-prem lift-and-shift integration.",
              gotcha: "Picking Blobs for a scenario that requires a legacy application to map a drive letter (often needs Files). Archive tier blobs must be rehydrated before use."
            },
            { 
              title: "Protection (Soft Delete)", 
              details: "Soft delete for blobs, containers, and file shares. Versioning and snapshots.",
              tips: "Use Azure Storage Explorer or AzCopy for large data migrations or management.",
              gotcha: "Soft delete protects against accidental deletion but is not a replacement for a structured backup policy."
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Deploy & Manage Compute",
      percentage: "20–25%",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-indigo-600",
      lightColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
      subtopics: [
        {
          name: "VMs & Automation",
          items: [
            { 
              title: "ARM & Bicep", 
              details: "Interpret, modify, and deploy templates. Export existing deployments as code.",
              tips: "Focus on 'Incremental' vs 'Complete' deployment modes. Bicep is the Azure-native evolution of ARM JSON.",
              gotcha: "Complete mode DELETES resources in the group not defined in the template. Incremental is the safer, more common exam choice."
            },
            { 
              title: "VM Resiliency", 
              details: "Availability Sets (Fault/Update domains) vs Availability Zones. Sizing and Disk management.",
              tips: "Zones offer a 99.99% SLA. Sets offer 99.95%. VMSS (Scale Sets) for auto-scaling.",
              gotcha: "You cannot move an existing VM into an Availability Zone after it's created. It must be selected during the creation process."
            }
          ]
        },
        {
          name: "Containers & PaaS",
          items: [
            { 
              title: "App Service", 
              details: "Plans, scaling, custom DNS, TLS/SSL, and deployment slots.",
              tips: "Scaling Up (Hardware) vs Scaling Out (Instances). Slots allow zero-downtime deployments.",
              gotcha: "Overusing VMs (IaaS) when PaaS (App Service) fits. Always prefer PaaS in scenarios asking for reduced management overhead."
            },
            { 
              title: "ACI & Containers", 
              details: "Azure Container Registry (ACR), Container Instances (ACI), and Container Apps (ACA).",
              tips: "ACI is for simple, isolated containers. ACA is for serverless microservices that need scaling.",
              gotcha: "Not matching scaling needs to the right compute. ACI does not auto-scale; ACA/VMSS does."
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Virtual Networking",
      percentage: "15–20%",
      icon: <Network className="w-8 h-8" />,
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      subtopics: [
        {
          name: "VNET Configuration",
          items: [
            { 
              title: "Peering & Routes", 
              details: "VNET peering, Public IPs, and User-Defined Routes (UDR) for traffic steering.",
              tips: "Peering is NOT transitive. If A peers with B, and B with C, A is not peered with C.",
              gotcha: "Overlapping IP address spaces prevent peering. System routes exist by default; UDRs override them (Next Hop: NVA)."
            },
            { 
              title: "Connectivity Support", 
              details: "Azure Bastion for secure RDP/SSH. Service Endpoints vs Private Endpoints.",
              tips: "Bastion provides access via browser/SSL, eliminating the need for Public IPs on VMs.",
              gotcha: "Private Endpoints provide a private IP to a PaaS service; Service Endpoints keep traffic on the backbone but use public IPs."
            }
          ]
        },
        {
          name: "Security & Load Balancing",
          items: [
            { 
              title: "NSG & ASG", 
              details: "Network Security Groups (L4) and Application Security Groups (labels). Effective rule evaluation.",
              tips: "Rules are processed 100-65000. First match wins. Inbound and Outbound are separate.",
              gotcha: "Confusing what an NSG can filter. They filter by Port/Protocol/IP (L4), NOT URLs (L7). Use App Gateway for URLs."
            },
            { 
              title: "Load Balancers", 
              details: "Internal vs Public. Basic vs Standard. Troubleshooting health probes.",
              tips: "Standard LB is required for Availability Zones and is secure-by-default (requires NSG).",
              gotcha: "Layer 4 (LB) vs Layer 7 (App Gateway). Pick the 'right front door'—if you need cookie-based affinity, go Layer 7."
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Monitor & Maintain",
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
              title: "Azure Monitor & Logs", 
              details: "Metrics, Logs, KQL queries, and Alerts. Action groups and alert processing rules.",
              tips: "Use KQL (Kusto) to query Log Analytics. Diagnostic settings must be manually enabled for most services.",
              gotcha: "Treating logs (detailed records) and metrics (numerical/real-time) as the same. Metrics are for alerting; logs for troubleshooting."
            },
            { 
              title: "Network Watcher", 
              details: "Connection Monitor, IP Flow Verify, and NSG Flow Logs.",
              tips: "IP Flow Verify is the fastest way to check if an NSG is blocking a specific port.",
              gotcha: "Network Watcher is region-specific; ensure it is enabled in the region you are troubleshooting."
            }
          ]
        },
        {
          name: "Backup & Recovery",
          items: [
            { 
              title: "Recovery Services Vault", 
              details: "Azure Backup policies and Site Recovery (ASR) for disaster recovery.",
              tips: "Backup is for data/file recovery. ASR is for failing over to a secondary region when the primary is down.",
              gotcha: "Confusing Backup (Point-in-time recovery) with ASR (Replication/Availability). ASR is about RTO/RPO and regional failover."
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center md:text-left border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl leading-tight">
            AZ-104 <span className="text-blue-600">Administrator Blueprint</span>
          </h1>
          <p className="mt-2 text-lg text-slate-600 font-medium italic">Decision Logic • Skill Map • Exam Traps</p>
        </header>

        {/* Domain Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {examData.map((domain) => (
            <button
              key={domain.id}
              onClick={() => { setActiveTab(domain.id); setSelectedItem(null); }}
              className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center text-center group ${
                activeTab === domain.id 
                ? `${domain.borderColor} ${domain.lightColor} shadow-lg scale-105` 
                : 'border-transparent bg-white hover:bg-slate-50 hover:border-slate-100 shadow-sm'
              }`}
            >
              <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${domain.color} text-white mb-3 shadow-md`}>
                {React.cloneElement(domain.icon, { className: "w-6 h-6" })}
              </div>
              <span className={`text-xs font-black ${domain.textColor} uppercase tracking-tighter`}>{domain.percentage}</span>
            </button>
          ))}
        </div>

        {/* Main Content Split View */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main List Section */}
          <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-6 md:p-10">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-5">
                  <div className={`p-5 rounded-2xl ${examData[activeTab].color} text-white shadow-lg`}>
                    {examData[activeTab].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 leading-tight">{examData[activeTab].title}</h3>
                    <p className="text-slate-500 font-semibold tracking-wide flex items-center gap-2 mt-1">
                      <Target className="w-4 h-4 text-slate-400" />
                      Section Weight: {examData[activeTab].percentage}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                {examData[activeTab].subtopics.map((sub, idx) => (
                  <div key={idx} className="relative pl-8 border-l-2 border-slate-100">
                    <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-md ${examData[activeTab].color}`}></div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mb-6">{sub.name}</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {sub.items.map((item, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleItemClick(item)}
                          className={`group flex items-center justify-between text-left p-5 rounded-2xl transition-all border-2 ${
                            selectedItem?.title === item.title 
                            ? `${examData[activeTab].borderColor} ${examData[activeTab].lightColor} ring-1 ring-inset ${examData[activeTab].borderColor}` 
                            : 'bg-white border-slate-50 hover:bg-slate-50 hover:border-slate-200 hover:shadow-lg'
                          }`}
                        >
                          <span className="font-bold text-slate-700 flex items-center gap-4">
                            <CheckCircle2 className={`w-5 h-5 transition-colors ${selectedItem?.title === item.title ? examData[activeTab].textColor : 'text-slate-200 group-hover:text-slate-400'}`} />
                            {item.title}
                          </span>
                          <ChevronRight className={`w-5 h-5 transition-all group-hover:translate-x-1.5 ${examData[activeTab].textColor}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:w-[420px] flex flex-col">
            {selectedItem ? (
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white sticky top-8 shadow-2xl transition-all animate-in slide-in-from-right-8 duration-500">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-2xl font-bold leading-tight border-b border-white/10 pb-4 flex-1 mr-4">{selectedItem.title}</h3>
                  <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                    <X className="w-6 h-6 text-slate-500 group-hover:text-white" />
                  </button>
                </div>
                
                <div className="space-y-8">
                  <section>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Layers className="w-3 h-3" /> Technical Breakdown
                    </h4>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      {selectedItem.details}
                    </p>
                  </section>

                  <section className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-blue-500/20">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                      </div>
                      <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Study Tip</h4>
                    </div>
                    <p className="text-slate-200 text-sm italic leading-relaxed relative z-10">
                      "{selectedItem.tips}"
                    </p>
                  </section>

                  {selectedItem.gotcha && (
                    <section className="bg-rose-500/10 border border-rose-500/30 rounded-3xl p-6 relative overflow-hidden">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-rose-500/20">
                          <AlertTriangle className="w-5 h-5 text-rose-400" />
                        </div>
                        <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-widest">EXAM GOTCHA</h4>
                      </div>
                      <p className="text-rose-100 text-sm font-bold leading-relaxed relative z-10">
                        {selectedItem.gotcha}
                      </p>
                    </section>
                  )}
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                  <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest">Competency Map Verified</p>
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center min-h-[400px] sticky top-8 shadow-inner">
                <div className="bg-slate-50 p-6 rounded-full mb-6">
                  <Info className="w-10 h-10 text-slate-300" />
                </div>
                <h4 className="text-lg font-bold text-slate-400 mb-2">Knowledge Base</h4>
                <p className="text-slate-400 font-medium max-w-[220px]">Select a skill to reveal detailed notes, study tips, and high-probability exam traps.</p>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Distribution Bar */}
        <footer className="mt-12 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="text-center md:text-left">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Domain Distribution</h4>
                <p className="text-lg font-bold text-slate-800">Section Proportions</p>
             </div>
             <div className="flex-1 w-full max-w-xl">
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
                <div className="grid grid-cols-5 mt-3">
                  {examData.map(d => (
                    <div key={d.id} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{d.percentage}</div>
                  ))}
                </div>
             </div>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default App;