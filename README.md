# ========== intorduction ==========
    (need text)

    https://african-marketplace-dec-2021.herokuapp.com/

    https://trello.com/b/ENlDFbiN/african-marketplace-board

## ========== dependencies ==========
    (need text)

## ========== how to run the backend ==========

* download the project onto your local computer

* create a ".env" file and add the "NODE_ENV=development" into ".env" file

* run "npm i" to install node and related libraries

* make sure the PostgreSQL is installed

* make sure the PG Admin is installed

* make sure the PostgreSQL has the username "postgres" and password "P@$$w0rd" configured

* make sure the running server has a database called "market" for development, with username "postgres", password "P@$$w0rd", and connect of "127.0.0.1'

* make sure the running server has a database called "market_test" for testing, with username "postgres", password "P@$$w0rd", and connect of "127.0.0.1'


## ========== troubleshooting ==========
    (need text)

## ========== response code ==========
    
    Status Code | Description
    --- | --- 
    200 | request successfully processed 
    201 | successfully created the new record
    400 | the request could not be understood by the server
    401 | unauthorized request from an unknown user
    403 | unauthorized request from a known user
    404 | the request resource is not found on the server
    500 | unknown and/or unexpected error occured
    503 | the server is not ready to handle this request

## Endpoint Summary

        Method | Endpoint             |         Body (required)  | Body (optional)       | Notes
        ---    | -------------------- | -------------------------| --------------------- | -----
        POST   | /api/auth/register   | username, password, role | N/A | all string inputs. role must be "buyer" or "seller"
        POST   | /api/auth/login | username, password | N/A | N/A

## ========== endpoint /api/auth ==========

#### POST /api/auth/register
        (need text)

    
#### POST /api/auth/login
        (need text)

## ========== endpoint /api/users ==========

#### GET /api/users/
        (need text)

#### GET /api/users/:id
        (need text)
    
#### POST /api/users/
        (need text)
    
#### PUT /api/users/:id
        (need text)
    
#### DELETE /api/users/:id
        (need text)

## ========== endpoint /api/profiles ==========

#### GET /api/profiles/
        (need text)

#### GET /api/profiles/:id
        (need text)
    
#### POST /api/profiles/
        (need text)
    
#### PUT /api/profiles/:id
        (need text)
    
#### DELETE /api/profiles/:id
        (need text)

## ========== endpoint /api/products ==========

#### GET /api/products/
        (need text)

#### GET /api/products/:id
        (need text)
    
#### POST /api/products/
        (need text)
    
#### PUT /api/products/:id
        (need text)
    
#### DELETE /api/products/:id
        (need text)

## ========== endpoint /api/orders ==========

#### GET /api/orders/
        (need text)

#### GET /api/orders/:id
        (need text)
    
#### POST /api/orders/
        (need text)
    
#### PUT /api/orders/:id
        (need text)
    
#### DELETE /api/orders/:id
        (need text)