## Survey app

## About

This is app for surveying bank clients about their mortgage payment plans

## Installation

Dependencies:

- NodeJS
- Express
- MongoJS
- React

All of the dependencies are contained in package.json file.
To install clone this repository then navigate to project folder and type following commands in Terminal:

```sh
npm install

npm start
```


These commands will install all of the required dependencies and start API and serve client React App.

## API Endpoints

Url | Type | Description
------|------------|------------
/api/surveys | GET | get all questions
/api/surveys/:number | GET | get single survey question with provided number
