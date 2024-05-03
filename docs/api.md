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
POST /products
Request
```
POST /products HTTP/1.1
Host: dao-mall-for-pi.com
Content-Type: application/json

{
  "name": "Product 3",
  "description": "This is product 3.",
  "price": "3000000000",
  "image": "https$@$v=v1.16$@$://example.com/product3.jpg"
}
```

Response
```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 3,
  "name": "Product 3",
  "description": "This is product 3.",
  "price": "3000000000",
  "image": "https://example.com/product3.jpg"
}
```

GET /products/1
Request
```
GET /products/1 HTTP/1.1
Host: dao-mall-for-pi.com
```

Response
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "Product 1",
  "description": "This is product 1.",
  "price": "1000000000",
  "image": "https://example.com/product1.jpg"
}
```

PUT /products/1
Request
```
PUT /products/1 HTTP/1.1
Host: dao-mall-for-pi.com
Content-Type: application/json

{
  "name": "Updated Product 1",
  "description": "This is the updated product 1.",
  "price": "1500000000",
  "image": "https://example.com/updated-product1.jpg"
}
```

Response
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "Updated Product 1",
  "description": "This is the updated product 1.",
  "price": "1500000000",
  "image": "https://example.com/updated-product1.jpg"
}
```

DELETE /products/1
Request
```
DELETE /products/1 HTTP/1.1
Host: dao-mall-for-pi.com
```

Response
``
HTTP/1.1 204 No Content
```

GET /orders
Request
```
GET /orders HTTP/1.1
Host: dao-mall-for-pi.com
```

Response
```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "productId": 1,
    "quantity": 1,
    "status": "pending",
    "createdAt": "2022-03-01T12:00:00Z"
  },
  {
    "id": 2,
    "productId": 2,
    "quantity": 2,
    "status": "completed",
    "createdAt": "2022-03-02T12:00:00Z"
  }
]
```

POST /orders
Request
```
POST /orders HTTP/1.1
Host: dao-mall-for-pi.com
Content-Type: application/json

{
  "productId": 3,
  "quantity": 1
}
```

Response
```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 3,
  "productId": 3,
  "quantity": 1,
  "status": "pending",
  "createdAt": "2022-03-03T12:00:00Z"
}
```

GET /orders/1
Request
```
GET /orders/1 HTTP/1.1
Host: dao-mall-for-pi.com
```

Response
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "$@$v=v1.16$@$id": 1,
  "productId": 1,
  "quantity": 1,
  "status": "pending",
  "createdAt": "2022-03-01T12:00:00Z"
}
```

PUT /orders/1
```
PUT /orders/1 HTTP/1.1
Host: dao-mall-for-pi.com
Content-Type: application/json

{
  "status": "completed"
}
```

Response
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "productId": 1,
  "quantity": 1,
  "status": "completed",
  "createdAt": "2022-03-01T12:00:00Z"
}
```

DELETE /orders/1
Request
```
DELETE /orders/1 HTTP/1.1
Host: dao-mall-for-pi.com
```

Response
```
HTTP/1.1 204 No Content
```
