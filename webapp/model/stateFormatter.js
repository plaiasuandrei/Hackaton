sap.ui.define([], function() {
	"use strict";
	return {
		format: function(time) {
			if (time !== "" && time !== undefined && time !== null) {
				if(time.ms < 3600000){
					return "Success";
				}else if(time.ms > 3600000 && time.ms < 10800000){
					return "Warning";
				}else{
					return "Error"; 
				}
			} else {
				return "";
			}
		}
	};
});