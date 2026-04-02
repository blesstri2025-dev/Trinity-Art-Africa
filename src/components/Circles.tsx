import { Users, Lock, Globe, MessageCircle, Layout, Image as ImageIcon, Plus, Search, Filter, ChevronRight, CheckCircle2, Clock, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_CIRCLES, CreativeCircle } from '../data/mockData';
import { cn } from '../lib/utils';

export default function Circles() {
  const [selectedCircle, setSelectedCircle] = useState<CreativeCircle | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'portfolio' | 'projects'>('chat');

  return (
    <div className="space-y-8">
      {!selectedCircle ? (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2.5rem] border border-cream shadow-sm">
            <div>
              <h2 className="text-3xl font-black text-umber tracking-tight">Creative Circles</h2>
              <p className="text-umber/50 font-medium">Join specialized groups and collaborate on regional projects.</p>
            </div>
            <button className="bg-terracotta text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl shadow-terracotta/20 hover:scale-105 transition-transform">
              <Plus size={20} />
              <span>Create Circle</span>
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-umber/40" size={20} />
              <input 
                type="text" 
                placeholder="Search circles by style or region..." 
                className="w-full bg-white border border-cream rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-terracotta/20"
              />
            </div>
            <button className="bg-white border border-cream rounded-2xl px-6 py-4 flex items-center justify-center space-x-2 text-umber/70 font-bold">
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* Circles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_CIRCLES.map((circle) => (
              <motion.div 
                key={circle.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-cream shadow-sm group cursor-pointer"
                onClick={() => setSelectedCircle(circle)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={circle.coverImage} 
                    alt={circle.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl flex items-center space-x-2 shadow-lg">
                    {circle.isPrivate ? <Lock size={14} className="text-ochre" /> : <Globe size={14} className="text-emerald-afro" />}
                    <span className="text-[10px] font-black uppercase tracking-widest text-umber">
                      {circle.isPrivate ? 'Private' : 'Public'}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-black text-umber group-hover:text-terracotta transition-colors">{circle.name}</h3>
                      <p className="text-xs text-ochre font-bold uppercase tracking-widest mt-1">{circle.style}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-umber/40">
                      <Users size={16} />
                      <span className="text-xs font-bold">{circle.members}</span>
                    </div>
                  </div>
                  <p className="text-sm text-umber/60 leading-relaxed line-clamp-2 mb-6">
                    {circle.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <img key={i} src={`https://picsum.photos/seed/user${i}/100`} className="w-8 h-8 rounded-full border-2 border-white" referrerPolicy="no-referrer" />
                      ))}
                      <div className="w-8 h-8 rounded-full bg-cream border-2 border-white flex items-center justify-center text-[10px] font-bold text-umber/40">
                        +12
                      </div>
                    </div>
                    <button className="text-terracotta font-black text-xs uppercase tracking-widest flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                      <span>View Circle</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {/* Circle Detail Header */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden border border-cream shadow-sm">
            <div className="relative h-64">
              <img src={selectedCircle.coverImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-umber/80 to-transparent" />
              <button 
                onClick={() => setSelectedCircle(null)}
                className="absolute top-6 left-6 bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/30 transition-colors"
              >
                ← Back to Circles
              </button>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-ochre px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    {selectedCircle.style}
                  </span>
                  {selectedCircle.region && (
                    <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {selectedCircle.region}
                    </span>
                  )}
                </div>
                <h2 className="text-4xl font-black tracking-tight mb-2">{selectedCircle.name}</h2>
                <p className="text-white/80 max-w-2xl">{selectedCircle.description}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-cream px-8">
              {[
                { id: 'chat', label: 'Circle Chat', icon: MessageCircle },
                { id: 'portfolio', label: 'Shared Portfolio', icon: ImageIcon },
                { id: 'projects', label: 'Project Board', icon: Layout },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center space-x-2 px-6 py-6 text-sm font-bold transition-all relative",
                    activeTab === tab.id ? "text-terracotta" : "text-umber/40 hover:text-umber"
                  )}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-terracotta rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'chat' && (
                  <motion.div 
                    key="chat"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="bg-cream/20 rounded-3xl p-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto text-terracotta/40 shadow-sm">
                        <MessageCircle size={32} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-umber">Circle Group Chat</h4>
                        <p className="text-sm text-umber/50">Connect with {selectedCircle.members} members in this private space.</p>
                      </div>
                      <button className="bg-terracotta text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-terracotta/20">
                        Open Chat Window
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'portfolio' && (
                  <motion.div 
                    key="portfolio"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    {selectedCircle.portfolio.map((img, i) => (
                      <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-cream group relative">
                        <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="bg-white text-umber p-3 rounded-full shadow-xl">
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="aspect-square rounded-2xl border-2 border-dashed border-cream flex flex-col items-center justify-center space-y-2 text-umber/30 hover:border-terracotta hover:text-terracotta transition-all">
                      <Plus size={32} />
                      <span className="text-xs font-bold uppercase tracking-widest">Add Work</span>
                    </button>
                  </motion.div>
                )}

                {activeTab === 'projects' && (
                  <motion.div 
                    key="projects"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-umber">Active Collaborations</h4>
                      <button className="text-terracotta font-bold text-sm flex items-center space-x-1 hover:underline">
                        <Plus size={16} />
                        <span>New Project</span>
                      </button>
                    </div>
                    
                    <div className="grid gap-4">
                      {selectedCircle.projects.map((project) => (
                        <div key={project.id} className="bg-cream/10 border border-cream p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white hover:shadow-xl hover:shadow-cream/50 transition-all">
                          <div className="flex items-start space-x-4">
                            <div className={cn(
                              "p-3 rounded-2xl",
                              project.status === 'In Progress' ? "bg-emerald-afro/10 text-emerald-afro" :
                              project.status === 'Planning' ? "bg-ochre/10 text-ochre" :
                              "bg-terracotta/10 text-terracotta"
                            )}>
                              {project.status === 'In Progress' ? <PlayCircle size={24} /> : 
                               project.status === 'Planning' ? <Clock size={24} /> : 
                               <CheckCircle2 size={24} />}
                            </div>
                            <div>
                              <h5 className="font-bold text-umber">{project.title}</h5>
                              <div className="flex items-center space-x-2 mt-1">
                                <p className="text-xs text-umber/40">Assigned to:</p>
                                <div className="flex -space-x-1">
                                  {project.assignees.map((name, i) => (
                                    <div key={i} className="w-5 h-5 rounded-full bg-terracotta/20 border border-white flex items-center justify-center text-[8px] font-bold text-terracotta">
                                      {name[0]}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                              project.status === 'In Progress' ? "bg-emerald-afro text-white" :
                              project.status === 'Planning' ? "bg-ochre text-white" :
                              "bg-terracotta text-white"
                            )}>
                              {project.status}
                            </div>
                            <button className="p-2 hover:bg-cream rounded-xl transition-colors text-umber/40">
                              <ChevronRight size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
