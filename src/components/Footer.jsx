import Link from "next/link";

export default function Footer() {
  return (
    <footer className="dark:bg-gray-900 bg-black dark:text-white text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <div className="text-center md:text-center">
            <h4 className="text-lg md:text-xl font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="dark:text-gray-400 text-sm md:text-lg hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/lens"
                  className="dark:text-gray-400 text-sm md:text-lg hover:text-white transition-colors"
                >
                  Lens
                </Link>
              </li>
              <li>
                <Link
                  href="/frames"
                  className="dark:text-gray-400 text-sm md:text-lg hover:text-white transition-colors"
                >
                  Frames
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  className="dark:text-gray-400 text-sm md:text-lg hover:text-white transition-colors"
                >
                  Store
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="dark:text-gray-400 text-sm md:text-lg hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="dark:text-gray-400 text-sm md:text-lg hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-center">
            <h4 className="text-lg md:text-xl font-semibold mb-4">
              Contact Us
            </h4>
            <p className="dark:text-gray-400 text-sm md:text-lg mb-2">
              Address: Shree Balaji Opticals, Delhi Gate, Main Market -
              Najafgarh, Delhi, 110043
            </p>
            <p className="dark:text-gray-400 text-sm md:text-lg mb-2">
              Phone: 7042592797
            </p>
            <p className="dark:text-gray-400 text-sm md:text-lg mb-4 overflow-hidden">
              Email: shreebalajiopticals2023@gmail.com
            </p>
          </div>
        </div>
        <div className="text-center content-center">
          <h3 className="text-3xl md:text-7xl font-semibold mb-0 mt-4 ">
            Shree Balaji Opticals
          </h3>
        </div>
        <div className="mt-3 pt-8 border-t font-semibold text-sm md:text-xl border-gray-800 text-center dark:text-white">
          <p>&copy; 2023 Shree Balaji Opticals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
