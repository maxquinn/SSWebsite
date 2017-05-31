module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { uniqueid: id, item: item, qty: 0, price: 0 };
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.pricing.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice = parseFloat((this.totalPrice + storedItem.item.pricing.price).toFixed(5));
    };

    this.remove = function (id, num) {
        var storedItem = this.items[id];
        var numberToDecrease = num || 1;

        if (!storedItem) {
            return;
        }
        if ((storedItem.qty - numberToDecrease) <= 0) {
            this.totalQty -= storedItem.qty;
            this.totalPrice = parseFloat((this.totalPrice - (storedItem.item.pricing.price * storedItem.qty)).toFixed(5));
            delete this.items[id];
        }
        else {
            storedItem.qty -=  numberToDecrease;
            this.totalQty -= numberToDecrease;
            storedItem.price = storedItem.item.pricing.price * storedItem.qty;
            this.totalPrice = parseFloat((this.totalPrice - (storedItem.item.pricing.price * numberToDecrease)).toFixed(5));
        }
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};