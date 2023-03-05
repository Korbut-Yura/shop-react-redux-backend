// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "product-service",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "List of products",
        "description": "Request all available products",
        "operationId": "getProductsList.get.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "success",
            "schema": {
              "$ref": "#/definitions/ProductsList"
            }
          }
        }
      }
    },
    "/products/{productId}": {
      "get": {
        "summary": "Product details",
        "description": "Request available product by Id",
        "operationId": "getProductsById.get.products/{productId}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "success",
            "schema": {
              "$ref": "#/definitions/Product"
            }
          },
          "404": {
            "description": "fail",
            "schema": {
              "$ref": "#/definitions/ErrorBody"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Product": {
      "properties": {
        "id": {
          "title": "Product.id",
          "type": "string"
        },
        "title": {
          "title": "Product.title",
          "type": "string"
        },
        "description": {
          "title": "Product.description",
          "type": "string"
        },
        "price": {
          "title": "Product.price",
          "type": "number"
        }
      },
      "required": [
        "id",
        "title",
        "description",
        "price"
      ],
      "additionalProperties": false,
      "title": "Product",
      "type": "object"
    },
    "ProductsList": {
      "properties": {
        "products": {
          "items": {
            "$ref": "#/definitions/Product",
            "title": "ProductsList.products.[]"
          },
          "title": "ProductsList.products",
          "type": "array"
        }
      },
      "required": [
        "products"
      ],
      "additionalProperties": false,
      "title": "ProductsList",
      "type": "object"
    },
    "ErrorBody": {
      "properties": {
        "message": {
          "title": "ErrorBody.message",
          "type": "string"
        }
      },
      "required": [
        "message"
      ],
      "additionalProperties": false,
      "title": "ErrorBody",
      "type": "object"
    }
  },
  "securityDefinitions": {},
  "basePath": "/dev"
};