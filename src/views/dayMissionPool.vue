<template>
    <div id="daypoolpage">
        <div class="page-title">
            <div class="page-title-left"></div>
            <div class="page-title-center">
                <span v-if="lang === 'ch'">白班任务池</span>
                <span v-else>Day Shift Mission Pool</span>
            </div>
            <div class="page-title-right" @click="openOrCloseDateBoxMethod">
                <div class="dateicon"></div>
            </div>
        </div>

        <div class="emptyArea">
            <!-- 顶部占位符 -->
        </div>
        
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInDown faster"
                    leave-active-class="animated slideOutUp faster">
            <div v-if="isShowDateBox" class="page-title-datebox">
                <md-datepicker v-model="selectedDate" :md-open-on-focus="false" md-immediately style="width:300px;margin:0 auto">
                    <label style="text-align:center">{{language.historyPage.selectDate}}</label>
                </md-datepicker>
            </div>
        </transition>
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
                            <span>{{language.searchPage.address}}</span>
                        </div>
                        <div class="search-body-center-item-body-item-right">
                            <span>{{item.clientAddress}}</span>
                        </div>
                    </div>
                    <div>
                        <div style="margin-top: 5px;margin-bottom: 5px;display:flex;display:-webkit-flex">
                            <div class="search-body-center-button"
                                 style="background:#d74342;color:#fff"
                                 @click="removeMission(item)">
                                <span>{{language.dayShiftHome.removeMission}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:60px">
            <!-- 顶部占位符 -->
        </div>

        <!-- 删除提示 start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showRemoveBox"
                 class="removebox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showRemoveBox"
                 class="removebox-front"
                 @click.self.prevent="showRemoveBox = false">
                <div class="removebox-box">
                    <div class="removebox-box-top">
                        <span v-if="lang === 'ch'">删除任务</span>
                        <span v-else>Remove Mission</span>
                    </div>
                    <div class="removebox-box-body">
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
                                       id="radio2"
                                       value="送货取消"
                                       v-model="radioPicked">
                            </div>
                            <div style="padding-left:10px">
                                <label v-if="lang === 'ch'"
                                       for="radio2">送货取消</label>
                                <label v-else
                                       for="radio2">chancelled</label>
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
                    <div class="removebox-box-footer">
                        <div class="removebox-body-center-button"
                             style="width: 80px;margin-right:10px"
                             @click="showRemoveBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="removebox-body-center-button"
                             style="width: 80px;"
                             @click="removeMissionMtehod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 删除提示 end-->

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

export default {
    name: 'daypoolpage',
    watch: {
        selectedDate: function() {
            this.getMissionPool();
        }
    },
    mounted() {
        this.drivername = localStorage.getItem("drivername");
        this.getMissionPool();
    },
    computed: {
        language() {
            return this.$store.getters.getLanguage;
        },
        lang() {
            return this.$store.state.lang
        },
    },
    data() {
        return {
            missionArray:[],
            isShowDateBox:false,
            selectedDate:new Date(),
            showError:false,
            errorInfo:'未知错误',
            missionInfo:null,
            showRemoveBox:false,
            radioPicked: null,
            otherText: null,
        }
    },
    methods:{
        removeMissionMtehod() {
            if (this.radioPicked === null) {
                this.showError = true;
                if (this.lang === "ch") {
                    this.errorInfo = "请选择删除原因";
                } else {
                    this.errorInfo = "Choise reason";
                }
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            } else {
                let tempDate;
                if (this.radioPicked === "other") {
                    tempDate = {
                        _id: this.missionInfo._id,
                        removeReason: this.otherText
                    };
                } else {
                    tempDate = {
                        _id: this.missionInfo._id,
                        removeReason: this.radioPicked
                    };
                }
                axios
                    .post(config.server + "/dayShiftmission/remove", tempDate)
                    .then(doc => {
                        if (doc.data.code === 0) {
                            this.showError = true;
                            if (this.lang === "ch") {
                                this.errorInfo = "删除成功";
                            } else {
                                this.errorInfo = "Remove success";
                            }
                            this.showRemoveBox = false;
                            this.getMissionPool();
                            setTimeout(() => {
                                this.showError = false;
                            }, 3000);
                        } else {
                            this.showError = true;
                            if (this.lang === "ch") {
                                this.errorInfo = "删除失败";
                            } else {
                                this.errorInfo = "Remove fail";
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
            }
        },

        removeMission(mission) {
            this.showRemoveBox = true;
            this.missionInfo = mission;
        },
        openOrCloseDateBoxMethod(){
            this.isShowDateBox = !this.isShowDateBox
        },
        
        getMissionPool() {
            console.log(this.selectedDate)
            let b = new Date(this.selectedDate).toISOString();
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
                    }else if(doc.data.code === 1){
                        this.missionArray = []
                        if (this.lang === "ch") {
                                this.errorInfo = "未找到该日任务";
                            } else {
                                this.errorInfo = "Mission not found in this day";
                            }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    } else {
                        this.showError = true;
                        if (this.lang === "ch") {
                                this.errorInfo = "出现错误";
                            } else {
                                this.errorInfo = "carch some error";
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
}
</script>

<style scoped>
.page-title{
    font-size: 18px;
    background: #d74342;
    color: #fff;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    z-index: 24;
}

.page-title-left {
    flex-basis: 10%;
}

.page-title-center {
    flex-basis: 80%;
}

.page-title-right {
    flex-basis: 10%;
}

.emptyArea{
    height: 40px;
}

.page-title-datebox{
    border: 1px solid #e6e6e6;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 23;
}

.dateicon {
    background: #fff;
    mask-image: url(../../public/icons/baseline-date_range-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-date_range-24px.svg);
    width: 32px;
    height: 32px;
    margin-top: 4px;
    
}

.search-body-center-item {
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin-bottom: 10px;
}

.search-body-center-item-title {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 16px;
}

.search-body-center-item-body {
    padding-bottom: 5px;
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

</style>

