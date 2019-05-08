<template>
    <div id="reportbill">
        <div class="report_bill_title">
            <div class="report_bill_title_left" @click="goBackMethod()">
                <div>
                    <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                </div>
            </div>
            <div class="report_basket_title_center">
                <span>账单统计报告</span>
            </div>
            <div class="report_bill_title_right" @click="openChooseMonthBox()">
                <span>{{topMonth}}月</span>
            </div>
        </div>
        <div class="report_bill_body">
            <div v-for="(item,index) in billInfoArray" :key="index" class="report_bill_body_item" @click="isShowBillDetailBoxMethod(item)">
                <div class="report_bill_body_item_left">
                    <div class="report_bill_body_item_left_frame">
                        <span>{{new Date(item.date).getDate()}}</span>
                    </div>
                </div>
                <div class="report_bill_body_item_right">
                    <div class="report_bill_body_item_right_top">
                        <div class="report_bill_body_item_right_top_left">
                            <span>创建人</span>
                        </div>
                        <div class="report_bill_body_item_right_top_right">
                            <span>{{item.driverName}}</span>
                        </div>
                    </div>
                    <div class="report_bill_body_item_right_bottom">
                        <div class="report_bill_body_item_right_bottom_item">
                            <div class="report_bill_body_item_right_bottom_item_left">
                                <span>获取</span>
                            </div>
                            <div class="report_bill_body_item_right_bottom_item_right">
                                <span>{{item.startNum}}</span>
                            </div>
                        </div>
                        <div class="report_bill_body_item_right_bottom_item">
                            <div class="report_bill_body_item_right_bottom_item_left">
                                <span>发出</span>
                            </div>
                            <div class="report_bill_body_item_right_bottom_item_right">
                                <span>{{item.startNum - item.endNum}}</span>
                            </div>
                        </div>
                        <div class="report_bill_body_item_right_bottom_item">
                            <div class="report_bill_body_item_right_bottom_item_left">
                                <span>剩余</span>
                            </div>
                            <div class="report_bill_body_item_right_bottom_item_right">
                                <span>{{item.endNum}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- bill detail dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowBillDetailBox" class="report_basket_month_back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowBillDetailBox" class="report_basket_month_front" @click.prevent.self="isShowBillDetailBox = false" @touchmove.prevent>
                <div class="report_basket_month_box">
                    <div class="report_basket_month_box_title">
                        <span>账单详情</span>
                    </div>
                    <div class="report_bill_detail_body">
                        <div class="report_bill_detail_body_item">
                            <div class="report_bill_detail_body_item_left">
                                <span>创建人</span>
                            </div>
                            <div class="report_bill_detail_body_item_right">
                                <span>{{billShipping.driverName}}</span>
                            </div>
                        </div>
                        <div class="report_bill_detail_body_item">
                            <div class="report_bill_detail_body_item_left">
                                <span>创建日期</span>
                            </div>
                            <div class="report_bill_detail_body_item_right">
                                <span>{{billShipping.date | dateFilter}}</span>
                            </div>
                        </div>
                        <div class="report_bill_detail_body_item">
                            <div class="report_bill_detail_body_item_left">
                                <span>创建时间</span>
                            </div>
                            <div class="report_bill_detail_body_item_right">
                                <span>{{billShipping.date | timefilter}}</span>
                            </div>
                        </div>
                        <div class="report_bill_detail_body_item">
                            <div class="report_bill_detail_body_item_left">
                                <span>获取账单</span>
                            </div>
                            <div class="report_bill_detail_body_item_right">
                                <span>{{billShipping.startNum}} 份</span>
                            </div>
                        </div>
                        <div class="report_bill_detail_body_item">
                            <div class="report_bill_detail_body_item_left">
                                <span>发出订单</span>
                            </div>
                            <div class="report_bill_detail_body_item_right">
                                <span>{{billShipping.startNum - billShipping.endNum}} 份</span>
                            </div>
                        </div>
                        <div class="report_bill_detail_body_item">
                            <div class="report_bill_detail_body_item_left">
                                <span>剩余订单</span>
                            </div>
                            <div class="report_bill_detail_body_item_right">
                                <span>{{billShipping.endNum}} 份</span>
                            </div>
                        </div>
                        <div class="report_bill_detail_body_item">
                            <div class="report_bill_detail_body_item_left">
                                <span>完成人</span>
                            </div>
                            <div class="report_bill_detail_body_item_right">
                                <span>{{billShipping.driverNames}}</span>
                            </div>
                        </div>
                        <div class="report_bill_detail_body_item">
                            <div class="report_bill_detail_body_item_left">
                                <span>完成日期</span>
                            </div>
                            <div class="report_bill_detail_body_item_right">
                                <span>{{billShipping.endDate | dateFilter}}</span>
                            </div>
                        </div>
                        <div class="report_bill_detail_body_item">
                            <div class="report_bill_detail_body_item_left">
                                <span>完成时间</span>
                            </div>
                            <div class="report_bill_detail_body_item_right">
                                <span>{{billShipping.endDate | timefilter}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="report_bill_detail_bottom">
                        <div class="white_button" @click="isShowBillDetailBox = false">
                            <span>关闭</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- bill detail dialog end -->

        <!-- choose month dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowMonthBox" class="report_basket_month_back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
        <div v-if="isShowMonthBox" class="report_basket_month_front" @click.prevent.self="isShowMonthBox = false" @touchmove.prevent>
            <div class="report_basket_month_box">
                <div class="report_basket_month_box_title">
                    <span>月份选择</span>
                </div>
                <div class="report_basket_month_box_body">
                    <div class="report_basket_month_box_body_item">
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(1)">
                            <div v-if="topMonth === 1" class="report_basket_month_box_body_item_frame_redborder">
                                <span>1</span>
                            </div>
                            <span>1</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(2)">
                            <div v-if="topMonth === 2" class="report_basket_month_box_body_item_frame_redborder">
                                <span>2</span>
                            </div>
                            <span>2</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(3)">
                            <div v-if="topMonth === 3" class="report_basket_month_box_body_item_frame_redborder">
                                <span>3</span>
                            </div>
                            <span>3</span>
                        </div>
                    </div>
                    <div class="report_basket_month_box_body_item">
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(4)">
                            <div v-if="topMonth === 4" class="report_basket_month_box_body_item_frame_redborder">
                                <span>4</span>
                            </div>
                            <span>4</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(5)">
                            <div v-if="topMonth === 5" class="report_basket_month_box_body_item_frame_redborder">
                                <span>5</span>
                            </div>
                            <span>5</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(6)">
                            <div v-if="topMonth === 6" class="report_basket_month_box_body_item_frame_redborder">
                                <span>6</span>
                            </div>
                            <span>6</span>
                        </div>
                    </div>
                    <div class="report_basket_month_box_body_item">
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(7)">
                            <div v-if="topMonth === 7" class="report_basket_month_box_body_item_frame_redborder">
                                <span>7</span>
                            </div>
                            <span>7</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(8)">
                            <div v-if="topMonth === 8" class="report_basket_month_box_body_item_frame_redborder">
                                <span>8</span>
                            </div>
                            <span>8</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(9)">
                            <div v-if="topMonth === 9" class="report_basket_month_box_body_item_frame_redborder">
                                <span>9</span>
                            </div>
                            <span>9</span>
                        </div>
                    </div>
                    <div class="report_basket_month_box_body_item" style="margin-bottom:0">
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(10)">
                            <div v-if="topMonth === 10" class="report_basket_month_box_body_item_frame_redborder">
                                <span>10</span>
                            </div>
                            <span>10</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(11)">
                            <div v-if="topMonth === 11" class="report_basket_month_box_body_item_frame_redborder">
                                <span>11</span>
                            </div>
                            <span>11</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(12)">
                            <div v-if="topMonth === 12" class="report_basket_month_box_body_item_frame_redborder">
                                <span>12</span>
                            </div>
                            <span>12</span>
                        </div>
                    </div>
                </div>
                <div class="report_basket_month_box_bottom">
                    <div class="white_button" @click="isShowMonthBox = false">
                        <span>关闭</span>
                    </div>
                    <div class="white_button" @click="getReportBillInfoMethod()" style="margin-left:8px">
                        <span>确定</span>
                    </div>
                </div>
            </div>
        </div>
        </transition>
        <!-- choose month dialog end -->

        <!-- tips box start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips box end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../assets/js/config";
import tipsBox from "../../components/tipsBox"

export default {
    components:{
        tipsBox
    },

    data(){
        return {
            topMonth:new Date().getMonth() + 1,
            isShowMonthBox:false,
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            billInfoArray:[],
            isShowBillDetailBox:false,
            billShipping:null
        }
    },

    methods:{
        isShowBillDetailBoxMethod(billInfo){
            this.isShowBillDetailBox = true
            this.billShipping = billInfo
        },

        getReportBillInfoMethod(){
            axios
                .post(config.server + "/bill/thisMonth",{
                    myMonth: this.topMonth
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.isShowMonthBox = false
                        this.billInfoArray = doc.data.doc
                        console.log(doc.data)
                        function sortNumber(a,b){
                            return new Date(a.date) - new Date(b.date)
                        }
                        this.billInfoArray = this.billInfoArray.sort(sortNumber)
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '未找到符合条件的数据'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        goBackMethod(){
            this.$router.push("/report");
        },

        openChooseMonthBox(){
            this.isShowMonthBox = true
        },

        chooseMonth(num){
            this.topMonth = num
        }
    }
}
</script>

<style scoped>
.report_bill_title{
    height: 40px;
    line-height: 40px;
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 16px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}

.report_bill_title_left{
    width: 80px;
    display: flex;
    display: -webkit-flex;
}

.report_bill_title_left div{
    padding-left: 12px;
}

.report_bill_title_right{
    width: 80px;
}

.report_basket_month_back{
    position: fixed;
    background-color: rgba(0, 0, 0, 0.12);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 23;
}

.report_basket_month_front{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 24;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.report_basket_month_box{
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    overflow: hidden;
}

.report_basket_month_box_title{
    background-color: #d74342;
    color: #fff;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.report_basket_month_box_body{
    margin: 12px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    padding: 12px;
    background-color: #fff;
}

.report_basket_month_box_body_item{
    display: flex;
    display: -webkit-flex;
    margin-bottom: 12px;
}

.report_basket_month_box_body_item_frame{
    width: 40px;
    height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    border: 1px solid #eee;
    position: relative;
}

.report_basket_month_box_body_item_frame_redborder{
    position: absolute;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    border-radius: 10px;
    background-color: #d74342;
    color: #fff;
}

.report_basket_month_box_body_item_frame span{
    line-height: 30px;
}

.report_basket_month_box_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 8px;
}

.white_button{
    height: 30px;
    line-height: 30px;
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 80px;
    border-radius: 10px;
    background-color: #fff;
}

.report_bill_body{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.report_bill_body_item{
    border: 1px solid #eee;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    display: -webkit-flex;
        margin: 4px 0;
    padding: 0 4px;
}

.report_bill_body_item_left{
    padding: 4px;
}

.report_bill_body_item_left_frame{
    width: 64px;
    height: 64px;
    border: 1px solid #eee;
    border-radius: 10px;
    font-size: 34px;
    line-height: 64px;
}

.report_bill_body_item_right_top{
    display: flex;
    display: -webkit-flex;
    line-height: 30px;
    height: 30px;
    margin-top: 4px;
    margin-bottom: 4px;
}

.report_bill_body_item_right_top_left{
    width: 60px;
}

.report_bill_body_item_right_top_right{
    width: 120px;
    border: 1px solid #eee;
    border-radius: 10px;
}
.report_bill_body_item_right_bottom{
    display: flex;
    display: -webkit-flex;
    line-height: 30px;
    height: 30px;
}

.report_bill_body_item_right_bottom_item{
    display: flex;
    display: -webkit-flex;
}

.report_bill_body_item_right_bottom_item_left{
    width: 38px;
}

.report_bill_body_item_right_bottom_item_right{
    width: 38px;
    border: 1px solid #eee;
    border-radius: 5px;
}

.report_bill_detail_body{
    background-color: #f7f7f7;
    margin: 8px 12px;
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    padding: 8px;
}

.report_bill_detail_body_item{
    display: flex;
    display: -webkit-flex;
    margin-top: 4px;
    margin-bottom: 4px;
}

.report_bill_detail_body_item_left{
    width: 60px;
    text-align: right;
}

.report_bill_detail_body_item_right{
    width: 120px;
    text-align: left;
    margin-left: 8px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding-left: 8px;

}

.report_bill_detail_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 8px;
}
</style>
