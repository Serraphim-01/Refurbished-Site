import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  callUpNumber: string;
  stateCode: string;
  batch: string;
  gender: string;
  course: string;
  qualification: string;
  ppaDetails?: {
    organization: string;
    address: string;
    startDate: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Validate password: at least 1 letter, 2 numbers, 6+ characters
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumbers = (password.match(/\d/g) || []).length >= 2;
        const isLongEnough = password.length >= 6;
        
        if (!hasLetter || !hasNumbers || !isLongEnough) {
          return false;
        }

        // Mock user data - in real app this would come from API
        const mockUser: User = {
          id: '1',
          email,
          name: 'ADEBAYO JOSEPH OLUMIDE',
          callUpNumber: 'NYS/2025/1234567',
          stateCode: 'LA/25A/1234',
          batch: '2025 Batch A Stream II',
          gender: 'Male',
          course: 'Computer Science',
          qualification: 'B.Sc',
          ppaDetails: {
            organization: 'Lagos State Ministry of Education',
            address: 'Alausa, Ikeja, Lagos State',
            startDate: '2025-03-15'
          }
        };

        set({ user: mockUser, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      }
    }),
    {
      name: 'nysc-auth',
    }
  )
);