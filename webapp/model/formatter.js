sap.ui.define([], function() {
    'use strict';
    return {
        calculateTotal: function (UnitPrice, Quantity, Discount){         //get values for the total
            const lastPrice = UnitPrice * Quantity * (1 - Discount);    //calculate total
            const total = parseFloat(lastPrice.toFixed(2));        //parse for two decimal points
            return total;
        }
    };
});