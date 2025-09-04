import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NotesClient } from './Notes.client';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string[] }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug[0]} notes`,
    description: `${slug[0]} notes page`,
    openGraph: {
      title: `${slug[0]} notes`,
      description: `${slug[0]} notes page`,
      url: `https://08-zustand-iota-sooty.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Notes application',
        },
      ],
    },
  };
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
