/*global location history */
sap.ui.define([
	"zjblesssons/Marketplace-home-work-3/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"zjblesssons/Marketplace-home-work-3/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/Dialog"
], function(BaseController, JSONModel, formatter, Filter, FilterOperator, MessageToast, Dialog) {
	"use strict";

	return BaseController.extend("zjblesssons.Marketplace-home-work-3.controller.Worklist", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			var oViewModel,
				iOriginalBusyDelay,
				oTable = this.byId("table");

			// Put down worklist table's original value for busy indicator delay,
			// so it can be restored later on. Busy handling on the table is
			// taken care of by the table itself.
			iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
			// keeps the search state
			this._aTableSearchState = [];

			// Model used to manipulate control states
			oViewModel = new JSONModel({
				worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
				shareOnJamTitle: this.getResourceBundle().getText("worklistTitle"),
				shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
				shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
				tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
				tableBusyDelay: 0
			});
			this.setModel(oViewModel, "worklistView");

			// Make sure, busy indication is showing immediately so there is no
			// break after the busy indication for loading the view's meta data is
			// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
			oTable.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for worklist's table
				oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			});
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Triggered by the table's 'updateFinished' event: after new table
		 * data is available, this handler method updates the table counter.
		 * This should only happen if the update was successful, which is
		 * why this handler is attached to 'updateFinished' and not to the
		 * table's list binding's 'dataReceived' method.
		 * @param {sap.ui.base.Event} oEvent the update finished event
		 * @public
		 */
		onUpdateFinished: function(oEvent) {
			// update the worklist's object counter after the table update
			var sTitle,
				oTable = oEvent.getSource(),
				iTotalItems = oEvent.getParameter("total");
			// only update the counter if the length is final and
			// the table is not empty
			if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
				sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
			} else {
				sTitle = this.getResourceBundle().getText("worklistTableTitle");
			}
			this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
		},

		/**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onPress: function(oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		},

		/**
		 * Event handler for navigating back.
		 * We navigate back in the browser historz
		 * @public
		 */
		onNavBack: function() {
			history.go(-1);
		},
		onSearch: function(oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
			} else {
				var aTableSearchState = [];
				var sQuery = oEvent.getParameter("query");

				if (sQuery && sQuery.length > 0) {
					aTableSearchState = [new Filter("MaterialText", FilterOperator.Contains, sQuery)];
				}
				this._applySearch(aTableSearchState);
			}

		},

		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh: function() {
			var oTable = this.byId("table");
			oTable.getBinding("items").refresh();
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function(oItem) {
			
			this.getRouter().navTo("object", {
				objectId: oItem.getBindingContext().getProperty("MaterialID")
			});
		},

		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
		 * @private
		 */
		_applySearch: function(aTableSearchState) {
			var oTable = this.byId("table"),
				oViewModel = this.getModel("worklistView");
			oTable.getBinding("items").filter(aTableSearchState, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (aTableSearchState.length !== 0) {
				oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			}
		},
		onPressToastMessage: function(oEvent) {
			var msg = this.getView().getModel("i18n").getResourceBundle().getText("tToastMessage");
			MessageToast.show(msg);
		},
		onPressDelete: function(oEvent) {
			var sPath = oEvent.getParameter("listItem").getBindingContext().getPath();
		
	// this.oView.setBusy(true);
	// 			// simulate delayed end of operation
	// 		setTimeout(function () {
	// 			this.oView.setBusy(false);
			
	// 		}, 5000);

			if (this._isAllowedEdit(oEvent.getParameter("listItem").getBindingContext().getProperty("CreatedBy")) === true) {
				MessageToast.show("Allowed to Edit");
				this.getModel().remove(sPath);
			} else {
				MessageToast.show("not allowed to edit");
			}
		},
		onPressCreateButton: function(oEvent) {
			if (!this.oCreateMaterialDialog) {
				this.oCreateMaterialDialog = new Dialog({
					title: "Available Products",
					content: [
						new sap.m.Label({
							text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelMaterialText"),
							labelFor: "MaterialTextCreate"
						}),
						new sap.m.Input("MaterialTextCreate", {
							width: "100%",
							maxLength: 10,
							liveChange: function() {
								this.checkBeginButtonEnabled(oEvent);
							}.bind(this)
						}),
						new sap.m.Label({
							text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelGroupIDText"),
							labelFor: "GroupIdCreate"
						}),
						new sap.m.Input("GroupIdCreate", {
							width: "100%",
							maxLength: 10,
							liveChange: function() {
								this.checkBeginButtonEnabled(oEvent);
							}.bind(this)
						}),
						new sap.m.Label({
							text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelSubGroupIDText"),
							labelFor: "SubGroupIdCreate"
						}),
						new sap.m.Input("SubGroupIdCreate", {
							width: "100%",
							maxLength: 10,
							liveChange: function() {
								this.checkBeginButtonEnabled(oEvent);
							}.bind(this)
						})
					],
					beginButton: new sap.m.Button({
						enabled: false,
						type: "Emphasized",
						text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogCreateButton"),
						press: function() {
							this._createMaterial();
							this.oCreateMaterialDialog.close();
						}.bind(this)
					}),
					endButton: new sap.m.Button({
						text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogCancelButton"),
						press: function() {
							this.oCreateMaterialDialog.close();
							sap.ui.getCore().byId("MaterialTextCreate").setValue("");
							sap.ui.getCore().byId("GroupIdCreate").setValue("");
							sap.ui.getCore().byId("SubGroupIdCreate").setValue("");
							oEvent.getSource().getParent().getBeginButton().setEnabled(false);
						}.bind(this)
					}).addStyleClass("sapUiSizeCompact")
				});

				// to get access to the controller's model
				this.getView().addDependent(this.oCreateMaterialDialog);
			}
			this.oCreateMaterialDialog.open();
		},

		onPressEditButton: function(oEvent) {
			if (!this.oEditMaterialDialog) {
				this.oEditMaterialDialog = new Dialog({
					title: this.getView().getModel("i18n").getResourceBundle().getText("tEditDialogTitle").concat(" `{MaterialText}`"),
					content: [
						new sap.m.Label({
							text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelMaterialText"),
							labelFor: "MaterialTextEdit"
						}),
						new sap.m.Input("MaterialTextEdit", {
							width: "100%",
							maxLength: 10,
							value: "{MaterialText}",
							liveChange: function() {
								this.checkBeginButtonEnabled(oEvent);
							}.bind(this)

						}),
						new sap.m.Label({
							text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelGroupIDText"),
							labelFor: "GroupIdEdit"
						}),
						new sap.m.Input("GroupIdEdit", {
							width: "100%",
							maxLength: 10,
							value: "{GroupID}",
							liveChange: function() {
								this.checkBeginButtonEnabled(oEvent);
							}.bind(this)
						}),
						new sap.m.Label({
							text: this.getView().getModel("i18n").getResourceBundle().getText("CreateDialogLabelSubGroupIDText"),
							labelFor: "GroupIdEdit"
						}),
						new sap.m.Input("SubGroupIdEdit", {
							width: "100%",
							maxLength: 10,
							value: "{SubGroupID}",
							liveChange: function() {
								this.checkBeginButtonEnabled(oEvent);
							}.bind(this)
						})
					],
					buttons: [
						new sap.m.Button({
							enabled: true,
							type: "Accept",
							text: this.getView().getModel("i18n").getResourceBundle().getText("EditDialogButtonSubmitText"),
							press: function() {
								this.oEditMaterialDialog.close();
							}.bind(this),
							liveChange: function() {}.bind(this)
						}),

						new sap.m.Button({
							enabled: true,
							type: "Reject",
							text: this.getView().getModel("i18n").getResourceBundle().getText("EditDialogButtonResetText"),
							press: function() {
								this.getModel().resetChanges([oEvent.getSource().getBindingContext().getPath()]);
							}.bind(this)
						}),

						new sap.m.Button({
							enabled: true,
							type: "Emphasized",
							text: this.getView().getModel("i18n").getResourceBundle().getText("EditDialogButtonCancelText"),
							press: function() {
								this.getModel().resetChanges([oEvent.getSource().getBindingContext().getPath()]);
								this.oEditMaterialDialog.close();
							}.bind(this)
						})
					]
				});

				// to get access to the controller's model
				this.getView().addDependent(this.oEditMaterialDialog);
			}
			this.oEditMaterialDialog.setBindingContext(oEvent.getSource().getBindingContext());

			if (this._isAllowedEdit(oEvent.getSource().getParent().getBindingContext().getProperty("CreatedBy")) === true) {
				MessageToast.show("Allowed to Edit");
				this.oEditMaterialDialog.open();
			} else {
				MessageToast.show("not allowed to edit");
			}

		},
		checkBeginButtonEnabled: function(oEvent) {
			if (
				this.oCreateMaterialDialog.getContent()[1].getValue().split(" ").join("").length > 0 && this.oCreateMaterialDialog.getContent()[3]
				.getValue().split(" ").join("").length > 0 && this.oCreateMaterialDialog.getContent()[5].getValue().split(" ").join("").length > 0
			)
				oEvent.getSource().getParent().getBeginButton().setEnabled(true);
			else if (
				this.oEditMaterialDialog.getContent()[1].getValue().split(" ").join("").length > 0 && this.oEditMaterialDialog.getContent()[3].getValue()
				.split(" ").join("").length > 0 && this.oEditMaterialDialog.getContent()[5].getValue().split(" ").join("").length > 0
			)
				oEvent.getSource().getParent().getBeginButton().setEnabled(true);
			else oEvent.getSource().getParent().getBeginButton().setEnabled(false);
		},
		_updateMaterial: function() {
			var sPath = this.oEditMaterialDialog.getBindingContext().getPath();
			this.getModel().update(sPath, {
				MaterialText: this.oEditMaterialDialog.getContent()[1].getValue(),
				GroupID: this.oEditMaterialDialog.getContent()[3].getValue(),
				SubGroupID: this.oEditMaterialDialog.getContent()[5].getValue()
			}, {
				success: function(e) {
					MessageToast.show("Edited OK");
				},
				error: function(e) {
					MessageToast.show("Editing Error");
				}
			});
			this.oEditMaterialDialog.getContent()[1].setValue("");
			this.oEditMaterialDialog.getContent()[3].setValue("");
			this.oEditMaterialDialog.getContent()[5].setValue("");
		},
		_createMaterial: function() {
			var oEntry = {
				MaterialID: '',
				MaterialText: this.oCreateMaterialDialog.getContent()[1].getValue(),
				Language: 'RU',
				GroupID: this.oCreateMaterialDialog.getContent()[3].getValue(),
				SubGroupID: this.oCreateMaterialDialog.getContent()[5].getValue(),
				Version: "A"
			};
			this.getModel().create("/zjblessons_base_Materials", oEntry, {
				success: function(e) {
					MessageToast.show("All is ok");
				},
				error: function(e) {
					MessageToast.show("Error!");
				}
			});
			this.oCreateMaterialDialog.getContent()[1].setValue("");
			this.oCreateMaterialDialog.getContent()[3].setValue("");
			this.oCreateMaterialDialog.getContent()[5].setValue("");
		},
		_isAllowedEdit: function(CreatedIdCheck) {
			return CreatedIdCheck === "D1B1000039" ? true : false;
		},
		onPressRefreshButton: function(oEvent) {
			this.onRefresh();
		},
		onPressResetButton: function(oEvent) {
			this.getModel().resetChanges();
		},
		onPressSubmitButton: function(oEvent) {
			this.getModel().submitChanges();
		}

	});
});