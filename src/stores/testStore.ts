import { create } from 'zustand';

type State = {
  bears: number;
};

type Actions = {
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
};

export const useStore = create<State & Actions>((set) => ({
  bears: 0,
  increasePopulation: () => set((state: { bears: number }) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: number) => set({ bears: newBears }),
}));
