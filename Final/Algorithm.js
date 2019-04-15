var processes = [];
var numberOfProcesses;
var count =0;

function inputNum() {
    numberOfProcesses = parseInt(document.getElementById("input_NoProcess").value, 10);
    document.getElementById("button_Add").disabled = false;
}

function addToArray() {

    if (processes.length < numberOfProcesses) {

        var processA = new Process((document.getElementById("input_ProName").value).toString(), parseInt(document.getElementById("input_ProSubTime")
            .value, 10), parseInt(document.getElementById("input_ProBurstTime").value, 10), (document.getElementById("input_ProColor").value).toString());
        console.log(processA.ProcessName + " " + processA.ProcessColor + " " + processA.SubmissionTime);
        processes.push(processA);
        console.log(processes);
        var processRow = createTableRow(processA);
        attachTableRow(processRow);
    } else {
        document.getElementById("para_errorLog").innerText = "Process Full";
        //alert("Process Full");
        document.getElementById("button_Add").disabled = true;
    }
    for (var yv = 0; yv < processes.length; yv++) {
        console.log(typeof (processes[yv]));
    }

}

function createListItem(value, t) {
    var item = document.createElement('li');
    item.innerText = value.ProcessName + " is executed at " + t.toString() + " until " + (t + value.BurstTime).toString();
    return item;
}

function attachListItem(item) {
    var ulElement = document.getElementById('list_execution');
    ulElement.appendChild(item);
}

function createTableRow(Process) {
    params = ['ProcessName', 'SubmissionTime', 'BurstTime', 'ProcessColor'];
    var row = document.createElement('tr');
    for (var k = 0; k < 5; k++) {
        if (k < 3) {
            var cell = document.createElement('td');
            cell.innerText = Process[params[k]];
        } else if (k == 3) {
            var cell = document.createElement('td');
            cell.bgColor = Process.ProcessColor.toString();
        } else if (k == 4) {
            var button_del = document.createElement('button');
            button_del.id = "buttoni";
            button_del.addEventListener("click",function() {
                var cell = this.parentElement;
                var row = cell.parentElement;
                console.log(row);
                var table = row.parentElement;
                //console.log(table);
                table.removeChild(row);
              });
            button_del.innerText = "delete Row";
            var cell = document.createElement('td');
            cell.appendChild(button_del);
        }
        row.appendChild(cell);
    }
    row.id = count;
    count =+ 1;
    return row;
}

function attachTableRow(row) {
    var tableBody = document.getElementById('tableBody_Process');
    tableBody.appendChild(row);
}

function getAvailabeProcesses(processList, time) {
    currentAvailable = [];
    for (var p = 0; p < processList.length; p++) {
        if (time >= processList[p].SubmissionTime) {
            var pro = processList.splice(p, 1);
            currentAvailable.push(pro[0]);
            //WOW what a mistake
            p = p - 1;
        }
    }
    return currentAvailable;
    //array of process objects which are available at given time
}

function countAvailableProcesses(processList, time) {
    var count = 0;
    for (var q = 0; q < processList.length; q++) {
        if (time >= processList[q].SubmissionTime) {
            count += 1;
        }
    }
    return count;
}

function createIdleProcesses(processList, time) {
    var iterations = 1;
    while (countAvailableProcesses(processList, time + iterations) == 0) {
        iterations += 1;
    }
    return iterations;
}

function nextSJ(processList, time) {
    var minindex;
    var minVal = 10000000;
    var available = getAvailabeProcesses(processList, time);
    console.log(available.length);
    if (available.length > 0) {
        for (var p = 0; p < available.length; p++) {
            if (available[p].BurstTime < minVal) {
                minVal = available[p].BurstTime;
                minindex = p;
            }
        }
        var SJ = available.splice(minindex, 1);
        //method to add available array to processes array
        for (var z = 0; z < available.length; z++) {
            processList.push(available[z]);
        }
        return SJ[0];

    } else {
        var newIdleTime = createIdleProcesses(processList, time);
        var newProcess = new Process("IDLE", time, newIdleTime, "#999999");
        return newProcess;
    }

}

function Submission() {
    var timeIndex = 0;
    while (processes.length > 0) {
        var shortestJob = nextSJ(processes, timeIndex);
        shortestJob.calculateTime(timeIndex);
        var Listitem = createListItem(shortestJob, timeIndex);
        attachListItem(Listitem);
        var cat = shortestJob.ProcessName + " executes at second " + timeIndex.toString()
            + " until " + (timeIndex + shortestJob.BurstTime).toString();
        console.log(cat);
        timeIndex += shortestJob.BurstTime;
    }
}

