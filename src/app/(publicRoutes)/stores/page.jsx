import Footer from "@/components/Footer";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Page() {
  return (
    <>
      <div className="min-h-screen pt-24 w-full flex items-center justify-center bg-[#F6F5F2] dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="flex flex-col items-center">
          <h2 className="w-full text-center pb-5 text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            Stores
          </h2>
          <h2 className="text-center w-[50%] pb-5 text-xs sm:text-sm md:text-xl font-semibold text-neutral-800 dark:text-neutral-200 font-sans">
            Shree Balaji Opticals, Delhi Gate, Main Market - Najafgarh, Jatav
            Mohalla, Najafgarh, Delhi, 110043, India
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14010.329755606117!2d76.98548!3d28.612301!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d11c61ee4cf73%3A0x21df224bbaaddadd!2sSHREE%20BALAJI%20OPTICALS!5e0!3m2!1sen!2sus!4v1726602541507!5m2!1sen!2sus"
            width="600vw"
            height="450vh"
            allowFullScreen="on"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pb-10"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
