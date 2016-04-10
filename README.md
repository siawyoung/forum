# Forum

A chat app built with Hapi.js and sockets. Styles are built with PostCSS. Routing is handled on the server-side, while rendering is client-side. Redis is used as the primary data store. No Webpack was used - all browser external dependencies are loaded in via CDNs, although browser scripts are still written in ES6 and transpiled.