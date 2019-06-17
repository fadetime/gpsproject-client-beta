<template>
    <div id="billpage">
        <div class="billtop">
            <span>账单</span>
        </div>
        <div style="height:50px">
            <!-- 顶部占位符 -->
        </div>
        <div class="billbody">
            <div v-if="billCount"
                 class="billbody-box-show">
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
                <div class="billbox-box-bottom">
                    <!-- <div class="billbox-body-center-button"
                         style="width: 80px;margin-right:10px"
                         @click="isShowReomveBox = true">
                        <span v-if="lang === 'ch'"
                              style="color:#d74342">删除</span>
                        <span v-else>Remove</span>
                    </div> -->
                    <div class="billbox-body-center-button"
                         style="width: 80px;"
                         @click="openBillBoxMethod()">
                        <span v-if="lang === 'ch'">结束</span>
                        <span v-else>Finish</span>
                    </div>
                </div>
            </div>
            <div v-else
                 class="billbody-box"
                 @click="openBillBoxMetho">
                <div class="bill-icon"
                     style="margin:10px 0"></div>
                <div style="padding:5px 0">
                    <span style="color:#6a6a6a">账单任务</span>
                </div>
            </div>
        </div>

        <!-- mission box start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowBillBox"
                 class="billboxbillbox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowBillBox"
                 class="billbox-front"
                 @click.self.prevent="isShowBillBox = false">
                <div class="billbox-box">
                    <div class="billbox-box-top">
                        <span v-if="lang === 'ch'">账单任务</span>
                        <span v-else>Bill Mission</span>
                    </div>
                    <div class="billbox-box-body">
                        <div class="billbox-box-body-top">
                            <div class="billbox-box-body-top-title">
                                <div>
                                    <span>当前日期</span>
                                </div>
                            </div>
                            <span>{{billDate}}</span>
                        </div>

                        <div v-if="oldNum"
                             class="billbox-box-body-top"
                             style="padding:0">
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
                                <input type="number"
                                       v-model="billNum">
                            </div>
                        </div>
                    </div>
                    <div class="billbox-box-bottom">
                        <div class="billbox-body-center-button"
                             style="width: 80px;margin-right:10px"
                             @click="isShowBillBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="billbox-body-center-button"
                             style="width: 80px;"
                             @click="billMissionMtehod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>

            </div>
        </transition>
        <!-- mission box end -->

        <!-- mission finish box start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowBillFinishBox"
                 class="billbox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowBillFinishBox"
                 class="billbox-front"
                 @click.self.prevent="isShowBillFinishBox = false">
                <div class="billbox-box">
                    <div class="billbox-box-top">
                        <span v-if="lang === 'ch'">结束任务</span>
                        <span v-else>finish Mission</span>
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
                                <input type="number"
                                       v-model="endNum">
                            </div>
                        </div>
                    </div>
                    <div class="billbox-box-bottom">
                        <div class="billbox-body-center-button"
                             style="width: 80px;margin-right:10px"
                             @click="isShowBillFinishBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="billbox-body-center-button"
                             style="width: 80px;"
                             @click="billMissionFinishMtehod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- mission finish box end -->

        <!-- check again box start -->
        <transition name="remove-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowStartConfirmBox" class="billbox_back" style="z-index: 27"></div>
        </transition>
        <transition name="remove-client-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowStartConfirmBox" class="billbox_front" style="z-index: 28" @click.self.prevent="isShowStartConfirmBox = false">
                <div class="billbox-box">
                    <div class="billbox-box-title">
                        <span v-if="lang === 'ch'">账单数量确认</span>
                        <span v-else>Number of bill confirm</span>
                    </div>
                    <div class="report_bill_box_body">
                        <div class="report_bill_box_body_top">
                            <span>请确认数字</span>
                        </div>
                        <div class="report_bill_box_body_bottom">
                            <span>{{billNum}}</span>
                        </div>
                    </div>
                    <div class="billbox-box-bottom">
                        <div class="white_button" @click="isShowStartConfirmBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="white_button" style="margin-left: 8px" @click="checkAgainStartMethod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- check again box end -->

        <!-- check end box start -->
        <transition name="remove-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowEndConfirmBox" class="billbox_back" style="z-index: 27"></div>
        </transition>
        <transition name="remove-client-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowEndConfirmBox" class="billbox_front" style="z-index: 28" @click.self.prevent="isShowEndConfirmBox = false">
                <div class="billbox-box">
                    <div class="billbox-box-title">
                        <span v-if="lang === 'ch'">剩余数量确认</span>
                        <span v-else>Number of bill confirm</span>
                    </div>
                    <div class="report_bill_box_body">
                        <div class="report_bill_box_body_top">
                            <span>请确认数字</span>
                        </div>
                        <div class="report_bill_box_body_bottom">
                            <span>{{endNum}}</span>
                        </div>
                    </div>
                    <div class="billbox-box-bottom">
                        <div class="white_button" @click="isShowEndConfirmBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="white_button" style="margin-left: 8px" @click="checkEndBillMethod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- check end box end -->

        <!-- mission remove box start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowReomveBox"
                 class="billbox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowReomveBox"
                 class="billbox-front"
                 @click.self.prevent="isShowReomveBox = false">
                <div class="billbox-box">
                    <div class="billbox-box-top">
                        <span v-if="lang === 'ch'">删除任务</span>
                        <span v-else>finish Mission</span>
                    </div>
                    <div class="billbox-box-body">
                        <div class="removebox-box-body-title">
                            <span v-if="lang === 'ch'"
                                  style="font-size:16px">删除原因</span>
                            <span v-else
                                  style="font-size:16px">Choise Reason</span>
                        </div>
                        <div class="removebox-box-body-item">
                            <div>
                                <input type="radio"
                                       id="radio1"
                                       value="添加错误"
                                       v-model="radioPicked">
                            </div>
                            <div style="padding-left:10px">
                                <label v-if="lang === 'ch'"
                                       for="radio1">添加错误</label>
                                <label v-else
                                       for="radio1">Add error</label>
                            </div>
                        </div>
                        <div class="removebox-box-body-item">
                            <div>
                                <input type="radio"
                                       id="radio3"
                                       value="other"
                                       v-model="radioPicked">
                            </div>
                            <div style="padding-left:10px">
                                <label v-if="lang === 'ch'"
                                       for="radio3">其他原因</label>
                                <label v-else
                                       for="radio3">other</label>
                            </div>
                        </div>
                        <div class="removebox-box-body-item">
                            <textarea :disabled="radioPicked != 'other'"
                                      style="margin:0 10px;width: 180px;"
                                      name="otherreason"
                                      id="otherreason"
                                      cols="30"
                                      rows="10"
                                      v-model="otherText"></textarea>
                        </div>
                    </div>
                    <div class="billbox-box-bottom">
                        <div class="billbox-body-center-button"
                             style="width: 80px;margin-right:10px"
                             @click="isShowReomveBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="billbox-body-center-button"
                             style="width: 80px;"
                             @click="removeBillMtehod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- mission remove box end -->

        <!-- first page notice start -->
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowFirstPageNotice"
                 class="first_notic_back">
                <div class="first_notic_back_close" @click="isShowFirstPageNotice = false">
                    <span v-if="lang === 'ch'" style="font-size:14px;line-height: 38px;">已读</span>
                    <span v-else style="font-size:13px;line-height: 42px;">READ</span>
                </div>
                <div class="first_notic_back_top">
                    <img src="../../public/img/handshake.png" alt="handshake"> 
                </div> 
                <div class="first_notic_back_center">
                    <div class="first_notic_back_center_frame" @click="isShowBigImageDialog = true">
                        <img v-if="lang === 'ch'" :src="firstPageImage | imgurl" alt="notice_pic">
                        <img v-else :src="firstPageImageEN | imgurl" alt="notice_pic">
                    </div>
                </div>
                <div class="first_notic_back_bottom">
                    <div class="first_notic_back_bottom_frame">
                        <span v-if="lang === 'ch'">{{firstPageText}}</span>
                        <span v-else>{{firstPageTextEN}}</span>
                    </div>
                </div>
            </div>
        </transition>
        <!-- first page notice end -->

        <!-- big image dialog start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowBigImageDialog" class="bigimg_dialog">
                <div class="first_notic_back_close" @click="isShowBigImageDialog = false">
                    <span style="font-size: 24px;line-height: 36px;">x</span>
                </div>
                <div class="bigimg_dialog_frame">
                    <img v-if="lang === 'ch'" :src="firstPageImage | imgurl" alt="notice_pic">
                    <img v-else :src="firstPageImageEN | imgurl" alt="notice_pic">
                </div>
            </div>
        </transition>
        <!-- big image dialog end -->

        <!-- 操作提示 -->
        <transition name="tips-classes-transition"
                    enter-active-class="animated bounceInDown"
                    leave-active-class="animated bounceOutUp">
            <div class="errinfo"
                 v-if="showError"
                 @click="showError = false">
                <span>{{errorInfo}}</span>
            </div>
        </transition>
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- 操作提示 -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";
import tipsBox from "../components/tipsBox"

