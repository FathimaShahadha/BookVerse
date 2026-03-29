import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, ArrowRightIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CartItem } from '../components/ui/CartItem';
import { BookCard } from '../components/ui/BookCard';
import { BOOKS } from '../data/mockData';
export function CartPage() {
  const { cart, cartTotal, navigate } = useAppContext();
  const [promoCode, setPromoCode] = useState('');
  const shipping = cartTotal > 50 ? 0 : 4.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;
  const suggestedBooks = BOOKS.slice(0, 4);
  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-cream flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="text-center max-w-md">

          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShoppingBagIcon className="w-12 h-12 text-gray-300" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-3">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any books yet. Discover your next great
            read in our catalog.
          </p>
          <button
            onClick={() => navigate('catalog')}
            className="btn-primary w-full sm:w-auto">

            Browse Books
          </button>
        </motion.div>
      </div>);

  }
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-8">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sm:p-4 mb-8">
              {cart.map((item, index) =>
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.1
                }}>

                  <CartItem item={item} />
                </motion.div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold text-navy mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-navy">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-navy">
                    {shipping === 0 ?
                    <span className="text-forest">Free</span> :

                    `$${shipping.toFixed(2)}`
                    }
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-medium text-navy">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-navy">Total</span>
                  <span className="font-serif text-2xl font-bold text-navy">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
                {shipping === 0 &&
                <p className="text-xs text-forest mt-1 text-right">
                    You qualify for free shipping!
                  </p>
                }
              </div>

              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="input-field flex-1 text-sm py-2" />

                  <button className="btn-outline py-2 px-4 text-sm">
                    Apply
                  </button>
                </div>
              </div>

              <button
                onClick={() => navigate('checkout')}
                className="btn-primary w-full flex items-center justify-center gap-2">

                Proceed to Checkout <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Books */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-navy mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedBooks.map((book, idx) =>
            <BookCard key={book.id} book={book} index={idx} />
            )}
          </div>
        </div>
      </div>
    </div>);

}