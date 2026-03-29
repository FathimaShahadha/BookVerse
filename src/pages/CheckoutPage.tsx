import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircleIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon,
  ChevronRightIcon } from
'lucide-react';
import { useAppContext } from '../context/AppContext';
export function CheckoutPage() {
  const { cart, cartTotal, clearCart, addOrder, user, navigate } =
  useAppContext();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const shipping = cartTotal > 50 ? 0 : 4.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;
  const handlePlaceOrder = () => {
    const newOrder = {
      id: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: user?.id || 'guest',
      date: new Date().toISOString().split('T')[0],
      status: 'Processing' as const,
      items: cart.map((item) => ({
        bookId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      total: grandTotal,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).
      toISOString().
      split('T')[0]
    };
    addOrder(newOrder);
    setOrderId(newOrder.id);
    clearCart();
    setIsSuccess(true);
  };
  if (isSuccess) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-cream flex items-center justify-center px-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-warm max-w-lg w-full text-center">

          <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            transition={{
              type: 'spring',
              bounce: 0.5,
              delay: 0.2
            }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">

            <CheckCircleIcon className="w-10 h-10 text-forest" />
          </motion.div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl mb-8">
            <p className="text-sm text-gray-500 mb-1">Order Number</p>
            <p className="font-mono font-bold text-navy text-lg">{orderId}</p>
          </div>
          <button
            onClick={() => navigate('home')}
            className="btn-primary w-full">

            Continue Shopping
          </button>
        </motion.div>
      </div>);

  }
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-navy mb-8 text-center">
          Checkout
        </h1>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center w-full max-w-2xl">
            <div
              className={`flex flex-col items-center relative z-10 ${step >= 1 ? 'text-amber' : 'text-gray-400'}`}>

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= 1 ? 'bg-amber text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>

                1
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">
                Shipping
              </span>
            </div>
            <div
              className={`flex-1 h-1 mx-2 rounded-full transition-colors ${step >= 2 ? 'bg-amber' : 'bg-gray-200'}`} />

            <div
              className={`flex flex-col items-center relative z-10 ${step >= 2 ? 'text-amber' : 'text-gray-400'}`}>

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= 2 ? 'bg-amber text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>

                2
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">
                Payment
              </span>
            </div>
            <div
              className={`flex-1 h-1 mx-2 rounded-full transition-colors ${step >= 3 ? 'bg-amber' : 'bg-gray-200'}`} />

            <div
              className={`flex flex-col items-center relative z-10 ${step >= 3 ? 'text-amber' : 'text-gray-400'}`}>

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= 3 ? 'bg-amber text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>

                3
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">
                Review
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 &&
            <motion.div
              key="step1"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="p-6 md:p-8">

                <h2 className="font-serif text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                  <TruckIcon className="w-6 h-6 text-amber" /> Shipping
                  Information
                </h2>
                <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        First Name
                      </label>
                      <input 
                        type="text" 
                        className="input-field" 
                        required 
                        defaultValue={user?.name?.split(' ')[0] || ''}
                        pattern="[A-Za-z\s]+"
                        title="Please enter letters only"
                      />

                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Last Name
                      </label>
                      <input 
                        type="text" 
                        className="input-field" 
                        required 
                        defaultValue={user?.name?.split(' ')[1] || ''}
                        pattern="[A-Za-z\s]+"
                        title="Please enter letters only"
                      />

                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Email Address
                      </label>
                      <input
                      type="email"
                      className="input-field"
                      required
                      defaultValue={user?.email || ''} />

                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Street Address
                      </label>
                      <input type="text" className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        City
                      </label>
                      <input type="text" className="input-field" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1.5">
                          State
                        </label>
                        <input type="text" className="input-field" required pattern="[A-Za-z\s]+" title="Please enter letters only" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1.5">
                          ZIP Code
                        </label>
                        <input type="text" className="input-field" required pattern="[0-9]*" title="Please enter numbers only" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-6 border-t border-gray-100">
                    <button type="button" onClick={() => navigate('cart')} className="btn-outline">
                      Back to Cart
                    </button>
                    <button type="submit" className="btn-primary">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </motion.div>
            }

            {step === 2 &&
            <motion.div
              key="step2"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="p-6 md:p-8">

                <h2 className="font-serif text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                  <CreditCardIcon className="w-6 h-6 text-amber" /> Payment
                  Details
                </h2>
                <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(3);
                }}>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="w-4 h-4 text-amber focus:ring-amber" />

                      <span className="font-medium text-navy">
                        Credit / Debit Card
                      </span>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Cardholder Name
                      </label>
                      <input type="text" className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="input-field pl-10"
                          required
                          pattern="[0-9\s]+"
                          title="Please enter numbers only"
                        />

                        <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1.5">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="input-field"
                          required
                        />

                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1.5">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="input-field"
                          required
                          pattern="[0-9]{3,4}"
                          title="Please enter 3 or 4 digits"
                        />

                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-6 border-t border-gray-100">
                    <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-outline">

                      Back
                    </button>
                    <button type="submit" className="btn-primary">
                      Review Order
                    </button>
                  </div>
                </form>
              </motion.div>
            }

            {step === 3 &&
            <motion.div
              key="step3"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="p-6 md:p-8">

                <h2 className="font-serif text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                  <ShieldCheckIcon className="w-6 h-6 text-amber" /> Review Your
                  Order
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-navy">Shipping Address</h3>
                      <button
                      onClick={() => setStep(1)}
                      className="text-sm text-amber hover:text-navy">

                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {user?.name || 'Jane Doe'}
                      <br />
                      123 Bookworm Lane
                      <br />
                      Apt 4B
                      <br />
                      Literary City, NY 10001
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-navy">Payment Method</h3>
                      <button
                      onClick={() => setStep(2)}
                      className="text-sm text-amber hover:text-navy">

                        Edit
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CreditCardIcon className="w-5 h-5" />
                      <span>Visa ending in 4242</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl overflow-hidden mb-8">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                    <h3 className="font-bold text-navy">Order Items</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {cart.map((item) =>
                  <div
                    key={item.id}
                    className="p-4 flex items-center gap-4">

                        <div
                      className={`w-12 h-16 rounded shadow-sm ${item.coverGradient} shrink-0`} />

                        <div className="flex-1">
                          <h4 className="font-medium text-navy line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="font-medium text-navy">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                  )}
                  </div>
                  <div className="bg-gray-50 p-6 border-t border-gray-100 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-navy pt-2 mt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-gray-100">
                  <button onClick={() => setStep(2)} className="btn-outline">
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} className="btn-primary">
                    Place Order
                  </button>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </div>);

}