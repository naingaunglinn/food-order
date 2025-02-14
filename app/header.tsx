import Image from "next/image";

const Header = () => {
    return (
        <div>
            <div className="bg-red flex justify-end p-[7px]">
                    <Image
                      aria-hidden
                      src="/mask.svg"
                      alt="File icon"
                      width={47.92}
                      height={47.92}
                    />
                  </div>
                  <header className="bg-red flex justify-between px-[12px] py-[18px]">
                    <Image
                        aria-hidden
                        src="/left-arrow.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                      />
                      <h1>Menu</h1>
                      <Image
                        aria-hidden
                        src="/left-arrow.svg"
                        className="invisible"
                        alt="File icon"
                        width={16}
                        height={16}
                      />
                  </header>
        </div>
    )
}

export default  Header;