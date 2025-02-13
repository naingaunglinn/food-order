"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../header";

export default function OtpPage() {
  const searchParams = useSearchParams();  
  const router = useRouter(); // Initialize the router
  const initialPhone = searchParams.get("phone") || "";
  const OTP_LENGTH = 6;
  const TIME_LIMIT = 30; // Timer in seconds

  const [phone, setPhone] = useState(initialPhone);
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill("_"));
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [inputValue, setInputValue] = useState("");
  const [sentOtp, setSentOtp] = useState(generateOtp()); // Random OTP sent
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  // Generate a 6-digit OTP
  function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Countdown Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Handle OTP Input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH);
    setInputValue(value);

    let newOtp = [...otp];
    for (let i = 0; i < OTP_LENGTH; i++) {
      newOtp[i] = value[i] || "_";
    }
    setOtp(newOtp);
    setError(""); // Clear error when typing
  };

  // OTP Submission
  const handleOtpSubmit = () => {
    if (otp.join("") === sentOtp) {
        router.push("/order-complete"); // Redirect to the order complete page
    } else {
      setError("❌ Incorrect OTP. Please try again.");
    }
  };

  // Open & Close Modal
  const openModal = () => {
    setNewPhone(phone);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // Handle Phone Number Change
  const handleUpdatePhone = () => {
    if (newPhone.length >= 10) {
      setPhone(newPhone);
      closeModal();
      resendOtp(); // Resend OTP when phone number changes
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  // Resend OTP
  const resendOtp = () => {
    const newOtp = generateOtp();
    console.log(newOtp);
    setSentOtp(newOtp);
    setTimeLeft(TIME_LIMIT);
    setOtp(new Array(OTP_LENGTH).fill("_"));
    setInputValue("");
    setError("");
    console.log(`🔄 New OTP Sent: ${newOtp}`);
  };

  return (
    <div>
    <Header/>
    <div className="p-6 text-black">
      {/* Phone Number Section */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="uppercase text-black text-sm font-bold">Current Phone Number</h1>
          <h2 className="text-black text-lg">{phone}</h2>
        </div>
        <button onClick={openModal} className="text-red text-sm font-bold uppercase">
          Change
        </button>
      </div>

      {/* OTP Input Section */}
      <h1 className="uppercase text-black text-sm font-bold">Please Enter OTP</h1>
      <div className="relative border border-gray p-3 rounded-md mt-2 flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          maxLength={OTP_LENGTH}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <span className="text-xl tracking-widest">{otp.join(" ")}</span>
        <span className="ml-auto text-gray">{timeLeft}s</span>
      </div>
      <div>
        <span>Didn't received?
            <button
            onClick={resendOtp}
            className="py-2 mt-2 rounded-md text-blue text-sm uppercase"
        >
            Resend
        </button>
      </span>
      </div>

      {/* Error Message */}
      {error && <p className="text-red mt-2">{error}</p>}
    <div className="absolute bottom-[40px] left-[38%]">
      {/* Submit & Resend Buttons */}
      <button
        className={`w-[102px] py-2 mt-4 rounded-md text-white font-bold text-sm uppercase ${
          otp.includes("_") ? "bg-gray cursor-not-allowed" : "bg-red hover:bg-red"
        }`}
        onClick={handleOtpSubmit}
        disabled={otp.includes("_")}
      >
        Continue
      </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-bold mb-4">Change Phone Number</h2>
            <input
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, "").slice(0, 15))}
              className="w-full border p-2 mb-4 rounded-md"
              placeholder="Enter new phone number"
            />
            <div className="flex justify-end">
              <button onClick={closeModal} className="px-4 py-2 bg-gray rounded-md mr-2">
                Cancel
              </button>
              <button
                onClick={handleUpdatePhone}
                className="px-4 py-2 bg-blue-500 text-black rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
