sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/Sorter"
], function(Controller, Filter, Sorter) {
	"use strict";

	return Controller.extend("hackaton.controller.doctors_main", {

		_oDialog: null,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf hackaton.view.doctors_main
		 */
		onInit: function() {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oDoctors = new sap.ui.model.json.JSONModel(
				//   {
				// 				"doctors": [{
				// 						"name": "Flash",
				// 						"address": {
				// 							"street": "strret 1",
				// 							"postcode": "234",
				// 							"city": "Luxembourg"
				// 						},
				// 						"speciality": "doctor"

				// 					}, {
				// 						"name": "Flash2",
				// 						"address": {
				// 							"street": "strret2",
				// 							"postcode": "234",
				// 							"city": "Luxembourg2"
				// 						},
				// 						"speciality": "doctor2"

				// 					}

				// 				]
				// 			}
			);
			oDoctors.loadData("./model/doctors.json");
			// 			sap.ui.getCore().setModel(oDoctors, );
			var table = this.byId("idDoctorsTable");
			table.setModel(oDoctors, "doctorModel");
			this.byId("kaartje").setModel(oDoctors, "doctorModel");

		},

		onNavBack: function(oEvent) {
			this.oRouter.navTo("Home");
		},

		handleViewSettingsDialogButtonPressed: function(oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("hackaton/view/doctors_sh", this);
			}
			// toggle compact style
			// 			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},
		handleConfirm: function(oEvent) {

			var oView = this.getView();
			var oTable = oView.byId("idDoctorsTable");

			var mParams = oEvent.getParameters();
			var oBinding = oTable.getBinding("items");

			// apply sorter to binding
			// (grouping comes before sorting)
			var aSorters = [];
			if (mParams.groupItem) {
				var sPath = mParams.groupItem.getKey();
				var bDescending = mParams.groupDescending;
				var vGroup = this.mGroupFunctions[sPath];
				aSorters.push(new Sorter(sPath, bDescending, vGroup));
			}
			var sPath = mParams.sortItem.getKey();
			var bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));
			oBinding.sort(aSorters);
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf hackaton.view.doctors_main
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf hackaton.view.doctors_main
		 */
		onAfterMapRendering: function() {

			// the resources of the map api were loaded in the index html
			// we create a map control and assign it inside the map icon tab filter

			// 			var position = [75977, 75099];
			// 			var map2 = new lux.Map({
			// 				target: 'map',
			// 				bgLayer: 'basemap_2015_global',
			// 				zoom: 18,
			// 				position: position

			// 			});
		}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf hackaton.view.doctors_main
		 */
		//	onExit: function() {
		//
		//	}

	});

});