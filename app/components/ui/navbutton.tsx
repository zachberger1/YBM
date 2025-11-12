'use client';

import Link from 'next/link';

interface NavButtonProps {
    href: string;
    children: React.ReactNode;
}

export default function NavButton({ href, children }: NavButtonProps) {
    return (
        <Link
            href={href}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
            {children}
        </Link>
    );
}