"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconGardenCart,
  IconTruckDelivery,
  IconEditCircle,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import jwt from "jsonwebtoken";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-0" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    if (token) {
      const decodedToken = jwt.decode(JSON.parse(token));
      setDecoded(decodedToken);
      setAuthToken(token);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("AuthToken");
    location.reload();
  }

  return (
    <div
      className={cn("fixed top-10 inset-x-0 w-screen mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/">
          <MenuItem
            setActive={setActive}
            active={active}
            item="YT COMMENTS XPERT"
          />
        </Link>

        {decoded ? (
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
        ) : (
          <Link href="/login">
            <MenuItem setActive={setActive} active={active} item="Login" />
          </Link>
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
