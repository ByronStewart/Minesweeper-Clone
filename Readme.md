# Overview

This project is a recreation of the classic minesweeper game optimised for play on mobile.

The game is playable anonymously, but users can register to have their score saved to the server to be presented to all users on the high score page.

This is a fullstack web application.

Major Technologies used:

- React
- Redux
- Typescript
- Tailwind CSS
- Python
- Django
- Django REST Framework
- JWT Authentication

# Installation

## Dev environment

1. Create a python virtual environment

```{shell}
  python -m venv venv
```

2. Activate the virtual environment (Powershell)

```
  ./venv/Scripts/Activate
```

3. Install the dependencies

```
  python -m pip install -r requirements.txt
```

```
  ./frontend/npm install
```

4. make the migrations

```
  python manage.py makemigrations
  python manage.py migrate
```

5. run the backend development server (should be running on port 8000)

```
  python manage.py runserver
```

6. run the frontend react development server (should be running on port 3000)

```
  cd frontend
  npm run start
```

7. Navigate to http://localhost:3000 to use the app

# Distinctiveness and Complexity

## Distinctiveness

This project is distinctive from all the other projects in CS50Web due to the decoupled nature of using a Frontend application with an API.

This is distinct because there are no other similar style of projects either which are to make a workable web game.

There is no other project in the course that requires the implementation of authentication, or anything that uses JWT to authenticate via an api.

## Complexity

This project satisfies the complexity requirements:

- The frontend is written entirely in Typescript to obtain type safety.
- The backend is a Django application with two models.

The complexity of this application comes from the authenitication flow and the complexity of maintaining a quality webpage experience with complex state management.

## API Overview:

The frontend application communicates with a Django REST api.

The API has a serializers file which contains the serializers for register, login, token and minesweeper scores

The models file contains the User model and the MinesweeperScore model. The score is linked to the user with a foreign key

The views correspond to the api endpoints below. They are class based views using best practices for Django Rest Framework.

All functionality has been thoroughly tested in the tests folder to ensure their working condition.

The API has the following endpoints:

#### POST /api/login

- Request

```
{
  "email": "test@test.com",
  "password: "password"
}
```

- Response

```
  {
    "access": token,
    "refresh": token
  }
```

#### POST /api/register

- Request

```
{
  "username" : "billy",
  "email" : "billy@example.com",
  "password: "securepassword"
}
```

- Response

```
{
  "access": token,
  "refresh": token
}
```

#### GET /api/minesweeper_scores

Retrieves all the minesweeper scores

- Response

```
[
  {
    time: 45
    owner: "billy",
    difficulty: 1
  },
  {
    time: 70
    owner: "amy",
    difficulty: 2
  },
]
```

difficulty is a number representing 'beginner', 'intermediate' and 'expert'

#### POST api/minesweeper_scores (token authenication required)

```
{
  score: {
    time: 78
    difficulty: 2
  }
}
```

The user will be decoded from the jwt token contained in the header of the request

## Frontend Overview

The frontend is a React application written in Typescript. It uses modern React features such as hooks and functional components. And redux to store global state.

The UI was built using the tailwind css framework, avoiding a component framework to demonstrate CSS skills and develop a custom design.

### Pages

#### Common

The site has a collapsible header which is present on all pages of the app. This allows the user to quickly navigate to any given page in the application. This is achieved through local state in react. There is a custom made useToggle hook to generalise this functionality.

#### Home

The home page has a title and two links to either the instructions or the game page

#### Login

The login page has a form to login the user. It has custom error handling for the frontend to ensure the user inputs a correct email and recieves useful error messages. If a user logs in after completing a game their game will be posted to the server automatically.

#### Register

The register page functions similarily to the login page with extra functionality. If the user already exists the UI will represent that information on the relevant fields. E.g., if a username has been taken there will be an error message on the username field to show the user that they need to choose a different username.

#### Hall of fame

The hall of fame is a tabbed page where users are shown a list of highscores in ascending order of time. The page separates the difficulties into their own tabs.

#### Instructions page

The instructions page onboards the users with instructions on how to play the game. The page has 3 subpages which have an dot indicator to demonstrate which stage the user is at in the instructions. The page is also swipable for mobile users to get between states.

#### The game page

The game page underwent many iterations before finally settling on the current design. Initially the game was rendered on a canvas outside of react itself. But that became problematic to style effectively and to make it responsive, it was also problematic to save the state to the server. That was scrapped and rewritten to the current version which the game state is stored in a redux object and tiles are rendered as react components.

The game features a timer which starts when the user first reveals a tile and has 3 difficulty levels. If the user navigates away from the page the timer pauses and will restart when the user navigates back. The current gamestate is also saved.

For mobile users the game has an extra button to toggle if tap flags or reveals a tile.

Like with the original game if the user reveals a tile with no surrounding mines then all the possible tiles to be revealed will be revealed. This is done by using a depth first search.

The user wins a game by revealing all the non-mine tiles.

The game can be restarted and functions as you would expect a complete minesweeper game to work.

