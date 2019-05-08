<template>
    <div id="report_repair">
        <div class="report_repair_title">
            <div class="report_repair_title_left" @click="goBackMethod()">
                <div>
                    <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                </div>
            </div>
            <div class="report_basket_title_center">
                <span>车辆维修报表</span>
            </div>
            <div class="report_repair_title_right" @click="openChooseMonthBox()">
                <span>{{topMonth}}月</span>
            </div>
        </div>
        <div class="report_repair_empty_top"></div>
        <div class="report_repair_body">
            <div class="report_repair_body_item">
                <div class="report_repair_body_item_frame" @click="notReadyRepair()">
                    <div class="report_repair_body_item_frame_left">
                        <span>未解决事件</span>
                    </div>
                    <div class="report_repair_body_item_frame_right">
                        <span>{{needDoNum}}件</span>
                    </div>
                    <div class="report_repair_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_repair_body_item_frame" @click="getThisMonthInfoMethod()">
                    <div class="report_repair_body_item_frame_left">
                        <span>本月维修共</span>
                    </div>
                    <div class="report_repair_body_item_frame_right">
                        <span>{{allNum}}件</span>
                    </div>
                    <div class="report_repair_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_repair_body_item_frame" @click="getMaxBreakCarInfoMethod()">
                    <div class="report_repair_body_item_frame_left">
                        <span>损坏最多</span>
                    </div>
                    <div class="report_repair_body_item_frame_right">
                        <span v-if="carMaxName">{{carMaxName}},</span>
                        <span v-else>无,</span>
                        <span v-if="carMaxNum">{{carMaxNum}}件</span>
                        <span v-else>0件</span>
                    </div>
                    <div class="report_repair_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
            </div>
            
        </div>
        <div class="report_repair_empty_bottom"></div>

        <!-- 月份选择框 start -->
        <transition name="report_repair-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowMonthBox" class="report_basket_month_back"></div>
        </transition>
        <transition name="report_repair-classes-transition"
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
                    <div class="white_button" @click="getRepairInfoMethod()" style="margin-left:8px">
                        <span>确定</span>
                    </div>
                </div>
            </div>
        </div>
        </transition>
        <!-- 月份选择框 end -->

        <!-- max break car report in this month start -->
        <transition name="report_repair-classes-transition"
                    enter-active-class="animated slideInRight faster"
                    leave-active-class="animated slideOutRight faster">
            <div v-if="isShowMaxBreakCarBox" class="report_report_maxbreak_front" @touchmove.prevent>
                <div class="report_report_maxbreak_title">
                    <div class="report_repair_title_left" @click="isShowMaxBreakCarBox = false">
                        <div>
                            <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                        </div>
                    </div>
                    <div class="report_basket_title_center">
                        <span>本月损坏最多的车辆</span>
                    </div>
                    <div class="report_repair_title_right"></div>
                </div>
                <div class="report_report_maxbreak_body">
                    <div class="report_report_maxbreak_body_carname">
                        <span>{{carMaxName}}</span>
                    </div>
                    <div class="report_report_maxbreak_body_item">
                        <div class="report_report_maxbreak_body_item_title">
                            <span>出现问题部分</span>
                        </div>
                        <div class="report_repair_icon">
                            <div class="report_repair_icon_item">
                                <div class="report_repair_icon_left">
                                    <div class="report_repair_icon_frame">
                                        <div class="report_icon_wiper"></div>
                                    </div>
                                </div>
                                <div class="report_repair_icon_right">
                                    <div class="report_repair_icon_right_item">
                                        <span>雨刷</span>
                                    </div>
                                    <div class="report_repair_icon_right_item">
                                        <span>{{wiperNum}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="report_repair_icon_item">
                                <div class="report_repair_icon_left">
                                    <div class="report_repair_icon_frame">
                                        <div class="report_icon_headlight"></div>
                                    </div>
                                </div>
                                <div class="report_repair_icon_right">
                                    <div class="report_repair_icon_right_item">
                                        <span>大灯</span>
                                    </div>
                                    <div class="report_repair_icon_right_item">
                                        <span>{{headlightNum}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="report_repair_icon_item">
                                <div class="report_repair_icon_left">
                                    <div class="report_repair_icon_frame">
                                        <div class="report_icon_side_mirror"></div>
                                    </div>
                                </div>
                                <div class="report_repair_icon_right">
                                    <div class="report_repair_icon_right_item">
                                        <span>后视镜</span>
                                    </div>
                                    <div class="report_repair_icon_right_item">
                                        <span>{{mirrorNum}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="report_repair_icon_item">
                                <div class="report_repair_icon_left">
                                    <div class="report_repair_icon_frame">
                                        <div class="report_icon_tyre"></div>
                                    </div>
                                </div>
                                <div class="report_repair_icon_right">
                                    <div class="report_repair_icon_right_item">
                                        <span>轮胎</span>
                                    </div>
                                    <div class="report_repair_icon_right_item">
                                        <span>{{tyreNum}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="report_repair_icon_item">
                                <div class="report_repair_icon_left">
                                    <div class="report_repair_icon_frame">
                                        <div class="report_icon_tyre"></div>
                                    </div>
                                </div>
                                <div class="report_repair_icon_right">
                                    <div class="report_repair_icon_right_item">
                                        <span>备胎</span>
                                    </div>
                                    <div class="report_repair_icon_right_item">
                                        <span>{{backupNum}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="report_repair_icon_item">
                                <div class="report_repair_icon_left">
                                    <div class="report_repair_icon_frame">
                                        <div class="report_icon_break"></div>
                                    </div>
                                </div>
                                <div class="report_repair_icon_right">
                                    <div class="report_repair_icon_right_item">
                                        <span>刹车</span>
                                    </div>
                                    <div class="report_repair_icon_right_item">
                                        <span>{{brakeNum}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="report_repair_icon_item">
                                <div class="report_repair_icon_left">
                                    <div class="report_repair_icon_frame">
                                        <div class="report_icon_mail"></div>
                                    </div>
                                </div>
                                <div class="report_repair_icon_right">
                                    <div class="report_repair_icon_right_item">
                                        <span>其他</span>
                                    </div>
                                    <div class="report_repair_icon_right_item">
                                        <span>{{otherNum}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="report_report_maxbreak_body_item">
                    <div class="report_report_maxbreak_body_item_title">
                        <span>其他问题部分</span>
                    </div>
                    <div class="report_report_maxbreak_other_body">
                        <div v-for="(item,index) in otherErrArray" :key="index" class="report_report_maxbreak_body_item_other">
                            <div class="report_report_maxbreak_body_item_other_img">
                                <img :src="item.img | imgurl" v-on:error.once="loadDefault($event)">
                            </div>
                            <div class="report_report_maxbreak_body_item_other_text">
                                <span>{{item.note}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="report_report_maxbreak_body_item">
                    <div class="report_report_maxbreak_body_item_title">
                        <span>申请姓名与数量</span>
                    </div>
                    <div>
                        <div v-for="(item,index) in driverNameAndNumArray" :key="index" class="report_report_maxbreak_body_item_drivernum">
                            <div class="report_report_maxbreak_body_item_drivernum_left">
                                <span>{{item.driver}}</span>
                            </div>
                            <div class="report_report_maxbreak_body_item_drivernum_right">
                                <span>{{item.num}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- max break car report in this month end -->

        <!-- loading animation start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="loadingAnimation" class="tripcount_loading_back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="loadingAnimation"
                 class="tripcount_loading_front">
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

        <!-- not ready repair info dialog start -->
        <transition name="report_repair-classes-transition"
                    enter-active-class="animated slideInRight faster"
                    leave-active-class="animated slideOutRight faster">
            <div v-if="isShowNotReadyBox" class="report_report_maxbreak_front" style="overflow: auto;">
                <div class="report_repair_notready_title">
                    <div class="report_repair_title_left" @click="isShowNotReadyBox = false">
                        <div>
                            <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                        </div>
                    </div>
                    <div class="report_basket_title_center">
                        <span>未维修车辆信息</span>
                    </div>
                    <div class="report_repair_title_right"></div>
                </div>
                <div class="report_repair_empty_top"></div>
                <div>
                    <div v-for="(item,index) in notReadyRepairArray" :key="index" class="report_repair_notready_body_item">
                        <div class="report_repair_notready_body_item_title">
                            <span>{{item.car_id.carid}}</span>
                        </div>
                        <div class="report_repair_notready_body_item_frame">
                            <div v-if="item.image" class="report_repair_notready_body_item_frame_left">
                                <img :src="item.image | imgurl">
                            </div>
                            <div class="report_repair_notready_body_item_frame_right">
                                <span v-if="item.backup === 1">备胎</span>
                                <span v-if="item.brake === 1">刹车</span>
                                <span v-if="item.headlight === 1">大灯</span>
                                <span v-if="item.mirror === 1">后视镜</span>
                                <span v-if="item.tyre === 1">轮胎</span>
                                <span v-if="item.wiper === 1">雨刷</span>
                            </div>
                        </div>
                        <div v-if="item.note" class="report_repair_notready_body_item_bottom">
                            <span>{{item.note}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- not ready repair info dialog end -->

        <!-- this month info dialog start -->
        <transition name="report_repair-classes-transition"
                    enter-active-class="animated slideInRight faster"
                    leave-active-class="animated slideOutRight faster">
            <div v-if="isShowthisMonthRepairBox" class="report_report_maxbreak_front" style="overflow: auto;">
                <div class="report_repair_notready_title">
                    <div class="report_repair_title_left" @click="isShowthisMonthRepairBox = false">
                        <div>
                            <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                        </div>
                    </div>
                    <div class="report_basket_title_center">
                        <span>本月维修信息</span>
                    </div>
                    <div class="report_repair_title_right"></div>
                </div>
                <div class="report_repair_empty_top"></div>
                <div class="report_repair_thismonth_body">
                    <div class="report_repair_thismonth_body_frame" v-for="(item,index) in thisMonthArray" :key="index">
                        <div class="report_repair_thismonth_body_frame_title">
                            <div class="report_repair_thismonth_body_frame_title_left">
                                <span>{{item.driver}}</span>
                            </div>
                            <div class="report_repair_thismonth_body_frame_title_right">
                                <span>{{item.car_id.carid}}</span>
                            </div>
                        </div>
                        <div class="report_repair_thismonth_body_frame_date">
                            <span>{{item.logStartTime | dateFilter}}</span>
                            <span>{{item.logStartTime | timefilter}}</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </transition>
        <!-- this month info dialog end -->

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

    mounted(){
        this.topMonth = new Date().getMonth() + 1
        this.getRepairInfoMethod()
    },

    data(){
        return {
            allNum:0,
            carMaxName:null,
            carMaxNum:0,
            needDoNum:0,
            topMonth:0,
            isShowMonthBox:false,
            loadingAnimation:false,
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            maxBreakCar_id:null,
            isShowMaxBreakCarBox:false,
            backupNum:0,
            brakeNum:0,
            headlightNum:0,
            mirrorNum:0,
            otherNum:0,
            tyreNum:0,
            wiperNum:0,
            otherErrArray:[],
            imgDefault:'../../../public/img/ebuyLogo.png',
            driverNameAndNumArray:[],
            notReadyRepairArray:[],
            isShowNotReadyBox:false,
            isShowthisMonthRepairBox:false,
            thisMonthArray:[]
        }
    },

    methods:{
        getThisMonthInfoMethod(){
            axios
                .post(config.server + "/fixcar/thisMonthInfo",{
                    myMonth:this.topMonth
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.thisMonthArray = doc.data.doc
                        console.log(this.thisMonthArray)
                        this.isShowthisMonthRepairBox = true
                    }else{
                        this.tipsInfo = '获取数据时发生错误'
                        this.tipsShowColor = 'yellow'
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

        notReadyRepair(){
            if(this.needDoNum > 0){
                axios
                    .post(config.server + "/fixcar/notReady")
                    .then(doc => {
                        console.log(doc)
                        if(doc.data.code === 0){
                            this.notReadyRepairArray = doc.data.doc
                            this.isShowNotReadyBox = true
                        }else{
                            this.tipsInfo = '获取数据时发生错误'
                            this.tipsShowColor = 'yellow'
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
                this.tipsInfo = '未找到符合条件的数据'
                this.tipsShowColor = 'yellow'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }
        },

        loadDefault(e) {
            e.currentTarget.src = this.imgDefault
        },

        getMaxBreakCarInfoMethod(){
            if(this.maxBreakCar_id){
                axios
                    .post(config.server + "/fixcar/maxBreak",{
                        car_id:this.maxBreakCar_id,
                        myMonth: this.topMonth
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.isShowMaxBreakCarBox = true
                            this.backupNum = 0
                            this.brakeNum = 0
                            this.headlightNum = 0
                            this.mirrorNum = 0
                            this.otherNum = 0
                            this.tyreNum = 0
                            this.wiperNum = 0
                            this.driverNameAndNumArray = []
                            this.otherErrArray = []
                            doc.data.doc.forEach(element => {
                                let haveThisDriver = false
                                //count error num
                                if(element.backup === 1){
                                    this.backupNum ++
                                }
                                if(element.brake === 1){
                                    this.brakeNum ++
                                }
                                if(element.headlight === 1){
                                    this.headlightNum ++
                                }
                                if(element.mirror === 1){
                                    this.mirrorNum ++
                                }
                                if(element.other === 1){
                                    this.otherNum ++
                                    this.otherErrArray.push({
                                        note:element.note,
                                        img:element.image
                                    })
                                }
                                if(element.tyre === 1){
                                    this.tyreNum ++
                                }
                                if(element.wiper === 1){
                                    this.wiperNum ++
                                }
                                //count driver and num
                                this.driverNameAndNumArray.forEach(info => {
                                    if(info.driver === element.driver){
                                        info.num = info.num + 1
                                        haveThisDriver = true
                                    }
                                })
                                if(!haveThisDriver){
                                    this.driverNameAndNumArray.push({
                                        driver:element.driver,
                                        num:1
                                    })
                                }
                            });
                        }else{
                            this.tipsInfo = '获取信息时遇到问题'
                            this.tipsShowColor = 'yellow'
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
                this.tipsInfo = '未找到该车辆信息'
                this.tipsShowColor = 'yellow'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }
        },

        goBackMethod(){
            this.$router.push("/report");
        },

        getRepairInfoMethod(){
            this.loadingAnimation = true
            axios
                .post(config.server + "/fixcar/firstReport",{
                    myMonth: this.topMonth
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        console.log(doc.data)
                        this.allNum = doc.data.allNum
                        this.needDoNum = doc.data.needDoNum
                        this.carMaxName = doc.data.maxName
                        this.carMaxNum = doc.data.maxNum
                        this.isShowMonthBox = false
                        this.maxBreakCar_id = doc.data.temp_id
                    }else{
                        this.tipsShowColor = 'yellow'
                        if(this.lang === 'cn'){
                            this.tipsInfo = '获取线路信息失败'
                        }else{
                            this.tipsInfo = 'Get trips info failed'
                        }
                        this.isShowTipsBox = true
                        setTimeout(() => {
                             this.isShowTipsBox = false   
                        }, 3000);
                    }
                    this.loadingAnimation = false
                })
                .catch(err => {
                    console.log(err)
                })
        },

        chooseMonth(num){
            this.topMonth = num
        },

        openChooseMonthBox(){
            this.isShowMonthBox = true
        },
    }
}
</script>

<style scoped>
.report_repair_title{
    height: 40px;
    line-height: 40px;
    background-color: #d74342;
    color: #fff;
    font-size: 16px;
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

.report_repair_title_left{
    width: 80px;
    display: flex;
    display: -webkit-flex;
}

.report_repair_title_left div{
    padding-left: 12px;
}

.report_repair_title_right{
    width: 80px;
}
.report_repair_empty_top{
    height: 40px;
}

.report_repair_body{
    margin-top: 12px;
}

.report_repair_body_item{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.report_repair_body_item_frame{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    position: relative;
    border-bottom: 1px solid #eee;
}

.report_repair_body_item_frame_left{
    text-align: left;
    width: 84px;
}

.report_repair_body_item_frame_right{
    text-align: right;
    width: 84px;
}

.report_repair_empty_bottom{
    height: 56px;
}

.report_repair_righticon{
    position: absolute;
    right: 4px;
    top: -2px;
}

.report_repair_righticon img{
    height: 30px;
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

.report_report_maxbreak_front{
    position: fixed;
    top: 0;
    bottom: 56px;
    left: 0;
    right: 0;
    background-color: #f7f7f7;
}

.report_report_maxbreak_title{
    height: 40px;
    background-color: #d74342;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 16px;
    color: #fff;
    line-height: 40px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}

.report_report_maxbreak_body{
    margin-top: 4px;
}

.report_report_maxbreak_body_carname{
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
}

.report_report_maxbreak_body_item{
    margin-top: 4px;
    background-color: #fff;
}

.report_report_maxbreak_body_item_title{
    height: 30px;
    line-height: 30px;
    padding-left: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.report_report_maxbreak_other_body{
    padding: 4px 12px;
}

.report_report_maxbreak_body_item_other{
    display: flex;
    display: -webkit-flex;
    margin: 4px 0
}

.report_report_maxbreak_body_item_other_img{
    width: 40px;
    height: 40px;
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
}

.report_report_maxbreak_body_item_other_img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.report_report_maxbreak_body_item_other_text{
    height: 20px;
    line-height: 20px;
    margin-left: 8px;
}

.report_report_maxbreak_body_item_drivernum{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    padding: 4px 0;
}

.report_report_maxbreak_body_item_drivernum_left{
    border-radius: 10px;
    border: 1px solid #eee;
    height: 30px;
    line-height: 30px;
    width: 80px;
}

.report_report_maxbreak_body_item_drivernum_right{
    border-radius: 10px;
    border: 1px solid #eee;
    height: 30px;
    line-height: 30px;
    width: 40px;
}

.report_repair_icon{
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content:space-between;
}

.report_repair_icon_item{
    display: flex;
    display: -webkit-flex;
    margin: 12px;
}

.report_repair_icon_frame{
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
    width: 40px;
}

.report_icon_wiper{
    mask-image: url(../../../public/icons/icon_wiper.svg);
    background-color: #d74342;
    -webkit-mask-image: url(../../../public/icons/icon_wiper.svg);
    width: 40px;
    height: 40px;
    mask-size: 40px 40px;
    mask-repeat: no-repeat;
    mask-position: center;
}

.report_icon_headlight{
    mask-image: url(../../../public/icons/headlight.svg);
    background-color: #d74342;
    -webkit-mask-image: url(../../../public/icons/headlight.svg);
    width: 40px;
    height: 40px;
    mask-size: 40px 40px;
    mask-repeat: no-repeat;
    mask-position: center;
}

.report_icon_side_mirror{
    mask-image: url(../../../public/icons/side_mirror.svg);
    background-color: #d74342;
    -webkit-mask-image: url(../../../public/icons/side_mirror.svg);
    width: 40px;
    height: 40px;
    mask-size: 40px 40px;
    mask-repeat: no-repeat;
    mask-position: center;
}

.report_icon_tyre{
    mask-image: url(../../../public/icons/tyre.svg);
    background-color: #d74342;
    -webkit-mask-image: url(../../../public/icons/tyre.svg);
    width: 40px;
    height: 40px;
    mask-size: 36px 36px;
    mask-repeat: no-repeat;
    mask-position: center;
}

.report_icon_break{
    mask-image: url(../../../public/icons/icon_break.svg);
    background-color: #d74342;
    -webkit-mask-image: url(../../../public/icons/icon_break.svg);
    width: 40px;
    height: 40px;
    mask-size: 40px 40px;
    mask-repeat: no-repeat;
    mask-position: center;
}

.report_icon_mail{
    mask-image: url(../../../public/icons/baseline-mail-24px.svg);
    background-color: #d74342;
    -webkit-mask-image: url(../../../public/icons/baseline-mail-24px.svg);
    width: 40px;
    height: 40px;
    mask-size: 40px 40px;
    mask-repeat: no-repeat;
    mask-position: center;
}

.report_repair_icon_right{
    width: 44px;
}

.report_repair_icon_right_item{
    height: 20px;
    line-height: 20px
}

.report_repair_notready_title{
    height: 40px;
    line-height: 40px;
    background-color: #d74342;
    display: flex;
    display: -webkit-flex;
    color: #fff;
    font-size: 16px;
    justify-content: space-between;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.report_repair_notready_body_item{
    border: 1px solid #eee;
    border-radius: 10px;
    background-color: #fff;
    margin: 4px 12px;
}

.report_repair_notready_body_item_title{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    margin: 0 24px;
}

.report_repair_notready_body_item_frame{
    display: flex;
    display: -webkit-flex;
    justify-content:space-around;
    margin: 4px 0;
}

.report_repair_notready_body_item_frame_left{
    width:80px;
    height:80px;
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
}

.report_repair_notready_body_item_frame_left img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.report_repair_notready_body_item_frame_right{
    width:80px;
    height:80px;
    padding: 12px;
    text-align: left;
}

.report_repair_notready_body_item_bottom{
    height: 30px;
}

.report_repair_thismonth_body{
    margin: 4px;
}

.report_repair_thismonth_body_frame{
    margin: 8px 12px;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
}

.report_repair_thismonth_body_frame_title{
    display: flex;
    display: -webkit-flex;
    line-height: 30px;
    height: 30px;
    justify-content: space-around;
    border-bottom: 1px solid #eee;
}

.report_repair_thismonth_body_frame_title_left{
    width: 120px;
}

.report_repair_thismonth_body_frame_title_right{
    width: 120px;
}

.report_repair_thismonth_body_frame_date{
    height: 30px;
    line-height: 30px;
}
</style>
