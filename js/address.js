new Vue({
    el: ".container",
    data: {
        addressList: [],
        limitNum: 3,
        currentIndex: 0,
        shippingMethod: 1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        getAddressList: function () {

            // var that = this;
            // this.$http.get("data/address.json").then(function(res){
            //     that.addressList = res.data.result;
            // })

            this.$http.get("data/address.json").then(res => {
                this.addressList = res.data.result;
            });

        },
        loadMore: function () {
            this.limitNum = this.addressList.length;
        },
        setDefault: function (item) {
            this.clearDefault();
            item.isDefault = true;
            
        },
        clearDefault: function () {
            this.addressList.forEach(function (item, index) {
                if (item.isDefault) {
                    item.isDefault = false;
                }
            });
        }
    }







});