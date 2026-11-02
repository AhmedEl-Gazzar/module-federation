import React, { useState } from 'react';
import './Products.css';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  emoji: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', price: 79.99, originalPrice: 129.99, rating: 4, reviews: 2341, badge: 'Sale', emoji: '🎧' },
  { id: 2, name: 'Running Sneakers Pro', category: 'Footwear', price: 109.95, rating: 5, reviews: 876, badge: 'New', emoji: '👟' },
  { id: 3, name: 'Minimalist Leather Wallet', category: 'Accessories', price: 34.99, originalPrice: 49.99, rating: 4, reviews: 512, emoji: '👛' },
  { id: 4, name: 'Stainless Steel Water Bottle', category: 'Kitchen', price: 24.99, rating: 5, reviews: 1890, badge: 'Best Seller', emoji: '🍶' },
  { id: 5, name: 'Yoga Mat Premium', category: 'Sports', price: 44.99, rating: 4, reviews: 634, emoji: '🧘' },
  { id: 6, name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 59.99, originalPrice: 89.99, rating: 4, reviews: 1102, badge: 'Sale', emoji: '🔊' },
  { id: 7, name: 'Ceramic Coffee Mug Set', category: 'Kitchen', price: 29.99, rating: 5, reviews: 408, emoji: '☕' },
  { id: 8, name: 'Sunglasses UV400', category: 'Accessories', price: 54.99, rating: 4, reviews: 297, badge: 'New', emoji: '🕶️' },
];

const CATEGORIES = ['All', 'Electronics', 'Footwear', 'Accessories', 'Kitchen', 'Sports'];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <span className="products__stars" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star star--filled' : 'star'}>★</span>
    ))}
  </span>
);

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState<number[]>([]);

  const filtered = PRODUCTS
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured — keep original order
    });

  const addToCart = (id: number) => setCart(prev => [...prev, id]);

  return (
    <div className="products-page">
      {/* Page header */}
      <div className="products-page__hero">
        <h1 className="products-page__heading">Our Products</h1>
        <p className="products-page__subheading">
          Discover {PRODUCTS.length}+ handpicked items across all categories.
        </p>
      </div>

      {/* Toolbar */}
      <div className="products-page__toolbar">
        {/* Category filters */}
        <div className="products-page__filters" role="group" aria-label="Filter by category">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn${activeCategory === cat ? ' filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + result count */}
        <div className="products-page__sort-row">
          <span className="products-page__count">{filtered.length} items</span>
          <select
            className="products-page__sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="products-grid">
        {filtered.map(product => {
          const inCart = cart.includes(product.id);
          const discount = product.originalPrice
            ? Math.round((1 - product.price / product.originalPrice) * 100)
            : null;

          return (
            <article key={product.id} className="product-card">
              {/* Badge */}
              {product.badge && (
                <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase().replace(' ', '-')}`}>
                  {product.badge}
                </span>
              )}

              {/* Image placeholder */}
              <div className="product-card__image-wrap">
                <span className="product-card__emoji">{product.emoji}</span>
              </div>

              {/* Info */}
              <div className="product-card__body">
                <p className="product-card__category">{product.category}</p>
                <h2 className="product-card__name">{product.name}</h2>

                <div className="product-card__rating">
                  <StarRating rating={product.rating} />
                  <span className="product-card__reviews">({product.reviews.toLocaleString()})</span>
                </div>

                <div className="product-card__pricing">
                  <span className="product-card__price">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="product-card__original">${product.originalPrice.toFixed(2)}</span>
                      <span className="product-card__discount">-{discount}%</span>
                    </>
                  )}
                </div>

                <button
                  className={`product-card__cta${inCart ? ' product-card__cta--added' : ''}`}
                  onClick={() => addToCart(product.id)}
                  disabled={inCart}
                >
                  {inCart ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Cart toast */}
      {cart.length > 0 && (
        <div className="products-page__toast" role="status">
          🛒 {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
        </div>
      )}
    </div>
  );
};

export default Products;
