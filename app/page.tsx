import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FieldsMapWrapper from './components/FieldsMapWrapper';

export default async function Home() {
  const supabase = await createClient();

  const { data: fields, error: fieldsError } = await supabase.from('fields').select('*');
  const { data: { user } } = await supabase.auth.getUser();

  const { data: games, error: gamesError } = await supabase
    .from('games')
    .select('id, format, max_players, start_time, fields(name, address)')
    .order('start_time', { ascending: true });

  return (
    <main className="flex min-h-screen flex-col items-stretch bg-[var(--chalk)]">
      <Navbar user={user} />
      <Hero />

      <div id="games" className="flex flex-col items-center gap-6 py-16 w-full">
        <div className="w-full max-w-md">
          <h2 className="font-display uppercase tracking-wide text-2xl text-[var(--ink)] mb-3">
            Upcoming Games
          </h2>
          {gamesError && <p className="text-red-500">Error: {gamesError.message}</p>}
          <ul className="space-y-3">
            {games?.map((game: any) => (
              <li
                key={game.id}
                className="border border-black/10 bg-white rounded-sm p-4 shadow-sm"
              >
                <p className="font-medium text-[var(--ink)]">{game.fields?.name}</p>
                <p className="text-sm text-[var(--ink)]/60">{game.fields?.address}</p>
                <p className="text-sm text-[var(--ink)]/80 mt-1">
                  {game.format} · max {game.max_players} players
                </p>
                <p className="text-sm text-[var(--ink)]/50">
                  {new Date(game.start_time).toLocaleString()}
                </p>
                <Link
                  href={`/games/${game.id}`}
                  className="inline-block mt-2 text-sm font-medium text-[var(--pitch)] hover:underline"
                >
                  View / Join
                </Link>
              </li>
            ))}
            {games?.length === 0 && (
              <p className="text-[var(--ink)]/50 text-sm">
                No games yet — be the first to create one.
              </p>
            )}
          </ul>
        </div>

        <div className="w-full max-w-2xl">
          <h2 className="font-display uppercase tracking-wide text-2xl text-[var(--ink)] mb-3">
            Field Map
          </h2>
          <FieldsMapWrapper fields={fields ?? []} />
        </div>

        <div className="w-full max-w-md">
          <h2 className="font-display uppercase tracking-wide text-2xl text-[var(--ink)] mb-3">
            Fields
          </h2>
          {fieldsError && <p className="text-red-500">Error: {fieldsError.message}</p>}
          <ul className="space-y-3">
            {fields?.map((field) => (
              <li
                key={field.id}
                className="border border-black/10 bg-white rounded-sm p-4 shadow-sm"
              >
                <p className="font-medium text-[var(--ink)]">{field.name}</p>
                <p className="text-sm text-[var(--ink)]/60">{field.address}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}