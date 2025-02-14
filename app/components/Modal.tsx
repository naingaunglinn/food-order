"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children  }: ModalProps) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize Next.js router

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const validatePhone = (value: string) => {
    const regex = /^09\d{9}$/; // Must start with 09 and have exactly 11 digits
    if (!regex.test(value)) {
      setError("Please enter a phone number.");
    } else {
      setError("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Only allow numbers
      setPhone(value);
      validatePhone(value);
    }
  };

  const handleContinue = () => {
    if (!error && phone.length === 11) {
      router.push(`/otp?phone=${phone}`); // Navigate to OTP page with phone number
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center text-black justify-center bg-black/10 backdrop-blur-sm z-50" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative p-6  rounded-lg shadow-lg max-w-md w-[90%] mx-auto"
      >
        {/* Close Button */}
        <button className="absolute right-6 text-gray hover:text-gray" onClick={onClose}>
          <Image
            aria-hidden
            src="/exit.svg"
            alt="Close"
            width={24}
            height={24}
          />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h1 className="text-lg font-bold mb-4">Phone Number</h1>

        <div className="my-14 w-[231px] mx-auto">
          {/* Input Field */}
          <div className="flex items-center border-2 border-gray w-[231px] mx-auto p-3 rounded-md ">
            <Image
              aria-hidden
              src="/phone.svg"
              alt="Phone"
              width={24}
              height={24}
            />
            <input
              type="text"
              value={phone}
              onChange={handleChange}
              placeholder="Phone"
              className="ml-2 outline-none max-w-[180px]"
            />
          </div>
            {/* Error Message */}
            {error && <p className="text-red text-[12px] text-left mb-4">{error}</p>}
        </div>

          

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className={`w-[142px] text-center py-3 rounded-full text-white text-sm uppercase font-bold transition ${
              error && phone.length < 11 ? "bg-gray cursor-not-allowed" : "bg-red hover:bg-red"
            }`}
            disabled={!!error || phone.length < 11}
          >
            Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
