<template>
    <div id="login">
        <div style="display: flex;align-items: center;height: 100%;">
            <div style="margin: 0 auto;padding-bottom: 100px;">
                <div style="padding:0px 20px 20px 20px">
                    <img src="../../public/img/ebuyLogo.png" style="width:200px">
                </div>
                <div style="padding:10px">
                    <input type="text" v-model="username" :placeholder="language.loginPage.placeholderUserName" style="font-size:14px;width:200px">
                </div>
                <div style="padding:5px">
                    <input type="password" v-model="password" :placeholder="language.loginPage.placeholderPassWorld" style="font-size:14px;width:200px">
                </div>

                <div style="padding:20px">
                    <button @click="loginMethod">{{language.loginPage.loginBotton}}</button>
                </div>
            </div>

        </div>

        <div class="bottom-info">
            <span>WAWA TECHNOLOGY</span>
        </div>

        <!-- error msg start -->
        <transition name="custom-classes-transition" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
            <div class="errinfo" v-if="errmsg">
                <span>{{errmsg}}</span>
            </div>
        </transition>
        <!-- error msg end -->

        <!-- change language button start -->
        <div class="languageDiv" @click="openLanguageWindow">
            <div class="languageIcon"></div>
        </div>
        <!-- change language button start -->

        <!-- language window start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div class="languageWindow" v-if="languageWindow">
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

export default {
    name: 'home',
    data() {
        return {
            username: '',
            password: '',
            errmsg: '',
            lang: 'ch',
            languageWindow: false
        }
    },
    computed: {
        language() {
            return this.$store.getters.getLanguage
        }
    },
    methods: {
        openLanguageWindow() {
            this.languageWindow = true
        },
        changeToCH() {
            this.lang = 'ch'
            this.$store.dispatch('setLanguage', this.lang)
            localStorage.lang = 'ch'
            this.languageWindow = false
        },
        changeToEN() {
            this.lang = 'en'
            this.$store.dispatch('setLanguage', this.lang)
            localStorage.lang = 'en'
            this.languageWindow = false
        },
        loginMethod() {
            if (!this.username) {
                this.errmsg = this.language.loginPage.noUserName
            } else if (!this.password) {
                this.errmsg = this.language.loginPage.noPassword
            } else {
                axios
                    .post(config.server + '/clerks/userlogin', {
                        username: this.username,
                        password: this.password
                    })
                    .then(doc => {
                        if (doc.data.code == 0) {
                            localStorage.drivername = doc.data.drivername
                            localStorage.drivercard = doc.data.drivercard
                            localStorage.driverphone = doc.data.driverphone
                            localStorage.dirverid = doc.data.driverid
                            localStorage.image = doc.data.image
                            localStorage._id = doc.data._id
                            localStorage.driverRole = doc.data.role
                            localStorage.drivertoken = doc.data.token
                            let item = doc.data.token
                            this.$store.dispatch('setToken', item)
                            this.$router.push('/')
                        } else {
                            this.errmsg = this.language.loginPage.errorInfo
                            console.log('登录出现错误')
                            console.log(doc)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            setTimeout(() => {
                this.errmsg = ''
            }, 2000)
        }
    }
}
</script>

<style scoped>
#login {
    height: 100%;
}
#login input {
    border: 1px solid #ccc;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
    -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    height: 40px;
    text-align: center;
    font-size: 18px;
}

#login input:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
}

#login button {
    width: 120px;
    height: 40px;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #d74342;
    color: #fff;
    font-weight: 500;
}

.bottom-info {
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #eee;
    box-shadow: 1px 1px;
    padding: 5px;
}

.languageIcon {
    background: #383838;
    mask-image: url(../../public/icons/baseline-settings-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-settings-36px.svg);
    width: 36px;
    height: 36px;
}

.languageDiv {
    position: fixed;
    top: 10px;
    right: 10px;
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
}

.languageWindow-box {
    background-color: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 200px;
}

.errinfo {
    position: fixed;
    z-index: 19;
    top: 10px;
    background-color: rgba(255, 255, 0, 0.6);
    width: 100%;
}

.errinfo span {
    font-size: 16px;
    line-height: 32px;
}
</style>
