var processes = [];
var numberOfProcesses;

function inputNum() {
    numberOfProcesses = parseInt(document.getElementById("input_NoProcess").value, 10);
    document.getElementById("button_Add").disabled = false;
}

function addToArray() {

    if (processes.length < numberOfProcesses) {

        var processA = new Process((document.getElementById("input_ProName").value).toString(), parseInt(document.getElementById("input_ProSubTime")
            .value, 10), parseInt(document.getElementById("input_ProBurstTime").value, 10), (document.getElementById("input_ProColor").value).toString());
        console.log(processA.ProcessName +" "+processA.ProcessColor+" "+processA.SubmissionTime );
        processes.push(processA);
        console.log(processes);
        var processRow = createTableRow(processA);
        attachTableRow(processRow);
    } else {
        document.getElementById("para_errorLog").innerText = "Process Full";
        //alert("Process Full");
        document.getElementById("button_Add").disabled = true;
    }
}

function createTableRow(Process) {
    params = ['ProcessName','SubmissionTime','BurstTime','ProcessColor'];
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
            button_del.innerText = "delete Row";
            var cell = document.createElement('td');
            cell.appendChild(button_del);
        }
        row.appendChild(cell);
    }
    return row;
}

function attachTableRow(row) {
    var tableBody = document.getElementById('tableBody_Process');
    tableBody.appendChild(row);
}

//DELETE ROW METHOD USING EVENT LISTNERS

/*function deleteFromArray() {

    if (processes.length == 0) {
        document.getElementById("para_errorLog").innerText = "No processes to Delete";
    } else {
        processes.pop();
        console.log(processes);
        document.getElementById("button_Add").disabled = false;
        document.getElementById("para_errorLog").innerText = processes.join();
        //document.getElementById("errors").innerText = processes.length;
    }
}*/

function getAvailabeProcesses(processList,time){
    currentAvailable = [];
    for (var p = 0; p < processList.length; p++) {
        if(time >= processList[p].SubmissionTime){
            currentAvailable.push(processList[p]);
        }
    }
    return currentAvailable;
}

function test(){
    nextSJ(processes,5);
}

function nextSJ(processList, time) {
    var minPro;
    var minVal = 10000000;

    var available = getAvailabeProcesses(processList,5);
    for (var u =0; u< available.length;u++){
        console.log(available[u].ProcessName);
    }

    if (available.length > 0) {
        for (var p = 0; p < available.length; p++) {
            if (available[p].BurstTime < minVal) {
                minVal = available[p].BurstTime;
                minindex = p;
            }
            var item1 = createTodoItem(available[minindex]);
            attachTodoItem(item1);
            return available.splice(minindex, 1);
        }
    //     
    // } else {
    //     
    //         
    console.log('came');
    //     var item1 = createTodoItem(["IDLE", time, 1, "#999999"]);
    //     attachTodoItem(item1);
    //     return ["IDLE", time, 1, "#999999"];
    // }
}