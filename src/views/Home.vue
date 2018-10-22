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
                    <div :class="choiceDayClassA" style="border-top-left-radius: 20px;border-bottom-left-radius: 20px;" @click="choiceDayMethod('yesterday')">昨天</div>
                    <div :class="choiceDayClassB" style="margin:0 3px" @click="choiceDayMethod('today')">今天</div>
                    <div :class="choiceDayClassC" style="border-top-right-radius: 20px;border-bottom-right-radius: 20px;" @click="choiceDayMethod('tomorrow')">明天</div>
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
                        <div @click="opendetail(item)">
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
            choiceDayClassC: 'choiceday'
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
        getChoiceDayMethod(){
            if (this.choiseDay === 'today') {
                this.choiceDayClassA = 'choiceday'
                this.choiceDayClassB = 'bechoiceday'
                this.choiceDayClassC = 'choiceday'
            }else if(this.choiseDay === 'yesterday'){
                this.choiceDayClassA = 'bechoiceday'
                this.choiceDayClassB = 'choiceday'
                this.choiceDayClassC = 'choiceday'
            }else{
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

            }else if(item === 'yesterday'){
                this.choiceDayClassA = 'bechoiceday'
                this.choiceDayClassB = 'choiceday'
                this.choiceDayClassC = 'choiceday'
                this.$store.dispatch('setChoiseDay', 'yesterday')
                this.getDriverMission()
            }else{
                this.choiceDayClassA = 'choiceday'
                this.choiceDayClassB = 'choiceday'
                this.choiceDayClassC = 'bechoiceday'
                this.$store.dispatch('setChoiseDay', 'tomorrow')
                this.getDriverMission()
            }
        },
        opendetail(item) {
            item.missionclient = _.orderBy(
                item.missionclient,
                ['finishdate'],
                ['desc']
            )
            this.$store.dispatch('setTempArr', item)
            this.$router.push('/detailpage')
        },

        loadDefault(e) {
            e.currentTarget.src = this.imgDefault
        },

        getDriverMission() {
            this.needDoNum = 0
            this.$store.dispatch('setDoNum', this.needDoNum)
            let findDate
            if(this.choiseDay === 'today'){
                findDate = new Date().toLocaleDateString()
                findDate = new Date(findDate).getTime()
            }else if(this.choiseDay === 'yesterday'){
                findDate = new Date().toLocaleDateString()
                findDate = new Date(findDate).getTime() - 86400000
            }else {
                findDate = new Date().toLocaleDateString()
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
</style>
