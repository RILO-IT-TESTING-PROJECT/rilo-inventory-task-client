import Link from 'next/link';

interface NavbarProps {
  page: 'home' | 'login' | 'register';
}

export default function Navbar({ page }: NavbarProps) {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">NextJS</h1>
      <div>
        {page !== 'login' && (
          <Link href="/login">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">
              Login
            </button>
          </Link>
        )}
        {page !== 'register' && (
          <Link href="/register">
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md ml-2">
              Signup
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
