import { CreatedNote } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NoteDraftStore = {
  draft: CreatedNote;
  setDraft: (note: CreatedNote) => void;
  clearDraft: () => void;
};

const initialDraft: CreatedNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
