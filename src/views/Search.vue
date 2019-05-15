<template>
    <div id="searchpage">
        <div class="search-title">
            <span>{{language.searchPage.searchClient}}</span>
        </div>
        <div class="search-body">
            <div class="search-body-top">
                <input type="text" :placeholder="language.searchPage.inputClientName" v-model="keyWord" @keyup.enter="searchMethod">
            </div>
            <div v-if="!returnNull" class="search-body-center">
                <div class="search-body-center-item" v-for="(item,index) in clientArray" :key="index">
                    <div class="search-body-center-item-title">
                        <span v-if="lang === 'ch'">{{item.clientbname}}</span>
                        <span v-else>{{item.clientbnameEN}}</span>
                    </div>
                    <div class="search-body-center-item-body">
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>{{language.searchPage.clientPhone}}</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientbphone}}</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>{{language.searchPage.postCode}}</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientbpostcode}}</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>{{language.searchPage.address}}</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientbaddress}}</span>
                            </div>
                        </div>
                        <div style="margin-top: 5px;margin-bottom: 5px;">
                            <div class="search-body-center-button" @click="showIncreaseOrderBoxMethod(item)">
                                <span>{{language.searchPage.increaseOrder}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="pageNow > 0" v-if="countNum >= pageSize * pageNow" class="search-body-center-more" @click="getMoreMethod">
                    <span>{{language.searchPage.more}}</span>
                </div>
                <div v-show="pageNow > 0 && clientArray.length != 0" v-else>
                    <span v-if="lang === 'ch'" style="color:#6a6a6a">~~没有更多信息~~</span>
                    <span v-else style="color:#6a6a6a">~~No more info~~</span>
                </div>
                <div v-if="clientArray.length === 0" class="search-body-logo">
                    <img src="../../public/img/ebuyLogo.png" alt="ebuylogo">
                </div>
            </div>
            <div v-else class="search-body-center">
                <div style="padding-top:10vh">
                    <span v-if="lang === 'ch'">~~未找到该客户~~</span>
                    <span v-else>~~Client was not found~~</span>
                </div>
                <div>
                    <img src="../../public/img/crycat.gif" alt="notfond">
                </div>
            </div>
        </div>
        <div class="search-footer">
            <!-- 底部占位符 -->
        </div>
        <!-- show increase order box start -->
        <transition name="preview-client-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="showIncreaseOrderBox" class="increaseorder-back" ></div>
        </transition>
        <transition name="preview-client-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="showIncreaseOrderBox" class="increaseorder-front" @click.self.prevent="showIncreaseOrderBox = false">
                <div class="increaseorder-box">
                    <div class="increaseorder-box-top">
                        <span v-if="lang === 'ch'">添加任务</span>
                        <span v-else>Incresae Order</span>
                    </div>
                    <div  class="increaseorder-box-body">
                        <div class="increaseorder-box-body-title">
                            <span v-if="lang === 'ch'" style="font-size:16px">{{clientShipping.clientbname}}</span>
                            <span v-else style="font-size:16px">{{clientShipping.clientbnameEN}}</span>
                        </div>
                        <div class="increaseorder-box-body-center">
                            <div :class="choiseLift" style="margin-right:4px" @click="choiseOrderModeMethod('left')">
                                <div :class="choiseLeftImg"></div>
                                <div>
                                    <span v-if="lang === 'ch'" :class="choiseLeftText">加单</span>
                                    <span v-else :class="choiseLeftText">Increase</span>
                                </div>
                            </div>
                            <div :class="choiseCenter" style="margin-right:4px" @click="choiseOrderModeMethod('center')">
                                <div :class="choiseCenterImg"></div>
                                <div>
                                    <span v-if="lang === 'ch'" :class="choiseCenterText">退菜</span>
                                    <span v-else :class="choiseCenterText">Return</span>
                                </div>
                            </div>
                            <div :class="choiseRight" style="margin-right:4px" @click="choiseOrderModeMethod('right')">
                                <div :class="choiseRightImg"></div>
                                <div>
                                    <span v-if="lang === 'ch'" :class="choiseRightText">补单</span>
                                    <span v-else :class="choiseRightText">Farther</span>
                                </div>
                            </div>
                            <div :class="choiseOther" @click="choiseOrderModeMethod('other')">
                                <div :class="choiseOtherImg"></div>
                                <div>
                                    <span v-if="lang === 'ch'" :class="choiseOtherText">其他</span>
                                    <span v-else :class="choiseOtherText">Farther</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="increaseorder-box-footer">
                        <div class="search-body-center-button" style="width: 80px;margin-right:10px" @click="showIncreaseOrderBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>cancel</span>
                        </div>
                        <div class="search-body-center-button" style="width: 80px;" @click="confirmIncreaseOrder">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- show increase order box end -->

        <!-- 操作提示 -->
        <transition name="tips-classes-transition" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
            <div class="errinfo" v-if="showError" @click="showError = false">
                <span>{{errorInfo}}</span>
            </div>
        </transition>
        <!-- 操作提示 -->

        <!-- loading animation start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowLoadingAnimation" class="tripcount_loading_back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowLoadingAnimation" class="tripcount_loading_front" @touchmove.prevent>
                <div class="tripcount_loading_box">
                    <div class="spinner">
                        <div class="rect1"></div>
                        <div class="rect2"></div>
                        <div class="rect3"></div>
                        <div class="rect4"></div>
                        <div class="rect5"></div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- loading animation end -->
    </div>
</template>

<script>
import axios from 'axios'
import config from '../assets/js/config'

export default {
    data(){
        return {
            keyWord:null,
            pageSize:5,
            pageNow:1,
            clientArray:[],
            countNum:null,
            returnNull:false,
            showIncreaseOrderBox:false,
            clientShipping:null,
            choiseLift:'increaseorder-box-body-center-item',
            choiseCenter:'increaseorder-box-body-center-item',
            choiseRight:'increaseorder-box-body-center-item',
            choiseOther:'increaseorder-box-body-center-item',
            isIncreaseOrder:null,
            choiseLeftImg:'increaseorderimg1',
            choiseCenterImg:'increaseorderimg3',
            choiseRightImg:'increaseorderimg2',
            choiseOtherImg:'increaseorderimg4',
            choiseLeftText:'textcolor',
            choiseCenterText:'textcolor',
            choiseRightText:'textcolor',
            choiseOtherText:'textcolor',
            showError:false,
            errorInfo:'未知错误',
            driverName:null,
            isShowLoadingAnimation:false
        }
    },
    mounted() {
        this.driverName = localStorage.getItem('drivername')
    },
    computed: {
        language() {
            return this.$store.getters.getLanguage
        },
        lang() {
            return this.$store.state.lang
        }
    },

    methods:{
        confirmIncreaseOrder(){
            if(this.isIncreaseOrder === null){
                this.showError = true
                if(this.lang === 'ch'){
                    this.errorInfo = '请选择任务类型'
                }else{
                    this.errorInfo = 'Choise mission mode'
                }
                setTimeout(() => {
                    this.showError = false
                }, 3000);
            }else{
                this.isShowLoadingAnimation = true
                let orderDate = new Date().toISOString()
                axios.post(config.server + '/dayshiftmission/create',{
                    client_id:this.clientShipping._id,
                    clientName:this.clientShipping.clientbname,
                    clientNameEN:this.clientShipping.clientbnameEN,
                    note:this.clientShipping.note,
                    clientAddress:this.clientShipping.clientbaddress,
                    clientPhone:this.clientShipping.clientbphone,
                    clientPostcode:this.clientShipping.clientbpostcode,
                    image:this.clientShipping.image,
                    isIncreaseOrder:this.isIncreaseOrder,
                    driverName:this.driverName,
                    orderDate:orderDate
                })
                .then(doc => {
                    this.isShowLoadingAnimation = false
                    if(doc.data.code === 0){
                        this.showIncreaseOrderBox = false
                        this.showError = true
                        if(this.lang === 'ch'){
                            this.errorInfo = '添加任务成功'
                        }else{
                            this.errorInfo = 'add mission successfully'
                        }
                        setTimeout(() => {
                            this.showError = false
                        }, 3000);
                    }else{
                        this.showIncreaseOrderBox = false
                        this.showError = true
                        if(this.lang === 'ch'){
                            this.errorInfo = '添加出错，请联系管理员'
                        }else{
                            this.errorInfo = 'something wrong'
                        }
                        setTimeout(() => {
                            this.showError = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    this.isShowLoadingAnimation = false
                    console.log(err)
                })
            }
        },

        choiseOrderModeMethod(mode){
            if(mode === 'left'){
                this.isIncreaseOrder = 'true'
                this.choiseLift = 'increaseorder-box-body-center-item-red'
                this.choiseCenter = 'increaseorder-box-body-center-item'
                this.choiseRight = 'increaseorder-box-body-center-item'
                this.choiseOther = 'increaseorder-box-body-center-item'
                this.choiseLeftImg = 'increaseorderimg1-red'
                this.choiseCenterImg = 'increaseorderimg3'
                this.choiseRightImg = 'increaseorderimg2'
                this.choiseOtherImg = 'increaseorderimg4'
                this.choiseLeftText = 'textcolor-red'
                this.choiseCenterText = 'textcolor'
                this.choiseRightText = 'textcolor'
                this.choiseOtherText = 'textcolor'
            }else if(mode === 'center'){
                this.isIncreaseOrder = 'return'
                this.choiseRight = 'increaseorder-box-body-center-item'
                this.choiseCenter = 'increaseorder-box-body-center-item-red'
                this.choiseLift = 'increaseorder-box-body-center-item'
                this.choiseOther = 'increaseorder-box-body-center-item'
                this.choiseRightImg = 'increaseorderimg2'
                this.choiseCenterImg = 'increaseorderimg3-red'
                this.choiseLeftImg = 'increaseorderimg1'
                this.choiseOtherImg = 'increaseorderimg4'
                this.choiseRightText = 'textcolor'
                this.choiseCenterText = 'textcolor-red'
                this.choiseLeftText = 'textcolor'
                this.choiseOtherText = 'textcolor'
            }else if(mode === 'other'){
                this.isIncreaseOrder = 'other'
                this.choiseRight = 'increaseorder-box-body-center-item'
                this.choiseCenter = 'increaseorder-box-body-center-item'
                this.choiseLift = 'increaseorder-box-body-center-item'
                this.choiseOther = 'increaseorder-box-body-center-item-red'
                this.choiseRightImg = 'increaseorderimg2'
                this.choiseCenterImg = 'increaseorderimg3'
                this.choiseLeftImg = 'increaseorderimg1'
                this.choiseOtherImg = 'increaseorderimg4-red'
                this.choiseRightText = 'textcolor'
                this.choiseCenterText = 'textcolor'
                this.choiseLeftText = 'textcolor'
                this.choiseOtherText = 'textcolor-red'
            }else{
                this.isIncreaseOrder = 'false'
                this.choiseRight = 'increaseorder-box-body-center-item-red'
                this.choiseCenter = 'increaseorder-box-body-center-item'
                this.choiseLift = 'increaseorder-box-body-center-item'
                this.choiseOther = 'increaseorder-box-body-center-item'
                this.choiseRightImg = 'increaseorderimg2-red'
                this.choiseCenterImg = 'increaseorderimg3'
                this.choiseLeftImg = 'increaseorderimg1'
                this.choiseOtherImg = 'increaseorderimg4'
                this.choiseRightText = 'textcolor-red'
                this.choiseCenterText = 'textcolor'
                this.choiseLeftText = 'textcolor'
                this.choiseOtherText = 'textcolor'
            }
        },

        showIncreaseOrderBoxMethod(client){
            this.choiseLift = 'increaseorder-box-body-center-item'
            this.choiseRight = 'increaseorder-box-body-center-item'
            this.choiseLeftImg = 'increaseorderimg1'
            this.choiseRightImg = 'increaseorderimg2'
            this.choiseLeftText = 'textcolor'
            this.choiseRightText = 'textcolor'
            this.isIncreaseOrder = null
            this.showIncreaseOrderBox = true
            this.clientShipping = client
        },

        searchMethod(){
            this.isShowLoadingAnimation = true
            this.returnNull = false
            this.pageNow = 1
            this.clientArray = []
            axios.post(config.server + '/clientb/find',{
                    pageSize:this.pageSize,
                    pageNow:this.pageNow,
                    word:this.keyWord
                })
            .then(doc => {
                this.isShowLoadingAnimation = false
                if(doc.data.code === 0){
                    this.countNum = doc.data.count
                    this.clientArray=this.clientArray.concat(doc.data.doc)
                    // this.pageNow += 1
                }else{
                    this.returnNull = true
                }
            })
            .catch(err => {
                this.isShowLoadingAnimation = false
                console.log(err)
            })
        },

        getMoreMethod(){
            this.pageNow += 1
            axios.post(config.server + '/clientb/find',{
                    pageSize:this.pageSize,
                    pageNow:this.pageNow,
                    word:this.keyWord
                })
            .then(doc => {
                this.clientArray=this.clientArray.concat(doc.data.doc)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.search-title{
    height: 40px;
    background: #d74342;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.search-title span{
    color: #fff;
    font-size: 18px;
    line-height: 40px;
}

.search-body {
    padding-top: 10px;
}

.search-body-top input{
    text-align: center;
    font-size: 16px;
    border-radius: 20px;
    height: 30px;
    border: 1px solid #e0e0e0;
    width: 80%;
    transition: 0.2s;
}

.search-body-top input:focus{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    outline: none;
    transition: 0.2s;
}

.search-body-center{
    padding-top: 10px;
}

.search-body-center-item{
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin-bottom: 10px;
    border-radius: 10px;
    border: 1px solid #eee;
}

.search-body-center-item-title{
    height: 30px;
    line-height: 30px;
    border-bottom:1px solid #e0e0e0;
    font-size: 16px;
}

.search-body-center-item-body{
    padding-bottom: 5px;
}

.search-body-center-item-body-item{
    display: flex;
    display: -webkit-flex;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
}

.search-body-center-item-body-item-left{
    flex-basis: 30%;
    text-align: right;
}

.search-body-center-item-body-item-right{
    flex-basis: 70%;
    text-align: left;
}

.search-body-center-more{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 100px;
    margin: 0 auto;
    border-radius: 15px;
    border: 1px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
    transition: 0.2s;
}

.search-body-center-more:active{
    box-shadow:none;
    transition: 0.2s;
}

.search-body-center-button{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 100px;
    margin: 0 auto;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
    transition: 0.2s;
}

.search-body-center-button:active{
    box-shadow:none;
    transition: 0.2s;
}

.search-body-logo{
    width: 50%;
    margin: 0 auto;
    padding-top: 10vh;
}

.search-footer{
    height: 80px;
}

.increaseorder-back {
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.increaseorder-front {
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

.increaseorder-box{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.increaseorder-box-top {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.increaseorderimg1 {
    background: #e0e0e0;
    mask-image: url(../../public/icons/increaseOrder1.svg);
    -webkit-mask-image: url(../../public/icons/increaseOrder1.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
}

.increaseorderimg1-red {
    background: #d74342;
    mask-image: url(../../public/icons/increaseOrder1.svg);
    -webkit-mask-image: url(../../public/icons/increaseOrder1.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
}

.increaseorderimg2 {
    background: #e0e0e0;
    mask-image: url(../../public/icons/increaseOrder2.svg);
    -webkit-mask-image: url(../../public/icons/increaseOrder2.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
}

.increaseorderimg2-red {
    background: #d74342;
    mask-image: url(../../public/icons/increaseOrder2.svg);
    -webkit-mask-image: url(../../public/icons/increaseOrder2.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
}

.increaseorderimg3 {
    background: #e0e0e0;
    mask-image: url(../../public/icons/baseline-reply_all-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-reply_all-24px.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
}

.increaseorderimg3-red {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-reply_all-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-reply_all-24px.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
}

.increaseorderimg4 {
    background: #e0e0e0;
    mask-image: url(../../public/icons/icon_other.svg);
    -webkit-mask-image: url(../../public/icons/icon_other.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
    mask-size: 38px 38px;
    -webkit-mask-size: 38px 38px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}

.increaseorderimg4-red {
    background: #d74342;
    mask-image: url(../../public/icons/icon_other.svg);
    -webkit-mask-image: url(../../public/icons/icon_other.svg);
    width: 32px;
    height: 32px;
    margin: 0 auto;
    margin-top: 6px;
    transition: 0.2s;
    mask-size: 38px 38px;
    -webkit-mask-size: 38px 38px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}

.textcolor{
    color: #e0e0e0;
    transition: 0.2s;
}

.textcolor-red{
    color: #000;
    transition: 0.2s;
}

.increaseorder-box-body-title{
    padding-top:10px;
    border-bottom: 1px solid #e0e0e0;
    height: 40px;
    line-height: 30px;
    margin: 0 10px;
}

.increaseorder-box-body-center{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin: 0 10px;
    margin-top: 10px;
}

.increaseorder-box-body-center-item{
    border: 1px solid #e0e0e0;
    width: 60px;
    height: 60px;
    border-radius: 10px;
    transition: 0.2s;
}

.increaseorder-box-body-center-item-red{
    border: 1px solid #d74342;
    width: 62px;
    height: 62px;
    border-radius: 10px;
    transition: 0.2s;
}

.increaseorder-box-footer{
    display: flex;
    display: -webkit-flex;
    margin: 10px;
}

.errinfo {
    position: fixed;
    z-index: 19;
    top: 8px;
    background-color: rgba(255, 255, 0, 0.7);
    width: 100%;
    z-index: 99;
}

.errinfo span {
    font-size: 16px;
    line-height: 32px;
}

.tripcount_loading_back {
    position: fixed;
    z-index: 101;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.tripcount_loading_front {
    position: fixed;
    z-index: 102;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.tripcount_loading_box{
    background-color: rgba(255, 255, 255, 0.7);
    width: 100%;
}

.spinner {
    margin: 32px auto;
    width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;
}

.spinner>div {
    background-color: rgba(212, 50, 49, 1);
    height: 100%;
    width: 6px;
    display: inline-block;
    margin-right: 4px;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}
</style>

