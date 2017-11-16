# AdviseMe

## Getting Started

### Prerequisites
* [Node](https://nodejs.org/en/) version 8.5.0 or higher
* [NPM](https://www.npmjs.com/) version 5.3.0 or higher
  * [Download Node and NPM](https://nodejs.org/en/)
* [Angular CLI](https://cli.angular.io/) version 1.4.4 or higher (*should be saved in devDependencies*)
  * ```npm install -g @angular/cli@latest```

### Installing
* Clone this repo
  * ```git clone https://github.com/SCCapstone/AdviseMe.git```
* Install Prerequisites
  * LOOK ABOVE
* ```cd <path>/AdviseMe```
  * ```cd adviseme-api/```
    * ```npm install```
    * if any issues occur 
      * Delete node_module file and package-lock.json file and try again
  * ```cd adviseme-webapp/```
    * ```npm install```
    * if any issues occur 
      * Delete node_module file and package-lock.json file and try again
* Install [MongoDB](https://www.mongodb.com/what-is-mongodb)
  * [Download](https://docs.mongodb.com/getting-started/shell/installation/)

## Deployment
* 3 TERMINALS REQUIRED
* Terminal 1 : Starts mongo database
  *```mongod```
* Terminal 2 : Starts the Express server
  * ```cd <path>/AdviseMe/adviseme-api/```
  * ```nodemon server```
  * If cannot find module ```npm install --save <package-name>```
* Terminal 3 : Builds the webapp 
  * ```cd <path>/AdviseMe/adviseme-webapp/```
  * ```ng build --watch```
* Web Browser: ```http://localhost:3000/```

## Unit Tests
* Run ```ng test``` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Built With
* [Angular4](https://angular.io/)
* [NodeJS](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)

## Contributing
1. **Fork** the repo
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a **Pull request** so that we can review your changes

Note: Be sure to merge the latest from "upstream" before making a pull request!:

### Extended Contributing
* **Component**  ``` ng g component my-new-component ```
* **Service**  ``` ng g service my-new-service ```
* **Module**  ``` ng g module my-new-module ```
* **IF YOU DON'T KNOW WHERE SOMETHING GOES... ASK**

* npm install --save [packages] 

## Versioning

## Authors

* **Tyler Hall**
* **Ethan Harmon**
* **Tyler Moon**
* **Lawton Mizell**
* **Diego Valdes**

## License
MIT

## Acknowledgments
