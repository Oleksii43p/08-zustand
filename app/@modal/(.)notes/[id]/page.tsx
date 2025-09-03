import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import NotePreview from './NotePreview.client';

interface notePreviewProps {
  params: Promise<{ id: string }>;
}

const notePreview = async ({ params }: notePreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ['note', id], queryFn: () => fetchNoteById(id) });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
};

export default notePreview;