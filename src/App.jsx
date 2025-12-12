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
  MousePointer2
} from 'lucide-react';

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

// --- Utility Components ---

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    const handleLeave = () => setHidden(true);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  if (hidden) return null;

  return (
    <div 
      className="fixed w-8 h-8 pointer-events-none z-[100] mix-blend-difference"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="w-full h-full rounded-full border border-white/50 bg-white/20 backdrop-blur-sm animate-pulse" />
    </div>
  );
};

const Navbar = ({ activeSection, scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about', icon: <Briefcase size={14} /> },
    { name: 'Expertise', id: 'skills', icon: <Zap size={14} /> },
    { name: 'Work', id: 'projects', icon: <Layers size={14} /> },
    { name: 'Contact', id: 'contact', icon: <Mail size={14} /> },
  ];

  return (
    <nav 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-4xl rounded-full border ${
        isScrolled 
          ? 'bg-slate-900/80 backdrop-blur-xl border-cyan-500/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] py-3' 
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="px-6 flex justify-between items-center">
        <div 
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500 cursor-pointer flex items-center gap-2" 
          onClick={() => scrollToSection('hero')}
        >
          <Code2 size={24} className="text-cyan-400" />
          <span>Dev<span className="text-white">Folio</span></span>
        </div>
        
        <div className="hidden md:flex gap-1 bg-slate-800/50 p-1 rounded-full border border-white/5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === link.id 
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon}
              {link.name}
            </button>
          ))}
        </div>

        <button 
          onClick={() => scrollToSection('contact')}
          className="hidden sm:flex px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all transform hover:scale-105"
        >
          Hire Me
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ scrollToSection }) => {
  const [text, setText] = useState('');
  const fullText = "Frontend Engineer & Data Science Undergraduate";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0)_0%,rgba(2,6,23,1)_100%)] z-10" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-75" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-8 shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          OPEN TO OPPORTUNITIES
        </div>
        
        <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
          Crafting Digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
            Masterpieces
          </span>
        </h1>
        
        <div className="h-8 mb-8">
           <p className="text-xl md:text-2xl font-mono text-cyan-400 border-r-2 border-cyan-400 pr-2 animate-pulse">
             {'>'} {text}
           </p>
        </div>
        
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          I am a Frontend Developer specializing in building responsive, high-performance web applications using React and JavaScript.
          With a mastery of HTML5 and CSS3, I bridge the gap between design and technology, ensuring pixel-perfect execution in every project.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <button 
            onClick={() => scrollToSection('projects')}
            className="group relative px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center justify-center gap-2">
              View My Work <Layers size={18} />
            </span>
          </button>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
          >
            Contact Me <Mail size={18} />
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all group">
    <div className={`w-14 h-14 rounded-xl bg-${color}-500/10 flex items-center justify-center text-${color}-400 group-hover:scale-110 transition-transform`}>
      <Icon size={28} />
    </div>
    <div>
      <h4 className="text-3xl font-bold text-white mb-1">{value}</h4>
      <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

