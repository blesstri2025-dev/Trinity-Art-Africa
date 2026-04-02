export interface Artist {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  style: string;
  level: 'Beginner' | 'Intermediate' | 'Professional';
  followers: number;
  following: number;
  socials?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Post {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  artistLevel: 'Beginner' | 'Intermediate' | 'Professional';
  artistStyle: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  hashtags: string[];
  timestamp: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  level: string;
  duration: string;
  category: string;
}

export const MOCK_ARTISTS: Artist[] = [
  {
    id: '1',
    name: 'Amara Okafor',
    username: 'amara_arts',
    avatar: 'https://picsum.photos/seed/amara/200',
    bio: 'Contemporary African painter exploring identity and heritage through vibrant colors.',
    location: 'Lagos, Nigeria',
    style: 'Abstract Expressionism',
    level: 'Professional',
    followers: 12400,
    following: 450,
    socials: {
      instagram: 'https://instagram.com/amara_arts',
      twitter: 'https://twitter.com/amara_arts',
      linkedin: 'https://linkedin.com/in/amaraokafor',
    },
  },
  {
    id: '2',
    name: 'Kofi Mensah',
    username: 'kofi_digital',
    avatar: 'https://picsum.photos/seed/kofi/200',
    bio: 'Digital illustrator focusing on Afro-futurism and character design.',
    location: 'Accra, Ghana',
    style: 'Digital Illustration',
    level: 'Intermediate',
    followers: 5600,
    following: 890,
  },
  {
    id: '3',
    name: 'Zanele Mbeki',
    username: 'zanele_sculpts',
    avatar: 'https://picsum.photos/seed/zanele/200',
    bio: 'Sculptor working with traditional materials to tell modern stories.',
    location: 'Johannesburg, South Africa',
    style: 'Sculpture',
    level: 'Professional',
    followers: 8900,
    following: 320,
  },
  {
    id: '4',
    name: 'Tunde Adebayo',
    username: 'tunde_sketches',
    avatar: 'https://picsum.photos/seed/tunde/200',
    bio: 'Beginner artist passionate about traditional sketching and charcoal.',
    location: 'Ibadan, Nigeria',
    style: 'Traditional Sketching',
    level: 'Beginner',
    followers: 1200,
    following: 150,
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    artistId: '1',
    artistName: 'Amara Okafor',
    artistAvatar: 'https://picsum.photos/seed/amara/200',
    artistLevel: 'Professional',
    artistStyle: 'Abstract Expressionism',
    image: 'https://picsum.photos/seed/art1/800/600',
    caption: 'New piece from my "Ancestral Echoes" series. #AfroAbstract #ContemporaryArt',
    likes: 1240,
    comments: 85,
    hashtags: ['#AfroAbstract', '#ContemporaryArt'],
    timestamp: '2h ago',
  },
  {
    id: 'p2',
    artistId: '2',
    artistName: 'Kofi Mensah',
    artistAvatar: 'https://picsum.photos/seed/kofi/200',
    artistLevel: 'Intermediate',
    artistStyle: 'Digital Illustration',
    image: 'https://picsum.photos/seed/art2/800/600',
    caption: 'Character design for my upcoming comic set in a futuristic Nairobi. #DigitalArtAfrica #Afrofuturism',
    likes: 850,
    comments: 42,
    hashtags: ['#DigitalArtAfrica', '#Afrofuturism'],
    timestamp: '5h ago',
  },
  {
    id: 'p3',
    artistId: '4',
    artistName: 'Tunde Adebayo',
    artistAvatar: 'https://picsum.photos/seed/tunde/200',
    artistLevel: 'Beginner',
    artistStyle: 'Traditional Sketching',
    image: 'https://picsum.photos/seed/art3/800/600',
    caption: 'Practicing my charcoal techniques today. Learning every day! #BeginnerArtist #CharcoalArt',
    likes: 150,
    comments: 12,
    hashtags: ['#BeginnerArtist', '#CharcoalArt'],
    timestamp: '1d ago',
  },
  {
    id: 'p4',
    artistId: '3',
    artistName: 'Zanele Mbeki',
    artistAvatar: 'https://picsum.photos/seed/zanele/200',
    artistLevel: 'Professional',
    artistStyle: 'Sculpture',
    image: 'https://picsum.photos/seed/art4/800/600',
    caption: 'The texture of clay is where the story begins. #Sculpture #AfricanArt',
    likes: 2100,
    comments: 156,
    hashtags: ['#Sculpture', '#AfricanArt'],
    timestamp: '3d ago',
  },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Mastering Adinkra Symbols in Modern Design',
    instructor: 'Kofi Mensah',
    thumbnail: 'https://picsum.photos/seed/course1/400/250',
    level: 'Intermediate',
    duration: '4h 30m',
    category: 'Design',
  },
  {
    id: 'c2',
    title: 'Traditional Clay Sculpting Techniques',
    instructor: 'Zanele Mbeki',
    thumbnail: 'https://picsum.photos/seed/course2/400/250',
    level: 'Beginner',
    duration: '6h 15m',
    category: 'Sculpture',
  },
];

export interface CreativeCircle {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  members: number;
  style: string;
  region?: string;
  isPrivate: boolean;
  portfolio: string[]; // Array of image URLs
  projects: {
    id: string;
    title: string;
    status: 'Planning' | 'In Progress' | 'Review' | 'Completed';
    assignees: string[]; // Artist names
  }[];
}

export const MOCK_CIRCLES: CreativeCircle[] = [
  {
    id: 'circle1',
    name: 'Afro-Abstract Collective',
    description: 'A private space for abstract expressionists across the continent to share techniques and collaborate on large-scale digital murals.',
    coverImage: 'https://picsum.photos/seed/circle1/800/400',
    members: 124,
    style: 'Abstract Expressionism',
    isPrivate: true,
    portfolio: [
      'https://picsum.photos/seed/art1/400/400',
      'https://picsum.photos/seed/art2/400/400',
      'https://picsum.photos/seed/art3/400/400',
    ],
    projects: [
      { id: 'p1', title: 'Lagos Tech Hub Mural', status: 'In Progress', assignees: ['Amara Okafor', 'Kofi Mensah'] },
      { id: 'p2', title: 'Ancestral Patterns Study', status: 'Planning', assignees: ['Zanele Mbeki'] },
    ]
  },
  {
    id: 'circle2',
    name: 'West African Digital Illustrators',
    description: 'Connecting digital artists from Ghana, Nigeria, and Senegal for regional storytelling projects.',
    coverImage: 'https://picsum.photos/seed/circle2/800/400',
    members: 85,
    style: 'Digital Illustration',
    region: 'West Africa',
    isPrivate: false,
    portfolio: [
      'https://picsum.photos/seed/art4/400/400',
      'https://picsum.photos/seed/art5/400/400',
    ],
    projects: [
      { id: 'p3', title: 'Folklore Reimagined Comic', status: 'Review', assignees: ['Kofi Mensah', 'Tunde Adebayo'] },
    ]
  }
];

export interface CollaborationRequest {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderAvatar: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  timestamp: string;
  projectType: string;
}

export const MOCK_COLLAB_REQUESTS: CollaborationRequest[] = [
  {
    id: 'cr1',
    senderId: '2',
    receiverId: '1',
    senderName: 'Kofi Mensah',
    senderAvatar: 'https://picsum.photos/seed/kofi/200',
    message: 'Hey Amara! I love your abstract style. Would you be interested in collaborating on a digital mural for a new tech hub in Nairobi?',
    status: 'pending',
    timestamp: '1h ago',
    projectType: 'Digital Mural',
  }
];
