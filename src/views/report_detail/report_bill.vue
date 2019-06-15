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
            <!-- 1 -->
            <div v-if="billInfoArray.length === 0" class="report_bill_new_bill_frame" >
                <div v-if="billCount" class="billbody-box-show">
                    <div class="billbody-box-show-title">
                        <span>账单统计</span>
                    </div>
                    <div class="billbody-box-item">
                        <div class="billbody-box-item-left">
                            <span>生成人员</span>
                        </div>
                        <div class="billbody-box-item-right">
                            <span>{{billCount.driverName}}</span>
                        </div>
                    </div>
                    <div class="billbody-box-item">
                        <div class="billbody-box-item-left">
                            <span>生成日期</span>
                        </div>
                        <div class="billbody-box-item-right">
                            <span>{{billCount.date | dateFilter}}</span>
                        </div>
                    </div>
                    <div class="billbody-box-item">
                        <div class="billbody-box-item-left">
                            <span>生成时间</span>
                        </div>
                        <div class="billbody-box-item-right">
                            <span>{{billCount.date | timefilter}}</span>
                        </div>
                    </div>
                    <div class="billbody-box-item">
                        <div class="billbody-box-item-left">
                            <span>账单数量</span>
                        </div>
                        <div class="billbody-box-item-right">
                            <span>{{billCount.startNum}}</span>
                        </div>
                    </div>
                    <div class="billbox-box-bottom" style="margin-top: 8px">
                        <div class="white_button" style="width: 80px;" @click="openBillBoxMethod()">
                            <span>结束</span>
                        </div>
                    </div>
                </div>
                <div v-else  class="report_bill_new_bill_frame_button" @click="openNewBillBoxMethod()">
                    <div class="report_bill_new_bill_frame_button_top">
                        <div class="bill-icon"></div>
                    </div>
                    <div class="report_bill_new_bill_frame_button_bottom">
                        <span>新建账单</span>
                    </div>
                </div>
            </div>
        <!-- 1 -->
            
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

        <!-- new bill box start -->
        <transition name="report_bill_new_bill" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowBillBox" class="billbox_back"></div>
        </transition>
        <transition name="report_bill_new_bill" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowBillBox" class="billbox_front" @click.self.prevent="isShowBillBox = false">
                <div class="billbox-box">
                    <div class="billbox-box-title">
                        <span>新建账单统计</span>
                    </div>
                    <div class="billbox-box-body">
                        <div class="billbox-box-body-top">
                            <div class="billbox-box-body-top-title">
                                <div>
                                    <span>当前日期</span>
                                </div>
                            </div>
                            <div class="billbox-box-body-top-body">
                                <span>{{billDate}}</span>
                            </div>
                        </div>
                        <div v-if="oldNum" class="billbox-box-body-top" style="padding:0">
                            <div class="billbox-box-body-top-title">
                                <div>
                                    <span>上次剩余</span>
                                </div>
                            </div>
                            <div class="billbox-box-body-top-num" style="height:40px;line-height:40px">
                                <span>{{oldNum}}</span>
                            </div>
                        </div>
                        <div class="billbox-box-body-top"
                             style="padding:0">
                            <div class="billbox-box-body-top-title">
                                <div>
                                    <span>账单数量</span>
                                </div>
                            </div>
                            <div class="billbox-box-body-top-num">
                                <input type="number" v-model="billNum" placeholder="请输入数字">
                            </div>
                        </div>
                    </div>
                    <div class="billbox-box-bottom">
                        <div class="white_button" @click="isShowBillBox = false">
                            <span>关闭</span>
                        </div>
                        <div class="white_button" @click="confirmNewBillMethod()" style="margin-left: 8px;">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- new bill box end -->

        <!-- mission finish box start -->
        <transition name="remove-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowBillFinishBox" class="billbox_back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowBillFinishBox" class="billbox_front" @click.self.prevent="isShowBillFinishBox = false">
                <div class="billbox-box">
                    <div class="billbox-box-title">
                        <span v-if="lang === 'ch'">结束任务</span>
                        <span v-else>Finish Mission</span>
                    </div>
                    <div class="billbox-box-body">
                        <div class="billbox-box-body-top"
                             style="padding:0">
                            <div class="billbox-box-body-top-title">
                                <div>
                                    <span>剩余数量</span>
                                </div>
                            </div>
                            <div class="billbox-box-body-top-num">
                                <input type="number" v-model="endNum" placeholder="请输入剩余数量">
                            </div>
                        </div>
                    </div>
                    <div class="billbox-box-bottom">
                        <div class="white_button" @click="isShowBillFinishBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="white_button" style="margin-left: 8px" @click="billMissionFinishMtehod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- mission finish box end -->

        <!-- mission finish box start -->
        <transition name="remove-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowConfirmBox" class="billbox_back"></div>
        </transition>
        <transition name="remove-client-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowConfirmBox" class="billbox_front" @click.self.prevent="isShowConfirmBox = false">
                <div class="billbox-box">
                    <div class="billbox-box-title">
                        <span v-if="lang === 'ch'">结束任务</span>
                        <span v-else>Finish Mission</span>
                    </div>
                    <div class="billbox-box-body">
                        123
                    </div>
                    <div class="billbox-box-bottom">
                        <div class="white_button" @click="isShowConfirmBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="white_button" style="margin-left: 8px">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- loading animation start -->
        <transition name="remove-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowLoadingAnimation" class="tripcount_loading_back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowLoadingAnimation" class="tripcount_loading_front" @touchmove.prevent>
                <div class="tripcount_loading_box">
                    <div class="spinner">
                        <div class="rect1"></div>
                        <div class="rect2"></div>
                        <div class="rect3"></div>
                        <div class="rect4"></div>
                        <div class="rect5"></div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- loading animation end -->

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

    mounted() {
        this.driverName = localStorage.getItem("drivername");
        this.findBillByUserMethod()
    },

    computed: {
        lang() {
            return this.$store.state.lang;
        }
    },

    data(){
        return {
            topMonth:new Date().getMonth() + 1,
            isShowMonthBox:false,
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            billInfoArray:[],
            isShowBillDetailBox: false,
            billShipping: null,
            oldNum: null,
            billNum: null,
            isShowBillBox: false,
            billDate: new Date().toLocaleDateString(),
            driverName: null,
            isShowLoadingAnimation: false,
            billCount: null,
            isShowBillFinishBox: false,
            isShowConfirmBox: false
        }
    },

    methods:{
        billMissionFinishMtehod() {
            this.isShowLoadingAnimation = true
            let date = new Date().toISOString();
            axios
                .post(config.server + "/bill/edit", {
                    _id: this.billCount._id,
                    endNum: this.endNum,
                    driverNames: this.driverName,
                    endDate: date
                })
                .then(doc => {
                    this.isShowLoadingAnimation = false
                    this.isShowBillFinishBox = false;
                    if (doc.data.code === 0) {
                        this.showError = true;
                        this.errorInfo = "账单记录成功";
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                        this.findBillByUserMethod();
                    } else {
                        this.showError = true;
                        this.errorInfo = "账单记录失败";
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    this.isShowLoadingAnimation = false
                    console.log(err);
                });
        },

        openBillBoxMethod() {
            this.isShowBillFinishBox = true;
        },

        findBillByUserMethod() {
            axios
                .post(config.server + "/bill/find", {
                    driverName: this.driverName
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.billCount = doc.data.doc;
                    } else if (doc.data.code === 1) {
                        this.billCount = null;
                    } else {
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '获取信息时出现错误'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
                        }, 2000);
                        console.log(doc);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        confirmNewBillMethod() {
            if (this.billNum === null) {
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请输入账单数量'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false;
                }, 2000);
            } else {
                this.isShowLoadingAnimation = true
                let tempDate = new Date().toISOString();
                let tempStartNum
                if(this.oldNum){
                    tempStartNum = parseInt(this.billNum) + parseInt(this.oldNum)
                }else{
                    tempStartNum = this.billNum
                }
                axios
                    .post(config.server + "/bill/create", {
                        date: tempDate,
                        startNum: tempStartNum,
                        driverName: this.driverName
                    })
                    .then(doc => {
                        this.isShowLoadingAnimation = false
                        if (doc.data.code === 0) {
                            this.tipsShowColor = 'green'
                            this.tipsInfo = '账单记录成功'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false;
                            }, 1500);
                            this.isShowBillBox = false;
                            this.findBillByUserMethod()
                        } else {
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '账单记录时发生错误'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false;
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        this.isShowLoadingAnimation = false
                        console.log(err);
                    });
            }
        },

        openNewBillBoxMethod(){
            axios
                .get(config.server + "/remainbillnum/find")
                .then(doc => {
                    console.log(doc)
                    if (doc.data.code === 0) {
                        this.oldNum = doc.data.doc.number;
                        this.isShowBillBox = true;
                        this.billNum = null;
                    } else {
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '获取剩余账单数量出现错误'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        
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

.report_bill_new_bill_frame{
    position: fixed;
    top: 40px;
    bottom: 56px;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.report_bill_new_bill_frame_button{
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 8px;
    width: 84px;
}

.report_bill_new_bill_frame_button_top{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.report_bill_new_bill_frame_button_bottom{
    height: 24px;
    line-height: 30px;
}

.bill-icon {
    background: #d74342;
    mask-image: url(../../../public/icons/baseline-add_circle-24px.svg);
    -webkit-mask-image: url(../../../public/icons/baseline-add_circle-24px.svg);
    width: 42px;
    height: 42px;
}

.billbox_back {
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.billbox_front {
    position: fixed;
    z-index: 26;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.billbox-box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.billbox-box-title {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.billbox-box-body{
    padding: 8px;
}

.billbox-box-bottom{
    display: flex;
    display: -webkit-flex;
    padding: 0 8px 8px 8px;
}

.billbox-box-body-top {
    border: 1px solid #e0e0e0;
    margin-top: 20px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 6px 0;
    position: relative;
    border-radius: 10px;
}

.billbox-box-body-top-title {
    position: absolute;
    top: -16px;
    left: 0;
    right: 0;
}

.billbox-box-body-top-title div {
    background: #fff;
    margin: 0 auto;
    width: 100px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
}

.billbox-box-body-top-body{
    border-bottom: 1px solid #eee;
    margin: 0 auto;
    height: 30px;
    line-height: 30px;
    width: 120px;
}

.billbox-box-body-top-num input {
    height: 30px;
    line-height: 30px;
    width: 120px;
    border: none;
    text-align: center;
    font-size: 14px;
    margin: 6px 0;
    padding: 0 12px;
    border-bottom: 1px solid #eee;
}

.tripcount_loading_back {
    position: fixed;
    z-index: 101;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.tripcount_loading_front {
    position: fixed;
    z-index: 102;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.tripcount_loading_box{
    background-color: rgba(255, 255, 255, 0.7);
    width: 100%;
}

.spinner {
    margin: 32px auto;
    width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;
}

.spinner>div {
    background-color: rgba(212, 50, 49, 1);
    height: 100%;
    width: 6px;
    display: inline-block;
    margin-right: 4px;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

.billbody-box-show-title {
    font-size: 16px;
    color: #6a6a6a;
    height: 40px;
    line-height: 40px;
    border-top: 2px solid #d74342;
    border-bottom: 1px solid #e0e0e0;
    width: 80%;
}

.billbody-box-show {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    margin-bottom: 160px;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    cursor: pointer;
    border: 1px solid #e0e0e0;
}

.billbody-box-item {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    margin-top: 5px;
    padding: 0 8px;
}

.billbody-box-item-left {
    width: 80px;
    text-align: left;
    color: #212121;
    line-height: 30px;
}

.billbody-box-item-right {
    width: 120px;
    text-align: left;
    color: #2d2d2d;
    padding-left: 8px;
    border: 1px solid #eee;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
}
</style>
