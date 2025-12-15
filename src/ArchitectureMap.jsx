import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Palette,
  Zap,
  Terminal,
  ArrowRight,
  Cpu,
  Share2,
  Activity,
  Lock,
  Database,
  Server,
  Menu,
  Grid
} from 'lucide-react';

// --- CONFIGURATION ---
const APP_NAME = "CaBa"; // <--- YAHAN APNE APP KA NAAM LIKHEIN

// --- Data: Architecture Mapping ---
const techData = [
  {
    id: 'frontend',
    title: 'Frontend Core',
    icon: <Code2 size={20} />,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500',
    shadowColor: 'shadow-cyan-500/20',
    gradient: 'from-cyan-500/20 to-blue-500/5',
    description: 'Scalable UI architecture powered by React 19 and TypeScript.',
    details: [
      {
        tech: 'React',
        role: 'UI FRAMEWORK',
        desc: 'Powers scalable component architecture for dynamic user interfaces, enabling event-driven rendering and seamless state management in real-time communication flows.',
        meta: 'v19.2.0',
        highlight: '#61DAFB'
      },
      {
        tech: 'TypeScript',
        role: 'TYPE SYSTEM',
        desc: 'Enforces strict type safety and compile-time error detection, enhancing code reliability and maintainability in complex WebRTC integrations.',
        meta: 'v5.9.3',
        highlight: '#3178C6'
      },
      {
        tech: 'Vite',
        role: 'BUILD TOOL',
        desc: 'Delivers lightning-fast hot module replacement and optimized bundling, minimizing latency in development and production environments.',
        meta: 'v7.2.2',
        highlight: '#646CFF'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Infrastructure',
    icon: <Server size={20} />,
    color: 'text-green-400',
    borderColor: 'border-green-500',
    shadowColor: 'shadow-green-500/20',
    gradient: 'from-green-500/20 to-emerald-500/5',
    description: 'Real-time data synchronization and cross-platform bridges.',
    details: [
      {
        tech: 'Supabase',
        role: 'DATABASE SERVICE',
        desc: 'Provides real-time database synchronization and authentication, supporting scalable user management and data persistence for messaging and call history.',
        meta: 'v2.83.0',
        highlight: '#3ECF8E'
      },
      {
        tech: 'Capacitor',
        role: 'MOBILE BRIDGE',
        desc: 'Enables cross-platform native functionality, bridging web technologies to mobile hardware for camera access and push notifications.',
        meta: 'v8.0.0',
        highlight: '#119EFF'
      },
      {
        tech: 'WebRTC',
        role: 'REAL-TIME ENGINE',
        desc: 'Facilitates peer-to-peer audio/video streaming with low-latency signaling, ensuring high-quality communication channels.',
        meta: 'Native',
        highlight: '#000000'
      }
    ]
  },
  {
    id: 'design',
    title: 'Design System',
    icon: <Palette size={20} />,
    color: 'text-purple-400',
    borderColor: 'border-purple-500',
    shadowColor: 'shadow-purple-500/20',
    gradient: 'from-purple-500/20 to-fuchsia-500/5',
    description: 'Adaptive visual language with consistent iconography.',
    details: [
      {
        tech: 'Lucide React',
        role: 'ICON LIBRARY',
        desc: 'Delivers consistent, scalable vector icons for intuitive UI elements, optimizing visual hierarchy and user experience.',
        meta: 'v0.554.0',
        highlight: '#FFFFFF'
      },
      {
        tech: 'Custom CSS',
        role: 'STYLE ARCHITECTURE',
        desc: 'Implements responsive, theme-aware styling with glassmorphism effects, ensuring adaptive layouts across devices.',
        meta: 'CSS3',
        highlight: '#1572B6'
      }
    ]
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    icon: <Zap size={20} />,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500',
    shadowColor: 'shadow-yellow-500/20',
    gradient: 'from-yellow-500/20 to-orange-500/5',
    description: 'Ensuring instant load times and seamless updates.',
    details: [
      {
        tech: 'Vite Optimized',
        role: 'DEV SERVER',
        desc: 'Accelerates development cycles with instant hot reloading and efficient asset processing, reducing build times significantly.',
        meta: 'v7.2.2',
        highlight: '#646CFF'
      },
      {
        tech: 'Capacitor Updater',
        role: 'OTA UPDATES',
        desc: 'Enables over-the-air app updates, minimizing downtime and ensuring seamless feature deployments across mobile platforms.',
        meta: 'v7.34.2',
        highlight: '#FF6B35'
      }
    ]
  }
];

const ArchitectureMap = () => {
  const [activeCategory, setActiveCategory] = useState(techData[0]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [linePath, setLinePath] = useState('');

  // Refs
  const containerRef = useRef(null);
  const activeNodeRef = useRef(null);
  const busRef = useRef(null);

  // --- Dynamic Curved Line Calculation ---
  useEffect(() => {
    let animationFrameId;
    let startTime;

    const calculatePath = () => {
      if (activeNodeRef.current && busRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const nodeRect = activeNodeRef.current.getBoundingClientRect();
        const busRect = busRef.current.getBoundingClientRect();

        // Coordinates relative to the Grid Container (where the SVG lives)
        const startX = nodeRect.right - containerRect.left;
        const startY = nodeRect.top - containerRect.top + nodeRect.height / 2;

        const endX = busRect.left - containerRect.left + busRect.width / 2;
        const endY = busRect.top - containerRect.top + busRect.height / 2;

        // Control points for organic vein shape
        const cp1X = startX + (endX - startX) * 0.5;
        const cp1Y = startY;
        const cp2X = endX - (endX - startX) * 0.2;
        const cp2Y = endY;

        setLinePath(`M ${startX},${startY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`);
      }
    };

    calculatePath();

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      calculatePath();

      if (progress < 400) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    window.addEventListener('resize', calculatePath);
    window.addEventListener('scroll', calculatePath, true);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', calculatePath);
      window.removeEventListener('scroll', calculatePath, true);
    };
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">

      {/* --- FIXED NAVBAR (APP IDENTITY) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
           {/* Left: Branding */}
           <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center w-10 h-10 bg-slate-900 rounded-lg border border-slate-800">
                 <Grid size={24} className="text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
                   {APP_NAME}
                   <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_cyan]"></div>
                </h1>
                <div className="text-[10px] md:text-xs font-mono text-slate-500 leading-none mt-0.5">
                  SYSTEM ARCHITECTURE
                </div>
              </div>
           </div>

           {/* Right: Meta Info (Desktop) */}
           <div className="hidden md:flex items-center gap-6 text-[10px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                 <span>OPERATIONAL</span>
              </div>
              <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">
                BUILD: V2.4.0
              </div>
           </div>

           {/* Mobile Menu Icon */}
           <button className="md:hidden text-slate-400">
             <Menu size={24} />
           </button>
        </div>
      </nav>

      {/* --- Technical Grid Background --- */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #808080 1px, transparent 1px),
            linear-gradient(to bottom, #808080 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* --- Ambient Glows --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-12 lg:h-screen lg:flex lg:flex-col justify-center">

        {/* --- HERO HEADER --- */}
        <header className="mb-6 lg:mb-12 relative animate-in fade-in slide-in-from-top-4 duration-700">
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 border-b border-slate-800/60 pb-6">
             <div>
                <div className="flex items-center gap-3 mb-2 lg:mb-3">
                  <div className="h-px w-6 lg:w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                  <span className="text-[10px] lg:text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase">Interactive Blueprint</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Tech<span className="text-slate-700">Stack</span>.Map<span className="text-cyan-500 animate-pulse">_</span>
                </h1>
                <p className="mt-2 text-slate-400 max-w-lg text-sm md:text-base leading-relaxed">
                   Visualizing the component logic, backend bridges, and design tokens powering {APP_NAME}.
                </p>
             </div>
           </div>
        </header>

        {/* --- MAIN GRID CONTAINER --- */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 relative">

          {/* --- SVG Layer for Curved Lines --- */}
          <svg className="hidden lg:block absolute inset-0 pointer-events-none z-10 w-full h-full overflow-visible">
            <path
              d={linePath}
              fill="none"
              stroke="rgba(6,182,212, 0.2)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d={linePath}
              fill="none"
              stroke="url(#vein-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-dash"
              strokeDasharray="10, 20"
            />
            <defs>
              <linearGradient id="vein-gradient" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* --- LEFT COLUMN: Navigation Nodes --- */}
          <div className="lg:col-span-4 relative z-20 flex flex-col justify-center">
            <div className="flex flex-col gap-3 lg:gap-5">
              {techData.map((category) => {
                const isActive = activeCategory.id === category.id;

                return (
                  <div
                    key={category.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredNode(category.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <button
                      ref={isActive ? activeNodeRef : null}
                      onClick={() => setActiveCategory(category)}
                      className={`
                        relative w-full text-left p-4 lg:p-5 rounded-xl border transition-all duration-300 group z-20
                        ${isActive
                          ? `bg-slate-900 border-l-4 ${category.borderColor} border-y-slate-800 border-r-slate-800 shadow-lg scale-[1.02] lg:scale-105`
                          : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700 hover:bg-slate-800/40'}
                      `}
                    >
                      {/* Active Gradient Background */}
                      {isActive && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-100 rounded-xl pointer-events-none`} />
                      )}

                      <div className="relative z-10 flex items-center gap-4">
                        <div className={`
                          w-12 h-12 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center border transition-all duration-300
                          ${isActive
                            ? `bg-slate-950 ${category.color} border-${category.color.split('-')[1]}-500/30 shadow-[0_0_15px_-5px_currentColor]`
                            : 'bg-slate-950 border-slate-800 text-slate-500 group-hover:text-slate-400'}
                        `}>
                          {category.icon}
                        </div>

                        <div>
                          <h3 className={`font-bold tracking-wide text-sm ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                            {category.title.toUpperCase()}
                          </h3>
                          <div className="text-[10px] font-mono text-slate-500 mt-1 flex items-center gap-2">
                            <span>ID: {category.id.substring(0,4).toUpperCase()}</span>
                            {isActive && <span className="text-cyan-500 animate-pulse">● ACTIVE</span>}
                          </div>
                        </div>
                      </div>

                      {/* Right Edge Connector Node */}
                      <div className={`
                        hidden lg:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 bg-slate-950 z-30 transition-colors duration-300
                        ${isActive ? `border-cyan-400 shadow-[0_0_10px_cyan]` : 'border-slate-700 opacity-0 group-hover:opacity-100'}
                      `} />

                      {/* Mobile Active Indicator */}
                      {isActive && (
                        <div className={`lg:hidden absolute bottom-0 left-4 right-4 h-[2px] bg-${category.color.split('-')[1]}-500 opacity-50 shadow-[0_0_10px_currentColor]`} />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- MIDDLE GUTTER: The System Bus --- */}
          <div className="hidden lg:flex lg:col-span-1 justify-center relative pointer-events-none z-10">
             <div ref={busRef} className="h-full w-[2px] bg-slate-800 relative">
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent opacity-50 blur-sm animate-pulse-slow" />

                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[2px] bg-cyan-500/50">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan]" />
                </div>
             </div>
          </div>

          {/* --- RIGHT COLUMN: Detail HUD --- */}
          <div className="lg:col-span-7 mt-4 lg:mt-0 relative z-20">
            <div className="hidden lg:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-cyan-400 bg-slate-950 z-30 shadow-[0_0_10px_cyan]" />

            <div className="min-h-[500px] lg:h-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 relative overflow-hidden flex flex-col shadow-2xl rounded-2xl lg:rounded-none">

              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg lg:rounded-none" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg lg:rounded-none" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg lg:rounded-none" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg lg:rounded-none" />

              <div className="flex items-center justify-between px-5 py-4 lg:px-6 border-b border-slate-800 bg-slate-950/50">
                <div className="flex items-center gap-3">
                   <Activity size={16} className="text-cyan-400" />
                   <span className="text-[10px] lg:text-xs font-mono text-cyan-400 uppercase tracking-widest truncate max-w-[150px] lg:max-w-none">
                     DATA_STREAM: {activeCategory.id}
                   </span>
                </div>
                <Share2 size={16} className="text-slate-600" />
              </div>

              <div className="p-5 lg:p-8 flex-1 overflow-y-auto custom-scrollbar relative">

                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />

                <div key={activeCategory.id} className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="mb-8 lg:mb-10">
                    <h2 className={`text-3xl lg:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${activeCategory.gradient.replace('/20', '')} to-white`}>
                      {activeCategory.title}
                    </h2>
                    <p className="text-slate-400 text-sm lg:text-lg font-light leading-relaxed border-l-2 border-slate-700 pl-4">
                      {activeCategory.description}
                    </p>
                  </div>

                  <div className="space-y-4 lg:space-y-5">
                    {activeCategory.details.map((item, idx) => (
                      <div
                        key={item.tech}
                        className="group relative bg-slate-950/40 border border-slate-800 hover:border-slate-600 transition-all duration-300 p-5 lg:p-6 overflow-hidden rounded-xl"
                        style={{ animationDelay: `${idx * 150}ms` }}
                      >
                         <div
                           className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-full opacity-10"
                           style={{ backgroundColor: item.highlight }}
                         />

                         <div className="relative z-10 flex flex-col sm:flex-row gap-5 lg:gap-6">
                            <div className="flex-shrink-0">
                               <div
                                 className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-slate-900 border border-slate-800 font-bold text-xl lg:text-2xl rounded-lg shadow-inner"
                                 style={{ color: item.highlight.substring(0, 7) }}
                               >
                                 {item.tech.charAt(0)}
                               </div>
                            </div>

                            <div className="flex-1">
                               <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                                  <h3 className="font-bold text-slate-200 text-lg lg:text-xl group-hover:text-white transition-colors">{item.tech}</h3>
                                  <span className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-slate-900 text-slate-500 border border-slate-800">
                                    {item.meta}
                                  </span>
                                </div>
                               <p className="text-cyan-500/80 text-xs font-mono uppercase mb-2 tracking-wider font-semibold">{item.role}</p>
                               <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="px-5 py-3 lg:px-6 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center text-[10px] font-mono text-slate-500">
                 <div>SECURE_CONN_OK</div>
                 <div className="flex items-center gap-2">
                   <Lock size={10} /> ENCRYPTED
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ArchitectureMap;