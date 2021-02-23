Software Engineering
Web Application Automated Systems (WAAS) for Penelope's Collectionz

frontend folder is allocated for React.js while the css,html,js folders are considered to be template of initial stage of the web application development.

Use-Case Diagram:

1. Login - Registration, Logout, Forgot Password Function
2. View the Application - Product Information, Clickable Image
3. Purchase Product - Edit cart, Fill-up Order Form, Checkout
4. Manage Products - Add Product, Remove Product, Edit Product
5. Manage User Information - Profile Page, Collecting Order Form

Javelin Board:

1. Content Management for Products
2. Link from social media to main website and vice versa
3. Separate user accounts for business
4. Inquiry system - Chat system
5. E-Receipt

Documentation:

1. HTML was used to structure the web page
2. CSS was used for the design and appearance
   a. Bootstrap 5 was also utilized.
3. JS was used as the web application would be dynamic.

4. Documentation numbers 1-3 are then transferred into React.js

Technologies Used:

1. HTML
2. CSS
3. JavaScript
4. Bootstrap 5 / React-Bootstrap
5. Node.JS (npm)
6. React.JS
7. React Router = Page Navigation
8. Firebase

**To install React.js**

1. download and install node.js latest version
2. ctrl+` in VSC
3. npx create-react-app appname
4. cd appname
5. npm start
6. to install react-bootstrap: npm install bootstrap react-bootstrap
7. to install react router: npm install react-router-dom
8. to install firebase: npm install firebase
9. to install redux-thunk: npm install redux-thunk
10. to install redux: npm install react-redux redux-logger
11. to install redux-saga: npm install react-saga
12. to install react-router-hash-link: npm install --save react-router-hash-link
13. to install slider: npm install --save react-awesome-slider / npm install react-slick --save
14. to install ckeditor:npm i ckeditor4-react _or_ npm install --save @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic
15. to install fit-text: npm install --save use-fit-text

**When cloning this repository from github**

1. Clone from VS code or download zipline from the repository
2. open the folder in VS code
3. ctrl + `
4. cd frontend
5. npm install
6. npm start

React-hooks:

1. useState
2. useEffect

Saga:
1.types
2.action
3.sagas
4.helper

Files:
-Assets: Media such as images or videos
-Components: Components of website such as headers, , etc.
-Layouts: Main layouts / structures of pages.
-Pages: Pages like Homepage, ,etc.

Features:
Note: \* - not yet completed

1. Login
   Components
   a. Login button
   - Throws an error when an invalid email and password is submitted
   - Redirects the user to the homepage / products page when logged in successfully.
     b. Registration button
     Components:
     i. Input Fields
     Throws an error when:
     - a field is blank
     - the names submitted contains numbers
     - the contact number does not match the requested format
     - the submitted email address exists already - the password is below 6 characters
     - the password and the confirm password doesn't match
       ii. Reset button - resets the page
       iii. Signup button - redirects the user to the homepage/products page when the registration is complete
       c. Forget Password link
       i. Input Fields
       Throws an error when - a field is blank - the submitted email is not registered yet / does not exist in the database.
       ii. Submit button - sends an email to the submitted Email Address and then when the password has been reset
2. View the Application
   Components:
   1. Products Page  
      Components
      a. Hamburger menu - floats in the upper left corner below the header - enables the user to navigate through the products page
      b. What's New Section - Contains a large carousel (editable)\*
      c. Best Sellers Section - displays top 5 products with highest sales count in a carousel*
      d. Hot Deals Section - displays 3 promos / deals in a carousel (editable)* - this will be clickable redirecting the user to the product page of the selected item\*
      e. Products Section - has an inifinite scroll pagination - has a category button - displays the latest products first - products are contained within a card and displays image, name, and price
   2. About Us Page
      - contains information about the business and the owners (editable)\*
      - both owners has their own card which will be linked with their social media accounts
   3. Contact Us Page\*
      - contains contact information about the business and the owners (editable)\*
      - has social media/ecommerce platform buttons which will redirect to the shop's facebook page, instagram account, and shopee account
