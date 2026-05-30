import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Globe,
  Send,
  ChevronDown,
  Sparkles,
  Database,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Zap,
  Layout,
  Server,
  Smartphone,
  MousePointer2,
  X,
  Menu,
  Sun,
  Moon,
  Youtube,
  Play,
  Video,
  Monitor,
  Film,
  Aperture,
  PlayCircle,
  Palette,
  Volume2,
  VolumeX,
  User,
  MessageSquare,
  Shield,
  Key,
  TrendingUp,
  PenTool
} from 'lucide-react';
import ArchitectureMap from './ArchitectureMap';

// Firebase Imports
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc5670BivqJK4OBRkzrWrWP0Yz_ICiwjw",
  authDomain: "portfolio-bb303.firebaseapp.com",
  projectId: "portfolio-bb303",
  storageBucket: "portfolio-bb303.firebasestorage.app",
  messagingSenderId: "1059828226336",
  appId: "1:1059828226336:web:cf5055c31cc76d4c459f45",
  measurementId: "G-CBG4W73M3Z"
};

// Initialize Firebase services with error handling
let app = null;
let db = null;

const initializeFirebase = () => {
  try {
    app = initializeApp(firebaseConfig);
    
    // Initialize Firestore (for contact form only)
    try {
      db = getFirestore(app);
      console.log('✅ Firebase Firestore initialized - Contact form ready!');
    } catch (error) {
      console.error('❌ Firestore initialization failed:', error.message);
      db = null;
    }
    
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
    console.log('💡 Contact form will not work - please check your Firebase project configuration');
    app = null;
    db = null;
  }
};

// Initialize Firebase when module loads
initializeFirebase();

const appId = 'portfolio-bb303';

// --- Plexus Background Generation ---
const generatePlexus = () => {
  const nodes = [];
  const rows = 6;
  const cols = 8;
  const width = 1440;
  const height = 900;
  const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#3b82f6', '#f43f5e'];
  
  let id = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const baseX = (width / (cols - 1)) * c;
      const baseY = (height / (rows - 1)) * r;
      
      const offsetX = (Math.random() - 0.5) * 160;
      const offsetY = (Math.random() - 0.5) * 120;
      
      const x = Math.max(20, Math.min(width - 20, baseX + offsetX));
      const y = Math.max(20, Math.min(height - 20, baseY + offsetY));
      
      const radius = 3.5 + Math.random() * 3.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isBokeh = id % 6 === 0;
      
      nodes.push({
        id,
        x,
        y,
        r: isBokeh ? 12 + Math.random() * 8 : radius,
        color,
        blur: isBokeh
      });
      id++;
    }
  }

  const lines = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const n1 = nodes[i];
      const n2 = nodes[j];
      if (n1.blur || n2.blur) continue;
      
      const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
      if (dist < 240) {
        lines.push({
          id: `${n1.id}-${n2.id}`,
          x1: n1.x,
          y1: n1.y,
          x2: n2.x,
          y2: n2.y,
          opacity: 0.12 + (1 - dist / 240) * 0.45
        });
      }
    }
  }

  const triangles = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      for (let k = j + 1; k < nodes.length; k++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const n3 = nodes[k];
        if (n1.blur || n2.blur || n3.blur) continue;
        
        const d1 = Math.hypot(n1.x - n2.x, n1.y - n2.y);
        const d2 = Math.hypot(n2.x - n3.x, n2.y - n3.y);
        const d3 = Math.hypot(n3.x - n1.x, n3.y - n1.y);
        
        if (d1 < 240 && d2 < 240 && d3 < 240) {
          triangles.push({
            id: `${n1.id}-${n2.id}-${n3.id}`,
            points: `${n1.x},${n1.y} ${n2.x},${n2.y} ${n3.x},${n3.y}`
          });
        }
      }
    }
  }

  return { nodes, lines, triangles };
};

const plexusData = generatePlexus();

// --- Utility Components ---



