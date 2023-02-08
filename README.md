# `Emma`

Emma, an AI-powered language learning platform that utilises AI to simulate real-life conversation with native speakers to empower individuals in less developed, financially disadvantaged countries to acquire foreign language for free.

[![Emma Mockup](https://user-images.githubusercontent.com/107037151/217581785-3e5e5106-262d-4306-b699-42109596082a.jpg)](https://emma-language-learning.herokuapp.com)


<br />


## `Installing Emma`

### `Step 1`

Download ['emma-language-learning'](https://github.com/timohuennebeck/emma-language-learning) and ['emma-language-learning-api'](https://github.com/timohuennebeck/emma-language-learning-api) and make sure to create a .env file on the client side which includes a port where the server can run. Emma was running on port 8080 in production, therefore, we recommend using the same.


### `Step 2`

Run `npm install` on the client and server side to download all dependencies.


### `Step 3`

Run `npm run migrate` and `npm run seed` on the server side to populate the SQL database.


### `Step 4`

You're almost done! On the client side run `npm run dev` to launch the application and `npx nodemon` on the server side to start the server. Welcome to Emma!

Have fun! 🌻
