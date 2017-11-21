# AdviseMe

## Getting Started

### Prerequisites
* [Node](https://nodejs.org/en/) version 8.5.0 or higher
* [NPM](https://www.npmjs.com/) version 5.3.0 or higher
  * [Download Node and NPM](https://nodejs.org/en/)
* [Angular CLI](https://cli.angular.io/) version 1.4.4 or higher (*should be saved in devDependencies*)
  * ```npm install -g @angular/cli@latest```
* [MongoDB](https://docs.mongodb.com/getting-started/shell/installation/)
* Nodemon
  * ```npm install -g nodemon```

### Installing
* Clone this repo
  * ```git clone https://github.com/SCCapstone/AdviseMe.git```
* Install Prerequisites (Check the above section)
* ```cd <path>/AdviseMe```
  * ```cd adviseme-api/```
    * ```npm install```
  * ```cd adviseme-webapp/```
    * ```npm install```
* Note: If the npm install throws an error:
  * If it says a module is not installed run ```npm install --save <module name>```
  * If it says that an invalid character was read at the end of the line delete the node_module folder and the package-lock.json file and try the ```npm install``` command again
* Create a local database
  * A binory BSON dump of the database can be found: AdviseMe/adviseme-database/adviseMe

   * Ensure Mongo has been started on your local machine using:
 ```$ sudo service mongod start```
 or
 ```$ sudo service mongod restart```
  * Use mongorestore to restore the dump file to your local machine
  * MongoDB default port number: 27017
```$ mongorestore --port <port number> <path to the backup>```
Consider the example:
```mongorestore dump-2013-10-25/```
 * [MongoDB](https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/)

## Deployment
* 3 Terminal Setup
* Terminal 1 : Runs the mongo database
  * ```mongod```
* Terminal 2 : Runs the Express server
  * ```cd <path>/AdviseMe/adviseme-api/```
  * ```nodemon server```
  * If cannot find module ```npm install --save <module>```
* Terminal 3 : Builds the webapp to the dist directory to be served by the Express server
  * ```cd <path>/AdviseMe/adviseme-webapp/```
  * ```ng build --watch```
* The AdviseMe application should now be available at http://localhost:3000

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
