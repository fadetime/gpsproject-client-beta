<template>
    <div id="history">

        <div>
            <md-card style="width:320px;margin:10px auto;padding-bottom:5px">
                <md-datepicker v-model="selectedDate" md-immediately style="width:300px;margin:0 auto">
                    <label>请选择日期</label>
                </md-datepicker>
            </md-card>
        </div>
        <div class="center-body" v-if="findMission.length===0">
            <img src="../../public/img/ebuyLogo.png" alt="logo">
        </div>
        <div v-else>
            <md-card md-with-hover style="width:80%;margin:10px auto;" v-for="(item,index) in findMission" :key="index">
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
            <div class="emptyarea-top">
                <!-- 顶部占位符 -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";

export default {
    watch: {
        selectedDate: function() {
            this.findDriverMission();
        }
    },
    data() {
        return {
            selectedDate: null,
            findMission: []
        };
    },
    mounted() {
        this.drivername = localStorage.getItem("drivername");
    },
    methods: {
        findDriverMission() {
            axios
                .post(config.server + "/client-driver/", {
                    startdate: new Date(this.selectedDate).toLocaleDateString(),
                    drivername: this.drivername
                })
                .then(doc => {
                    this.findMission = doc.data.doc;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        opendetail(item) {
            item.missionclient = _.orderBy(
                item.missionclient,
                ["finishdate"],
                ["desc"]
            );
            this.$store.dispatch("setTempArr", item);
            this.$router.push("/historydetail");
        }
    }
};
</script>

<style scoped>
.emptyarea-top {
    padding: 28px 0;
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

.center-body img {
    width: 200px;
    padding-top: 50px;
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
</style>
