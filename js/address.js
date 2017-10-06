new Vue({
    el: ".container",
    data: {
        addressList: [],
        limitNum: 3,
        currentIndex: 0,
        shippingMethod: 1,
        currentAddress: {userName: "", tel: "", streetName: ""},
        currentIndex: 0,
        editFlag: false,
        delFlag: false
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
            this.addressList.forEach(function (address, index) {
                if (address.isDefault) {
                    address.isDefault = false;
                }
            });
        },
        unblock: function () {
            this.editFlag = false;
            this.delFlag = false;
        },
        editAddress: function (address, index) {
            // 修改地址页面, 编辑的数据不直接在地址列表页面同步显示.
            this.editFlag = true;
            this.currentAddress.userName = address.userName;
            this.currentAddress.streetName = address.streetName;
            this.currentAddress.tel = address.tel;
            this.currentIndex = index;
        },
        saveAddress: function () {
            let address = this.addressList[this.currentIndex];
            address.userName = this.currentAddress.userName;
            address.streetName = this.currentAddress.streetName;
            address.tel = this.currentAddress.tel;
            this.editFlag = false;
        },
        delConfirm: function(index) {
            this.currentIndex = index;
            this.delFlag = true;
        },
        delAddress: function () {
            this.addressList.splice(this.currentIndex, 1);
            this.delFlag = false;

        },
        addNewAddress: function() {
            alert("前端能够处理姓名, 街道名称, 电话, 是否默认, 其他字段通过后台生成更为合适, 此功能暂不实现了")
        }
    }

});