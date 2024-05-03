# DAO Mall for Pi API

This document provides an overview of the DAO Mall for Pi API.

## Endpoints

### /products

#### GET

Returns a list of products available in the marketplace.

#### POST

Creates a new product in the marketplace.

#### Parameters

- `name`: The name of the product.
- `description`: The description of the product.
- `price`: The price of the product in Pi.
- `image`: The URL of the product image.

### /products/:id

#### GET

Returns the details of a specific product.

#### PUT

Updates the details of a specific product.

#### DELETE

Deletes a specific product.

### /orders

#### GET

Returns a list of orders placed by the user.

#### POST

Places a new order for a product.

#### Parameters

- `productId`: The ID of the product.
- `quantity`: The quantity of the product.

### /orders/:id

#### GET

Returns the details of a specific order.

#### PUT

Updates the details of a specific order.

#### DELETE

Cancels a specific order.

## Examples

### GET /products

#### Request

```bash
GET /products HTTP/1.1
Host: dao-mall-for-pi.com
```

Response

```
1. HTTP/1.1 200 OK
2. Content-Type: application/json
3.
4. [
5.  {
6.   "id": 1,
7.   "name": "Product 1",
8.    "description": "This is product 1.",
9.    "price": "1000000000",
10.    "image": "https://example.com/product1.jpg"
11.  },
12.  {
13.    "id": 2,
14.    "name": "Product 2",
15.    "description": "This is product 2.",
16.    "price": "2000000000",
17.    "image": "https://example.com/product2.jpg"
18.  }
19. ]
```
