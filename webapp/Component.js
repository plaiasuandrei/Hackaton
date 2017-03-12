sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"hackaton/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("hackaton.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
		    
		    sap.ui.localResources("openui5/googlemaps");
			jQuery.sap.require("hackaton.openui5.googlemaps.library");
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			openui5.googlemaps.ScriptsUtil.setApiKey("AIzaSyAlza7Bwyc8egsWx6JpbnwJpdlzwChLEXg");
			
			this.getRouter().initialize();
		}
	});

});