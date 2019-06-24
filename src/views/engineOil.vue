<template>
    <div id="engine_oil_page">
        <div class="engine_oil_title">
            <span>机油监控</span>
        </div>
        <div class="engine_oil_body" ref="engine_oil_body">
            <div class="engine_oil_body_item" v-for="(item,index) in problemArray" :key="index" @click="openDetail(item,'top')">
                <div class="engine_oil_body_item_left">
                    <div class="icon_problem"></div>
                </div>
                <div class="engine_oil_body_item_right">
                    <div class="engine_oil_body_item_right_top">
                        <span>机油提醒 </span>
                        <span>[{{item.carid}}]</span>
                    </div>
                    <div class="engine_oil_body_item_right_bottom">
                        <span>{{item.reason}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="engine_oil_bottom_box" ref="bottomBox" style="height:100px">
            <div class="engine_oil_bottom_box_button">
                <div class="icon_frame" @click="changeWindowMethod">
                    <div class="icon_unfold"></div>
                </div>
            </div>
            <div class="engine_oil_bottom_box_content" style="flex-wrap:nowrap;display: -webkit-box;justify-content: space-around;" ref="engineOilBottomBoxContent">
                <div :class="'box_item'+ margin0_8" ref="engineOilBottomBoxContentItem" v-for="(item,index) in carArrary" :key="index" @click="openDetail(item,'bottom')">
                    <div class="box_item_img">
                        <img :src="item.image | imgurl" v-on:error.once="loadDefault($event)">
                    </div>
                    <div class="box_item_text">
                        <span>{{item.carid}}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- car detail dialog start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowCarDetailDialog" class="cardetail_dialog">
                <div class="cardetail_dialog_close" @click="isShowCarDetailDialog = false">
                    <span style="font-size: 24px;line-height: 36px;">x</span>
                </div>
                <div class="cardetail_dialog_img">
                    <img :src="tempShipping.image | imgurl" v-on:error.once="loadDefault($event)">
                </div>
                <div class="cardetail_top">
                    <span>{{tempShipping.carid}}</span>
                </div>
                <div class="cardetail_center">
                    <div class="cardetail_center_item">
                        <div class="cardetail_center_item_left">
                            <span>行驶的里程数(Km)</span>
                        </div>
                        <div class="cardetail_center_item_right">
                            <span>{{tempShipping.kelometer}}</span>
                        </div>
                    </div>
                    <div class="cardetail_center_item">
                        <div class="cardetail_center_item_left">
                            <span>上次更换机油(Km)</span>
                        </div>
                        <div class="cardetail_center_item_right">
                            <span v-if="tempShipping.lastOilKelometer === null">未填写</span>
                            <span v-else>{{tempShipping.lastOilKelometer}}</span>
                        </div>
                    </div>
                    <div class="cardetail_center_item">
                        <div class="cardetail_center_item_left">
                            <span>机油提醒阈值(Km)</span>
                        </div>
                        <div class="cardetail_center_item_right">
                            <span v-if="engineOilValve === null">数据错误</span>
                            <span v-else>{{engineOilValve}}</span>
                        </div>
                    </div>
                    <div class="cardetail_center_item">
                        <div class="cardetail_center_item_left">
                            <span>机油行驶范围(Km)</span>
                        </div>
                        <div class="cardetail_center_item_right">
                            <span v-if="oilProperty === null">数据错误</span>
                            <span v-else>{{oilProperty}}</span>
                        </div>
                    </div>
                </div>
                <div v-if="!lockMode" class="cardetail_bottom">
                    <div>
                        <div class="icon_problem"></div>
                    </div>
                    <div>
                        <span>{{tempShipping.reason}}</span>
                    </div>
                </div>
                <div v-if="!lockMode" class="cardetail_bottom_input">
                    <input type="number" placeholder="请输入数字" v-model="inputNumber">
                </div>
                <div class="cardetail_button">
                    <div v-if="lockMode" class="cardetail_button_box" style="background-color: #fff;border: 1px solid #eee;color: rgba(0,0,0,0.8);" @click="lockMode = false">
                        <span>修改信息</span>
                    </div>
                    <div v-else class="cardetail_button_box" style="background-color: #ff9800;color: #fff;" @click="openConfirmBoxMethod">
                        <span>更新数据</span>
                    </div>
                </div>
            </div>
        </transition>
        <!-- car detial dialog end -->

        <!-- confirm box start -->
        <transition name="carwash-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowConfirmBox" class="confirmbox_back" ></div>
        </transition>
        <transition name="carwash-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowConfirmBox" class="confirmbox_front" @click.self.prevent="isShowConfirmBox = false">
                <div class="confirmbox_box">
                    <div class="confirmbox_box_top">
                        <span>修改确认</span>
                    </div>
                    <div class="confirmbox_box_body">
                        <div class="confirmbox_box_body_item">
                            <div class="confirmbox_box_body_item_left">
                                <span>车牌号码</span>
                            </div>
                            <div class="confirmbox_box_body_item_right">
                                <span>{{tempShipping.carid}}</span>
                            </div>
                        </div>
                        <div class="confirmbox_box_body_item">
                            <div class="confirmbox_box_body_item_left">
                                <span>行驶的里程数(Km)</span>
                            </div>
                            <div class="confirmbox_box_body_item_right">
                                <span>{{tempShipping.kelometer}}</span>
                            </div>
                        </div>
                        <div class="confirmbox_box_body_item">
                            <div class="confirmbox_box_body_item_left">
                                <span>上次更换机油(Km)</span>
                            </div>
                            <div class="confirmbox_box_body_item_right">
                                <span v-if="tempShipping.lastOilKelometer === null">未填写</span>
                                <span v-else>{{tempShipping.lastOilKelometer}}</span>
                            </div>
                        </div>
                        <div class="confirmbox_box_body_item">
                            <div class="confirmbox_box_body_item_left">
                                <span>本次输入数值(Km)</span>
                            </div>
                            <div class="confirmbox_box_body_item_right">
                                <span>{{inputNumber}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="confirmbox_box_foot">
                        <div class="confirmbox_box_foot_bottom" @click="isShowConfirmBox = false">
                            <span>取消</span>
                        </div>
                        <div class="confirmbox_box_foot_bottom" @click="changeOilNumberMethod">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm box end -->
        <!-- find error box start -->
        <transition name="carwash-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowErrorBox" class="confirmbox_back" ></div>
        </transition>
        <transition name="carwash-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowErrorBox" class="confirmbox_front" @click.self.prevent="isShowErrorBox = false">
                <div class="engine_error_box">
                    <div class="engine_error_box_title">
                        <span>信息确认</span>
                    </div>
                    <div class="engine_error_box_body">
                        <span>输入的机油数比原有机油数多一位数字，是否确认？</span>
                    </div>
                    <div class="confirmbox_box_foot">
                        <div class="confirmbox_box_foot_bottom" @click="closeErrorBoxMethod()">
                            <span>取消</span>
                        </div>
                        <div class="confirmbox_box_foot_bottom" @click="isShowConfirmBox = true,isShowErrorBox= false">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- find error box end -->
        <!-- 操作提示 -->
        <transition name="tips-classes-transition" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
            <div class="errinfo" v-if="showError" @click="showError = false">
                <span>{{errorInfo}}</span>
            </div>
        </transition>
        <!-- 操作提示 -->
        <!-- tips dialog start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips dialog end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";
import tipsBox from "../components/tipsBox"

export default {
    components:{
        tipsBox
    },
    mounted(){
        this.screenHeight = document.documentElement.clientHeight
        let lindBoxHeight = this.screenHeight - 40 - 60 - 100
        this.$refs.engine_oil_body.style.height = lindBoxHeight + 'px'
        this.getSettingMethod()
    },
    data() {
        return {
            screenHeight:0,
            carArrary:[],
            problemArray:[],
            imgDefault: '/img/ebuyLogo.png',
            isShowCarDetailDialog:false,
            tempShipping:null,
            engineOilValve:null,
            oilProperty:null,
            isShowConfirmBox:false,
            showError:false,
            errorInfo:null,
            inputNumber:null,
            lockMode:false,
            margin0_8:' margin0',
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            isShowErrorBox: true
        }
    },

    methods:{
        closeErrorBoxMethod(){
            this.isShowErrorBox = false
        },
        changeOilNumberMethod(){
            axios
                .post(config.server + '/car/manChangeOil',{
                    _id:this.tempShipping._id,
                    lastOilKelometer:this.inputNumber
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.isShowConfirmBox = false
                        this.isShowCarDetailDialog = false
                        this.getCarInformation()
                        this.errorInfo = '更新成功'
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 2000);
                    }else{
                        this.errorInfo = '更新失败'
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        openConfirmBoxMethod(){
            if(this.inputNumber === null){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请输入数字'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 2000);
            }else if(this.tempShipping.lastOilKelometer != null){
                let oldString = this.tempShipping.lastOilKelometer.toString()
                let newString = this.inputNumber.toString()
                if(this.inputNumber < this.tempShipping.lastOilKelometer){
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '机油数小于原有数值'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false
                    }, 2000);
                }else if(newString.length > oldString.length){
                    this.isShowErrorBox = true
                }else{
                    this.isShowConfirmBox = true
                }
            }else{
                this.isShowConfirmBox = true
            }
        },

        getSettingMethod(){
            axios
                .get(config.server + '/setting/find')
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.engineOilValve = doc.data.doc.engineOilValve
                        this.oilProperty = doc.data.doc.oilProperty
                        this.getCarInformation()
                    }else{
                        this.errorInfo = '获取数据错误'
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        openDetail(item,mode){
            if(mode === 'bottom'){
                this.lockMode = true
            }else{
                this.lockMode = false
            }
            this.tempShipping = item
            this.isShowCarDetailDialog = true
        },

        loadDefault(e) {
            e.currentTarget.src = this.imgDefault
        },

        getCarInformation(){
            axios
                .get(config.server + '/car/manFindCar')
                .then(doc => {
                    if(doc.data.code === 0){
                        this.problemArray = []
                        this.carArrary = doc.data.doc
                        doc.data.doc.map(item => {
                            if(item.lastOilKelometer === null){
                                item.reason = '请更新最后更换机油的公里数'
                                this.problemArray.push(item)
                            }else if(item.lastOilKelometer + this.oilProperty - this.engineOilValve < item.kelometer){
                                item.reason = '请注意更换机油'
                                this.problemArray.push(item)
                            }
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        changeWindowMethod(){
            let lindBoxHeight = this.screenHeight - 56
            if(this.$refs.bottomBox.style.height === '100px'){
                this.$refs.bottomBox.style.height = lindBoxHeight + 'px'
                this.$refs.engineOilBottomBoxContent.style.flexWrap = 'wrap'
                this.$refs.engineOilBottomBoxContent.style.display = 'flex'
                // this.$refs.engineOilBottomBoxContentItem[1].style.marginBottom = '8px'
                this.margin0_8=' margin8'
            }else{
                this.$refs.bottomBox.style.height = '100px'
                this.$refs.engineOilBottomBoxContent.style.flexWrap = 'nowrap'
                this.$refs.engineOilBottomBoxContent.style.display = '-webkit-box'
                // this.$refs.engineOilBottomBoxContentItem[1].style.marginBottom = '0'
                this.margin0_8=' margin0'
            }
        }
    }
}
</script>

<style scoped>
.engine_oil_title{
    height: 40px;
    line-height: 40px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background-color: #d74342;
    color: #fff;
    font-size: 16px;
}

.engine_oil_body{
    background-color: #f7f7f7;
    margin-top: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}

.engine_oil_body_item{
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 12px;
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    display: flex;
    display: -webkit-flex;
    padding-right: 12px;
}

.engine_oil_body_item_left{
    flex-basis: 20%;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.engine_oil_body_item_right{
    flex-basis: 80%;
}

.engine_oil_body_item_right_top{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
}

.engine_oil_body_item_right_bottom{
    color: rgba(0,0,0,0.6);
    height: 30px;
    line-height: 30px;
}

.engine_oil_bottom_box{
    background-color: #f7f7f7;
    border: 1px solid #eee;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 56px;
    transition: 0.25s;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.engine_oil_bottom_box_button{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    position: absolute;
    top: -15px;
    left: 0;
    right: 0;
}

.icon_frame{
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: #fff;
}

.icon_unfold{
    background: #e0e0e0;
    mask-image: url(../../public/icons/baseline-unfold_more-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-unfold_more-24px.svg);
    height: 30px;
    -webkit-mask-size: 28px 28px;
    mask-size: 28px 28px;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
}

.icon_problem{
    background: #ff9800;
    mask-image: url(../../public/icons/baseline-report_problem-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-report_problem-24px.svg);
    width: 42px;
    height: 42px;
    -webkit-mask-size: 42px 42px;
    mask-size: 42px 42px;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
}

.engine_oil_bottom_box_content{
    display: flex;
    overflow: auto;
    padding-bottom: 3px;
}

.box_item{
    height:80px;
    min-width:80px;
    background-color: #eee;
    margin: 0 4px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.box_item_img{
    height:50px;
    width: 80px;
}

.box_item_img img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.box_item_text{
    width: 80px;
    height: 30px;
    background-color: #fff;
    line-height: 30px;
}

.cardetail_dialog{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f7f7f7;
}

.cardetail_dialog_close{
    background-color: #fff;
    height: 42px;
    width: 42px;
    border-radius: 100%;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    right: 10px;
    top: 10px;
    border: 1px solid #eee;
}

.cardetail_dialog_img{
    height: 200px;
}

.cardetail_dialog_img img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.cardetail_top{
    background-color: #fff;
    font-size: 18px;
    height: 40px;
    line-height: 40px;
}

.cardetail_center{
    background-color: #fff;
    font-size: 16px;
    margin-top: 10px;
}

.cardetail_center_item{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    height: 30px;
    line-height: 30px;
}

.cardetail_center_item_left{
    color: rgba(0, 0, 0, 0.6);
}

.cardetail_center_item_right{
    width: 160px;
}

.cardetail_bottom{
    margin-top: 10px;
    background-color: #fff;
    font-size: 16px;
    color: #ff9800;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.cardetail_bottom_input{
    background-color: #fff;
    height: 50px;
    padding: 0 36px;
}

.cardetail_bottom_input input{
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    text-align: center;
    width: 100%;
    font-size: 16px;
}

.cardetail_button{
    background-color: #fff;
    position: fixed;
    bottom: 56px;
    left: 0;
    right: 0;
    height: 50px;
    padding: 0 24px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.cardetail_button_box{
    height: 40px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    flex-basis: 100%;
    font-size: 18px;
    line-height: 40px;
    
}

.confirmbox_back{
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.confirmbox_front{
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

.confirmbox_box{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #f7f7f7;
    border-radius: 10px;
    overflow: hidden;
}

.confirmbox_box_top{
    height: 30px;
    line-height: 30px;
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 16px;
}

.confirmbox_box_body{
    padding: 10px 12px;
}

.confirmbox_box_body_item{
    display: flex;
    display: -webkit-flex;
    margin-bottom: 8px;
    height: 30px;
    line-height: 30px;
}

.confirmbox_box_body_item_left{
    width: 120px;
    text-align: right;
}

.confirmbox_box_body_item_right{
    margin-left: 10px;
    width: 110px;
    text-align: center;
    background-color: #eee;
    border-radius: 4px;
}

.confirmbox_box_foot{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    margin-bottom: 10px;
}

.confirmbox_box_foot_bottom{
    border: 1px solid #eee;
    height: 30px;
    line-height: 30px;
    width: 100px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.errinfo {
    position: fixed;
    z-index: 19;
    top: 0px;
    background-color: rgba(255, 255, 0, 0.7);
    width: 100%;
    z-index: 99;
}

.errinfo span {
    font-size: 16px;
    line-height: 32px;
}

.margin0{
    margin-bottom: 0
}

.margin8{
    margin-bottom: 8px
}
.engine_error_box{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    overflow: hidden;
}
.engine_error_box_title{
    height: 30px;
    line-height: 30px;
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.engine_error_box_body{
    border: 1px solid #eee;
    padding: 12px;
    margin: 12px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 220px;
}
</style>
