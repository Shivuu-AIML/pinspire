import type { User, Pin, Board, Category, Notification, Comment, AdminStats } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

const DEMO_USERS: User[] = [
  {
    id: 'u1', username: 'alex_design', email: 'alex@example.com',
    displayName: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop',
    bio: 'UI/UX Designer & Visual Creator', followers: 12400, following: 342,
    isVerified: true, role: 'admin', createdAt: '2024-01-15', interests: ['design', 'photography', 'architecture']
  },
  {
    id: 'u2', username: 'sarah_photo', email: 'sarah@example.com',
    displayName: 'Sarah Miller', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    bio: 'Travel Photographer | Nature Lover', followers: 8900, following: 210,
    isVerified: true, role: 'user', createdAt: '2024-02-20', interests: ['photography', 'travel', 'nature']
  },
  {
    id: 'u3', username: 'mike_food', email: 'mike@example.com',
    displayName: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Food Blogger & Recipe Creator', followers: 5600, following: 180,
    isVerified: false, role: 'user', createdAt: '2024-03-10', interests: ['food', 'photography']
  },
  {
    id: 'u4', username: 'luna_art', email: 'luna@example.com',
    displayName: 'Luna Park', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital Artist & Illustrator', followers: 15200, following: 420,
    isVerified: true, role: 'user', createdAt: '2024-01-05', interests: ['art', 'design', 'illustration']
  },
  {
    id: 'u5', username: 'james_tech', email: 'james@example.com',
    displayName: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Tech Enthusiast | Gadget Reviews', followers: 7800, following: 290,
    isVerified: false, role: 'user', createdAt: '2024-04-12', interests: ['technology', 'programming']
  },
];

