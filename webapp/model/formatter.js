sap.ui.define([
	"sap/ui/core/format/DateFormat"
	] , function (dateFormat) {
		"use strict";

		return {

			/**
			 * Rounds the number unit value to 2 digits
			 * @public
			 * @param {string} sValue the number string to be rounded
			 * @returns {string} sValue with 2 digits rounded
			 */
			numberUnit : function (sValue) {
				if (!sValue) {
					return "";
				}
				return parseFloat(sValue).toFixed(2);
			},
			modifiedInfo : function (Modified, ModifiedByFullName){
				//time format pattern
				var oDateFormat= dateFormat.getDateTimeInstance({
					pattern: "dd/MM/yyyy HH:mm"
				});
				//apply pattern
				var niceData = oDateFormat.format(Modified);
				//calculate time interval from now to modfied time in hours
				var currentData = new Date();
				var HoursFromNow = Math.round((new Date()-Modified)/3600000);
				//picking last name from full name
				 if (ModifiedByFullName != null){
				 	var justLastName = ModifiedByFullName;
				 	justLastName= ModifiedByFullName.split(' ')[1];
				 }
				//forming an answer
				 var answer = this.getModel("i18n").getResourceBundle().getText("Modified").concat(" " +niceData+"  "+ justLastName +" "+ HoursFromNow +" "+this.getModel("i18n").getResourceBundle().getText("tHoursAgo"));
				return answer;
			}
		};

	}
);