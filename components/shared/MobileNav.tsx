"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton ,SignedOut ,SignInButton} from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
const MobileNav = () => {
    const pathname = usePathname();
  return (
    <header className="header bg-slate-500 ">
      <Link href="/" className="flex item-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          height={180}
          width={180}
        />
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton />
          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="settings"
                width={24}
                height={24}
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={153}
                    height={23}
                    className="mb-4 "
                  />
                </SheetTitle>
                <SheetDescription>
                {navLinks.map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group ${
                      isActive && 'gradient-text'
                    } p-18 flex whitespace-nowrap text-dark-700`}
                  >
                    <Link className="sidebar-link cursor-pointer" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut >
           <Button asChild className="button bg-bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
           </Button>
           <SignedOut>
            <SignInButton forceRedirectUrl="/sign-in" />
          </SignedOut>
        </SignedOut>

      </nav>
    </header>
  );
};

export default MobileNav;
