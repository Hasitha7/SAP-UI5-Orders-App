sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "odstest/model/formatter",
    "sap/m/MessageBox"
    ], function (Controller, formatter, MessageBox) {
        "use strict";

        return Controller.extend("odstest.controller.OrderdetailsPage", {
            formatter:formatter,
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Orderdetailspage").attachPatternMatched(this._handleRouteMatched, this);   //get route
            },
            _handleRouteMatched: function (oEvent) {
                var arg = oEvent.getParameter("arguments");   //parameter
                var oView = this.getView();
                oView.bindElement({
                    path: "/Orders("+arg.OrderID+")",    //path to order details for related orderid
                });
            },
            onPopup: function (oEvent) {
                var that = this; 
                this.pDialog ??= this.loadFragment({
                  name: "odstest.view.MessageBox",            //popup dialog box
                });
        
                this.pDialog.then(function (oDialog) {
                  let oTable = that.getView().byId("orderdetailstable");   //get the table by id
                  let selectedRow = oTable.getSelectedItem();   //get the selected row 
                  if (selectedRow) {
                    oDialog.open();     //open the box for the selected row
                  }
                  let selectedRowData = selectedRow.getBindingContext().getObject(); //get object of selected row
                  
                  that.getView().byId("popOrderID").setText(selectedRowData.OrderID);   //assign values for the pop up box
                  that.getView().byId("popProductID").setText(selectedRowData.ProductID);
                  that.getView().byId("popUnitPrice").setText(selectedRowData.UnitPrice);
                  that.getView().byId("popQuantity").setText(selectedRowData.Quantity);
                  that.getView().byId("popDiscount").setText(selectedRowData.Discount);
                  that.getView().byId("popTotal").setText(formatter.calculateTotal(selectedRowData.UnitPrice, selectedRowData.Quantity, selectedRowData.Discount));
                });
            },
            onOk: function () {
                this.getView().byId("popdialog").setVisible(true).close();  //close the box
            },     
            onNavBack: function () {
                history.go(-1);    //navigation back
            }
        });
    });