### Authentication

The authentication is handled with the custom built useAuth hook. A react context is built at the root of the application to provide access to the auth at all layers of the application.

On login the tokens are saved in localstorage, on page load this is checked and the user is logged in if they can be logged in. On login an interval is set to refresh the short lived access token. The default authentication is also set here with a token.

The user is saved to state and is available to be checked against in the application with the user of this custom hook to conditionally render login buttons etc.

Login and logout functions are exposed to the application which also accept a callback to run logic on success or failure, such as redirection which occurs on the login and register pages.

### Features

The features folder contains redux slices to handle the game state and the history of the games.

The current-game directory contains all the buisness logic for the minesweeper game to run. There are helper functions to generate a board, fill it with mines, get neighbors for tiles etc. Actions by a user are dispatched to the reducer function to handle the state updates in the game.

The game-history directory constains the thunks and reducers to get and post game scores.

#### Forms

Forms are handled by the Formik react library. There are custom input fields to encapsulate the styling and error handling in one location

#### MainMenuItem

Dumb component to isolate styling for menu components

#### Layouts

Layout components to utilise React Router to render outlets

#### Minesweeper

The minesweeper game is broken up into 4 main components, the page to hold all the status such as mines remaining, the timer and new game buttons.

The gameboard which is responsible for the layout of all the tiles and start the timer on the game start.

The tile which conditionally renders based on the properties of the tile and can handle the click events on the board.

The status windows; modals which will appear on game end and used to select the difficulty.

## Files

Here you will find descriptions of all the files in the project:

### `/api`

`api/__test__/test_models.py`
This file contains the tests for the models. There are 3 tests to check that the scores are only able to be created correctly.

`api/__test__/test_serializers.py`
This file contains the tests for the serializers. There are two tests:
One checks that the player context must be present in order to create.
The other checks that it creates when the player context is present

`api/__test__/test_views.py`
This file tests that all the views behave correctly.

The login view must return a json web token to the user when correct credectials are provided. It must also return a 401 if the user does not exist. And finally it shuold return a 401 if the password does not match the users password

The Register view must create a user for a valid request. It should hash the password. It should not create if a user already exists, nor should it create if the email already exists. It must return a 400 if the username email, or password were not passed to the request. And finally it should return a token.

The MinesweeperScoreListCreateView POST request should require the user to pass a token, it should create the token when provided a valid score. The GET request should return the list of scores.

`api/migrations/*`
This has all the autogenerated database migrations created on model changes

`api/admin.py`
The base level admin site, it has registrations for both the scores and the user which admins can change.

`api/apps.py` Is a simple config file which sets the auto fields and the route namespace

`api/models.py` The project contains two models. The User model extends from abstract user, utilizes Django's built in UserManager. the USERNAME_FIELD is set to login using email rather than username. There is some boolean fields to assign users to groups of is_active in order to keep highscores of unregistered users and is_staff for users with higher priveliges

The MinesweeperScore modle has a choice field for difficulty, a foreign key for the User who got the score, a created_at field for a timestamp and a time for the score. The Meta class orders the scores by time when queried.

`api/serializers.py` The serializers are Django-Rest-Framework serializers. There are 3 serializers in use in the project.

The register serializer handles register requests. It is a simple model serializer but overrides the create method to call the UserManager's objects.create_user method.

The UsernameTokenObtainPairSerializer is to add additional information to the JSON web tokens. The token encodes the username.

the MinesweeperScoreSerializer is a model serializer to create and read scores. The owner is a read_only field, because the user can be found on the request context. It overrides the create method to get the current user and assign it to the owner field before saving.

`api/urls.py` This file contains all the api endpoints and assigns them views to handle the responses. There are 4 endpoints to: login, register, refresh the JWT and scores.

`api/views.py` This file contains all the views for the project.

The LoginView class handles the login route. It inherits from simplejwt tokenobtainpairview and delegates the login logic to the UsernameTokenObtainPairSerializer

The LoginRefreshTokenView inherits from TokenRefreshView from simpljwt to handle refreshing jwt.

The RegisterView class inherits from the CreateAPI view provided by django-rest-framework. The model is set to the User model and the RegisterSerializer handles serialization. The create method is overridden to return the token on register with the same API signature as the LoginView

The MinesweeperScoreListCreateView class inherits from the ListCreateAPIView provided by django-rest-framework. This view handles both a POST request to create a score and a GET request to return a list of scores. The MinesweeperSCoreSerializer handles all the serialization. This route is protected by the IsAuthenticatedOrReadOnly permission from django-rest-framework, this means that POST requests must be authenticated but GET requests do not need to be. The create method is overridden to provide the correct context to the serializer.

### `/capstone`

`capstone/asgi.py` A django configuration file. Not touched

`capstone/settings.py` The settings file for the Django project. 3 additional apps are registered here. api, corsheaders and rest_framework. The allowed CORS origin are set to localhost and all ports for the project to allow the frontend and the api to talk to each other. This is mostly default settings.

