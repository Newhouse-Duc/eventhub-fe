export interface PetTag {
  species: 'dog' | 'cat' | 'bird' | 'fish' | 'small_pet';
  breed?: string;
  ageText?: string;
  weightStr?: string;
}

export interface ReviewProps {
  id: string;
  authorName: string;
  authorAvatar?: string;
  isVerifiedPurchase?: boolean;
  rating: number;
  dateStr: string;
  content: string;
  images?: string[];
  helpfulCount?: number;
  petTag?: PetTag;
}

export interface RatingBreakdownProps {
  average: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface RatingStarsProps {
  rating: number;
  className?: string;
  showAriaLabel?: boolean;
}
