# nodosaurus: A Hapi API

![alt tag](http://www.dinosaurjungle.com/greenst_nodosaurus.jpg)

## Why?
I wanted to learn more about Hapi. This is a "port" of MEAN JS in a lot of ways.
It is a not a direct port as it does add/remove a few things. What a great way to learn...
This project is as-is for suresies. If you see an error send a pull request or fill out an issue.

## What's inside

* Hapi
* Hapi ecosystem (lab, good, boom, etc)
* MongoDB + mongoose
* JWT authentication
* Basic Stripe implementation. (Based on Node Stripe example)

## Coming soon

 * More tests. Lab makes these so EASY!
 * Add npm scripts for test coverage - currently very low.
 * Bug fixes and things I missed.
 * Verifying status codes with Boom (Copy/Paste mistakes)
 * Update to latest Hapi version. (CORS issues)
 * Learn more about Hapi and refactor this code.
 * Better github info for releases, commits, etc.

## Getting started

* Clone/Fork the repo
* Have Node installed
* npm install within the project structure
* node/nodemon server.js
* Grab the nodosaurus-aurelia-client repo to test the stripe integration.
* Build things.

Visit post to the following.
```
POST   /api/articles                  
GET    /api/articles                  
DELETE /api/articles/{articleId}      
PUT    /api/articles/{articleId}      
GET    /api/articles/{articleId}      
POST   /auth/forgot                   
POST   /auth/login                    
PUT    /auth/me                       
GET    /auth/me                       
DELETE /auth/me/delete                
POST   /auth/password                 
POST   /auth/signup                   
GET    /reset/{token}                 
POST   /reset/{token}                 
POST   /stripe/webhooks               
POST   /users/billing                 
POST   /users/plan            
```




## Credits
* MEAN.JS project as this is a port of that code.
* Frame - User API written in Hapi
* Hapi-Boilerplate (Basic structure of this project)
* Hapi website. Docs are rock solid on that site.
