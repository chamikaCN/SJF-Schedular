var processes = [];
var numberOfProcesses;

function inputNum() {
    numberOfProcesses = parseInt(document.getElementById("input_NoProcess").value, 10);
    document.getElementById("para_errorLog").innerText = numberOfProcesses;
}

function addToArray() {

    if (processes.length < numberOfProcesses) {

        //const processone = new Process("123", "123", "123", "#123456");

        document.getElementById("para_errorLog").innerText = "good";
        var Process = [(document.getElementById("input_ProName").value).toString(), parseInt(document.getElementById("input_ProSubTime")
            .value, 10), parseInt(document.getElementById("input_ProBurstTime").value, 10), (document.getElementById("input_ProColor").value).toString()];
        var processName = (document.getElementById("input_ProName").value).toString();
        //var Process = new Process(processName,(document.getElementById("input_ProName").value).toString(),parseInt(document.getElementById("input_ProSubTime")
        //.value,10),parseInt(document.getElementById("input_ProBurstTime").value,10),(document.getElementById("input_ProColor").value).toString());
        processes.push(Process);
        //document.getElementById("para_errorLog").innerText = Process.Name.toString() ;
        var processRow = createTableRow(Process);
        attachTableRow(processRow);
        //document.getElementById("errors").innerText = processes.length;
    } else {
        //document.getElementById("para_errorLog").innerText = "Process Full";
        alert("Process Full");
        document.getElementById("button_Add").disabled = true;
    }
}

function deleteFromArray() {

    if (processes.length == 0) {
        document.getElementById("para_errorLog").innerText = "No processes to Delete";
    } else {
        processes.pop();
        console.log(processes);
        document.getElementById("button_Add").disabled = false;
        document.getElementById("para_errorLog").innerText = processes.join();
        //document.getElementById("errors").innerText = processes.length;
    }
}

function nextSJ(processList, time) {
    var minPro;
    var minVal = 10000000;
    currentAvailable = [];

    for (var p = 0; p < processList.length; p++) {
        if(time >= processList[p][1]){
                currentAvailable.push(processList[p])
        }
    }

    if (currentAvailable.length == 0) {
        console.log('came');
        var item1 = createTodoItem(["IDLE", time, 1, "#999999"]);
        attachTodoItem(item1);
        return ["IDLE", time, 1, "#999999"];
    } else {
        for (var p = 0; p < processList.length; p++) {
            if ((processList[p][2] < minVal) && (time >= processList[p][1])) {
                minVal = processList[p][2];
                minindex = p;
            }
            console.log('kamu');
            var item1 = createTodoItem(processList[minindex]);
            attachTodoItem(item1);
            return processList.splice(minindex, 1);
        }
    }
}

function nonPreSubmission() {
    //document.getElementById("errors").innerText = "good";

    var timeIndex = 0;
    while (processes.length > 0) {
        //document.getElementById("errors").innerText = "good0.5";
        var shortestJob = nextSJ(processes, timeIndex);
        var cat = shortestJob.join() + " executes at second " + timeIndex.toString();
        //document.getElementById("errors").innerText = "good1";
        //document.getElementById("testing").appendChild(cat.toString());
        var item = createTodoItem(cat);
        attachTodoItem(item);
        timeIndex += shortestJob[0][2];
        //document.getElementById("errors").innerText = "good2";
    }
}

function createTodoItem(value) {
    var item = document.createElement('li');
    item.innerText = value;
    return item;
}

function attachTodoItem(item) {
    var ulElement = document.getElementById('list_execution');
    ulElement.appendChild(item);
}

function createTableRow(Process) {
    var row = document.createElement('tr');
    for (var k = 0; k < 5; k++) {
        if (k < 3) {
            var cell = document.createElement('td');
            cell.innerText = Process[k];
        } else if (k == 3) {
            var cell = document.createElement('td');
            cell.bgColor = Process[3].toString();
        } else if (k == 4) {
            var button_del = document.createElement('button');
            // button_del.onclick = deleteRow(this);
            //button_del.onclick = function(this){
            //    document.getElementById('para_errorLog').innerHTML = "goog";
            //}
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

function deleteRow(button) {
    document.getElementById('para_errorLog').innerHTML = "goog";

}

function submission(){
    var PreEmpt = document.getElementById('input_PreemptCheck').checked;
    if (PreEmpt == false){
        nonPreSubmission();
    }else{
        console.log('good');
    }
}