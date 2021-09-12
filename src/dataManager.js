
const tdata = require("./databaseMoodle.json");

let exams =[];
let sorted =[];

tdata.map(function(e){
    if(exams.indexOf(e.name) == -1){
        exams.push(e.name);
        sorted.push([]);
    }
})

tdata.map(function(e){
    sortIndex = exams.indexOf(e.name);
    sorted[sortIndex].push(e);
})

console.log(sorted[8]);

