<template>
    <div id="notice_page">
        <div class="page_title">
            <div style="width:24px;margin-left: 8px;"></div>
            <div>
                <span v-if="lang === 'ch'">公告通知</span>
                <span v-else>NOTICE</span>
            </div>
            <div style="width:24px;margin-right: 8px;">
            </div>
        </div>
        <div class="notice_top_button">
            <div class="notice_top_button_item notice_top_button_item_left" @click="buttonChangeModeMethod('left')" ref="break_top_button_left">
                <span>未读公告</span>
            </div>
            <div class="notice_top_button_item notice_top_button_item_right" @click="buttonChangeModeMethod('right')" ref="break_top_button_right">
                <span>全部公告</span>
            </div>
        </div>
        <div style="height:80px">
            <!-- empty space area -->
        </div>
        <div class="notice_body" ref="notice_body">
            <div v-show="topButtonSwitch">
                <div v-if="leftNoticeArray.length != 0">
                    <div class="notice_body_item" v-for="(item,index) in leftNoticeArray" :key="index" @click="userReadNoticeMethod(item)"> 
                        <div class="notice_body_item_top" @click="openDetail(index)">
                            <div class="notice_body_item_left">
                                <div class="page_body_item_left_frame">
                                    <div class="icon_mail"></div>
                                </div>
                            </div>
                            <div class="notice_body_item_right">
                                <div class="page_body_item_right_box">
                                    <span>{{item.title}}</span>
                                </div>
                                <div class="page_body_item_right_note">
                                    <span>{{item.date | dateFilter}}</span>
                                    <span style="padding-left:10px">{{item.date | timefilter}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="page_body_item_bottom" ref="myrefBottom">
                            <div style="height:10px">
                                <!-- empty space area -->
                            </div>
                            <div class="page_body_item_bottom_button">
                                <div class="notice_body_content">
                                    <span>{{item.content}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="body_empty_icon">
                    <div class="icon_empty"></div>
                    <div v-if="lang === 'ch'" style="font-size:16px;color:#e0e0e0;padding-top:10px">~空~</div>
                    <div v-else style="font-size:16px;color:#e0e0e0;padding-top:10px">~EMPTY~</div>
                </div>
                
            </div>

            <div v-show="!topButtonSwitch">
                <div v-if="rightNoticeArray.length != 0">
                    <div class="notice_body_item" v-for="(item,index) in rightNoticeArray" :key="'right'+index">
                        <div class="notice_body_item_top" @click="openDetailRight(index)">
                            <div class="notice_body_item_left">
                                <div class="page_body_item_left_frame">
                                    <div class="icon_mail"></div>
                                </div>
                            </div>
                            <div class="notice_body_item_right">
                                <div class="page_body_item_right_box">
                                    <span>{{item.title}}</span>
                                </div>
                                <div class="page_body_item_right_note">
                                    <span>{{item.date | dateFilter}}</span>
                                    <span style="padding-left:10px">{{item.date | timefilter}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="page_body_item_bottom" ref="oldrefBottom">
                            <div style="height:10px">
                                <!-- empty space area -->
                            </div>
                            <div class="page_body_item_bottom_button">
                                <div class="notice_body_content">
                                    <span>{{item.content}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom_space" v-if="isShowNextButton">
                        <div class="next_page_button" @click="allNoticeNextPageMethod">
                            <span v-if="lang === 'ch'">下一页</span>
                            <span v-else>NEXT</span>
                        </div>
                    </div>
                </div>
                <div v-else class="body_empty_icon">
                    <div class="icon_empty"></div>
                    <div v-if="lang === 'ch'" style="font-size:16px;color:#e0e0e0;padding-top:10px">~空~</div>
                    <div v-else style="font-size:16px;color:#e0e0e0;padding-top:10px">~EMPTY~</div>
                </div>
            </div>
        </div>

        <!-- error tips start -->
        <transition name="carwash-transition" enter-active-class="animated slideInDown faster" leave-active-class="animated slideOutUp faster">
            <div v-if="showErrorTips" class="error_tips" @click="showErrorTips = false">
                {{errorInfo}}
            </div>
        </transition>
        <!-- error tips end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";

export default {
    mounted(){
        let screenHeight = document.documentElement.clientHeight
        let lindBoxHeight = screenHeight - 80 - 60
        this.$refs.notice_body.style.height = lindBoxHeight + 'px'
        this.userName = localStorage.getItem('drivername')
        this.getLeftNotice()
        this.getAllNotice()
    },
    computed: {
        lang() {
            return this.$store.state.lang;
        }
    },

    data(){
        return {
            topButtonSwitch:true,
            userName:null,
            leftNoticeArray:[],
            rightNoticeArray:[],
            showDelDialog:false,
            pageNow:1,
            showErrorTips:false,
            errorInfo:null,
            isShowNextButton:true
        }
    },

    methods:{
        allNoticeNextPageMethod(){
            this.pageNow ++
            axios
                .post(config.server + '/notice/clientall',{
                    pageNow:this.pageNow,
                    userName:this.userName
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.rightNoticeArray=this.rightNoticeArray.concat(doc.data.doc)
                        if(doc.data.doc.length <10){
                            this.isShowNextButton = false
                        }
                    }else if(doc.data.code === 1){
                        this.isShowNextButton = false
                    }else{
                        if(this.lang === 'ch'){
                            this.errorInfo = '获取数据错误'
                        }else{
                            this.errorInfo = 'Get data failed'
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
        },

        userReadNoticeMethod(item){
            axios
                .post(config.server + '/notice/read',{
                    notice_id:item._id,
                    userName:this.userName
                })
                .catch(err => {
                    console.log(err)
                })
        },

        openDetailRight(index){
            if(this.$refs.oldrefBottom[index].style.height === '90px'){
                this.$refs.oldrefBottom[index].style.height = '0'
            }else{
                this.$refs.oldrefBottom[index].style.height = '90px'
            }
        },

        openDetail(index){
            if(this.$refs.myrefBottom[index].style.height === '90px'){
                this.$refs.myrefBottom[index].style.height = '0'
            }else{
                this.$refs.myrefBottom[index].style.height = '90px'
            }
        },
        getAllNotice(){
            axios
                .post(config.server + '/notice/clientall',{
                    pageNow:1,
                    userName:this.userName
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.rightNoticeArray = doc.data.doc
                        if(doc.data.doc.length <10){
                            this.isShowNextButton = false
                        }
                    }else if(doc.data.code === 1){
                        this.isShowNextButton = false
                    }else{
                        this.isShowNextButton = false
                        if(this.lang === 'ch'){
                            this.errorInfo = '获取数据错误'
                        }else{
                            this.errorInfo = 'Get data failed'
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
        },
        getLeftNotice(){
            axios
                .post(config.server + '/notice/clientget',{
                    userName:this.userName
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.leftNoticeArray = doc.data.doc
                    }else if(doc.data.code === 1){
                        console.log('dont have new notice')
                    }else{
                        console.log('somthing wrong')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        buttonChangeModeMethod(item){
            if(item === 'left'){
                this.topButtonSwitch = true
                this.$refs.break_top_button_left.style.color = '#2c3e50'
                this.$refs.break_top_button_right.style.color = '#eee'
            }else{
                this.topButtonSwitch = false
                this.$refs.break_top_button_left.style.color = '#eee'
                this.$refs.break_top_button_right.style.color = '#2c3e50'
            }
            
        }
    },
    
}
</script>

<style scoped>
.page_title{
    background-color: #d74342;
    color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    z-index: 24;
}

.notice_top_button{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 40px;
    align-items: center;
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
    background-color: #fff;
}

.notice_top_button_item{
    border: 1px solid #eee;
    font-size: 16px;
    width: 100px;
    height:30px;
    line-height: 30px;
}

.notice_top_button_item_left{
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.notice_top_button_item_right{
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.notice_body{
    background-color: #f7f7f7;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 8px;
    overflow-x: auto
}

.notice_body_item{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 8px;
}

.notice_body_item_top{
    display: flex;
    display: -webkit-flex;
}

.notice_body_item_left{
    flex-basis: 20%;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.notice_body_item_right{
    flex-basis: 80%;
    text-align: left;
}

.page_body_item_left_frame{
    background-color: #448aff;
    height: 32px;
    width: 32px;
    border-radius: 100%;
    display:flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.icon_mail{
    background: #fff;
    mask-image: url(../../public/icons/baseline-mail-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-mail-24px.svg);
    width: 24px;
    height: 24px;
}

.icon_empty{
    background: #e0e0e0;
    mask-image: url(../../public/icons/empty.svg);
    -webkit-mask-image: url(../../public/icons/empty.svg);
    width: 64px;
    height: 64px;
}

.page_body_item_right_box{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
}

.page_body_item_right_note{
    height: 30px;
    line-height: 30px;
    color:#6a6a6a;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 220px;
}

.page_body_item_bottom{
    height: 0;
    overflow: hidden;
    transition: 0.25s;
}

.notice_body_content{
    margin-left: 18px;
    margin-right: 18px;
    height: 80px;
    overflow-y: auto;
}

.bottom_space{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 8px;
}

.next_page_button{
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 100%;
    height: 50px;
    width: 50px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    font-size: 10px;
    justify-content: center;
}

.body_empty_icon{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 150px;
}

.error_tips {
    position: fixed;
    top: 0;
    background-color: rgba(255, 255, 0, 0.7);
    width: 100%;
    z-index: 99;
    height: 40px;
    line-height: 40px
}
</style>
