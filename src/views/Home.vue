<template>
<div id="homepage">
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
    </div>
    <div v-for="(item,index) in allMission" :key="index" v-else>
        <md-card md-with-hover style="width:80%;margin:10px auto;" v-for="(x,no) in item.missionclient" :key="no">
            <md-ripple>
                <div class="card-text" style="padding:20px 20px 5px 20px">
                    <div class="card-text-left">
                        <span>Client: </span>
                    </div>
                    <div class="card-text-right">
                        <span>{{x.clientbname}}</span>
                    </div>
                </div>

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

                <div class="card-text">
                    <div class="card-text-left">
                        <span>Progress: </span>
                    </div>
                    <div class="card-text-right">
                        <span>{{no+1}}</span>
                        <span>/</span>
                        <span>{{item.missionclient.length}}</span>
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

                <div class="card-camera" @click="upload(x,item)">
                    <md-icon class="md-size-2x">camera_alt</md-icon>
                </div>
            </md-ripple>
        </md-card>
    </div>

    <div class="emptyarea-bottom">
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
                <span>已完成</span>
                <br>
                <span>02:44</span>
            </div>
        </div>
    </md-dialog>
    <!-- upload dialog end -->
</div>
</template>

<script>
import axios from 'axios'
import config from '../assets/js/config'
import lrz from 'lrz'
import _ from 'lodash'

export default {
    name: 'homepage',
    mounted() {
        this.drivername = localStorage.getItem('drivername')
        this.getDriverMission()
    },
    data() {
        return {
            allMission: [],
            uploadDialog: false,
            dialogClientName: '',
            updateImagePreview: '',
            updateImage: '',
            _id: '',
            missionImage: '',
            drivername: ''
        }
    },
    methods: {
        confirm() {
            
            if (!this.updateImagePreview) {
                let arrow = document.querySelector('.photoarea')
                arrow.style = 'border: 3px dashed red'
                arrow.style.transition = '1s'
                setTimeout(() => {
                    arrow.style = 'border: 3px dashed #696969'
                    arrow.style.transition = '1s'
                }, 2000)
            } else {
                var payload = new FormData();
                let date = new Date()
                let maxSize = 200 * 1024 //200KB
                lrz(this.updateImage, {
                        quality: 0.5
                    })
                    .then(res => {
                        if(this.updateImage.size>maxSize){
                            this.updateImage = res.file
                        }
                        payload.append("image", this.updateImage)
                        payload.append("_id", this._id)
                        payload.append("dialogClientName", this.dialogClientName)
                        axios({
                                method: 'post',
                                url: config.server + '/client-driver/update',
                                data: payload,
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                            .then(doc => {
                                if (doc.data.code == 0) {
                                    this.uploadDialog = false
                                    this.refresh()
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                    .catch(err => {
                        console.log('lrz err')
                        console.log(err)
                    })
            }
        },

        cancel() {
            this.updateImagePreview = null
        },
        fileChange(el) {
            if (typeof FileReader === 'undefined') {
                return alert('浏览器不支持上传图片')
            }
            console.log('###')
            if (!el.target.files[0].size) return; //判断是否有文件数量
            this.updateImagePreview = window.URL.createObjectURL(el.target.files[0])
            this.updateImage = el.target.files[0]
            console.log(this.updateImage)
            el.target.value = ''
        },
        uploadFile() {
            document.getElementById('upload_file').click()
        },

        upload(x, item) {
            this.uploadDialog = true
            this.dialogClientName = x.clientbname
            this._id = item._id
            this.missionImage = x.finishphoto
        },

        getDriverMission() {
            axios.post(config.server + '/client-driver/', {
                    startdate: new Date().toLocaleDateString(),
                    drivername: this.drivername
                })
                .then(doc => {
                    console.log(doc)
                    this.allMission = doc.data.doc
                    this.allMission = _.orderBy(this.allMission, ['finishdate'], ['desc'])
                    console.log(this.allMission.length)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        refresh() {
            let arrow = document.querySelector('#arrow')
            arrow.style.transform = 'rotate(360deg)'
            arrow.style.transition = '0.5s'
            setTimeout(() => {
                arrow.style.transform = 'rotate(0deg)'
                arrow.style.transition = '0.5s'
            }, 300)
            this.getDriverMission()
        }
    }
}
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
    right: 13px
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
    background-color: #d74342
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
    background-color: #2ca81c
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
    background-color: #2ca81c
}

.bottombutton-center span {
    font-size: 25px;
    color: #fff;
    font-weight: 600;
}

.namearea {
    text-align:center;
    padding-top:30px; 
    height: 90px;
    line-height: 58px;
    font-weight: bold;
    background-image: url(../../public/img/wood.jpg);
    background-repeat:no-repeat;
    background-position:bottom;
    background-size: 250px 74px;
}
</style>
