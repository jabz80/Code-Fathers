THIS IS A TEMPLATE FOR THE PROJECTS (YOU CAN CHANGE STUFF)

There are 2 package.json files. 1 for the client-side and the other for the server-side.
MAKE SURE TO INSTALL BOTH BY GOING INTO EACH FOLDER IN THE COMMAND LINE.
2 Because deployment would be so much easier.

CLIENT SIDE:

- main.js is set up
- Basic Header component for navigation set up
- Basic routes set up in app.js
- Example provider (useContext) added, make sure to rename appropriately

SERVER SIDE:

- Routers, Models, and Controllers already have example files inside to follow naming conventions (e.g. if it's capitalised on first word or if it's plural or not)
- The Database folder has the set up in place. ONLY thing MISSING is the sql for the database.

AGAIN THIS A TEMPLATE AND YOU CAN CHANGE STUFF

AUTH:
const options = {
headers: {
'Authorization': localStorage.getItem("token")
}
}
const response = await fetch("http://localhost:3000/INSERT-ROUTE", options);
