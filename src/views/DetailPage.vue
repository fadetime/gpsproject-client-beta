<template>
    <div id="detail-page">
        <div style="position:fixed;top:-20px;width:100%;height:70px;background-color:#fff;z-index:9"></div>
        <div class="topusername"
             style="box-shadow: 0px 1px 5px;">
            <div class="topusername-left"
                 @click="turnback">
                <img src="../../public/icons/left.png"
                     alt="exit">
                <span>{{language.detailPage.returnPage}}</span>
            </div>
            <div class="topusername-center">
                <span>{{tempArr.missionline}}</span>
            </div>
            <div class="topusername-right"></div>
        </div>

        <div class="emptyarea-top">
            <!-- 顶部占位符 -->
        </div>
        <div v-if="isClear"
             style="padding-top: 20px;">
            <div>
                <img src="../../public/img/ebuyLogo.png"
                     alt="logo"
                     style="width:200px;">
            </div>
            <div style="padding-top:20px">
                <span>~~{{language.detailPage.whenEmpty}}~~</span>
            </div>
        </div>
        <div v-else>
            <md-card md-with-hover
                     style="width:80%;margin:10px auto;"
                     v-for="(x,no) in tempArr.missionclient"
                     :key="no"
                     v-show="!x.finishdate">
                <md-ripple>
                    <!-- <div style="background-color: #d74342;width: 50px;height: 50px;border-radius: 0 0 50px 0;box-shadow: 1px 1px 5px;position: absolute;" @click="openImage(x)">
                        <span style="font-size:20px;color:#fff;font-weight: 800;line-height: 40px;">{{no+1}}</span>
                    </div> -->
                    <div>
                        <div v-if="lang === 'en'"
                             class="card-text"
                             style="padding:5px 20px;border-bottom: 1px solid #eee;flex-direction: column;"
                             @click="openImage(x)">
                            <div class="card-text-title"
                                 style="margin:0 auto;line-height:24px;height:24px;text-overflow:ellipsis;white-space: nowrap;">
                                <span style="text-align:center;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{x.clientbnameEN}}</span>
                            </div>
                            <div class="card-text-title"
                                 style="margin:0 auto;line-height: 20px;height: 20px;color: #6a6a6a;">
                                <span style="font-size: 16px;text-align:right">{{x.clientbname}}</span>
                            </div>
                        </div>
                        <div v-else
                             class="card-text"
                             style="padding:5px 20px;border-bottom: 1px solid #eee;flex-direction: column;"
                             @click="openImage(x)">
                            <div class="card-text-title"
                                 style="margin:0 auto;line-height:24px;height:24px;text-overflow:ellipsis;white-space: nowrap;">
                                <span style="text-align:right">{{x.clientbname}}</span>
                            </div>
                            <div class="card-text-title"
                                 style="margin:0 auto;line-height: 20px;height: 20px;color: #6a6a6a;">
                                <span style="font-size: 16px;text-align:right;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{x.clientbnameEN}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="x.isReturn"
                         class="return-icon">
                        <span v-if="lang === 'ch'">退</span>
                        <span v-else
                              style="font-size: 50px">R</span>
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
                        <div class="card-text"
                             @click="upload(x)"
                             v-if="x.timeLimit">
                            <div class="card-text-left">
                                <span>{{language.detailPage.timeLimit}}:</span>
                            </div>
                            <div class="card-text-right">
                                <span>{{x.timeLimit}}</span>
                            </div>
                        </div>
                        <div class="card-text"
                             @click="upload(x)">
                            <div class="card-text-left">
                                <span>{{language.detailPage.address}}:</span>
                            </div>
                            <div class="card-text-right">
                                <span>{{x.clientbaddress}}</span>
                            </div>
                        </div>

                        <div class="card-text"
                             @click="upload(x)">
                            <div class="card-text-left">
                                <span>{{language.detailPage.contact}}: </span>
                            </div>
                            <div class="card-text-right">
                                <span>{{x.clientbphone}}</span>
                            </div>
                        </div>

                        <div class="card-text"
                             @click="upload(x)">
                            <div class="card-text-left">
                                <span>{{language.detailPage.postCode}}: </span>
                            </div>
                            <div class="card-text-right">
                                <span>{{x.clientbpostcode}}</span>
                            </div>
                        </div>
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
                        
                        <div class="card-text"
                             style="padding:5px 20px 20px 20px"
                             @click="upload(x)">
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

                        <div class="card-camera"
                             @click.prevent.self="upload(x)">
                            <div v-if="x.isNeedPic"
                                 class="date_rangeicon"
                                 @click="upload(x)"></div>
                            <div v-else
                                 class="date_done"
                                 @click="openConfirmBoxMethod(x)"></div>
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

                <input type="file"
                       style="display:none"
                       id="upload_file"
                       @change="fileChange($event)"
                       accept="image/*">

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

        <!-- image dialog start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="imageDialog"
                 class="imageDialog"
                 @click="imageDialog= false">
                <div>
                    <img :src="imageSrc | imgurl"
                         alt="detailimg"
                         v-on:error.once="loadDefault($event)">
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
                 @click.prevent.self="confirmBox = false"
                 @touchmove.prevent>
                <div class="confirmBox-body">
                    <div class="confirmBox-body-title">
                        <span>{{language.detailPage.confirmBox_info}}</span>
                    </div>
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
                                <span v-else>Done</span>
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
                                <span v-else>Fail</span>
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
            <div v-if="showReturnPicBox"
                 class="confirmBox"></div>
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

    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";
