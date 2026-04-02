import { Play, Clock, Star, BookOpen, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_COURSES } from '../data/mockData';

export default function Hub() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-indigo-afro rounded-[2.5rem] p-8 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mb-32 -mr-32" />
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Elevate Your Craft</h2>
          <p className="text-white/80 mb-6 leading-relaxed">
            Access exclusive tutorials and masterclasses from Africa's leading professionals. From traditional techniques to digital mastery.
          </p>
          <button className="bg-saffron text-umber px-8 py-3 rounded-full font-bold shadow-xl shadow-saffron/20 hover:scale-105 transition-transform">
            Explore All Courses
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-umber/40" size={20} />
          <input 
            type="text" 
            placeholder="Search tutorials, workshops..." 
            className="w-full bg-white border border-cream rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-terracotta/20"
          />
        </div>
        <button className="bg-white border border-cream rounded-2xl px-6 py-4 flex items-center justify-center space-x-2 text-umber/70 font-bold">
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      {/* Categories */}
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Painting', 'Digital Art', 'Sculpture', 'Photography', 'Textiles'].map((cat) => (
          <button 
            key={cat}
            className="px-6 py-2.5 rounded-full bg-white border border-cream text-sm font-bold text-umber/70 hover:bg-terracotta hover:text-white transition-all flex-shrink-0"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_COURSES.map((course) => (
          <motion.div 
            key={course.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2rem] overflow-hidden border border-cream shadow-sm group"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-terracotta shadow-xl">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold text-terracotta uppercase tracking-wider">
                {course.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-umber mb-2 group-hover:text-terracotta transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-umber/60 mb-4">by {course.instructor}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-cream">
                <div className="flex items-center space-x-4 text-xs font-bold text-umber/40">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-saffron" fill="currentColor" />
                    <span>4.9</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-afro bg-emerald-afro/10 px-2 py-1 rounded">
                  {course.level}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
