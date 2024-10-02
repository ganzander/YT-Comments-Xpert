"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { IconArrowLeft, IconBrandTabler, IconSun } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import jwt from "jsonwebtoken";
import { usePathname } from "next/navigation";

export default function NavbarDemo({ changeTheme }) {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-0" changeTheme={changeTheme} />
    </div>
  );
}

function Navbar({ className, changeTheme }) {
  const [active, setActive] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    if (token) {
      try {
        const decodedToken = jwt.decode(JSON.parse(token));
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem("AuthToken");
    location.reload();
  }

  return (
    <div
      className={cn("fixed top-10 inset-x-0 w-screen mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <div className="w-[50%] flex justify-evenly items-center">
          <Link href="/">
            <MenuItem
              setActive={setActive}
              active={active}
              item="YT COMMENTS XPERT"
            />
          </Link>
        </div>

        {decoded ? (
          <div className="w-[50%] flex justify-center space-x-10 items-center">
            <MenuItem
              setActive={setActive}
              active={active}
              item={`Hi, ${decoded.fname}`}
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/profile">
                  <MenuItemContent label="Profile" Icon={IconBrandTabler} />
                </HoveredLink>
                <HoveredLink href="#">
                  <MenuItemContent
                    label="Logout"
                    Icon={IconArrowLeft}
                    onClick={handleLogout}
                  />
                </HoveredLink>
              </div>
            </MenuItem>
            <div onClick={changeTheme} className="relative">
              <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-white text-xs sm:text-sm md:text-xl font-normal hover:opacity-[0.9] dark:text-white"
              >
                <IconSun stroke={1.25} />
              </motion.p>
            </div>
          </div>
        ) : (
          <div className="w-[50%] flex justify-center space-x-10 items-center">
            <Link href="/login">
              <MenuItem setActive={setActive} active={active} item="Login" />
            </Link>
            <div onClick={changeTheme} className="relative">
              <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-white text-xs sm:text-sm md:text-xl font-normal hover:opacity-[0.9] dark:text-white"
              >
                <IconSun stroke={1.25} />
              </motion.p>
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
}

function MenuItemContent({ label, Icon, onClick }) {
  return (
    <div
      className="flex justify-between font-semibold items-center text-neutral-700 hover:text-black dark:text-neutral-200"
      onClick={onClick}
    >
      {label}
      <Icon className="h-5 w-5 flex-shrink-0" />
    </div>
  );
}
