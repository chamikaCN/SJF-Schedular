class Process {

    constructor(Name, SubTime, BurTime, Color) {
        this.ProcessName = Name;
        this.SubmissionTime = SubTime;
        this.BurstTime = BurTime;
        this.ProcessColor = Color;
    }

    calculateTime(StartTime){
        this.WaitingTime = StartTime - SubmissionTime;
        this.TurnAroundTime = WaitingTime + BurstTime;
    }


}