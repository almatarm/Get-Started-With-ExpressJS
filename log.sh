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
# server class
mkdir config
touch config/server.config.ts

