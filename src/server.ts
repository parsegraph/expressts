export const DIST_NAME = "expressts";
import express from "express";

export default (root: string) => {
  const app = express();

  app.get(root, async (req: any, res: any) => {
    let resp = "";
    const write = (text: any) => {
      resp += text + "\n";
    };

    write(`<!DOCTYPE html>`);
    write(`<html>`);
    write(`<head>`);
    write(`<title>${DIST_NAME}</title>`);
    write(`</head>`);
    write(`<body>`);
    write(
      `<h1>${DIST_NAME} </h1>` +
      `<a href='${root}/docs'>Typedoc</a>`
    );
    write(`</body>`);
    write(`</html>`);

    res.end(resp);
  });

  app.use(root, express.static("./dist"));

  return app;
};
