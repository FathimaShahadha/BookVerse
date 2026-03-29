export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  genre: string;
  coverGradient: string;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isbn: string;
  publisher: string;
  publishDate: string;
  pages: number;
  language: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  bookCount: number;
  description: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  bookId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  code: string;
  validUntil: string;
}

export interface OrderItem {
  bookId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  status:
  'Processing' |
  'Shipped' |
  'Out for Delivery' |
  'Delivered' |
  'Cancelled';
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export const CATEGORIES: Category[] = [
{
  id: 'c1',
  name: 'Fiction',
  icon: 'BookOpenIcon',
  bookCount: 1240,
  description: 'Explore imaginative worlds and compelling narratives.'
},
{
  id: 'c2',
  name: 'Non-Fiction',
  icon: 'LibraryIcon',
  bookCount: 850,
  description: 'Discover true stories, biographies, and essays.'
},
{
  id: 'c3',
  name: 'Academic',
  icon: 'GraduationCapIcon',
  bookCount: 620,
  description: 'Textbooks, research papers, and scholarly works.'
},
{
  id: 'c4',
  name: 'Children',
  icon: 'SmileIcon',
  bookCount: 430,
  description: 'Delightful tales for young readers and toddlers.'
},
{
  id: 'c5',
  name: 'Technology',
  icon: 'LaptopIcon',
  bookCount: 510,
  description: 'Programming, design, and tech industry insights.'
}];


export const BOOKS: Book[] = [
{
  id: 'b1',
  title: 'The Midnight Library',
  author: 'Matt Haig',
  description:
  'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
  price: 14.99,
  originalPrice: 24.99,
  rating: 4.8,
  reviewCount: 3420,
  category: 'Fiction',
  genre: 'Contemporary',
  coverGradient: 'bg-book-cover-1',
  availability: 'In Stock',
  isbn: '978-0525559474',
  publisher: 'Viking',
  publishDate: '2020-09-29',
  pages: 304,
  language: 'English',
  isBestseller: true
},
{
  id: 'b2',
  title: 'Atomic Habits',
  author: 'James Clear',
  description:
  'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear reveals practical strategies that will teach you exactly how to form good habits.',
  price: 11.98,
  rating: 4.9,
  reviewCount: 8950,
  category: 'Non-Fiction',
  genre: 'Self-Help',
  coverGradient: 'bg-book-cover-4',
  availability: 'In Stock',
  isbn: '978-0735211292',
  publisher: 'Avery',
  publishDate: '2018-10-16',
  pages: 320,
  language: 'English',
  isBestseller: true
},
{
  id: 'b3',
  title: 'Dune',
  author: 'Frank Herbert',
  description:
  'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
  price: 10.99,
  originalPrice: 18.0,
  rating: 4.7,
  reviewCount: 5120,
  category: 'Fiction',
  genre: 'Science Fiction',
  coverGradient: 'bg-book-cover-2',
  availability: 'Low Stock',
  isbn: '978-0441172719',
  publisher: 'Ace Books',
  publishDate: '1965-08-01',
  pages: 412,
  language: 'English'
},
{
  id: 'b4',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  description:
  "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code.",
  price: 34.99,
  rating: 4.6,
  reviewCount: 2100,
  category: 'Technology',
  genre: 'Programming',
  coverGradient: 'bg-book-cover-3',
  availability: 'In Stock',
  isbn: '978-0132350884',
  publisher: 'Prentice Hall',
  publishDate: '2008-08-11',
  pages: 464,
  language: 'English'
},
{
  id: 'b5',
  title: 'Where the Wild Things Are',
  author: 'Maurice Sendak',
  description:
  'Max, a wild and naughty boy, is sent to bed without his supper by his exhausted mother. In his room, he imagines sailing far away to a land of Wild Things.',
  price: 8.99,
  rating: 4.9,
  reviewCount: 4300,
  category: 'Children',
  genre: 'Picture Book',
  coverGradient: 'bg-book-cover-4',
  availability: 'In Stock',
  isbn: '978-0060254926',
  publisher: 'HarperCollins',
  publishDate: '1963-04-09',
  pages: 48,
  language: 'English'
},
{
  id: 'b6',
  title: 'The Design of Everyday Things',
  author: 'Don Norman',
  description:
  "Design doesn't have to complicated, which is why this guide to human-centered design shows that usability is just as important as aesthetics.",
  price: 16.99,
  originalPrice: 22.0,
  rating: 4.5,
  reviewCount: 1850,
  category: 'Technology',
  genre: 'Design',
  coverGradient: 'bg-book-cover-1',
  availability: 'In Stock',
  isbn: '978-0465050659',
  publisher: 'Basic Books',
  publishDate: '2013-11-05',
  pages: 368,
  language: 'English',
  isNew: true
},
{
  id: 'b7',
  title: 'Thinking, Fast and Slow',
  author: 'Daniel Kahneman',
  description:
  'The phenomenal New York Times Bestseller by Nobel Prize-winner Daniel Kahneman. The book takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
  price: 18.0,
  rating: 4.6,
  reviewCount: 6200,
  category: 'Non-Fiction',
  genre: 'Psychology',
  coverGradient: 'bg-book-cover-2',
  availability: 'Out of Stock',
  isbn: '978-0374533557',
  publisher: 'Farrar, Straus and Giroux',
  publishDate: '2011-10-25',
  pages: 499,
  language: 'English'
},
{
  id: 'b8',
  title: 'Project Hail Mary',
  author: 'Andy Weir',
  description:
  'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.',
  price: 14.5,
  originalPrice: 28.0,
  rating: 4.8,
  reviewCount: 5400,
  category: 'Fiction',
  genre: 'Science Fiction',
  coverGradient: 'bg-book-cover-3',
  availability: 'In Stock',
  isbn: '978-0593135204',
  publisher: 'Ballantine Books',
  publishDate: '2021-05-04',
  pages: 496,
  language: 'English',
  isNew: true,
  isBestseller: true
},
{
  id: 'b9',
  title: 'Introduction to Algorithms',
  author: 'Thomas H. Cormen',
  description:
  'Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness.',
  price: 85.0,
  rating: 4.4,
  reviewCount: 1200,
  category: 'Academic',
  genre: 'Computer Science',
  coverGradient: 'bg-book-cover-1',
  availability: 'Low Stock',
  isbn: '978-0262033848',
  publisher: 'MIT Press',
  publishDate: '2009-07-31',
  pages: 1312,
  language: 'English'
},
{
  id: 'b10',
  title: 'The Secret History',
  author: 'Donna Tartt',
  description:
  'Under the influence of their charismatic classics professor, a group of clever, eccentric misfits at an elite New England college discover a way of thinking and living that is a world away from the humdrum existence of their contemporaries.',
  price: 16.0,
  rating: 4.3,
  reviewCount: 3100,
  category: 'Fiction',
  genre: 'Literary Fiction',
  coverGradient: 'bg-book-cover-2',
  availability: 'In Stock',
  isbn: '978-1400031702',
  publisher: 'Vintage',
  publishDate: '2004-04-13',
  pages: 559,
  language: 'English'
}];


export const PROMOTIONS: Promotion[] = [
{
  id: 'p1',
  title: 'Summer Reading Sale',
  description:
  'Get 20% off all fiction titles to kickstart your summer reading list.',
  discount: 20,
  code: 'SUMMER20',
  validUntil: '2026-08-31'
},
{
  id: 'p2',
  title: 'Student Discount',
  description:
  '15% off all academic and technology books with a valid student ID.',
  discount: 15,
  code: 'STUDENT15',
  validUntil: '2026-12-31'
},
{
  id: 'p3',
  title: 'Welcome Bonus',
  description: 'New members get $10 off their first order over $50.',
  discount: 10,
  code: 'WELCOME10',
  validUntil: '2026-12-31'
}];


export const REVIEWS: Review[] = [
{
  id: 'r1',
  userId: 'u1',
  userName: 'Eleanor Vance',
  bookId: 'b1',
  rating: 5,
  comment:
  'Absolutely transformative. This book made me rethink all my past regrets and appreciate the life I have right now. Beautifully written.',
  date: '2026-02-15'
},
{
  id: 'r2',
  userId: 'u2',
  userName: 'Marcus Aurelius',
  bookId: 'b2',
  rating: 4,
  comment:
  "Very practical advice. I've already started implementing the 2-minute rule and it's making a huge difference in my daily routine.",
  date: '2026-03-01'
},
{
  id: 'r3',
  userId: 'u3',
  userName: 'Sarah Connor',
  bookId: 'b8',
  rating: 5,
  comment:
  "I couldn't put it down! The science is fascinating and the relationship between the main characters is heartwarming. A must-read for sci-fi fans.",
  date: '2026-03-05'
}];


export const ORDERS: Order[] = [
{
  id: 'ORD-2026-8932',
  userId: 'u1',
  date: '2026-03-02',
  status: 'Delivered',
  items: [
  { bookId: 'b1', quantity: 1, price: 14.99 },
  { bookId: 'b5', quantity: 2, price: 8.99 }],

  total: 32.97,
  trackingNumber: 'TRK9834759384',
  estimatedDelivery: '2026-03-05'
},
{
  id: 'ORD-2026-9011',
  userId: 'u1',
  date: '2026-03-06',
  status: 'Shipped',
  items: [{ bookId: 'b8', quantity: 1, price: 14.5 }],
  total: 14.5,
  trackingNumber: 'TRK9834759385',
  estimatedDelivery: '2026-03-09'
},
{
  id: 'ORD-2026-9105',
  userId: 'u2',
  date: '2026-03-07',
  status: 'Processing',
  items: [
  { bookId: 'b4', quantity: 1, price: 34.99 },
  { bookId: 'b6', quantity: 1, price: 16.99 }],

  total: 51.98,
  estimatedDelivery: '2026-03-12'
}];


export const MOCK_USER = {
  id: 'u1',
  name: 'Jane Austen',
  email: 'jane.austen@example.com',
  avatar: 'https://i.pravatar.cc/150?u=jane',
  joinDate: '2025-11-12',
  rewardPoints: 450
};