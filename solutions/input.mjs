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
