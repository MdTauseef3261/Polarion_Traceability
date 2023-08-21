var logFile = new java.io.FileWriter("./logs/main/stakeholderRequirement-post-save.log", false); 
var logWriter = new java.io.BufferedWriter(logFile); 
var currentDateTime = new java.util.Date().toString();
var projectid = workItem.getProjectId();
var linkedCF = workItem.getCustomField("linkedWi");
logWriter.write("Linked CF = "+linkedCF+"\n");
var allWorkItem = trackerService.queryWorkItems("project.id:"+projectid,"id");
logWriter.write("All workItems"+" "+allWorkItem+"\n");

function linkWorkItem(workItem)
    {
    var Project = trackerService.getTrackerProject(projectid);
    logWriter.write("Tracker Project = "+Project+"\n");
    var linkedWI = trackerService.findWorkItem(projectid,linkedCF);
    logWriter.write("Linked WorkItem = "+linkedWI+"\n");
    var linkRole = Project.getWorkItemLinkRoleEnum().wrapOption("changes");
    logWriter.write("Link Role= "+linkedWI+"\n");
    workItem.addLinkedItem(linkedWI,linkRole,null,false);
    workItem.save();
    logWriter.write("*** Successfully Worked Item: ***"+"\n");
    }

try {
    
    if(workItem.getCustomField("applicableDocuments")){
        var applicableDocuments = workItem.getCustomField("applicableDocuments").getId();
        logWriter.write("Applicable Documents:"+""+applicableDocuments+"\n");
    }
    //Setting the value of other fields basedon applicable documents
    if(applicableDocuments=="yes"){
        workItem.setEnumerationValue("rejectionReason","invalid");
        workItem.setEnumerationValue("sourceOfRequirement","supplier");
        workItem.save();
    }
    for (i=0;i<allWorkItem.size();i++) { 
        logWriter.write("All workItems"+" "+allWorkItem[i].getId()+"\n");
        if(allWorkItem[i].getId().contains(linkedCF)){
            linkWorkItem(workItem);
        }
    }
   
} catch (e) {
    logWriter.write(currentDateTime + "\tRuntime Exception Occured: " + e + "\n"); 
}
logWriter.flush();