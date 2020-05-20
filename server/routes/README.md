## Server API

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
  "imagess": "String",
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
  "id": "String",
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

- PATCH `/api/shoes/:id`

**Path Parameters:**

- `id` shoes id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
{
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

