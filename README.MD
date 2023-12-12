# AniSphere: Your Ultimate Anime Destination

Welcome to AniSphere, your go-to platform for discovering and discussing your favorite anime series! Whether you're a seasoned otaku or just getting started on your anime journey, AniSphere is designed to make finding and enjoying anime a breeze. Dive into a world of captivating stories, vibrant characters, and engaging discussions with fellow anime enthusiasts.

### Frameworks and Libraries

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

### Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Hosting:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Ready to Explore AniSphere???

[Go To Anisphere](https://anisphere.onrender.com)

## SPLASH PAGE

<img src="Screenshot 2023-12-12 at 1.42.48 PM.png" data-canonical-src="" width="600px"/>

## HOME PAGE

<img src="Screenshot 2023-12-12 at 1.45.47 PM.png" data-canonical-src="" width="600px"/>

## POST PAGE

<img src="Screenshot 2023-12-12 at 1.47.01 PM.png" data-canonical-src="" width="600px"/>
<img src="Screenshot 2023-12-12 at 1.47.18 PM.png" data-canonical-src="" width="600px"/>

## Table of Contents

1. [About AniSphere](#about-AniSphere)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Forums](#forums)
   - [Lovers' Lounge](#lovers-lounge)
   - [Haters' Haven](#haters-haven)
   - [Debate Den](#debate-den)
5. [Contributing](#contributing)
6. [Contact](#contact)

## About AniSphere

AniSphere was born out of the love for anime and the desire to create a centralized hub for enthusiasts to explore, discover, and engage in meaningful discussions. Anisphere was created with the sole purpose to simplify the process of finding anime tailored to your preferences, providing a seamless and enjoyable experience for users of all levels.

# Endpoints

## Auth

| Request                     |                                                                                                       Purpose                                                                                                       | Return Value                                                                                                                                                                                                                    |
| :-------------------------- | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET /api/auth/              |                                 This fetch is sent upon initial app load and on subsequent refreshes.<br>It returns an object representing the current user, if user is logged in.                                  | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'firstname': STRING,<br>&nbsp;&nbsp;&nbsp;'lastname': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br> |
| POST /api/auth/unauthorized | This endpoint will be routed to in the case that a protected route does not pass validations for the current user.<br>It returns an object with an errors property, which is an array with the value 'Unauthorized' | {<br>&nbsp;&nbsp;&nbsp;'errors': ARRAY[STRINGS]<br>}<br><br>Status: 401<br>                                                                                                                                                     |
| POST /api/auth/signup       |  This fetch sends the form data signup from data to the backend to process the creation of a new user.<br>It returns an object representing the current user, after logging them in, if account creation succeeds.  | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'firstname': STRING,<br>&nbsp;&nbsp;&nbsp;'lastname': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br> |
| POST /api/auth/login        |                                  This fetch attempts to login a user with the provided credentials.<br>It returns an object representing the current user, if validation succeeds.                                  | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'firstname': STRING,<br>&nbsp;&nbsp;&nbsp;'lastname': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>}<br><br>Status: 200<br> |
| POST /api/auth/logout       |                                                 This fetch will logout the current user.<br>It returns an object with the message 'User logged Out' if it succeeds.                                                 | {<br>&nbsp;&nbsp;&nbsp;'message': STRING<br>}<br><br>Status: 200<br>                                                                                                                                                            |

## Posts

| Request                           |                                                                             Purpose                                                                              | Return Value                                                                                                                                                                                                                |
| :-------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET /api/posts/all                |                          This fetch is sent to retrieve all reviews records. Upon success, we return an object representing them data.                           | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'title': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING,<br>&nbsp;&nbsp;&nbsp;'user_id': INT,<br>&nbsp;&nbsp;&nbsp;'description': STRING,<br>} <br><br>Status: 200<br> |
| POST /api/posts/new               |                       This fetch is sent to add a new item to the posts table. Upon success, it returns an object representing that item.                        | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'title': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING,<br>&nbsp;&nbsp;&nbsp;'user_id': INT,<br>&nbsp;&nbsp;&nbsp;'description': STRING,<br>}<br><br>Status: 201<br>  |
| PUT /api/posts/<int:id>/edit      | This fetch is sent to update the current values of a post item. Upon success, it returns an object representing that item in the posts, with the updated values. | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'title': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING,<br>&nbsp;&nbsp;&nbsp;'user_id': INT,<br>&nbsp;&nbsp;&nbsp;'description': STRING,<br>}<br><br>Status: 200<br>  |
| DELETE /api/posts/<int:id>/delete |                 his fetch is sent to delete an item from the posts. Upon success, it returns the string "Success", otherwise, we throw an error.                 | "Success"<br><br>Status: 200<br>                                                                                                                                                                                            |

## Reviews

| Request                                    |                                                                       Purpose                                                                       | Return Value                                                                                                                                                                                                       |
| :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET /api/reviews/all                       |                    This fetch is sent to retrieve all reviews records. Upon success, we return an object representing them data.                    | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'review': STRING,<br>&nbsp;&nbsp;&nbsp;'post_id': INT,<br>&nbsp;&nbsp;&nbsp;'user_id': INT,<br>&nbsp;&nbsp;&nbsp;'rating': INT,<br>}<br><br>Status: 200<br> |
| POST /api/reviews/<int:postId>/new         |                                             This fetch is sent to add a new entry to the reviews table.                                             | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'review': STRING,<br>&nbsp;&nbsp;&nbsp;'post_id': INT,<br>&nbsp;&nbsp;&nbsp;'user_id': INT,<br>&nbsp;&nbsp;&nbsp;'rating': INT,<br>}<br><br>Status: 201<br> |
| PUT /api/reviews/<int:review_id>/edit      | This fetch is sent to update the review info record specified by the reviews id. Upon success, we return an object representing the updated review. | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'review': STRING,<br>&nbsp;&nbsp;&nbsp;'post_id': INT,<br>&nbsp;&nbsp;&nbsp;'user_id': INT,<br>&nbsp;&nbsp;&nbsp;'rating': INT,<br>}<br><br>Status: 200<br> |
| DELETE /api/reviews/<int:review_id>/delete |       This fetch sends a reviews id in the body of the request. Upon success, it returns the string "Success", otherwise, we throw an error.        | "Success"<br><br>Status: 200<br>                                                                                                                                                                                   |

