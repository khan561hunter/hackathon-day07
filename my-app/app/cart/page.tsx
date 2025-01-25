"use client";
import { useState, useEffect } from "react";
interface Product {
  name: string;
  prices: number;
  slug: string;
  imageUrl: string;
  _id: string;
}
export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  // Load the cart from localStorage when the page loads
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  // Function to add a product to the cart
  

  // Function to remove a product from the cart
  const handleRemoveFromCart = (ProductID: string) => {
    const savedCart :Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Filter out the product that needs to be removed
    const updatedCart = savedCart.filter((item: any) => item.id !== ProductID);

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart); // Update the state to trigger re-render
  };

  return (
    <div className="bg-white h-screen">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center mb-4 p-4 border-b">
              <div>
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.prices}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}