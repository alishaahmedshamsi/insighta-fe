import { IClass } from '@/types/type';
import {create} from 'zustand';

type User = {
    role: string;
    fullname: string;
    class: IClass[];
    section: string;
    school:string
};

type AuthStore = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default useAuthStore;
