# ProTo Main Web Site #
## How to install ##
### First install node packages ###
```
npm install
npm install -g bunyan less #need root access on linux
```
### Second Create/Edit config file ###
```
cp ./config/config.js.example ./config/config.js
```
For windows' cmd users : you need to edit rootFolder. Remove process.env.PWD and replace it by the absolute path to the project

You may also want to change the config.logLevel value for debug

## How to run ##
First generate stylesSheets
```
lessc www/styles/style.less www/styles/style.css
```
For those who don't care about logs or other server side information :
```
node server.js
```
For people who want more :
```
node server.js | bunyan
```
Happy coding!
