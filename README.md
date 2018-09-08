# README #

# This is a webservice to maintain and assign delivery executives to orders based on their location, time of order and wait time

### How do I get set up? ###

* Summary of set up 
npm install
* Configuration
Add or Edit ./server/config.env_name.json for environment specific configurations
* Dependencies
All the dependencies are listed in package.json and get downloaded to node_modules on running npm install
* Database configuration
Add or Edit ./server/database.env_name.json file for environment specific configurations
* How to run tests
Deploy the server and then run npm test(from within the same folder)
* Deployment instructions
NODE_ENV=local node .

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines
* Contrbuters 
Ved Mulkalwar ved.mulkalwar@gmail.com 

### Who do I talk to? ###

* Repo owner or admin
Ved Mulkalwar

### APIs ###

* Link of interactive UI explorer for APIs
http://localhost:3000/explorer
* Upload available delivery executives
POST http://localhost:3000/api/free_delivery_executives/addData with body having JSON array inside key->data 
* Upload new orders
POST http://localhost:3000/api/pending_orders/addData with body having JSON array inside key->daya