const Navbar = ({ activeSection, scrollToSection, theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isFirstRender = useRef(true);

  const playToggleSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
     
      osc.type = 'sine';
      // Din ke liye high tone, raat ke liye deep cozy tone
      const isNight = theme === 'dark';
      osc.frequency.setValueAtTime(isNight ? 190 : 360, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isNight ? 300 : 130, ctx.currentTime + 0.18);
     
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
     
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch (e) {
      console.log("Audio process fail hua", e);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    playToggleSound();
  }, [theme]);

  const navLinks = [
    { name: 'About', id: 'about', icon: <Briefcase size={14} /> },
    { name: 'Expertise', id: 'skills', icon: <Zap size={14} /> },
    { name: 'Work', id: 'projects', icon: <Layers size={14} /> },
    { name: 'Contact', id: 'contact', icon: <Mail size={14} /> },
  ];

  const isNight = theme === 'dark';

  return (
    <nav 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-4xl border ${
        mobileMenuOpen
          ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-cyan-500/30 rounded-[2rem] shadow-xl p-4'
          : isScrolled 
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-cyan-500/20 shadow-lg dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] py-3 rounded-full' 
            : 'bg-transparent border-transparent py-4 rounded-full'
      }`}
    >
      <div className="px-4 sm:px-6 flex justify-between items-center">
        <div 
          className="text-base sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500 cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 select-none" 
          onClick={() => scrollToSection('hero')}
        >
          <Code2 size={20} className="text-cyan-600 dark:text-cyan-400 sm:w-6 sm:h-6 shrink-0" />
          <span className="text-slate-900 dark:text-white transition-colors">Aashu<span className="hidden lg:inline">'s Portfolio</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200 dark:border-white/5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === link.id 
                  ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              {link.icon}
              {link.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hire Me button — same style as Contact Me outlined button */}
          <button 
            onClick={() => scrollToSection('contact')}
            className="hidden sm:flex items-center gap-2 px-5 py-1.5 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-sm font-semibold border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all shadow-sm"
          >
            Hire Me
          </button>

          {/* Skeuomorphic Toggle Switch */}
          <div className="relative select-none" style={{ width: '98px', height: '40px' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.35] origin-center">
              <div className={`relative p-[5px] rounded-[52px] transition-all duration-1000 ${
                isNight
                  ? 'bg-gradient-to-b from-[#1b2536] to-[#0a101a] shadow-[0px_20px_40px_rgba(0,0,0,0.65),0px_6px_14px_rgba(0,0,0,0.35)]'
                  : 'bg-gradient-to-b from-[#f2f6fa] to-[#ced7e2] shadow-[0px_20px_40px_rgba(15,23,42,0.1),0px_6px_14px_rgba(15,23,42,0.05)]'
              }`}
              style={{ width: '280px', height: '116px' }}
              >
                <button
                  onClick={toggleTheme}
                  aria-label="Theme Toggle Switch"
                  className={`relative w-full h-full rounded-[48px] overflow-hidden cursor-pointer select-none border border-transparent transition-all duration-1000 outline-none focus:ring-4 focus:ring-sky-500/40 ${
                    isNight
                      ? 'bg-gradient-to-b from-[#040810] via-[#091120] to-[#111c30] shadow-[inset_0px_9px_16px_rgba(0,0,0,0.75),inset_0px_2px_5px_rgba(0,0,0,0.5),inset_0px_-4px_8px_rgba(255,255,255,0.05)]'
                      : 'bg-gradient-to-b from-[#3a82e6] via-[#5fa8f5] to-[#9ccbf3] shadow-[inset_0px_9px_16px_rgba(0,30,80,0.35),inset_0px_2px_4px_rgba(0,30,80,0.15),inset_0px_-5px_8px_rgba(255,255,255,0.45)]'
                  }`}
                >
                  {/* 1. NIGHT BACKGROUND TRACK EFFECTS */}
                  <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isNight ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute right-[8%] top-[-55%] w-[190px] h-[190px] rounded-full bg-[#152036]/35" />
                    <div className="absolute right-[22%] top-[-25%] w-[125px] h-[125px] rounded-full bg-[#0a1222]/45 border border-slate-800/15" />
                    
                    <svg className="star-sparkle-1 absolute top-[22%] left-[13%] w-5 h-5 text-white/95 fill-current filter drop-shadow-[0_0_4px_rgba(255,255,255,0.85)]" viewBox="0 0 24 24">
                      <path d="M12,0 C12,6 6,12 0,12 C6,12 12,18 12,24 C12,18 18,12 24,12 C18,12 12,6 12,0 Z" />
                    </svg>
                    <svg className="star-sparkle-2 absolute top-[38%] left-[45%] w-[18px] h-[18px] text-white/90 fill-current filter drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]" viewBox="0 0 24 24">
                      <path d="M12,0 C12,6 6,12 0,12 C6,12 12,18 12,24 C12,18 18,12 24,12 C18,12 12,6 12,0 Z" />
                    </svg>
                    <div className="star-sparkle-3 absolute top-[36%] left-[29%] w-1.5 h-1.5 rounded-full bg-white/85" />
                    <div className="star-sparkle-1 absolute top-[72%] left-[38%] w-2 h-2 rounded-full bg-white/70" />
                    <div className="star-sparkle-2 absolute top-[68%] left-[17%] w-1 h-1 rounded-full bg-white/90" />
                    <div className="star-sparkle-3 absolute top-[60%] left-[49%] w-1.5 h-1.5 rounded-full bg-white/60" />
                  </div>

                  {/* 2. HIGH-FIDELITY VECTOR CLOUDS (DAY BACKGROUND) */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out"
                    style={{ transform: isNight ? 'translateY(80px)' : 'translateY(0px)', opacity: isNight ? 0 : 1 }}
                  >
                    <svg className="cloud-drift-svg absolute bottom-[-1px] left-0 w-full h-[62px]" viewBox="0 0 270 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="backCloudGrad" x1="135" y1="10" x2="135" y2="62" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                          <stop offset="60%" stopColor="#d5e9f8" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#b9daf5" stopOpacity="0.9" />
                        </linearGradient>
                        <linearGradient id="frontCloudGrad" x1="135" y1="2" x2="135" y2="62" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="45%" stopColor="#fdfdfd" />
                          <stop offset="100%" stopColor="#e5effa" />
                        </linearGradient>
                        <linearGradient id="cloudHighlight" x1="135" y1="0" x2="135" y2="35" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                        <filter id="cloudSoftShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
                          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#1a5296" floodOpacity="0.25" />
                        </filter>
                      </defs>
                      <path d="M -10,62 L -10,38 C 15,38 30,22 55,25 C 80,28 95,14 125,18 C 160,22 180,8 215,12 C 240,15 255,28 280,24 L 280,62 Z" fill="url(#backCloudGrad)" opacity="0.85" />
                      <path d="M -10,62 L -10,35 C 20,35 40,12 75,15 C 115,18 135,-3 175,2 C 210,6 230,22 280,18 L 280,62 Z" fill="url(#frontCloudGrad)" filter="url(#cloudSoftShadow)" />
                      <path d="M -10,35 C 20,35 40,12 75,15 C 115,18 135,-3 175,2 C 210,6 230,22 280,18" stroke="url(#cloudHighlight)" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9" />
                    </svg>
                  </div>

                  {/* 3. THE TOGGLE KNOB (SUN / MOON) */}
                  <div
                    className="absolute top-[8px] left-[8px] rounded-full transition-transform ease-out cursor-pointer select-none"
                    style={{ width: '88px', height: '88px', transform: isNight ? 'translateX(166px)' : 'translateX(0px)', transitionDuration: '0.8s', zIndex: 20 }}
                  >
                    {/* A. THE SUN KNOB */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ffe82b] via-[#f7a202] to-[#e07b00] shadow-[0_8px_20px_rgba(240,120,0,0.45),_inset_-4px_-4px_8px_rgba(0,0,0,0.18),_inset_4px_4px_8px_rgba(255,255,255,0.85)] transition-opacity duration-700"
                      style={{ opacity: isNight ? 0 : 1, transform: isNight ? 'rotate(-70deg) scale(0.55)' : 'rotate(0deg) scale(1)', transition: 'opacity 0.8s, transform 0.8s' }}
                    >
                      <div className="absolute top-[10%] left-[12%] w-[22px] h-[14px] rounded-full bg-white/75 rotate-[-35deg] blur-[0.5px] pointer-events-none" />
                      <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
                    </div>

                    {/* B. THE MOON KNOB */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-[#edf0f3] to-[#b7bfc9] shadow-[0_8px_22px_rgba(0,0,0,0.5),_inset_-5px_-5px_9px_rgba(0,0,0,0.22),_inset_5px_5px_9px_rgba(255,255,255,0.9)] transition-opacity duration-700 overflow-hidden"
                      style={{ opacity: isNight ? 1 : 0, transform: isNight ? 'rotate(0deg) scale(1)' : 'rotate(70deg) scale(0.55)', transition: 'opacity 0.8s, transform 0.8s' }}
                    >
                      <div className="absolute inset-0 rounded-full shadow-[inset_7px_0px_9px_-1px_rgba(255,245,200,0.9)] pointer-events-none" />
                      <div className="absolute top-[23%] left-[58%] w-[18px] h-[18px] rounded-full bg-[#8c95a0]/40 shadow-[inset_2px_2px_3px_rgba(0,0,0,0.35),_1px_1px_1px_rgba(255,255,255,0.35)]" />
                      <div className="absolute top-[54%] left-[63%] w-[15px] h-[15px] rounded-full bg-[#8c95a0]/40 shadow-[inset_2px_2px_3px_rgba(0,0,0,0.35),_1px_1px_1px_rgba(255,255,255,0.35)]" />
                      <div className="absolute top-[42%] left-[28%] w-[21px] h-[21px] rounded-full bg-[#8c95a0]/40 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.35),_1px_1px_1px_rgba(255,255,255,0.35)]" />
                      <div className="absolute top-[18%] left-[26%] w-[8px] h-[8px] rounded-full bg-[#8c95a0]/30 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Drawer */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-[350px] opacity-100 mt-4 border-t border-slate-200/60 dark:border-slate-800/80 pt-4 px-2' 
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-2 pb-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                scrollToSection(link.id);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                activeSection === link.id
                  ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </button>
          ))}
          <button
            onClick={() => {
              scrollToSection('contact');
              setMobileMenuOpen(false);
            }}
            className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-sm font-bold border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all shadow-sm"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
};

const HeroHighlight = ({ icon: Icon, title, sub, detail, color, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const borderClasses = isHovered 
    ? color === 'cyan' ? 'border-cyan-500/70 dark:border-cyan-400/40 shadow-lg shadow-cyan-500/10 bg-cyan-50 dark:bg-cyan-500/[0.05]'
      : color === 'purple' ? 'border-purple-500/70 dark:border-purple-400/40 shadow-lg shadow-purple-500/10 bg-purple-50 dark:bg-purple-500/[0.05]'
      : 'border-orange-500/70 dark:border-orange-400/40 shadow-lg shadow-orange-500/10 bg-orange-50 dark:bg-orange-500/[0.05]'
    : 'border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900/50';

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      style={{ 
        animationDelay: `${(index) * 150 + 100}ms`,
      }}
      className={`hero-card-animate group relative flex flex-col p-6 rounded-3xl backdrop-blur-md border text-left transition-all duration-500 cursor-pointer overflow-hidden h-full shadow-md ${borderClasses}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-${color}-500/10 dark:bg-${color}-500/20 text-${color}-600 dark:text-${color}-400 transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
          <Icon size={24} />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">{title}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">{sub}</div>
        </div>
      </div>
      
      <div className={`grid transition-all duration-500 ease-in-out ${isHovered ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
        <div className="overflow-hidden">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-l-2 border-slate-300 dark:border-white/10 pl-3">
            {detail}
          </p>
        </div>
      </div>
      
      {/* Animated Corner Accent */}
      <div className={`absolute top-0 right-0 w-8 h-8 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`absolute top-2 right-2 w-1 h-1 rounded-full bg-${color}-500`} />
      </div>
    </div>
  );
};

