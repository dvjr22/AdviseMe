# AdviseMe
A web app that will assist college students through the majority of advising requirements while in pursuit of a degree. The development version of AdviseMe is currently avaliable at [www.theadviseme.com](https://www.theadviseme.com).

Guest credentials are:

| Role          | Username | Password |
|---------------|----------|----------|
| student       | student  | 1234     |
| advisor       | advisor  | 1234     |
| administrator | admin    | 1234     |

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
  * A binory BSON dump of the database can be found: AdviseMe/adviseme-database/dump
  * Ensure Mongo has been started on your local machine:
   * Linux:
    * ```$ sudo service mongod start```
  or
    * ```$ sudo service mongod restart```
   * Mac (if mongodb was installed via homebrew):
    * ```brew services start mongodb```
    * to restart:
     * ```brew services stop mongodb```
     * ```brew services start mongodb```
* Use mongorestore to restore the dump file to your local machine
* MongoDB default port number: 27017
  * ```$ mongorestore <path to the backup>```
* Example:
  * ```$ mongorestore AdviseMe/adviseme-database/dump```
 * Troubleshooting assitance can be found [here](https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/)

## Local Deployment
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

## Server Deployment
* Clone repository into new directory
* Change into the API directory
  * ```cd <path>/AdviseMe/adviseme-api/```
* Install the NPM packages
  * ```npm install```
* Change into the Webapp directory
  * ```cd <path>/AdviseMe/adviseme-webapp/```
* Install the NPM packages
  * ```npm install```
* Build the Angular components
  * ```ng build```
* Install [pm2](https://github.com/Unitech/pm2)
  * ```npm install pm2 -g```
* Start up the daemonized process
  * ```sudo pm2 start ./bin/www --name AdviseMe```
* Make sure everything is working
  * ```sudo pm2 logs AdviseMe```
  
## Unit Tests
AdviseMe has multiple unit testing systems for various parts of the project. There are unit tests in the API, the front end, and end to end integration tests.
### API Unit Tests
* Framework:
  * [Mocha](https://mochajs.org/)
  * [Chai](http://chaijs.com/)
* Commands to run:
  * ```cd adviseme-api```
  * ```npm test```

### Angular Unit Tests
* Framework:
  * [Karma](https://karma-runner.github.io/2.0/index.html)
  * [Jasmine](https://jasmine.github.io/)
* Commands to run:
  * ```cd adviseme-webapp```
  * ```npm test```
* Note:
  * Karma will start up a browser with the test results. There are green dots in the top left corner to indicate successful tests and red x's to indicate failed tests. Clicking on Spec List will bring up a list of all the tests.
### End-to-end Integration Testing
* Framework:
  * [Protractor](http://www.protractortest.org/#/)
* Commands to run:
You will need two terminal sessions running. The first for the Selenium web server (webdriver-manager) and the second for the actual Protractor
  * Selenium Terminal
    * ```cd adviseme-webapp```
    * ```webdriver-manager update```
    * ```webdriver-manager start```
  * Protractor Terminal
    * ```cd adviseme-webapp```
    * ```protractor```

## Creating Documentation
* Install compdoc package
  * ```npm i -g @compodoc/compodoc```
* Create the documentation for Angular
  * ```cd <path>/AdviseMe/adviseme-webapp/src```
  * ```compodoc -p tsconfig.app.json```
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
