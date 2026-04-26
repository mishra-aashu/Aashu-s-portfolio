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
  Sun,
  Moon,
  Palette,
  ArrowRight,
  Share2,
  Activity,
  Lock,
  Menu,
  Grid
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

const Navbar = ({ activeSection, scrollToSection, theme, toggleTheme }) => {
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
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-cyan-500/20 shadow-lg dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] py-3' 
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="px-6 flex justify-between items-center">
        <div 
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500 cursor-pointer flex items-center gap-2" 
          onClick={() => scrollToSection('hero')}
        >
          <Code2 size={24} className="text-cyan-600 dark:text-cyan-400" />
          <span className="text-slate-900 dark:text-white">Aashu's<span className="text-cyan-600 dark:text-cyan-400"> Portfolio</span></span>
        </div>
        
        <div className="hidden md:flex gap-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200 dark:border-white/5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="hidden sm:flex px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all transform hover:scale-105"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ scrollToSection }) => {
  const [text, setText] = useState('');
  const fullText = "Full Stack Engineer & Data Science Undergraduate";
  
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
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(248,250,252,1)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0)_0%,rgba(2,6,23,1)_100%)] z-10" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-75" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 z-10 pointer-events-none" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-20 flex flex-col items-center text-center">
        
        <h1 className="text-6xl md:text-9xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight leading-none">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-800 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600 animate-gradient-x">Aashutosh</span>
        </h1>
        <p className="text-2xl md:text-4xl font-light text-slate-700 dark:text-slate-300 mb-6">
          CRAFTING DIGITAL MASTERPIECES
        </p>
        
        <div className="h-8 mb-8">
           <p className="text-xl md:text-2xl font-mono text-cyan-600 dark:text-cyan-400 border-r-2 border-cyan-600 dark:border-cyan-400 pr-2 animate-pulse">
             {'>'} {text}
           </p>
        </div>
        
        <p className="text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          I am a Backened & Frontend Developer specializing in building responsive, high-performance web applications using React and JavaScript.
          With a mastery of HTML5 and CSS3, I bridge the gap between design and technology, ensuring pixel-perfect execution in every project.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <button 
            onClick={() => scrollToSection('projects')}
            className="group relative px-8 py-4 rounded-xl bg-cyan-500 text-white dark:text-slate-950 font-bold overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center justify-center gap-2">
              View My Work <Layers size={18} />
            </span>
          </button>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex items-center justify-center gap-2"
          >
            Contact Me <Mail size={18} />
          </button>
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
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${active ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
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
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
              Currently pursuing a BS in Data Science at IIT Madras, I bring a unique analytical perspective to web development,
              focusing on data-driven optimization and scalable architecture. Beyond the code, I am a passionate video editor,
              a hobby that sharpens my attention to detail and aesthetic sensibility.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <StatCard icon={GraduationCap} value="IIT Madras" label="Data Science" color="cyan" />
              <StatCard icon={CheckCircle2} value="Full Stack" label="Web Developer" color="purple" />
            </div>

            <button className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:gap-4 transition-all group">
              Download Resume <ExternalLink size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-0">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">Background</h3>
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
              year="2024"
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
  <div className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 cursor-default shadow-sm dark:shadow-none">
    <Icon size={20} className={`text-${color}-600 dark:text-${color}-400 group-hover:scale-110 transition-transform`} />
    <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white">{name}</span>
  </div>
);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Frontend */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-cyan-500/20 transition-all hover:transform hover:-translate-y-1 shadow-sm dark:shadow-none">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Frontend</h3>
            <div className="flex flex-wrap gap-3">
              <SkillPill icon={Code2} name="React" color="cyan" />
              <SkillPill icon={Zap} name="Next.js" color="slate" />
              <SkillPill icon={Layout} name="CSS3" color="cyan" />
              <SkillPill icon={Globe} name="Three.js" color="yellow" />
            </div>
          </div>

          {/* Backend */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-purple-500/20 transition-all hover:transform hover:-translate-y-1 shadow-sm dark:shadow-none">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
              <Server size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Backend</h3>
            <div className="flex flex-wrap gap-3">
              <SkillPill icon={Terminal} name="Node.js" color="green" />
              <SkillPill icon={Cpu} name="Python" color="blue" />
              <SkillPill icon={Database} name="PostgreSQL" color="blue" />
              <SkillPill icon={Database} name="Firebase" color="yellow" />
            </div>
          </div>

           {/* Tools */}
           <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-pink-500/20 transition-all hover:transform hover:-translate-y-1 shadow-sm dark:shadow-none">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6">
              <Smartphone size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Tools & Mobile</h3>
            <div className="flex flex-wrap gap-3">
              <SkillPill icon={Github} name="Git" color="orange" />
              <SkillPill icon={Layers} name="Gradle" color="purple" />
              <SkillPill icon={Smartphone} name="React Native" color="cyan" />
              <SkillPill icon={Server} name="Capacitor" color="blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, desc, tags, color, size, onGithubClick }) => (
  <div className={`group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 overflow-hidden hover:border-${color}-500/50 transition-all duration-500 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] ${size === 'large' ? 'md:col-span-2' : 'md:col-span-1'}`}>
    {/* Hover Gradient Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 dark:from-${color}-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
    
    <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[320px]">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-${color}-600 dark:text-${color}-400`}>
            {size === 'large' ? <Globe size={24} /> : <Code2 size={24} />}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
             <button onClick={onGithubClick} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-colors">
               <Github size={18} />
             </button>
             <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-colors">
               <ExternalLink size={18} />
             </button>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 dark:group-hover:from-white group-hover:to-slate-500 dark:group-hover:to-slate-400 transition-all">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
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
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Featured <span className="text-purple-600 dark:text-purple-400">Work</span></h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md">
              A curated selection of projects that demonstrate my ability to solve complex problems with code.
            </p>
          </div>
          <button className="flex items-center gap-2 text-slate-600 dark:text-white border-b border-cyan-500 pb-1 hover:gap-4 transition-all">
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
          <ProjectCard
            title="CaBa"
            desc="A real-time messaging application with user authentication, chat rooms, and instant message delivery."
            tags={['React', 'Firebase', 'Real-time']}
            color="blue"
            size="small"
            onGithubClick={() => openModal('CaBa')}
          />
          <ProjectCard
            title="Listen Together"
            desc="Real-time synchronized music streaming platform with sub-0.5s drift tolerance and resilient multi-layered proxy architecture."
            tags={['WebRTC', 'Edge Functions', 'WebSocket', 'Tailwind']}
            color="indigo"
            size="small"
            onGithubClick={() => openModal('Listen Together')}
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
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-10 dark:opacity-25 group-hover:opacity-20 dark:group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Terminal size={24} className="text-cyan-600 dark:text-cyan-400" />
            Initialize Contact
          </h3>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
            firebaseStatus === 'connected'
              ? 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 border border-green-500/20 dark:border-green-500/30'
              : firebaseStatus === 'disconnected'
              ? 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/20 dark:border-red-500/30'
              : 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400 border border-yellow-500/20 dark:border-yellow-500/30'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              firebaseStatus === 'connected' ? 'bg-green-500' :
              firebaseStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
            {firebaseStatus === 'connected' ? 'Firebase Connected' :
             firebaseStatus === 'disconnected' ? 'Firebase Offline' : 'Checking...'}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <div className="space-y-2">
               <label className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">01. Name</label>
               <input
                 type="text"
                 required
                 className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none font-mono"
                 placeholder="John Doe"
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
               />
             </div>
             <div className="space-y-2">
               <label className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider">02. Email</label>
               <input
                 type="email"
                 required
                 className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none font-mono"
                 placeholder="john@example.com"
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
               />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-green-600 dark:text-green-400 uppercase tracking-wider">03. Message</label>
            <textarea
              required
              rows={5}
              className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none font-mono resize-none"
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
                : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-500 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
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
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 dark:opacity-10 pointer-events-none" />
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
      <MouseFollower />
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} theme={theme} toggleTheme={toggleTheme} />
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Skills />
      <Projects openModal={openModal} />
      <Contact user={user} />
      <Footer />

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-800 text-white hover:bg-white hover:text-slate-900 transition-colors"
          >
            <X size={24} />
          </button>
          <ArchitectureMap projectName={selectedProject} />
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
// --- Data: Architecture Mappings for different projects ---
const ARCHITECTURE_DATA = {
  CaBa: [
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
          desc: 'Powers scalable component architecture for dynamic user interfaces, enabling event-driven rendering and seamless state management.',
          meta: 'v19.2.0',
          highlight: '#61DAFB'
        },
        {
          tech: 'TypeScript',
          role: 'TYPE SYSTEM',
          desc: 'Enforces strict type safety and compile-time error detection, enhancing code reliability.',
          meta: 'v5.9.3',
          highlight: '#3178C6'
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
          desc: 'Provides real-time database synchronization and authentication for messaging and call history.',
          meta: 'v2.83.0',
          highlight: '#3ECF8E'
        },
        {
          tech: 'WebRTC',
          role: 'REAL-TIME ENGINE',
          desc: 'Facilitates peer-to-peer audio/video streaming with low-latency signaling.',
          meta: 'Native',
          highlight: '#000000'
        }
      ]
    }
  ],
  "Listen Together": [
    {
      id: 'streaming',
      title: 'Streaming Engine',
      icon: <Activity size={20} />,
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500',
      shadowColor: 'shadow-indigo-500/20',
      gradient: 'from-indigo-500/20 to-purple-500/5',
      description: 'Multi-layered proxy architecture for resilient audio extraction.',
      details: [
        {
          tech: 'Cobalt',
          role: 'PRIMARY EXTRACTOR',
          desc: 'High-performance media extraction engine bypassing rate limits.',
          meta: 'v3.x',
          highlight: '#6366F1'
        },
        {
          tech: 'Invidious',
          role: 'FALLBACK LAYER',
          desc: 'Open-source privacy-focused YouTube proxy for fallback streams.',
          meta: 'API v1',
          highlight: '#FF0000'
        }
      ]
    },
    {
      id: 'sync',
      title: 'Real-time Sync',
      icon: <Zap size={20} />,
      color: 'text-amber-400',
      borderColor: 'border-amber-500',
      shadowColor: 'shadow-amber-500/20',
      gradient: 'from-amber-500/20 to-yellow-500/5',
      description: 'Sub-0.5s drift tolerance across distributed clients.',
      details: [
        {
          tech: 'WebSocket',
          role: 'SIGNALING',
          desc: 'Bi-directional communication for playback state broadcasting.',
          meta: 'WSS',
          highlight: '#F59E0B'
        },
        {
          tech: 'Drift Correction',
          role: 'SYNC ALGORITHM',
          desc: 'Proprietary logic to align audio timestamps with host state.',
          meta: '0.5s Tol.',
          highlight: '#10B981'
        }
      ]
    }
  ]
};

const ArchitectureMap = ({ projectName = "CaBa" }) => {
  const techData = ARCHITECTURE_DATA[projectName] || ARCHITECTURE_DATA["CaBa"];
  const [activeCategory, setActiveCategory] = useState(techData[0]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [linePath, setLinePath] = useState('');

  const containerRef = useRef(null);
  const activeNodeRef = useRef(null);
  const busRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let startTime;
    const calculatePath = () => {
      if (activeNodeRef.current && busRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const nodeRect = activeNodeRef.current.getBoundingClientRect();
        const busRect = busRef.current.getBoundingClientRect();
        const startX = nodeRect.right - containerRect.left;
        const startY = nodeRect.top - containerRect.top + nodeRect.height / 2;
        const endX = busRect.left - containerRect.left + busRect.width / 2;
        const endY = busRect.top - containerRect.top + busRect.height / 2;
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
      if (progress < 400) animationFrameId = requestAnimationFrame(animate);
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
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center w-10 h-10 bg-slate-900 rounded-lg border border-slate-800">
                 <Grid size={24} className="text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
                   {projectName}
                   <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_cyan]"></div>
                </h1>
                <div className="text-[10px] md:text-xs font-mono text-slate-500 leading-none mt-0.5">SYSTEM ARCHITECTURE</div>
              </div>
           </div>
           <div className="hidden md:flex items-center gap-6 text-[10px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                 <span>OPERATIONAL</span>
              </div>
              <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">BUILD: V2.4.0</div>
           </div>
           <button className="md:hidden text-slate-400"><Menu size={24} /></button>
        </div>
      </nav>
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/20 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-12 lg:h-screen lg:flex lg:flex-col justify-center">
        <header className="mb-6 lg:mb-12 relative animate-in fade-in slide-in-from-top-4 duration-700">
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 border-b border-slate-800/60 pb-6">
             <div>
                <div className="flex items-center gap-3 mb-2 lg:mb-3">
                  <div className="h-px w-6 lg:w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                  <span className="text-[10px] lg:text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase">Interactive Blueprint</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Tech<span className="text-slate-700">Stack</span>.Map<span className="text-cyan-500 animate-pulse">_</span></h1>
                <p className="mt-2 text-slate-400 max-w-lg text-sm md:text-base leading-relaxed">Visualizing the component logic, backend bridges, and design tokens powering {projectName}.</p>
             </div>
           </div>
        </header>
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 relative">
          <svg className="hidden lg:block absolute inset-0 pointer-events-none z-10 w-full h-full overflow-visible">
            <path d={linePath} fill="none" stroke="rgba(6,182,212, 0.2)" strokeWidth="2" strokeLinecap="round" />
            <path d={linePath} fill="none" stroke="url(#vein-gradient)" strokeWidth="3" strokeLinecap="round" className="animate-dash" strokeDasharray="10, 20" />
            <defs>
              <linearGradient id="vein-gradient" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="lg:col-span-4 relative z-20 flex flex-col justify-center">
            <div className="flex flex-col gap-3 lg:gap-5">
              {techData.map((category) => {
                const isActive = activeCategory.id === category.id;
                return (
                  <div key={category.id} className="relative group" onMouseEnter={() => setHoveredNode(category.id)} onMouseLeave={() => setHoveredNode(null)}>
                    <button ref={isActive ? activeNodeRef : null} onClick={() => setActiveCategory(category)} className={`relative w-full text-left p-4 lg:p-5 rounded-xl border transition-all duration-300 group z-20 ${isActive ? `bg-slate-900 border-l-4 ${category.borderColor} border-y-slate-800 border-r-slate-800 shadow-lg scale-[1.02] lg:scale-105` : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700 hover:bg-slate-800/40'}`}>
                      {isActive && <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-100 rounded-xl pointer-events-none`} />}
                      <div className="relative z-10 flex items-center gap-4">
                        <div className={`w-12 h-12 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center border transition-all duration-300 ${isActive ? `bg-slate-950 ${category.color} border-${category.color.split('-')[1]}-500/30 shadow-[0_0_15px_-5px_currentColor]` : 'bg-slate-950 border-slate-800 text-slate-500 group-hover:text-slate-400'}`}>
                          {category.icon}
                        </div>
                        <div>
                          <h3 className={`font-bold tracking-wide text-sm ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{category.title.toUpperCase()}</h3>
                          <div className="text-[10px] font-mono text-slate-500 mt-1 flex items-center gap-2">
                            <span>ID: {category.id.substring(0,4).toUpperCase()}</span>
                            {isActive && <span className="text-cyan-500 animate-pulse">● ACTIVE</span>}
                          </div>
                        </div>
                      </div>
                      <div className={`hidden lg:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 bg-slate-950 z-30 transition-colors duration-300 ${isActive ? `border-cyan-400 shadow-[0_0_10px_cyan]` : 'border-slate-700 opacity-0 group-hover:opacity-100'}`} />
                      {isActive && <div className={`lg:hidden absolute bottom-0 left-4 right-4 h-[2px] bg-${category.color.split('-')[1]}-500 opacity-50 shadow-[0_0_10px_currentColor]`} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hidden lg:flex lg:col-span-1 justify-center relative pointer-events-none z-10">
             <div ref={busRef} className="h-full w-[2px] bg-slate-800 relative">
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent opacity-50 blur-sm animate-pulse-slow" />
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[2px] bg-cyan-500/50">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan]" />
                </div>
             </div>
          </div>
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
                   <span className="text-[10px] lg:text-xs font-mono text-cyan-400 uppercase tracking-widest truncate max-w-[150px] lg:max-w-none">DATA_STREAM: {activeCategory.id}</span>
                </div>
                <Share2 size={16} className="text-slate-600" />
              </div>
              <div className="p-5 lg:p-8 flex-1 overflow-y-auto custom-scrollbar relative">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div key={activeCategory.id} className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="mb-8 lg:mb-10">
                    <h2 className={`text-3xl lg:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${activeCategory.gradient.replace('/20', '')} to-white`}>{activeCategory.title}</h2>
                    <p className="text-slate-400 text-sm lg:text-lg font-light leading-relaxed border-l-2 border-slate-700 pl-4">{activeCategory.description}</p>
                  </div>
                  <div className="space-y-4 lg:space-y-5">
                    {activeCategory.details.map((item, idx) => (
                      <div key={item.tech} className="group relative bg-slate-950/40 border border-slate-800 hover:border-slate-600 transition-all duration-300 p-5 lg:p-6 overflow-hidden rounded-xl" style={{ animationDelay: `${idx * 150}ms` }}>
                         <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-full opacity-10" style={{ backgroundColor: item.highlight }} />
                         <div className="relative z-10 flex flex-col sm:flex-row gap-5 lg:gap-6">
                            <div className="flex-shrink-0">
                               <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-slate-900 border border-slate-800 font-bold text-xl lg:text-2xl rounded-lg shadow-inner" style={{ color: item.highlight.substring(0, 7) }}>{item.tech.charAt(0)}</div>
                            </div>
                            <div className="flex-1">
                               <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                                  <h3 className="font-bold text-slate-200 text-lg lg:text-xl group-hover:text-white transition-colors">{item.tech}</h3>
                                  <span className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-slate-900 text-slate-500 border border-slate-800">{item.meta}</span>
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
                 <div className="flex items-center gap-2"><Lock size={10} /> ENCRYPTED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
