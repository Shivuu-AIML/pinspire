export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  banner?: string;
  bio?: string;
  followers: number;
  following: number;
  website?: string;
  isVerified: boolean;
  role: 'user' | 'admin';
  createdAt: string;
  interests: string[];
}

export interface Pin {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  author: User;
  category: string;
  tags: string[];
  likes: number;
  saves: number;
  comments: Comment[];
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
  link?: string;
  width?: number;
  height?: number;
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  createdAt: string;
  likes: number;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  pins: Pin[];
  isPrivate: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'save' | 'mention';
  message: string;
  from: User;
  read: boolean;
  createdAt: string;
  pin?: Pin;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  pinCount: number;
  color: string;
}

export interface SearchResult {
  pins: Pin[];
  users: User[];
  boards: Board[];
  categories: Category[];
}

export interface AdminStats {
  totalUsers: number;
  totalPins: number;
  totalComments: number;
  activeUsers: number;
  reportedContent: number;
}
