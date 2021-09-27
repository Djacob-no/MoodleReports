
const gradeData = require("./grades.json");


const useDataManager = (searchInput,time,rawData) => {
    let tdata =[];
    if(rawData.data) {
    tdata = rawData.data;

    
    //filter function used to filter json data based on time and search term 
    function searchFilter(e){
        if (e.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1) {
            let date;
            if(e.timefinish){
                date = new Date(e.timefinish * 1000);
            } else date = new Date(e.timemodified * 1000);

            var examDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            let dateFrom = time.from;
            let dateTo = time.to;

            let d1 = dateFrom.split("/");
            let d2 = dateTo.split("/");
            let c = examDate.split("/");

            let from = new Date(d1);  // -1 because months are from 0 to 11
            let to = new Date(d2);
            let checkdate = new Date(c);

            if (checkdate >= from && checkdate <= to) {
                return e
            }
        }
    }
    //filter data in by global search and time
    const fdata = tdata.filter(searchFilter);
    const fGradeData = gradeData.filter(searchFilter);

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
        e.dateFormat = new Date(e.timefinish * 1000);
        if (exams.indexOf(e.name) === -1) {
            exams.push(e.name);
            sorted.push([]);
        }
    });


    //returns array 12 numbers corresponding to each month and amount of attempts that month
    const montlyAttempts = (() => {
        let attemptsM = {
            "totalAttempts": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "passedAttempts": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "failedAttempts": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        for (let i = 0; i < fdata.length; i++) {
            let eMonth = new Date(fdata[i].timefinish * 1000);
            attemptsM.totalAttempts[eMonth.getMonth()]++;
            if (fdata[i].passed === true) attemptsM.passedAttempts[eMonth.getMonth()]++;
            if (fdata[i].passed === false) attemptsM.failedAttempts[eMonth.getMonth()]++;
        }
        return attemptsM
    })();

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
        examsObject.push({ "name": name, "passCount": passCount, "failCount": failCount, "failPercent": failCount / (passCount + failCount) });
    }

    //count up all passed/failed attempts from all exams in the examsOverview object 
    const passCount = (p) => {
        let passStack = 0,
            failStack = 0;
        for (let i = 0; i < examsObject.length; i++) {
            passStack += examsObject[i].passCount;
            failStack += examsObject[i].failCount;
        }
        if (p === "pass") return passStack;
        if (p === "fail") return failStack;
    }

    console.log(fdata);
    return { "monthlyAttempts": montlyAttempts, "passingScore": passingScore, "examsOverview": examsObject,"examDataRaw": fdata, "examData": sorted, "totalAttempts": totalAttempts, "passCountFunction": passCount, "finalGrades":fGradeData}
    }else return null;
}

export default useDataManager