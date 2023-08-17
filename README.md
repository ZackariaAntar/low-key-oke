![Repo Size](https://img.shields.io/github/languages/code-size/TheAnimalConnection/star-pet.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/TheAnimalConnection/star-pet.svg?style=for-the-badge)
# low-key-oke

## Description
low-key-oke is a browser based karaoke party platform, which provides users the ability to create and join private karaoke sessions. The application is built to make hosting karaoke parties easier from the comfort of your own home, while streamlining the user process of signing up to sing a song.

## Built With

<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://www.figma.com/?fuid="><img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" height="40px" width="40px" /></a>
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Postico 2](https://eggerapps.at/postico2/)

Additionally, you will need to get a YouTube API Key for your `.env` file.
- [YouTube API](https://developers.google.com/youtube/v3/getting-started)

### Installation

1. Fork the repository
2. Copy the SSH key in your new repository
3. In your terminal type...  `git clone {paste SSH link}`
4. Navigate into the repository's folder in your terminal
5. Open VS Code (or editor of your choice) and open the folder
6. In the terminal of VS Code run `npm install` to install all dependencies
7. Create a `.env` file at the root of the project and paste your Youtube API key into it, along with this line:
```
  SERVER_SESSION_SECRET=superDuperSecret
  YT_API_KEY=REPLACETHISWITHYOURAPIKEY
  ```

8. Create a new database called `low_key_oke_base` and create the `user`, `sesh`, `sesh_junction`, `queue`, and `homies` tables provided below. I added the homies table in preparation for hosting this app,it's there to allow select users to register premium accounts which gives them access to the YouTube API enabled search functionality. All you have to do is create a validation key/secret code and add it to that table. If you have questions on how to get that working, please reach out and I'd be happy to point you in the right direction!
```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "in_session" BOOLEAN DEFAULT FALSE,
    "is_hosting" BOOLEAN DEFAULT FALSE,
    "premium" BOOLEAN DEFAULT FALSE

   );

CREATE TABLE "sesh" (
    "id" SERIAL PRIMARY KEY,
    "join_code" VARCHAR(10) UNIQUE NOT NULL,
    "host_user_id" INT REFERENCES "user",
    "created_at" TIMESTAMP DEFAULT NOW(),

);

CREATE TABLE "sesh_junction"(
	"id" SERIAL PRIMARY KEY,
	"sesh_code" VARCHAR(10) REFERENCES "sesh"("join_code"),
	"user_id" INT REFERENCES "user"

);

CREATE TABLE "queue" (
	"id" SERIAL PRIMARY KEY,
	"current_sesh_id" VARCHAR(10) REFERENCES "sesh"("join_code"),
	"user_id" INT REFERENCES "user",
	"name" VARCHAR (80) REFERENCES "user"("username"),
	"title" VARCHAR(300) NOT NULL,
	"artist" VARCHAR(300),
	"url" VARCHAR(50) NOT NULL,
	"in_queue" BOOLEAN DEFAULT TRUE,
	"queue_order" TIMESTAMP DEFAULT NOW(),
	"favorited" BOOLEAN DEFAULT false
);

CREATE TABLE "homies"(
	"id" SERIAL PRIMARY KEY,
	"in_the_know" VARCHAR(50)
);
```
9. The queries in the database.sql file are set up to create all the necessary tables that you need.
10. Run `npm run server` in your VS Code terminal.
11. Open a second terminal and run `npm run client`.

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Acknowledgement
* Huge thanks to [Liz Kerber](https://github.com/emkerber), [Emma Stout](https://github.com/emmastout01), and [Dane Smith](https://github.com/DoctorHowser) for sharing their knowledge and preparing me to make this application a reality, and to the community of staff, partners, alumni, and mentors from [Prime Digital Academy](www.primeacademy.io) who have made my learning experience possible.

* To my fellow [Diamond Cohort](https://github.com/orgs/PrimeAcademy/teams/diamond) members for their support and daily commitment to growth.