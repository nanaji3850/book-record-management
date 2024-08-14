# book-record-management
server >> storing certain book data
       >> user registration
       >> subscriber

This is a book record management API server / backend for the library system or management of records or manuals or books

Fine System:
User: 06/03/2023 - 06/06/2023
09/06/2023 => 50*3=150/-

3 months 
6 months
12 months

# routes and Endpoints
## /users
POST: Create a new user
GET: Get all the user info here

## /users/{id}
GET: Get a user by id
PUT: Update auser by their ID
DELETE: delete a user by id (check if he/she still have an issued book) && (is there any fine to paid)

## /users/subscription-details/{id}
GET: Get user subscription details
     >> Data of Subscription 
     >> Valid till
     >> Is there any fine

## /books
GET: Get all the books
POST: Create/Add a new book

## /books/{id}
GET: Get a book by id
PUT: Update a book by id

## /books/issued
GET: Get all issued books

## /books/issued/withFine
GET: Get all issued books with their fine


## npm init
## npm i nodemon --save-dev
## npm run dev