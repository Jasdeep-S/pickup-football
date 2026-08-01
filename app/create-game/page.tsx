'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Field = {
  id: number;
  name: string;
  address: string;
};

export default function CreateGame() {
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldId, setFieldId] = useState('');
  const [format, setFormat] = useState('5-a-side');
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [startTime, setStartTime] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadFields() {
      const { data } = await supabase.from('fields').select('id, name, address');
      if (data) setFields(data);
    }
    loadFields();
  }, []);

  const handleCreateGame = async () => {
    setError('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('You must be logged in to create a game.');
      return;
    }

    if (!fieldId || !startTime) {
      setError('Please select a field and start time.');
      return;
    }

    const { error } = await supabase.from('games').insert({
      field_id: Number(fieldId),
      host_id: user.id,
      format,
      max_players: maxPlayers,
      start_time: startTime,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <h1 className="text-2xl font-bold">Create a Game</h1>

      <select
        value={fieldId}
        onChange={(e) => setFieldId(e.target.value)}
        className="border rounded p-2 w-64"
      >
        <option value="">Select a field</option>
        {fields.map((field) => (
          <option key={field.id} value={field.id}>
            {field.name}
          </option>
        ))}
      </select>

      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className="border rounded p-2 w-64"
      >
        <option value="5-a-side">5-a-side</option>
        <option value="6-a-side">6-a-side</option>
        <option value="7-a-side">7-a-side</option>
        <option value="11-a-side">11-a-side</option>
      </select>

      <input
        type="number"
        placeholder="Max players"
        value={maxPlayers}
        onChange={(e) => setMaxPlayers(Number(e.target.value))}
        className="border rounded p-2 w-64"
      />

      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="border rounded p-2 w-64"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleCreateGame}
        className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
      >
        Create Game
      </button>
    </main>
  );
}