# 🌟 100xDevs WebDev Cohort Progress 🌟

<details>
  <summary>🚀 Week 4: Express Middleware & Error Handling 🚀</summary>
  
  ### Key Features:
  - **Error Handling Middleware**: Implemented middleware to catch and handle errors when requests fail, ensuring a smoother user experience.
  - **Age Validator**: Added a validation check to ensure users are 18 years or older before granting access to specific routes.
  - **Ride Counter**: Established a limitation of 2 rides per user, restricting access once the limit is reached to enhance resource management.

</details>

<details>
  <summary>🚀 Week 5: CORS, Body Parsing & POST Requests 🚀</summary>

  ### Key Features:
  - **CORS (Cross-Origin Resource Sharing)**: Enabled CORS to allow cross-origin requests, promoting interoperability between different domains.
  - **Body Parsing Middleware**: Utilized body-parser middleware to handle and parse incoming JSON data effectively, facilitating smoother data exchange.
  - **POST Request (Sum API)**: Developed a simple API endpoint to accept two numbers via a POST request and return their sum, showcasing the ability to handle calculations.

</details>

<details>
  <summary>🚀 Week 6: JWT Authentication & User Management 🚀</summary>

  ### Key Features:
  - **JWT Authentication**: Implemented JSON Web Tokens for secure user authentication, ensuring that user sessions are protected.
  - **Login Validator Middleware**: Created middleware to verify JWT tokens in request headers, protecting routes from unauthorized access.
  - **User Sign-Up & Sign-In Flow**:
    - **`/signup`**: Endpoint for registering new users while checking for existing usernames to avoid duplicates.
    - **`/signin`**: Endpoint for authenticating users and returning a JWT token for subsequent requests, streamlining user access.
  - **Protected Routes**: Established that the `/profile` route is accessible only to authenticated users with a valid JWT, enhancing security measures.

</details>
