
# Trio Challenge - NodeJS Boilerplate

![At Trio, we build possibility](trio_banner.png)

## 📝 Scope
The aim of this project is to serve as a starting point for solving the NodeJS Backend "Bike Rent" Trio challenge.

The system is composed of three entities:

1. **Candidates**: These are the individuals who are participating in the challenge (in other words, you!). The API's initial design incorporates multi-tenancy concepts, which means that each candidate is considered an authenticated tenant and can create separate users and bikes.

2. **Users**: They are the primary actors in the system and are involved in most practical use cases, such as renting bikes at a price if they're available.

3. **Bikes**: These are the system's products that can be rented based on their availability.

This is a TypeScript application that:

- exposes the following Endpoints

> GET _/bikes_
>
> GET _/bikes/available_
>
> GET _/users_
>
> POST _/users_
>
> POST _/candidates_

- connects to a database to retrieve data

## 🔧 Stack Used

- TypeScript
- Express
- Prisma
- Jest
- Supertest

## 🏃 How to Run the App

### Installing the app

> Please note that the app was created using the following:
>
> NodeJS >= 16.13.2
>
> MySQL >= 8.0.32
>
> To avoid compatibility issues, make sure the version of the tools you are using are up-to-date.

To install the dependencies of the app, you can run `npm install` or `yarn`.

Make sure your MySQL database set up properly with a user and a password. When this is done, make sure you create the `.env` file based on the `.env.example`. Your DATABASE_URL should have the format:

> mysql://\<user\>:\<password\>@\<host\>:\<port\>/challenge

After installing the dependencies, setting up the database, and creating the `.env` file, run `npm run db:migrate:dev` or `yarn db:migrate:dev` to run the migrations on your local database.

### Running the app locally

To run the app locally, you need to execute the following commands:

- `npm run db:migrate:dev` or `yarn run db:migrate:dev`, if you have changed the databases' schema
- `npm run start-dev` or `yarn run start-dev`

### Running the app in production

To run the app in production, you need to execute the following commands:

- `npx prisma migrate deploy`
- `npm run build` or `yarn build`
- `npm run start` or `yarn start`

### Running the linter

You can check your code for linting errors using the command `npm run test-code-style` or `yarn test-code-style`.

To autocorrect your code according to the styleguide, run the command `npm run fix-code-style` or `yarn fix-code-style`.

### Running the tests

To run all tests, you need to execute `npm test` or `yarn test`.

You can also run specific tests with the following commands:

- `npm run test:unit` or `yarn test:unit` runs unit tests, that should be named with the extension `.spec.ts`
- `npm run test:integration` or `yarn test:integration` runs integration tests, that should be named with the extension `.test.ts`
- `npm run test:staged` or `yarn test:staged` runs specific tests passed as parameters
- `npm run test:ci` or `yarn test:ci` runs all tests creating the code coverage

## 🍀 That's it! Good luck!