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
      <Navbar className="top-2" />
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
      className={cn(
        "fixed top-10 inset-x-0 w-screen md:max-w-[80%] mx-auto z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <div className="w-[45%] sm:w-[50%] flex items-center justify-center">
          <Link href="/">
            <MenuItem
              setActive={setActive}
              active={active}
              item="Shree Balaji Opticals"
            />
          </Link>
        </div>
        <div className="w-[55%] sm:w-[50%] flex justify-around items-center">
          <Link href="/lens">
            <MenuItem setActive={setActive} active={active} item="Lens" />
          </Link>
          <Link href="/frames">
            <MenuItem setActive={setActive} active={active} item="Frames" />
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
                <HoveredLink href="/cart">
                  <MenuItemContent label="Cart" Icon={IconGardenCart} />
                </HoveredLink>
                <HoveredLink href="/orders">
                  <MenuItemContent label="Order" Icon={IconTruckDelivery} />
                </HoveredLink>
                <HoveredLink href="/settings">
                  <MenuItemContent label="Settings" Icon={IconSettings} />
                </HoveredLink>
                {decoded.isAdmin && (
                  <HoveredLink href="/admin">
                    <MenuItemContent label="Update" Icon={IconEditCircle} />
                  </HoveredLink>
                )}
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
        </div>
      </Menu>
    </div>
  );
}

function MenuItemContent({ label, Icon, onClick }) {
  return (
    <div className="flex justify-between items-center" onClick={onClick}>
      {label}
      <Icon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    </div>
  );
}
