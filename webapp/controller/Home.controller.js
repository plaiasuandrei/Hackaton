sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("hackaton.controller.Home", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf hackaton.view.Home
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf hackaton.view.Home
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf hackaton.view.Home
		 */
		//	onAfterRendering: function() {
		//
		//	},
		onEmergency: function(oEvent) {
			this.oRouter.navTo("Emergency");
		},
		
		onHospitals: function(oEvent) {
			this.oRouter.navTo("hospitals");
		},
		
    	onHistory: function(oEvent) {
			this.oRouter.navTo("History");
		},
		
		onDoctors: function(oEvent) {
			this.oRouter.navTo("doctors");
		},
		
		onPharmacies: function(oEvent) {
			this.oRouter.navTo("pharmacies");
		}
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf hackaton.view.Home
		 */
		//	onExit: function() {
		//
		//	}

	});

});