const Hero = ({ scrollToSection }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const phrases = [
    "Full Stack Engineer",
    "React Native & Web Developer",
    "Data Science Undergraduate",
    "Video Editor & Creative Director",
    "AI Integration Engineer",
    "SEO & Digital Marketer"
  ];

  useEffect(() => {
    const activePhrase = phrases[loopNum % phrases.length];
    
    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      } else {
        const timeout = setTimeout(() => {
          setText(activePhrase.substring(0, text.length - 1));
        }, 30);
        return () => clearTimeout(timeout);
      }
    } else {
      if (text === activePhrase) {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setText(activePhrase.substring(0, text.length + 1));
        }, 75);
        return () => clearTimeout(timeout);
      }
    }
  }, [text, isDeleting, loopNum]);

  return (
    <section id="hero" className="relative overflow-hidden bg-transparent">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        {/* Ambient Glowing Blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/25 dark:bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/25 dark:bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-75" />

        {/* Plexus Constellation Mesh */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none animate-plexus">
          <svg className="w-full h-full opacity-35 dark:opacity-75 transition-opacity duration-500" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <filter id="plexusGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="plexusGlowLarge" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              
              <linearGradient id="polyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="polyGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.04" />
              </linearGradient>

              <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="lineGrad3" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            {/* Filled Triangles */}
            {plexusData.triangles.map((tri, idx) => (
              <polygon
                key={tri.id}
                points={tri.points}
                fill={idx % 2 === 0 ? 'url(#polyGrad1)' : 'url(#polyGrad2)'}
              />
            ))}

            {/* Lines */}
            {plexusData.lines.map((line, idx) => {
              const grads = ['url(#lineGrad1)', 'url(#lineGrad2)', 'url(#lineGrad3)'];
              return (
                <line
                  key={line.id}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={grads[idx % grads.length]}
                  strokeWidth={1.5}
                  opacity={line.opacity}
                />
              );
            })}

            {/* Glowing Nodes */}
            {plexusData.nodes.map((node) => (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={node.color}
                filter={node.blur ? 'url(#plexusGlowLarge)' : 'url(#plexusGlow)'}
                opacity={node.blur ? 0.3 : 1}
              />
            ))}
          </svg>
        </div>

        {/* Soft Vignette Mask Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_20%,rgba(248,250,252,0.85)_80%,rgba(248,250,252,1)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(2,6,23,0)_20%,rgba(2,6,23,0.85)_80%,rgba(2,6,23,1)_100%)] z-20 pointer-events-none" />
        
        {/* Subtle Noise/Grain Pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.04] dark:opacity-[0.07] z-20 pointer-events-none" />
      </div>
      
      {/* First Fold: Greeting & Title */}
      <div className="min-h-[92vh] md:min-h-screen max-w-6xl mx-auto px-6 relative z-20 flex flex-col items-center justify-center text-center pt-20 pb-8">
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight leading-tight select-none">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-800 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600 animate-gradient-x select-text">Aashutosh</span>
        </h1>
        <p className="text-base sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-[0.1em] sm:tracking-[0.18em]">
          Data Science & Engineering
        </p>
        
        <div className="h-10 sm:h-8 mb-8 flex items-center justify-center">
           <p className="text-sm sm:text-lg md:text-xl font-mono font-bold text-cyan-800 dark:text-cyan-400 border-r-2 border-cyan-800 dark:border-cyan-400 pr-2 animate-pulse inline-block">
             {'>'} {text}
           </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={() => scrollToSection('projects')}
            className="group relative px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold overflow-hidden transition-all shadow-md hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center justify-center gap-2">
              View My Work <Layers size={18} />
            </span>
          </button>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-bold border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            Contact Me <Mail size={18} />
          </button>
        </div>
      </div>

      {/* Second Fold: Expertise Highlight Cards */}
      <div className="max-w-6xl mx-auto px-6 pb-20 pt-2 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <HeroHighlight 
            index={0}
            icon={Database} 
            title="Data Insights" 
            sub="STATISTICAL FOUNDATION"
            color="cyan"
            detail="Transforming complex datasets into actionable intelligence. Specializing in exploratory data analysis (EDA) and driving ROI through quantitative evidence."
          />
          <HeroHighlight 
            index={1}
            icon={Cpu} 
            title="Predictive Models" 
            sub="ML ARCHITECTURE"
            color="purple"
            detail="Designing and deploying machine learning pipelines. From regression models to advanced classification, building systems that predict future trends."
          />
          <HeroHighlight 
            index={2}
            icon={Aperture} 
            title="Visual Narratives" 
            sub="HIGH-IMPACT STORYTELLING"
            color="orange"
            detail="Bridging data and creativity. Crafting cinematic visual experiences that translate technical metrics into compelling human stories."
          />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="flex items-center gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all group shadow-sm dark:shadow-none">
    <div className={`w-14 h-14 rounded-xl bg-${color}-500/10 flex items-center justify-center text-${color}-600 dark:text-${color}-400 group-hover:scale-110 transition-transform`}>
      <Icon size={28} />
    </div>
    <div>
      <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{value}</h4>
      <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

const TimelineItem = ({ year, title, company, desc, active }) => (
  <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-5 md:gap-10 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-slate-200 dark:before:bg-slate-800 md:before:hidden">
    {/* Mobile Dot */}
    <div className={`absolute left-[-5px] top-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 md:hidden ${active ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
    
    <div className="md:col-span-1 md:text-right md:pt-1">
      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap transition-all duration-300 ${active ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 ring-4 ring-cyan-500/5 shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
        {year}
      </span>
    </div>
    
    {/* Desktop Center Line & Dot */}
    <div className="hidden md:flex flex-col items-center relative">
      <div className={`w-4 h-4 rounded-full border-4 border-white dark:border-slate-950 z-10 ${active ? 'bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-slate-300 dark:bg-slate-700'}`} />
      <div className="h-full w-[2px] bg-slate-200 dark:bg-slate-800 absolute top-4" />
    </div>

    <div className="md:col-span-3 pb-12">
      <h3 className={`text-xl font-bold ${active ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{title}</h3>
      <div className="text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-3">{company}</div>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-24 relative bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="md:sticky md:top-32">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Engineering <br />
              <span className="text-purple-600 dark:text-purple-500">Excellence</span>
            </h2>
            <div className="space-y-4 mb-10">
              <div className="group flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5 hover:border-cyan-500/30 transition-all">
                <div className="mt-1 text-cyan-600 dark:text-cyan-400"><Database size={20} /></div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">Data Science Core</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Driving performance through statistical analysis and machine learning at IIT Madras.
                  </p>
                </div>
              </div>
              <div className="group flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5 hover:border-purple-500/30 transition-all">
                <div className="mt-1 text-purple-600 dark:text-purple-400"><Code2 size={20} /></div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">Software Architecture</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Building scalable, full-stack web applications with modern frameworks.
                  </p>
                </div>
              </div>
              <div className="group flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5 hover:border-red-500/30 transition-all">
                <div className="mt-1 text-red-600 dark:text-red-400"><Film size={20} /></div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">Post-Production</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Crafting cinematic narratives through advanced video editing and visual storytelling.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <StatCard icon={GraduationCap} value="IIT Madras" label="Data Science" color="cyan" />
              <StatCard icon={CheckCircle2} value="Full Stack" label="Web Developer" color="purple" />
            </div>

            <a 
              href="https://drive.google.com/uc?export=download&id=1oZxBAA3vc33VqBBm1mAPMgXpV4l3ZYu6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:gap-4 transition-all group"
            >
              Download Resume <ExternalLink size={16} className="group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="space-y-0">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">Background</h3>
            <TimelineItem
              year="2025 - 2029"
              title="BS Data Science"
              company="IIT Madras"
              desc="Pursuing a Bachelor of Science in Data Science, combining analytical thinking with software engineering. Focus on data-driven optimization and predictive modeling."
              active={true}
            />
            <TimelineItem
              year="2024"
              title="Web Development Journey"
              company="Self-Taught"
              desc="Started with HTML5 and CSS3 mastery, progressively advancing to React and modern frontend technologies with focus on responsive design."
              active={false}
            />
            <TimelineItem
              year="2023"
              title="Frontend Development"
              company="Self-Learning & Projects"
              desc="Specialized in React and JavaScript development, building responsive web applications with pixel-perfect design execution and high performance optimization."
              active={false}
            />
             <TimelineItem
              year="2021"
              title="Video Editing"
              company="Passion Project"
              desc="Developing skills in video editing, which enhances attention to detail and aesthetic sensibility - valuable for creating visually compelling digital experiences."
              active={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const directionClasses = {
    left: 'translate-x-[-60px] opacity-0',
    right: 'translate-x-[60px] opacity-0',
    up: 'translate-y-[60px] opacity-0',
    down: 'translate-y-[-60px] opacity-0',
    'diagonal-left': 'translate-x-[-65px] translate-y-[50px] opacity-0',
    'diagonal-right': 'translate-x-[65px] translate-y-[50px] opacity-0',
  };

  const visibleClass = isVisible 
    ? 'translate-x-0 translate-y-0 opacity-100' 
    : directionClasses[direction];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${visibleClass} ${className}`}
    >
      {children}
    </div>
  );
};

const SkillPill = ({ icon: Icon, name, color }) => {
  const hoverBorders = {
    cyan: 'hover:border-cyan-500/40 dark:hover:border-cyan-400/40',
    blue: 'hover:border-blue-500/40 dark:hover:border-blue-400/40',
    purple: 'hover:border-purple-500/40 dark:hover:border-purple-400/40',
    green: 'hover:border-green-500/40 dark:hover:border-green-400/40',
    yellow: 'hover:border-yellow-500/40 dark:hover:border-yellow-400/40',
    red: 'hover:border-red-500/40 dark:hover:border-red-400/40',
    orange: 'hover:border-orange-500/40 dark:hover:border-orange-400/40',
    rose: 'hover:border-rose-500/40 dark:hover:border-rose-400/40',
    amber: 'hover:border-amber-500/40 dark:hover:border-amber-400/40',
    pink: 'hover:border-pink-500/40 dark:hover:border-pink-400/40',
    slate: 'hover:border-slate-500/40 dark:hover:border-slate-400/40',
    emerald: 'hover:border-emerald-500/40 dark:hover:border-emerald-400/40',
  };

  const hoverBorderClass = hoverBorders[color] || 'hover:border-cyan-500/40';

  return (
    <div className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 ${hoverBorderClass} transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-default shadow-sm dark:shadow-none`}>
      <Icon size={14} className={`text-${color}-600 dark:text-${color}-400 group-hover:scale-110 transition-transform`} />
      <span className="text-slate-600 dark:text-slate-300 text-xs font-semibold group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{name}</span>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Technical <span className="text-cyan-600 dark:text-cyan-400">Arsenal</span></h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My stack is chosen for reliability, scalability, and developer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Frontend */}
          <ScrollReveal direction="diagonal-left" delay={100} className="h-full">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-cyan-500/20 transition-all hover:transform hover:-translate-y-1 shadow-sm dark:shadow-none h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Layout size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <SkillPill icon={Code2} name="React" color="cyan" />
                <SkillPill icon={Smartphone} name="React Native" color="blue" />
                <SkillPill icon={Code2} name="JavaScript" color="yellow" />
                <SkillPill icon={Layout} name="HTML5 & CSS3" color="cyan" />
                <SkillPill icon={Layers} name="React Router" color="red" />
                <SkillPill icon={Globe} name="WordPress" color="blue" />
              </div>
            </div>
          </ScrollReveal>

          {/* Backend */}
          <ScrollReveal direction="diagonal-right" delay={150} className="h-full">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-purple-500/20 transition-all hover:transform hover:-translate-y-1 shadow-sm dark:shadow-none h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Server size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <SkillPill icon={Terminal} name="Node.js" color="green" />
                <SkillPill icon={Server} name="PHP" color="purple" />
                <SkillPill icon={Database} name="PostgreSQL" color="blue" />
                <SkillPill icon={Database} name="Firebase" color="yellow" />
                <SkillPill icon={Zap} name="APIs & REST" color="emerald" />
                <SkillPill icon={Shield} name="OAuth & JWT" color="rose" />
                <SkillPill icon={MessageSquare} name="FCM Notification" color="amber" />
              </div>
            </div>
          </ScrollReveal>

          {/* Creative & Content */}
          <ScrollReveal direction="diagonal-left" delay={100} className="h-full">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-red-500/20 transition-all hover:transform hover:-translate-y-1 shadow-sm dark:shadow-none h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
                  <Aperture size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Creative & Content</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <SkillPill icon={Film} name="Premiere Pro" color="red" />
                <SkillPill icon={Palette} name="After Effects" color="purple" />
                <SkillPill icon={Video} name="Video Editing" color="emerald" />
                <SkillPill icon={Sparkles} name="Creative Direction" color="yellow" />
                <SkillPill icon={PenTool} name="Content Strategy" color="pink" />
              </div>
            </div>
          </ScrollReveal>

          {/* Tools & AI */}
          <ScrollReveal direction="diagonal-right" delay={150} className="h-full">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-pink-500/20 transition-all hover:transform hover:-translate-y-1 shadow-sm dark:shadow-none h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400">
                  <Cpu size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Tools & AI Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <SkillPill icon={Github} name="Git & GitHub" color="orange" />
                <SkillPill icon={Terminal} name="Linux" color="slate" />
                <SkillPill icon={Layers} name="Gradle" color="purple" />
                <SkillPill icon={Sparkles} name="Claude, Gemini & DeepSeek" color="cyan" />
                <SkillPill icon={TrendingUp} name="SEO & Marketing" color="emerald" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const MediaCard = ({ title, desc, tags, color, videoPreview, thumbnail, onPlayClick }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    videoRef.current?.pause();
  };

  return (
    <div 
      className="group relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 min-h-[450px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (window.innerWidth < 768) {
          isPlaying ? handleMouseLeave() : handleMouseEnter();
        }
      }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950 z-10 opacity-40 group-hover:opacity-20 transition-opacity" />
        <video 
          ref={videoRef}
          src={videoPreview}
          className="absolute inset-0 w-full h-full object-cover"
          muted 
          loop 
          playsInline
          poster={thumbnail}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-20" />
      </div>

      <div className="relative z-30 p-8 h-full flex flex-col justify-end">
        <div className="mb-4 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
           <div className="flex justify-between items-center mb-4">
              <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20`}>
                <Film size={24} />
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onPlayClick(); }}
                className="p-4 rounded-full bg-red-600 text-white shadow-lg shadow-red-600/40 hover:scale-110 transition-transform"
              >
                <Play size={20} fill="currentColor" />
              </button>
           </div>
           <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{title}</h3>
           <p className="text-slate-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-3">
             {desc}
           </p>
        </div>

        <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, desc, tags, color, size, githubLink, externalLink, videoLink, onArchitectureClick }) => (
  <div className={`group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 overflow-hidden hover:border-${color}-500/50 transition-all duration-500 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] ${size === 'large' ? 'md:col-span-2' : 'md:col-span-1'}`}>
    {/* Hover Gradient Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 dark:from-${color}-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
    
    <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[320px]">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-${color}-600 dark:text-${color}-400`}>
            {videoLink ? <Video size={24} /> : size === 'large' ? <Globe size={24} /> : <Code2 size={24} />}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
             {githubLink && (
               <a href={githubLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-colors" title="View Source">
                 <Github size={18} />
               </a>
             )}
             {videoLink && (
               <a href={videoLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white transition-colors" title="Watch Video">
                 <Youtube size={18} />
               </a>
             )}
             {externalLink && (
               <a href={externalLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-colors" title="Live Demo">
                 <ExternalLink size={18} />
               </a>
             )}
             {onArchitectureClick && (
               <button onClick={onArchitectureClick} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-600 dark:hover:bg-cyan-500 hover:text-white transition-colors" title="View Architecture">
                 <Zap size={18} />
               </button>
             )}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 dark:group-hover:from-white group-hover:to-slate-500 dark:group-hover:to-slate-400 transition-all">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-4">
          {desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 text-xs font-medium text-slate-500 dark:text-slate-300 group-hover:border-slate-300 dark:group-hover:border-white/20 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Projects = ({ openModal }) => {
  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Portfolio <span className="text-purple-600 dark:text-purple-400">Showcase</span></h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md">
              Bridging the gap between scalable software architecture and high-impact visual storytelling.
            </p>
          </div>
          <a href="https://github.com/mishra-aashu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 dark:text-white border-b border-cyan-500 pb-1 hover:gap-4 transition-all">
            Explore All Repositories <Github size={16} />
          </a>
        </div>

        {/* Section: Engineering & Development */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Monitor size={20} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Software Engineering</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProjectCard 
              title="Nexus Dashboard" 
              desc="A comprehensive SaaS analytics platform featuring real-time data visualization, user management, and automated reporting systems. Built for scalability."
              tags={['React', 'TypeScript', 'D3.js', 'Firebase']}
              color="cyan"
              size="large"
              githubLink="#"
            />
            <ProjectCard 
              title="Kind Heart’s Sangam" 
              desc="Developed a fully responsive web platform for a non-profit organization. Implemented interactive volunteer registration and donation modules via Supabase."
              tags={['HTML5', 'CSS3', 'JavaScript', 'Supabase']}
              color="blue"
              size="small"
              externalLink="https://kindheartssangam.org" // Placeholder
            />
            <ProjectCard 
              title="mishra-aashu CLI" 
              desc="Personalized Terminal-based Developer Card tool. Optimized for Linux environments, demonstrating proficiency in Node.js scripting and system-level tools."
              tags={['Node.js', 'CLI', 'Bash', 'NPM']}
              color="green"
              size="small"
              githubLink="https://github.com/mishra-aashu"
            />
             <ProjectCard
              title="Listen Together"
              desc="Real-time synchronized music streaming platform with sub-0.5s drift tolerance and resilient multi-layered proxy architecture."
              tags={['WebRTC', 'Edge Functions', 'WebSocket', 'Tailwind']}
              color="indigo"
              size="small"
              onArchitectureClick={() => openModal('Listen Together')}
              githubLink="#"
            />
            <ProjectCard
              title="CaBa Messenger"
              desc="A real-time messaging application with user authentication, chat rooms, and instant message delivery using Firebase."
              tags={['React', 'Firebase', 'Real-time']}
              color="blue"
              size="small"
              onArchitectureClick={() => openModal('CaBa')}
              githubLink="#"
            />
          </div>
        </div>

        {/* Section: Media & Visual Production */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
              <Film size={20} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Media Production</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MediaCard 
              title="WW3: Geopolitical Case Study" 
              desc="Advanced geopolitical analysis translated into cinematic documentary style. Engineered sophisticated visual effects and data visualizations."
              tags={['Premiere Pro', 'Capcut', 'VFX', 'Research']}
              videoPreview="https://assets.mixkit.co/videos/preview/mixkit-world-map-background-animation-32812-large.mp4"
              thumbnail="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop"
              onPlayClick={() => openModal('VIDEO_WW3')}
            />
            <MediaCard 
              title="International Event Director" 
              desc="Lead Media Producer for high-profile international events. Managing complete workflow from on-site cinematography to final broadcast delivery."
              tags={['Direction', 'Cinematography', 'Editing']}
              videoPreview="https://assets.mixkit.co/videos/preview/mixkit-awards-ceremony-on-stage-with-curtains-and-lights-34531-large.mp4"
              thumbnail="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop"
              onPlayClick={() => openModal('VIDEO_EVENT')}
            />
            <MediaCard 
              title="Cinematic Storytelling" 
              desc="Capturing key moments with advanced camera techniques and multi-track audio synchronization for broadcast-quality event summaries."
              tags={['Color Grading', 'Audio Sync', 'Post-Production']}
              videoPreview="https://assets.mixkit.co/videos/preview/mixkit-cameraman-filming-a-scene-in-a-studio-34503-large.mp4"
              thumbnail="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop"
              onPlayClick={() => openModal('VIDEO_STORY')}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = ({ user }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [firebaseStatus, setFirebaseStatus] = useState('checking');

  // Check Firebase status on component mount
  useEffect(() => {
    const checkFirebaseStatus = () => {
      if (db) {
        setFirebaseStatus('connected');
      } else {
        setFirebaseStatus('disconnected');
      }
    };
    checkFirebaseStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if Firestore is available
    if (!db) {
      setStatus('error');
      console.error('❌ Firestore not available - contact form cannot save data');
      return;
    }
    
    setStatus('loading');
    try {
      const docData = {
        ...formData,
        userId: user?.uid || 'anonymous',
        userAgent: navigator.userAgent.substring(0, 100), // Track browser info
        timestamp: new Date().toISOString(),
        createdAt: serverTimestamp(),
      };
      
      console.log('📤 Saving contact form data to Firebase:', docData);
      
      const docRef = await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'enquiries'), docData);
      
      console.log('✅ Contact form saved successfully! Document ID:', docRef.id);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('❌ Error saving contact form:', error);
      setStatus('error');
    }
  };

  return (
    <div className="relative group max-w-2xl mx-auto">
      {/* Dynamic background glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 rounded-2xl blur opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-35 transition duration-1000 group-hover:duration-200"></div>
      
      {/* Terminal Window */}
      <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-100/80 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            <div className="w-3.5 h-3.5 rounded-full bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 select-none">
            guest@aashutosh:~/contact_form
          </span>
          <div className="w-14" /> {/* spacer for center alignment */}
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
            <div>
              <h3 className="text-xl font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-cyan-500 dark:text-cyan-400 font-extrabold">$</span> ./initialize_contact.sh
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                Establish secure connection and send message
              </p>
            </div>
            <div className={`self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
              firebaseStatus === 'connected'
                ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/30'
                : firebaseStatus === 'disconnected'
                ? 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border-rose-500/20 dark:border-rose-500/30'
                : 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20 dark:border-amber-500/30'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                firebaseStatus === 'connected' ? 'bg-emerald-500 animate-pulse' :
                firebaseStatus === 'disconnected' ? 'bg-rose-500' : 'bg-amber-500 animate-bounce'
              }`} />
              {firebaseStatus === 'connected' ? 'DB_CONNECTED' :
               firebaseStatus === 'disconnected' ? 'DB_OFFLINE' : 'DB_CONNECTING'}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block pl-1">Name</label>
                 <div className="relative flex items-center text-slate-400 dark:text-slate-500 focus-within:text-cyan-500 dark:focus-within:text-cyan-400 transition-colors duration-300">
                   <User size={18} className="absolute left-4 pointer-events-none" />
                   <input
                     type="text"
                     required
                     className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:focus:ring-cyan-500/20 transition-all outline-none font-mono text-sm"
                     placeholder="Enter your name"
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider block pl-1">Email</label>
                 <div className="relative flex items-center text-slate-400 dark:text-slate-500 focus-within:text-purple-500 dark:focus-within:text-purple-400 transition-colors duration-300">
                   <Mail size={18} className="absolute left-4 pointer-events-none" />
                   <input
                     type="email"
                     required
                     className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 dark:focus:ring-purple-500/20 transition-all outline-none font-mono text-sm"
                     placeholder="Enter your email"
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                 </div>
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block pl-1">Message</label>
              <div className="relative text-slate-400 dark:text-slate-500 focus-within:text-emerald-500 dark:focus-within:text-emerald-400 transition-colors duration-300">
                <MessageSquare size={18} className="absolute left-4 top-3.5 pointer-events-none" />
                <textarea
                  required
                  rows={5}
                  className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/20 transition-all outline-none font-mono text-sm resize-none"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`w-full py-3.5 rounded-xl font-mono font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                status === 'success' 
                  ? 'bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                  : 'bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-slate-950 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] shadow-md'
              }`}
            >
              {status === 'loading' ? (
                <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 size={18} />
                  Transmission Sent
                </>
              ) : (
                <>
                  Send Transmission
                  <Send size={18} className="w-4.5 h-4.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Contact = ({ user }) => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-5/12">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">Let's <br />Talk <span className="text-cyan-600 dark:text-cyan-400">Code</span>.</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed">
              Ready to start your next project? I'm currently available for freelance work and open to full-time opportunities.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:frontend.dev@iitm.ac.in" className="flex items-center gap-4 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white group p-4 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-all shadow-sm hover:shadow-md dark:shadow-none">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-cyan-500 dark:group-hover:border-cyan-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Email Me</div>
                  <div className="text-lg font-medium">Get in touch</div>
                </div>
              </a>
              
              <div className="flex gap-4 pt-4">
                 {[Github, Linkedin, Twitter].map((Icon, i) => (
                   <a
                     key={i}
                     href={i === 1 ? "https://www.linkedin.com/in/-aashu-kr/" : "#"}
                     target={i === 1 ? "_blank" : "_self"}
                     rel={i === 1 ? "noopener noreferrer" : ""}
                     className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-950 hover:border-slate-900 dark:hover:border-white transition-all transform hover:-translate-y-1 shadow-sm dark:shadow-none"
                   >
                     <Icon size={20} />
                   </a>
                 ))}
              </div>
            </div>
          </div>
          
          <div className="md:w-7/12">
            <ContactForm user={user} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950 relative transition-colors duration-300">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-5 dark:opacity-10 pointer-events-none" />
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
      <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
        <Code2 className="text-cyan-600 dark:text-cyan-400" />
        DevFolio
      </div>
      <div className="text-slate-500 text-sm flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <span>© {new Date().getFullYear()} All rights reserved.</span>
        <div className="flex gap-6">
           <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Privacy</a>
           <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    console.log('Current theme:', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#020617'; // slate-950
      document.body.style.backgroundColor = '#020617';
      console.log('Applied dark theme styles');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#ffffff';
      document.body.style.backgroundColor = '#ffffff';
      console.log('Applied light theme styles');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const openModal = (projectName) => {
    setSelectedProject(projectName);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  // No authentication needed - contact form works without user
  useEffect(() => {
    setUser(null); // Anonymous user for contact form
  }, []);

  // --- Scroll Logic ---
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-200 selection:bg-cyan-500/30 font-sans cursor-default transition-colors duration-300">
      <Navbar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Skills />
      <Projects openModal={openModal} />
      <Contact user={user} />
      <Footer />

      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="sr-only">
            <h2 id="modal-title">{selectedProject} System Architecture</h2>
            <p id="modal-description">A visual mapping of the technology stack and architecture for the {selectedProject} project.</p>
          </div>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-800 text-white hover:bg-white hover:text-slate-900 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <div className="w-full h-full max-w-7xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl">
            {selectedProject && selectedProject.startsWith('VIDEO_') ? (
              <div className="w-full h-full bg-black flex items-center justify-center relative">
                <video 
                  src={
                    selectedProject === 'VIDEO_WW3' ? "https://assets.mixkit.co/videos/preview/mixkit-world-map-background-animation-32812-large.mp4" :
                    selectedProject === 'VIDEO_EVENT' ? "https://assets.mixkit.co/videos/preview/mixkit-awards-ceremony-on-stage-with-curtains-and-lights-34531-large.mp4" :
                    "https://assets.mixkit.co/videos/preview/mixkit-cameraman-filming-a-scene-in-a-studio-34503-large.mp4"
                  }
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <ArchitectureMap projectName={selectedProject} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Test function for Firebase contact form
window.testContactForm = async () => {
  if (!db) {
    console.error('❌ Firestore not available - check Firebase project configuration');
    return false;
  }
  
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from console',
      userId: 'anonymous',
      userAgent: navigator.userAgent.substring(0, 100),
      timestamp: new Date().toISOString(),
      test: true,
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'enquiries'), testData);
    console.log('✅ Test contact form submission successful! Document ID:', docRef.id);
    console.log('📋 Check your Firebase Console > Firestore Database to see this message');
    return true;
  } catch (error) {
    console.error('❌ Test contact form failed:', error.message);
    console.log('💡 Make sure your Firebase project "portfolio-bb303" exists and Firestore is enabled');
    return false;
  }
};

// Export the App component for use in main.jsx
export default App;
