import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--pitch)] text-[var(--chalk)] px-8 py-24 flex flex-col items-center text-center">
      {/* signature: faint center-circle + halfway line, like a tactics board */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <line x1="400" y1="0" x2="400" y2="400" stroke="var(--line)" strokeWidth="2" />
        <circle cx="400" cy="200" r="90" fill="none" stroke="var(--line)" strokeWidth="2" />
        <circle cx="400" cy="200" r="3" fill="var(--line)" />
      </svg>

      <div className="relative z-10 max-w-2xl">
        <h1 className="font-display uppercase tracking-wide text-5xl md:text-6xl leading-[1.05]">
          Find your next<br />pickup game
        </h1>
        <p className="mt-5 text-[var(--chalk)]/80 text-lg">
          Create a match, fill the pitch, kick off!
        </p>

        <div className="mt-9 flex gap-4 justify-center">
          <Link
            href="/create-game"
            className="bg-[var(--amber)] text-[var(--ink)] font-medium px-6 py-3 rounded-sm hover:brightness-110 transition"
          >
            Create a Game
          </Link>
          
            <a href="#games" 
            className="border border-[var(--chalk)]/40 px-6 py-3 rounded-sm hover:bg-white/10 transition">
          
            Browse Games
          </a>
        </div>
      </div>
    </section>
  );
}