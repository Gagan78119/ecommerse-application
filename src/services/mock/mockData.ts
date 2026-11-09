import type { Category, Product } from '@/types';

/** Mock catalog (prices in INR). Images are keyword-based photos from loremflickr. */
const img = (keyword: string, lock: number) =>
  `https://loremflickr.com/300/300/${keyword}?lock=${lock}`;

export const categories: Category[] = [
  { id: 'cat-fruits-veg', name: 'Fruits & Vegetables' },
  { id: 'cat-prepared', name: 'Prepared Foods' },
  { id: 'cat-canned', name: 'Canned Foods' },
  { id: 'cat-frozen', name: 'Frozen Foods' },
];

const p = (
  id: string,
  name: string,
  price: number,
  unit: string,
  keyword: string,
  categoryId: string,
  description: string,
  rating: number,
): Product => ({ id, name, price, unit, imageUrl: img(keyword, Number(id.slice(2))), categoryId, description, rating });

export const products: Product[] = [
  p('p-001', 'Banana', 50, '6 pcs', 'banana', 'cat-fruits-veg', 'Fresh, ripe bananas. Great for smoothies, baking or a quick snack.', 4.5),
  p('p-002', 'Blackberries', 200, '500 g', 'blackberries', 'cat-fruits-veg', 'Juicy, sweet blackberries packed with antioxidants.', 4.4),
  p('p-003', 'Strawberries', 120, '250 g', 'strawberries', 'cat-fruits-veg', 'Sweet red strawberries picked at peak ripeness.', 4.6),
  p('p-004', 'Green Apple', 180, '1 kg', 'greenapple', 'cat-fruits-veg', 'Crisp, tangy green apples. Perfect eaten fresh or in salads.', 4.2),

  p('p-005', 'Cupcake', 60, '3 pcs', 'cupcake', 'cat-prepared', 'Soft, freshly baked cupcakes topped with creamy frosting.', 4.7),
  p('p-006', 'Instant Noodles', 30, '80 g', 'noodles', 'cat-prepared', 'Ready in 3 minutes. Spicy masala flavour.', 4.1),
  p('p-007', 'Veg Sandwich', 80, '1 pc', 'sandwich', 'cat-prepared', 'Grilled sandwich with fresh veggies and cheese.', 4.3),
  p('p-008', 'Pasta', 110, '250 g', 'pasta', 'cat-prepared', 'Creamy white-sauce pasta, heat and eat.', 4.2),

  p('p-009', 'Green Peas', 250, '500 g', 'greenpeas', 'cat-canned', 'Tender green peas, canned fresh for year-round use.', 4.2),
  p('p-010', 'Tomato', 220, '250 g', 'tomato', 'cat-canned', 'Whole peeled tomatoes in rich tomato juice.', 4.4),
  p('p-011', 'Baked Beans', 140, '400 g', 'beans', 'cat-canned', 'Slow-cooked beans in tangy tomato sauce.', 4.1),
  p('p-012', 'Sweet Corn', 110, '340 g', 'sweetcorn', 'cat-canned', 'Golden sweet corn kernels, ready for salads and soups.', 4.0),

  p('p-013', 'Frozen Peas', 130, '500 g', 'peas', 'cat-frozen', 'Flash-frozen peas that keep their colour and taste.', 4.2),
  p('p-014', 'French Fries', 150, '400 g', 'fries', 'cat-frozen', 'Crispy golden fries, oven or air-fryer ready.', 4.5),
  p('p-015', 'Ice Cream', 220, '500 ml', 'icecream', 'cat-frozen', 'Creamy vanilla ice cream tub.', 4.6),
  p('p-016', 'Chicken Nuggets', 280, '400 g', 'nuggets', 'cat-frozen', 'Crispy breaded chicken nuggets.', 4.1),
];
