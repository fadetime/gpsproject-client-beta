<template>
    <div id="checkerpage">
        <div class="check-top">
            <span>车辆检查</span>
        </div>
        <div style="height:40px">
            <!-- 顶部占位符 -->
        </div>
        <div v-if="checkMissionArray.length === 0"
             class="check-body-empty">
            <div class="checkbody-empty-box"
                 @click="isShowCheckBox = true">
                <div class="check-icon"
                     style="margin:10px 0"></div>
                <div style="padding:5px 0">
                    <span style="color:#6a6a6a">检查任务</span>
                </div>
            </div>
        </div>
        <div v-else
             class="check-body">
            <div v-for="(item,index) in checkMissionArray"
                 :key="index"
                 class="check-body-box"
                 @click="openMissionBoxMethod(item)">
                <div class="check-body-box-top"></div>
                <div class="check-body-box-center">
                    <div class="check-body-box-center-left">
                        <em>{{index + 1}}</em>
                    </div>
                    <div class="check-body-box-center-center">
                        {{item.carPlate}}
                    </div>
                    <div v-if="item.checkDate" class="check-body-box-center-right">
                        <div class="baseline-check"></div>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:60px">
            <!-- 底部占位符 -->
        </div>
        <!-- mission box start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowCheckBox"
                 class="checkbox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowCheckBox"
                 class="checkbox-front"
                 @click.self.prevent="isShowCheckBox = false">
                <div class="checkbox-box">
                    <div class="checkbox-box-top">
                        <span v-if="lang === 'ch'">创建任务</span>
                        <span v-else>Create mission</span>
                    </div>
                    <div class="checkbox-box-body">
                        <div class="checkbox-box-body-top"
                             style="width:175px">
                            <div class="checkbox-box-body-top-title">
                                <div>
                                    <span>当前日期</span>
                                </div>
                            </div>
                            <span>{{billDate | dateFilter}}</span>
                        </div>
                    </div>
                    <div class="checkbox-box-bottom">
                        <div class="checkbox-body-center-button"
                             style="width: 80px;margin-right:10px"
                             @click="isShowCheckBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="checkbox-body-center-button"
                             style="width: 80px;"
                             @click="createCheckMtehod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>

            </div>
        </transition>
        <!-- mission box end -->

        <!-- mission check box start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowMissionBox"
                 class="checkbox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowMissionBox"
                 class="checkbox-front"
                 @click.self.prevent="isShowMissionBox = false">
                <div class="checkbox-box">
                    <div class="checkbox-box-top">
                        <span>{{tempData.carPlate}}</span>
                    </div>
                    <div class="checkbox-box-body">
                        <div class="checkbox-box-body-top"
                             style="width:175px">
                            <div class="checkbox-box-body-top-title">
                                <div>
                                    <span>状态检查</span>
                                </div>
                            </div>
                            <div>
                                <div class="checkboxbox-body-item">
                                    <div v-if="tempData.brakeLight"
                                         style="font-size:14px"
                                         @click="checkButtonMethod('brake')">
                                        <div class="brakeLights-icon"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">刹车灯</div>
                                        <div v-else
                                             class="greentext">Brake Light</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px"
                                         @click="checkButtonMethod('brake')">
                                        <div class="brakeLights-icon-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">刹车灯</div>
                                        <div v-else
                                             class="redtext">Brake Light</div>
                                    </div>
                                    <div v-if="tempData.headlight"
                                         style="font-size:14px"
                                         @click="checkButtonMethod('light')">
                                        <div class="light-icon"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">前大灯</div>
                                        <div v-else
                                             class="greentext">Front Light</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px"
                                         @click="checkButtonMethod('light')">
                                        <div class="light-icon-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">前大灯</div>
                                        <div v-else
                                             class="redtext">Front Light</div>
                                    </div>
                                </div>
                                <div class="checkboxbox-body-item">
                                    <div v-if="tempData.tyre"
                                         style="font-size:14px"
                                         @click="checkButtonMethod('tyre')">
                                        <div class="tyre-icon"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">轮 胎</div>
                                        <div v-else
                                             class="greentext">Tyre</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px"
                                         @click="checkButtonMethod('tyre')">
                                        <div class="tyre-icon-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">轮 胎</div>
                                        <div v-else
                                             class="redtext">Tyre</div>
                                    </div>
                                    <div v-if="tempData.petrolCard"
                                         style="font-size:14px"
                                         @click="checkButtonMethod('petrolCard')">
                                        <div class="card-icon"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">油 卡</div>
                                        <div v-else
                                             class="greentext">Petrol Card</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px"
                                         @click="checkButtonMethod('petrolCard')">
                                        <div class="card-icon-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">油 卡</div>
                                        <div v-else
                                             class="redtext">Petrol Card</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="checkbox-box-body-top"
                             style="width:175px">
                            <div class="checkbox-box-body-top-title">
                                <div>
                                    <span>其他问题</span>
                                </div>
                            </div>
                            <div>
                                <input type="text" style="border: none;height: 30px;text-align:center" v-model="tempData.note">
                            </div>
                        </div>
                    </div>
                    <div class="checkbox-box-bottom">
                        <div class="checkbox-body-center-button"
                             style="width: 80px;margin-right:10px"
                             @click="isShowMissionBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="checkbox-body-center-button"
                             style="width: 80px;"
                             @click="comfirmCheckMtehod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- mission check box end -->

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
    data() {
        return {
            isShowCheckBox: false,
            isShowMissionBox: false,
            billDate: new Date(),
            driverName: null,
            errorInfo: "未知错误",
            showError: false,
            checkMissionArray: [],
            tempData: null,
            showOtherError:true,
            _id:null
        };
    },
    mounted() {
        this.driverName = localStorage.getItem("drivername");
        this.driver_id = localStorage.getItem("_id");
        this.findCheckWork();
    },
    computed: {
        lang() {
            return this.$store.state.lang;
        }
    },
    methods: {
        allFinishCheckMethod(){
            let time = new Date().toISOString()
            axios
                .post(config.server + "/checkworker/finish",{
                    _id:this._id,
                    finishDate:time
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "检查任务完成";
                        } else {
                            this.errorInfo = "Check Done";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }else{
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "检查提交失败";
                        } else {
                            this.errorInfo = "Update mission filed";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        comfirmCheckMtehod(){
            let time = new Date().toISOString()
            axios
                .post(config.server + "/checkworker/edit",{
                    _id:this._id,
                    data:this.tempData,
                    time:time
                })
                .then(doc => {
                    this.isShowMissionBox = false
                    if(doc.data.code === 0){
                        this.findCheckWork();
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "更新成功";
                        } else {
                            this.errorInfo = "update success";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }else{
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "更新出错";
                        } else {
                            this.errorInfo = "update filed";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        checkButtonMethod(item) {
            if (item === "brake") {
                this.tempData.brakeLight = !this.tempData.brakeLight;
            } else if (item === "light") {
                this.tempData.headlight = !this.tempData.headlight;
            } else if (item === "tyre") {
                this.tempData.tyre = !this.tempData.tyre;
            } else {
                this.tempData.petrolCard = !this.tempData.petrolCard;
            }
        },

        openMissionBoxMethod(item) {
            this.isShowMissionBox = true;
            this.tempData = item;
        },

        findCheckWork() {
            axios
                .get(config.server + "/checkworker/")
                .then(doc => {
                    if(doc.data.code === 0){
                        this.checkMissionArray = doc.data.doc.missionList;
                        this._id = doc.data.doc._id
                        let tempNum = 0
                        this.checkMissionArray.forEach(element => {
                            if(element.checkDate){
                                tempNum += 1
                            }
                        });
                        if(tempNum === this.checkMissionArray.length) {
                            this.checkMissionArray = []
                            this.allFinishCheckMethod()
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        createCheckMtehod() {
            let createDate = new Date().toISOString();
            axios
                .post(config.server + "/checkworker/create", {
                    createDate: createDate,
                    driverName: this.driverName,
                    driver_id: this.driver_id
                })
                .then(doc => {
                    this.isShowCheckBox = false;
                    if (doc.data.code === 0) {
                        this.findCheckWork();
                    } else {
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "创建错误出现错误";
                        } else {
                            this.errorInfo = "something error";
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
.check-top {
    background-color: #d74342;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.check-icon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-add_circle-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-add_circle-24px.svg);
    width: 42px;
    height: 42px;
}

.baseline-check {
    background: #2f9514;
    mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    width: 46px;
    height: 46px;
}

.brakeLights-icon {
    background: #2f9514;
    mask-image: url(../../public/icons/brakeLights.svg);
    -webkit-mask-image: url(../../public/icons/brakeLights.svg);
    width: 46px;
    height: 46px;
}

.brakeLights-icon-red{
    background: #d74342;
    mask-image: url(../../public/icons/brakeLights.svg);
    -webkit-mask-image: url(../../public/icons/brakeLights.svg);
    width: 46px;
    height: 46px;
}

.light-icon {
    background: #2f9514;
    mask-image: url(../../public/icons/light.svg);
    -webkit-mask-image: url(../../public/icons/light.svg);
    width: 46px;
    height: 46px;
}

.light-icon-red {
    background: #d74342;
    mask-image: url(../../public/icons/light.svg);
    -webkit-mask-image: url(../../public/icons/light.svg);
    width: 46px;
    height: 46px;
}
.tyre-icon {
    background: #2f9514;
    mask-image: url(../../public/icons/tyre.svg);
    -webkit-mask-image: url(../../public/icons/tyre.svg);
    width: 46px;
    height: 46px;
}

.tyre-icon-red {
    background: #d74342;
    mask-image: url(../../public/icons/tyre.svg);
    -webkit-mask-image: url(../../public/icons/tyre.svg);
    width: 46px;
    height: 46px;
}

.card-icon {
    background: #2f9514;
    mask-image: url(../../public/icons/card.svg);
    -webkit-mask-image: url(../../public/icons/card.svg);
    width: 46px;
    height: 46px;
}

.card-icon-red{
    background: #d74342;
    mask-image: url(../../public/icons/card.svg);
    -webkit-mask-image: url(../../public/icons/card.svg);
    width: 46px;
    height: 46px;
}

.check-body {
    font-size: 18px;
}

.check-body-box {
    width: 80%;
    margin: 10px auto 0 auto;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.check-body-box-top {
    margin: 0 auto;
    border-top: 1px solid #d74342;
    width: 90%;
}

.check-body-box-center {
    display: flex;
    display: -webkit-flex;
    padding: 10px 0;
}

.check-body-box-center-left {
    flex-basis: 20%;
    height: 46px;
    line-height: 46px;
    font-size: 32px;
    font-weight: bold;
    color: #6a6a6a;
}

.check-body-box-center-center {
    flex-basis: 60%;
    height: 46px;
    line-height: 46px;
}

.check-body-box-center-right {
    flex-basis: 20%;
}

.check-body-empty {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.checkbody-empty-box {
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

.checkbody-empty-box:active {
    box-shadow: none;
    transition: 0.2s;
}

.checkbox-back {
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.checkbox-front {
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

.checkbox-box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
}

.checkbox-box-top {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.checkbox-box-body {
    font-size: 16px;
    margin: 0 10px;
}

.checkbox-box-body-top {
    border: 1px solid #e0e0e0;
    margin-top: 20px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 10px 0;
    position: relative;
}

.checkbox-box-body-top-title {
    position: absolute;
    top: -16px;
    left: 0;
    right: 0;
}

.checkbox-box-body-top-title div {
    background: #fff;
    margin: 0 auto;
    width: 100px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
}

.checkbox-box-bottom {
    display: flex;
    display: -webkit-flex;
    margin: 10px;
}

.checkbox-body-center-button {
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

.checkbox-body-center-button:active {
    box-shadow: none;
    transition: 0.2s;
}

.checkboxbox-body-item {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    margin-top: 10px;
}

.greentext {
    color: #2f9514;
}

.redtext {
    color: #d74342;
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
</style>
