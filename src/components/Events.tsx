import { Calendar as CalendarIcon, MapPin, Users, ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

const MOCK_EVENTS = [
  {
    id: 'e1',
    title: 'Contemporary African Art Exhibition',
    location: 'Nike Art Gallery, Lagos',
    date: 'Oct 15 - 20, 2026',
    image: 'https://picsum.photos/seed/event1/800/400',
    type: 'Exhibition',
    attendees: 1200,
  },
  {
    id: 'e2',
    title: 'Digital Art Africa Summit',
    location: 'Virtual / Nairobi',
    date: 'Nov 5, 2026',
    image: 'https://picsum.photos/seed/event2/800/400',
    type: 'Conference',
    attendees: 5000,
  },
];

const MOCK_OPPORTUNITIES = [
  {
    id: 'o1',
    title: 'Afro-Futurism Grant 2026',
    provider: 'African Union Arts Council',
    deadline: 'Sept 30, 2026',
    amount: '$10,000',
    category: 'Grant',
  },
  {
    id: 'o2',
    title: 'Artist Residency in Marrakesh',
    provider: 'Atlas Arts Collective',
    deadline: 'Oct 12, 2026',
    amount: 'Fully Funded',
    category: 'Residency',
  },
];

export default function Events() {
  return (
    <div className="space-y-10">
      {/* Events Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-umber">Upcoming Events</h2>
          <button className="text-terracotta font-bold text-sm flex items-center space-x-1">
            <span>View Calendar</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="space-y-6">
          {MOCK_EVENTS.map((event) => (
            <motion.div 
              key={event.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-cream shadow-sm flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-terracotta/10 text-terracotta text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                      {event.type}
                    </span>
                    <div className="flex items-center text-umber/40 text-xs font-bold">
                      <Users size={14} className="mr-1" />
                      <span>{event.attendees}+ attending</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-umber mb-4">{event.title}</h3>
                  
                  <div className="space-y-2 text-sm text-umber/60 font-medium">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon size={16} className="text-ochre" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-ochre" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 bg-terracotta text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-terracotta/20">
                    RSVP Now
                  </button>
                  <button className="px-6 py-3 bg-cream text-umber rounded-xl font-bold text-sm">
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-umber">Grants & Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_OPPORTUNITIES.map((opp) => (
            <div key={opp.id} className="bg-white p-6 rounded-[2rem] border border-cream shadow-sm hover:border-terracotta/30 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-afro/10 text-emerald-afro rounded-2xl">
                  <Star size={24} />
                </div>
                <span className="text-[10px] font-bold text-umber/40 uppercase tracking-widest">
                  Deadline: {opp.deadline}
                </span>
              </div>
              <h4 className="font-bold text-lg text-umber mb-1 group-hover:text-terracotta transition-colors">{opp.title}</h4>
              <p className="text-sm text-umber/50 mb-4">{opp.provider}</p>
              <div className="flex items-center justify-between pt-4 border-t border-cream">
                <span className="text-sm font-bold text-terracotta">{opp.amount}</span>
                <button className="text-xs font-bold text-umber/70 hover:text-terracotta flex items-center space-x-1">
                  <span>Apply</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
