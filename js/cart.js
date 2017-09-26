new Vue({
    el: "#app",
    data: {
        title: "HELLO VUE",
        productList: [],
        totalMoney: 0,
        checkAllFlag: false,
        delFlag: false,
        curProduct: {}
    },
    mounted: function () {
        this.createView();
    },
    methods: {
        createView: function () {
            // var _this = this;
            // this.$http.get("data/cartData.json").then(function(res) {
            //     _this.productList = res.data.result.list;
            //     _this.totalMoney = res.data.result.totalMoney;
            // });
            this.$http.get("data/cartData.json").then(res => {
                this.productList = res.data.result.list;
                // this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney: function (product, type) {
            if (type > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity <= 0) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectProduct: function (item) {
            if (typeof item.checked == 'undefined') {
                // Vue.set(item, "checked", true);   // 全局注册变量
                this.$set(item, "checked", true); // 局部注册
            } else {
                item.checked = !item.checked;
                if(this.checkAllFlag) {
                    this.checkAllFlag = false;
                }
            }
            this.calcTotalPrice();
        },
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            let that = this;
            this.productList.forEach(function (item, index) {
                if (typeof item.checked == 'undefined') {
                    that.$set(item, "checked", that.checkAllFlag)
                } else {
                    item.checked = that.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            this.totalMoney = 0;
            let that = this;
            this.productList.forEach(function (item, index) {
                if(item.checked) {
                    that.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        },
        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function () {
            let index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
            this.calcTotalPrice();
        }
    },
    filters: {
        formatMoney: function (value) {
            return value.toFixed(2) + "元";

        }
    }

});

Vue.filter("formatMoneyG1", function (value, type) {
    return value.toFixed(2) + type + "1";
});
Vue.filter("formatMoneyG2", function (value, type) {
    return value.toFixed(2) + type + "2";
});