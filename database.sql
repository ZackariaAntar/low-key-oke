
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "sesh" (
    "id" SERIAL PRIMARY KEY,
    "join_code" VARCHAR(10) UNIQUE NOT NULL,
    "host_user_id" INT REFERENCES "user",
    "created_at" TIMESTAMP DEFAULT NOW()
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
    "title" VARCHAR(300) NOT NULL,
    "artist" VARCHAR(300) NOT NULL,
    "url" VARCHAR(50) NOT NULL,
    "in_queue" BOOLEAN DEFAULT TRUE,
    "queue_order" TIMESTAMP DEFAULT NOW(),
    "favorited" BOOLEAN DEFAULT false
);


----------------------------------- QUERIES USED IN PROJECT --------------------------------------

-----------POST-------- AS HOST CREATES A SESSION --------------------

--query to make created session code permanent data and referenceable by its host (Needs RETURNING?)
`INSERT INTO sesh ("join_code", "host_user_id")
VALUES ($1, $2);`
--THEN IMMEDIATELY AFTER
-- query to add created session to the junction table to associate guests with their host.
`INSERT INTO sesh_junction ("sesh_code", "user_id")
VALUES ($1, $2);`

------------------------------------------------------------------------


----FETCH-------- AS ANY LOGGED IN USER PAGE LOADS  --------------------

-- query to get sesh_code specific to the user's current session
-- (GET FOR ALL USERS) USED TO POST AND TO FILTER BASED ON SESH
`SELECT "sesh_junction"."sesh_code"
FROM "sesh_junction"
    JOIN "sesh" ON "sesh_junction"."sesh_code" = "sesh"."join_code"
WHERE "sesh_junction"."user_id" = $1
ORDER BY "sesh"."created_at" DESC
LIMIT 1;`

------------------------------------------------------------------------


-----------POST-------- AS GUEST JOINS A SESSION --------------------

-- query to add created session to the junction table to associate guests with their host.
`INSERT INTO sesh_junction ("sesh_code", "user_id")
VALUES ($1, $2);`

------------------------------------------------------------------------


----FETCH-------- AFTER NEW SONG IS ADDED TO DB OR HOST VIEW RELOAD -------------------

-- query to get current queue data for a given host (HOST GET FOR QUEUE ARRAY)
`SELECT *
FROM "queue"
    JOIN "sesh_junction" ON "sesh_junction"."sesh_code" = "queue"."current_sesh_id"
    AND "sesh_junction"."user_id" = "queue"."user_id"
    JOIN "sesh" ON "sesh"."join_code" = "sesh_junction"."sesh_code"
    AND "sesh"."host_user_id" = $1
WHERE "queue"."in_queue" = true
ORDER BY "queue"."queue_order" ASC;`

------------------------------------------------------------------------


----POST-------- ADD NEW SONG TO DB -------------------

-- query to add a song to the queue using the stored sesh_code gotten above
-- ($1 currentSession store [sesh.sesh_code])
-- ($2 user store [user.id])
-- ($3 [title] input from useState)
-- ($4 [artist] input from useState)
-- ($5 [url] input from useState)

`INSERT INTO queue (
        "current_sesh_id",
        "user_id",
        "title",
        "artist",
        "url"
    )
VALUES($1, $2, $3, $4, $5);`

------------------------------------------------------------------------


----FETCH-------- NOT SURE HOW FREQUENTLY DEFINITELY AFTER POST AND ON PAGE LOAD -------------------

-- query to show one user's current session songs in the queue
-- used on MY UPCOMING SONGS user page
`SELECT *
FROM queue
    JOIN "sesh_junction" ON "sesh_junction"."sesh_code" = "queue"."current_sesh_id"
    AND "sesh_junction"."user_id" = "queue"."user_id"
WHERE "queue"."user_id" = $1
ORDER BY "queue"."queue_order" DESC;`

------------------------------------------------------------------------


----FETCH-------- NOT SURE HOW FREQUENTLY ON PAGE LOAD -------------------

-- query to show all of the songs a user has ever sang
-- used on MY SONG HISTORY user page

`SELECT *
FROM queue
WHERE user_id = $1;`

------------------------------------------------------------------------


----UPDATE-------- ON CLICK FAVORITE ICON BUTTON -------------------

-- query to update a song from your history to favorited
-- used on MY SONG HISTORY user page

`UPDATE queue
SET favorited = true
WHERE id = $1;
`
------------------------------------------------------------------------

----UPDATE-------- ON RECLICK FAVORITE ICON BUTTON -------------------
-- query to UNFAVORITE a song from your history
-- used on MY SONG HISTORY user page

`UPDATE queue
SET favorited = false
WHERE id = $1;`

------------------------------------------------------------------------

----DELETE-------- ON CLICK OF I AM SURE BUTTON IN CONFIRMATION DIALOG  -------------------
-- query to delete song from current session queue
-- used on MY UPCOMING SONGS user page

`DELETE FROM queue
WHERE id = $1;`

------------------------------------------------------------------------


----UPDATE-------- ON END OF SONG  -------------------

-- query to update is_queued to false so that it is removed from the queue
-- PUT NEXT VID URL IN THE YT PLAYER

`UPDATE queue
SET in_queue = false
WHERE id = $1;`

------------------------------------------------------------------------
