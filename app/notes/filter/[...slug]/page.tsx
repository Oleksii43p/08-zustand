import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NotesClient } from './Notes.client';

interface PageProps {
  params: Promise<{ slug: string[] }>;
  children: React.ReactNode;
}

export default async function Notes({ params, children }: PageProps) {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {children}

      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    </div>
  );
}