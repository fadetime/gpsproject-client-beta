<template>
    <div id="finish">
        <div class="swiper-container">
            <div class="swiper-wrapper" style="font-size:20px;color:#fff;line-height:50px">
                <div class="swiper-slide" v-for="(item,index) in allMission" :key="index">
                    <md-card style="width:100%;margin:0 auto;background-color:#d74342">
                        <div>
                            <span style="color:#fff">{{item.missionline}}</span>
                        </div>
                    </md-card>

                    <md-card style="width:80%;margin:10px auto" v-for="(x,n) in item.missionclient" :key="n" v-if="x.finishdate">
                        <!-- <div @click="opendetail(x)"> -->
                        <div>
                            <md-card-header>
                                <md-card-header-text>
                                    <div class="md-title" style="font-size: 18px;max-width: 172px;">{{x.clientbname}}</div>
                                    <div class="md-subhead">{{x.finishdate | timefilter}}</div>
                                </md-card-header-text>

                                <md-card-media>
                                    <img :src="x.finishphoto | imgurl" alt="People" style="width: 100%;height: 100%;object-fit: contain;" v-on:error.once="loadDefault($event)">
                                </md-card-media>
                            </md-card-header>
                        </div>
                    </md-card>

                </div>
            </div>

        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination" style="position: fixed;bottom: 80px;left: 50%;right:auto"></div>
        <!-- 导航按钮 -->
        <div class="button-left"></div>
        <div class="button-right"></div>

        <div class="emptyarea-bottom-huge">
            <!-- 底部部占位符 -->
        </div>

        <!-- upload dialog start -->
        <md-dialog :md-active.sync="uploadDialog">

            <div class="dialogtop" style="box-shadow: 0px 1px 5px;">
                <div class="dialogtop-left" @click="uploadDialog = false">
                    <img src="../../public/icons/left.png" alt="exit">
                    <span>{{language.finishPage.returnPage}}</span>
                </div>
                <div class="dialogtop-center">
                    <span>{{language.finishPage.confirmState}}</span>
                </div>
                <div class="dialogtop-right"></div>
            </div>

            <div class="emptyarea-bottom-huge">
                <!-- 顶部占位符 -->
            </div>

            <div style="padding-top:40px">
                <div class="photoarea">
                    <img :src="missionImage | imgurl" alt="newimg">
                </div>
            </div>

            <div class="namearea">
                <span style="font-size:20px">{{dialogClientName}}</span>
            </div>

            <div class="bottominfo">
                <div class="bottominfo-title">
                    <span style="font-size:20px">{{language.finishPage.finish}}</span>
                </div>
                <div class="bottominfo-body">
                    <div class="bottominfo-body-left">
                        <span>{{language.finishPage.completionDate}}</span>
                    </div>
                    <div class="bottominfo-body-right">
                        <span>{{dialogDate | timefilter}}</span>
                    </div>
                </div>
                <div class="bottominfo-body">
                    <div class="bottominfo-body-left">
                        <span>{{language.finishPage.completionTime}}</span>
                    </div>
                    <div class="bottominfo-body-right">
                        <span>{{dialogDate | dateFilter}}</span>
                    </div>
                </div>
            </div>
        </md-dialog>
        <!-- upload dialog end -->
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios'
import config from '../assets/js/config'

export default {
    created() {
        this.drivername = localStorage.getItem('drivername')
        this.getDriverMission()
    },
    computed: {
        language() {
            return this.$store.getters.getLanguage
        },
        choiseDay() {
            return this.$store.state.choiseDay
        }
    },
    mounted() {
        setTimeout(() => {
            // 滑块部分
            const mySwiper = new Swiper('.swiper-container', {
                autoplay: false,
                // centeredSlides:true,
                direction: 'horizontal',
                loop: true,

                pagination: {
                    el: '.swiper-pagination'
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.button-right',
                    prevEl: '.button-left'
                }
            })
            // 滑块部分
        }, 200)
    },
    data() {
        return {
            swiperNumber: 0,
            uploadDialog: false,
            dialogClientName: '',
            missionImage: '',
            dialogDate: '',
            drivername: '',
            allMission: [],
            needDoNum: 0,
            imgDefault: '/img/ebuyLogo.png',
        }
    },
    methods: {
        // opendetail(item) {
        //     this.uploadDialog = true;
        //     this.dialogClientName = item.clientbname;
        //     this.missionImage = item.finishphoto;
        //     this.dialogDate = item.finishdate;
        // },
        loadDefault(e) {
            e.currentTarget.src = this.imgDefault
        },
        getDriverMission() {
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
                    doc.data.doc.forEach(elementX => {
                        elementX.missionclient.forEach(elementY => {
                            if (!elementY.finishdate) {
                                this.needDoNum += 1
                            }
                        })
                    })
                    this.$store.dispatch('setDoNum', this.needDoNum)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>
.button-left {
    left: 10px;
    right: auto;
    background-image: url(../../public/icons/baseline_arrow_back_ios_white_24dp.png);
    position: fixed;
    top: 50%;
    width: 40px;
    height: 44px;
    margin-top: -22px;
    z-index: 10;
    cursor: pointer;
    background-size: 40px 44px;
    background-position: center;
    background-repeat: no-repeat;
}

.button-right {
    left: auto;
    right: 10px;
    background-image: url(../../public/icons/baseline_arrow_forward_ios_white_24dp.png);
    position: fixed;
    top: 50%;
    width: 40px;
    height: 44px;
    margin-top: -22px;
    z-index: 10;
    cursor: pointer;
    background-size: 40px 44px;
    background-position: center;
    background-repeat: no-repeat;
}

.swiper-container {
    width: 100%;
    height: 100%;
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

.emptyarea-bottom-huge {
    padding: 30px 0;
}

.swiper-pagination .my-bullet-active {
    background-color: #fff;
}

.dialogtop {
    background-color: #d74342;
    padding: 10px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    word-wrap: break-word;
    position: fixed;
    z-index: 101;
    width: 100%;
    top: 0;
    font-size: 20px;
    color: #fff;
    line-height: 30px;
}

.dialogtop-left {
    flex-basis: 20%;
    margin: 0 auto;
}

.dialogtop-left img {
    width: 20px;
    padding-bottom: 3px;
}

.dialogtop-center {
    flex-basis: 50%;
    margin: 0 auto;
    text-align: center;
}

.dialogtop-right {
    flex-basis: 20%;
    margin: 0 auto;
}

.photoarea {
    margin: 0 auto;
    text-align: center;
    border: 3px dashed #696969;
    width: 250px;
    height: 250px;
    background-color: #eee;
}

.photoarea img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.namearea {
    text-align: center;
    padding-top: 30px;
    height: 90px;
    line-height: 58px;
    font-weight: bold;
    background-image: url(../../public/img/wood.png);
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 250px 74px;
}

.bottominfo {
    margin: 0 auto;
    border: 3px solid #696969;
    background-color: #2ca81c;
    border-radius: 40px;
    min-width: 200px;
    text-align: center;
    color: #fff;
    padding-bottom: 10px;
    margin-top: 20px;
}

.bottominfo-title {
    padding: 10px;
}

.bottominfo-body {
    display: flex;
    display: -webkit-flex;
    flex-flow: row wrap;
    -webkit-flex-flow: row wrap;
    padding: 5px 0;
}

.bottominfo-body-left {
    flex-basis: 50%;
    padding: 0 5px;
}

.bottominfo-body-right {
    flex-basis: 50%;
    padding: 0 5px;
}
</style>
