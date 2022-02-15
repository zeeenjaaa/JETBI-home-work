/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"zjblesssons/Marketplace-home-work-3/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"zjblesssons/Marketplace-home-work-3/test/integration/pages/Worklist",
	"zjblesssons/Marketplace-home-work-3/test/integration/pages/Object",
	"zjblesssons/Marketplace-home-work-3/test/integration/pages/NotFound",
	"zjblesssons/Marketplace-home-work-3/test/integration/pages/Browser",
	"zjblesssons/Marketplace-home-work-3/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "zjblesssons.Marketplace-home-work-3.view."
	});

	sap.ui.require([
		"zjblesssons/Marketplace-home-work-3/test/integration/WorklistJourney",
		"zjblesssons/Marketplace-home-work-3/test/integration/ObjectJourney",
		"zjblesssons/Marketplace-home-work-3/test/integration/NavigationJourney",
		"zjblesssons/Marketplace-home-work-3/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});