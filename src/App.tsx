import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Search, Plus, MessageCircle, User, BookOpen, ShoppingBag, Calendar, Bell, Settings, Handshake, X, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Hub from './components/Hub';
import Marketplace from './components/Marketplace';
import Chat from './components/Chat';
import Events from './components/Events';
import Circles from './components/Circles';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'collab' | 'system';
  timestamp: string;
}

function Navigation({ notificationCount }: { notificationCount: number }) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Feed' },
    { path: '/hub', icon: BookOpen, label: 'Learn' },
    { path: '/circles', icon: Users, label: 'Circles' },
    { path: '/marketplace', icon: ShoppingBag, label: 'Shop' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-cream z-50 md:hidden flex justify-around items-center h-16 px-4 shadow-2xl">
        {navItems.filter(item => ['/', '/hub', '/circles', '/chat', '/profile'].includes(item.path)).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 transition-all duration-300 relative",
              location.pathname === item.path ? "text-terracotta scale-110" : "text-umber/40"
            )}
          >
            <item.icon size={22} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            {item.path === '/chat' && notificationCount > 0 && (
              <span className="absolute top-0 right-2 w-2 h-2 bg-ochre rounded-full border border-white" />
            )}
          </Link>
        ))}
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-cream p-8 z-50">
        <div className="mb-12 flex items-center space-x-4">
          <img 
            src="/logo.png" 
            alt="Trinity Art Africa Logo" 
            className="w-14 h-14 object-contain shadow-lg shadow-terracotta/10"
            referrerPolicy="no-referrer"
          />
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-umber leading-none">TRINITY</h1>
            <p className="text-[10px] font-bold text-terracotta uppercase tracking-[0.2em]">Art Africa</p>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative",
                location.pathname === item.path 
                  ? "bg-terracotta text-white shadow-xl shadow-terracotta/20 translate-x-2" 
                  : "text-umber/60 hover:bg-cream hover:text-terracotta"
              )}
            >
              <item.icon size={22} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
              <span className="font-bold text-lg">{item.label}</span>
              {item.path === '/chat' && notificationCount > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-ochre text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {notificationCount}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-auto space-y-6">
          <div className="p-5 bg-ochre/10 rounded-[2rem] border border-ochre/20 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-16 h-16 bg-ochre/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />
            <p className="text-[10px] font-black text-ochre uppercase tracking-widest mb-2">Creative Hub</p>
            <p className="text-xs text-umber/80 font-medium leading-relaxed">Join the "Afro-Abstract" circle and collaborate with 50+ artists.</p>
          </div>
          
          <div className="flex items-center space-x-3 px-2">
            <img src="https://picsum.photos/seed/user/100" className="w-10 h-10 rounded-full border-2 border-cream" referrerPolicy="no-referrer" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-umber truncate">Amara Okafor</p>
              <p className="text-[10px] text-umber/40 font-bold uppercase">Professional</p>
            </div>
            <Settings size={18} className="text-umber/30 hover:text-terracotta cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  );
}

function Header({ notificationCount }: { notificationCount: number }) {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-cream z-40 px-6 py-4 md:hidden flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img 
          src="/logo.png" 
          alt="Trinity Art Africa Logo" 
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
        <div>
          <h1 className="text-lg font-black tracking-tighter text-umber leading-none">TRINITY</h1>
          <p className="text-[8px] font-bold text-terracotta uppercase tracking-[0.2em]">Art Africa</p>
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <Search size={22} className="text-umber/40" />
        <div className="relative">
          <Bell size={22} className={cn("text-umber/40", notificationCount > 0 && "text-terracotta")} />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">
              {notificationCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

function Toast({ notification, onDismiss }: { notification: Notification; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="fixed top-6 right-6 z-[100] w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-cream overflow-hidden"
    >
      <div className="p-5 flex items-start space-x-4">
        <div className="p-3 bg-ochre/10 text-ochre rounded-2xl flex-shrink-0">
          <Handshake size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-umber text-sm mb-1">{notification.title}</h4>
          <p className="text-xs text-umber/60 leading-relaxed">{notification.message}</p>
          <div className="mt-3 flex space-x-2">
            <Link 
              to="/chat" 
              onClick={onDismiss}
              className="text-[10px] font-black uppercase tracking-widest text-ochre hover:underline"
            >
              View Request
            </Link>
            <button 
              onClick={onDismiss}
              className="text-[10px] font-black uppercase tracking-widest text-umber/40 hover:text-umber"
            >
              Dismiss
            </button>
          </div>
        </div>
        <button onClick={onDismiss} className="text-umber/20 hover:text-terracotta">
          <X size={18} />
        </button>
      </div>
      <div className="h-1 bg-ochre/20 w-full">
        <motion.div 
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-ochre"
        />
      </div>
    </motion.div>
  );
}

export default function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeToast, setActiveToast] = useState<Notification | null>(null);

  useEffect(() => {
    // Simulate a new collaboration request after 3 seconds
    const timer = setTimeout(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: "New Collaboration Request",
        message: "Kofi Mensah wants to collaborate on a 'Digital Mural' project with you.",
        type: 'collab',
        timestamp: new Date().toISOString(),
      };
      setNotifications(prev => [newNotification, ...prev]);
      setActiveToast(newNotification);

      // Auto-dismiss toast after 5 seconds
      setTimeout(() => {
        setActiveToast(null);
      }, 5000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const dismissToast = () => setActiveToast(null);

  return (
    <Router>
      <div className="min-h-screen flex flex-col md:flex-row bg-cream/20 selection:bg-terracotta/20">
        <Navigation notificationCount={notifications.length} />
        <main className="flex-1 md:ml-72 pb-24 md:pb-0 relative">
          <Header notificationCount={notifications.length} />
          <div className="max-w-5xl mx-auto p-6 md:p-12 min-h-screen pattern-bg">
            <AnimatePresence mode="wait">
              <motion.div
                key={window.location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Routes>
                  <Route path="/" element={<Feed />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/hub" element={<Hub />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/circles" element={<Circles />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {activeToast && (
              <Toast notification={activeToast} onDismiss={dismissToast} />
            )}
          </AnimatePresence>

          {/* Floating Action Button */}
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-20 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-terracotta text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-terracotta/40 z-50"
          >
            <Plus size={32} strokeWidth={3} />
          </motion.button>
        </main>
      </div>
    </Router>
  );
}
