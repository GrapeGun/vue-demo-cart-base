new Vue({
    el: "#app",
    data: {
        title: "HELLO VUE",
        productList: [],
        totalMoney: 0
    },
    mounted: function () {
        this.createView();
    },
    methods: {
        createView: function () {
            var _this = this;
            this.$http.get("data/cartData.json").then(function(res) {
                _this.productList = res.data.result.list;
                _this.totalMoney = res.data.result.totalMoney;
            });
        }
    },
    filters: {

    }

});