const isServer = false;

const clientServer = isServer
  ? "https://downtimer.netlify.app/"
  : "http://localhost:3000/";

module.exports = {
  isServer,
  clientServer
};
