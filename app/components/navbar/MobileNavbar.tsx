"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "../UI/Button";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

type Props = {
  session: Session | null;
};

export default function MobileNavbar({ session }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
        className="flex items-center justify-end md:hidden"
      >
        <Bars3Icon className="aspect-square w-8" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <div
            className={`fixed left-0 top-0 z-10 h-screen w-screen md:hidden`}
          >
            <motion.div
              key="navbarBackground"
              className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <motion.div
              key="navbar"
              className="absolute right-0 top-0 flex h-full w-full max-w-[320px] flex-col gap-4 border-l bg-white px-8 py-10 shadow-md"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ ease: easeInOut }}
            >
              <button
                type="button"
                className="self-end p-1"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <XMarkIcon className="aspect-square w-7" />
              </button>
              <div className="flex flex-col gap-8 font-semibold">
                {session ? (
                  <>
                    <div className="mb-8 flex items-center gap-2">
                      <Image
                        className="rounded-full"
                        src={session.user.image}
                        alt="User profile picture"
                        width={40}
                        height={40}
                      />
                      <div>
                        <p>{session.user.name}</p>
                        <p className="text-sm font-normal">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/account"
                      className="flex items-center gap-2"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      <UserCircleIcon className="w-5" />
                      My Account
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/sign-in"
                    className="mb-4 self-start"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <Button type="button">
                      <ArrowRightEndOnRectangleIcon className="w-5" />
                      Sign In
                    </Button>
                  </Link>
                )}
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <HomeIcon className="w-5" />
                  Home
                </Link>
                <Link
                  href="/pet-search"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <MagnifyingGlassIcon className="w-5" />
                  Search Pets
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
