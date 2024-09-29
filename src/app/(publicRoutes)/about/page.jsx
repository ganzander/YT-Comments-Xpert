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
            About
          </h2>
          <h2 className="w-full text-justify pl-2 pr-2 md:pl-10 md:pr-10 pb-5 text-sm sm:text-lg md:text-xl font-normal text-neutral-800 dark:text-neutral-200 font-sans">
            Welcome to Shree Balaji Opticals, your trusted destination for
            high-quality eyewear and exceptional vision care. Established with a
            passion for eye health, we pride ourselves on offering a wide range
            of optical products, from stylish frames to cutting-edge lenses, all
            designed to enhance your vision and style. At Shree Balaji Opticals,
            we believe that clear vision is essential for living a fulfilling
            life. Our expert team of optometrists and staff are committed to
            providing personalized eye care services, ensuring that each
            customer receives the attention and care they deserve. Whether you
            need prescription glasses, contact lenses, or routine eye check-ups,
            we are here to serve you with the highest level of professionalism
            and care. With years of experience in the optical industry, we have
            curated a collection of eyewear that combines comfort, durability,
            and fashion. Our goal is to help you find the perfect eyewear that
            suits your lifestyle, face shape, and personality. We work with top
            brands to bring you the latest trends in eyewear, ensuring you not
            only see better but also look your best. At Shree Balaji Opticals,
            customer satisfaction is our top priority. We are committed to
            providing exceptional after-sales service, including free
            adjustments, repairs, and expert advice on maintaining your eyewear.
            We aim to build lasting relationships with our customers, offering
            trust and reliability that you can depend on. Thank you for choosing
            Shree Balaji Opticals, where your vision and style matter most.
          </h2>

          {/* Vision Statement */}
          <h2 className="w-full text-justify pl-2 pb-5 pr-2 md:pl-10 md:pr-10 text-sm sm:text-lg md:text-xl font-normal text-neutral-800 dark:text-neutral-200 font-sans">
            <span className="w-full text-center text-lg tracking-tight sm:text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Vision Statement :{" "}
            </span>
            To be the leading provider of quality eyewear and eye care services,
            delivering clarity and comfort to every individual.
          </h2>

          {/* Mission Statement */}
          <h2 className="w-full text-justify pl-2 pr-2 pb-5 md:pl-10 md:pr-10 text-sm sm:text-lg md:text-xl font-normal text-neutral-800 dark:text-neutral-200 font-sans">
            <span className="w-full text-center text-lg tracking-tight sm:text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Mission Statement :{" "}
            </span>
            To offer comprehensive eye care solutions that prioritize customer
            satisfaction, combining expertise, technology, and a personalized
            approach.
          </h2>
        </div>
      </div>
      <Footer />
    </>
  );
}
