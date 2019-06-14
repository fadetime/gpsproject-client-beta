<template>
    <div id="report_day">
        <div class="report_day_title">
            <div class="report_day_title_left" @click="goBackMethod()">
                <div>
                    <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                </div>
            </div>
            <div class="report_day_title_center">
                <span>白班统计</span>
            </div>
            <div class="report_day_title_right" @click="openChooseMonthBox()">
                <span v-if="topMonth === 0"> 请选择</span>
                <span v-else>{{topMonth}}月</span>
            </div>
        </div>
        <div class="report_day_top_empty"></div>
        <div class="report_day_body">
            <div v-if="thisMonthInfo" class="report_day_body_item">
                <div class="report_day_body_item_frame" @click="openThisMonthDetailMethod('all')">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班任务总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span v-if="thisMonthInfo && thisMonthInfo.all">{{thisMonthInfo.all.length}}单</span>
                        <span v-else>数据异常</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame" @click="openThisMonthDetailMethod('dayOrder')">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班订单总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span v-if="thisMonthInfo && thisMonthInfo.dayOrder">{{thisMonthInfo.dayOrder.length}}单</span>
                        <span v-else>数据异常</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame" @click="openThisMonthDetailMethod('increaseOrder')">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班加单总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span v-if="thisMonthInfo && thisMonthInfo.increaseOrder">{{thisMonthInfo.increaseOrder.length}}单</span>
                        <span v-else>数据异常</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame" @click="openThisMonthDetailMethod('returnOrder')">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班补单总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span v-if="thisMonthInfo && thisMonthInfo.returnOrder">{{thisMonthInfo.returnOrder.length}}单</span>
                        <span v-else>数据异常</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame" @click="openThisMonthDetailMethod('backOrder')">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班退单总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span v-if="thisMonthInfo && thisMonthInfo.backOrder">{{thisMonthInfo.backOrder.length}}单</span>
                        <span v-else>数据异常</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame" @click="openThisMonthDetailMethod('changeOrder')">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班换货总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span v-if="thisMonthInfo && thisMonthInfo.changeOrder">{{thisMonthInfo.changeOrder.length}}单</span>
                        <span v-else>数据异常</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame" @click="openThisMonthDetailMethod('bunOrder')">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班面食总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span v-if="thisMonthInfo && thisMonthInfo.deliveryOrder">{{thisMonthInfo.bunOrder.length}}单</span>
                        <span v-else>数据异常</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame" @click="openThisMonthDetailMethod('deliveryOrder')">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班运输总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span v-if="thisMonthInfo && thisMonthInfo.deliveryOrder">{{thisMonthInfo.deliveryOrder.length}}单</span>
                        <span v-else>数据异常</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame" @click="openThisMonthDetailMethod('otherOrder')">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班其他单数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span v-if="thisMonthInfo && thisMonthInfo.otherOrder">{{thisMonthInfo.otherOrder.length}}单</span>
                        <span v-else>数据异常</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
            </div>
        </div>
        <!-- day detail dialog start -->
        <transition name="report_day_detail" enter-active-class="animated slideInRight faster" leave-active-class="animated slideOutLeft faster">
            <div v-if="isShowDayDetail" class="daydetail_back">
                <div class="daydetail_back_title">
                    <div class="daydetail_back_title_left" @click="isShowDayDetail = false">
                        <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                    </div>
                    <div class="daydetail_back_title_center">
                        <span v-if="detailType === 'dayOrder'">订单</span>
                        <span v-else-if="detailType === 'increaseOrder'">加单</span>
                        <span v-else-if="detailType === 'returnOrder'">补单</span>
                        <span v-else-if="detailType === 'backOrder'">退单</span>
                        <span v-else-if="detailType === 'changeOrder'">换货</span>
                        <span v-else-if="detailType === 'bun'">面食</span>
                        <span v-else-if="detailType === 'deliveryOrder'">运输</span>
                        <span v-else>其他</span>
                    </div>
                    <div class="daydetail_back_title_right">
                        <span>{{topMonth}}月</span>
                    </div>
                </div>
                <div style="height:40px;"></div>
                <div class="daydetail_back_body" :style="autoHeight">
                    <div class="daydetail_back_body_frame" v-for="(item,index) in tempDayDetail" :key="index">
                        <div class="daydetail_back_body_frame_top">
                            <span>{{item.clientName}}</span>
                            <div class="daydetail_back_body_frame_top_state">
                                <span v-if="item.isIncreaseOrder === 'order'">订单</span>
                                <span v-else-if="item.isIncreaseOrder  === 'true'">加单</span>
                                <span v-else-if="item.isIncreaseOrder  === 'false'">补单</span>
                                <span v-else-if="item.isIncreaseOrder  === 'return'">退单</span>
                                <span v-else-if="item.isIncreaseOrder  === 'change'">换货</span>
                                <span v-else-if="item.isIncreaseOrder  === 'bun'">面食</span>
                                <span v-else-if="item.isIncreaseOrder  === 'delivery'">运输</span>
                                <span v-else-if="item.isIncreaseOrder  === 'other'">其他</span>
                                <span v-else>未填写</span>
                                <span>-</span>
                                <span v-if="item.dayMission_id === null" style="color:#d74342">未分配</span>
                                <span v-else-if="item.dayMission_id" style="color:#ff9800">未完成</span>
                                <span v-else style="color: green">已完成</span>
                            </div>
                        </div>
                        <div class="daydetail_back_body_frame_center">
                            <div class="daydetail_back_body_frame_center_item">
                                <div class="daydetail_back_body_frame_center_item_box">
                                    <div class="daydetail_back_body_frame_center_item_box_name">
                                        <span>司机姓名</span>
                                    </div>
                                    <div class="daydetail_back_body_frame_center_item_box_content">
                                        <span>{{item.driverName}}</span>
                                    </div>
                                </div>
                                <div class="daydetail_back_body_frame_center_item_box">
                                    <div class="daydetail_back_body_frame_center_item_box_name">
                                        <span>订单时间</span>
                                    </div>
                                    <div class="daydetail_back_body_frame_center_item_box_content">
                                        <span>{{item.orderDate | dateFilter}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="daydetail_back_body_frame_center_item">
                                <div class="daydetail_back_body_frame_center_item_box">
                                    <div class="daydetail_back_body_frame_center_item_box_name">
                                        <span>完成日期</span>
                                    </div>
                                    <div class="daydetail_back_body_frame_center_item_box_content">
                                        <span v-if="item.finishDate">{{item.finishDate | dateFilter}}</span>
                                        <span v-else>未完成</span>
                                    </div>
                                </div>
                                <div class="daydetail_back_body_frame_center_item_box">
                                    <div class="daydetail_back_body_frame_center_item_box_name">
                                        <span>完成时间</span>
                                    </div>
                                    <div class="daydetail_back_body_frame_center_item_box_content">
                                        <span v-if="item.finishTime">{{item.finishTime | timefilter}}</span>
                                        <span v-else>未完成</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- day detail dialog end -->
        <!-- time picker start -->
        <monthPicker :openMonthChooseBox="ShowMonthChooseBox" @closeMonthChooseBox="closeMonthChooseBox" @monthNum="getMonthMethod" @finalState="finalState"/>
        <!-- time picker end -->

        <!-- tips dialog start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips dialog end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../assets/js/config";
import tipsBox from "../../components/tipsBox"
import monthPicker from "../../components/monthPicker"

export default {
    components:{
        monthPicker,
        tipsBox
    },

    mounted(){
        let screenHeight = document.documentElement.clientHeight
        let lindBoxHeight = screenHeight - 40 - 56 - 1
        this.autoHeight = 'height:' + lindBoxHeight + 'px'
    },

    data(){
        return {
            isShowMonthPicker: false,
            ShowMonthChooseBox: false,
            topMonth: 0,
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            thisMonthInfo: null,
            tempDayDetail: [],
            isShowDayDetail: false,
            detailType: null,
            autoHeight: ''
        }
    },

    methods:{
        openThisMonthDetailMethod(type){
            this.detailType = type
            if(type === 'all'){//全部
                this.tempDayDetail = this.thisMonthInfo.all
            }else if(type === 'dayOrder'){//订单
                this.tempDayDetail = this.thisMonthInfo.dayOrder
            }else if(type === 'increaseOrder'){//加单
                this.tempDayDetail = this.thisMonthInfo.increaseOrder
            }else if(type === 'returnOrder'){//补单
                this.tempDayDetail = this.thisMonthInfo.returnOrder
            }else if(type === 'backOrder'){//退单
                this.tempDayDetail = this.thisMonthInfo.backOrder
            }else if(type === 'changeOrder'){//换货
                this.tempDayDetail = this.thisMonthInfo.changeOrder
            }else if(type === 'bunOrder'){//面食
                this.tempDayDetail = this.thisMonthInfo.bunOrder
            }else if(type === 'deliveryOrder'){//运输
                this.tempDayDetail = this.thisMonthInfo.deliveryOrder
            }else{//其他
                this.tempDayDetail = this.thisMonthInfo.otherOrder
            }
            this.isShowDayDetail = true
            console.log(this.tempDayDetail)
        },

        finalState(value){
            if(value){
                this.ShowMonthChooseBox = false
                axios
                    .post(config.server + '/dayShiftmission/thisMonthInfo',{
                        myMonth:this.topMonth
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            let dayOrder = [] //订单
                            let increaseOrder = [] //加单
                            let returnOrder = [] //补单
                            let backOrder = [] //退单
                            let changeOrder = [] //换货
                            let bunOrder = [] //面食
                            let deliveryOrder = [] //运输
                            let otherOrder = [] //其他
                            async function pickOrderType(){
                                new Promise(()=> {
                                    doc.data.doc.forEach(element => {
                                        if(element.isIncreaseOrder === 'order'){
                                            dayOrder.push(element)
                                        }else if(element.isIncreaseOrder === 'true'){
                                            increaseOrder.push(element)
                                        }else if(element.isIncreaseOrder === 'false'){
                                            returnOrder.push(element)
                                        }else if(element.isIncreaseOrder === 'return'){
                                            backOrder.push(element)
                                        }else if(element.isIncreaseOrder === 'change'){
                                            changeOrder.push(element)
                                        }else if(element.isIncreaseOrder === 'bun'){
                                            bunOrder.push(element)
                                        }else if(element.isIncreaseOrder === 'deliveryOrder'){
                                            deliveryOrder.push(element)
                                        }else{
                                            otherOrder.push(element)
                                        }
                                    });
                                })
                            }
                            async function waitPickOrder(){
                                await pickOrderType()
                            }
                            waitPickOrder()
                            this.thisMonthInfo = {
                                all: doc.data.doc,
                                dayOrder: dayOrder,
                                increaseOrder: increaseOrder,
                                returnOrder: returnOrder,
                                backOrder: backOrder,
                                changeOrder: changeOrder,
                                bunOrder: bunOrder,
                                deliveryOrder: deliveryOrder,
                                otherOrder: otherOrder
                            }
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '未找到相应数据'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }else{
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请选择月份'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }
        },

        getMonthMethod(month){
            console.log(month)
            this.topMonth = month
        },

        openChooseMonthBox(){
            this.ShowMonthChooseBox = true
        },

        closeMonthChooseBox(value){
            this.ShowMonthChooseBox = value
        },

        goBackMethod(){
            this.$router.push("/report");
        },
    }
}
</script>

<style scoped>
.report_day_title{
    height: 40px;
    font-size: 16px;
    background-color: #d74342;
    line-height: 40px;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}

.report_day_title_left{
    width: 80px;
    display: flex;
    display: -webkit-flex;
}

.report_day_title_left div{
    padding-left: 12px;
}

.report_day_title_right{
    width: 80px;
}

.report_day_top_empty{
    height: 40px;
}

.report_day_body_item{
    margin-top: 12px;
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.report_day_body_item_frame{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #eee;
    position: relative;
}

.report_day_body_item_frame_left{
    width: 132px;
    text-align: left;
}

.report_day_body_item_frame_right{
    width: 52px;
    text-align: right;
}

.report_day_righticon{
    position: absolute;
    right: 4px;
    top: -2px;
}

.report_day_righticon img{
    height: 30px;
}

.daydetail_back{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 24;
    background-color: #fff;
}

.daydetail_back_title{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    background-color: #d74342;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.daydetail_back_title_left{
    width: 80px;
    display: flex;
    display: -webkit-flex;
    padding-left: 12px;
    align-items: center;
}

.daydetail_back_title_left img{
    width: 20px;
    height: 20px;
}

.daydetail_back_title_right{
    width: 80px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.daydetail_back_body{
    overflow-y: auto;
    overflow-x: hidden;
}

.daydetail_back_body_frame{
    border: 1px solid #eee;
    border-radius: 5px;
    margin: 8px 12px;
    padding: 8px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.daydetail_back_body_frame_top{
    text-align: left;
    padding-left: 8px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    position: relative;
}

.daydetail_back_body_frame_top_state{
    position: absolute;
    right: 0;
    top: 0;
}

.daydetail_back_body_frame_center_item{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    padding-top: 3px;
}

.daydetail_back_body_frame_center_item_box{
    display: flex;
    display: -webkit-flex;
}

.daydetail_back_body_frame_center_item_box_name{
    height: 24px;
    line-height: 24px;
}

.daydetail_back_body_frame_center_item_box_content{
    margin-left: 8px;
    border: 1px solid #eee;
    height: 24px;
    line-height: 22px;
    width: 94px;
    border-radius: 5px;
}
</style>
