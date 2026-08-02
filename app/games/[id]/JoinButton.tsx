'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function JoinButton({
  gameId,
  maxPlayers,
  initialPlayerCount,
  alreadyJoined,
  isLoggedIn,
}: {
  gameId: number;
  maxPlayers: number;
  initialPlayerCount: number;
  alreadyJoined: boolean;
  isLoggedIn: boolean;
}) {
  const [playerCount, setPlayerCount] = useState(initialPlayerCount);
  const [joined, setJoined] = useState(alreadyJoined);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`game-${gameId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'game_players',
          filter: `game_id=eq.${gameId}`,
        },
        () => {
          setPlayerCount((c) => c + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  const handleJoin = async () => {
    setError('');
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError('You must be logged in to join.');
      return;
    }

    const { error } = await supabase.from('game_players').insert({
      game_id: gameId,
      user_id: user.id,
    });

    if (error) {
      setError(error.message);
    } else {
      setJoined(true);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-lg font-medium">
        {playerCount} / {maxPlayers} players joined
      </p>

      {!isLoggedIn && <p className="text-sm text-gray-500">Log in to join this game.</p>}

      {isLoggedIn && joined && (
        <p className="text-green-600 font-medium">You're in! ⚽</p>
      )}

      {isLoggedIn && !joined && playerCount < maxPlayers && (
        <button
          onClick={handleJoin}
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Join Game
        </button>
      )}

      {playerCount >= maxPlayers && !joined && (
        <p className="text-red-500">This game is full.</p>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}