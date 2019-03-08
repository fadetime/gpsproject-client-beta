<template>
    <div id="dayshifthome">
        <div class="search-title">
            <span>{{drivername}}</span>
        </div>
        <div style="height:40px">
            <!-- 顶部占位符 -->
        </div>
        <div v-if="missionArray.length === 0"
             style="width: 50%;margin: 0 auto;padding-top: 17.5vh;">
            <img src="../../public/img/ebuyLogo.png"
                 alt="logo">
            <br>
            <span>~{{language.homePage.whenEmpty}}~</span>
        </div>
        <div v-else
             style="margin-top:10px">
            <div class="search-body-center-item"
                 v-for="(item,index) in missionArray"
                 :key="index">
                <div class="search-body-center-item-title">
                    <span v-if="lang === 'ch'">{{item.clientName}}</span>
                    <span v-else>{{item.clientNameEN}}</span>
                </div>
                <div class="search-body-center-item-body">
                    <div v-if="item.backTime">
                        <div v-if="lang === 'en'"
                             class="completediv">
                            <img src="../../public/img/missionComplete.png"
                                 alt="complete">
                        </div>
                        <div v-else
                             class="completediv">
                            <img src="../../public/img/missionCompleteCH.png"
                                 alt="complete">
                        </div>
                    </div>
                    <div class="search-body-center-item-body-item">
                        <div class="search-body-center-item-body-item-left">
                            <span v-if="lang === 'ch'">任务类型:</span>
                            <span v-else>Types:</span>
                        </div>
                        <div class="search-body-center-item-body-item-right">
                            <span v-if="item.isIncreaseOrder === 'true'">加单</span>
                            <span v-else-if="item.isIncreaseOrder === 'false'">补单</span>
                            <span v-else>退单</span>
                        </div>
                    </div>
                    <div class="search-body-center-item-body-item">
                        <div class="search-body-center-item-body-item-left">
                            <span>{{language.searchPage.clientPhone}}</span>
                        </div>
                        <div class="search-body-center-item-body-item-right">
                            <span>{{item.clientPhone}}</span>
                        </div>
                    </div>
                    <div class="search-body-center-item-body-item">
                        <div class="search-body-center-item-body-item-left">
                            <span>{{language.searchPage.postCode}}</span>
                        </div>
                        <div class="search-body-center-item-body-item-right">
                            <span>{{item.clientPostcode}}</span>
                        </div>
                    </div>
                    <div class="search-body-center-item-body-item">
                        <div class="search-body-center-item-body-item-left">
                            <span v-if="lang === 'ch'">任务状态:</span>
                            <span v-else>State</span>
                        </div>
                        <div class="search-body-center-item-body-item-right">
                            <div v-if="lang === 'ch'">
                                <span v-if="item.dayMission_id">配送中</span>
                                <span v-else>等待中</span>
                            </div>
                            <div v-else>
                                <span v-if="item.dayMission_id">Shipping</span>
                                <span v-else>Waiting</span>
                            </div>
                        </div>
                    </div>
                    <div class="search-body-center-item-body-item">
                        <div class="search-body-center-item-body-item-left">
                            <span>{{language.searchPage.address}}</span>
                        </div>
                        <div class="search-body-center-item-body-item-right"
                             style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
                            <span>{{item.clientAddress}}</span>
                        </div>
                    </div>

                    <div v-if="!item.dayMission_id">
                        <transition name="custom-classes-transition"
                                    enter-active-class="animated slideInUp faster"
                                    leave-active-class="animated slideOutDown faster">
                            <div v-if="!isShowChoiseConfirmBox"
                                 style="margin-top: 5px;margin-bottom: 5px;display:flex;display:-webkit-flex">
                                <div class="search-body-center-button"
                                     @click="choiseMissionFromPool(item)">
                                    <span v-if="lang === 'ch'">选择任务</span>
                                    <span v-else>Choise</span>
                                </div>
                            </div>
                        </transition>
                        <transition name="custom-classes-transition"
                                    enter-active-class="animated slideInRight faster"
                                    leave-active-class="animated slideOutRight faster">
                            <div v-if="isShowChoiseConfirmBox"
                                 class="daycheckbox">
                                <!-- check box  -->
                                <input type="checkbox"
                                       :value="item"
                                       v-model="choiseMissionArray" />
                                <!-- check box  -->
                            </div>
                        </transition>
                    </div>
                    <div v-else>
                        <img src="../../public/img/shipping.gif" alt="shippingicon">
                    </div>

                </div>
            </div>
        </div>

        <div style="height:60px">
            <!-- 底部占位符 -->
        </div>
        <div v-if="isShowChoiseConfirmBox"
             style="height:60px">
            <!-- 额外的底部占位符 -->
        </div>
        <!-- choise confirm box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInUp faster"
                    leave-active-class="animated slideOutDown faster">
            <div v-if="isShowChoiseConfirmBox"
                 class="choiseconfirm-box">
                <div class="choiseconfirm-box-left">
                    <span>已选：</span>
                    <span>{{choiseMissionArray.length}}</span>
                    <span>个客户</span>
                </div>
                <div class="choiseconfirm-box-right">
                    <div class="search-body-center-button"
                         @click="cancelMethod">
                        <span v-if="lang === 'ch'">取消</span>
                        <span v-else>Cancel</span>
                    </div>
                    <div class="search-body-center-button"
                         style="margin-left:10px"
                         @click="startDayShiftMission()">
                        <span v-if="lang === 'ch'">开始</span>
                        <span v-else>Start</span>
                    </div>
                </div>

            </div>
        </transition>
        <!-- choise confirm box end -->

        <!-- confirm start box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowConfirmStartBox"
                 class="confirmstart-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowConfirmStartBox"
                 class="confirmstart-front"
                 @click.self.prevent="isShowConfirmStartBox = false">
                <div class="confirmstart-box">
                    <div class="confirmstart-box-title">
                        <span v-if="lang === 'ch'">确认客户</span>
                        <span v-else>Confirm Client</span>
                    </div>
                    <div class="confirmstart-box-body">
                        <div class="confirmstart-box-body-screen">
                            <div class="confirmstart-box-body-item"
                                 v-for="(item,index) in choiseMissionArray"
                                 :key="index">
                                <div class="confirmstart-box-body-item-left">
                                    {{index + 1}}
                                </div>
                                <div class="confirmstart-box-body-item-right">
                                    <span v-if="lang === 'ch'">{{item.clientName}}</span>
                                    <span v-else>{{item.clientNameEN}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="confirmstart-box-bottom">
                        <div class="search-body-center-button"
                             @click="isShowConfirmStartBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>Cancel</span>
                        </div>
                        <div class="search-body-center-button"
                             style="margin-left:10px"
                             @click="saveMission()">
                            <span v-if="lang === 'ch'">确认</span>
                            <span v-else>Confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm start box end -->

        <!-- first page notice start -->
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowFirstPageNotice"
                 class="first_notic_back">
                <div class="first_notic_back_close" @click="isShowFirstPageNotice = false">
                    <span>x</span>
                </div>
                <div class="first_notic_back_top">
                    <img src="../../public/img/handshake.png" alt="handshake"> 
                </div> 
                <div class="first_notic_back_center">
                    <div class="first_notic_back_center_frame" @click="isShowBigImageDialog = true">
                        <img :src="firstPageImage | imgurl" alt="notice_pic">
                    </div>
                </div>
                <div class="first_notic_back_bottom">
                    <div class="first_notic_back_bottom_frame">
                        <span>{{firstPageText}}</span>
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
                    <span>x</span>
                </div>
                <div class="bigimg_dialog_frame">
                    <img :src="firstPageImage | imgurl" alt="notice_pic">
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
        <!-- 操作提示 -->

    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";
import _ from "lodash";

export default {
    mounted() {
        this.drivername = localStorage.getItem("drivername");
        this.getMissionPool();
        this.findFirstPageNotice()
    },

    computed: {
        language() {
            return this.$store.getters.getLanguage;
        },
        lang() {
            return this.$store.state.lang;
        }
    },
    data() {
        return {
            drivername: null,
            missionArray: [],
            finishNumber: [],
            showError: false,
            errorInfo: "未知错误",
            showRemoveBox: false,
            radioPicked: null,
            otherText: null,
            missionInfo: null,
            needDoNum: 0,
            isShowChoiseConfirmBox: false,
            isShowConfirmStartBox: false,
            choiseMissionArray: [],
            isShowFirstPageNotice:false,
            isShowBigImageDialog:false
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
                            this.firstPageImage = doc.data.image
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
                            this.firstPageImage = doc.data.image
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

        saveMission() {
            let tempDate = new Date().toISOString();
            axios
                .post(config.server + "/dsdriver/create", {
                    driverName: this.drivername,
                    orderDate: tempDate,
                    clientArray: this.choiseMissionArray
                })
                .then(doc => {
                    console.log(doc);
                    if (doc.data.code === 0) {
                        this.isShowConfirmStartBox = false
                        this.getMissionPool();
                        if (this.lang === "ch") {
                            this.errorInfo = "建立任务成功";
                        } else {
                            this.errorInfo = "Create mission success";
                        }
                        this.showRemoveBox = false;
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }else{
                        if (this.lang === "ch") {
                            this.errorInfo = "建立任务错误";
                        } else {
                            this.errorInfo = "Catch an error while create mission";
                        }
                        this.showRemoveBox = false;
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                    if (this.lang === "ch") {
                        this.errorInfo = "客户端错误";
                    } else {
                        this.errorInfo = "web client error";
                    }
                    this.showRemoveBox = false;
                    setTimeout(() => {
                        this.showError = false;
                    }, 3000);
                });
        },

        startDayShiftMission() {
            this.isShowConfirmStartBox = true;
        },

        cancelMethod() {
            this.isShowChoiseConfirmBox = false;
            this.choiseMissionArray = [];
        },

        choiseMissionFromPool(client) {
            this.choiseMissionArray.push(client);
            this.isShowChoiseConfirmBox = true;
        },

        startMissionMethod(mission) {
            let goTime = new Date().toISOString();
            axios
                .post(config.server + "/dayShiftmission/start", {
                    _id: mission._id,
                    goTime: goTime
                })
                .then(doc => {
                    console.log(doc);
                    if (doc.data.code === 0) {
                        if (this.lang === "ch") {
                            this.errorInfo = "状态更新成功";
                        } else {
                            this.errorInfo = "state update success";
                        }
                        this.showRemoveBox = false;
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                        this.getMissionPool();
                    } else {
                        if (this.lang === "ch") {
                            this.errorInfo = "状态更新失败";
                        } else {
                            this.errorInfo = "state update failed";
                        }
                        this.showRemoveBox = false;
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getMissionPool() {
            let b = new Date().toISOString();
            console.log(b)
            this.needDoNum = 0;
            this.$store.dispatch("setDoNum", this.needDoNum);
            axios
                .post(config.server + "/dayShiftmission/find", {
                    driverName: this.drivername,
                    orderDate: b
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.missionArray = doc.data.doc;
                        this.missionArray = _.orderBy(
                            this.missionArray,
                            ["backTime"],
                            ["desc"]
                        );
                        this.missionArray.forEach(elementX => {
                            if (!elementX.backTime) {
                                this.needDoNum += 1;
                            }
                        });
                        this.$store.dispatch("setDoNum", this.needDoNum);
                    } else if (doc.data.code === 1) {
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "未找该日任务";
                        } else {
                            this.errorInfo = "Mission not found in today";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    } else {
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "未找到白班任务";
                        } else {
                            this.errorInfo = "Mission not found";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
.search-title {
    height: 40px;
    background: #d74342;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 24;
}

.search-title span {
    color: #fff;
    font-size: 18px;
    line-height: 40px;
}

.search-body-center-item {
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin-bottom: 10px;
    overflow: hidden;
}

.search-body-center-item-title {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 16px;
}

.search-body-center-item-body {
    padding-bottom: 5px;
    height: 168px;
    position: relative;
}

.search-body-center-item-body-item {
    display: flex;
    display: -webkit-flex;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
}

.search-body-center-item-body-item-left {
    flex-basis: 30%;
    text-align: right;
}

.search-body-center-item-body-item-right {
    flex-basis: 70%;
    text-align: left;
}

.search-body-center-button {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 80px;
    margin: 0 auto;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
    transition: 0.2s;
}

.search-body-center-button:active {
    box-shadow: none;
    transition: 0.2s;
}

.removebox-back {
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.removebox-front {
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

.removebox-box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
}

.removebox-box-top {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.removebox-box-body {
    font-size: 16px;
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

.removebox-box-footer {
    display: flex;
    display: -webkit-flex;
    margin: 10px;
}

.removebox-body-center-button {
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

.removebox-body-center-button:active {
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

.completediv {
    position: absolute;
    top: 5px;
    right: 5px;
}

.completediv img {
    width: 150px;
    transform: rotate(14deg);
    -ms-transform: rotate(14deg); /* IE 9 */
    -moz-transform: rotate(14deg); /* Firefox */
    -webkit-transform: rotate(14deg); /* Safari 和 Chrome */
    -o-transform: rotate(14deg);
}

.choiseconfirm-box {
    border: 1px solid #e6e6e6;
    margin-left: 20px;
    margin-right: 20px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 64px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    background: #fff;
}

.choiseconfirm-box-left {
    line-height: 40px;
    font-size: 16px;
}

.choiseconfirm-box-right {
    display: flex;
    display: -webkit-flex;
    margin-left: 20px;
    padding: 5px 0;
}

.daycheckbox {
    position: absolute;
    bottom: 2px;
    right: 8px;
}

.daycheckbox input {
    height: 30px;
    width: 30px;
}

.confirmstart-back {
    position: fixed;
    z-index: 23;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.confirmstart-front {
    position: fixed;
    z-index: 24;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.confirmstart-box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
}

.confirmstart-box-title {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.confirmstart-box-body {
    margin-top: 10px;
}

.confirmstart-box-body-screen {
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 300px;
    overflow: auto;
}

.confirmstart-box-body-item {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
}

.confirmstart-box-body-item-left {
    width: 20px;
    margin-left: 10px;
    text-align: right;
}

.confirmstart-box-body-item-right {
    width: 200px;
    margin-left: 20px;
    text-align: left;
}

.confirmstart-box-bottom {
    display: flex;
    display: -webkit-flex;
    margin-top: 10px;
    margin-bottom: 10px;
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
    width: 30px;
    height: 30px;
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
</style>
