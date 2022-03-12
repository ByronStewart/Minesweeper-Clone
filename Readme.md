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
  ./frontend/npm run start
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

### Components

There are some notable components that deserve mentions:

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

### Src

The app.tsx file contains all the routes for the application utilising react router 6

## Conclusion

I hope you enjoy using the app. Experiment with some of the error handling in the forms and using the game on mobile.
