console.log('init app');

/* workingDirPath = <your proyect path> */

let workingDirPath = './C:\workspace\node-mock-server';
const simpleGit = require('simple-git/promise');
const git = simpleGit();

//git.pull('origin', 'master').then(data => console.log(data)).catch(err=> console.log('error al descargar la rama'));
/* 
    .0  git status  
    .1  checkout develop everis
    .2  pull develop everis
    .3  git add .
    .4  git commit -m "" 
    .3 git push develop santader
*/
async function init(params) {
    console.log('init app');
    git.status().then(statusProyect => {
        console.log(statusProyect);        
        if(!!statusProyect.modified.length){
            console.error('se han detectado cambios por favor revisa los archivos');
        }
        checkoutDevelop()
    });
    
}

function checkoutDevelop() {
    
}
console.log('init app')
init().then(_=>console.log('exit app'));
