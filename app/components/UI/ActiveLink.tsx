"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: ReactNode;
};

export default function ActiveLink({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      className={`${isActive ? "bg-gray-100" : ""} flex items-center gap-2 rounded-md p-4 sm:rounded-none`}
      href={href}
    >
      {children}
    </Link>
  );
}
