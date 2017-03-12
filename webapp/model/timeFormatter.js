sap.ui.define([], function () {
    "use strict";
    return {
        format : function(time){
            if(time !== "" && time !== undefined && time !== null){
            	
                var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({pattern: "KK:mm:ss"});  
                var TZOffsetMs = new Date(0).getTimezoneOffset()*60*1000;
                var timeStr = timeFormat.format(new Date(time.ms + TZOffsetMs));  //11:00 AM
                return timeStr;
            }else{
                return "";
            }
        }
    };
});