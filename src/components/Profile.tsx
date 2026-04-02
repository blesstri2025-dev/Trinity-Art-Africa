import { MapPin, Palette, Award, Users, Grid, List, Settings, Handshake, X, Star, Heart, MessageCircle, Instagram, Twitter, Linkedin, ExternalLink, Plus } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_ARTISTS, MOCK_POSTS, Post } from '../data/mockData';
import { cn } from '../lib/utils';

export default function Profile() {
  const artist = MOCK_ARTISTS[0]; // Using Amara for profile view
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [collabMessage, setCollabMessage] = useState('');
  const [projectType, setProjectType] = useState('Mural Project');
  const [isSent, setIsSent] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(artist.followers);
  
  const [socialLinks, setSocialLinks] = useState(artist.socials || {
    instagram: '',
    twitter: '',
    linkedin: '',
  });

  // Get all posts by this artist for the portfolio
  const artistPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => post.artistId === artist.id);
  }, [artist.id]);

  // State for featured posts
  const [featuredPostIds, setFeaturedPostIds] = useState<Set<string>>(new Set([artistPosts[0]?.id].filter(Boolean)));

  const handleFollow = () => {
    if (isFollowing) {
      setFollowerCount(prev => prev - 1);
    } else {
      setFollowerCount(prev => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  const toggleFeature = (postId: string) => {
    const newFeatured = new Set(featuredPostIds);
    if (newFeatured.has(postId)) {
      newFeatured.delete(postId);
    } else {
      // Limit to 4 featured items for layout balance
      if (newFeatured.size >= 4) {
        // Optional: Show a toast or notification
        return;
      }
      newFeatured.add(postId);
    }
    setFeaturedPostIds(newFeatured);
  };

  const featuredPosts = useMemo(() => {
    return artistPosts.filter(post => featuredPostIds.has(post.id));
  }, [artistPosts, featuredPostIds]);

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  const handleSendRequest = () => {
    setIsSent(true);
    setTimeout(() => {
      setIsCollabModalOpen(false);
      setIsSent(false);
      setCollabMessage('');
    }, 2000);
  };

  const handleSaveSocials = () => {
    // In a real app, this would call an API
    setIsSocialModalOpen(false);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Profile Header */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full -mr-16 -mt-16" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-terracotta to-saffron">
              <img 
                src={artist.avatar} 
                alt={artist.name} 
                className="w-full h-full rounded-full object-cover border-4 border-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-emerald-afro text-white p-1.5 rounded-full border-2 border-white">
              <Award size={16} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-umber">{artist.name}</h2>
                <p className="text-terracotta font-semibold">@{artist.username}</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-4 md:mt-0 justify-center">
                <button 
                  onClick={handleFollow}
                  className={cn(
                    "px-6 py-2.5 rounded-full font-bold shadow-lg transition-all transform hover:scale-105",
                    isFollowing 
                      ? "bg-cream text-umber border border-cream shadow-none" 
                      : "bg-terracotta text-white shadow-terracotta/20"
                  )}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button 
                  onClick={() => setIsCollabModalOpen(true)}
                  className="bg-ochre text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-ochre/20 hover:scale-105 transition-transform flex items-center space-x-2"
                >
                  <Handshake size={18} />
                  <span>Collaborate</span>
                </button>
                <button 
                  onClick={() => setIsSocialModalOpen(true)}
                  className="bg-cream text-umber px-4 py-2.5 rounded-full font-bold hover:bg-ochre/10 transition-colors flex items-center space-x-2"
                >
                  <Settings size={18} />
                  <span className="hidden sm:inline">Edit Links</span>
                </button>
              </div>
            </div>

            <p className="text-umber/80 leading-relaxed mb-4 max-w-2xl">
              {artist.bio}
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center justify-center md:justify-start space-x-4 mb-6">
              {socialLinks.instagram && (
                <a 
                  href={socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-cream text-umber/60 hover:text-terracotta hover:bg-terracotta/10 rounded-xl transition-all"
                >
                  <Instagram size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a 
                  href={socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-cream text-umber/60 hover:text-terracotta hover:bg-terracotta/10 rounded-xl transition-all"
                >
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-cream text-umber/60 hover:text-terracotta hover:bg-terracotta/10 rounded-xl transition-all"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {!socialLinks.instagram && !socialLinks.twitter && !socialLinks.linkedin && (
                <button 
                  onClick={() => setIsSocialModalOpen(true)}
                  className="text-xs font-bold text-terracotta hover:underline flex items-center space-x-1"
                >
                  <Plus size={14} />
                  <span>Add Social Links</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium text-umber/60">
              <div className="flex items-center space-x-1.5">
                <MapPin size={16} className="text-terracotta" />
                <span>{artist.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Palette size={16} className="text-ochre" />
                <span>{artist.style}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Award size={16} className="text-saffron" />
                <span className="bg-saffron/10 text-ochre px-2 py-0.5 rounded-md text-xs font-bold uppercase">
                  {artist.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-cream">
          <div className="text-center">
            <p className="text-2xl font-bold text-umber">{formatCount(followerCount)}</p>
            <p className="text-xs font-bold text-umber/40 uppercase tracking-widest">Followers</p>
          </div>
          <div className="text-center border-x border-cream">
            <p className="text-2xl font-bold text-umber">{formatCount(artist.following)}</p>
            <p className="text-xs font-bold text-umber/40 uppercase tracking-widest">Following</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-umber">{artistPosts.length}</p>
            <p className="text-xs font-bold text-umber/40 uppercase tracking-widest">Artworks</p>
          </div>
        </div>
      </div>

      {/* Social Links Modal */}
      <AnimatePresence>
        {isSocialModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSocialModalOpen(false)}
              className="absolute inset-0 bg-umber/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl border border-cream"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-terracotta/10 text-terracotta rounded-2xl">
                      <ExternalLink size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-umber">Social Links</h3>
                  </div>
                  <button onClick={() => setIsSocialModalOpen(false)} className="text-umber/40 hover:text-terracotta">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-umber/40 uppercase tracking-widest mb-2 flex items-center space-x-2">
                      <Instagram size={14} />
                      <span>Instagram URL</span>
                    </label>
                    <input 
                      type="url"
                      value={socialLinks.instagram}
                      onChange={(e) => setSocialLinks(prev => ({ ...prev, instagram: e.target.value }))}
                      placeholder="https://instagram.com/yourprofile"
                      className="w-full bg-cream/30 border border-cream rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-terracotta/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-umber/40 uppercase tracking-widest mb-2 flex items-center space-x-2">
                      <Twitter size={14} />
                      <span>Twitter URL</span>
                    </label>
                    <input 
                      type="url"
                      value={socialLinks.twitter}
                      onChange={(e) => setSocialLinks(prev => ({ ...prev, twitter: e.target.value }))}
                      placeholder="https://twitter.com/yourprofile"
                      className="w-full bg-cream/30 border border-cream rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-terracotta/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-umber/40 uppercase tracking-widest mb-2 flex items-center space-x-2">
                      <Linkedin size={14} />
                      <span>LinkedIn URL</span>
                    </label>
                    <input 
                      type="url"
                      value={socialLinks.linkedin}
                      onChange={(e) => setSocialLinks(prev => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full bg-cream/30 border border-cream rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-terracotta/20 outline-none"
                    />
                  </div>
                  <button 
                    onClick={handleSaveSocials}
                    className="w-full bg-terracotta text-white py-4 rounded-2xl font-bold shadow-lg shadow-terracotta/20 hover:scale-[1.02] transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Collaboration Modal */}
      <AnimatePresence>
        {isCollabModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCollabModalOpen(false)}
              className="absolute inset-0 bg-umber/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl border border-cream"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-ochre/10 text-ochre rounded-2xl">
                      <Handshake size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-umber">Request Collaboration</h3>
                  </div>
                  <button onClick={() => setIsCollabModalOpen(false)} className="text-umber/40 hover:text-terracotta">
                    <X size={24} />
                  </button>
                </div>

                {isSent ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-20 h-20 bg-emerald-afro/10 text-emerald-afro rounded-full flex items-center justify-center mx-auto">
                      <Award size={40} />
                    </div>
                    <h4 className="text-xl font-bold text-umber">Request Sent!</h4>
                    <p className="text-umber/60 leading-relaxed">Your collaboration request has been sent to {artist.name}. You'll be notified when they respond.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-umber/40 uppercase tracking-widest mb-2">Project Type</label>
                      <select 
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full bg-cream/30 border border-cream rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-ochre/20 outline-none"
                      >
                        <option>Mural Project</option>
                        <option>Digital Illustration</option>
                        <option>Exhibition Collaboration</option>
                        <option>Art Workshop</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-umber/40 uppercase tracking-widest mb-2">Your Message</label>
                      <textarea 
                        rows={4}
                        value={collabMessage}
                        onChange={(e) => setCollabMessage(e.target.value)}
                        placeholder={`Tell ${artist.name} about your project idea...`}
                        className="w-full bg-cream/30 border border-cream rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-ochre/20 outline-none resize-none"
                      />
                    </div>
                    <button 
                      onClick={handleSendRequest}
                      disabled={!collabMessage.trim()}
                      className="w-full bg-ochre text-white py-4 rounded-2xl font-bold shadow-lg shadow-ochre/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
                    >
                      Send Request
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Portfolio Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-bold text-umber">Portfolio</h3>
            <span className="text-xs font-bold text-umber/40 bg-cream px-2 py-0.5 rounded-md">
              {artistPosts.length} Artworks
            </span>
          </div>
          <div className="flex bg-white rounded-full p-1 border border-cream">
            <button className="p-2 bg-cream text-terracotta rounded-full">
              <Grid size={18} />
            </button>
            <button className="p-2 text-umber/40">
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {artistPosts.map((post) => (
            <motion.div 
              key={post.id}
              whileHover={{ scale: 0.98 }}
              className="aspect-square rounded-3xl overflow-hidden bg-white border border-cream shadow-sm group relative cursor-pointer"
            >
              <img 
                src={post.image} 
                alt={post.caption} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-umber/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFeature(post.id);
                  }}
                  className={cn(
                    "p-3 rounded-2xl shadow-xl transition-all transform hover:scale-110 flex items-center space-x-2",
                    featuredPostIds.has(post.id) ? "bg-saffron text-white" : "bg-white text-umber/40"
                  )}
                >
                  <Star size={20} fill={featuredPostIds.has(post.id) ? "currentColor" : "none"} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {featuredPostIds.has(post.id) ? 'Featured' : 'Feature'}
                  </span>
                </button>
              </div>
              {featuredPostIds.has(post.id) && (
                <div className="absolute top-4 right-4 bg-saffron text-white p-1.5 rounded-xl shadow-lg">
                  <Star size={12} fill="currentColor" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Artworks Section */}
      <AnimatePresence>
        {featuredPosts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6 pt-12 border-t border-cream"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-saffron/10 text-saffron rounded-xl">
                  <Star size={20} fill="currentColor" />
                </div>
                <h3 className="text-xl font-bold text-umber">Featured Artworks</h3>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-umber/30">
                {featuredPosts.length} / 4 Selected
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-cream shadow-sm group relative"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.caption} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-umber/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <div className="flex items-center space-x-4 text-white">
                        <div className="flex items-center space-x-1">
                          <Heart size={16} fill="currentColor" />
                          <span className="text-xs font-bold">{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={16} fill="currentColor" />
                          <span className="text-xs font-bold">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                        <h4 className="font-bold text-umber text-lg line-clamp-1">{post.caption.split('#')[0]}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {post.hashtags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] font-bold text-terracotta">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleFeature(post.id)}
                        className="bg-cream text-umber/40 hover:text-terracotta p-2 rounded-xl transition-colors"
                        title="Remove from featured"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