`capstone/urls.py` This file provides the base url for the api route and the admin route. The admin route is handled by the default admin site.

`capstone/wsgi.py` A django configuration file. Not touched.

### `/frontend`

The files here follow a typical React single page application setup.

`frontend/public/index.html` This is the root html file for the application. The react app attaches to #root.

`frontend/public/images/avatar.png` This is an image to represent a user without a photo

`frontend/public/favicon.ico` The icon for the title, default to create-react-app

`frontend/public/robots.txt` text file to disallow robot views, default to create-react-app

`frontend/package.json` This file contains all the libraries and scripts involved in a node project. The scripts are the create-react-app defaults.

`frontend/package-lock.json` A file to check versions in node_modules and ensure that everything is the correct version

`frontend/postcss.config.js` This is a config file for PostCSS. PostCSS is required for the Tailwind CSS framework to function correctly. There is default settings here.

`frontend/tailwind.config.js` Tailwind CSS config. The theme is extended by adding a google font.

`frontend/tsconfig.json` default typescript config for create-react-app

### `/frontend/src`

This folder contains all the source files for the frontend of the project.

`src/useAuth.tsx` This is a custom built react hook to handle frontend authentication in the project. It utilizes the react context api

The RequireAuth function is a react higher order component to ensure that the user is authenticated before allowing access to the component. If authentication fails it redirects to the login page and holds to state to redirect to on successful login.

ProvideAuth is the authentication context provider. The value context values are obtained from useProvideAuth.

useAuth wraps the authcontext in a descriptive and easy to use name.

useProvideAuth contains the logic for setting up the authentication. It implements IAuth.

- It returns the user object, the accessToken, a signIn, signOut and register method. The user, stores an object IUser or false if the user is not logged in.

- The signIn method calls the API to login, saves the login in the state and tokens in localstorage, finally it calls the callback function provided with the user or error. signOut sets all the state back to the defaults and removes the tokens from localstorage. register works the same as login but provides the extra info to the API on login.
- On page load it queries local storage for tokens and will automatically login the user if a refresh token is provided. It then sets up an interval to automatically refresh the token within the access token expiry for a seamless experience.

`src/useAuth.test.tsx` This contains all the tests to ensure the auth can login a user, logout a user and register a user.

`src/components/Forms/InputField.tsx` This is a generic input field component built to interface with the Formik library. It accepts an icon, placeholder, and type. It contains all the logic to show error messages should they be returned from the form it was submitted from

`src/components/Index/IndexPage.tsx` This is the default homepage of the app. It is a dumb component which links to other pages in the application.

`src/components/Login/LoginPage.tsx` This is the login page. It displays a form to login the user. It remembers where the user nagivated from and will redirect them there on success. The login page has validation both on the client side and on the server side. Errors are displayed on their respective fields to provide an enhanced user experience. If the user navigated here upon completing a game, the game state is submitted upon login.

`src/components/Register/RegisterPage.tsx` Like the login page this page displays a form to register the user. The validation works in the same way as the login page and it will also submit the game state to the server on a registration success.

`src/components/MainMenuItem.tsx` This file holds two commonly used components in the main menu. They are components to provide default stying to a link and a button. They can take their own class props to define additional classes other than the base styles.

`src/components/Modal.tsx` This is a modal component which allows an onClose function to be passed, it handles the styling and the propagation behaviour expected of a modal

`src/components/Instructions/InstructionsPage.tsx` This is the page which gives the user instructions on how to play the game. There are 3 different pages to the instructions. The user can paginate between the 3 pages using the pagination component. It has swipe functionality for mobile devices to help change between the pages.

`src/components/Instructions/Pagination.tsx` This pagination component accepts a function to go forward, go back and whick page it is. It has an arrow for back and forward. If the user cannot go back then the back arrow is not shown and vice versa. It provides a dots to show which of the pages the user is on using conditional styling.

### `frontend/src/components/HallofFame`

`HallOfFame/HallOfFamePage.tsx` This file contains the page component for the game's highscores. On the page load it will call the api for the current highscores. It will show a list of the highscores filtered by difficulty. It also provides tabs to change the difficulty.

`HallOfFame/ScoreListItem.tsx` This component will display an individual highscore item. It accepts a time, username, idx (to provide the table style coloring effect) and an optional image.

`HallOfFame/Tab.tsx` The component to display the tab. It has an active prop and an onclick handler which is passed in. It will apply the stying for the element.

### `frontend/src/components/Layouts`

This folder contains all the components responsible for laying out each page

`Layouts/BaseLayout.tsx` The base layout contains the default header of the application and an outlet to house the different pages of the application.

`Layouts/DefaultHeader.tsx` This is the top bar of the UI. It will show the username if the current user is logged in. The UI features a dropdown menu which contains links to all the pages in the application. It also allows the user to login/register and logout depending on the login state of the user.

### `frontend/src/components/Minesweeper`

## Conclusion

I hope you enjoy using the app. Experiment with some of the error handling in the forms and using the game on mobile.
