/*
    npm library https://www.npmjs.com/package/simple-git
    to work this script yo need to have two remotes, origin and santander
    for do this open a terminal in your project root and launch this command:
        *git remote add santander <https://github.com/yourGitPathInHere>
    steps app does for synchronize in two repositories
    .0  git status  ok
    .1  checkout develop everis ok
    .2  pull develop Everis ok
    .3  git add . ok
    .4  git commit -m ''  ok
    .3 git push develop santader
*/
/* workingDirPath = <your project path> */
let workingDirPath = './C:workspace\node-mock-server';
const simpleGit = require('simple-git/promise');
const git = simpleGit();

async function init() {
  return await git
    .status()
    .then(statusProject => {
      console.log(statusProject);
      if (!!statusProject.modified.length) {
        console.error(
          'app detected changes in git pool, please check next files:'
        );
        statusProject.modified.forEach(file => {
          console.error(`-> ${file}`);
        });
        throw new Error();
      }
      return checkoutDevelop();
    })
    .catch(err => {
      throw err;
    });
}

async function checkoutDevelop() {
  return await git
    .checkout('develop')
    .then(data => {
      console.log('checkout develop complete');
      console.log(data);
      return pullOrigin();
    })
    .catch(err => {
      console.log(`ERROR to checkout origin/Develop branch ${error}`);
      throw err;
    });
}

async function pullOrigin() {
  return await git
    .pull('origin', 'master')
    .then(data => {
      console.log(data);
      gitAddCommitPush();
    })
    .catch(_ => {
      console.log('ERROR to download branch');
      throw err;
    });
}

async function gitAddCommitPush() {
  console.info('doing git add');
  await git.add('./*').catch(err => {
    console.log(err);
    throw err;
  });
  console.info('doing git commit');
  await git
    .commit('automatic commit')
    .then(_ => {
      console.info('git commit DONE');
    })
    .catch(err => {
      console.log(err);
      throw err;
    });

  return gitPushOtherOrigin();
}

async function gitPushOtherOrigin() {
  console.info('doing git push');
  return await git
    .push('santander', 'develop')
    .then(data => {
      console.log(`push from everis to santander is success >>> ${data}`);
      return data;
    })
    .catch(err => {
      console.info(`error doing git push:  ${err}`);
      throw err;
    });
}

console.log('init app');
init()
  .then(_ => console.log(`exit app with operation SUCCESS`))
  .catch(err => console.error(`exit app with operation ERROR: ${err}`));
