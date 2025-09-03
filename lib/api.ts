import axios from 'axios';
import type { CreatedNote, Note } from "../types/note"

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  query?: string,
  tag?: string
): Promise<NoteResponse> => {
  const response = await axios.get<NoteResponse>('https://notehub-public.goit.study/api/notes', {
    params: {
      search: query,
      page: page,
      perPage: 12,
      tag: tag,
    },
  });
  return response.data;
};


export const createNote = async (post: CreatedNote): Promise<Note> => {
  const response = await axios.post<Note>('https://notehub-public.goit.study/api/notes', post);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`);
  return response.data;
};
