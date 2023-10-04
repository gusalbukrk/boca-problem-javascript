# BOCA problem package example with support for JavaScript submissions

This problem package was generated using BOCA'S `boca/admin/buildproblem.php` page. But, to be able to accept submissions in JavaScript, **4 files were added** — `compare/js`, `compile/js`, `limits/js` and `run/js`. These files are the same as their `py3` counterparts, except for the use of `node` instead of `python3` for the execution of the submitted code.

Therefore, to be able to test JavaScript submissions, **Node** must've been installed in the BOCA server. You can install it using the following command: `wget https://nodejs.org/dist/v18.18.0/node-v18.18.0-linux-x64.tar.xz && tar -xf node-v18.18.0-linux-x64.tar.xz && sudo cp node-v18.18.0-linux-x64/bin/node /home/bocajail/usr/bin/`.

Also, it's necessary to include JavaScript in the `Languages` page (`admin/language.php`) with the `Extension` field set to `js`.

During the contest, the participants which intend to submit solutions in JavaScript, must've at their disposal the following file exporting the **`input()`** function to be used to create prompts:

```js
import fs from 'fs';
import readline from 'readline/promises';

let input, close = () => null;

if (process.stdin.isTTY) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  input = async () => await rl.question('');

  close = () => rl.close();
} else {
  input = (() => {
    var data = fs.readFileSync(0, 'utf-8');

    // removing last element because it's an empty line
    const inputs = data.split('\n').slice(0, -1);

    let counter = 0;  

    return () => inputs[counter++];
  })();
}

export { input, close };
```

This file is only needed so participants can test their code in the development environment. It's not necessary to submit this file to BOCA (actually, it's not even possible given that BOCA only accepts one file per submission). The `run/js` script already creates a file with the same contents in the server for each submission.

Note that the JavaScript code must be written as an ES Module because of the use of features as `import` and `top-level await`. Therefore, the **file extension** of the submission must be `.mjs` instead of `.js`. For clarity, check out the JavaScript solution for this package problem in the [solutions/A.mjs](./solutions/A.mjs) file.

Note that the JavaScript code must be written as an **ES Module** because of the use of features as `import` and `top-level await`. Therefore, the file extension of the submission must be `.mjs` instead of `.js` or there must be a `package.json` in the same directory as the submission with the contents `{ "type": "module" }`. As an example, check out the [solutions/A.mjs](./solutions/A.mjs) file for a solution using the `.mjs` extension approach.

## To Do

Currently, [run/js](./run/js) is executing the `node` command directly. However, every other language's `run` script uses `safeexec`. When trying to run `node` through `safeexec`, no output is shown and `echo $?` prints the error code 13 which is returned when an ESM-based script exited before the top-level code was resolved. Maybe there's a combination of `safeexec` arguments that can make it work.
