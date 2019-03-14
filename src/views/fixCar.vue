<template>
    <div>
        <div class="title">
            <span>维修信息</span>
        </div>
        <div style="height:40px">
            <!-- empty area -->
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
                <div v-if="item.image" class="infobox-body" style="margin-bottom:5px">
                    <div class="infobox-body-title">
                        <span>相关照片</span>
                    </div>
                    <div class="infobox-body-item">
                        <img :src="item.image | imgurl" alt="photo">
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

        <!-- first page notice start -->
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowFirstPageNotice"
                 class="first_notic_back">
                <div class="first_notic_back_close" @click="isShowFirstPageNotice = false">
                    <span v-if="lang === 'ch'" style="font-size:14px;line-height: 38px;">已读</span>
                    <span v-else style="font-size:13px;line-height: 42px;">READ</span>
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
                    <span style="font-size: 24px;line-height: 36px;">x</span>
                </div>
                <div class="bigimg_dialog_frame">
                    <img :src="firstPageImage | imgurl" alt="notice_pic">
                </div>
            </div>
        </transition>
        <!-- big image dialog end -->
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
            showEmptyGIF:false,
            isShowFirstPageNotice:false,
            isShowBigImageDialog:false
        }
    },
    mounted() {
        this.getFixMissionMethod()
        this.findFirstPageNotice()
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
    height: 40px;
    background: #d74342;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    position: fixed;
    z-index: 24;
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

