class Process{

constructor(Name,SubTime,BurTime,Color){
    this.ProcessName = Name;
    this.SubmissionTime = SubTime;
    this.BurstTime = BurTime;
    this.ProcessColor = Color;
}

get Name(){
    return this.Name;
}
get SubTime(){
    return this.SubmissionTime;
}
get BurTime(){
    return this.BurstTime;
}
get ProcessColor(){
    return this.ProcessColor;
}
}