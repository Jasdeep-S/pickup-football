import Link from 'next/link';
import Image from 'next/image';

export default function Navbar({ user }: { user: { email?: string } | null }) {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-black/10">
      <Link href="/" className="flex items-center gap-3">
        {/*ADD ACTUAL LOGO HERE WHEN UR DONE */}
        <Image src="/logo.png" alt="Pickup Soccer logo" width={36} height={36} />
        <span className="font-display text-xl tracking-wide uppercase text-[var(--ink)]">
          Pickup Soccer
        </span>
      </Link>

      <div className="flex items-center gap-5 text-sm">
        {user ? (
          <span className="text-[var(--ink)]/70">{user.email}</span>
        ) : (
          <>
            <Link href="/login" className="text-[var(--ink)]/70 hover:text-[var(--ink)]">
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[var(--pitch)] text-white px-4 py-2 rounded-sm hover:bg-[var(--ink)] transition-colors"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}