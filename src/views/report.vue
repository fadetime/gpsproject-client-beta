<template>
    <div id="report">
        <div class="report_title">
            <span>报表</span>
        </div>
        <div class="report_emptyspace"></div>
        <div class="report_body">
            <div class="report_icon_item" style="margin-top: 50px;">
                <div class="report_icon_frame" @click="goReportBasket()">
                    <div class="report_icon_basket"></div>
                </div>
                <div class="report_icon_frame" @click="goReportRepair()">
                    <div class="report_icon_carRepair"></div>
                </div>
            </div>
            <div class="report_icon_item" style="margin-top: 30px;">
                <div class="report_icon_frame" @click="goReportBill()">
                    <div class="report_icon_bill"></div>
                </div>
            </div>
        </div>
        <div class="report_emptyspace_bottom"></div>
    </div>
</template>

<script>
export default {
    methods:{
        goReportBill(){
            this.$router.push("/report_bill");
        },

        goReportBasket(){
            this.$router.push("/report_basket");
        },

        goReportRepair(){
            this.$router.push("/report_repair");
        }
    }
}
</script>

<style scoped>
.report_title{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
}

.report_emptyspace{
    height: 40px;
}

.report_body{
    margin: 12px 24px;
}

.report_icon_item{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.report_icon_frame{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    margin: 0 8px;
}

.report_icon_basket{
    mask-image: url(../../public/icons/icon-basket.svg);
    background-color: #d74342;
    -webkit-mask-image: url(../../public/icons/icon-basket.svg);
    width: 80px;
    height: 80px;
    mask-size: 72px 72px;
    mask-repeat: no-repeat;
    mask-position: center
}

.report_icon_carRepair{
    mask-image: url(../../public/icons/carRepair.svg);
    background-color: #d74342;
    -webkit-mask-image: url(../../public/icons/carRepair.svg);
    width: 80px;
    height: 80px;
    mask-size: 72px 72px;
    mask-repeat: no-repeat;
    mask-position: center
}

.report_icon_bill{
    mask-image: url(../../public/icons/icon_bill.svg);
    background-color: #d74342;
    -webkit-mask-image: url(../../public/icons/icon_bill.svg);
    width: 80px;
    height: 80px;
    mask-size: 72px 72px;
    mask-repeat: no-repeat;
    mask-position: center
}

.report_emptyspace_bottom{
    height: 56px;
}
</style>