export default {
    components:{
        tipsBox
    },

    mounted() {
        this.driverName = localStorage.getItem("drivername");
        this.findBillByDriverMethod();
        this.findFirstPageNotice()
    },

    computed: {
        lang() {
            return this.$store.state.lang;
        }
    },

    data() {
        return {
            isShowBillBox: false,
            billDate: new Date().toLocaleDateString(),
            billNum: null,
            endNum: null,
            showError: false,
            errorInfo: "未知错误",
            driverName: null,
            billCount: null,
            isShowBillFinishBox: false,
            isShowReomveBox: false,
            radioPicked: null,
            otherText: null,
            oldNum: null,
            isShowFirstPageNotice:false,
            isShowBigImageDialog:false,
            firstPageText:null,
            firstPageTextEN:null,
            firstPageImage: null,
            firstPageImageEN: null,
            isShowEndConfirmBox: false,
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            isShowStartConfirmBox: false
        };
    },
    methods: {
        findFirstPageNotice(){
            let noticeOldTime = localStorage.getItem('noticeOldTime')
            if(noticeOldTime){
                let tempdate = new Date().toLocaleDateString()
                tempdate = new Date(tempdate).getTime()
                if(noticeOldTime < tempdate){
                    axios
                        .get(config.server + '/announcement/find')
                        .then(doc => {
                            if(doc.data.code === 0){
                                this.firstPageText = doc.data.text
                                this.firstPageTextEN = doc.data.textEN
                                this.firstPageImage = doc.data.image
                                this.firstPageImageEN = doc.data.imageEN
                                this.isShowFirstPageNotice = true
                                localStorage.noticeOldTime = tempdate
                            }else{
                                if(this.lang === 'ch'){
                                    this.errorInfo = '获取首页通知失败'
                                }else{
                                    this.errorInfo = 'Get first page notice failed'
                                }
                                this.showErrorTips = true
                                setTimeout(() => {
                                    this.showErrorTips = false
                                }, 2000);
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }else{
                noticeOldTime = new Date().toLocaleDateString()
                noticeOldTime = new Date(noticeOldTime).getTime()
                axios
                    .get(config.server + '/announcement/find')
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.firstPageText = doc.data.text
                            this.firstPageTextEN = doc.data.textEN
                            this.firstPageImage = doc.data.image
                            this.firstPageImageEN = doc.data.imageEN
                            this.isShowFirstPageNotice = true
                            localStorage.noticeOldTime = noticeOldTime
                        }else{
                            if(this.lang === 'ch'){
                                this.errorInfo = '获取首页通知失败'
                            }else{
                                this.errorInfo = 'Get first page notice failed'
                            }
                            this.showErrorTips = true
                            setTimeout(() => {
                                this.showErrorTips = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    }) 
           }          
        },

        removeBillMtehod() {
            if (this.radioPicked === null) {
                this.showError = true;
                this.errorInfo = "请输入原因";
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            } else {
                console.log("删除");
            }
        },

        checkEndBillMethod(){
            let date = new Date().toISOString();
            axios
                .post(config.server + "/bill/edit", {
                    _id: this.billCount._id,
                    endNum: this.endNum,
                    driverNames: this.driverName,
                    endDate: date
                })
                .then(doc => {
                    this.isShowBillFinishBox = false;
                    if (doc.data.code === 0) {
                        this.isShowEndConfirmBox = false
                        this.showError = true;
                        this.errorInfo = "账单记录成功";
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                        this.findBillByDriverMethod();
                    } else {
                        this.showError = true;
                        this.errorInfo = "账单记录失败";
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        billMissionFinishMtehod() {
            if(this.endNum === null){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请输入剩余数量'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 2000);
            }else{
                this.isShowEndConfirmBox = true
            }
        },

        openBillBoxMethod() {
            this.isShowBillFinishBox = true;
        },

        findBillByDriverMethod() {
            axios
                .post(config.server + "/bill/find", {
                    driverName: this.driverName
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.billCount = doc.data.doc;
                        this.$store.dispatch("setHaveBill", true);
                        localStorage.haveBill = true;
                    } else if (doc.data.code === 1) {
                        this.billCount = null;
                        this.$store.dispatch("setHaveBill", false);
                        localStorage.haveBill = false;
                    } else {
                        this.showError = true;
                        this.errorInfo = "获取信息时出现错误";
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                        console.log(doc);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        checkAgainStartMethod(){
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
                    if (doc.data.code === 0) {
                        this.isShowStartConfirmBox = false
                        this.showError = true;
                        this.errorInfo = "账单记录成功";
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                        this.isShowBillBox = false;
                        this.findBillByDriverMethod();
                    } else {
                        this.showError = true;
                        this.errorInfo = "出现错误，请联系管理员";
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        billMissionMtehod() {
            if (this.billNum === null) {
                this.showError = true;
                this.errorInfo = "请输入账单数量";
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            } else {
                this.isShowStartConfirmBox = true
            }
        },
        openBillBoxMetho() {
            axios
                .get(config.server + "/remainbillnum/find")
                .then(doc => {
                    console.log(doc);
                    if (doc.data.code === 0) {
                        this.oldNum = doc.data.doc.number;
                    } else {
                        this.showError = true;
                        this.errorInfo = "获取剩余账单数量出现错误";
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                    this.isShowBillBox = true;
                    this.billNum = null;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
#billpage {
    height: 90%;
}
.billtop {
    height: 40px;
    line-height: 40px;
    background: #d74342;
    color: #fff;
    font-size: 18px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
}

.billbody {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.billbody-box {
    width: 120px;
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

.billbody-box:active {
    box-shadow: none;
    transition: 0.2s;
}

.bill-icon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-add_circle-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-add_circle-24px.svg);
    width: 42px;
    height: 42px;
}

.billbox-back {
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.billbox-front {
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
    overflow: hidden;
    border-radius: 10px;
}

.billbody-box-item {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    margin-top: 5px;
}

.billbody-box-item-left {
    width: 80px;
    text-align: right;
    color: #212121;
}

.billbody-box-item-right {
    width: 120px;
    text-align: center;
    color: #2d2d2d;
}

.billbox-box-top {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.billbox-box-body {
    font-size: 16px;
    margin: 0 10px;
}

.billbox-box-body-top {
    border: 1px solid #e0e0e0;
    margin-top: 20px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 10px 0;
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

.billbox-box-body-top-num input {
    height: 40px;
    width: 100px;
    border: none;
    text-align: center;
    font-size: 18px;
}

.billbox-box-bottom {
    display: flex;
    display: -webkit-flex;
    margin: 10px;
}

.billbox-body-center-button {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 100px;
    margin: 0 auto;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
    transition: 0.2s;
}

.billbox-body-center-button:active {
    box-shadow: none;
    transition: 0.2s;
}

.errinfo {
    position: fixed;
    z-index: 19;
    top: 8px;
    background-color: rgba(255, 255, 0, 0.7);
    width: 100%;
    z-index: 99;
}

.errinfo span {
    font-size: 16px;
    line-height: 32px;
}

.removebox-box-body-title {
    padding-top: 10px;
    border-bottom: 1px solid #e0e0e0;
    height: 40px;
    line-height: 30px;
    margin: 0 10px;
}

.removebox-box-body-item {
    margin-top: 5px;
    font-size: 14px;
    display: flex;
    display: -webkit-flex;
    justify-content: left;
}

.removebox-box-body-item input {
    width: 16px;
    height: 16px;
    margin-left: 30px;
}

.first_notic_back{
    position: fixed;
    z-index: 101;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f7f7f7;
    overflow-y: auto;
}

.first_notic_back_close{
    position: fixed;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    z-index: 143;
    top: 10px;
    color: #000;
    background-color: #fff;
    font-size: 20px;
    line-height: 26px;
    right: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.first_notic_back_center{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 10px;
}

.first_notic_back_center_frame{
    background-color: #fff;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 220px;
    height: 260px;
}

.first_notic_back_center_frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.first_notic_back_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.first_notic_back_bottom_frame{
    width: 320px;
    text-align: left;
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    padding: 12px;
    /* white-space: pre-wrap; */
    word-wrap: break-word;
    text-overflow: ellipsis;
    line-height: 25px;
}

.bigimg_dialog{
    position: fixed;
    z-index: 103;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.bigimg_dialog_frame{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
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

.billbox-box-title {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
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

.report_bill_box_body{
    border: 1px solid #eee;
    border-radius: 10px;
    margin: 8px;
    padding: 12px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.report_bill_box_body_top{
    border-bottom: 1px solid #eee;
    height: 30px;
    line-height: 30px;
}

.report_bill_box_body_bottom{
    height: 30px;
    line-height: 30px;
    font-size: 18px;
}
</style>
