require('dotenv').config();
const {ENV_PORT} = require("./env");
const server = require("./api/server");
const PORT = process.env.PORT || ENV_PORT;

server.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})