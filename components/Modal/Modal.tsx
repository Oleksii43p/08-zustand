import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const onEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', onEscPress);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onEscPress);
      document.body.style.overflow = '';
    };
  }, [closeModal]);

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
