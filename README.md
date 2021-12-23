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

<table border="1" cellpadding="4" cellspacing="0">
        <thead>
                <tr>
                        <th align="center">Method</th>
                        <th align="center">Endpoint</th>
                        <th align="center">Body (require)</th>
                        <th align="center">Body (optional)</th>
                        <th align="center">Notes</th>
                </tr>
        </thead>
        <tbody>
                <tr valign="top">
                        <td align="center">POST</td>
                        <td align="center">/api/auth/register</td>
                        <td align="center">username, password, role</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string </br>* role is "buyer" or "seller"</td>
                </tr>
                <tr valign="top">
                        <td align="center">POST</td>
                        <td align="center">/api/auth/login</td>
                        <td align="center">username, password, role</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string </br>* role is "buyer" or "seller"</td>
                </tr>
                <tr><td></td></tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api/users/</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left"></td>
                </tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api/users/:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left"></td>
                </tr>
                <tr valign="top">
                        <td align="center">POST</td>
                        <td align="center">/api/users/</td>
                        <td align="center">username, password, role</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string </br> * role must be "buyer" or "seller"</td>
                </tr>
                <tr valign="top">
                        <td align="center">PUT</td>
                        <td align="center">/api/users/:id</td>
                        <td align="center">N/A</td>
                        <td align="center">username or password</td>
                        <td align="left">* all inputs are string </br> * role must be "buyer" or "seller"</
                </tr>
                <tr valign="top">
                        <td align="center">DELETE</td>
                        <td align="center">/api/users/:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left"></td>
                </tr>
                <tr><td></td></tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api/profiles/</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left"></td>
                </tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api/profiles/:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left"></td>
                </tr>
                <tr valign="top">
                        <td align="center">POST</td>
                        <td align="center">/api/profiles/</td>
                        <td align="center">first_name, last_name, email, user_id</td>
                        <td align="center">middle_name</td>
                        <td align="left">* all inputs are string, except user_id</br>* user_id is integer</td>
                </tr>
                <tr valign="top">
                        <td align="center">PUT</td>
                        <td align="center">/api/profiles/:id</td>
                        <td align="center">N/A</td>
                        <td align="center">first_name, middle_name, last_name, email</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">DELETE</td>
                        <td align="center">/api/profiles/:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left"></td>
                </tr>
                <tr><td></td></tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api/categories/</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left"></td>
                </tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api/categories/:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left"></td>
                </tr>
                <tr valign="top">
                        <td align="center">POST</td>
                        <td align="center">/api/categories/</td>
                        <td align="center">name, description</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">PUT</td>
                        <td align="center">/api/categories/:id</td>
                        <td align="center">N/A</td>
                        <td align="center">...</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">DELETE</td>
                        <td align="center">/api/categories/:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr><td></td></tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api//</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">POST</td>
                        <td align="center">/api//</td>
                        <td align="center">...</td>
                        <td align="center">...</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">PUT</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">...</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">DELETE</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr><td></td></tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api//</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">POST</td>
                        <td align="center">/api//</td>
                        <td align="center">...</td>
                        <td align="center">...</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">PUT</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">...</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">DELETE</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr><td></td></tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api//</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">POST</td>
                        <td align="center">/api//</td>
                        <td align="center">...</td>
                        <td align="center">...</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">PUT</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">...</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">DELETE</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr><td></td></tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api//</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">GET</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">POST</td>
                        <td align="center">/api//</td>
                        <td align="center">...</td>
                        <td align="center">...</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">PUT</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">...</td>
                        <td align="left">* all inputs are string</td>
                </tr>
                <tr valign="top">
                        <td align="center">DELETE</td>
                        <td align="center">/api//:id</td>
                        <td align="center">N/A</td>
                        <td align="center">N/A</td>
                        <td align="left">* all inputs are string</td>
                </tr>
        </tbody>
</table>

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