const TimelineItem = ({ year, title, company, desc, active }) => (
  <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-5 md:gap-10 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-slate-800 md:before:hidden">
    {/* Mobile Dot */}
    <div className={`absolute left-[-5px] top-1 w-3 h-3 rounded-full border-2 border-slate-900 md:hidden ${active ? 'bg-cyan-400' : 'bg-slate-600'}`} />
    
    <div className="md:col-span-1 md:text-right md:pt-1">
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${active ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
        {year}
      </span>
    </div>
    
    {/* Desktop Center Line & Dot */}
    <div className="hidden md:flex flex-col items-center relative">
      <div className={`w-4 h-4 rounded-full border-4 border-slate-950 z-10 ${active ? 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-slate-700'}`} />
      <div className="h-full w-[2px] bg-slate-800 absolute top-4" />
    </div>

    <div className="md:col-span-3 pb-12">
      <h3 className={`text-xl font-bold ${active ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
      <div className="text-cyan-400 text-sm font-medium mb-3">{company}</div>
      <p className="text-slate-400 leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-24 relative bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="md:sticky md:top-32">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Engineering <br />
              <span className="text-purple-500">Excellence</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Currently pursuing a BS in Data Science at IIT Madras, I bring a unique analytical perspective to web development,
              focusing on data-driven optimization and scalable architecture. Beyond the code, I am a passionate video editor,
              a hobby that sharpens my attention to detail and aesthetic sensibility.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <StatCard icon={GraduationCap} value="IIT Madras" label="Data Science" color="cyan" />
              <StatCard icon={CheckCircle2} value="Frontend" label="Specialist" color="purple" />
            </div>

            <button className="flex items-center gap-2 text-cyan-400 font-semibold hover:gap-4 transition-all group">
              Download Resume <ExternalLink size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-0">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Background</h3>
            <TimelineItem
              year="2022 - Present"
              title="BS Data Science"
              company="IIT Madras"
              desc="Currently pursuing a Bachelor of Science in Data Science, combining analytical thinking with frontend development skills. Focus on data-driven web optimization."
              active={true}
            />
            <TimelineItem
              year="2023"
              title="Frontend Development"
              company="Self-Learning & Projects"
              desc="Specialized in React and JavaScript development, building responsive web applications with pixel-perfect design execution and high performance optimization."
              active={false}
            />
             <TimelineItem
              year="2022"
              title="Video Editing"
              company="Passion Project"
              desc="Developing skills in video editing, which enhances attention to detail and aesthetic sensibility - valuable for creating visually compelling digital experiences."
              active={false}
            />
            <TimelineItem
              year="2021"
              title="Web Development Journey"
              company="Self-Taught"
              desc="Started with HTML5 and CSS3 mastery, progressively advancing to React and modern frontend technologies with focus on responsive design."
              active={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillPill = ({ icon: Icon, name, color }) => (
  <div className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-slate-800 cursor-default">
    <Icon size={20} className={`text-${color}-400 group-hover:scale-110 transition-transform`} />
    <span className="text-slate-300 font-medium group-hover:text-white">{name}</span>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Technical <span className="text-cyan-400">Arsenal</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            My stack is chosen for reliability, scalability, and developer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Frontend */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/20 transition-all hover:transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-6">Frontend</h3>
            <div className="flex flex-wrap gap-3">
              <SkillPill icon={Code2} name="React" color="cyan" />
              <SkillPill icon={Zap} name="Next.js" color="white" />
              <SkillPill icon={Layout} name="Tailwind" color="cyan" />
              <SkillPill icon={Globe} name="Three.js" color="yellow" />
            </div>
          </div>

          {/* Backend */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-purple-500/20 transition-all hover:transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
              <Server size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-6">Backend</h3>
            <div className="flex flex-wrap gap-3">
              <SkillPill icon={Terminal} name="Node.js" color="green" />
              <SkillPill icon={Cpu} name="Python" color="blue" />
              <SkillPill icon={Database} name="PostgreSQL" color="blue" />
              <SkillPill icon={Database} name="Firebase" color="yellow" />
            </div>
          </div>

           {/* Tools */}
           <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-pink-500/20 transition-all hover:transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-6">
              <Smartphone size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-6">Tools & Mobile</h3>
            <div className="flex flex-wrap gap-3">
              <SkillPill icon={Github} name="Git" color="orange" />
              <SkillPill icon={Layers} name="Figma" color="purple" />
              <SkillPill icon={Smartphone} name="React Native" color="cyan" />
              <SkillPill icon={Server} name="Docker" color="blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, desc, tags, color, size }) => (
  <div className={`group relative rounded-3xl bg-slate-900 border border-white/5 overflow-hidden hover:border-${color}-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] ${size === 'large' ? 'md:col-span-2' : 'md:col-span-1'}`}>
    {/* Hover Gradient Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br from-${color}-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
    
    <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[320px]">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-slate-800 text-${color}-400`}>
            {size === 'large' ? <Globe size={24} /> : <Code2 size={24} />}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
             <button className="p-2 rounded-full bg-slate-800 hover:bg-white hover:text-slate-900 transition-colors">
               <Github size={18} />
             </button>
             <button className="p-2 rounded-full bg-slate-800 hover:bg-white hover:text-slate-900 transition-colors">
               <ExternalLink size={18} />
             </button>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
          {title}
        </h3>
        <p className="text-slate-400 leading-relaxed mb-6">
          {desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 rounded-lg bg-slate-800/50 border border-white/5 text-xs font-medium text-slate-300 group-hover:border-white/20 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured <span className="text-purple-400">Work</span></h2>
            <p className="text-slate-400 max-w-md">
              A curated selection of projects that demonstrate my ability to solve complex problems with code.
            </p>
          </div>
          <button className="flex items-center gap-2 text-white border-b border-cyan-500 pb-1 hover:gap-4 transition-all">
            View All Repositories <Github size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProjectCard 
            title="Nexus Dashboard" 
            desc="A comprehensive SaaS analytics platform featuring real-time data visualization, user management, and automated reporting systems. Built for scalability."
            tags={['React', 'TypeScript', 'D3.js', 'Firebase']}
            color="cyan"
            size="large"
          />
          <ProjectCard 
            title="Aether Chat" 
            desc="AI-powered customer support interface with sentiment analysis and automated routing."
            tags={['Next.js', 'OpenAI', 'Redis']}
            color="purple"
            size="small"
          />
          <ProjectCard 
            title="CryptoWatch" 
            desc="Real-time cryptocurrency tracker with price alerts and portfolio management."
            tags={['React Native', 'Node.js']}
            color="green"
            size="small"
          />
          <ProjectCard 
            title="Lumina UI Kit" 
            desc="An open-source React component library focusing on accessibility and dark mode."
            tags={['React', 'Storybook', 'NPM']}
            color="pink"
            size="large"
          />
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
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-slate-900 rounded-xl p-8 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Terminal size={24} className="text-cyan-400" />
            Initialize Contact
          </h3>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
            firebaseStatus === 'connected'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : firebaseStatus === 'disconnected'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              firebaseStatus === 'connected' ? 'bg-green-400' :
              firebaseStatus === 'disconnected' ? 'bg-red-400' : 'bg-yellow-400'
            }`} />
            {firebaseStatus === 'connected' ? 'Firebase Connected' :
             firebaseStatus === 'disconnected' ? 'Firebase Offline' : 'Checking...'}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <div className="space-y-2">
               <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider">01. Name</label>
               <input
                 type="text"
                 required
                 className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none font-mono"
                 placeholder="John Doe"
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
               />
             </div>
             <div className="space-y-2">
               <label className="text-xs font-mono text-purple-400 uppercase tracking-wider">02. Email</label>
               <input
                 type="email"
                 required
                 className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none font-mono"
                 placeholder="john@example.com"
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
               />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-green-400 uppercase tracking-wider">03. Message</label>
            <textarea
              required
              rows={5}
              className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none font-mono resize-none"
              placeholder="System.out.print('Hello World')..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 ${
              status === 'success' 
                ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                : 'bg-white text-slate-900 hover:bg-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
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
                <Send size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const Contact = ({ user }) => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-5/12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's <br />Talk <span className="text-cyan-400">Code</span>.</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Ready to start your next project? I'm currently available for freelance work and open to full-time opportunities.
            </p>
            
            <div className="space-y-6">
              <a href="#" className="flex items-center gap-4 text-slate-300 hover:text-white group p-4 rounded-xl hover:bg-white/5 transition-all">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:border-cyan-400 group-hover:text-cyan-400 transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Email Me</div>
                  <div className="text-lg font-medium">frontend.dev@iitm.ac.in</div>
                </div>
              </a>
              
              <div className="flex gap-4 pt-4">
                 {[Github, Linkedin, Twitter].map((Icon, i) => (
                   <a
                     key={i}
                     href={i === 1 ? "https://www.linkedin.com/in/-aashu-kr/" : "#"}
                     target={i === 1 ? "_blank" : "_self"}
                     rel={i === 1 ? "noopener noreferrer" : ""}
                     className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-950 hover:border-white transition-all transform hover:-translate-y-1"
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
  <footer className="py-12 border-t border-white/5 bg-slate-950 relative">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        <Code2 className="text-cyan-400" />
        DevFolio
      </div>
      <div className="text-slate-500 text-sm flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <span>© {new Date().getFullYear()} All rights reserved.</span>
        <div className="flex gap-6">
           <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
           <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [user, setUser] = useState(null);

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
    <div className="bg-slate-950 text-slate-200 selection:bg-cyan-500/30 font-sans cursor-default">
      <MouseFollower />
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Skills />
      <Projects />
      <Contact user={user} />
      <Footer />
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
