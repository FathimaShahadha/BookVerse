import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PackageIcon,
  TruckIcon,
  CheckCircleIcon,
  MapPinIcon,
  ChevronDownIcon } from
'lucide-react';
import { useAppContext } from '../context/AppContext';

export function OrderTrackingPage() {
  const { orders, navigate, books } = useAppContext();
  const [selectedOrderId, setSelectedOrderId] = useState(
    orders.length > 0 ? orders[0].id : ''
  );
  const selectedOrder = orders.find((o) => o.id === selectedOrderId);
  if (orders.length === 0) {
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
            <PackageIcon className="w-12 h-12 text-gray-300" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-3">
            No orders found
          </h1>
          <p className="text-gray-500 mb-8">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => navigate('catalog')}
            className="btn-primary w-full sm:w-auto">

            Start Shopping
          </button>
        </motion.div>
      </div>);

  }
  const getStepStatus = (stepName: string) => {
    if (!selectedOrder) return 'pending';
    const status = selectedOrder.status;
    const steps = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentIndex = steps.indexOf(status);
    const stepIndex = steps.indexOf(stepName);
    if (status === 'Cancelled') return 'pending';
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };
  const steps = [
  {
    name: 'Order Placed',
    icon: PackageIcon,
    date: selectedOrder?.date
  },
  {
    name: 'Processing',
    icon: PackageIcon,
    date: selectedOrder?.date
  },
  {
    name: 'Shipped',
    icon: TruckIcon,
    date:
    selectedOrder?.status === 'Shipped' ||
    selectedOrder?.status === 'Out for Delivery' ||
    selectedOrder?.status === 'Delivered' ?
    'Updated' :
    null
  },
  {
    name: 'Out for Delivery',
    icon: MapPinIcon,
    date:
    selectedOrder?.status === 'Out for Delivery' ||
    selectedOrder?.status === 'Delivered' ?
    'Updated' :
    null
  },
  {
    name: 'Delivered',
    icon: CheckCircleIcon,
    date:
    selectedOrder?.status === 'Delivered' ?
    selectedOrder?.estimatedDelivery :
    null
  }];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-navy mb-8">
          Track Your Order
        </h1>

        {/* Order Selector */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex items-center gap-4">
          <span className="text-gray-500 font-medium whitespace-nowrap">
            Select Order:
          </span>
          <div className="relative flex-1 max-w-xs">
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-navy rounded-lg p-2.5 pr-8 outline-none focus:ring-amber focus:border-amber cursor-pointer">

              {orders.map((order) =>
              <option key={order.id} value={order.id}>
                  {order.id} - {new Date(order.date).toLocaleDateString()}
                </option>
              )}
            </select>
            <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {selectedOrder &&
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Timeline */}
            <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-serif text-xl font-bold text-navy mb-6">
                Tracking Status
              </h2>

              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-100" />

                <div className="space-y-8 relative">
                  {steps.map((step, idx) => {
                  const status =
                  idx === 0 ? 'completed' : getStepStatus(step.name);
                  const Icon = step.icon;
                  return (
                    <div key={step.name} className="flex gap-4 relative">
                        <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${status === 'completed' ? 'bg-forest text-white' : status === 'current' ? 'bg-amber text-white shadow-md ring-4 ring-amber/20' : 'bg-gray-100 text-gray-400'}`}>

                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="pt-3">
                          <p
                          className={`font-bold ${status === 'current' ? 'text-amber' : status === 'completed' ? 'text-navy' : 'text-gray-400'}`}>

                            {step.name}
                          </p>
                          {step.date &&
                        <p className="text-xs text-gray-500 mt-1">
                              {step.date}
                            </p>
                        }
                        </div>
                      </div>);

                })}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-navy mb-1">
                      Order Details
                    </h2>
                    <p className="text-sm text-gray-500">
                      Placed on{' '}
                      {new Date(selectedOrder.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">
                      Tracking Number
                    </p>
                    <p className="font-mono font-bold text-navy">
                      {selectedOrder.trackingNumber || 'Pending'}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Estimated Delivery
                    </p>
                    <p className="font-bold text-navy text-lg">
                      {selectedOrder.estimatedDelivery || 'TBD'}
                    </p>
                  </div>
                  <TruckIcon className="w-8 h-8 text-amber opacity-50" />
                </div>

                <h3 className="font-bold text-navy mb-4">
                  Items in this order
                </h3>
                <div className="divide-y divide-gray-100">
                  {selectedOrder.items.map((item, idx) => {
                  const book = books.find((b) => b.id === item.bookId);
                  if (!book) return null;
                  return (
                    <div key={idx} className="py-4 flex gap-4 items-center">
                        <div
                        className={`w-12 h-16 rounded shadow-sm shrink-0 overflow-hidden relative ${book.coverImage ? '' : book.coverGradient}`}>
                          {book.coverImage && <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />}
                        </div>

                        <div className="flex-1">
                          <p className="font-medium text-navy line-clamp-1">
                            {book.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-navy">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>);

                })}
                </div>

                <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between items-center">
                  <span className="font-bold text-navy">Total</span>
                  <span className="font-serif text-xl font-bold text-navy">
                    ${selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}