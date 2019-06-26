<template>
    <div id="detail-page">
        <div style="position:fixed;top:-20px;width:100%;height:70px;background-color:#fff;z-index:9"></div>
        <div class="topusername"
             style="box-shadow: 0px 1px 5px;">
            <div class="topusername-left" @click="turnback">
                <img src="../../public/icons/left.png"
                     alt="exit">
                <span>{{language.detailPage.returnPage}}</span>
            </div>
            <div class="topusername-center">
                <span>{{tempArr.missionline}}</span>
            </div>
            <div class="topusername-right">
                <div class="dt_right_button" @click="finishDtMethod()">
                    <span v-if="lang === 'ch'">完成</span>
                    <span v-else>Finish</span>
                </div>
            </div>
        </div>
        <div class="emptyarea-top">
            <!-- 顶部占位符 -->
        </div>
        <div class="dt_top_frame">
            <div class="dt_topButton" @click="addClentMethod()">
                <span v-if="lang === 'ch'">添加客户</span>
                <span v-else>Add Client</span>
            </div>
        </div>
        <div v-if="tempMissionObj && tempMissionObj.missionclient">
            <md-card md-with-hover style="width:80%;margin:10px auto;" v-for="(x,no) in tempMissionObj.missionclient" :key="no">
                <md-ripple>
                    <div>
                        <div class="card-text" style="padding:5px 20px;border-bottom: 1px solid #eee;flex-direction: column;"
                                @click="openImage(x)">
                            <div class="card-text-title"
                                    style="margin:0 auto;line-height:24px;height:24px;text-overflow:ellipsis;white-space: nowrap;">
                                <span style="text-align:center;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{x.clientbnameEN}}</span>
                            </div>
                            <div class="card-text-title"
                                    style="margin:0 auto;line-height: 20px;height: 20px;color: #6a6a6a;">
                                <span style="font-size: 16px;text-align:right">{{x.finishdate | timefilter}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="x.image"
                            style="width: 46px;height: 46px;box-shadow: 1px 1px 5px;position: absolute;right:14px;top:2px;border-radius: 100%;overflow: hidden;background: #fff;"
                            @click="openImage(x)">
                        <img :src="x.image | imgurl"
                                alt="clientPic"
                                style="width: 100%;height: 100%;object-fit: contain;"
                                v-on:error.once="loadDefault($event)">
                    </div>
                    <div>
                        <div v-if="x.isReturn">
                            <div v-if="lang === 'ch'"
                                v-show="x.note"
                                class="card-text"
                                @click="upload(x)"
                                style="background: #ffff006e;">
                                <div class="card-text-left">
                                    <span>{{language.detailPage.note}}: </span>
                                </div>
                                <div class="card-text-right">
                                    <span>{{x.note}}</span>
                                </div>
                            </div>
                            <div v-else
                                v-show="x.noteEN"
                                class="card-text"
                                @click="upload(x)"
                                style="background: #ffff006e;">
                                <div class="card-text-left">
                                    <span>{{language.detailPage.note}}: </span>
                                </div>
                                <div class="card-text-right">
                                    <span>{{x.noteEN}}</span>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div v-show="x.note"
                                class="card-text"
                                @click="upload(x)"
                                style="background: #ffff006e;">
                                <div class="card-text-left">
                                    <span>{{language.detailPage.note}}: </span>
                                </div>
                                <div class="card-text-right">
                                    <span>{{x.note}}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-text" style="padding:5px 20px 20px 20px">
                            <div class="card-text-left">
                                <span>{{language.detailPage.state}}: </span>
                            </div>
                            <div class="card-text-right">
                                <span style="color:#f9cf97"
                                        v-if="!x.finishdate">{{language.detailPage.shipping}}</span>
                                <span style="color:#99cc33"
                                        v-else>{{language.detailPage.finish}}</span>
                            </div>
                        </div>
                    </div>

                </md-ripple>
            </md-card>
        </div>
        

        <div class="emptyarea-top">
            <!-- 底部占位符 -->
        </div>

        <!-- upload dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <md-dialog :md-active.sync="uploadDialog"
                       @touchmove.prevent>

                <div class="dialogtop"
                     style="box-shadow: 0px 1px 5px;">
                    <div class="dialogtop-left"
                         @click="uploadDialog = false,cancel()">
                        <img src="../../public/icons/left.png"
                             alt="exit">
                        <span>{{language.detailPage.returnPage}}</span>
                    </div>
                    <div class="dialogtop-center">
                        <span>{{language.detailPage.confirm}}</span>
                    </div>
                    <div class="dialogtop-right"></div>
                </div>

                <div class="emptyarea-top">
                    <!-- 顶部占位符 -->
                </div>

                <div style="padding-top:12px">
                    <div class="photoarea"
                         @click="uploadFile"
                         v-if="!missionImage">
                        <div v-if="!updateImagePreview"
                             class="add_a_photo"></div>
                        <img :src="updateImagePreview"
                             alt="newimg"
                             v-else>
                    </div>
                    <div class="photoarea"
                         v-else>
                        <img :src="missionImage | imgurl"
                             alt="newimg">
                    </div>
                </div>

                <div class="namearea">
                    <span style="font-size:20px">{{dialogClientName}}</span>
                    <div class="confirmBox-body-center-input">
                        <div v-if="lang === 'ch'"
                             style="display: flex;flex-direction: column;display:-webkit-flex;align-items: center;">
                            <input type="number"
                                   placeholder="送货框数"
                                   v-model="outBasket"
                                   style="border: 1px solid #aa9d59;background-color: #ffffff8c;">
                            <input type="number"
                                   placeholder="收回框数"
                                   v-model="inBasket"
                                   style="border: 1px solid #aa9d59;background-color: #ffffff8c;">
                        </div>
                        <div v-else
                             style="display: flex;flex-direction: column;display:-webkit-flex;align-items: center;">
                            <input type="number"
                                   placeholder="Send out basket"
                                   v-model="outBasket"
                                   style="border: 1px solid #aa9d59;background-color: #ffffff8c;">
                            <input type="number"
                                   placeholder="Take back basket"
                                   v-model="inBasket"
                                   style="border: 1px solid #aa9d59;background-color: #ffffff8c;">
                        </div>
                    </div>
                </div>
                <div class="bottombutton"
                     v-if="!missionImage">
                    <div class="bottombutton-left"
                         @click="cancel">
                        <span>x</span>
                    </div>
                    <div class="bottombutton-right"
                         @click="confirm">
                        <span>o</span>
                    </div>
                </div>
                <div v-else
                     class="bottombutton">
                    <div class="bottombutton-center">
                        <span style="font-size:20px">{{language.detailPage.finish}}</span>
                        <br>
                        <span style="font-size:16px">{{finishDate | timefilter}}</span>
                    </div>
                </div>
            </md-dialog>
        </transition>
        <!-- upload dialog end -->
        <input type="file" style="display:none" id="upload_file" @change="fileChange($event)" accept="image/*">
        <!-- image dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="imageDialog" class="imageDialog" @click="imageDialog= false">
                <div>
                    <img :src="imageSrc | imgurl" alt="detailimg" v-on:error.once="loadDefault($event)">
                </div>
            </div>
        </transition>
        <!-- image dialog end -->

        <!-- err info box -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated bounceInDown"
                    leave-active-class="animated bounceOutUp">
            <div class="errinfo"
                 v-if="showError"
                 @click="closeErrorInfo">
                <span>{{errorInfo}}</span>
            </div>
        </transition>
        <!-- err info box -->
        <!-- confirm box  -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="confirmBox"
                 class="confirmBox"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="confirmBox"
                 class="confirmBox-back"
                 @click.self.prevent="confirmBox = false"
                 @touchmove.prevent>
                <div class="confirmBox-body">
                    <div v-if="isReturnItem" class="confirmBox-body-title">
                        <span>{{language.detailPage.confirmBox_info}}</span>
                    </div>
                    <div v-else class="confirmBox-body-title">
                        <span>Delivery Done</span>
                    </div>
                    <div class="confirmBox-body-frame">
                        <div class="confirmBox-body-center"
                            style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden">
                            <span>{{tempShiping}}</span>
                        </div>
                        <div v-if="!isReturnItem"
                            class="confirmBox-body-center-input">
                            <div v-if="lang === 'ch'">
                                <input type="number"
                                    placeholder="送货框数"
                                    v-model="outBasket">
                                <input type="number"
                                    placeholder="收回框数"
                                    v-model="inBasket">
                            </div>
                            <div v-else>
                                <input type="number"
                                    placeholder="Send out basket"
                                    v-model="outBasket">
                                <input type="number"
                                    placeholder="Take back basket"
                                    v-model="inBasket">
                            </div>
                        </div>
                        <div v-if="isReturnItem"
                            class="returnbox">
                            <div style="position:relative"
                                @click="changeReturnAccessMethod('returnAccess')">
                                <div class="returnbox-item">
                                    <span v-if="lang === 'ch'">退菜成功</span>
                                    <span v-else>Yes</span>
                                </div>
                                <transition name="custom-classes-transition"
                                            enter-active-class="animated fadeIn faster"
                                            leave-active-class="animated fadeOut faster">
                                    <div v-if="isReturnAccess"
                                        style="position:absolute;right:0;width:0;height:0;border-bottom: 30px solid #e22525;border-left: 30px solid transparent;top: 0;">
                                        <div class="returnbox-icon"></div>
                                    </div>
                                </transition>
                            </div>
                            <div style="position:relative;margin-left:10px"
                                @click="changeReturnAccessMethod('returnFail')">
                                <div class="returnbox-item">
                                    <span v-if="lang === 'ch'">退菜失败</span>
                                    <span v-else>No</span>
                                </div>
                                <transition name="custom-classes-transition"
                                            enter-active-class="animated fadeIn faster"
                                            leave-active-class="animated fadeOut faster">
                                    <div v-if="!isReturnAccess"
                                        style="position:absolute;right:0;width:0;height:0;border-bottom: 30px solid #e22525;border-left: 30px solid transparent;top: 0;">
                                        <div class="returnbox-icon"></div>
                                    </div>
                                </transition>
                            </div>
                        </div>
                        <div v-if="!isReturnAccess && isReturnItem" class="detail_reason">
                            <div class="detail_reason_item">
                                <div class="detail_reason_item_left">
                                    <input id="back_failed_reason1" type="radio" value="找不到" v-model="backFailedReason">
                                </div>
                                <label for="back_failed_reason1" class="detail_reason_item_right">
                                    <span v-if="lang === 'ch'">找不到要退的货物</span>
                                    <span v-else>Cant find</span>
                                </label>
                            </div>
                            <div class="detail_reason_item">
                                <div class="detail_reason_item_left">
                                    <input id="back_failed_reason2" type="radio" value="未拿出" v-model="backFailedReason">
                                </div>
                                <label for="back_failed_reason2" class="detail_reason_item_right">
                                    <span v-if="lang === 'ch'">客户并未拿出</span>
                                    <span v-else>Not in the specified location</span>
                                </label>
                            </div>
                            <div class="detail_reason_item">
                                <div class="detail_reason_item_left">
                                    <input id="back_failed_reason3" type="radio" value="其他" v-model="backFailedReason">
                                </div>
                                <label for="back_failed_reason3" class="detail_reason_item_right">
                                    <span v-if="lang === 'ch'">其他原因</span>
                                    <span v-else>Other</span>
                                </label>
                            </div>
                            <textarea v-if="backFailedReason === '其他'" v-model="backFailedReason_text"></textarea>
                        </div>
                    </div>
                    
                    <div class="confirmBox-body-bottom">
                        <div class="confirmBox-body-bottom-left"
                             @click="confirmBox = false">
                            <span>{{language.detailPage.confirmBox_cancel}}</span>
                        </div>
                        <div class="confirmBox-body-bottom-right"
                             @click="confirmTwiceMethod()">
                            <span>{{language.detailPage.confirmBox_confirm}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm box  -->

        <!-- confirm box twice start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="confirmTwiceBox"
                 class="confirmBox"
                 style="z-index: 25;"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="confirmTwiceBox"
                 class="confirmBox-back"
                 style="z-index: 26;"
                 @click.prevent.self="confirmTwiceBox = false"
                 @touchmove.prevent>
                <div class="confirmBox-body">
                    <div class="confirmBox-body-title">
                        <span v-if="lang === 'ch'">确认信息</span>
                        <span v-else>Confirm Info</span>
                    </div>

                    <div class="confirmBox-body-center"
                         style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden">
                        <span>{{tempShiping}}</span>
                    </div>
                    <div style="padding-bottom: 10px;font-size: 16px;padding-left:12px;padding-right:12px">
                        <div style="display:flex;display:-webkit-flex">
                            <div style="flex-basis: 70%;text-align: right;">
                                <span v-if="lang === 'ch'">送货框数：</span>
                                <span v-else>Send out basket:</span>
                            </div>
                            <div style="flex-basis: 30%;text-align: left;">
                                <span style="padding-left: 12px;">{{outBasket}}</span>
                            </div>
                        </div>
                        <div style="display:flex;display:-webkit-flex">
                            <div style="flex-basis: 70%;text-align: right;">
                                <span v-if="lang === 'ch'">收回框数：</span>
                                <span v-else>Take back basket:</span>
                            </div>
                            <div style="flex-basis: 30%;text-align: left">
                                <span style="padding-left: 12px;">{{inBasket}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="confirmBox-body-bottom">
                        <div class="confirmBox-body-bottom-left"
                             @click="confirmTwiceBox = false">
                            <span>{{language.detailPage.confirmBox_cancel}}</span>
                        </div>
                        <div class="confirmBox-body-bottom-right"
                             @click="noPicUpdate">
                            <span>{{language.detailPage.confirmBox_confirm}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm box twice end -->

        <!-- return pic confirm box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showReturnPicBox" class="confirmBox"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showReturnPicBox"
                 class="confirmBox-back"
                 @click.prevent.self="showReturnPicBox = false">
                <div class="confirmBox-body">
                    <div class="confirmBox-body-title">
                        <span v-if="lang === 'ch'">确认退货</span>
                        <span v-else>Confirm Return</span>
                    </div>
                    <div class="confirmBox-body-center"
                         style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden">
                        <span>{{tempShiping}}</span>
                    </div>
                    <div style="margin-top:20px;margin-bottom:20px">
                        <div class="photoarea"
                             style="width:120px;height:120px"
                             @click="uploadReturnImg"
                             v-if="!missionImage">
                            <div v-if="!updateImagePreview"
                                 class="add_a_photo"
                                 style="margin-top:24px"></div>
                            <img :src="updateImagePreview"
                                 alt="newimg"
                                 v-else>
                        </div>
                        <div class="photoarea"
                             v-else>
                            <img :src="missionImage | imgurl"
                                 alt="newimg">
                        </div>
                    </div>

                    <div class="confirmBox-body-bottom"
                         style="margin-top: 10px;">
                        <div class="confirmBox-body-bottom-left"
                             @click="showReturnPicBox = false">
                            <span>{{language.detailPage.confirmBox_cancel}}</span>
                        </div>
                        <div class="confirmBox-body-bottom-right"
                             @click="uploadReturnImgAndFinishMethod">
                            <span>{{language.detailPage.confirmBox_confirm}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <input type="file"
               id="return_file"
               style="display:none"
               @change="changeReturnImg($event)"
               accept="image/*">
        <!-- return pic confirm box end -->

        <!-- add client box start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowAddBox" class="confirmBox"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowAddBox" class="confirmBox-back" @click.prevent.self="isShowAddBox = false">
                <div class="confirmBox-body">
                    <div class="confirmBox-body-title">
                        <span v-if="lang === 'ch'">确认地点</span>
                        <span v-else>Check Position</span>
                    </div>
                    <div>
                        <!-- 1 -->
                        <div style="padding-top:12px">
                            <div class="photoarea" @click="uploadFile" v-if="!missionImage">
                                <div v-if="!updateImagePreview"
                                    class="add_a_photo"></div>
                                <img :src="updateImagePreview" alt="newimg" v-else>
                            </div>
                            <div class="photoarea" v-else>
                                <img :src="missionImage | imgurl" alt="newimg">
                            </div>
                        </div>
                        <!-- 1 -->
                    </div>
                    <div class="dt_add_body_frame">
                        <span>{{tempArr.missionline}} No.</span>
                        <span v-if="tempArr && tempArr.missionclient">{{tempArr.missionclient.length +1}}</span>
                    </div>
                    <div class="dt_add_body_bottom">
                        <div class="dt_button_white" @click="isShowAddBox = false">
                            <span>Cancel</span>
                        </div>
                        <div class="dt_button_white" style="margin-left: 8px;" @click="addClientWithTripsMethod()">
                            <span>Confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- add client box end -->

        <!-- confirm submit box start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowSubmitBox" class="confirmBox"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowSubmitBox" class="confirmBox-back" @click.prevent.self="isShowSubmitBox = false">
                <div class="submitbox_box">
                    <div class="confirmBox-body-title">
                        <span v-if="lang === 'ch'">确认地点</span>
                        <span v-else>Check Position</span>
                    </div>
                    <div class="submitbox_box_body">
                        <span v-if="lang === 'ch'">是否提交本次任务？</span>
                        <span v-else>Confirm to submit?</span>
                    </div>
                    <div class="dt_add_body_bottom" style="padding: 0 12px 12px 12px">
                        <div class="dt_button_white" @click="isShowSubmitBox = false">
                            <span>Cancel</span>
                        </div>
                        <div class="dt_button_white" style="margin-left: 8px" @click="confirmSubmitMethod()">
                            <span>Confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm submit box end -->

        <!-- tips box start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips box end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";
import lrz from "lrz";
import _ from "lodash";
import tipsBox from "../components/tipsBox"

export default {
    components:{
        tipsBox
    },

    created() {
        this.drivername = localStorage.getItem("drivername");
    },

    mounted() {
        this.missionGetOne()
    },

    data() {
        return {
            uploadDialog: false,
            updateImagePreview: "",
            updateImage: "",
            _id: "",
            returnPool_id: null,
            missionImage: "",
            dialogClientName: "",
            finishDate: "",
            imageDialog: false,
            imageSrc: "",
            needDoNum: 0,
            isClear: false,
            imgDefault: "/img/ebuyLogo.png",
            showError: false,
            errorInfo: "Get some error",
            confirmBox: false,
            confirmTwiceBox: false,
            tempShiping: "",
            inBasket: null,
            outBasket: null,
            clientName: null,
            isReturnAccess: true,
            isReturnItem: false,
            showReturnPicBox: false,
            backFailedReason: null,
            backFailedReason_text: null,
            tipsShowColor: null,
            tipsInfo:null,
            isShowTipsBox:null,
            isShowAddBox: false,
            tempMissionObj: null,
            isShowSubmitBox: false
        };
    },
    computed: {
        language() {
            return this.$store.getters.getLanguage;
        },
        tempArr: function() {
            return this.$store.state.tempArr;
        },
        lang() {
            return this.$store.state.lang;
        }
    },
    methods: {
        confirmSubmitMethod(){
            axios
            .post(config.server + "/mission/dt_submitMission",{
                _id: this.tempArr._id,
                finishDate: new Date()
            })
            .then(doc => {
                if(doc.data.code === 0){
                    this.isShowSubmitBox = false
                    this.missionGetOne()
                    this.$router.push("/dt");
                }else{
                    this.tipsShowColor = 'yellow'
                    if(this.lang === 'cn'){
                        this.tipsInfo = '更新失败'
                    }else{
                        this.tipsInfo = 'Update failed'
                    }
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false
                    }, 2000);
                }
            })
            .catch(err => {
                console.log(err)
            })
        },

        finishDtMethod(){
            this.isShowSubmitBox = true
        },

        addClientWithTripsMethod(){
            if(this.tempArr && this.tempArr.missionclient){
                let payload = new FormData();
                let date = new Date();
                let maxSize = 200 * 1024; //200KB
                lrz(this.updateImage, {
                    quality: 0.5
                })
                .then(res => {
                    if (this.updateImage.size > maxSize) {
                        this.updateImage = res.file;
                    }
                    let clientName = this.tempArr.missionclient.length + 1
                    clientName = this.tempArr.missionline+ '_No.' + clientName
                    payload.append("image", this.updateImage);
                    payload.append("_id", this.tempArr._id);
                    payload.append("finishDate", new Date());
                    payload.append("dialogClientName", clientName);
                    axios({
                        method: "post",
                        url: config.server + "/mission/dtAddClient",
                        data: payload,
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.isShowAddBox = false
                            this.missionGetOne();
                            this.tipsShowColor = 'green'
                            if(this.lang === 'cn'){
                                this.tipsInfo = '更新成功'
                            }else{
                                this.tipsInfo = 'Update success'
                            }
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }else{
                            this.tipsShowColor = 'yellow'
                            if(this.lang === 'cn'){
                                this.tipsInfo = '更新失败'
                            }else{
                                this.tipsInfo = 'Update failed'
                            }
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
            }else{
                this.$router.push("/dt");
            }
            
        },

        addClentMethod(){
            if(this.tempArr && this.tempArr.missionclient){
                console.log(this.tempArr)
                this.isShowAddBox = true
            }else{
                this.$router.push("/dt");
            }
        },

        uploadReturnImgAndFinishMethod() {
            //
            if (!this.updateImagePreview) {
                if (this.lang === "ch") {
                    this.errorInfo = "请上传照片";
                } else {
                    this.errorInfo = "please upload photo";
                }
                this.showError = true;
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            } else {
                let payload = new FormData();
                let date = new Date();
                let maxSize = 200 * 1024; //200KB
                lrz(this.updateImage, {
                    quality: 0.5
                })
                    .then(res => {
                        if (this.updateImage.size > maxSize) {
                            this.updateImage = res.file;
                        }
                        payload.append("image", this.updateImage);
                        payload.append("outBasket", 0);
                        payload.append("inBasket", 0);
                        payload.append("_id", this.tempArr._id);
                        payload.append("dialogClientName", this.clientName);
                        payload.append("isReturn", this.isReturnItem);
                        payload.append("returnPool_id", this.returnPool_id)
                        axios({
                            method: "post",
                            url: config.server + "/client-driver/update",
                            data: payload,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        })
                            .then(doc => {
                                if (doc.data.code == 0) {
                                    this.showReturnPicBox = false;
                                    this.updateImagePreview = "";
                                    this.showError = true;
                                    this.errorInfo = this.language.detailPage.missionSuccess;
                                    this.missionGetOne();
                                    //修改夜班加单状态
                                    let tempDate = new Date().toISOString();
                                    axios
                                        .post(config.server + "/customerService/finish", {
                                            clientName: this.clientName,
                                            mission_id: this.tempArr._id,
                                            returnPool_id: this.returnPool_id,
                                            finishiDate: tempDate,
                                            isReturnDone: this.isReturnAccess
                                        })
                                        .then(doc => {
                                            console.log('修改夜班加单状态')
                                            if(this.isReturnAccess){
                                                console.log('into if')
                                                this.sendBackCustomerService(tempDate)
                                            }
                                            console.log(doc)
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        })
                                    //修改夜班加单状态
                                } else {
                                    this.showError = true;
                                    this.errorInfo = this.language.detailPage.missionError;
                                }
                                setTimeout(() => {
                                    this.showError = false;
                                }, 3000);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        console.log("lrz err");
                        console.log(err);
                    });
            }
            //
        },

        changeReturnImg(el) {
            if (typeof FileReader === "undefined") {
                return alert("浏览器不支持上传图片");
            }
            if (!el.target.files[0].size) return; //判断是否有文件数量
            this.updateImagePreview = window.URL.createObjectURL(
                el.target.files[0]
            );
            this.updateImage = el.target.files[0];
            el.target.value = "";
        },

        uploadReturnImg() {
            document.getElementById("return_file").click();
        },

        changeReturnAccessMethod(item) {
            if (item === "returnAccess") {
                this.isReturnAccess = true;
            } else {
                this.isReturnAccess = false;
            }
        },

        sendBackCustomerService(tempDate){
            axios
                .post(config.server + "/customerService/errorID", {
                    mission_id:this.tempArr._id,
                    clientName: this.clientName,
                    finishiDate:tempDate
                })
                .then(doc => {
                    console.log(doc)
                    console.log(doc.data.doc.errorID)
                    console.log('doc.errorID')
                    axios
                        .post(config.customerServiceAddress + "/errorRecords/update/" + doc.data.doc.errorID,{
                                ifSolved:true,
                                solution:'司机取回' + this.drivername
                        })
                        .then(customerInfo => {
                            console.log(customerInfo)
                            if(customerInfo.data.status === 0){
                                if(this.lang === 'ch'){
                                    this.errorInfo = "已成功通知客服"
                                }else{
                                    this.errorInfo = "Send to customer service log"
                                }
                                this.showError = true
                                setTimeout(() => {
                                    this.showError = false
                                }, 2000);
                            }else{
                                if(this.lang === 'ch'){
                                    this.errorInfo = "信息发送至客服失败"
                                }else{
                                    this.errorInfo = "Send to customer service log failed"
                                }
                                this.showError = true
                                setTimeout(() => {
                                    this.showError = false
                                }, 2000);
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
            
            
        },

        confirmTwiceMethod() {
            if (this.isReturnItem) {
                if (this.isReturnAccess) {
                    this.showReturnPicBox = true
                    this.confirmBox = false
                } else {
                    let tempDate = new Date().toISOString();
                    let driverNote = null
                    if(this.backFailedReason === '其他'){
                        if(this.backFailedReason_text){
                            driverNote = this.backFailedReason_text
                            let tempDate = new Date().toISOString();
                            axios
                                .post(config.server + "/customerService/finish", {
                                    clientName: this.clientName,
                                    mission_id: this.tempArr._id,
                                    returnPool_id: this.returnPool_id,
                                    finishiDate: tempDate,
                                    isReturnDone: this.isReturnAccess,
                                    driverNote:driverNote
                                })
                                .then(doc => {
                                    console.log(doc);
                                    let tempKey = true;
                                    this.outBasket = 0;
                                    this.inBasket = 0;
                                    //获取用户位置
                                    let tempPosition;
                                    if (navigator.geolocation) {
                                        navigator.geolocation.getCurrentPosition(
                                            function(position) {
                                                tempPosition = {
                                                    lat: position.coords.latitude,
                                                    lng: position.coords.longitude
                                                };
                                            }
                                        );
                                    } else {
                                        // Browser doesn't support
                                        alert("不支持定位功能");
                                        console.log("browser doesnt support geolocation");
                                    }
                                    

                                    setTimeout(() => {
                                        axios
                                            .post(config.server +"/client-driver/exupdate",{
                                                    _id: this.tempArr._id,
                                                    clientName: this.clientName,
                                                    position: tempPosition,
                                                    outBasket: this.outBasket,
                                                    inBasket: this.inBasket,
                                                    date: tempDate,
                                                    driverName: this.drivername,
                                                    lineName: this.tempArr.missionline,
                                                    isReturn:this.isReturnItem,
                                                    returnPool_id: this.returnPool_id,
                                                })
                                            .then(doc => {
                                                if (doc.data.code === 0) {
                                                    this.missionGetOne();
                                                    this.confirmBox = false;
                                                    this.showError = true;
                                                    this.errorInfo = this.language.detailPage.missionSuccess;
                                                    this.confirmTwiceBox = false;
                                                } else {
                                                    this.showError = true;
                                                    this.errorInfo = this.language.detailPage.missionError;
                                                }
                                                setTimeout(() => {
                                                    this.showError = false;
                                                }, 3000);
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            });
                                    }, 200);
                                    //
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }else{
                            this.tipsShowColor = 'yellow'
                            if(this.lang === 'ch'){
                                this.tipsInfo = '请输入原因'
                            }else{
                                this.tipsInfo = 'Please input reason'
                            }
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 3000);
                        }
                    }else{
                        driverNote = this.backFailedReason
                        let tempDate = new Date().toISOString();
                        axios
                        .post(config.server + "/customerService/finish", {
                            clientName: this.clientName,
                            mission_id: this.tempArr._id,
                            returnPool_id: this.returnPool_id,
                            finishiDate: tempDate,
                            isReturnDone: this.isReturnAccess,
                            driverNote:driverNote
                        })
                        .then(doc => {
                            console.log(doc);
                            let tempKey = true;
                            this.outBasket = 0;
                            this.inBasket = 0;
                            //获取用户位置
                            let tempPosition;
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                    function(position) {
                                        tempPosition = {
                                            lat: position.coords.latitude,
                                            lng: position.coords.longitude
                                        };
                                    }
                                );
                            } else {
                                // Browser doesn't support
                                alert("不支持定位功能");
                                console.log("browser doesnt support geolocation");
                            }
                            setTimeout(() => {
                                axios
                                    .post(config.server +"/client-driver/exupdate",{
                                            _id: this.tempArr._id,
                                            clientName: this.clientName,
                                            position: tempPosition,
                                            outBasket: this.outBasket,
                                            inBasket: this.inBasket,
                                            date: tempDate,
                                            driverName: this.drivername,
                                            lineName: this.tempArr.missionline,
                                            isReturn:this.isReturnItem,
                                            returnPool_id: this.returnPool_id,
                                        })
                                    .then(doc => {
                                        if (doc.data.code === 0) {
                                            this.missionGetOne();
                                            this.confirmBox = false;
                                            this.showError = true;
                                            this.errorInfo = this.language.detailPage.missionSuccess;
                                            this.confirmTwiceBox = false;
                                        } else {
                                            this.showError = true;
                                            this.errorInfo = this.language.detailPage.missionError;
                                        }
                                        setTimeout(() => {
                                            this.showError = false;
                                        }, 3000);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            }, 200);
                            //
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
                }
            } else {
                if (!this.inBasket || !this.outBasket) {
                    this.showError = true;
                    if (this.lang === "ch") {
                        this.errorInfo = "请填写框数";
                    } else {
                        this.errorInfo = "Please input number";
                    }
                    setTimeout(() => {
                        this.showError = false;
                    }, 3000);
                } else {
                    this.confirmTwiceBox = true;
                }
            }
        },

        getPositionMethod() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    let temp = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            } else {
                // Browser doesn't support
                alert("不支持定位功能");
                console.log("browser doesnt support geolocation");
            }
        },
        closeErrorInfo() {
            this.showError = false;
        },

        openConfirmBoxMethod(x) {
            this.isReturnItem = x.isReturn;
            this.inBasket = null;
            this.outBasket = null;
            this.confirmBox = true;
            this.clientName = x.clientbname;
            this.returnPool_id = x.returnPool_id
            console.log(x)
            if (this.lang === "ch") {
                this.tempShiping = x.clientbname;
            } else {
                this.tempShiping = x.clientbnameEN;
            }
        },

        noPicUpdate() {
            if (!this.inBasket || !this.outBasket) {
                console.log("into wrong");
                this.showError = true;
                if (this.lang === "ch") {
                    this.errorInfo = "请填写框数";
                } else {
                    this.errorInfo = "Please input number";
                }
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            } else {
                //获取用户位置
                let tempPosition;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(
                        position
                    ) {
                        tempPosition = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                    });
                } else {
                    // Browser doesn't support
                    alert("不支持定位功能");
                    console.log("browser doesnt support geolocation");
                }
                let tempDate = new Date().toISOString();

                setTimeout(() => {
                    axios
                        .post(config.server + "/client-driver/exupdate", {
                            _id: this.tempArr._id,
                            clientName: this.clientName,
                            position: tempPosition,
                            outBasket: this.outBasket,
                            inBasket: this.inBasket,
                            date: tempDate,
                            driverName: this.drivername,
                            lineName: this.tempArr.missionline,
                            isReturn:this.isReturnItem
                        })
                        .then(doc => {
                            if (doc.data.code === 0) {
                                console.log('123')
                                this.missionGetOne();
                                this.confirmBox = false;
                                this.showError = true;
                                this.errorInfo = this.language.detailPage.missionSuccess;
                                this.confirmTwiceBox = false;
                            } else {
                                this.showError = true;
                                this.errorInfo = this.language.detailPage.missionError;
                            }
                            setTimeout(() => {
                                this.showError = false;
                            }, 3000);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }, 200);
            }
        },

        loadDefault(e) {
            e.currentTarget.src = this.imgDefault;
        },
        openImage(item) {
            if (item.image) {
                this.imageDialog = true;
                this.imageSrc = item.image;
            }
        },
        missionGetOne() {
            axios
                .post(config.server + "/mission/one/", {
                    _id: this.tempArr._id
                })
                .then(doc => {
                    let tempNum = 0;
                    console.log(doc)
                    this.tempMissionObj = doc.data
                    this.$store.dispatch("setTempArr", doc.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        turnback() {
            this.$store.dispatch("setShowButtom", true);
            this.$router.push("/dt");
        },

        fileChange(el) {
            if (typeof FileReader === "undefined") {
                return alert("浏览器不支持上传图片");
            }
            if (!el.target.files[0].size) return; //判断是否有文件数量
            this.updateImagePreview = window.URL.createObjectURL(
                el.target.files[0]
            );
            this.updateImage = el.target.files[0];
            el.target.value = "";
        },
        
        uploadFile() {
            document.getElementById("upload_file").click();
        },

        upload(x) {
            this.uploadDialog = true;
            this.dialogClientName = x.clientbname;
            this._id = this.tempArr._id;
            this.missionImage = x.finishphoto;
            this.finishDate = x.finishdate;
        },

        cancel() {
            this.updateImagePreview = null;
        },

        confirm() {
            if (!this.outBasket || !this.inBasket) {
                this.showError = true;
                if (this.lang === "ch") {
                    this.errorInfo = "请填写框数";
                } else {
                    this.errorInfo = "please input basket number";
                }
            } else {
                if (!this.updateImagePreview) {
                    let arrow = document.querySelector(".photoarea");
                    arrow.style = "border: 3px dashed red";
                    arrow.style.transition = "1s";
                    setTimeout(() => {
                        arrow.style = "border: 3px dashed #696969";
                        arrow.style.transition = "1s";
                    }, 2000);
                } else {
                    let payload = new FormData();
                    let date = new Date();
                    let maxSize = 200 * 1024; //200KB
                    lrz(this.updateImage, {
                        quality: 0.5
                    })
                        .then(res => {
                            if (this.updateImage.size > maxSize) {
                                this.updateImage = res.file;
                            }
                            payload.append("image", this.updateImage);
                            payload.append("outBasket", this.outBasket);
                            payload.append("inBasket", this.inBasket);
                            payload.append("_id", this._id);
                            payload.append(
                                "dialogClientName",
                                this.dialogClientName
                            );
                            axios({
                                method: "post",
                                url: config.server + "/client-driver/update",
                                data: payload,
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            })
                                .then(doc => {
                                    if (doc.data.code == 0) {
                                        this.uploadDialog = false;
                                        this.updateImagePreview = "";
                                        this.showError = true;
                                        this.errorInfo = this.language.detailPage.missionSuccess;
                                        this.missionGetOne();
                                    } else {
                                        this.showError = true;
                                        this.errorInfo = this.language.detailPage.missionError;
                                    }
                                    setTimeout(() => {
                                        this.showError = false;
                                    }, 3000);
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        })
                        .catch(err => {
                            console.log("lrz err");
                            console.log(err);
                        });
                }
            }
        }
    }
};
</script>

<style scoped>
.emptyarea-top {
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

.topusername-left img {
    width: 20px;
    padding-bottom: 4px;
}

.topusername-left span {
    font-size: 18px;
    color: #fff;
    line-height: 30px;
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
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.card-text {
    text-align: left;
    padding: 5px 20px;
    font-size: 18px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    word-wrap: break-word;
}

.card-text-left {
    flex-basis: 30%;
    font-size: 16px;
    text-align: right;
}

.card-text-right {
    flex-basis: 70%;
    padding-left: 10px;
    min-width: 160px;
    font-size: 16px;
}

.card-camera {
    text-align: right;
    position: absolute;
    bottom: 10px;
    right: 13px;
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
    width: 120px;
    height: 120px;
    background-color: #eee;
    border-radius: 10px;
}

.photoarea img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.namearea {
    text-align: center;
    padding-top: 50px;
    height: 170px;
    line-height: 30px;
    font-weight: bold;
    background-image: url(/img/wood.9ee20abe.png);
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 250px 170px;
}

.bottombutton {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    margin: 40px 0;
}

.bottombutton-left {
    flex-basis: 40%;
    margin: 0 auto;
    text-align: center;
    border: 3px solid #696969;
    border-radius: 40px;
    padding: 20px 0;
    background-color: #d74342;
}

.bottombutton-left span {
    font-size: 85px;
    color: #fff;
    font-weight: 700;
}

.bottombutton-right {
    flex-basis: 40%;
    margin: 0 auto;
    text-align: center;
    border: 3px solid #696969;
    border-radius: 40px;
    padding: 25px 0;
    background-color: #2ca81c;
}

.bottombutton-right span {
    font-size: 100px;
    color: #fff;
    font-weight: 700;
}

.bottombutton-center {
    flex-basis: 40%;
    margin: 0 auto;
    text-align: center;
    border: 3px solid #696969;
    border-radius: 40px;
    padding: 25px 0;
    background-color: #2ca81c;
}

.bottombutton-center span {
    font-size: 25px;
    color: #fff;
    font-weight: 600;
}

.imageDialog {
    background-color: #000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 30;
}

.imageDialog div {
    position: relative;
    top: 15%;
}

.date_rangeicon {
    background: var(--md-theme-default-icon-on-background, rgba(0, 0, 0, 0.54));
    background-size: 48px 48px;
    mask-image: url(../../public/icons/baseline-camera_alt-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-camera_alt-24px.svg);
    width: 48px;
    height: 48px;
}
.date_done {
    background: var(--md-theme-default-icon-on-background, rgba(0, 0, 0, 0.54));
    background-size: 48px 48px;
    mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    width: 48px;
    height: 48px;
}

.add_a_photo {
    background: var(--md-theme-default-icon-on-background, rgba(0, 0, 0, 0.54));
    mask-image: url(../../public/icons/baseline-add_a_photo-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-add_a_photo-24px.svg);
    width: 72px;
    height: 72px;
    margin: 0 auto;
    margin-top: 20px;
}

.errinfo {
    position: fixed;
    z-index: 24;
    top: 8px;
    background-color: rgba(255, 255, 0, 0.6);
    width: 100%;
}

.errinfo span {
    font-size: 16px;
    line-height: 32px;
}

.confirmBox {
    position: fixed;
    background: rgba(0, 0, 0, 0.2);
    z-index: 23;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.confirmBox-back {
    position: fixed;
    z-index: 24;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.confirmBox-body {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background: #fff;
    width: 250px;
    border-radius: 10px;
    overflow: hidden;
}

.confirmBox-body-title {
    background: #d74342;
    color: #fff;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.confirmBox-body-frame{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border: 1px solid #eee;
    border-radius: 10px;
    margin: 8px;
    padding: 8px;
}

.confirmBox-body-center {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #e0e0e0;
}

.confirmBox-body-center-input {
    padding-bottom: 10px;
}

.confirmBox-body-center-input input {
    height: 30px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    outline: none;
    text-align: center;
    margin: 5px 0;
    font-size: 16px;
    width: 160px;
}

.confirmBox-body-bottom {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 10px;
}

.confirmBox-body-bottom-left {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 100px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #eee;
}

.confirmBox-body-bottom-right {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    width: 100px;
    font-size: 16px;
    height: 32px;
    line-height: 32px;
    margin-left: 10px;
    border-radius: 10px;
    border: 1px solid #eee;
}

.returnbox {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    justify-content: center;
    margin-top: 16px;
    margin-bottom: 12px;
}

.returnbox-item {
    border: 1px solid #eee;
    height: 30px;
    line-height: 30px;
    width: 100px;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 4px;
}

.returnbox-icon {
    border: none;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    position: relative;
    height: 8px;
    width: 12px;
    z-index: 26;
    left: -15px;
    right: 12px;
    top: 14px;
    transform: rotate(-57deg);
}

.return-icon {
    background-image: url(../../public/img/return-icon.png);
    position: absolute;
    font-size: 40px;
    color: #fff;
    border-radius: 100%;
    height: 80px;
    width: 80px;
    line-height: 80px;
    transform: rotate(-16deg);
    top: 60px;
    left: 4px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80px 80px;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.detail_reason textarea {
    border-radius: 5px;
}

.detail_reason_item{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.detail_reason_item_left{
    padding-top: 2px;
}

.detail_reason_item_left input{
    height: 20px;
    width: 30px;
}

.detail_reason_item_right{
    width: 180px;
    height: 30px;
    line-height: 30px;
    text-align: left;
}

.dt_top_frame{
    display: flex;
    justify-content: center;
}

.dt_topButton{
    height: 40px;
    line-height: 40px;
    width: 120px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 10px;
    cursor: pointer;
}

.dt_add_body_frame{
    margin: 12px;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.dt_add_body_bottom{
    display: flex;
    padding-bottom: 12px;
    justify-content: center;
}

.dt_button_white{
    height: 30px;
    line-height: 30px;
    border: 1px solid #eee;
    width: 100px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.dt_right_button{
    border-radius: 8px;
    border: 1px solid #eee;
    color: #d74342;
    width: 46px;
    background-color: #fff;
    height: 30px;
    line-height: 28px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    font-size: 16px;
}
.submitbox_box{
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}
.submitbox_box_body{
    margin: 12px;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}
</style>
