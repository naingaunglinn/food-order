import Image from "next/image";

export default function Home() {

  const categories = [
    {
      image: '/yogurt.svg',
      name: 'Yogurt'
    },
    {
      image: '/bubble-tea.svg',
      name: 'Bubble Tea'
    },
    {
      image: '/coffee.svg',
      name: 'Coffee'
    },
    {
      image: '/smoothie.svg',
      name: 'Smoothie'
    },
    {
      image: '/soda.svg',
      name: 'Soda'
    },
    {
      image: '/fruit-juice.svg',
      name: 'Fruit'
    },
  ];

  const items = [
    {
      name: 'Passion Yogurt',
      price: '5000',
      description: 'Natural fermented yogurt from pure fresh milk and passion fruit....',
      image: '/item-1-image.png',
      stock: 10,
    },
    {
      name: 'Passion Yogurt',
      price: '5000',
      description: 'Natural fermented yogurt from pure fresh milk and passion fruit....',
      image: '/item-1-image.png',
      stock: 10,
    }
  ]

  return (
    <div className="font-[family-name:var(--font-noto-sans)]">
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
      <div>
        <h1 className="text-black text-center font-rubik font-bold text-[15px] py-[12px]">Welcome to Cheese O’Tea. </h1>
      </div>
      <div className="flex justify-center">
          <Image
            aria-hidden
            src="/main-banner.png"
            alt="File icon"
            width={1000}
            height={1000}
          />
      </div>
      <div className="flex justify-evenly items-center mt-[12px]">
        {categories.map((category, index) => (
            <div key={index} className="text-black flex flex-col py-2 items-center border-2 rounded-lg border-gray hover:border-red w-[60px] h-[60px] text-[10px]">
              <Image
                aria-hidden
                src={category.image}
                className="alig-center w-auto"
                alt="File icon"
                width={28}
                height={28}
              />
              <h2 className="text-center">
                {category.name}
              </h2>
            </div>
          ))
        }
      </div>
      <div className="max-w-[512px] m-auto mt-5 px-[12px]">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 py-5 text-black border-b-2 border-solid border-gray">
            <div className="col-span-2 row-span-2">
              <div className="mb-3">
                <h2 className="leading-[19px] text-[14px]">{item.name}</h2>
                <span className="leading-[19px] text-[14px]">{item.price}</span>
              </div>
              <p className="leading-[18px] text-[12px]">{item.description}</p>
            </div>
            <div className="col-span-1 row-span-1 justify-self-end">
              <Image
                aria-hidden
                src={item.image}
                className="alig-center"
                alt="File icon"
                width={83}
                height={90}
              />
            </div>
            <div className="col-span-1 row-span-1 text-right">
              <button className="bg-red w-[103px] text-center py-[5px] rounded-[50px] text-white text-[12px] uppercase font-bold">Order Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