## Features

- **User Reviews and Ratings**: Contribute to the community by sharing your thoughts and ratings on your favorite (or not-so-favorite) anime.

## Features Coming Soon

- **User Profiles**: Customize your profile, track your watchlist, and connect with other users who share your interests.
- **Advanced Search**: Easily discover anime based on genres, themes, and user ratings.
- **Dynamic Forum System**: Engage with like-minded individuals in dedicated forums for lovers and haters alike.
- **Personalized Recommendations**: Receive tailored suggestions based on your viewing history and preferences.
- **Debate Section**: Join lively debates where lovers and haters come together to discuss, argue, and appreciate the nuances of different anime series.

## Getting Started

1. **Sign Up**: Create a free account to unlock personalized recommendations, forum participation, and other exclusive features.
2. **Explore**: Use the search and recommendation tools to discover new anime titles(Not Yet Available).
3. **Review and Rate**: Share your opinions by leaving reviews and ratings for the anime you've watched.
4. **Join the Community**: Dive into the forums to connect with fellow anime enthusiasts(Not Yet Available)

## Forums

### Lovers' Lagoon

In the Lovers' Lounge, celebrate your favorite anime series with other fans. Share fan theories, discuss character development, and recommend hidden gems. This is a space for positive and passionate discussions about the anime you love.

### Haters' Haven

Sometimes, an anime just doesn't click with everyone. The Haters' Haven is a space for constructive criticism, where you can express your grievances and discuss the aspects of anime that didn't quite meet your expectations. Keep it respectful, and let your opinions be heard.

### Debate Den

For those who enjoy a healthy exchange of ideas, the Debate Den is the place to be. Engage in debates with both lovers and haters of specific anime series. Explore different perspectives, challenge your own opinions, and gain a deeper understanding of the diverse world of anime.

## Contributing

AniSphere is a community-driven platform, and we welcome contributions from users. Whether it's submitting reviews, suggesting features, or participating in discussions, your input helps us improve and grow.

## Contact

Have questions, suggestions, or just want to say hello? Reach out to us at [Email Coming Soon](null) or through our [Contact Form Comming Soon](null).

Happy watching and discussing! 🌟🍿

# Connect

[LinkedIn](https://www.linkedin.com/in/roderick-j-995394bb/)
[GitHub](https://github.com/rrod11)
