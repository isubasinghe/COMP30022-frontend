[![Netlify Status](https://api.netlify.com/api/v1/badges/8baa32e6-ea4b-41f2-a59c-1e11bd4de1d1/deploy-status)](https://app.netlify.com/sites/airloom-prod/deploys) [![Build Status](https://travis-ci.com/isubasinghe/COMP30022-frontend.svg?token=jaHDhXwcqnNXuEFx51gu&branch=dev)](https://travis-ci.com/isubasinghe/COMP30022-frontend)

# This project is a heirloom register for the capstone project for COMP30022

## The architecture is documented here https://blog.isub.dev/university-capstone-project-airloom-a-web-app-to-track-heirlooms/

## The frontend has had some deployment changes, it is no longer being served by cloudfront, netlify is now our CDN, however the cloudfront distribution is still up

## The frontend should be easy to get up and running, however you will be using my AWS resources in doing so (cognito+lambda)

## The backend is hosted here https://github.com/isubasinghe/COMP30022-backend and this will require multiple environment variables. These include

- DB_USER
- DB_PWD
- DB_URL
- DB_PORT
- DB_DATABASE
- LOGDNA_INGESTION_KEY
- COGNITO_ISS
- COGNITO_APP_CLIENT
- CLOUDINARY_URL
- SENTRY_DSN
- MAPBOX_TOKEN

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
