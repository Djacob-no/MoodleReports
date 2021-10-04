
//const gradeData = require("./grades.json");


const useDataManager = (searchInput, from, to, rawData, gradeData, passingScore) => {
    let tdata = [0,0,0];
   // console.log(rawData.data);
    if (rawData.data) {
        tdata = rawData.data;


        //filter function used to filter json data based on time and search term 
        function searchFilter(e) {
            if (e.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1) {
                let date;
                if (e.timefinish) {
                    date = e.timefinish;
                    //e.dateFormat = new Date(e.timefinish*1000)
                } else {
                    date = e.timemodified;
                   // e.dateFormat = new Date(e.timemodified*1000)
                }
                
                //const mdate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                const fromDateSeconds = new Date(from).getTime()/1000.0;
                const toDateSeconds = new Date(to).getTime()/1000.0;
                //console.log("date is " +mdate +"from is "+from+" to is "+to)
                if (date >= fromDateSeconds && date <= toDateSeconds) {
                    return e
                }
            }
        }
        //filter data in by global search and time
        const fdata = tdata.filter(searchFilter);
        const fGradeData = gradeData.filter(searchFilter);
        fGradeData.map(function (e) {
            e.dateFormat = new Date(e.timemodified*1000)
        });
      
        

        
        const exams = []; //temporary storage
        const examsObject = []; //returned object
        const sorted = []; //returned object
        const totalAttempts = fdata.length; //returned number


        //modifies tdata list and adds whether its a passed or failed attempt and a percentage score
        //also creates the exams array used in the sorting function below
        fdata.map(function (e) {
            e.scorePercent = ((e.Score / e.MaxScore) * 100).toFixed(2);
            e.passed = (e.scorePercent >= passingScore ? true : false);
            if(e.timefinish) e.dateFormat = new Date(e.timefinish * 1000);
            if(e.timemodified)e.dateFormat = new Date(e.timemodified * 1000);
            if (exams.indexOf(e.name) === -1) {
                exams.push(e.name);
                sorted.push([]);
            }
        });


        //returns array 12 numbers corresponding to each month and amount of attempts that month
        const montlyAttempts = (() => {
            const fromDateObject = new Date(from);
            const toDateObject =new Date(to);
            function monthDiff(d1, d2) {
                let months;
                months = (d2.getFullYear() - d1.getFullYear()) * 12;
                months -= d1.getMonth();
                months += d2.getMonth();
                return months <= 0 ? 0 : months;
            }
            const monthsDifference = monthDiff(fromDateObject, toDateObject);
            const attemptsM = [];
            
            //loops though each month in the timeframe
            for (let i = 0; i < monthsDifference; i++) {
                const thisMonth = new Date(fromDateObject.getFullYear(),fromDateObject.getMonth()+i);
              
                const thisMonthString = `${(thisMonth.getMonth()+1)}-${thisMonth.getFullYear()}`;
                let monthlyRecord = {date:thisMonthString, "total":0,"passed":0, "failed":0};
                //loops through list of attempts 
                for (let j = 0; j < fdata.length; j++) {
                    const attemptDateObject = fdata[j].dateFormat;
                    const attemptsDateString = `${(attemptDateObject.getMonth()+1)}-${attemptDateObject.getFullYear()}`;
                    if(thisMonthString === attemptsDateString){
                        monthlyRecord.total++
                        if (fdata[j].passed === true) monthlyRecord.passed++;
                        if (fdata[j].passed === false) monthlyRecord.failed++;
                    }
                }
                attemptsM.push(monthlyRecord);
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

        //console.log(fdata);
        return { "monthlyAttempts": montlyAttempts, "search": searchInput,"to":to, "from":from, "examsOverview": examsObject, "examDataRaw": fdata, "examData": sorted, "totalAttempts": totalAttempts, "passCountFunction": passCount, "finalGrades": fGradeData }
    } else return null;
}

export default useDataManager
