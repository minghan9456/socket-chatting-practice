# sayhi - simple socket chat room

### Set up

1. git clone project
```
$ git clone git@github.com:minghan9456/sayhi.git
```
2. npm install
```
$ cd sayhi
$ npm install
```

3. Create constant file
```
$ cp ./config/constant.example.js ./config/constant.js
```

4. Follow [google sign in guide](https://developers.google.com/identity/sign-in/web/sign-in) to get google client id, then add to config/constant.js

5. Set up your database info in config/constant.js.

6. Launch server
```
node server.js
```
