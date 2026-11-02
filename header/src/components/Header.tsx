import React, { useState } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [cartCount] = useState(3);

  return (
    <header className="header">
      <div className="header__inner">
        {/* Logo */}
        <a href="/" className="header__logo">
          <span className="header__logo-icon">🛍️</span>
          <span className="header__logo-text">Horizon</span>
        </a>

        {/* Nav */}
        <nav className="header__nav">
          <a href="/" className="header__nav-link">Home</a>
          <a href="/shop" className="header__nav-link">Shop</a>
          <a href="/deals" className="header__nav-link">Deals</a>
          <a href="/about" className="header__nav-link">About</a>
        </nav>

        {/* Actions */}
        <div className="header__actions">
          <div className="header__search">
            <input
              type="text"
              placeholder="Search products…"
              className="header__search-input"
            />
            <button className="header__search-btn" aria-label="Search">
              🔍
            </button>
          </div>

          <button className="header__cart" aria-label="Cart">
            🛒
            {cartCount > 0 && (
              <span className="header__cart-badge">{cartCount}</span>
            )}
          </button>

          <button className="header__account" aria-label="Account">
            👤
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
