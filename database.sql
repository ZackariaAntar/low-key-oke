
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
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
    "artist" VARCHAR(300) NOT NULL,
    "url" VARCHAR(50) NOT NULL,
    "in_queue" BOOLEAN DEFAULT TRUE,
    "queue_order" TIMESTAMP DEFAULT NOW(),
    "favorited" BOOLEAN DEFAULT false
);


