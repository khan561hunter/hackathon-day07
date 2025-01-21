


"use client";
import { useState, useEffect } from "react";
interface Product {
  name: string;
  price: number;
  slug: string;
    quantity: number;
  imageUrl: string;
  _id: string;
}
export default function WishlistPage() {
  const [wish, setWish] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  // Load the cart from localStorage when the page loads
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist" ) || "[]");
    setWish(savedWishlist);
    const savedCart = JSON.parse(localStorage.getItem("cart" ) || "[]");
    setWish(savedCart);
    
  }, []);

  const handlePlus = (ID :string , changes : number) => {
    
        const updatedWishlist = wish.map((item) => {
            if(item._id === ID){
                const newQuantity = item.quantity + changes;
                if(newQuantity > 0){
                    return ({ ...item, quantity: newQuantity });
                }
            
            }
            return(item);
            
        }).filter((item) => item.quantity > 0 )
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setCart([...updatedWishlist]);
    }

  // Function to add a product to the cart


  const handleAddToCart = (product: Product) => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const existingProduct = savedCart.find((item: any) => item.id === product._id);

    if (existingProduct) {
      // If it exists, update the quantity
      
      existingProduct.quantity += product.quantity;

      
    } else {
      // If it doesn't exist, add the new product with quantity 1
      savedCart.push({ ...product });
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(savedCart));
    setCart([...cart , product]); // Update the state to trigger re-render
  };
  const handleAddToWishlist = (product: Product) => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    // Check if the product already exists in the cart
    const existingProduct = savedWishlist.find((item: any) => item.id === product._id);

    if (existingProduct) {
      // If it exists, update the quantity
      
      existingProduct.quantity += product.quantity;

      
    } else {
      // If it doesn't exist, add the new product with quantity 1
      savedWishlist.push({ ...product });
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(savedWishlist));
    setCart([...cart , product]); // Update the state to trigger re-render
  };

  // Function to remove a product from the cart
  

  return (
    <div className="bg-gradient-to-r from-teal-800 to-yellow-600 h-screen ">
      <h1>Your Wishlist</h1>
      {wish.length === 0 ? (
        <p>Your Wishlist is empty.</p>
      ) : (
        <div>
          {wish.map((item) => (
           <div key={item._id} className="flex justify-between items-center mb-4 p-4 border-b max-w-[1440px] mx-auto">
           <div className="flex-1"> 
             <p>{item.name}</p>
             <p>Quantity: {item.quantity}</p>
             <p>Price: ${(item.price * item.quantity).toFixed(2) }</p>
             <button onClick={() => handlePlus(item._id, 1)}>
            +
           </button>
           </div>
           <button
             
             className="bg-red-500 text-white py-2 px-4 rounded ml-4"  
             onClick={() => handleAddToCart(item)}
            
           >
             Add to Cart
           </button>
           
         </div>
         
         
          ))}
        </div>
      )}
    </div>
  );
}
