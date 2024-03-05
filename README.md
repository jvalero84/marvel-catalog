# Marvel catalog

This project aims to work as a catalog for Marvel characters. 

On the landing view, it shows the user a list of Marvel characters with a search box where the results can be filtered by character name.
From this view, the user can mark specific characters as their favorites and access the detail view of each character by clicking on the character card. 

The character detail view shows more detailed information of the selected character and a list of the character comics. From this view, the user can also mark a character as favorite.

The top right corner of the header displays an indicator of the number of favorite characters selected by the user, and by clicking on the heart icon, a summary of the favorite characters of the user is shown.


The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). using typescript (--template typescript)

It has been developed using typescript and styled components

The main modules used to develop this project are:

    - react: 18.2.0
    - react-router-dom: 6.22.2
    - typescript: 4.9.5
    - styled-components: 6.1.8
 
 Before starting up the application, make sure a file .env exists at the root level containing an entry REACT_APP_MARVEL_API_PUB_KEY= followed by the Marvel API Key.

 The data source for this project comes from the Marvel API, and to make use of it, an API KEY is needed and can be obteined on the Marvel website [More info](https://developer.marvel.com/account)  .   
 
 The project code is structured in a few folders:

    Under src/ the global files and entry points of the react app are placed and the rest of the code is on these folders:

    - components: Where the React components used by the pages are placed.
    - contexts: Where the context and context providers are created and exported.
    - pages: Where the two views of the application are located.
    - types: types and interfaces created and used throughout the application.

    The static assets are located on the public folder.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
