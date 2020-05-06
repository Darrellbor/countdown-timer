const isServer = false;

const clientServer = isServer
  ? "https://countdown.netlify.app/"
  : "http://localhost:3000/";

module.exports = {
  isServer,
  clientServer
};
