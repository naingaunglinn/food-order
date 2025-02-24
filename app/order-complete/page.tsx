import Link from "next/link";
import Header from "../header";
import Image from "next/image";

export default function Order() {
    return (
        <div>
            <Header/>
            <div className="flex flex-col items-center justify-center min-h-96 bg-gray-50">
            <div className="flex flex-col items-center text-black">
                {/* Icon */}
                <div className="mb-6">
                    <Image
                        aria-hidden
                        src="/popup-icon.png"
                        alt="File icon"
                        width={72}
                        height={72}
                    />
                </div>

                {/* Message */}
                <h1 className="mb-2">Your order is received.</h1>
                <p className="mb-6">We will contact you shortly.</p>

                {/* Button */}
                <Link href="/">                
                    BACK TO HOME
                </Link>
            </div>
            </div>
        </div>
    )
}