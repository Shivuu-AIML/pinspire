import { create } from 'zustand';
import type { User, Pin, Board, Notification } from '../types';
import { api } from '../api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  loginWithGoogle: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 800));
    const user: User = {
      id: 'u1', username: email.split('@')[0], email,
      displayName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Creative soul & visual explorer', followers: 1240, following: 342,
      isVerified: false, role: 'user', createdAt: new Date().toISOString(), interests: [],
    };
    set({ user, isAuthenticated: true, isLoading: false });
  },
  signup: async (email: string, _password: string, username: string) => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 800));
    const user: User = {
      id: 'u1', username, email,
      displayName: username.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: '', followers: 0, following: 0,
      isVerified: false, role: 'user', createdAt: new Date().toISOString(), interests: [],
    };
    set({ user, isAuthenticated: true, isLoading: false });
  },
  loginWithGoogle: async () => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 1000));
    const user: User = {
      id: 'u1', username: 'demo_user', email: 'demo@gmail.com',
      displayName: 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Exploring the visual world', followers: 520, following: 180,
      isVerified: false, role: 'user', createdAt: new Date().toISOString(), interests: [],
    };
    set({ user, isAuthenticated: true, isLoading: false });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  updateProfile: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null,
  })),
}));

interface PinState {
  pins: Pin[];
  isLoading: boolean;
  page: number;
  hasMore: boolean;
  loadPins: (reset?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  toggleLike: (pinId: string) => void;
  toggleSave: (pinId: string) => void;
  addComment: (pinId: string, text: string) => void;
}

export const usePinStore = create<PinState>((set, get) => ({
  pins: [],
  isLoading: false,
  page: 1,
  hasMore: true,
  loadPins: async (reset = false) => {
    set({ isLoading: true });
    const page = reset ? 1 : get().page;
    const pins = await api.getFeedPins(page);
    set((state) => ({
      pins: reset ? pins : [...state.pins, ...pins],
      page: page + 1,
      hasMore: pins.length > 0,
      isLoading: false,
    }));
  },
  loadMore: async () => {
    if (get().isLoading || !get().hasMore) return;
    await get().loadPins();
  },
  toggleLike: (pinId) => set((state) => ({
    pins: state.pins.map(p => p.id === pinId ? {
      ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1,
    } : p),
  })),
  toggleSave: (pinId) => set((state) => ({
    pins: state.pins.map(p => p.id === pinId ? {
      ...p, isSaved: !p.isSaved, saves: p.isSaved ? p.saves - 1 : p.saves + 1,
    } : p),
  })),
  addComment: (pinId, text) => set((state) => ({
    pins: state.pins.map(p => p.id === pinId ? {
      ...p,
      comments: [...p.comments, {
        id: Math.random().toString(36).substr(2, 9),
        text, author: { ...p.author, displayName: 'You', username: 'you' },
        createdAt: new Date().toISOString(), likes: 0,
      }],
    } : p),
  })),
}));

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  searchOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  toggleSearch: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  sidebarOpen: false,
  searchOpen: false,
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
}));

interface BoardState {
  boards: Board[];
  loadBoards: () => Promise<void>;
  createBoard: (name: string, description?: string) => void;
  deleteBoard: (id: string) => void;
  renameBoard: (id: string, name: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  boards: [],
  loadBoards: async () => {
    const boards = await api.getUserBoards();
    set({ boards });
  },
  createBoard: (name, description) => set((state) => ({
    boards: [...state.boards, {
      id: Math.random().toString(36).substr(2, 9),
      name, description, pins: [], isPrivate: false,
      createdAt: new Date().toISOString(),
    }],
  })),
  deleteBoard: (id) => set((state) => ({
    boards: state.boards.filter(b => b.id !== id),
  })),
  renameBoard: (id, name) => set((state) => ({
    boards: state.boards.map(b => b.id === id ? { ...b, name } : b),
  })),
}));

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loadNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  loadNotifications: async () => {
    const notifications = await api.getNotifications();
    set({ notifications, unreadCount: notifications.filter(n => !n.read).length });
  },
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    unreadCount: Math.max(0, state.unreadCount - 1),
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0,
  })),
}));
