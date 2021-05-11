# 01A Creating Directories 
mkdir dir logos
cd logos
mkdir server
cd server

# 01B Initializing the project
npm init
mkdir src
touch src/server.js
npm install express
npm run start

# 02 Enable TypeScript
npm install --save-dev typescript
sudo apt install node-typescript
tsc --init
mv src/server.js src/server.ts
npm i --save-dev @types/express
npm run start

# 03 eslint with TypeScript
eslint --init
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
npx prettier-init

# 04
cd src
# create .env with env variable
touch .env
npm install dotenv
# env validation and default values
mkdir utils
touch utils/validate.env.ts
npm install envalid
# server class and config
mkdir config
touch config/server.config.ts

# 05
npm install --save-dev ts-node nodemon 
touch nodemon.json
npm install --save-dev husky 

# 05 Editor Config
touch .editorconfig
## Set up ESlint, Prettier & EditorConfig without conflicts
## https://blog.theodo.com/2019/08/empower-your-dev-environment-with-eslint-prettier-and-editorconfig-with-no-conflicts/


# 06 Middlewares
## The CORS mechanism supports secure cross-origin requests 
## and data transfers between browsers and servers. 
npm install cors
npm i --save-dev @types/cors
## HTTP request logger middleware for node.js
npm install morgan
npm i --save-dev @types/morgan
## Parse Cookie header and populate req.cookies with an object 
## keyed by the cookie names. 
npm install cookie-parser
npm i --save-dev @types/cookie-parser

# 07 Error Handling
mkdir src/middleware
touch src/middleware/error.middleware
mkdir src/exceptions

# 08 User Authentication
npm install class-validator
npm install mongoose
npm install bcrypt
npm install --save-dev @types/bcrypt
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
npm install class-transformer
npm install typescript-logging
