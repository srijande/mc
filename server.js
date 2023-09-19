const { ScriptServer } = require('@scriptserver/core');
const { useEssentials } = require('@scriptserver/essentials');

const server = new ScriptServer({
    javaServer: {
      path: './server/',
      jar: 'server.jar',
      args: ['-Xmx1024M', '-Xms1024M'],
    },
    rconConnection: {
      port: 25575,
      password: 'password',
    },
  });
useEssentials(server);
// server.use(require('scriptserver-event'));
// server.use(require('scriptserver-util'));
// server.use(require('scriptserver-command'));
// server.use(require('scriptserver-json'));


module.exports = server;