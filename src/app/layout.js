import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavbarDemo from "@/components/Navbar";

export const metadata = {
  title: "YT Comment Xpert",
  description: "Developed by Ganesh Mangla",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden dark">
      <body className="antialiased">
        <NavbarDemo />
        {children}
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
