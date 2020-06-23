### Back-end system design of a full-stack shoe e-commerce microservice

Microservice was deployed to AWS EC2 and scaled horizontally across twelve EC2 instances behind an NGINX load balancer to handle over 3100 requests per second, with below 500ms latency, simulating production level traffic.


## Project Goals
- The goal of this project was to create the backend to handle:
- 3,000 requests per second
- less than 1.0s latency under load
- less than 1.0% error rate under load

## Outcome - Stress Test Metrics

- 3,100+ requests per second
- 0.5s latency 
- 0.0% error rate

![Choose Date](https://i.imgur.com/lPudaL7.png?1)

## Front-end Demo

![Choose Date](https://i.imgur.com/mKfr4JG.png)
## Getting Started

To download dependencies:
```
npm install
```
To start the server:
```
npm run start

```
## API Routes

### Get Related Products

- GET `/api/shoes/:id/relatedproducts`

**Path Parameters:**

- `id` shoes id

**Success Status Code:** `200`

**Returns:** JSON

```json
{
  "id": "String",
  "title": "String",
  "images": "String",
  "price": "Number",
  "href": "String"
}
```

### Add Shoes Products

- POST `/api/shoes`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
{ 
  "shoe_id":"String",
  "title": "String",
  "images": "String URL",
  "price": "Number",
  "href": "String URL",
  "related_products": "Array of product IDs",
}
```

### Add likes to shoes

- POST `/api/shoes/:id/likes/:userid`

**Path Parameters:**

- `id` shoes id
- `userid` users id

**Success Status Code:** `201`


### Update shoes info

- PUT `/api/shoes/update/:id`

**Path Parameters:**

- `id` shoes id

**Success Status Code:** `204`

**Request Body**: Expects JSON with all of the following keys

```json
{ "shoe_id": "String",
  "title": "String",
  "images": "String URL",
  "price": "Number",
  "href": "String URL",
  "related_products": "Array of product IDs",
}
```

### Delete shoes

- DELETE `/api/shoes/:id`

**Path Parameters:**

- `id` shoes id

**Success Status Code:** `204`

## 
