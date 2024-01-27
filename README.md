<a name="custom_anchor_name"></a>

# jwt basics :key:

## Concepts applied but not limited too

- ### node js
- ### express router
- ### routes and controllers
- ### rest API
- ### mongodb atlas
- ### nosql
- ### mongoose
- ### schema & model
- ### aws cloud database

---

### _goals_

- how we restrict access to certain routes?

---

### _notes_

- public routes
  - anyone can access them and use them as they please, not the ideal setup for the real world, you don't want random people to access data
- how can we restrict access?
  - using jwt, long strings
  - imagine we have two routes, dashboard and login
    - dashboard is protected, so we can get data, but have no access to the info. only if you login you get the token, and only when have the token you can access secret info.
- if a valid token is present in the request, the user can access specific info
  - not all info, only info that belongs to you
- if we have a restricted route, and if the token is not present or not valid, then the server will send back error response, and thats how we restrict access to certain routes (resources).

---

### _steps_

- setup basic express server
- setup two routes
  - start with making the controllers for them first
    - export them
    - one for login, register, sign-up, POST, we want to get user credentials
    - one for dashboard, GET
  - import the controllers in the routes
    - setup router
    - export router
  - import router in app js
- test in thunder client
- big picture
  - we have a post route called login, where we will check for username and password. located in req.body
  - if both exist we create a new jwt
    - if not, we send back error response
  - we send that jwt back to the front-end, since frontend needs it in order to send another successful request (the get request)
    - where we display the secret information
  - on the the server we can set up the authentication, where only the requests with jwt can access the secret dashboard
- checking for empty values 3 ways
  - mongoose requires validation, checks it for us, if value is not present error is returned, if we are connected to database
  - joi package, an entire additional layer of validation sitting in front of our requests
  - checking for those values in the controller

[Back to Top](#custom_anchor_name)
