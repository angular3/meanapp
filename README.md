
# Café CRM (pet project)

The main idea of this project is to improve my knowledge of the Angular framework, gaining practical skills in working with it. 
It is also good practice to create a full stack project with a rather interesting MEAN stack.
It was also a good practice to deploy a project on a free service.

If we talk about the functionality of the application itself, this is a CRM system for a cafe or shop, in which we can enter categories and positions of the goods or services we sell and then keep statistics on the sold positions. 

Statistics includes not only dry numbers, but also visual display in the form of graphs.

Technical part:
- Server side
    - The server part is written in node.js using the express framework. 
    - The MongoDb database was used.
    - The Passport library was also used.

- Client side
    - The client part is written in the Angular framework.
    
## Deployed project link
Please find deployed project here: https://mean-cafe.onrender.com
Please use creds: email: test@test.ru / Pass: test@test.ru to see valid statistics

## Run Locally

Clone the project
```bash
  git clone https://github.com/Stskdrv/meanapp.git
```

Go to the project directory
```bash
  cd ./meanapp
```

Install dependencies

in root directory:
```bash
  npm install
```
Then go to the ./client directory and install dependencies

```bash
  cd ./client
  npm install
```
Then return to root ./
```bash
  cd ..
```
Start the server and client
```bash
  cd ..
  npm run dev
```


## Appendix

Thank you for your interest.
