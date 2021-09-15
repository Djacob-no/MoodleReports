
const tdata = require("./databaseMoodle.json");
//console.log(tdata);

const dataManager = (searchInput) => {
    //filter data in by global seach
    const fdata = tdata.filter(e => {
        const dateformat = new Date(e.timefinish).toLocaleDateString()
        console.log(e.timefinish);
        if (e.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1) { return e }
    });
    const passingScore = 80; //input variable
    const exams = []; //temporary storage
    const examsObject = []; //returned object
    const sorted = []; //returned object
    const totalAttempts = fdata.length; //returned number



    //modifies tdata list and adds whether its a passed or failed attempt and a percentage score
    //also creates the exams array used in the sorting function below
    fdata.map(function (e) {
        e.scorePercent = (e.Score / e.MaxScore) * 100;
        e.passed = (e.scorePercent >= passingScore ? true : false);
        if (exams.indexOf(e.name) === -1) {
            exams.push(e.name);
            sorted.push([]);
        }

    });

     //returnes object with 2 arrays one being months of the year and 2 being number of attempts that month
    const montlyAttempts =(() => {
        let months =[];
        let attemptsM =[];
        for(let i=0;i<fdata.length;i++){
           let eMonth = new Date(fdata[i].timefinish).toLocaleDateString('en-us', {  month:"long"});
           if(months.indexOf(eMonth) === -1) months.push(eMonth);
        }
        return {"months":months, "attempts":attemptsM}
      })();
      //console.log(montlyAttempts)

    //sorts the tdata object into an array(sorted[]) that contains arrays of each exams results. 
    fdata.map(function (e) {
        let sortIndex = exams.indexOf(e.name);
        sorted[sortIndex].push(e);
    });

    //creates the  examsObject with each exam and how many passed or failed 
    //that exam based on the passingScore variable
    for (let i = 0; i < sorted.length; i++) {
        let passCount = 0;
        let failCount = 0;
        let name;
        for (let j = 0; j < sorted[i].length; j++) {
            name = sorted[i][j].name;
            if (sorted[i][j].passed === true) {
                passCount++
            } else failCount++;
        }
        examsObject.push({ "name": name, "passCount": passCount, "failCount": failCount });
    }

    //count up all passed/failed attempts from all exams in the examsOverview object and give them to whomever is asking
    const passCount = (p) => {
        let passStack = 0,
            failStack = 0;
            for (let i = 0; i < examsObject.length; i++) {
                passStack += examsObject[i].passCount;
                failStack += examsObject[i].failCount;
            }
        if (p === "pass") return passStack ;
        if (p === "fail") return failStack ;
    }

    return { "passingScore": passingScore, "examsOverview": examsObject, "examData": sorted, "totalAttempts": totalAttempts, "passCountFunction": passCount }
}
console.log(dataManager("electrical"))

//export default dataManager

