<template>
    <div>
        <div class="title">
            <span>维修信息</span>
        </div>
        <div v-if="!showEmptyGIF">
            <div v-for="(item,index) in allFixMission" :key="index" class="infoBox">
                <div class="infobox-top">
                    <!-- 顶部标线 -->
                </div>
                <div class="infobox-title">
                    {{item.car_id.carid}}
                </div>
                <div class="infobox-body">
                    <div class="infobox-body-title">
                        <span>提交司机</span>
                    </div>
                    <div class="infobox-body-item">
                        <span>{{item.driver}}</span>
                    </div>
                </div>
                <div class="infobox-body" v-if="item.wiper>0 || item.headlight>0 || item.mirror>0 || item.tyre>0 || item.backup>0 || item.brake>0">
                    <div class="infobox-body-title">
                        <span>损坏部分</span>
                    </div>
                    <div v-if="item.wiper > 0" class="infobox-body-item">
                        <div>雨刷</div>
                        <!-- <div>开关</div> -->
                    </div>
                    <div v-if="item.headlight > 0" class="infobox-body-item">
                        <div>大灯</div>
                        <!-- <div>开关</div> -->
                    </div>
                    <div v-if="item.mirror > 0" class="infobox-body-item">
                        <div>倒车镜</div>
                        <!-- <div>开关</div> -->
                    </div>
                    <div v-if="item.tyre > 0" class="infobox-body-item">
                        <div>车胎</div>
                        <!-- <div>开关</div> -->
                    </div>
                    <div v-if="item.backup > 0" class="infobox-body-item">
                        <div>备胎</div>
                        <!-- <div>开关</div> -->
                    </div>
                    <div v-if="item.brake > 0" class="infobox-body-item">
                        <div>刹车</div>
                        <!-- <div>开关</div> -->
                    </div>
                </div>
                <div v-if="item.other > 0" class="infobox-body" style="margin-bottom:5px">
                    <div class="infobox-body-title">
                        <span>其他备注</span>
                    </div>
                    <div class="infobox-body-item">
                        <span>{{item.note}}</span>
                    </div>
                </div>
                <div>
                    <md-button style="background:#d74342;color:#fff;height:30px" @click="finishMethod(item)">完成维修</md-button>
                </div>
            </div>
            <div style="height:80px">
                <!-- 底部占位符 -->
            </div>
        </div>
        <div v-else class="empty">
            <div class="empty-title">
                <span>~所有维修已完成~</span>
            </div>
            <div class="empty-body">
                <img src="../../public/img/fatCat.gif" alt="allMissionFinish">
            </div>
        </div>

        <!-- confirm info box start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div class="infobox-back" v-if="showInfoBox" @click="showInfoBox=false"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div class="infobox-front" v-if="showInfoBox" @click="showInfoBox=false">
                <div class="infobox-box">
                    <div class="infobox-box-top">
                        title
                    </div>
                    <div class="infobox-box-center">
                        <span>
                            确认完成维修？
                        </span>
                    </div>
                    <div class="infobox-box-bottom">
                        <md-button style="background:#d74342;color:#fff;height:30px" @click="showInfoBox=false">取消</md-button>
                        <md-button style="background:#d74342;color:#fff;height:30px" @click="comfirmFinishMethod">完成</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm info box end -->
    </div>
</template>

<script>
import axios from 'axios'
import config from '../assets/js/config'

export default {
    data() {
        return {
            allFixMission: null,
            showInfoBox: false,
            shippingDara: null,
            showEmptyGIF:false
        }
    },
    mounted() {
        this.getFixMissionMethod()
    },
    methods: {
        comfirmFinishMethod() {
            axios
                .post(config.server + '/fixcar/edit', {
                    _id: this.shippingDara._id
                })
                .then(doc => {
                    if(doc.data.code == 0) {
                        this.getFixMissionMethod()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        finishMethod(item) {
            this.shippingDara = item
            console.log(item)
            this.showInfoBox = true
        },
        getFixMissionMethod() {
            axios
                .get(config.server + '/fixcar/')
                .then(doc => {
                    this.allFixMission = doc.data.doc
                    if(this.allFixMission.length === 0) {
                        this.showEmptyGIF = true
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>
.title {
    width: 100%;
    height: 50px;
    background: #d74342;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    color: #fff;
    font-size: 18px;
    line-height: 50px;
}

.infoBox {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 90%;
    margin: 10px auto 0 auto;
}

.infobox-top {
    height: 2px;
    background: #d74342;
}

.infobox-title {
    border-bottom: 1px solid #e0e0e0;
    color: #6a6a6a;
    width: 90%;
    margin: 0 auto;
    font-size: 16px;
    height: 30px;
    line-height: 32px;
    margin-bottom: 12px;
}

.infobox-body {
    display: flex;
    display: -webkit-flex;
    border: 1px solid #e0e0e0;
    justify-content: center;
    width: 80%;
    margin: 6px auto 12px auto;
    position: relative;
}

.infobox-body-title{
    position: absolute;
    top:-10px;
    background-color: #d74342;
    color: #fff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 1px 10px;
}

.infobox-body-item {
    padding: 14px 5px;
}

.infobox-back {
    background: rgba(0, 0, 0, 0.12);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 23;
}

.infobox-front {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 24;
    display: flex;
    justify-content: center;
    align-items: center;
}

.infobox-box {
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.infobox-box-top {
    font-size: 16px;
    background: #d74342;
    color: #fff;
    height: 30px;
    line-height: 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.infobox-box-center {
    padding: 20px 0;
}

.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 60vh;
    justify-content: center;
}

.empty-title {
    font-size: 16px;
}

.empty-body img{
    width: 200px;
}
</style>

