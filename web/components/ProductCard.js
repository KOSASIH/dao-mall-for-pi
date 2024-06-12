import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button, Rating, Typography } from '@material-ui/core';
import { addToCart } from '../api/cart';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load product image lazily
    const image = new LazyLoadImage({
      src: product.image,
      alt: product.name,
      threshold: 1000,
    });
  }, [product.image]);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addToCart(product, quantity);
      onAddToCart(product, quantity);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <LazyLoadImage src={product.image} alt={product.name} />
      <div className="product-info">
        <Typography variant="h2">{product.name}</Typography>
        <Typography variant="body1">{product.description}</Typography>
        <Rating value={product.rating} readOnly />
        <Typography variant="h3">Price: {product.price}</Typography>
        <div className="quantity-input">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
