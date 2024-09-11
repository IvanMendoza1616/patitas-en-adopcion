"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="flex items-center justify-end md:hidden"
      >
        <Bars3Icon className="aspect-square w-8" />
      </button>
      <div
        className={`${isOpen ? "fixed" : "hidden"} left-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-8 bg-gray-100 md:hidden`}
      >
        <button
          className="bg-gray-200 p-1"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <XMarkIcon className="aspect-square w-8" />
        </button>
        <Link
          href="/"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Logo
        </Link>
        <ul className="flex flex-col gap-8">
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </div>
    </>
  );
}
