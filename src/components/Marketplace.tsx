import { ShoppingCart, Tag, Heart, ExternalLink, Plus } from 'lucide-react';
import { motion } from 'motion/react';

const MOCK_PRODUCTS = [
  {
    id: 'pr1',
    name: 'Sunset over Serengeti',
    artist: 'Amara Okafor',
    price: 250,
    image: 'https://picsum.photos/seed/product1/600/600',
    type: 'Original Painting',
  },
  {
    id: 'pr2',
    name: 'Afro-Punk Portrait',
    artist: 'Kofi Mensah',
    price: 45,
    image: 'https://picsum.photos/seed/product2/600/600',
    type: 'Limited Print',
  },
  {
    id: 'pr3',
    name: 'Tribal Patterns #4',
    artist: 'Zanele Mbeki',
    price: 120,
    image: 'https://picsum.photos/seed/product3/600/600',
    type: 'Digital Asset',
  },
  {
    id: 'pr4',
    name: 'Motherhood Sculpture',
    artist: 'Zanele Mbeki',
    price: 850,
    image: 'https://picsum.photos/seed/product4/600/600',
    type: 'Sculpture',
  },
];

export default function Marketplace() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-umber">Marketplace</h2>
          <p className="text-umber/50">Support African artists directly.</p>
        </div>
        <button className="bg-terracotta text-white p-3 rounded-2xl shadow-lg shadow-terracotta/20">
          <Plus size={24} />
        </button>
      </div>

      {/* Featured Banner */}
      <div className="bg-ochre rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            Artist of the Month
          </span>
          <h3 className="text-4xl font-bold mb-2">Amara Okafor</h3>
          <p className="text-white/80 mb-6">Exclusive collection now available for auction.</p>
          <button className="bg-white text-ochre px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            View Collection
          </button>
        </div>
        <div className="mt-8 md:mt-0 relative z-10">
          <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-white/20 rotate-3 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/featured/400" 
              alt="Featured Art" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2rem] overflow-hidden border border-cream shadow-sm group"
          >
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full text-umber/40 hover:text-terracotta transition-colors shadow-sm">
                <Heart size={20} />
              </button>
              <div className="absolute bottom-4 left-4 bg-terracotta text-white px-3 py-1 rounded-lg text-sm font-bold">
                ${product.price}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-umber text-lg">{product.name}</h3>
                  <p className="text-sm text-umber/50">by {product.artist}</p>
                </div>
                <span className="text-[10px] font-bold text-terracotta bg-terracotta/10 px-2 py-1 rounded uppercase tracking-wider">
                  {product.type}
                </span>
              </div>
              
              <div className="flex space-x-2 mt-6">
                <button className="flex-1 bg-umber text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 hover:bg-umber/90 transition-colors">
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
                <button className="p-3 bg-cream text-umber rounded-xl hover:bg-ochre/10 transition-colors">
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
