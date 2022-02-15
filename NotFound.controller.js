sap.ui.define([
		"zjblesssons/Marketplace-home-work-3/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("zjblesssons.Marketplace-home-work-3.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);