"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="sidebar hidden md:visible">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>
        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group ${
                      isActive
                        ? "bg-purple-gradient text-white"
                        : "text-grey-700"
                    }`}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              <ul className="sidebar-nav_elements">
                
                <li className="flex-center cursor-pointer gap-2 p-4">
                  <UserButton showName />
                </li>
              </ul>
            </ul>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/sign-in" />
          </SignedOut>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
