# Poll Please
Poll Please was created for all my fellow indecisive decision makers. I personally spent hours or even days before deciding on a purchase. This way, you can enlist the help of your family/friends/peers/strangers to make that decision for you.

**Link to project:** https://pollplease.up.railway.app/
 
![Screen Shot 2022-09-21 at 7 35 49 PM](https://user-images.githubusercontent.com/99847030/191628544-c73b0244-32e4-4c22-b22f-fb4f81084dc5.jpg)


## How It's Made:

**Tech used:** HTML, CSS, JavaScript, EJS, Express, Node, MongoDB, Nodemon, Body Parser, Dotenv

Step 1: Configure files + set up dependencies using npm install + add required connections <br>

Step 2: Connecting to the database <br>
1. Open MongoAtlas and create a new project and database 
2. Create database user with user/pass 
3. Add IP Address and connect application 
4. Copy connection string + paste in .env file with correct password

Step 3: Routes for CRUD operations <br>
1. POST method for user to create poll options + send to database
2. GET method to get read poll options from database + show to user using EJS
3. CREATE method for user to make selection input + send to database
4. READ method to get poll options from database to display for poll results
5. PUT method to update the poll results of selections
6. DELETE method for user to delete poll options + update database
7. LISTEN method to connect to relevant port

Step 4: Frontend work - add html/ejs + basic css styling

Step 5: Make .gitignore to hide relevant files

Make regular commits and push to Github!

## Optimizations

Ideally, I want and plan to remake this in React using re-usable dynamically generated components for each poll option. I am also hoping to find an existing API that automatically generates custom links or possibly use authentication per user. 

## Lessons Learned:

This app was built to practice CRUD operations using Express, Node and MongoDB. I spent a lot of time looking through docs/StackOverflow when I got stuck on certain logic pertaining to the following routes or pulling data from the database. I also learned how to link css styles to EJS. 

## Examples:
Take a look at these couple examples that I have in my own portfolio:

**Manifest:** https://github.com/jasminepvo/manifest

**Etch A Sketch:** https://github.com/jasminepvo/etch-a-sketch

**Rock Paper Scissors:** https://github.com/jasminepvo/rock-paper-scissors



