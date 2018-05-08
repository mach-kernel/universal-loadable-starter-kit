if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

module.exports = function bootstrap(type) {
  let env = (process.env.NODE_ENV || 'development').toString().toLowerCase();

  let conf = type.toString().toLowerCase() === 'client' ? 
             require(`./client/${env}`) :
             require(`./server/${env}`);

  return conf;
}