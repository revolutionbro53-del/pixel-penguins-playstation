import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  username: string;
  psnId: string;
  level: number;
  xpCurrent: number;
  xpNext: number;
  avatarSeed: string;
  bio: string;
  favoriteGenre: string;
  totalTrophies: number;
  gamesPlayed: number;
  hoursPlayed: number;
  friends: number;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface Friend {
  id: number;
  name: string;
  seed: string;
  status: 'online' | 'ingame' | 'away' | 'offline';
  currentGame?: string;
}

interface AppContextType {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  friends: Friend[];
}

const defaultUser: UserProfile = {
  username: 'GhostBlade42',
  psnId: 'ghostblade_42',
  level: 42,
  xpCurrent: 7340,
  xpNext: 10000,
  avatarSeed: 'ghostblade',
  bio: 'Platinum hunter. Story mode enjoyer. PSN since 2013.',
  favoriteGenre: 'Action RPG',
  totalTrophies: 847,
  gamesPlayed: 124,
  hoursPlayed: 2840,
  friends: 63,
};

const defaultFriends: Friend[] = [
  { id: 1, name: 'NightOwl_PS', seed: 'nightowl', status: 'ingame', currentGame: 'God of War Ragnarök' },
  { id: 2, name: 'VelvetStrike', seed: 'velvet', status: 'online' },
  { id: 3, name: 'ArcticFox99', seed: 'arctic', status: 'ingame', currentGame: 'Spider-Man 2' },
  { id: 4, name: 'CrimsonBlade', seed: 'crimson', status: 'away' },
  { id: 5, name: 'ShadowRunner', seed: 'shadow', status: 'ingame', currentGame: 'Gran Turismo 7' },
  { id: 6, name: 'PixelProwler', seed: 'pixel', status: 'online' },
  { id: 7, name: 'NeonViiper', seed: 'neon', status: 'offline' },
  { id: 8, name: 'CosmicDrift', seed: 'cosmic', status: 'ingame', currentGame: 'Horizon FW' },
];

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item]);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  return (
    <AppContext.Provider value={{ user, setUser, cart, addToCart, removeFromCart, cartOpen, setCartOpen, friends: defaultFriends }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
