sap.ui.define(["jquery.sap.global","sap/ui/core/Control","google.maps","./TravelMode","./UnitSystem"],function(t,e,i,s,o){"use strict";var n=e.extend("openui5.googlemaps.Directions",{metadata:{properties:{startAddress:{type:"string",bindable:"bindable"},endAddress:{type:"string",bindable:"bindable"},travelMode:{type:"string",defaultValue:s.driving},optimizeWaypoints:{type:"boolean"},unitSystem:{type:"string",defaultValue:o.metric}},defaultAggregation:"waypoints",aggregations:{waypoints:{type:"openui5.googlemaps.Waypoint",multiple:!0,bindable:"bindable"}},events:{response:{}},renderer:{}}});return n.prototype.setStartAddress=function(t){this.setProperty("startAddress",t,!0),this.route()},n.prototype.setEndAddress=function(t){this.setProperty("endAddress",t,!0),this.route()},n.prototype.setTravelMode=function(t){this.setProperty("travelMode",t,!0),this.route()},n.prototype.setOptimizeWaypoints=function(t){this.setProperty("optimizeWaypoints",t,!0),this.route()},n.prototype.setWaypoints=function(t){this.setAggregation("waypoints",t,!0),this.route()},n.prototype.getWaypointLocations=function(){var t=[];return this.getWaypoints().forEach(function(e){t.push({location:e.getLocation(),stopover:e.getStopover()})}),t},n.prototype.onMapRendered=function(t){this.map=t,this.mapChanged()},n.prototype.responseChanged=function(){this.directions&&this.response&&this.directions.setDirections(this.response)},n.prototype.mapChanged=function(){this.directions||(this.directions=new i.DirectionsRenderer),this.directions.setMap(this.map),this.route()},n.prototype.getRequest=function(){var t={};return t.origin=this.getStartAddress(),t.destination=this.getEndAddress(),t.travelMode=this.getTravelMode(),t.unitSystem=this.getUnitSystem(),t.optimizeWaypoints=this.getOptimizeWaypoints(),t.waypoints=this.getWaypointLocations(),t},n.prototype.route=function(){this.map&&this.getStartAddress()&&this.getEndAddress()&&(this.directionsService||(this.directionsService=new i.DirectionsService),t.sap.clearDelayedCall(this.delayedCallId),this.delayedCallId=t.sap.delayedCall(0,this,function(){this.directionsService.route(this.getRequest(),t.proxy(this.routeResponse,this))}))},n.prototype.routeResponse=function(t,e){e===i.DirectionsStatus.OK&&(this.response=t,this.responseChanged(),this.fireResponse({response:t}))},n.prototype.reset=function(){this.directions&&(this.directions.setMap(null),this.directions=null)},n.prototype.onReset=function(){this.reset()},n.prototype.exit=function(){this.reset()},n},!0);