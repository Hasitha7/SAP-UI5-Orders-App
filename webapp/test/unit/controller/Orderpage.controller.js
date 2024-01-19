/*global QUnit*/

sap.ui.define([
	"odstest/controller/Orderpage.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Orderpage Controller");

	QUnit.test("I should test the Orderpage controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
