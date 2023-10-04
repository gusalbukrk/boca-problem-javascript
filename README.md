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

## Background information

BOCA's [official docs](https://github.com/cassiopc/boca/blob/master/doc/ADMIN.txt) defines **problem packages** as:

> A zip file (encrypted or not) containing all information about the problem.

About the package problem **structure**, the documentation states:

> \[The package problem\] shall have the following folders inside it: `compare/`, `compile/` `description/`, `input/`, `limits/`, `output/`, `run/` e `tests/`.</br></br>Inside `compare/`, `compile/`, `limits/`, `runs/`, there should be an executable (usually a shell script) with the name of each language extension that is configured in BOCA (within tab languages). Inside `description/`, there must exist a text file named `problem.info`, with the following lines: `basename=shortfilename`, `fullname=This is the problem full name` e `descfile=desc.txt` \[and another file — usually `.txt` or `.pdf` — with the same name as the value assigned to the `descfile` attribute containing the full description of the problem\]. [...]</br></br>Inside `input/` and `output/` there must have files in a one-to-one correspondence and with the same filenames. Each file in input will be given as standard input to the code that has been submitted, and later the generated output will be compared to the file with same name that is in the `output/` folder.</br></br>The folder `tests/` may contain any executable files that are meant to test the autojudge system in the first time it is run.

Futhermore, the sequence of the **execution of the scripts** inside the problem package is described as follows:

> When a submission arrives for the first time for a given problem, the corresponding problem package is downloaded by the autojudge from the server. Then the autojudge reads the `description/problem.info` to obtain the basename of the problem, runs the scripts in the directory `tests/` to check if everything is ok (the person who specified the problem package can include any desired code to be tested in such directory, and this code will be run and should return zero on success and non-zero otherwise), runs the scripts inside `limits/` for each language to obtain the time-limits of the problem, and then proceeds to run the submission itself. If the problem had already been run by the autojudge, then these steps are not performed, but are cached and the information is reused later.</br></br>To test a submission, the autojudge runs the script in the `compile/` folder corresponding to the language of the submission, which obtains an executable version of the code. Then the script of `run/` for the given language is executed for each file in the `input/` directory, and finally the script in `compare/` is performed (again for the given language and every file in the `output/` directory), checking if the results are correct.

## To Do

Currently, [run/js](./run/js) is executing the `node` command directly. However, every other language's `run` script uses `safeexec`. When trying to run `node` through `safeexec`, no output is shown and `echo $?` prints the error code 13 which is returned when an ESM-based script exited before the top-level code was resolved. Maybe there's a combination of `safeexec` arguments that can make it work.
