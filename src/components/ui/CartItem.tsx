import React from 'react';
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { CartItem as CartItemType } from '../../context/AppContext';
import { useAppContext } from '../../context/AppContext';
interface CartItemProps {
  item: CartItemType;
}
export function CartItem({ item }: CartItemProps) {
  const { updateCartQuantity, removeFromCart, navigate } = useAppContext();
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-gray-100 bg-white p-4 rounded-xl shadow-sm mb-4">
      {/* Book Cover Thumbnail */}
      <div
        className={`w-24 h-36 shrink-0 rounded-md shadow-sm ${item.coverGradient} flex items-center justify-center p-2 cursor-pointer relative overflow-hidden`}
        onClick={() =>
        navigate('book-detail', {
          bookId: item.id
        })
        }>

        <div className="absolute left-2 top-0 bottom-0 w-px bg-white/20" />
        <span className="font-serif text-white text-xs text-center font-bold drop-shadow-md line-clamp-3">
          {item.title}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3
              className="font-serif text-lg font-bold text-navy hover:text-amber transition-colors cursor-pointer line-clamp-2"
              onClick={() =>
              navigate('book-detail', {
                bookId: item.id
              })
              }>

              {item.title}
            </h3>
            <p className="text-sm text-gray-500 mb-1">{item.author}</p>
            <p className="text-xs text-gray-400">{item.availability}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-navy">
              ${item.price.toFixed(2)}
            </p>
            {item.originalPrice &&
            <p className="text-sm text-gray-400 line-through">
                ${item.originalPrice.toFixed(2)}
              </p>
            }
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
            <button
              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
              className="p-2 text-gray-500 hover:text-navy hover:bg-gray-100 rounded-l-lg transition-colors"
              aria-label="Decrease quantity">

              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-medium text-navy text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
              className="p-2 text-gray-500 hover:text-navy hover:bg-gray-100 rounded-r-lg transition-colors"
              aria-label="Increase quantity"
              disabled={item.availability === 'Out of Stock'}>

              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-burgundy transition-colors">

            <Trash2Icon className="w-4 h-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>);

}