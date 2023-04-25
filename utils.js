// gets unixtime in seconds.
const currUnixtime = () => Math.floor(new Date().getTime() / 1000);

// gets first command line argument.
const getCliArg = (errMsg) => {
  if (process.argv.length <= 2) {
    console.error(errMsg);
    process.exit(1);
  }
  return process.argv[2];
};

module.exports = {
  currUnixtime,
  getCliArg,
};
