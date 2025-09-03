'use client';

import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

interface NotePreviewProps {
  id: string;
}

const NotePreview = ({ id }: NotePreviewProps) => {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const date = new Date(note.createdAt);

  return (
    <Modal closeModal={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2> {note.title}</h2>
          </div>

          <p className={css.content}>{note.content}</p>

          <div className={css.wrapper}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.backBtn} onClick={handleClose}>
              Back
            </button>
            <p className={css.date}>{date.toLocaleString().replace(',', '')}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
