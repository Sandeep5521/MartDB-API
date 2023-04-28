# Mart-API

Welcome to the MartDB eCommerce Shopping Products API! Our API provides free access to a wide range of products from various categories, allowing you to retrieve detailed information about each product, including its name, description, price, images, reviews, and more.

Our API is currently deployed on Render and can be accessed through the following URL: https://martdb.onrender.com/. It is also being used by our eCommerce website, IndiMart, which is also deployed on Render and can be accessed through the following URL: https://indimart.onrender.com/.

To use our API, simply make HTTP requests to our endpoints, passing the necessary parameters to retrieve the desired information. Our API supports various HTTP methods, including GET, POST, PUT, and DELETE, allowing you to perform various operations on our product database.


## API Reference

#### Get all products

```http
  GET /products
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `string` | **Optional**. Page number of products to fetch                     
| `limit`      | `string` | **Optional**. Page limit of products to fetch |

#### Get product by id

```http
  GET /products?id={id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. _Id of product to fetch |

#### Get products by Category

```http
  GET /products?cat=mobiles
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cat`      | `string` | **Required**. category of product to fetch |

#### Get product by Name

```http
  GET /products?name={name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. title of product to fetch |

#### Get All Categories

```http
  GET /category
```

#### Get Single Random Product

```http
  GET /random
```
#### Post Single Product

```http
  POST /products
```

```
{
  "title": "AVANT Men's Grey/Black Running Shoes - 8 UK",
  "description": "MAXIMUM COMFORT: From rigorous running to high intensity training this shoe has got you covered. It has a soft cushioning to give the feet maximum comfort.The design ensures full comfort with spacious yet secure fit. It is lightweight and breathable with high density backing. The engineered backing across the vamp & collar provides stretch & comfort where needed",
  "thumbnail": "https://m.media-amazon.com/images/I/61xJ6SfB-eL._SY450_.jpg",
  "price": 1599,
  "discountPrice": 649,
  "brand": "AVANT",
  "category": "mens-shoes",
  "images": [
    "https://m.media-amazon.com/images/I/61xJ6SfB-eL._SY450_.jpg",
    "https://m.media-amazon.com/images/I/51jXZccor9L._SY450_.jpg",
    "https://m.media-amazon.com/images/I/61Ya9D4xdGL._SY450_.jpg",
    "https://m.media-amazon.com/images/I/617OZ-jgYlL._SY450_.jpg",
    "https://m.media-amazon.com/images/I/51bjbbhBPxL._SY450_.jpg"
  ]
}
```
