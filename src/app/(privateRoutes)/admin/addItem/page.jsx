"use client";
import Footer from "@/components/Footer";
import { Spotlight } from "@/components/ui/Spotlight";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import jwt from "jsonwebtoken";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { FileUpload } from "@/components/ui/file-upload";
import { SelectInput } from "@/components/ui/selectInput";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadCred, setUploadCred] = useState({
    category: "",
    price: "",
    size: "",
    name: "",
    brand: "",
  });

  function handleFileUpload(files) {
    setFiles(files);
  }

  function handleChange(event) {
    setUploadCred({
      ...uploadCred,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { category, price, size, name, brand } = uploadCred;
    if (!category || !price || !size || !name || !brand) {
      toast.error("Please fill in the form completely");
    } else {
      axios
        .post("/api/admin/add-item", { category, price, size, name, brand })
        .then((result) => {
          if (result.data.Success === true) {
            toast.success(result.data.msg + " with id: " + result.data.itemId);
          } else {
            toast.error(result.data.msg);
          }
        });

      setUploadCred({
        category: "",
        price: "",
        size: "",
        name: "",
        brand: "",
      });
      setFiles([]);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (typeof window !== "undefined") {
        const storedAuthToken = JSON.parse(localStorage.getItem("AuthToken"));
        if (storedAuthToken) {
          const decodedToken = jwt.decode(storedAuthToken);
          if (decodedToken) {
            setIsAdmin(decodedToken.isAdmin);
            clearInterval(intervalId);
          }
        } else {
          clearInterval(intervalId);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      router.push("/");
    }
  }, [isAdmin]);

  return (
    <>
      <div className="min-h-screen pt-24 w-full flex items-center justify-center bg-[#F6F5F2] dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        {isAdmin === true && (
          <div className="flex flex-col py-5">
            <h2 className="w-full text-center pb-5 text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Add Items
            </h2>
            <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-7 md:p-8 shadow-2xl bg-white dark:bg-black">
              <form className="my-8" onSubmit={handleSubmit}>
                {/* CATEGORY */}
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="category">Category</Label>
                  <SelectInput
                    id="category"
                    name="category"
                    value={uploadCred.category}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="Choose Category"
                    options={[
                      { value: "sunglasses", label: "Sunglasses" },
                      { value: "powerglass", label: "Power Glass" },
                      { value: "contactlens", label: "Contact Lens" },
                      { value: "accessories", label: "Accessories" },
                    ]}
                  />
                </LabelInputContainer>

                {/* BRAND */}
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={uploadCred.brand}
                    onChange={handleChange}
                    placeholder="Enter the Brand"
                    type="text"
                    autoComplete="off"
                    required
                  />
                </LabelInputContainer>

                {/* NAME */}
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={uploadCred.name}
                    onChange={handleChange}
                    placeholder="Enter the Name"
                    type="text"
                    autoComplete="off"
                    required
                  />
                </LabelInputContainer>

                {/* SIZE */}
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="size">Size</Label>
                  <SelectInput
                    id="size"
                    name="size"
                    value={uploadCred.size}
                    onChange={handleChange}
                    required
                    placeholder="Choose Size"
                    options={[
                      { value: "Small", label: "Small" },
                      { value: "Regular", label: "Regular" },
                      { value: "Large", label: "Large" },
                    ]}
                  />
                </LabelInputContainer>

                {/* PRICE */}
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    value={uploadCred.price}
                    onChange={handleChange}
                    placeholder="Enter the Price"
                    type="text"
                    autoComplete="off"
                    required
                  />
                </LabelInputContainer>

                <FileUpload onChange={handleFileUpload} />
                <button
                  className="relative group/btn mt-4 bg-black text-white dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-full dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                >
                  Add the item &rarr;
                  <BottomGradient />
                </button>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
              </form>
            </div>
          </div>
        )}

        {isAdmin === false && (
          <div className="flex flex-col items-center">
            <h2 className="capitalize w-full text-center pb-5 text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              You are not authorized
            </h2>
          </div>
        )}
        {isAdmin === null && (
          <div className="flex flex-col items-center">
            <h2 className="w-full text-center pb-5 text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Loading ...
            </h2>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
