import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Activity, 
  Server, 
  ChevronDown, 
  ChevronUp,
  Target,
  Key,
  Scale,
  Share2,
  HardDrive,
  CloudCog,
  ShieldAlert,
  ArrowRightLeft
} from 'lucide-react';

const az305Data = [
  {
    id: 1,
    title: "Design identity, governance, and monitoring solutions",
    percentage: "25–30%",
    avgWeight: 27.5,
    color: "blue",
    icon: ShieldCheck,
    subtopics: [
      {
        name: "Logging and monitoring",
        icon: Target,
        items: ["Logging solutions", "Routing logs", "Monitoring solutions"]
      },
      {
        name: "Authentication & authorization",
        icon: Key,
        items: ["Authentication & Identity management", "Access to Azure & on-premises resources", "Secrets, certificates, and keys management"]
      },
      {
        name: "Governance",
        icon: Scale,
        items: ["Management groups & subscriptions", "Resource tagging strategy", "Compliance management", "Identity governance"]
      }
    ]
  },
  {
    id: 2,
    title: "Design data storage solutions",
    percentage: "20–25%",
    avgWeight: 22.5,
    color: "emerald",
    icon: Database,
    subtopics: [
      {
        name: "Relational data",
        icon: Database,
        items: ["Storage solutions", "Database service & compute tiers", "Database scalability", "Data protection"]
      },
      {
        name: "Semi-structured & unstructured data",
        icon: HardDrive,
        items: ["Storing semi-structured data", "Storing unstructured data", "Balancing features, performance, and costs", "Protection and durability"]
      },
      {
        name: "Data integration",
        icon: Share2,
        items: ["Data integration solutions", "Data analysis solutions"]
      }
    ]
  },
  {
    id: 3,
    title: "Design business continuity solutions",
    percentage: "15–20%",
    avgWeight: 17.5,
    color: "orange",
    icon: Activity,
    subtopics: [
      {
        name: "Backup and disaster recovery",
        icon: ShieldAlert,
        items: ["Recovery for Azure & hybrid workloads", "Compute backup/recovery", "Database backup/recovery", "Unstructured data backup/recovery"]
      },
      {
        name: "High availability",
        icon: Activity,
        items: ["Compute high availability", "Relational data high availability", "Semi/unstructured data high availability"]
      }
    ]
  },
  {
    id: 4,
    title: "Design infrastructure solutions",
    percentage: "30–35%",
    avgWeight: 32.5,
    color: "purple",
    icon: Server,
    subtopics: [
      {
        name: "Compute solutions",
        icon: Server,
        items: ["Workload-based components", "Virtual machine-based", "Container-based", "Serverless-based", "Batch processing"]
      },
      {
        name: "Application architecture",
        icon: CloudCog,
        items: ["Messaging & Event-driven", "API integration", "Caching solutions", "Configuration management", "Automated deployment"]
      },
      {
        name: "Migrations",
        icon: ArrowRightLeft,
        items: ["Cloud Adoption Framework integration", "On-premises evaluation", "IaaS & PaaS migrations", "Database migrations", "Unstructured data migrations"]
      },
      {
        name: "Network solutions",
        icon: Share2,
        items: ["Internet & on-premises connectivity", "Network performance optimization", "Network security optimization", "Load-balancing and routing"]
      }
    ]
  }
];

const colorStyles = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    barFill: "bg-blue-500",
    ring: "ring-blue-100"
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    barFill: "bg-emerald-500",
    ring: "ring-emerald-100"
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    barFill: "bg-orange-500",
    ring: "ring-orange-100"
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-800",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    barFill: "bg-purple-500",
    ring: "ring-purple-100"
  }
};

export default function App() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            AZ-305 Exam Blueprint
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Designing Microsoft Azure Infrastructure Solutions
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm font-medium">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
              Skills at a Glance
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-800">
              Interactive Infographic
            </span>
          </div>
        </div>

        {/* Weight Distribution Bar */}
        <div className="mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Exam Weight Distribution</h3>
          <div className="flex w-full h-6 rounded-full overflow-hidden shadow-inner">
            {az305Data.map((domain) => (
              <div 
                key={domain.id}
                title={`${domain.title} (${domain.percentage})`}
                className={`h-full ${colorStyles[domain.color].barFill} transition-all duration-500 hover:opacity-80 cursor-pointer flex items-center justify-center`}
                style={{ width: `${(domain.avgWeight / 100) * 100}%` }}
              >
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-4 gap-4 justify-between text-xs text-gray-600">
            {az305Data.map((domain) => (
              <div key={domain.id} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full ${colorStyles[domain.color].barFill}`}></span>
                <span className="font-medium">{domain.percentage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {az305Data.map((domain) => {
            const isExpanded = expandedId === domain.id;
            const style = colorStyles[domain.color];
            const MainIcon = domain.icon;

            return (
              <div 
                key={domain.id} 
                className={`flex flex-col bg-white rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${isExpanded ? style.border : 'border-gray-100'}`}
              >
                {/* Card Header */}
                <div 
                  className={`p-6 cursor-pointer rounded-t-2xl flex items-start justify-between ${isExpanded ? style.bg : 'hover:bg-gray-50'}`}
                  onClick={() => toggleExpand(domain.id)}
                >
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-xl ${style.iconBg} ${style.iconColor} ring-4 ${style.ring}`}>
                      <MainIcon size={28} strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold leading-tight mb-2 ${style.text} pr-4`}>
                        {domain.title}
                      </h2>
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold ${style.iconBg} ${style.iconColor}`}>
                        {domain.percentage}
                      </span>
                    </div>
                  </div>
                  <button className={`p-2 rounded-full hover:bg-white/50 transition-colors ${style.iconColor}`}>
                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>
                </div>

                {/* Card Body (Collapsible) */}
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-2 border-t border-gray-100 bg-white rounded-b-2xl">
                    <div className="grid gap-6 mt-4">
                      {domain.subtopics.map((sub, idx) => {
                        const SubIcon = sub.icon;
                        return (
                          <div key={idx} className="relative">
                            <div className="flex items-center gap-2 mb-3">
                              <SubIcon size={18} className="text-gray-400" />
                              <h3 className="text-base font-semibold text-gray-800">
                                {sub.name}
                              </h3>
                            </div>
                            <ul className="space-y-2 ml-7">
                              {sub.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="text-sm text-gray-600 flex items-start">
                                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0 ${style.barFill}`}></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-400">
          <p>Click on the domains to expand and view specific skills measured.</p>
        </div>

      </div>
    </div>
  );
}
