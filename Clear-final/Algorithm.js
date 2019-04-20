var processes = [];
var numberOfProcesses;
var count = 0;
var colourPallete = ["#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff","#00ffff"]

clearInputs(5);
checkForEmpty("input_ProName");
checkForEmpty("input_ProSubTime");
checkForEmpty("input_ProBurstTime");

function clearInputs(clue) {
    document.getElementById("input_ProName").value = "";
    document.getElementById("input_ProSubTime").value = "";
    document.getElementById("input_ProBurstTime").value = "";
    document.getElementById("input_ProColor").value = pickNewColour(colourPallete);
    if (clue == 5) {
        document.getElementById("input_NoProcess").value = "";
    }
}

function checkForEmpty(ids) {
    for (var i = 0; i < ids.length; i++) {
        if (document.getElementById(ids[i]).value == "") {
            console.log("qwerty");
            return false;
        }
        return true;
    }
}

function inputNum() {
    numberOfProcesses = parseInt(document.getElementById("input_NoProcess").value, 10);
    document.getElementById("button_Add").disabled = false;
}

function addToArray() {
    if (processes.length < numberOfProcesses) {
        if (checkForEmpty(["input_ProName", "input_ProBurstTime", "input_SubTime"])) {
            var processA = new Process((document.getElementById("input_ProName").value).toString(), parseInt(document.getElementById("input_ProSubTime")
                .value, 10), parseInt(document.getElementById("input_ProBurstTime").value, 10), (document.getElementById("input_ProColor").value).toString());
            processes.push(processA);
            var processRow = createTableRow(processA);
            attachTableRow(processRow);
            clearInputs(4);
        } else { 
            document.getElementById("para_errorLog").innerText = "fill all correctly"; 
        }
    } else {
        document.getElementById("para_errorLog").innerText = "Process Full";
        //alert("Process Full");
        document.getElementById("button_Add").disabled = true;
    }
}

function pickNewColour(colorArray) {

    if (colorArray.length > 0) {
        var number = Math.floor(Math.random() * (colorArray.length));
        console.log(number);
        var color = colorArray.splice(number, 1);
        console.log(color);
        return color;
    } else {
        return "#9d2525"
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
            button_del.addEventListener("click", function () {
                var cell = this.parentElement;
                var row = cell.parentElement;
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
    count = + 1;
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
    var sortedProcesses = [];
    var timeIndex = 0;
    while (processes.length > 0) {
        var shortestJob = nextSJ(processes, timeIndex);
        shortestJob.calculateTime(timeIndex);
        sortedProcesses.push(shortestJob);
        var Listitem = createListItem(shortestJob, timeIndex);
        attachListItem(Listitem);
        var cat = shortestJob.ProcessName + " executes at second " + timeIndex.toString()
            + " until " + (timeIndex + shortestJob.BurstTime).toString();
        timeIndex += shortestJob.BurstTime;
    }
    var test = getGraphValueArray(sortedProcesses);
    plotGraph(test);
}

function getGraphValueArray(array) {
    var valueArray = [];
    for (var v = 0; v < array.length; v++) {
        var item = {
            "name": array[v].ProcessName,
            "startTime": array[v].StartTime,
            "endTime": array[v].StartTime + array[v].BurstTime,
            "color": array[v].ProcessColor,
        }
        valueArray.push(item);
    }
    return valueArray;
}
