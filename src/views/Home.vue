<template>
    <div id="homepage">
        <div style="position:fixed;top:-20px;width:100%;height:70px;background-color:#fff;z-index:9"></div>
        <div>
            <div class="topusername" style="box-shadow: 0px 1px 5px;">
                <div class="topusername-left"></div>
                <div class="topusername-center">
                    <span>{{drivername}}</span>
                </div>
                <div class="topusername-right" @click="refresh">
                    <img src="../../public/icons/refresh.png" alt="refresh" id="arrow">
                </div>
            </div>
            <div class="emptyarea-top">
                <!-- 顶部占位符 -->
            </div>
            <div>
                <div style="display:flex;display:-webkit-flex;justify-content:center">
                    <div :class="choiceDayClassA" style="border-top-left-radius: 20px;border-bottom-left-radius: 20px;" @click="choiceDayMethod('yesterday')">{{language.homePage.yesterday}}</div>
                    <div :class="choiceDayClassB" style="margin:0 3px" @click="choiceDayMethod('today')">{{language.homePage.today}}</div>
                    <div :class="choiceDayClassC" style="border-top-right-radius: 20px;border-bottom-right-radius: 20px;" @click="choiceDayMethod('tomorrow')">{{language.homePage.tomorrow}}</div>
                </div>
            </div>
            <div v-if="allMission.length == 0" style="padding-top:100px">
                <img src="../../public/img/ebuyLogo.png" alt="logo" style="width:200px">
                <br>
                <span>~{{language.homePage.whenEmpty}}~</span>
            </div>
            <div v-else>
                <md-card md-with-hover style="width:80%;margin:10px auto;" v-for="(item,index) in allMission" :key="index">
                    <md-ripple>
                        <div @click="opendetail(item,index)">
                            <div class="card-text" style="padding:10px 0 10px 30px;border-bottom: 1px solid #eee;">
                                <div>
                                    <span style="font-size:20px">{{item.missionline}}</span>
                                </div>
                            </div>

                            <div class="card-text" style="padding:10px 0 10px 30px">
                                <div>
                                    <span style="font-size:16px;color: #989898">{{language.homePage.amountOfUsers}}</span>
                                </div>
                            </div>

                            <div class="card-text" style="padding:5px 20px 5px 40px">
                                <div class="card-text-left">
                                    <div class="allclientnumicon"></div>
                                </div>
                                <div class="card-text-right" style="padding-left:50px">
                                    <span style="font-size:16px">{{language.homePage.amountBefore}} {{item.missionclient.length}} {{language.homePage.amountAfter}}</span>
                                </div>
                            </div>

                            <div class="card-text" style="padding:10px 0 10px 30px">
                                <div>
                                    <span style="font-size:16px;color: #989898">{{language.homePage.amountOfFinish}}</span>
                                </div>
                            </div>

                            <div class="card-text" style="padding:5px 20px 5px 40px">
                                <div class="card-text-left">
                                    <div class="assignmenticon"></div>
                                </div>
                                <div class="card-text-right" style="padding-left:50px">
                                    <span style="font-size:16px">{{language.homePage.amountBefore}} {{finishNumber[index]}} {{language.homePage.amountAfter}}</span>
                                </div>
                            </div>

                            <div class="card-text" style="padding:20px 0 10px 30px">
                                <div>
                                    <span style="font-size:16px;color: #989898">{{language.homePage.orderTime}}</span>
                                </div>
                            </div>

                            <div class="card-text" style="padding:5px 20px 20px 40px">
                                <div class="card-text-left">
                                    <div class="date_rangeicon"></div>
                                </div>
                                <div class="card-text-right" style="padding-left:50px">
                                    <span style="font-size:16px">{{item.missiondate | dateFilter}}</span>
                                </div>
                            </div>

                            <div style="display: -webkit-flex;display: flex;-webkit-flex-flow: row;flex-flow: row;padding: 0 0 10px 0;justify-content: center;">
                                <div v-for="(x,n) in item.missionclient" :key="n" style="overflow:hidden;width:50px;height:50px;margin: 0 5px;box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);" v-if="n < 5">
                                    <img :src="x.image | imgurl" alt="x.clientbname" style="height:100%;width:100%;object-fit:contain" v-on:error.once="loadDefault($event)">
                                </div>
                            </div>
                            <div class="card-text" style="padding:10px 0;border-top:1px solid #eee">
                                <div style="margin:0 auto;color:#707070;font-size:20px">
                                    <span>>>></span>
                                    <span> {{language.homePage.clickForDetails}} </span>
                                    <span>>>></span>
                                </div>
                            </div>
                        </div>

                    </md-ripple>
                </md-card>
            </div>

            <div class="emptyarea-bottom">
                <!-- 底部占位符 -->
            </div>
        </div>

        <!-- check car box start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="showCheckCarBox" class="checkcar-back"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="showCheckCarBox" class="checkcar-front" @click.self.prevent="showCheckCarBox = false">
                <div class="checkcar-body">
                    <div class="checkcar-body-top">
                        <span>{{language.homePage.checkCarTitle}}</span>
                    </div>
                    <div class="checkcar-body-center">
                        <div class="checkcar-body-center-title">
                            <span>{{carNum}}</span>
                        </div>
                        <div v-if="checkPage" class="checkcar-body-center-page">
                            <div class="checkcar-body-center-item">
                                <label for="checkwiper" class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.wiper}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkwiper" v-model="wiper" style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="wiper" style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <label for="checkheadlight" class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.headlight}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkheadlight" v-model="headlight" style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="headlight" style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <label for="checkmirror" class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.mirror}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkmirror" v-model="mirror" style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="mirror" style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <label for="checktyre" class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.tyre}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checktyre" v-model="tyre" style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="tyre" style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <label for="checkbackup" class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.backup}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkbackup" v-model="backup" style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="backup" style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <label for="checkbrake" class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.brake}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkbrake" v-model="brake" style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="brake" style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <div class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.box}}</span>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <input type="number" style="width:160%;margin-left:11px;" v-model="boxNum">
                                </div>
                            </div>
                        </div>
                        <div v-else class="checkcar-body-center-page">
                            <div class="checkcar-body-center-item">
                                <label for="checkbrake" class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.otherOk}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkbrake" v-model="otherError" style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="otherError" style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div>
                                <textarea name="othererror" id="othererror" rows="5" style="width:100%" :disabled="otherError" :placeholder="language.homePage.description" v-model="otherErrorText"></textarea>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised" style="margin:0;width:100%;box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);" @click="changeOtherCheckPage">
                            {{language.homePage.other}}
                        </md-button>
                    </div>
                    <div>
                        <md-button class="md-raised" style="margin:0;width:100%;box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);" @click="confirmCheckCar">
                            {{language.homePage.confirmCheck}}
                        </md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- check car box end -->

        <!-- check again box start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="showCheckAgainBox" class="checkcar-back"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="showCheckAgainBox" class="checkcar-front" @click.self.prevent="showCheckAgainBox = false">
                <div class="checkcar-body">
                    <div class="checkcar-body-top">
                        <span>车辆检查</span>
                    </div>
                    <div class="checkcar-body-center">
                        <div class="checkcar-body-center-title">
                            <span>{{carNum}}</span>
                        </div>
                        <div class="checkcar-body-center-item">
                            <label for="checkwiper" class="checkcar-body-center-item-left">
                                <span>内干净</span>
                            </label>
                            <div class="checkcar-body-center-item-middle">
                                <md-checkbox id="checkwiper" v-model="clean" style="margin:0"></md-checkbox>
                            </div>
                            <div class="checkcar-body-center-item-right">
                                <span v-if="wiper" style="color:green">是</span>
                                <span v-else style="color:#c3c304">否</span>
                            </div>
                        </div>
                        <div class="checkcar-body-center-item">
                            <div class="checkcar-body-center-item-left">
                                <span>框(数量)</span>
                            </div>
                            <div class="checkcar-body-center-item-right">
                                <input type="number" style="width:160%;margin-left:10px;" v-model="boxNumAgain">
                            </div>
                        </div>

                    </div>
                    <div>
                        <md-button class="md-raised" style="margin:0;width:100%;box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);" @click="confirmCheckAgain">
                            {{language.homePage.confirmCheck}}
                        </md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- check again box end -->

        <!-- 操作提示 -->
        <transition name="custom-classes-transition" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
            <div class="errinfo" v-if="showError">
                <span>{{errorInfo}}</span>
            </div>
        </transition>
        <!-- 操作提示 -->

    </div>
