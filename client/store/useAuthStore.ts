import { create } from 'zustand';

interface AuthState {
    token: string | null;
    role: 'admin' | 'viewer' | null;
    login: (data: any) => void;
    logout: () => void;
    isAdmin: () => boolean;
    }

export const useAuthStore = create<AuthState>((set, get) => ({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role') as any,
    login: (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    set({ token: data.token, role: data.role });
    },
    logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    set({ token: null, role: null }); // Esto gatilla el re-render en App.tsx
},
    isAdmin: () => get().role === 'admin'
}));