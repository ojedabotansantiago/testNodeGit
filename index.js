/* workingDirPath = <your project path> */

let workingDirPath = './C:\workspace\node-mock-server';
const simpleGit = require('simple-git/promise');
const git = simpleGit();
/*
    steps app does for synchronize in two repositories
    .0  git status  ok
    .1  checkout develop everis ok
    .2  pull develop Everis ok
    .3  git add . ok
    .4  git commit -m ''  ok
    .3 git push develop santader
*/

async function init() {
    await git.status().then(statusProyect => {
        console.log(statusProyect);        
        if(!!statusProyect.modified.length){
            console.error('app detected changes in git pool, please revise your project files');
            const err = 'error when doing the status';
            throw new Error(err);
        }
       return checkoutDevelop()
    }).catch(err=>{ return err });
    
}

async function checkoutDevelop() {
  return await git.checkout('develop').then(data => {
      console.log('checkout develop complete');
      console.log(data);
      return pullOrigin();
    })
    .catch(err => {
        console.log(error)
      return err;
    });
}

async function pullOrigin(){
    return await git.pull('origin', 'master').then(data =>{
         console.log(data)
         gitAddCommitPush();
    }).catch(err => console.log(' fail to download branch'));
}

async function gitAddCommitPush() {
  await git.add('./*').catch(err=> console.log(err));
  await git.commit("automatic commit").catch(err=> console.log(err));
  await git.push('santander', 'develop').then(data=>{
      console.log(`push from everis to santander is success >>> ${data}`);
      return data;
  }).catch(err=>{
      return err;
  });    
}

console.log('init app');
init().then(data =>console.log(`exit app with operation => ${data}`)).catch(err =>{
    console.error(`exit app with operation error ${err}`);
});
