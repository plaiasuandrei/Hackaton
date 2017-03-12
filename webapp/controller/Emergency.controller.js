sap.ui.define([
	'sap/m/Button',
	'sap/m/Dialog',
	'sap/m/Label',
	'sap/m/MessageToast',
	'sap/m/Text',
	'sap/m/TextArea',
	'sap/m/MessageBox',
	"sap/ui/core/mvc/Controller",
	"hackaton/model/timeFormatter",
	"hackaton/model/stateFormatter"
], function(Button, Dialog, Label, MessageToast, Text, TextArea, MessageBox, Controller,TimeFormatter, StateFormatter) {
	"use strict";

	return Controller.extend("hackaton.controller.Emergency", {
		TimeFormatter: TimeFormatter,
		StateFormatter: StateFormatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf hackaton.view.Emergency1
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute('Emergency').attachMatched(this.handleRouteMatched, this);
		},
		handleRouteMatched: function() {
			var oEmergencyModel = new sap.ui.model.json.JSONModel({
				"USER_ID": "",
				"USER_NAME": "",
				"BODYPART_ID": "",
				"BODYPART_NAME": "",
				"selectedBodyPartImageId": "",
				"INJURYTYPE_ID": "",
				"INJURYTYPE_NAME": "",
				"HOSPITAL_ID": "",
				"HOSPITAL_NAME": "",
				"TIMESTAMP": ""
			});
			this.getView().setModel(oEmergencyModel, "emergencyModel");

			var navCon = this.getView().byId("wizardNavContainer");
			navCon.to(this.getView().byId("page1"), "slide");

			this.getView().byId("CreateEmergencyWizard").discardProgress(0);
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf hackaton.view.Emergency1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf hackaton.view.Emergency1
		 */
		onAfterRendering: function(oEvent) {
			var oEmergencyModel = new sap.ui.model.json.JSONModel({
				"USER_ID": "",
				"USER_NAME": "",
				"BODYPART_ID": "",
				"BODYPART_NAME": "",
				"selectedBodyPartImageId": "",
				"INJURYTYPE_ID": "",
				"INJURYTYPE_NAME": "",
				"HOSPITAL_ID": "",
				"HOSPITAL_NAME": "",
				"TIMESTAMP": ""
			});
			this.getView().setModel(oEmergencyModel, "emergencyModel");
			this.getView().byId("CreateEmergencyWizard").discardProgress();

		},
		onSelectPerson: function(oEvent) {
			var oModelData = this.getView().getModel("emergencyModel").getData();
			oModelData.USER_ID = oEvent.getParameter("listItems")[0].data("mydata");
			oModelData.USER_NAME = oEvent.getParameter("listItems")[0].getProperty("title");
			this.getView().getModel("emergencyModel").setData(oModelData);
		},
		onSelectArea: function(oEvent) {
			var oModelData = this.getView().getModel("emergencyModel").getData();
			oModelData.BODYPART_ID = oEvent.getSource().data("bodyPartId");
			oModelData.BODYPART_NAME = oEvent.getSource().data("mydata");
			oModelData.selectedBodyPartImageId = oEvent.getSource().getId().split("--")[1];
			this.getView().getModel("emergencyModel").setData(oModelData);

			if (oEvent.getSource().hasStyleClass("redClass")) {
				oEvent.getSource().removeStyleClass("redClass");
			} else {
				oEvent.getSource().addStyleClass("redClass");
			}

			//Updathe injury binding
			var sValue1 = oEvent.getSource().data("bodyPartId");

			var sPath = "BODYPART_ID";
			var sOperator = "EQ";

			var oBinding = this.byId("lstInjuries").getBinding("items");
			oBinding.filter([new sap.ui.model.Filter(sPath, sOperator, sValue1)]);
		},
		onSelectInjury: function(oEvent) {
			var oModelData = this.getView().getModel("emergencyModel").getData();
			oModelData.INJURYTYPE_ID = oEvent.getParameter("listItems")[0].data("mydata");
			oModelData.INJURYTYPE_NAME = oEvent.getParameter("listItems")[0].getProperty("title");
			this.getView().getModel("emergencyModel").setData(oModelData);
		},
		onSelectHospital: function(oEvent) {
			var oModelData = this.getView().getModel("emergencyModel").getData();
			oModelData.HOSPITAL_ID = oEvent.getParameter("listItems")[0].data("mydata");
			oModelData.HOSPITAL_NAME = oEvent.getParameter("listItems")[0].getProperty("title");
			this.getView().getModel("emergencyModel").setData(oModelData);
		},
		onNavBack: function(oEvent) {
			this.oRouter.navTo("Home");
		},
		completedHandler: function(evt) {
			var navCon = this.getView().byId("wizardNavContainer");
			var target = "page2";
			if (target) {
				var animation = "slide";
				navCon.to(this.getView().byId(target), animation);
			} else {
				navCon.back();
			}
		},
		handleWizardSubmit: function() {
			var me = this;
			var oModelData = this.getView().getModel("emergencyModel").getData();
			oModelData.TIMESTAMP = new Date();
			delete oModelData.selectedBodyPartImageId;
			delete oModelData.HOSPITAL_NAME;
			delete oModelData.USER_NAME;
			delete oModelData.BODYPART_NAME;
			delete oModelData.INJURYTYPE_NAME;
			$.when(me._sendEmergencyRequest(oModelData)).then(function(oData) {
				me.getView().byId("CreateEmergencyWizard").discardProgress();
				MessageBox.success("Emergency request succesfully sent", {});
				me.oRouter.navTo("Home");
			}).fail(function(error) {
				MessageBox.error(
					"Error sending emergency request", {});
			});
		},
		_sendEmergencyRequest: function(oData) {
			var promise = $.Deferred();
			var oModel = this.getView().getModel();
			oModel.create("/userRegistration", oData, {
				success: function(oData) {
					promise.resolve(oData);
				},
				error: function(error) {
					promise.reject(error);
				}
			});
			return promise.promise();
		},
		handleWizardCancel: function() {
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({
					text: 'Are you sure you want to cancel your emergency request?'
				}),
				beginButton: new Button({
					text: 'Submit',
					press: function() {
						this.oRouter.navTo("Home");
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf hackaton.view.Emergency1
		 */
		//	onExit: function() {
		//
		//	}

	});

});