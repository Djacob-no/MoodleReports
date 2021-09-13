
const tdata = require("./databaseMoodle.json");


const dataManager = (search) => {
    
let passingScore = 70;
let exams =[];
let examsObject=[];
let sorted =[];
let totalAttempts = tdata.length;

//modifies tdata list and adds whether its a passed or failed attempt and a percentage score
tdata.map(function(e){
    e.scorePercent = (e.Score/e.MaxScore)*100;
    e.passed = (e.scorePercent >= passingScore ? true : false);
    if(exams.indexOf(e.name) === -1){
        exams.push(e.name);
        sorted.push([]);
    }
    
})
//sorts the tdata object into an array(sorted[]) that contains arrays of each exams results. 
tdata.map(function(e){
    let sortIndex = exams.indexOf(e.name);
    sorted[sortIndex].push(e);
})

//creates the  examsObject with each exam and how many passed or failed 
//that exam based on the passingScore variable
for(let i=0;i<sorted.length;i++){
    let passCount = 0;
    let failCount = 0;
    let name;
    for(let j=0;j<sorted[i].length;j++){
        name = sorted[i][j].name;
        if(sorted[i][j].passed === true){
            passCount++
        }else failCount++;
    }
    examsObject.push({"name": name, "passCount":passCount,"failCount":failCount});
}

    return {"passingScore":passingScore, "examsOverview":examsObject, "examData":sorted, "totalAttempts":totalAttempts}
}

export default dataManager
//export {examsObject,sorted,totalAttempts}

