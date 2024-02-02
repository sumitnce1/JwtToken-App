# JwtToken-App

## Description

JwtToken-App is a Node.js-based application that showcases secure user authentication using JSON Web Tokens (JWT). The application manages user sessions, implements token-based authentication, and includes a blacklist mechanism for enhanced security.

## Technologies Used

### Back-End

- Express.js
- JSON Web Tokens (jsonwebtoken)

## How to Clone

To clone this project, use the following command:

> - First Make A Folder Give Name **Project**
> - Then Open The Project Folder in *CMD Prompt* `git clone https://github.com/sumitnce1/JwtToken-App.git`

## Getting Started

### Setup

1. Install Node.js and npm on your machine.
2. Navigate to the project folder in your terminal.

### Backend

1. Run the following commands:

> - npm install
> - npm run dev

2. The server will be running at http://localhost:4000.

## Routes

### 1. Sign In

- **Endpoint:** http://localhost:4000/signin
- **Method:** POST
- **Description:** Generates a JWT token upon successful authentication. If a session already exists for the user, it returns the existing token.

### 2. Sign Out

- **Endpoint:** http://localhost:4000/signout
- **Method:** POST
- **Description:** Invalidates the user's token, adds it to the blacklist, and removes it from the session.

### 3. All Tokens

- **Endpoint:** http://localhost:4000/allToken
- **Method:** GET
- **Description:** Retrieves information about all active user sessions.

### 4. All Blacklist Tokens

- **Endpoint:** http://localhost:4000/allBlacklistToken
- **Method:** GET
- **Description:** Retrieves information about all tokens in the blacklist.

### 5. See User Data

- **Endpoint:** http://localhost:4000/seeUserData/:userId
- **Method:** GET
- **Middleware:** verifyToken
- **Description:** Retrieves user data based on the provided user ID, only accessible with a valid token.
- **Add in Header:** `token: your_generated_token`

## How to Contribute

1. Create a new branch with your name:

> - git branch <your_branch_name>

2. Switch to your branch:

> - git checkout <your_branch_name>

3. Make necessary changes, add files, and stage the changes:

> - git add .

4. Commit with a meaningful message:

> - git commit -m "Your commit message here"

5. Push the branch to the remote repository:

> - git push origin your_branch

Feel free to contribute to the development of JwtToken-App by following these guidelines. 

#### Thank you for your collaboration!
