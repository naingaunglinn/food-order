'use client'
import Image from "next/image";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import Header from "./header";
import { fetchCategories, fetchItems } from "@/utils/api";

interface Category {
  id: number;
  image: string;
  name: string;
}

interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category_id: number;
  quantity?: number;  // Quantity is optional at first
}

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [cart, setCart] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);


  useEffect(() => {
    // Fetch data when the component mounts
    fetchCategories().then(setCategories);
    fetchItems().then(setItems);
  }, []);
  
  console.log(categories, items, selectedCategoryId);
  
  // Track quantities before adding to cart
  const [itemQuantities, setItemQuantities] = useState<Record<number, number>>({});

  const filteredItems: Item[] = selectedCategoryId 
    ? items.filter(item => item.category_id === selectedCategoryId) 
    : items;

  console.log(filteredItems);

  // Adjust quantity for a specific item before adding to cart
  const handleQuantityChangeBeforeAdd = (itemId: number, action: 'increase' | 'decrease'): void => {
    setItemQuantities(prev => {
      const currentQuantity = prev[itemId] || 1; // Default to 1 if no quantity set yet
      const newQuantity = action === 'increase' ? Math.min(currentQuantity + 1, 10) : Math.max(currentQuantity - 1, 1); // Min-max logic

      return { ...prev, [itemId]: newQuantity }; // Update the quantity for this specific item
    });
  };

  // Add to cart with adjusted quantity
  const handleAddToCart = (item: Item): void => {
    const quantity = itemQuantities[item.id] || 1; // Get the adjusted quantity for this item (default to 1 if none)

    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // If the item is already in the cart, update its quantity
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity! + quantity } 
          : cartItem
      ));
    } else {
      // Otherwise, add the item to the cart
      setCart([...cart, { ...item, quantity }]);
    }
  };

  // Adjust quantity in the cart after adding the item
  const handleQuantityChangeInCart = (id: number, action: 'increase' | 'decrease'): void => {
    setCart(cart.map(item => 
      item.id === id
        ? { ...item, quantity: action === 'increase' ? item.quantity! + 1 : Math.max(1, item.quantity! - 1) }
        : item
    ));
  };

  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
  
    const orderData = {
      products: cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
      })),
      total_price: getTotalPrice(),
    };
  
    try {
      const response = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to place order");
      }
  
      const result = await response.json();
      console.log("Order placed successfully:", result);
  
      // Clear the cart after successful order placement
      setCart([]);
      setIsOpen(false);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };
  

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
            onClick={() => setSelectedCategoryId(category.id)}
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
                {/* Quantity Adjustment Before Add */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleQuantityChangeBeforeAdd(item.id, 'decrease')}
                    className="text-black bg-gray-500 px-2 py-1 rounded-full text-[12px]"
                  >
                    -
                  </button>
                  <span className="text-[14px]">{itemQuantities[item.id] || 1}</span>
                  <button
                    onClick={() => handleQuantityChangeBeforeAdd(item.id, 'increase')}
                    className="text-black bg-gray-500 px-2 py-1 rounded-full text-[12px]"
                  >
                    +
                  </button>
                </div>

                {/* Order Now Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-red w-[103px] text-center py-[5px] rounded-[50px] text-white text-[12px] uppercase font-bold mt-2"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No items available in this category.</p>
        )}
      </div>

      {/* Cart and Checkout */}
      {cart.length > 0 && (
        <div className="fixed bottom-5 left-0 right-0 p-4 bg-white shadow-lg">
          {/* Display the list of items in the cart */}
          <div className="mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b">
                <span className="text-black text-[14px]">{item.name}</span>
                <span className="text-black text-[14px]">{item.quantity} pcs</span>
              </div>
            ))}
          </div>

          {/* Display total price and checkout button */}
          <div className="flex justify-between items-center">
            <span className="text-black font-bold text-[14px]">Total: ${getTotalPrice() / 100}</span>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-red text-white py-2 px-6 rounded-full"
            >
              Checkout
            </button>
          </div>
        </div>
      )}


      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Order Now
      </Modal>
    </div>
  );
}