const PIN_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', h: 400 },
  { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600', h: 350 },
  { url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600', h: 450 },
  { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600', h: 400 },
  { url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600', h: 350 },
  { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600', h: 500 },
  { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600', h: 380 },
  { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600', h: 420 },
  { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600', h: 360 },
  { url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600', h: 400 },
  { url: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600', h: 440 },
  { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600', h: 380 },
  { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', h: 350 },
  { url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600', h: 420 },
  { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600', h: 360 },
  { url: 'https://images.unsplash.com/photo-1482784160681-29e41f441bde?w=600', h: 500 },
  { url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600', h: 380 },
  { url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600', h: 400 },
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600', h: 450 },
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600', h: 380 },
  { url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600', h: 350 },
  { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600', h: 420 },
  { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', h: 400 },
  { url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600', h: 360 },
  { url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600', h: 380 },
  { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600', h: 450 },
  { url: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=600', h: 400 },
  { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600', h: 380 },
  { url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600', h: 420 },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600', h: 450 },
];

const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Technology', slug: 'technology', icon: '💻', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop', pinCount: 2450, color: '#3b82f6' },
  { id: 'c2', name: 'AI', slug: 'ai', icon: '🤖', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop', pinCount: 1890, color: '#8b5cf6' },
  { id: 'c3', name: 'Programming', slug: 'programming', icon: '⌨️', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop', pinCount: 3200, color: '#10b981' },
  { id: 'c4', name: 'UI Design', slug: 'ui-design', icon: '🎨', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop', pinCount: 4100, color: '#f59e0b' },
  { id: 'c5', name: 'Fashion', slug: 'fashion', icon: '👗', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=400&fit=crop', pinCount: 5600, color: '#ec4899' },
  { id: 'c6', name: 'Food', slug: 'food', icon: '🍕', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop', pinCount: 6800, color: '#f97316' },
  { id: 'c7', name: 'Travel', slug: 'travel', icon: '✈️', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop', pinCount: 7200, color: '#06b6d4' },
  { id: 'c8', name: 'Nature', slug: 'nature', icon: '🌿', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop', pinCount: 4500, color: '#22c55e' },
  { id: 'c9', name: 'Photography', slug: 'photography', icon: '📸', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=400&fit=crop', pinCount: 3800, color: '#a855f7' },
  { id: 'c10', name: 'Architecture', slug: 'architecture', icon: '🏛️', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=400&fit=crop', pinCount: 2900, color: '#64748b' },
  { id: 'c11', name: 'Gaming', slug: 'gaming', icon: '🎮', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop', pinCount: 2100, color: '#ef4444' },
  { id: 'c12', name: 'Fitness', slug: 'fitness', icon: '💪', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop', pinCount: 3400, color: '#14b8a6' },
  { id: 'c13', name: 'Art', slug: 'art', icon: '🖼️', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=400&fit=crop', pinCount: 5100, color: '#e11d48' },
];

const generatePins = (count: number): Pin[] => {
  const titles = [
    'Minimalist Workspace Setup', 'Mountain Landscape at Sunset', 'Modern UI Dashboard',
    'Healthy Breakfast Ideas', 'Urban Architecture', 'Abstract Digital Art',
    'JavaScript Tips & Tricks', 'Travel Photography Tips', 'Interior Design Trends',
    'Gourmet Coffee Presentation', 'Street Photography Collection', 'Code Editor Setup',
    'Natural Light Portraits', 'Modern Living Room', 'Data Visualization Art',
    'Fitness Motivation', 'Cooking Masterclass', 'Design System Components',
    'Night Sky Photography', 'Sustainable Architecture', 'AI Generated Art',
    'React Performance Tips', 'Fashion Week Highlights', 'Scenic Road Trip',
    'Minimal Home Decor', 'Color Theory in Design', 'Plant-Based Recipes',
    'Geometric Patterns', 'Mobile App Design', 'Waterfall Adventure'
  ];

  const descriptions = [
    'Discover the beauty in simplicity with this curated collection.',
    'Explore new possibilities and find your next creative inspiration.',
    'A stunning visual journey that captures the essence of modern design.',
    'Transform your space with these innovative ideas and concepts.',
    'Push the boundaries of creativity with fresh perspectives.',
    'Elevate your everyday with carefully crafted visual stories.',
  ];

  const allCats = CATEGORIES.map(c => c.slug);
  const pins: Pin[] = [];

  for (let i = 0; i < count; i++) {
    const img = PIN_IMAGES[i % PIN_IMAGES.length];
    const user = DEMO_USERS[i % DEMO_USERS.length];
    const cat = allCats[i % allCats.length];
    const h = img.h + Math.floor(Math.random() * 100 - 50);
    pins.push({
      id: generateId(),
      imageUrl: img.url,
      title: titles[i % titles.length],
      description: descriptions[i % descriptions.length],
      author: user,
      category: cat,
      tags: [cat, 'inspiration', 'creative'],
      likes: Math.floor(Math.random() * 5000),
      saves: Math.floor(Math.random() * 2000),
      comments: [],
      isLiked: Math.random() > 0.7,
      isSaved: Math.random() > 0.8,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      width: 600,
      height: h,
    });
  }
  return pins;
};

const DEMO_BOARDS: Board[] = [
  { id: 'b1', name: 'Design Inspiration', description: 'UI/UX ideas and visual references', coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', pins: [], isPrivate: false, createdAt: '2024-01-20' },
  { id: 'b2', name: 'Travel Bucket List', description: 'Places to visit around the world', coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop', pins: [], isPrivate: false, createdAt: '2024-02-15' },
  { id: 'b3', name: 'Photography Tips', description: 'Techniques and inspiration', coverImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop', pins: [], isPrivate: true, createdAt: '2024-03-01' },
  { id: 'b4', name: 'Home Decor Ideas', description: 'Interior design inspiration', coverImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop', pins: [], isPrivate: false, createdAt: '2024-03-10' },
];

const DEMO_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'like', message: 'liked your pin "Minimalist Workspace Setup"', from: DEMO_USERS[1], read: false, createdAt: new Date().toISOString() },
  { id: 'n2', type: 'follow', message: 'started following you', from: DEMO_USERS[2], read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'n3', type: 'comment', message: 'commented on your pin: "This is amazing!"', from: DEMO_USERS[3], read: true, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: 'n4', type: 'save', message: 'saved your pin to "Design Inspiration"', from: DEMO_USERS[4], read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'n5', type: 'like', message: 'liked your pin "Mountain Landscape at Sunset"', from: DEMO_USERS[0], read: false, createdAt: new Date(Date.now() - 43200000).toISOString() },
];

const DEMO_COMMENTS: Comment[] = [
  { id: 'cm1', text: 'This is absolutely stunning! Love the composition.', author: DEMO_USERS[1], createdAt: new Date().toISOString(), likes: 12 },
  { id: 'cm2', text: 'Great work! Where was this taken?', author: DEMO_USERS[2], createdAt: new Date(Date.now() - 3600000).toISOString(), likes: 5 },
  { id: 'cm3', text: 'The colors are incredible. Save for later reference!', author: DEMO_USERS[3], createdAt: new Date(Date.now() - 7200000).toISOString(), likes: 8 },
  { id: 'cm4', text: 'Inspiring! I need to try something similar.', author: DEMO_USERS[4], createdAt: new Date(Date.now() - 14400000).toISOString(), likes: 3 },
];

export const api = {
  getFeedPins: async (page: number = 1, limit: number = 20): Promise<Pin[]> => {
    await new Promise(r => setTimeout(r, 500));
    return generatePins(limit).map(pin => ({
      ...pin,
      comments: DEMO_COMMENTS.slice(0, Math.floor(Math.random() * 4)),
    }));
  },

  getCategories: async (): Promise<Category[]> => {
    await new Promise(r => setTimeout(r, 300));
    return CATEGORIES;
  },

  searchPins: async (query: string): Promise<Pin[]> => {
    await new Promise(r => setTimeout(r, 400));
    return generatePins(12).map(p => ({ ...p, title: `${query} - ${p.title}` }));
  },

  getPinDetail: async (id: string): Promise<Pin | null> => {
    await new Promise(r => setTimeout(r, 300));
    const pins = generatePins(1);
    if (pins[0]) {
      pins[0].id = id;
      pins[0].comments = DEMO_COMMENTS;
      return pins[0];
    }
    return null;
  },

  getUserProfile: async (username: string): Promise<User> => {
    await new Promise(r => setTimeout(r, 300));
    return { ...DEMO_USERS[0], username, displayName: username };
  },

  getUserBoards: async (): Promise<Board[]> => {
    await new Promise(r => setTimeout(r, 300));
    return DEMO_BOARDS;
  },

  getNotifications: async (): Promise<Notification[]> => {
    await new Promise(r => setTimeout(r, 300));
    return DEMO_NOTIFICATIONS;
  },

  getSimilarPins: async (pinId: string): Promise<Pin[]> => {
    await new Promise(r => setTimeout(r, 400));
    return generatePins(8).map(p => ({ ...p, comments: [] }));
  },

  getTrendingPins: async (): Promise<Pin[]> => {
    await new Promise(r => setTimeout(r, 400));
    return generatePins(16).map(p => ({ ...p, comments: [] }));
  },

  getAdminStats: async (): Promise<AdminStats> => {
    await new Promise(r => setTimeout(r, 300));
    return { totalUsers: 15420, totalPins: 234500, totalComments: 89200, activeUsers: 8340, reportedContent: 42 };
  },
};
