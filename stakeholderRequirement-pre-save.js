var logFile = new java.io.FileWriter("./logs/main/stakeholderRequirement-pre-save.log", false); 
var logWriter = new java.io.BufferedWriter(logFile); 
var currentDateTime = new java.util.Date().toString();
var returnValue="";
try{
    var intensiveCostRelevant = workItem.getCustomField("intensiveCostRelevant");
    logWriter.write("Intensive Cost Relevant:"+" "+intensiveCostRelevant+ "\n");
    //Getting the value of intensive cost relevant question
    if(workItem.getCustomField("intensiveCostRelevantQ")){
        var intensiveCostRelevantQ = workItem.getCustomField("intensiveCostRelevantQ").getId();
        logWriter.write("Intensive Cost Relevant Question:"+" "+intensiveCostRelevantQ+ "\n");
    }
  //checking the condition for empty field  
    if(intensiveCostRelevantQ=="yes" && (intensiveCostRelevant =="" || intensiveCostRelevant==null)){
        returnValue = "If Intensive Cost Relevant Question is yes, Then intensive cost relevant cannot be empty"
    }

}
catch(e)
{
	logWriter.write(currentDateTime + "\tRuntime Exception Occured: " + e + "\n"); 
}
logWriter.flush();
returnValue;