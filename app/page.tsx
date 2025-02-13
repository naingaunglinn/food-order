'use client'
import Image from "next/image";
import Modal from "./components/Modal";
import { useState } from "react";
import Header from "./header";

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0); // State for selected category

  const categories = [
    { id: 1, image: '/yogurt.svg', name: 'Yogurt' },
    { id: 2, image: '/bubble-tea.svg', name: 'Bubble Tea' },
    { id: 3, image: '/coffee.svg', name: 'Coffee' },
    { id: 4, image: '/smoothie.svg', name: 'Smoothie' },
    { id: 5, image: '/soda.svg', name: 'Soda' },
    { id: 6, image: '/fruit-juice.svg', name: 'Fruit' },
  ];

  const items = [
    { id: 1, name: 'Passion Yogurt', price: '5000', description: 'Natural fermented yogurt from pure fresh milk and passion fruit....', image: '/item-1-image.png', stock: 10, category_id: 1 },
    { id: 2, name: 'Taro Bubble Tea', price: '5500', description: 'Creamy taro bubble tea with fresh tapioca pearls....', image: '/item-1-image.png', stock: 8, category_id: 2 },
    { id: 3, name: 'Espresso Coffee', price: '4500', description: 'Rich and bold espresso shot, freshly brewed....', image: '/item-1-image.png', stock: 12, category_id: 3 },
    { id: 4, name: 'Berry Smoothie', price: '6000', description: 'Fresh mixed berry smoothie with natural ingredients....', image: '/item-1-image.png', stock: 6, category_id: 4 }
  ];

  // Filter items based on selected category
  const filteredItems = selectedCategoryId 
    ? items.filter(item => item.category_id === selectedCategoryId) 
    : items;

  return (
    <div className="font-[family-name:var(--font-noto-sans)]">
      <Header/>
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
      {/* Category Tabs */}
      <div className="flex justify-evenly items-center mt-[12px]">
        {categories.map((category) => (
          <div 
            key={category.id} 
            onClick={() => setSelectedCategoryId(category.id)} // Click handler
            className={`text-black flex flex-col py-2 items-center border-2 rounded-lg cursor-pointer w-[60px] h-[60px] text-[10px] ${
              selectedCategoryId === category.id 
                ? 'border-red' 
                : 'border-gray hover:border-red'
            }`}
          >
            <Image
              aria-hidden
              src={category.image}
              className="align-center w-auto"
              alt={`${category.name} icon`}
              width={28}
              height={28}
            />
            <h2 className="text-center">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
      
      {/* Item List */}
      <div className="max-w-[512px] m-auto mt-5 px-[12px]">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="grid grid-cols-3 gap-4 py-5 text-black border-b-2 border-solid border-gray">
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
                  alt={`${item.name} image`}
                  width={83}
                  height={90}
                />
              </div>
              <div className="col-span-1 row-span-1 text-right">
                <button 
                  onClick={() => setIsOpen(true)}
                  className="bg-red w-[103px] text-center py-[5px] rounded-[50px] text-white text-[12px] uppercase font-bold">Order Now</button>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                  Order Now
                </Modal>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No items available in this category.</p>
        )}
      </div>
    </div>
  );
}
