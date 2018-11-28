# Ion
A simple URL Shortener built using Node, Express, Pug and MySQL.

## Usage

Clone this repository and run `npm install`. Set the values to the following environment variables before starting the application using `npm start`:

 - `ION_DB_URL` - A URL string which let's Ion connect to your MySQL instance (see [here](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-jdbc-url-format.html))
 - `APEX_DOMAIN` - The URL you want your base domain to redirect to, like [bit.ly](http://bit.ly) redirects to [bitly.com](https://bitly.com) (defaults to this GitHub page)
 - `ADMIN_PASSWORD` - The administration password for the shorten page (defaults to `ion`)
 - `PORT` - The port you want Ion to listen on (defaults to `3000`)

### Administration

Go to `yourdomain/shorten?pass=YourAdminPassword` if you've deployed online, or to `localhost:3000/shorten?pass=YourAdminPassword` if you're just trying it out locally.

**NOTE:** If no environment variable is set for `ADMIN_PASSWORD`, it will default to `ion`.

## Deploy
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/someshkar/ion)