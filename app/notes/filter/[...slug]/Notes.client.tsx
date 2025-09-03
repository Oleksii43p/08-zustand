'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { PacmanLoader } from 'react-spinners';
import { Toaster, toast } from 'react-hot-toast';
import { keepPreviousData } from '@tanstack/react-query';

import { fetchNotes, NoteResponse } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';

import css from './NotesClient.module.css';

interface NotesClientProps {
    tag: string | undefined;
}

export const NotesClient = ({ tag }: NotesClientProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 1000);

  const notesQuery = useQuery<NoteResponse>({
    queryKey: ['notes', currentPage, searchTerm, tag],
    queryFn: () => fetchNotes(currentPage, searchTerm, tag),
    placeholderData: keepPreviousData,
  });

  const { data, isLoading, isError, isSuccess } = notesQuery;

  const totalPages = data?.totalPages ?? 0;

  if (isError) {
    toast.error('Something went wrong');
  }

  if (isSuccess && data?.notes.length === 0) {
    toast.error('Notes not found.');
  }

  const showModal = () => setModalOpen(true);
  const hideModal = () => setModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button onClick={showModal} className={css.button}>
          Create note +
        </button>
      </header>

      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
          }}
        >
          <PacmanLoader speedMultiplier={2} color="#c4c700ff" size={30} />
        </div>
      )}

      {modalOpen && (
        <Modal closeModal={hideModal}>
          <NoteForm closeModal={hideModal} />
        </Modal>
      )}

      {data && data.notes.length > 0 && <NoteList data={data.notes} />}

      <Toaster />
    </div>
  );
};