import lrz from "lrz";
import _ from "lodash";

export default {
    created() {
        this.drivername = localStorage.getItem("drivername");
    },
    mounted() {
        this.missionGetOne();
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
            showReturnPicBox: false
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

                        // _id: this.tempArr._id,
                        // clientName: this.clientName,
                        // position: tempPosition,
                        // outBasket: this.outBasket,
                        // inBasket: this.inBasket,
                        // date: tempDate,
                        // driverName: this.drivername,
                        // lineName: this.tempArr.missionline

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
                    axios
                        .post(config.server + "/customerService/finish", {
                            clientName: this.clientName,
                            mission_id: this.tempArr._id,
                            returnPool_id: this.returnPool_id,
                            finishiDate: tempDate,
                            isReturnDone: this.isReturnAccess
                        })
                        .then(doc => {
                            console.log(doc);
                            let tempKey = true;
                            // if(isReturnDone){
                            //     this.sendBackCustomerService(tempDate)
                            // }
                            //
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
                            let tempDate = new Date().toISOString();

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
                    doc.data.missionclient.forEach(element => {
                        if (!element.finishdate) {
                            tempNum += 1;
                        }
                    });
                    if (tempNum === 0) {
                        this.isClear = true;
                    } else {
                        this.isClear = false;
                    }
                    doc.data.missionclient = _.orderBy(
                        doc.data.missionclient,
                        ["finishdate"],
                        ["desc"]
                    );
                    this.$store.dispatch("setTempArr", doc.data);
                })
                .catch(err => {
                    console.log(err);
                });

            axios
                .post(config.server + "/client-driver/", {
                    startdate: new Date().toLocaleDateString(),
                    drivername: this.drivername
                })
                .then(doc => {
                    this.needDoNum = 0;
                    this.allMission = doc.data.doc;
                    doc.data.doc.forEach(elementX => {
                        elementX.missionclient.forEach(elementY => {
                            if (!elementY.finishdate) {
                                this.needDoNum += 1;
                            }
                        });
                    });
                    this.$store.dispatch("setDoNum", this.needDoNum);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        turnback() {
            this.$store.dispatch("setShowButtom", true);
            this.$router.push("/");
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
    width: 250px;
    height: 250px;
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
    margin-top: 75px;
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

.confirmBox-body-center {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #e0e0e0;
    width: 80%;
    margin: 10px auto;
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
    margin-top: 20px;
    margin-bottom: 20px;
}

.returnbox-item {
    border: 1px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
    width: 80px;
    position: relative;
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
</style>
