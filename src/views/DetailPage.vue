<template>
    <div id="detail-page">
        <div class="topusername" style="box-shadow: 0px 1px 5px;">
            <div class="topusername-left" @click="turnback">
                <img src="../../public/icons/left.png" alt="exit">
                <span>返回</span>
            </div>
            <div class="topusername-center">
                <span>{{tempArr.missionline}}</span>
            </div>
            <div class="topusername-right"></div>
        </div>

        <div class="emptyarea-top">
            <!-- 顶部占位符 -->
        </div>

        <div v-if="isClear" style="padding-top: 20px;">
            <div>
                <img src="../../public/img/ebuyLogo.png" alt="logo" style="width:200px;">
            </div>
            <div style="padding-top:20px">
                <span>~~所有客户已送达~~</span>
            </div>
        </div>
        <div v-else>
            <md-card md-with-hover style="width:80%;margin:10px auto;" v-for="(x,no) in tempArr.missionclient" :key="no" v-if="!x.finishdate">
            <md-ripple>
                <div style="background-color: #d74342;width: 50px;height: 50px;border-radius: 0 0 50px 0;box-shadow: 1px 1px 5px;position: absolute;" @click="openImage(x)">
                    <span style="font-size:20px;color:#fff;font-weight: 800;line-height: 40px;">{{no+1}}</span>
                </div>
                <div class="card-text" style="padding:5px 20px;border-bottom: 1px solid #eee;" @click="openImage(x)">
                    <div class="card-text-title" style="margin:0 auto;line-height: 40px;">
                        <span style="text-align:right">{{x.clientbname}}</span>
                    </div>
                </div>

                <div style="width: 46px;height: 46px;box-shadow: 1px 1px 5px;position: absolute;right:14px;top:2px;border-radius: 100%;overflow: hidden;" @click="openImage(x)">
                    <img :src="x.image | imgurl" alt="clientPic" style="width: 100%;height: 100%;object-fit: contain;">
                </div>
                <div @click="upload(x)">
                    <div class="card-text">
                        <div class="card-text-left">
                            <span>Address:</span>
                        </div>
                        <div class="card-text-right">
                            <span>{{x.clientbaddress}}</span>
                        </div>
                    </div>

                    <div class="card-text">
                        <div class="card-text-left">
                            <span>Contact: </span>
                        </div>
                        <div class="card-text-right">
                            <span>{{x.clientbphone}}</span>
                        </div>
                    </div>

                    <div class="card-text">
                        <div class="card-text-left">
                            <span>PostCode: </span>
                        </div>
                        <div class="card-text-right">
                            <span>{{x.clientbpostcode}}</span>
                        </div>
                    </div>

                    <div class="card-text" style="padding:5px 20px 20px 20px">
                        <div class="card-text-left">
                            <span>State: </span>
                        </div>
                        <div class="card-text-right">
                            <span style="color:#f9cf97" v-if="!x.finishdate">Shipping</span>
                            <span style="color:#99cc33" v-else>finish</span>
                        </div>
                    </div>

                    <div class="card-camera">
                        <div class="date_rangeicon"></div>
                    </div>
                </div>

            </md-ripple>
        </md-card>
        </div>
        

        <div class="emptyarea-top">
            <!-- 底部占位符 -->
        </div>

        <!-- upload dialog start -->
        <md-dialog :md-active.sync="uploadDialog">

            <div class="dialogtop" style="box-shadow: 0px 1px 5px;">
                <div class="dialogtop-left" @click="uploadDialog = false,cancel()">
                    <img src="../../public/icons/left.png" alt="exit">
                    <span>返回</span>
                </div>
                <div class="dialogtop-center">
                    <span>确认完成</span>
                </div>
                <div class="dialogtop-right"></div>
            </div>

            <div class="emptyarea-top">
                <!-- 顶部占位符 -->
            </div>

            <div style="padding-top:40px">
                <div class="photoarea" @click="uploadFile" v-if="!missionImage">
                    <md-icon class="md-size-3x" style="padding-top:110px" v-if="!updateImagePreview">add_a_photo</md-icon>
                    <img :src="updateImagePreview" alt="newimg" v-else>
                </div>
                <div class="photoarea" v-else>
                    <img :src="missionImage | imgurl" alt="newimg">
                </div>
            </div>

            <div class="namearea">
                <span style="font-size:20px">{{dialogClientName}}</span>
            </div>

            <input type="file" style="display:none" id="upload_file" @change="fileChange($event)" accept="image/*">

            <div class="bottombutton" v-if="!missionImage">
                <div class="bottombutton-left" @click="cancel">
                    <span>x</span>
                </div>
                <div class="bottombutton-right" @click="confirm">
                    <span>o</span>
                </div>
            </div>
            <div v-else class="bottombutton">
                <div class="bottombutton-center">
                    <span style="font-size:20px">已完成</span>
                    <br>
                    <span style="font-size:16px">{{finishDate | timefilter}}</span>
                </div>
            </div>
        </md-dialog>
        <!-- upload dialog end -->
        <!-- image dialog start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div v-if="imageDialog" class="imageDialog" @click="imageDialog= false">
                <div>
                    <img :src="imageSrc | imgurl" alt="detailimg">
                </div>

            </div>
        </transition>
        <!-- image dialog end -->
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
        this.missionGetOne()
    },
    data() {
        return {
            uploadDialog: false,
            updateImagePreview: "",
            updateImage: "",
            _id: "",
            missionImage: "",
            dialogClientName: "",
            finishDate: "",
            imageDialog: false,
            imageSrc: "",
            needDoNum: 0,
            isClear:false
        };
    },
    computed: {
        tempArr: function() {
            return this.$store.state.tempArr;
        }
    },
    methods: {
        openImage(item) {
            this.imageDialog = true;
            this.imageSrc = item.image;
        },
        missionGetOne() {
            axios
                .post(config.server + "/mission/one/", {
                    _id: this.tempArr._id
                })
                .then(doc => {
                    let tempNum = 0
                    doc.data.missionclient.forEach(element => {
                        if (!element.finishdate) {
                                tempNum += 1;
                            }
                    });
                    if(tempNum === 0) {
                        this.isClear = true
                    }else{
                        this.isClear = false
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

        upload(x, item) {
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
            if (!this.updateImagePreview) {
                let arrow = document.querySelector(".photoarea");
                arrow.style = "border: 3px dashed red";
                arrow.style.transition = "1s";
                setTimeout(() => {
                    arrow.style = "border: 3px dashed #696969";
                    arrow.style.transition = "1s";
                }, 2000);
            } else {
                var payload = new FormData();
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
                                    this.missionGetOne();
                                }
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
    font-size: 20px;
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
    background-size:48px 48px;
    mask-image: url(../../public/icons/baseline-camera_alt-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-camera_alt-24px.svg);
    width: 48px;
    height: 48px;
}
</style>
