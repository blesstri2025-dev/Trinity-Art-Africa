import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Filter, SlidersHorizontal, X, Link as LinkIcon, Twitter, Facebook, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { MOCK_POSTS, Post } from '../data/mockData';
import { cn } from '../lib/utils';

function ShareModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/post/${post.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialOptions = [
    { name: 'Twitter', icon: Twitter, color: 'bg-[#1DA1F2]', hover: 'hover:bg-[#1a91da]' },
    { name: 'Facebook', icon: Facebook, color: 'bg-[#1877F2]', hover: 'hover:bg-[#166fe5]' },
    { name: 'WhatsApp', icon: Send, color: 'bg-[#25D366]', hover: 'hover:bg-[#21bd5c]' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-umber/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl border border-cream"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black text-umber tracking-tight">Share Artwork</h3>
            <button onClick={onClose} className="text-umber/40 hover:text-terracotta transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-8 p-3 bg-cream/20 rounded-2xl border border-cream/50">
            <img src={post.image} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-umber truncate">{post.artistName}</p>
              <p className="text-xs text-umber/50 truncate">{post.caption}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {socialOptions.map((option) => (
              <button 
                key={option.name}
                className="flex flex-col items-center space-y-2 group"
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all transform group-hover:scale-110",
                  option.color,
                  option.hover
                )}>
                  <option.icon size={20} />
                </div>
                <span className="text-[10px] font-bold text-umber/60 uppercase tracking-widest">{option.name}</span>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-umber/40 ml-1">Direct Link</p>
            <div className="flex items-center space-x-2 bg-cream/30 border border-cream p-2 rounded-xl">
              <div className="flex-1 px-2 overflow-hidden">
                <p className="text-xs text-umber/60 truncate font-medium">{shareUrl}</p>
              </div>
              <button 
                onClick={handleCopy}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  copied ? "bg-emerald-afro text-white" : "bg-terracotta text-white hover:bg-terracotta/90"
                )}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Feed() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sharingPost, setSharingPost] = useState<Post | null>(null);

  const levels = ['Beginner', 'Intermediate', 'Professional'];
  const styles = useMemo(() => {
    const allStyles = MOCK_POSTS.map(post => post.artistStyle);
    return Array.from(new Set(allStyles));
  }, []);

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => {
      const levelMatch = !selectedLevel || post.artistLevel === selectedLevel;
      const styleMatch = !selectedStyle || post.artistStyle === selectedStyle;
      return levelMatch && styleMatch;
    });
  }, [selectedLevel, selectedStyle]);

  return (
    <div className="space-y-6">
      {/* Stories / Artists to Follow */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {['Amara', 'Kofi', 'Zanele', 'Tunde', 'Fatima', 'Kwame'].map((name, i) => (
          <div key={i} className="flex flex-col items-center space-y-1 flex-shrink-0">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-terracotta to-saffron">
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${name}/100`} 
                  alt={name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <span className="text-xs font-medium text-umber">{name}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-cream">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-umber">
            <Filter size={18} className="text-terracotta" />
            <span className="font-bold text-sm">Filter Feed</span>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-cream rounded-xl transition-colors text-umber/60"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <AnimatePresence>
          {(showFilters || selectedLevel || selectedStyle) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-4 pt-2"
            >
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-umber/40">Skill Level</p>
                <div className="flex flex-wrap gap-2">
                  {levels.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                        selectedLevel === level 
                          ? "bg-terracotta text-white shadow-lg shadow-terracotta/20" 
                          : "bg-cream text-umber/60 hover:bg-cream/80"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-umber/40">Artistic Style</p>
                <div className="flex flex-wrap gap-2">
                  {styles.map(style => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(selectedStyle === style ? null : style)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                        selectedStyle === style 
                          ? "bg-ochre text-white shadow-lg shadow-ochre/20" 
                          : "bg-cream text-umber/60 hover:bg-cream/80"
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {(selectedLevel || selectedStyle) && (
                <button 
                  onClick={() => { setSelectedLevel(null); setSelectedStyle(null); }}
                  className="text-[10px] font-black uppercase tracking-widest text-terracotta hover:underline"
                >
                  Clear All Filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Posts */}
      <div className="space-y-8">
        {filteredPosts.map((post) => (
          <motion.article 
            key={post.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-cream"
          >
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={post.artistAvatar} 
                  alt={post.artistName} 
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-umber leading-none">{post.artistName}</h3>
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest border",
                      post.artistLevel === 'Professional' ? "bg-ochre/10 text-ochre border-ochre/20" :
                      post.artistLevel === 'Intermediate' ? "bg-emerald-afro/10 text-emerald-afro border-emerald-afro/20" :
                      "bg-terracotta/10 text-terracotta border-terracotta/20"
                    )}>
                      {post.artistLevel}
                    </span>
                  </div>
                  <span className="text-[10px] text-umber/50 font-medium">{post.artistStyle} • {post.timestamp}</span>
                </div>
              </div>
              <button className="text-umber/40 hover:text-terracotta transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Post Image */}
            <div className="aspect-square bg-cream overflow-hidden">
              <img 
                src={post.image} 
                alt="Artwork" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Post Actions */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-umber/70 hover:text-terracotta transition-colors">
                    <Heart size={24} />
                    <span className="text-sm font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-umber/70 hover:text-terracotta transition-colors">
                    <MessageCircle size={24} />
                    <span className="text-sm font-bold">{post.comments}</span>
                  </button>
                  <button 
                    onClick={() => setSharingPost(post)}
                    className="text-umber/70 hover:text-terracotta transition-colors"
                  >
                    <Share2 size={24} />
                  </button>
                </div>
                <button className="text-umber/70 hover:text-terracotta transition-colors">
                  <Bookmark size={24} />
                </button>
              </div>

              {/* Caption */}
              <p className="text-sm text-umber leading-relaxed">
                <span className="font-bold mr-2">{post.artistName}</span>
                {post.caption}
              </p>

              {/* Hashtags */}
              <div className="mt-2 flex flex-wrap gap-2">
                {post.hashtags.map((tag) => (
                  <span key={tag} className="text-xs font-bold text-terracotta hover:underline cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-cream border-dashed">
            <p className="text-umber/40 font-bold">No posts match your filters.</p>
            <button 
              onClick={() => { setSelectedLevel(null); setSelectedStyle(null); }}
              className="mt-2 text-terracotta font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {sharingPost && (
          <ShareModal post={sharingPost} onClose={() => setSharingPost(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
