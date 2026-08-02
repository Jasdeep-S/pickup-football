import { createClient } from '@/lib/supabase/server';
import JoinButton from './JoinButton';

export default async function GameDetail({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id: gameId } = await params;

  const { data: game, error } = await supabase
    .from('games')
    .select('id, format, max_players, start_time, fields(name, address)')
    .eq('id', gameId)
    .single();

  const { data: players } = await supabase
    .from('game_players')
    .select('user_id')
    .eq('game_id', gameId);

  const { data: { user } } = await supabase.auth.getUser();

  if (error || !game) {
    return <main className="p-24">Game not found.</main>;
  }

  const alreadyJoined = players?.some((p) => p.user_id === user?.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <h1 className="text-2xl font-bold">{(game as any).fields?.name}</h1>
      <p className="text-gray-500">{(game as any).fields?.address}</p>
      <p>{game.format} · {new Date(game.start_time).toLocaleString()}</p>

      <JoinButton
        gameId={game.id}
        maxPlayers={game.max_players}
        initialPlayerCount={players?.length ?? 0}
        alreadyJoined={!!alreadyJoined}
        isLoggedIn={!!user}
      />
    </main>
  );
}