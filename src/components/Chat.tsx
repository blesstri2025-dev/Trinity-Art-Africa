import { Search, Send, Image, Mic, MoreVertical, MessageCircle, Handshake, Check, X, Bell } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { MOCK_COLLAB_REQUESTS } from '../data/mockData';

const MOCK_CHATS = [
  { id: '1', name: 'Amara Okafor', lastMsg: 'I loved your latest sketch!', time: '10m', unread: 2, avatar: 'https://picsum.photos/seed/amara/100' },
  { id: '2', name: 'Creative Circle Lagos', lastMsg: 'Tunde: Who is up for a mural project?', time: '1h', unread: 0, avatar: 'https://picsum.photos/seed/group1/100', isGroup: true },
  { id: '3', name: 'Kofi Mensah', lastMsg: 'Sent a collaboration request', time: '3h', unread: 1, avatar: 'https://picsum.photos/seed/kofi/100', hasRequest: true },
];

export default function Chat() {
  const [activeTab, setActiveTab] = useState<'messages' | 'requests'>('messages');
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);
  const [requests, setRequests] = useState(MOCK_COLLAB_REQUESTS);

  const handleRequestAction = (id: string, action: 'accepted' | 'declined') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="h-[calc(100vh-12rem)] md:h-[calc(100vh-6rem)] flex bg-white rounded-[2.5rem] overflow-hidden border border-cream shadow-sm">
      {/* Sidebar */}
      <div className={cn(
        "w-full md:w-80 border-r border-cream flex flex-col",
        activeChat && "hidden md:flex"
      )}>
        {/* Sidebar Header & Tabs */}
        <div className="p-6 border-b border-cream space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-umber">Inbox</h2>
            <button className="p-2 bg-cream rounded-xl text-umber/40 hover:text-terracotta transition-colors">
              <Bell size={20} />
            </button>
          </div>
          
          <div className="flex bg-cream/50 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('messages')}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                activeTab === 'messages' ? "bg-white text-terracotta shadow-sm" : "text-umber/40"
              )}
            >
              Messages
            </button>
            <button 
              onClick={() => setActiveTab('requests')}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-2",
                activeTab === 'requests' ? "bg-white text-ochre shadow-sm" : "text-umber/40"
              )}
            >
              <span>Collabs</span>
              {pendingCount > 0 && (
                <span className="bg-ochre text-white text-[8px] px-1.5 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-umber/30" size={18} />
            <input 
              type="text" 
              placeholder={activeTab === 'messages' ? "Search chats..." : "Search requests..."}
              className="w-full bg-cream/30 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-terracotta/20"
            />
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'messages' ? (
            MOCK_CHATS.map((chat) => (
              <button 
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={cn(
                  "w-full p-4 flex items-center space-x-4 hover:bg-cream/30 transition-colors border-b border-cream/50",
                  activeChat?.id === chat.id && "bg-cream/50"
                )}
              >
                <div className="relative">
                  <img 
                    src={chat.avatar} 
                    alt={chat.name} 
                    className={cn("w-12 h-12 object-cover", chat.isGroup ? "rounded-2xl" : "rounded-full")}
                    referrerPolicy="no-referrer"
                  />
                  {(chat.unread > 0 || chat.hasRequest) && (
                    <span className={cn(
                      "absolute -top-1 -right-1 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white",
                      chat.hasRequest ? "bg-ochre" : "bg-terracotta"
                    )}>
                      {chat.hasRequest ? <Handshake size={10} /> : chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-umber truncate">{chat.name}</h4>
                    <span className="text-[10px] text-umber/40 font-bold">{chat.time}</span>
                  </div>
                  <p className={cn(
                    "text-xs truncate",
                    chat.hasRequest ? "text-ochre font-bold" : "text-umber/50"
                  )}>
                    {chat.hasRequest ? "Collaboration Request" : chat.lastMsg}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 space-y-4">
              {requests.map((req) => (
                <div 
                  key={req.id}
                  className="bg-cream/30 rounded-2xl p-4 border border-cream space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <img src={req.senderAvatar} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-umber truncate">{req.senderName}</h4>
                      <p className="text-[10px] text-ochre font-bold uppercase tracking-wider">{req.projectType}</p>
                    </div>
                    <span className="text-[10px] text-umber/40 font-bold">{req.timestamp}</span>
                  </div>
                  <p className="text-xs text-umber/70 line-clamp-2 italic">"{req.message}"</p>
                  
                  {req.status === 'pending' ? (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleRequestAction(req.id, 'accepted')}
                        className="flex-1 bg-ochre text-white py-2 rounded-lg text-[10px] font-bold flex items-center justify-center space-x-1"
                      >
                        <Check size={12} />
                        <span>Accept</span>
                      </button>
                      <button 
                        onClick={() => handleRequestAction(req.id, 'declined')}
                        className="flex-1 bg-white text-umber py-2 rounded-lg text-[10px] font-bold flex items-center justify-center space-x-1 border border-cream"
                      >
                        <X size={12} />
                        <span>Decline</span>
                      </button>
                    </div>
                  ) : (
                    <div className={cn(
                      "py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-center",
                      req.status === 'accepted' ? "bg-emerald-afro/10 text-emerald-afro" : "bg-terracotta/10 text-terracotta"
                    )}>
                      {req.status}
                    </div>
                  )}
                </div>
              ))}
              {requests.length === 0 && (
                <div className="text-center py-10 opacity-40">
                  <Handshake size={32} className="mx-auto mb-2" />
                  <p className="text-xs font-bold">No requests yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className={cn(
        "flex-1 flex flex-col",
        !activeChat && "hidden md:flex items-center justify-center bg-cream/10"
      )}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-cream flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button onClick={() => setActiveChat(null as any)} className="md:hidden text-umber/40 mr-2">
                  <Search size={20} className="rotate-90" /> {/* Back arrow placeholder */}
                </button>
                <img 
                  src={activeChat.avatar} 
                  alt={activeChat.name} 
                  className={cn("w-10 h-10 object-cover", activeChat.isGroup ? "rounded-xl" : "rounded-full")}
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-umber leading-none">{activeChat.name}</h4>
                  <span className="text-[10px] text-emerald-afro font-bold uppercase tracking-wider">Online</span>
                </div>
              </div>
              <button className="text-umber/40">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 pattern-bg">
              <div className="flex justify-center">
                <span className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-umber/40 uppercase tracking-widest">Today</span>
              </div>
              
              {/* Collaboration Request Message (Integrated) */}
              {activeChat.id === '3' && (
                <div className="flex flex-col items-center space-y-4">
                  <div className={cn(
                    "bg-white rounded-3xl p-6 shadow-xl border-2 max-w-md w-full transition-all duration-500",
                    requests[0].status === 'pending' ? "border-ochre/20" : "border-cream opacity-80"
                  )}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "p-3 rounded-2xl transition-colors",
                          requests[0].status === 'pending' ? "bg-ochre/10 text-ochre" : "bg-cream text-umber/40"
                        )}>
                          <Handshake size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-umber">Collaboration Request</h4>
                          <p className="text-xs text-ochre font-bold uppercase tracking-wider">{requests[0].projectType}</p>
                        </div>
                      </div>
                      {requests[0].status !== 'pending' && (
                        <div className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          requests[0].status === 'accepted' ? "bg-emerald-afro text-white" : "bg-terracotta text-white"
                        )}>
                          {requests[0].status}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-umber/80 leading-relaxed mb-6 italic">
                      "{requests[0].message}"
                    </p>

                    {requests[0].status === 'pending' && (
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleRequestAction(requests[0].id, 'accepted')}
                          className="flex-1 bg-ochre text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-ochre/20 hover:scale-105 transition-transform"
                        >
                          <Check size={18} />
                          <span>Accept</span>
                        </button>
                        <button 
                          onClick={() => handleRequestAction(requests[0].id, 'declined')}
                          className="flex-1 bg-cream text-umber py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 hover:bg-ochre/10 transition-colors"
                        >
                          <X size={18} />
                          <span>Decline</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-end space-x-2 max-w-[80%]">
                <img src={activeChat.avatar} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-cream">
                  <p className="text-sm text-umber">I loved your latest sketch! The way you used the terracotta tones is amazing.</p>
                </div>
              </div>

              <div className="flex items-end justify-end space-x-2 ml-auto max-w-[80%]">
                <div className="bg-terracotta p-4 rounded-2xl rounded-br-none shadow-lg shadow-terracotta/10 text-white">
                  <p className="text-sm">Thank you so much, Amara! I was inspired by the clay soils in my village.</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-cream">
              <div className="flex items-center space-x-2 bg-cream/50 rounded-2xl p-2">
                <button className="p-2 text-umber/40 hover:text-terracotta">
                  <Image size={20} />
                </button>
                <button className="p-2 text-umber/40 hover:text-terracotta">
                  <Mic size={20} />
                </button>
                <input 
                  type="text" 
                  placeholder="Write a message..." 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
                />
                <button className="bg-terracotta text-white p-2.5 rounded-xl shadow-lg shadow-terracotta/20">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto text-terracotta/40">
              <MessageCircle size={40} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-umber">Your Messages</h3>
              <p className="text-sm text-umber/40">Select a chat to start collaborating.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
