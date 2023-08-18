// import { createClient } from "@supabase/supabase-js";

/* the only line you likely need to change is

 database: 'prime_app',

 change `prime_app` to the name of your database, and you should be all set!
*/

const pg = require("pg");
let pool;

// When our app is deployed to the internet
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg:
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
console.log("MADE IT TO POOLJS");
if (process.env.DATABASE_URL) {
    console.log('FOUND DATABASE URL');
	pool = new pg.Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	});
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is
// also running on our computer (localhost)
else {
	pool = new pg.Pool({
		host: "localhost",
		port: 5432,
		database: "low_key_oke_base", // 	💥 Change this to the name of your database!
	});
}

// const supabaseUrl = "https://nurcizukdintkioijqwi.supabase.co";
// const supabaseKey = process.env.DATABASE_URL;
// const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = pool;
