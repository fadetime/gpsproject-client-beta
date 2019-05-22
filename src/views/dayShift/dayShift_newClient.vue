<template>
    <div id="day_newclient">
        <div class="daynew_title">
            <div class="daynew_title_left" @click="goBackMethod()">
                <div>
                    <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                </div>
            </div>
            <div>
                <span>{{templateName}}</span>
            </div>
            <div class="daynew_title_right"></div>
        </div>
        <div class="daynew_search">
            <div class="daynew_search_frame">
                <input type="text" @keyup.enter="searchClientMethod()" v-model="keyWord">
                <div v-if="keyWord" class="daynew_search_frame_clearbutton" @click="clearKeyWordMethod()">
                    <span>清除</span>
                </div>
            </div>
        </div>
        <div style="height:70px;"></div>
        <div v-if="clientArray.length != 0" class="daynew_info">
            <div>
                <span>共找到{{countNum}}条信息</span>
            </div>
        </div>
        <div class="daynew_body">
            <div v-for="(item,index) in clientArray" :key="index" class="daynew_body_item">
                <div class="daynew_body_item_left">
                    <input type="checkbox" :value="item" v-model="chooseClientList">
                </div>
                <div class="daynew_body_item_right">
                    <div class="daynew_body_item_right_top">
                        <span>{{item.clientbname}}</span>
                    </div>
                    <div class="daynew_body_item_right_bottom">   
                        <div>
                            <span>{{item.clientbphone}}</span>
                        </div>
                        <div>
                            <span>{{item.clientbpostcode}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:106px"></div>
        <div class="daynew_bottom">
            <div :class="daynew_bottom_frame_data">
                <div style="font-size:16px">
                    <span @click="openChooseLiseMethod()">已选择{{chooseClientList.length}}个客户</span>
                </div>
                <div class="daynew_bottom_content">
                    <div v-for="(item,index) in chooseClientList" :key="index" class="daynew_bottom_content_frame">
                        <div class="daynew_bottom_content_frame_button">
                            <div class="changequeue_button" @click="moveClientUpMethod(item,index)">
                                <span>↑</span>
                            </div>
                            <div class="changequeue_button" @click="moveClientDownMethod(item,index)" style="margin-left:4px;">
                                <span>↓</span>
                            </div>
                        </div>
                        <span>{{item.clientbname}}</span>
                        <div class="daynew_bottom_content_frame_x" @click="pullClientMethod(index)">
                            <span>x</span>
                        </div>
                    </div>
                    <div style="height: 50px;"></div>
                </div>
                <div class="daynew_bottom_frame_add" @click="addClientMethod()">
                    <span>添加</span>
                </div>
                <div class="daynew_bottom_frame_button" @click="saveTemplate()">
                    <span>确定</span>
                </div>
            </div>
        </div>

        <!-- add new client dialog start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowNewClientBox"
                 class="day_newclient_back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowNewClientBox" class="day_newclient_front" @click.self.prevent="isShowNewClientBox = false">
                <div class="day_newclient_box">
                    <div class="day_newclient_box_title">
                        <span>增加新任务</span>
                    </div>
                    <div class="day_newclient_box_body">
                        <div class="day_newclient_box_body_item">
                            <div class="day_newclient_box_body_item_left">
                                <span>任务/客户名称</span>
                            </div>
                            <div class="day_newclient_box_body_item_right">
                                <input type="text" v-model="newClientName">
                            </div>
                        </div>
                        <div class="day_newclient_box_body_item">
                            <div class="day_newclient_box_body_item_left">
                                <span>英文名称(可选)</span>
                            </div>
                            <div class="day_newclient_box_body_item_right">
                                <input type="text" v-model="newClientNameEN">
                            </div>
                        </div>
                        <div class="day_newclient_box_body_item">
                            <div class="day_newclient_box_body_item_left">
                                <span>任务地址(可选)</span>
                            </div>
                            <div class="day_newclient_box_body_item_right">
                                <input type="text" v-model="newClientAddress">
                            </div>
                        </div>
                        <div class="day_newclient_box_body_item">
                            <div class="day_newclient_box_body_item_left">
                                <span>任务电话(可选)</span>
                            </div>
                            <div class="day_newclient_box_body_item_right">
                                <input type="text" v-model="newClientPhone">
                            </div>
                        </div>
                        <div class="day_newclient_box_body_item">
                            <div class="day_newclient_box_body_item_left">
                                <span>任务邮编(可选)</span>
                            </div>
                            <div class="day_newclient_box_body_item_right">
                                <input type="text" v-model="newClientPostcode">
                            </div>
                        </div>
                    </div>
                    <div class="day_newclient_box_bottom">
                        <div class="day_new_button" @click="isShowNewClientBox = false">
                            <span>取消</span>
                        </div>
                        <div class="day_new_button" style="margin-left:8px;" @click="confirmAddNewMission()">
                            <span>确认</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- add new client dialog end -->

        <!-- tips box start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips box end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../assets/js/config";
import tipsBox from "../../components/tipsBox"

export default {
    components:{
        tipsBox
    },

    mounted(){
        this.getTemplateInfo()
    },

    data(){
        return {
            templateName: null,
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            pageSize: 20,
            pageNow: 1,
            keyWord: null,
            clientArray: [],
            countNum: 0,
            chooseClientList: [],
            daynew_bottom_frame_data: 'daynew_bottom_frame',
            isShowNewClientBox: false,
            newClientName: null,
            newClientNameEN: null,
            newClientAddress: null,
            newClientPhone: null,
            newClientPostcode: null
        }
    },

    methods:{
        clearKeyWordMethod(){
            this.keyWord = null
            this.clientArray = []
        },

        moveClientDownMethod(item,index){
            if(index != this.chooseClientList.length - 1){
                this.chooseClientList.splice(index,1)
                this.chooseClientList.splice(index + 1,0,item)
            }
            
        },

        moveClientUpMethod(item,index){
            if(index != 0){
                this.chooseClientList.splice(index,1)
                this.chooseClientList.splice(index - 1,0,item)
            }
        },

        confirmAddNewMission(){
            if(this.newClientName){
                this.chooseClientList.push({
                    clientbaddress: this.newClientAddress,
                    clientbname: this.newClientName,
                    clientbnameEN: this.newClientNameEN,
                    clientbphone: this.newClientPhone,
                    clientbpostcode: this.newClientPostcode
                })
                this.isShowNewClientBox = false
            }else{
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请输入任务/客户名称'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }
        },

        addClientMethod(){
            this.isShowNewClientBox = true
        },

        pullClientMethod(index){
            this.chooseClientList.splice(index,1)
        },

        openChooseLiseMethod(){
            console.log(this.chooseClientList)
            if(this.daynew_bottom_frame_data === 'daynew_bottom_frame'){
                this.daynew_bottom_frame_data = 'daynew_bottom_frame_wide'
            }else{
                this.daynew_bottom_frame_data = 'daynew_bottom_frame'
            }
            
        },

        saveTemplate(){
            let shppingData = this.chooseClientList.map(item => {
                return {
                    client_id: item._id,//客户_id
                    clientName: item.clientbname,//客户名称
                    clientNameEN: item.clientbnameEN,//英文名称
                    clientAddress: item.clientbaddress,//客户地址
                    clientPhone: item.clientbphone,//客户电话
                    clientPostcode: item.clientbpostcode//客户邮编
                }
            })
            axios
                .post(config.server + '/template/updateClient',{
                    _id: this.$route.query.id,
                    clientArray: shppingData
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.$router.push({path:'/template',query:{code:0}})
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '修改失败'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        searchClientMethod(){
            axios
                .post(config.server + '/clientb/dayFind',{
                        pageSize:this.pageSize,
                        pageNow:this.pageNow,
                        word:this.keyWord
                    })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.countNum = doc.data.count
                        this.clientArray = doc.data.doc
                    }else{
                        this.returnNull = true
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        getTemplateInfo(){
            let tempId = this.$route.query.id
            axios
                .post(config.server + '/template/find',{
                    id:tempId
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.templateName = doc.data.doc.templateName
                        this.chooseClientList = doc.data.doc.clientArray.map(item => {
                            return {
                                _id : item.client_id,//客户_id
                                clientbname: item.clientName,//客户名称
                                clientbnameEN: item.clientNameEN,//英文名称
                                clientbaddress: item.clientAddress,//客户地址
                                clientbphone: item.clientPhone,//客户电话
                                clientbpostcode: item.clientPostcode//客户邮编
                            }
                        })
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '获取信息异常'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        goBackMethod(){
            this.$router.push({path:'/template'})
        }
    }
}
</script>

<style scoped>
.daynew_title{
    height: 40px;
    line-height: 40px;
    background-color: #d74342;
    color: #fff;
    font-size: 16px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.daynew_title_left{
    width: 80px;
}

.daynew_title_right{
    width: 80px
}

.daynew_search{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 3px;
    padding: 0 12px;
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
}

.daynew_search_frame{
    width: 100%;
    position: relative;
}

.daynew_search_frame input{
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    width: 100%;
    text-align: center;
}

.daynew_search_frame_clearbutton{
    position: absolute;
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    top: 2px;
    right: 2px;
    border-radius: 10px;
    padding:2px;
}

.daynew_info{
    text-align: right;
    padding: 0 12px;
    height: 30px;
    line-height: 30px;
    color: rgba(0, 0, 0, 0.12)
}

.daynew_body_item{
    display: flex;
    display: -webkit-flex;
    height: 44px;
    border: 1px solid #eee;
    margin: 4px 0;
    padding: 0 24px;
}

.daynew_body_item_left{
    display: flex;
    justify-content: center;
    align-items: center;
}

.daynew_body_item_left input{
    width: 28px;
    height: 28px;
}

.daynew_body_item_right{
    width: 100%;
    padding: 0 24px;
}

.daynew_body_item_right_top{
    text-align: left;
    font-size: 16px;
    height: 22px;
    line-height: 22px;
}

.daynew_body_item_right_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.5);
}

.daynew_bottom{
    position: fixed;
    bottom: 56px;
    left: 0;
    right: 0;
    z-index: 24;
    background-color: #fff;
}

.daynew_bottom_frame{
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: relative;
    transition: 0.5s;
}

.daynew_bottom_frame_wide{
    height: 400px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: relative;
    transition: 0.3s;
}

.daynew_bottom_frame_button{
    position: absolute;
    bottom: 4px;
    right: 24px;
    background-color: #fff;
    border-radius: 100%;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 50px;
    width: 50px;
    line-height: 50px;
    font-size: 16px;
    background-color: #d74342;
    color: #fff;
}

.daynew_bottom_frame_add{
    position: absolute;
    bottom: 4px;
    left: 24px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 100%;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 50px;
    width: 50px;
    line-height: 50px;
    font-size: 16px;
    background-color: #fff;
    color: #000;
}

.daynew_bottom_content{
    border-top: 1px solid #eee;
    overflow: auto;
    height: 370px;
}

.daynew_bottom_content_frame{
    border-radius: 10px;
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin: 4px 8px;
    position: relative;
}

.daynew_bottom_content_frame_button{
    position: absolute;
    left: 4px;
    top: 0;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    height: 30px;
}

.changequeue_button{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 34px;
    height: 24px;
    border: 1px solid #eee;
    border-radius: 10px;
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
    background-color: #fff;
}

.daynew_bottom_content_frame_x{
    position: absolute;
    right: 4px;
    top: 0;
    border-radius: 100%;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border: 1px solid #eee;
    height: 28px;
    line-height: 26px;
    width: 28px;
    margin-top: 1px;
    font-size: 18px;
}

.day_newclient_back{
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.day_newclient_front {
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

.day_newclient_box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.day_newclient_box_title{
    height: 30px;
    line-height: 30px;
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.day_newclient_box_body{
    margin: 8px;
    padding: 8px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    border: 1px solid #eee;
}

.day_newclient_box_body_item{
    display: flex;
    display: -webkit-flex;
}

.day_newclient_box_body_item{
    padding: 4px 0;
}

.day_newclient_box_body_item_left{
    width: 100px;
    text-align: right;
    line-height: 30px;
}

.day_newclient_box_body_item_right{
    padding-left: 8px;
}

.day_newclient_box_body_item_right input{
    width: 140px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    text-align: center;
}

.day_newclient_box_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    padding-bottom: 8px;
}

.day_new_button{
    border: 1px solid #eee;
    height: 30px;
    line-height: 30px;
    width: 80px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
}
</style>
