export const DIST_NAME = "expressts";
import express from "express";
import glob from "glob";

async function getDemos(): Promise<string[]> {
  return new Promise((respond, reject) => {
    glob("../www/*.html", {}, function (err: any, files: string[]) {
      if (err) {
        reject(err);
      }
      // files is an array of filenames.
      respond(
        files.map((file: string) => {
          const m = file.match(/www\/(\w+)\.html/);
          [1];
          return m ? m[1] : null;
        })
      );
    });
  });
}

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
      `<h1>${DIST_NAME} <a href='${root}/coverage/lcov-report/'>Coverage</a> <a href='${root}/docs'>Docs</a></h1>`
    );
    write(
      `<p>This library is available as a <a href="${root}/src/index.js">JavaScript UMD module</a></p>`
    );
    write(`<h2>Samples &amp; Demos</h2>`);
    write(`<ul>`);
    (await getDemos()).forEach((demo) => {
      demo && write(`<li><a href='${root}/${demo}.html'>${demo}</li>`);
    });
    write(`</ul>`);
    write(`</body>`);
    write(`</html>`);

    res.end(resp);
  });

  app.use(root, express.static("./dist"));

  return app;
};
