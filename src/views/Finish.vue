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
                        <div @click="opendetail(x)">
                            <md-card-header>
                                <md-card-header-text>
                                    <div class="md-title">{{x.clientbname}}</div>
                                    <div class="md-subhead">{{x.finishdate | timefilter}}</div>
                                </md-card-header-text>

                                <md-card-media>
                                    <img :src="x.finishphoto | imgurl" alt="People" style="width: 100%;height: 100%;object-fit: contain;">
                                </md-card-media>
                            </md-card-header>
                        </div>
                    </md-card>

                </div>
            </div>

            

        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" style="position: fixed;bottom: 80px;left: 50%;right:auto"></div>
        <!-- 如果需要导航按钮 -->
        <div class="button-left"></div>
        <div class="button-right"></div>

        <div class="emptyarea-bottom-huge">
            <!-- 顶部占位符 -->
        </div>

        <!-- upload dialog start -->
        <md-dialog :md-active.sync="uploadDialog">

            <div class="dialogtop" style="box-shadow: 0px 1px 5px;">
                <div class="dialogtop-left" @click="uploadDialog = false">
                    <img src="../../public/icons/left.png" alt="exit">
                    <span>返回</span>
                </div>
                <div class="dialogtop-center">
                    <span>确认完成</span>
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
                    <span style="font-size:20px">已完成</span>
                </div>
                <div class="bottominfo-body">
                    <div class="bottominfo-body-left">
                        <span>完成日期</span>
                    </div>
                    <div class="bottominfo-body-right">
                        <span>{{dialogDate | timefilter}}</span>
                    </div>
                </div>
                <div class="bottominfo-body">
                    <div class="bottominfo-body-left">
                        <span>完成时间</span>
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
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import axios from "axios";
import config from "../assets/js/config";

export default {
    created() {
        this.drivername = localStorage.getItem("drivername");
        this.getDriverMission();
    },
    mounted() {
        setTimeout(() => {
            // 滑块部分
            const mySwiper = new Swiper(".swiper-container", {
                autoplay: false,
                // centeredSlides:true,
                direction: "horizontal",
                loop: true,

                pagination: {
                    el: ".swiper-pagination"
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: ".button-right",
                    prevEl: ".button-left"
                }
            });
            // 滑块部分
        }, 200);
    },
    computed: {
        allMission: function() {
            return this.$store.state.allMission;
        }
    },
    data() {
        return {
            swiperNumber: 0,
            uploadDialog: false,
            dialogClientName: "",
            missionImage: "",
            dialogDate: "",
            drivername: ""
            // allMission: []
        };
    },
    methods: {
        opendetail(item) {
            this.uploadDialog = true;
            this.dialogClientName = item.clientbname;
            this.missionImage = item.finishphoto;
            this.dialogDate = item.finishdate;
        },
        getDriverMission() {
            axios
                .post(config.server + "/client-driver/", {
                    startdate: new Date().toLocaleDateString(),
                    drivername: this.drivername
                })
                .then(doc => {
                    let tempMission = doc.data.doc;
                    this.$store.dispatch("setAllMission", tempMission);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
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
    background-image: url(../../public/img/wood.jpg);
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
