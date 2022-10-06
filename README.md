# MIO-SUBLIMACION HOME PAGE

This Single Page Aplicattion was builded for my react course in CoderHouse. During the course ive been using Fake Store Api as a backend for my react website.
But in the following deployments of this site im going to build its own backend to suport the site.

## DEPENDENCES

- React Icons
- Material UI
- Material UI Icons
- React router dom
- Styled Components
- React UUID
- Frebase
- React-Tostify

## Why Styled Components?

The reason is that it mades easier to format the css because the code is fragmented into the components. And at the same time helps to avoid the class overlaping.
This library makes the job of making the site responsive very enjoyable.

## React Tostify

Ive used this library to send notification to the user during the purchase procedure.

## Fomr Validation

I didnt used a library to manage forms, the validation process is guaranted by a customHook that implements a Object whith the Regular expresions and the text responses to evety validation.
The structure of the Object is :
{key:regExp:{/regular expresion/,
response:"Text response"}}

## Firebase Backend Service

Ive used the Firestore Databse in the Backend of the site.
The database counts with 3 itemCollections that allocate the data provided for and by the user.

1. products : contains the data of the items to be purchased (ive used the data in the Fake Store API web)
2. users : contains the information of every user loged on the site
3. orders : contains the register of every purchase and includes User data, items purchased with basic information and calculated data like the total price and payment methods.

## Firebase Authentication

Ive used the firebase google auth service to ensure the user a easy access to the site, in case of register it takes the data provided by google and auto completes part of the registration form.

## Demostration

![](Mio-Sublimacion.gif)

## The site was builded using the Create New App CLI

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
