<template>
    <div id="homepage">
        <transition name="custom-classes-transition" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
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
                <div v-if="allMission.length == 0" style="padding-top:100px">
                    <img src="../../public/img/ebuyLogo.png" alt="logo" style="width:200px">
                    <br>
                    <span>~无配送任务~</span>
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
                                        <span style="font-size:16px;color: #989898">用户数量</span>
                                    </div>
                                </div>

                                <div class="card-text" style="padding:5px 20px 5px 40px">
                                    <div class="card-text-left">
                                        <md-icon style="color: rgb(215, 67, 66)">assignment_late</md-icon>
                                    </div>
                                    <div class="card-text-right" style="padding-left:50px">
                                        <span style="font-size:16px">共 {{item.missionclient.length}} 个</span>
                                    </div>
                                </div>

                                <div class="card-text" style="padding:10px 0 10px 30px">
                                    <div>
                                        <span style="font-size:16px;color: #989898">完成数量</span>
                                    </div>
                                </div>

                                <div class="card-text" style="padding:5px 20px 5px 40px">
                                    <div class="card-text-left">
                                        <md-icon style="color: rgb(215, 67, 66)">assignment_turned_in</md-icon>
                                    </div>
                                    <div class="card-text-right" style="padding-left:50px">
                                        <span style="font-size:16px">共 {{finishNumber[index]}} 个</span>
                                    </div>
                                </div>

                                <div class="card-text" style="padding:20px 0 10px 30px">
                                    <div>
                                        <span style="font-size:16px;color: #989898">订单时间</span>
                                    </div>
                                </div>

                                <div class="card-text" style="padding:5px 20px 20px 40px">
                                    <div class="card-text-left">
                                        <md-icon style="color: rgb(215, 67, 66)">date_range</md-icon>
                                    </div>
                                    <div class="card-text-right" style="padding-left:50px">
                                        <span style="font-size:16px">{{item.missiondate | dateFilter}}</span>
                                    </div>
                                </div>

                                <div style="display: -webkit-flex;display: flex;-webkit-flex-flow: row;flex-flow: row;padding: 0 0 10px 0;">
                                    <div v-for="(x,n) in item.missionclient" :key="n" style="overflow:hidden;width:50px;height:50px;margin: 0 5px;box-shadow: 1px 1px 5px;" v-if="n < 5">
                                        <img :src="x.image | imgurl" alt="x.clientbname" style="height:100%;width:100%;object-fit:cover">
                                    </div>
                                </div>
                                <div class="card-text" style="padding:10px 0;border-top:1px solid #eee">
                                    <div style="margin:0 auto;color:#707070;font-size:20px">
                                        <span>>>></span>
                                        <span> 点击查看详情 </span>
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
        </transition>

    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";
import lrz from "lrz";
import _ from "lodash";

export default {
    name: "homepage",
    mounted() {
        this.drivername = localStorage.getItem("drivername");
        this.getDriverMission();
    },
    data() {
        return {
            allMission: [],
            uploadDialog: false,
            drivername: "",
            dialogName: "",
            finishNumber: [],
            needDoNum:0
        };
    },
    methods: {
        opendetail(item) {
            item.missionclient = _.orderBy(
                item.missionclient,
                ["finishdate"],
                ["desc"]
            );
            this.$store.dispatch("setTempArr", item);
            this.$router.push("/detailpage");
        },

        getDriverMission() {
            axios
                .post(config.server + "/client-driver/", {
                    startdate: new Date().toLocaleDateString(),
                    drivername: this.drivername
                })
                .then(doc => {
                    this.allMission = doc.data.doc;
                    // 计算完成
                    let startNum = -1;
                    let countNum = 0;
                    this.allMission.forEach(elementX => {
                        startNum += 1;
                        // console.log(this.allMission)
                        elementX.missionclient.forEach(elementY => {
                            if (elementY.finishdate) {
                                countNum += 1;
                            }else{
                                this.needDoNum +=1
                            }
                        });
                        this.finishNumber[startNum] = countNum;
                        countNum = 0;
                    });
                    this.$store.dispatch("setDoNum", this.needDoNum);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        refresh() {
            let arrow = document.querySelector("#arrow");
            arrow.style.transform = "rotate(360deg)";
            arrow.style.transition = "0.5s";
            setTimeout(() => {
                arrow.style.transform = "rotate(0deg)";
                arrow.style.transition = "0.5s";
            }, 300);
            this.getDriverMission();
        }
    }
};
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
</style>
