<template>
    <div id="setup">
        <div class="top">
            <div class="top-pic" v-if="!driverimage">
                <img src="../../public/img/ebuyLogo.png" alt="Avatar" />
            </div>
            <div class="top-pic" v-else>
                <img :src="driverimage | imgurl" alt="Avatar" v-on:error.once="loadDefault($event)">
            </div>
            <div class="top-title">
                <span>{{drivername}}</span>
            </div>
        </div>

        <div class="setup_center">
            <div class="setup_drivercar">
                <div class="card-item">
                    <div class="card-item-title">
                        <span>{{language.setupPage.licenseType}}</span>
                    </div>
                    <div class="card-item-body">
                        <div class="drivercardicon" style="width: 24px;height:24px"></div>
                        <div>
                            <span>{{drivercard}}</span>
                        </div>
                    </div>
                </div>

                <div class="card-item">
                    <div class="card-item-title">
                        <span>{{language.setupPage.Contact}}</span>
                    </div>
                    <div class="card-item-body">
                        <div class="phoneicon" style="width: 24px;height:24px"></div>
                        <span>{{driverphone}}</span>
                    </div>
                </div>

                <div class="card-item">
                    <div class="card-item-title">
                        <span>{{language.setupPage.cardNumber}}</span>
                    </div>
                    <div class="card-item-body">
                        <div class="infoicon" style="width: 24px;height:24px"></div>
                        <span>{{driverid}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <md-button class="md-raised md-primary" style="width:80%" @click="languageWindow=true">{{language.setupPage.lang}}</md-button>
        </div>
        <div class="bottom" style="display: flex;justify-content: center;" @click="goCarRulePage()">
            <div class="setup_button_square">
                <span v-if="lang === 'ch'">车辆守则</span>
                <span v-else>CONDUCTS</span>
            </div>
        </div>
        <div class="bottom">
            <md-button class="md-raised md-primary" style="width:80%" @click="isChangePSW = true,showDialog = true">{{language.setupPage.changePsw}}</md-button>
        </div>
        <div class="bottom">
            <a href="http://18.136.155.152:9000">
                <md-button class="md-raised md-primary " style="width:80%;" @click="changeOldVersion">{{language.setupPage.oldVersion}}</md-button>
            </a>
        </div>
        <div class="bottom">
            <md-button class="md-raised " style="width:80%;background-color: yellow;" @click="isChangePSW = false,showDialog = true">{{language.setupPage.signOut}}</md-button>
        </div>
        <div style="padding-top:30px">
            <span style="color:#e0e0e0">{{version}}</span>
        </div>

        <div style="height:60px">
            <!-- 底部占位符 -->
        </div>
        <!-- 遮罩层 -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="showDialog" class="dialog" @click.self="showDialog = false" @touchmove.prevent>
                <div class="dialog-body">
                    <div style="background-color:#d74342;box-shadow: 1px 1px 5px;height:30px;line-height: 30px">
                        <span v-if="isChangePSW" style="font-size:16px;color:#fff;line-height: 32px;">{{language.setupPage.changePsw}}</span>
                        <span v-else style="font-size:16px;color:#fff;line-height: 32px;">{{language.setupPage.signOut}}</span>
                    </div>
                    <div class="dialog-body-center">
                        <div v-if="isChangePSW" class="dialog-body-center_one">
                            <div class="dialog-body-center-item" style="border-bottom: 1px solid #eee;">
                                <div class="dialog-body-center-item-left">
                                    <label for="oldpsw">{{language.setupPage.oldPsw}}</label>
                                </div>
                                <div class="dialog-body-center-item-right">
                                    <input type="password" id="oldpsw" :placeholder="language.setupPage.oldPswPlaceHolder" v-model="oldpassword">
                                </div>
                            </div>
                            <div class="dialog-body-center-item" style="border-bottom: 1px solid #eee;">
                                <div class="dialog-body-center-item-left">
                                    <label for="newpsw">{{language.setupPage.newPsw}}</label>
                                </div>
                                <div class="dialog-body-center-item-right">
                                    <input type="password" id="newpsw" :placeholder="language.setupPage.newPswPlaceHolder" v-model="newpassword">
                                </div>
                            </div>
                            <div class="dialog-body-center-item">
                                <div class="dialog-body-center-item-left">
                                    <label for="confirmpsw">{{language.setupPage.confirmPsw}}</label>
                                </div>
                                <div class="dialog-body-center-item-right">
                                    <input id="confirmpsw" type="password" :placeholder="language.setupPage.confirmPswPlaceHolder" v-model="conpassword">
                                </div>
                            </div>
                        </div>

                        <div v-else style="width:206px;margin:8px 12px;box-shadow:1px 1px 5px;height:100px;line-height:100px;border-radius:10px">
                            <span style="font-size:14px;">{{language.setupPage.quitInfo}}</span>
                        </div>
                    </div>
                    <div class="dialog-body-bottom">
                        <div class="setup_whitebutton" @click="showDialog = false">
                            <span>{{language.setupPage.cancel}}</span>
                        </div>
                        <div class="setup_whitebutton" @click="confirmChangePsw" style="margin-left:8px;">
                            <span>{{language.setupPage.confirm}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 遮罩层 -->

        <!-- 操作提示 -->
        <transition name="custom-classes-transition" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
            <div class="errinfo" v-if="showError">
                <span>{{errorInfo}}</span>
            </div>
        </transition>
        <!-- 操作提示 -->

        <!-- language window start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div class="languageWindow" v-if="languageWindow" @touchmove.prevent>
                <div class="languageWindow-box">
                    <div style="width:80%;margin:10px auto;border-bottom: 1px solid #fff;height:26px">
                        <span style="font-size:18px;color:#fff">选择语言</span>
                    </div>
                    <div style="padding-top:10px">
                        <button style="font-size:16px;width:100px;height:35px;" @click="changeToCH">中文</button>
                    </div>
                    <div style="padding-top:10px">
                        <button style="font-size:16px;width:100px;height:35px;" @click="changeToEN">English</button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- language window end -->
    </div>
</template>

<script>
import axios from 'axios'
import config from '../assets/js/config'
import myPackage from '../../package.json'

export default {
    data() {
        return {
            version:myPackage.version,
            showDialog: false,
            drivername: '',
            drivercard: '',
            driverphone: '',
            driverid: '',
            driverimage: '',
            errorInfo: '',
            oldpassword: '',
            newpassword: '',
            conpassword: '',
            showError: false,
            _id: '',
            lang: 'ch',
            isChangePSW: true,
            languageWindow: false,
            imgDefault:'/img/ebuyLogo.png'
        }
    },
    computed: {
        language() {
            return this.$store.getters.getLanguage
        },
    },

    mounted() {
        this.drivername = localStorage.getItem('drivername')
        this.drivercard = localStorage.getItem('drivercard')
        this.driverphone = localStorage.getItem('driverphone')
        this.driverid = localStorage.getItem('dirverid')
        this.driverimage = localStorage.getItem('image')
        this.lang = localStorage.getItem('lang')
    },

    methods: {
        goCarRulePage(){
            this.$router.push("/carRule");
        },

        changeOldVersion(){
            router.replace()
        },
        loadDefault(e){
          e.currentTarget.src=this.imgDefault
        },

        changeToCH() {
            this.lang = 'ch'
            this.$store.dispatch('setLanguage', this.lang)
            localStorage.lang = this.lang
            this.languageWindow = false
        },

        changeToEN() {
            this.lang = 'en'
            this.$store.dispatch('setLanguage', this.lang)
            localStorage.lang = this.lang
            this.languageWindow = false
        },

        confirmChangePsw() {
            if (this.isChangePSW) {
                if (!this.oldpassword) {
                    this.errorInfo = '请填写旧密码'
                    this.showError = true
                } else if (!this.newpassword) {
                    this.errorInfo = '请填写新密码'
                    this.showError = true
                } else if (!this.conpassword) {
                    this.errorInfo = '请确认新密码'
                    this.showError = true
                } else if (this.newpassword != this.conpassword) {
                    this.errorInfo = '两次输入密码不一致'
                    this.showError = true
                } else {
                    console.log('comit mission')
                    this._id = localStorage.getItem('_id')
                    axios
                        .post(config.server + '/client-driver/change', {
                            oldpassword: this.oldpassword,
                            newpassword: this.newpassword,
                            conpassword: this.conpassword,
                            _id: this._id
                        })
                        .then(doc => {
                            this.oldpassword = ''
                            this.errorInfo = doc.data.msg
                            this.showError = true
                            if (doc.data.code === 0) {
                                this.showDialog = false
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                setTimeout(() => {
                    this.showError = false
                }, 2000)
            } else {
                localStorage.clear()
                let item = null
                this.$store.dispatch('setToken', item)
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style scoped>
.top {
    background-image: url(../../public/img/setup-backgroundimg.jpeg);
    background-size: 100% 100%;
    height: 200px;
    box-shadow: 1px 1px 5px;
}

.top-pic {
    background-color: white;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 100%;
    position: relative;
    top: 24px;
    box-shadow: 1px 1px 5px;
    overflow: hidden;
}

.top-pic img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.top-title {
    position: relative;
    top: 36px;
    background-color: rgba(0, 0, 0, 0.5);
    width: 200px;
    margin: 0 auto;
    padding: 8px 0;
    border-radius: 20px;
}

.top-title span {
    font-size: 20px;
    color: #fff;
}

.card-item {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}

.card-item-title {
    text-align: left;
    padding: 0 0 15px 20px;
    font-size: 16px;
}

.card-item-title span {
    color: #989898;
}

.card-item-body {
    text-align: left;
    padding-left: 40px;
    display: flex;
    display: -webkit-flex;
    width: 280px;
}

.card-item-body span {
    padding-left: 20px;
    font-size: 16px;
}

.dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 14;
    display: flex;
    align-items: center;
}

.dialog-body {
    background-color: #fff;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.dialog-body-center{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.dialog-body-center-item {
    display: flex;
    display: -webkit-flex;
    padding: 10px 5px;
}

.dialog-body-center-item-left {
    width: 68px;
    text-align: right;
    font-size: 14px;
    line-height: 32px;
}

.dialog-body-center-item-right {
    width: 120px;
    margin-left: 8px;
}

.dialog-body-center-item-right input {
    width: 100%;
    border: none;
    height: 32px;
}

.errinfo {
    position: fixed;
    z-index: 19;
    top: 8px;
    background-color: rgba(255, 255, 0, 0.6);
    width: 100%;
}

.errinfo span {
    font-size: 16px;
    line-height: 32px;
}

.drivercardicon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-commute-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-commute-24px.svg);
}

.phoneicon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-phone-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-phone-24px.svg);
}

.infoicon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-assignment_ind-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-assignment_ind-24px.svg);
}

.languageWindow {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
}

.languageWindow-box {
    background-color: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 200px;
}

.setup_button_square{
    background-color: #d74342;
    height: 36px;
    line-height: 36px;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 80%;
    margin: 6px 0;
    border-radius: 2px;
}

.setup_whitebutton{
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
}

.dialog-body-bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 10px;
}

.dialog-body-center_one{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    border: 1px solid #eee;
    background-color: #fff;
    margin: 8px 12px;
}

.setup_center{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.setup_drivercar{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #eee;
    background-color: #fff;
    margin-top: 8px;
    margin-bottom: 8px;
}
</style>
