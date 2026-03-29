import React, { useState } from 'react';
import { StarIcon, StarHalfIcon } from 'lucide-react';
interface ReviewStarsProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}
export function ReviewStars({
  rating,
  reviewCount,
  size = 'sm',
  interactive = false,
  onRatingChange
}: ReviewStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  const handleStarClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center"
        onMouseLeave={() => interactive && setHoverRating(0)}>

        {[...Array(fullStars)].map((_, i) =>
        <StarIcon
          key={`full-${i}`}
          className={`${sizeClasses[size]} text-amber fill-amber ${interactive ? 'cursor-pointer transition-transform hover:scale-110' : ''}`}
          onClick={() => handleStarClick(i + 1)}
          onMouseEnter={() => interactive && setHoverRating(i + 1)} />

        )}
        {hasHalfStar &&
        <div
          className="relative"
          onClick={() => handleStarClick(fullStars + 1)}>

            <StarIcon className={`${sizeClasses[size]} text-gray-300`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon
              className={`${sizeClasses[size]} text-amber fill-amber`} />

            </div>
          </div>
        }
        {[...Array(emptyStars)].map((_, i) =>
        <StarIcon
          key={`empty-${i}`}
          className={`${sizeClasses[size]} text-gray-300 ${interactive ? 'cursor-pointer transition-transform hover:scale-110 hover:text-amber' : ''}`}
          onClick={() =>
          handleStarClick(fullStars + (hasHalfStar ? 1 : 0) + i + 1)
          }
          onMouseEnter={() =>
          interactive &&
          setHoverRating(fullStars + (hasHalfStar ? 1 : 0) + i + 1)
          } />

        )}
      </div>
      {reviewCount !== undefined &&
      <span className="text-sm text-gray-500 font-medium">
          {rating.toFixed(1)} ({reviewCount.toLocaleString()})
        </span>
      }
    </div>);

}