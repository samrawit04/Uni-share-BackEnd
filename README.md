
# UniShare Project - Backend

Welcome to the UniShare project backend repository! This backend is responsible for handling user authentication, managing posts, and providing endpoints for the UniShare web application.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user and post data.
- **bcrypt**: Library for hashing passwords securely.
- **jsonwebtoken**: Library for handling JSON Web Tokens (JWT) for user authentication.

## Project Structure

The project structure is organized into the following folders:

- **model**: Contains MongoDB schemas for the post and user entities.
- **post**: Manages routes and controllers for handling posts.
- **user**: Manages routes and controllers for handling users, including registration and login.
- **assignment**: Manages routes and controllers for handling assignments.
- **middleware**: Contains the authentication middleware (`auth.js`).

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/unishare-backend.git
   cd unishare-backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the project root and add the following:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_for_jwt
   ```

4. **Run the Application:**
   ```bash
   npm start
   ```
   The server will run at http://localhost:5000 by default. You can change the port in the `.env` file.

## Endpoints

### User Endpoints

- **Register User:**
  - Endpoint: `POST /user/add`
  - Payload:
    ```json
    {
      "name": "Your Name",
      "password": "Your Password",
      "role": "student/instructor",
      "course": "Your Course (if applicable)",
      "user_id": "Your Unique User ID"
    }
    ```

- **User Login:**
  - Endpoint: `POST /user/login`
  - Payload:
    ```json
    {
      "user_id": "Your Unique User ID",
      "password": "Your Password"
    }
    ```

- **Get User by ID (Authenticated):**
  - Endpoint: `GET /user`
  - Headers: `x-auth-token: Your_JWT_Token`

- **Update User (Authenticated):**
  - Endpoint: `PUT /user/update`
  - Headers: `x-auth-token: Your_JWT_Token`
  - Payload:
    ```json
    {
      // Fields to update
    }
    ```

### Assignment Endpoints

- **Submit Assignment:**
  - Endpoint: `POST /assignment/submit`
  - Payload:
    ```json
    {
      "course": "Course Name",
      "file": "Link to Assignment File"
    }
    ```

- **Get All Assignments:**
  - Endpoint: `GET /assignment`

- **Edit Assignment:**
  - Endpoint: `PUT /assignment/edit/:id`
  - Payload:
    ```json
    {
      // Fields to update
    }
    ```

- **Delete Assignment:**
  - Endpoint: `DELETE /assignment/delete/:id`

### Post Endpoints

- **Add Post (Authenticated):
  - Endpoint: `POST /post/add`
  - Headers: `x-auth-token: Your_JWT_Token`
  - Payload:
    ```json
    {
      "title": "Your Post Title",
      "description": "Your Post Description",
      "date": "Your Post Date",
      "postType": "Your Post Type",
      "file": "Link to Post File (optional)"
    }
    ```

- Get All Posts:
  - Endpoint: `GET /post/get`

- Update Post (Authenticated):
  - Endpoint: `PUT /post/update/:id`
  - Headers: `x-auth-token: Your_JWT_Token`
  - Payload:
     ```json
    {
      // Fields to update
    }


Delete Post (Authenticated):
  - Endpoint: `DELETE /post/delete/:id`
  - Headers: `x-auth-token: Your_JWT_Token`

If you have any questions or feedback, please don't hesitate to reach out.