</template>

<script>
import axios from 'axios'
import config from '../assets/js/config'
import lrz from 'lrz'
import _ from 'lodash'

export default {
    name: 'homepage',
    mounted() {
        this.drivername = localStorage.getItem('drivername')
        this.getChoiceDayMethod()
        this.getDriverMission()
    },
    data() {
        return {
            allMission: [],
            uploadDialog: false,
            drivername: '',
            dialogName: '',
            finishNumber: [],
            needDoNum: 0,
            imgDefault: '/img/ebuyLogo.png',
            choiceDayClassA: 'choiceday',
            choiceDayClassB: 'bechoiceday',
            choiceDayClassC: 'choiceday',
            showCheckCarBox: false,
            wiper: true,
            headlight: true,
            mirror: true,
            tyre: true,
            backup: true,
            brake: true,
            otherError: true,
            carNum: null,
            checkPage: true,
            otherErrorText: null,
            boxNum: null,
            errorInfo: '',
            showError: false,
            showCheckAgainBox: false,
            boxNumAgain: null,
            carCheck_id:null,
            clean:true
        }
    },
    computed: {
        language() {
            return this.$store.getters.getLanguage
        },
        choiseDay() {
            return this.$store.state.choiseDay
        }
    },
    methods: {
        confirmCheckAgain() {
            this.carCheck_id
            axios
                .post(config.server + '/checkcar/edit', {
                    carCheck_id:this.carCheck_id,
                    boxNumAgain:this.boxNumAgain,
                    mission_id: this.$store.state.tempArr._id,
                    clean:this.clean
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.$router.push('/detailpage')
                    } else {
                        console.log(doc)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        changeOtherCheckPage() {
            this.checkPage = !this.checkPage
        },
        confirmCheckCar() {
            if (!this.boxNum) {
                this.showError = true
                this.errorInfo = '请输入框的数量'
                setTimeout(() => {
                    this.showError = false
                }, 2000)
            } else {
                let tempData = {
                    driver: this.drivername,
                    mission_id: this.$store.state.tempArr._id,
                    car_id: this.$store.state.tempArr.Car_id,
                    wiper: this.wiper,
                    headlight: this.headlight,
                    mirror: this.mirror,
                    tyre: this.tyre,
                    backup: this.backup,
                    brake: this.brake,
                    boxNum: this.boxNum
                }
                let errData = {}
                if (!this.otherError) {
                    this.$set(tempData, 'text', this.otherErrorText)
                }
                if (
                    !this.wiper ||
                    !this.headlight ||
                    !this.mirror ||
                    !this.tyre ||
                    !this.backup ||
                    !this.brake ||
                    !this.otherError
                ) {
                    console.log('enter long if')
                    this.$set(tempData, 'finish', false)
                    this.$set(errData, 'car_id', tempData.car_id) //车辆_id
                    this.$set(errData, 'driver', this.drivername) //司机
                    if (!this.wiper) {
                        this.$set(errData, 'wiper', 1)
                    }
                    if (!this.headlight) {
                        this.$set(errData, 'headlight', 1)
                    }
                    if (!this.mirror) {
                        this.$set(errData, 'mirror', 1)
                    }
                    if (!this.tyre) {
                        this.$set(errData, 'tyre', 1)
                    }
                    if (!this.backup) {
                        this.$set(errData, 'backup', 1)
                    }
                    if (!this.brake) {
                        this.$set(errData, 'brake', 1)
                    }
                    if (!this.otherError) {
                        this.$set(errData, 'other', 1)
                        this.$set(errData, 'note', this.otherErrorText)
                    }
                    axios
                        .post(config.server + '/fixcar/', errData)
                        .then(doc => {
                            console.log('fix car done')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                this.showCheckCarBox = false
                axios
                    .post(config.server + '/checkcar/', tempData)
                    .then(doc => {
                        if (doc.data.code === 0) {
                            this.$router.push('/detailpage')
                        } else {
                            console.log(doc)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        getChoiceDayMethod() {
            if (this.choiseDay === 'today') {
                this.choiceDayClassA = 'choiceday'
                this.choiceDayClassB = 'bechoiceday'
                this.choiceDayClassC = 'choiceday'
            } else if (this.choiseDay === 'yesterday') {
                this.choiceDayClassA = 'bechoiceday'
                this.choiceDayClassB = 'choiceday'
                this.choiceDayClassC = 'choiceday'
            } else {
                this.choiceDayClassA = 'choiceday'
                this.choiceDayClassB = 'choiceday'
                this.choiceDayClassC = 'bechoiceday'
            }
        },
        choiceDayMethod(item) {
            if (item === 'today') {
                this.choiceDayClassA = 'choiceday'
                this.choiceDayClassB = 'bechoiceday'
                this.choiceDayClassC = 'choiceday'
                this.$store.dispatch('setChoiseDay', 'today')
                this.getDriverMission()
            } else if (item === 'yesterday') {
                this.choiceDayClassA = 'bechoiceday'
                this.choiceDayClassB = 'choiceday'
                this.choiceDayClassC = 'choiceday'
                this.$store.dispatch('setChoiseDay', 'yesterday')
                this.getDriverMission()
            } else {
                this.choiceDayClassA = 'choiceday'
                this.choiceDayClassB = 'choiceday'
                this.choiceDayClassC = 'bechoiceday'
                this.$store.dispatch('setChoiseDay', 'tomorrow')
                this.getDriverMission()
            }
        },
        opendetail(item, index) {
            this.carCheck_id = item.carCheck_id
            item.missionclient = _.orderBy(
                item.missionclient,
                ['finishdate'],
                ['desc']
            )
            this.$store.dispatch('setTempArr', item)
            this.carNum = item.missioncar
            if (!item.carCheckFirst) {
                this.showCheckCarBox = true
            } else if (item.missionclient.length == this.finishNumber[index] && !item.carCheckFinish) {
                this.showCheckAgainBox = true
            } else {
                this.$router.push('/detailpage')
                this.$store.dispatch('setShowButtom', false)
            }
        },

        loadDefault(e) {
            e.currentTarget.src = this.imgDefault
        },

        getDriverMission() {
            this.needDoNum = 0
            this.$store.dispatch('setDoNum', this.needDoNum)
            let findDate
            if (this.choiseDay === 'today') {
                findDate = new Date()
                findDate.setHours(0, 0, 0, 0)
                findDate = new Date(findDate).getTime()
            } else if (this.choiseDay === 'yesterday') {
                findDate = new Date()
                findDate.setHours(0, 0, 0, 0)
                findDate = new Date(findDate).getTime() - 86400000
            } else {
                findDate = new Date()
                findDate.setHours(0, 0, 0, 0)
                findDate = new Date(findDate).getTime() + 86400000
            }
            axios
                .post(config.server + '/client-driver/', {
                    startdate: findDate,
                    drivername: this.drivername
                })
                .then(doc => {
                    this.allMission = doc.data.doc
                    // 计算完成
                    let startNum = -1
                    let countNum = 0
                    this.allMission.forEach(elementX => {
                        startNum += 1
                        elementX.missionclient.forEach(elementY => {
                            if (elementY.finishdate) {
                                countNum += 1
                            } else {
                                this.needDoNum += 1
                            }
                        })
                        this.finishNumber[startNum] = countNum
                        countNum = 0
                    })
                    this.$store.dispatch('setDoNum', this.needDoNum)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        refresh() {
            let arrow = document.querySelector('#arrow')
            arrow.style.transform = 'rotate(360deg)'
            arrow.style.transition = '0.5s'
            setTimeout(() => {
                arrow.style.transform = 'rotate(0deg)'
                arrow.style.transition = '0.5s'
            }, 300)
            this.getDriverMission()
        }
    }
}
</script>

<style scoped>
.emptyarea-top {
    padding: 30px 0;
}

.emptyarea-bottom {
    padding: 30px 0;
}

.topusername {
    background-color: #d74342;
    padding: 10px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    word-wrap: break-word;
    position: fixed;
    z-index: 9;
    width: 100%;
    top: 0;
}

.topusername-left {
    flex-basis: 20%;
    margin: 0 auto;
}

.topusername-center {
    color: #fff;
    font-size: 20px;
    flex-basis: 50%;
    margin: 0 auto;
}

.topusername-center span {
    line-height: 30px;
}

.topusername-right {
    flex-basis: 20%;
    margin: 0 auto;
}

.topusername-right img {
    width: 25px;
}

.card-text {
    text-align: left;
    padding: 5px 20px;
    font-size: 20px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    word-wrap: break-word;
}

.card-text-left {
    flex-basis: 40%;
}

.card-text-right {
    flex-basis: 60%;
    min-width: 160px;
}

.card-camera {
    text-align: right;
    position: absolute;
    top: 150px;
    right: 13px;
}

.allclientnumicon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-assignment_late-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-assignment_late-24px.svg);
    width: 24px;
    height: 24px;
}

.assignmenticon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-assignment_turned_in-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-assignment_turned_in-24px.svg);
    width: 24px;
    height: 24px;
}

.date_rangeicon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-date_range-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-date_range-24px.svg);
    width: 24px;
    height: 24px;
}

.choiceday {
    font-size: 16px;
    /* border:1px solid rgba(0,0,0,0.2); */
    width: 80px;
    height: 25px;
    line-height: 24px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.bechoiceday {
    font-size: 16px;
    background-color: #d74342;
    width: 80px;
    height: 25px;
    line-height: 24px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
}

.checkcar-back {
    position: fixed;
    z-index: 23;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.checkcar-front {
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

.checkcar-body {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    width: 180px;
}

.checkcar-body-top {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.checkcar-body-center {
    padding: 8px 12px;
}

.checkcar-body-center-title {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    font-size: 16px;
}

.checkcar-body-center-item {
    display: flex;
    display: -webkit-flex;
    height: 40px;
    line-height: 40px;
}

.checkcar-body-center-item-left {
    flex-basis: 50%;
    text-align: right;
    line-height: 34px;
    padding-right: 8px;
}

.checkcar-body-center-item-middle {
    padding-left: 16px;
    flex-basis: 25%;
}

.checkcar-body-center-item-right {
    padding-left: 8px;
    flex-basis: 25%;
    line-height: 34px;
}

.errinfo {
    position: fixed;
    z-index: 19;
    top: 8px;
    background-color: rgba(255, 255, 0, 0.6);
    width: 100%;
}

.errinfo span {
    font-size: 16px;
    line-height: 32px;
}
</style>
