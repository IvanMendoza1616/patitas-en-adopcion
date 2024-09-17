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
      className={`${isActive ? "border-b-2 border-gray-400" : ""} p-1`}
      href={href}
    >
      {children}
    </Link>
  );
}
