sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("odstest.controller.Orderpage", {
            onInit: function () {
                
            },
            onSearch: function (oEvent) {           //search field
                var oTable = this.getView().byId("ordersTable");  //get the table using id
                var oBinding = oTable.getBinding("items"); //get binding items
                var sQuery = oEvent.getParameter("query"); //get parameter 
                var aFilters = [];                       //filter array
            
                if (sQuery && sQuery.length > 0) {              //check is there any search term
                    var oShipNameFilter = new Filter("ShipName", FilterOperator.Contains, sQuery);  //make the filter for shipname
                    aFilters.push(oShipNameFilter);          //push that filter into filters array
                }
            
                var oCombinedFilter = new Filter({    //combine filter
                    filters: aFilters,
                    and: false            //OR
                });
            
                oBinding.filter(aFilters.length > 0 ? oCombinedFilter : [], "Application");  //release filter if no search term
            },
            
            onReset: function () {
                var oTable = this.getView().byId("ordersTable");        //reset the filter
                var oBinding = oTable.getBinding("items");
                var oSearchField = this.getView().byId("searchid");
            
                oSearchField.setValue("");            //reset the filter
                this.clearFilters(oBinding);
            },
            
            clearFilters: function (oBinding) {
                oBinding.filter([], "Application");    //clear filters 
            },
            onItemPress: function(oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);  //by refering the orderid go to the next page
                var selectedItemOrderId = oEvent.getSource().getBindingContext().getProperty("OrderID");
                oRouter.navTo("Orderdetailspage",{
                    OrderID:selectedItemOrderId
                });

            }
        });
    });
