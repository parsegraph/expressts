const { readFileSync, statSync } = require("fs");
import app from "./server";

const getPort = (port: number) => {
  try {
    if (statSync("../demo.port")) {
      port = parseInt(readFileSync("../demo.port"));
    }
  } catch (ex) {
    console.log(ex);
  }
  if (process.env.SITE_PORT) {
    try {
      port = parseInt(process.env.SITE_PORT);
    } catch (ex) {
      // Suppress exception
      console.log("Exception parsing SITE_PORT: ", ex);
    }
  }
  const args = process.argv.slice(2);
  if (args.length > 0) {
    try {
      port = parseInt(args[0]);
    } catch (ex) {
      // Suppress exception
      console.log("Exception parsing site port from first argument: ", ex);
    }
  }
  return port;
};
const port = getPort(3000);

const getRootPath = () => {
  if (process.env.SITE_ROOT) {
    return process.env.SITE_ROOT;
  }
  return "";
};
const root = getRootPath();

app(root).listen(port, () => {
  console.log(
    `See expressts build information at http://localhost:${port}${root}`
  );
});
