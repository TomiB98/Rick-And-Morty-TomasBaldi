const server = require('./App')
const PORT = 3001
const { conn } = require('./DB_connection');

conn.sync({force: true})


server.listen(PORT, () => console.log(`Listening on port: ${PORT}!`))