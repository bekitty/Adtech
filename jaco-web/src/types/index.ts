export interface Stream {
  id: string;
  title: string;
  username: string;
  userAvatar: string;
  thumbnail: string;
  category: string;
  viewers: number;
  tags: string[];
  isLive: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  viewers: number;
  tags: string[];
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  isLive: boolean;
  category?: string;
  viewers?: number;
}

export interface ChatMessage {
  id: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: number;
  badges?: string[];
  color?: string;
}
