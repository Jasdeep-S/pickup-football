import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();

  const { data: fields, error } = await supabase.from('fields').select('*');
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24">
      <h1 className="text-4xl font-bold">Pickup Soccer</h1>
      <p className="text-gray-500">Find or start a game near you</p>

      <div className="flex gap-4 items-center">
        {user ? (
          <p className="text-sm text-gray-600">Logged in as {user.email}</p>
        ) : (
          <>
            <Link href="/login" className="text-green-600 underline">Log In</Link>
            <Link href="/signup" className="text-green-600 underline">Sign Up</Link>
          </>
        )}
      </div>

      <div className="flex gap-4">
        <Link href="/create-game">
          <button className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700">
            Create a Game
          </button>
        </Link>
        <button className="rounded-lg bg-gray-200 px-6 py-3 text-gray-800 hover:bg-gray-300">
          Join a Game
        </button>
      </div>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Fields</h2>
        {error && <p className="text-red-500">Error: {error.message}</p>}
        <ul className="space-y-2">
          {fields?.map((field) => (
            <li key={field.id} className="border rounded p-3">
              <p className="font-medium">{field.name}</p>
              <p className="text-sm text-gray-500">{field.address}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}