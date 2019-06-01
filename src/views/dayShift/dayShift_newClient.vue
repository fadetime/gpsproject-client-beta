<template>
    <div id="day_newclient">
        <div class="daynew_title">
            <div class="daynew_title_left" @click="goBackMethod()">
                <div>
                    <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                </div>
            </div>
            <div class="daynew_title_center">
                <div>
                    <span>{{templateName}}</span>
                </div>
                <div @click="showChangeNameBoxMethod()">
                    <div class="icon_edit"></div>
                </div>
            </div>
            <div class="daynew_title_right" @click="openMatchBoxMethod()">
                <div class="icon_match"></div>
            </div>
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
                    <input :id="'daynew_' + index" type="checkbox" :value="item" v-model="chooseClientList">
                </div>
                <div class="daynew_body_item_right">
                    <div class="daynew_body_item_right_top">
                        <label :for="'daynew_' + index">
                            <span>{{item.clientbname}}</span>
                        </label>
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
                        <div class="daynew_bottom_content_frame_missiontype" @click="openChooseMissionTypeBoxMethod(item,index)">
                            <span v-if="item.isIncreaseOrder === 'order'">订单</span>
                            <span v-else-if="item.isIncreaseOrder === 'true'">加单</span>
                            <span v-else-if="item.isIncreaseOrder === 'false'">补单</span>
                            <span v-else-if="item.isIncreaseOrder === 'bun'">面食</span>
                            <span v-else-if="item.isIncreaseOrder === 'return'">退单</span>
                            <span v-else-if="item.isIncreaseOrder === 'change'">换货</span>
                            <span v-else-if="item.isIncreaseOrder === 'delivery'">运输</span>
                            <span v-else-if="item.isIncreaseOrder === 'other'">其他</span>
                            <span v-else style="color: green">类型</span>
                        </div>
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

        <!-- show mission type box start -->
        <transition name="remove-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowMissionTypeBox" class="day_newclient_back"></div>
        </transition>
        <transition name="remove-client-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowMissionTypeBox" class="day_newclient_front" @click.self.prevent="isShowMissionTypeBox = false">
                <div class="day_newclient_box">
                    <div class="day_newclient_box_title">
                        <span>任务类型</span>
                    </div>
                    <div class="day_newclient_box_body">
                        <div class="day_newclient_box_body_clientname">
                            <span>{{tempClientName}}</span>
                        </div>
                        <div class="day_type_frame">
                            <div v-if="chooseMissionType === 'order'" class="day_type_frame_border_red">
                                <div class="icon_bill_red"></div>
                                <div>
                                    <span>订单</span>
                                </div>
                            </div>
                            <div v-else class="day_type_frame_border" @click="chooseMissionType = 'order'">
                                <div class="icon_bill"></div>
                                <div>
                                    <span style="color: #e0e0e0">订单</span>
                                </div>
                            </div>
                            <div v-if="chooseMissionType === 'true'" class="day_type_frame_border_red">
                                <div class="icon_increaseorder_red"></div>
                                <div>
                                    <span>加单</span>
                                </div>
                            </div>
                            <div v-else class="day_type_frame_border" @click="chooseMissionType = 'true'">
                                <div class="icon_increaseorder"></div>
                                <div>
                                    <span style="color: #e0e0e0">加单</span>
                                </div>
                            </div>
                            <div v-if="chooseMissionType === 'false'" class="day_type_frame_border_red">
                                <div class="icon_return_red"></div>
                                <div>
                                    <span>补单</span>
                                </div>
                            </div>
                            <div v-else class="day_type_frame_border" @click="chooseMissionType = 'false'">
                                <div class="icon_return"></div>
                                <div>
                                    <span style="color: #e0e0e0">补单</span>
                                </div>
                            </div>
                            
                        </div>
                        <div class="day_type_frame">
                            <div v-if="chooseMissionType === 'bun'" class="day_type_frame_border_red">
                                <div class="icon_bun_red"></div>
                                <div>
                                    <span>面食</span>
                                </div>
                            </div>
                            <div v-else class="day_type_frame_border" @click="chooseMissionType = 'bun'">
                                <div class="icon_bun"></div>
                                <div>
                                    <span style="color: #e0e0e0">面食</span>
                                </div>
                            </div>
                            <div v-if="chooseMissionType === 'return'" class="day_type_frame_border_red">
                                <div class="icon_back_red"></div>
                                <div>
                                    <span>退单</span>
                                </div>
                            </div>
                            <div v-else class="day_type_frame_border" @click="chooseMissionType = 'return'">
                                <div class="icon_back"></div>
                                <div>
                                    <span style="color: #e0e0e0">退单</span>
                                </div>
                            </div>
                            <div v-if="chooseMissionType === 'change'" class="day_type_frame_border_red">
                                <div class="icon_change_red"></div>
                                <div>
                                    <span>换货</span>
                                </div>
                            </div>
                            <div v-else class="day_type_frame_border" @click="chooseMissionType = 'change'">
                                <div class="icon_change"></div>
                                <div>
                                    <span style="color: #e0e0e0">换货</span>
                                </div>
                            </div>
                            
                        </div>
                        <div class="day_type_frame">
                            <div v-if="chooseMissionType === 'delivery'" class="day_type_frame_border_red">
                                <div class="icon_transport_red"></div>
                                <div>
                                    <span>运输</span>
                                </div>
                            </div>
                            <div v-else class="day_type_frame_border" @click="chooseMissionType = 'delivery'">
                                <div class="icon_transport"></div>
                                <div>
                                    <span style="color: #e0e0e0">运输</span>
                                </div>
                            </div>
                            <div v-if="chooseMissionType === 'other'" class="day_type_frame_border_red">
                                <div class="icon_other_red"></div>
                                <div>
                                    <span>其他</span>
                                </div>
                            </div>
                            <div v-else class="day_type_frame_border" @click="chooseMissionType = 'other'">
                                <div class="icon_other"></div>
                                <div>
                                    <span style="color: #e0e0e0">其他</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="day_newclient_box_bottom">
                            <div class="day_new_button" @click="isShowMissionTypeBox = false">
                                <span>取消</span>
                            </div>
                            <div class="day_new_button" style="margin-left:8px;" @click="confirmChangeTypeMethod()">
                                <span>确认</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- show mission type box end -->

        <!-- match box start -->
        <transition name="remove-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowMatchBox" class="day_newclient_back"></div>
        </transition>
        <transition name="remove-client-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowMatchBox" class="day_newclient_front" @click.self.prevent="isShowMatchBox = false">
                <div class="day_newclient_box">
                    <div class="day_newclient_box_title">
                        <span>定义匹配</span>
                    </div>
                    <div class="day_match_box_body">
                        <div class="day_match_box_body_item">
                            <div class="day_match_box_body_left">
                                <label for="day_match_bun">
                                    <span v-if="matchBun" style="color: green">匹配面食数据</span>
                                    <span v-else style="color: rgb(255, 152, 0)">匹配面食数据</span>
                                </label>
                            </div>
                            <div class="day_match_box_body_right">
                                <input id="day_match_bun" type="checkbox" v-model="matchBun">
                            </div>
                        </div>
                        <div class="day_match_box_body_item">
                            <div class="day_match_box_body_left">
                                <label for="day_match_bun">
                                    <span v-if="match14" style="color: green">匹配14车数据</span>
                                    <span v-else style="color: rgb(255, 152, 0)">匹配14车数据</span>
                                </label>
                            </div>
                            <div class="day_match_box_body_right">
                                <input id="day_match_bun" type="checkbox" v-model="match14">
                            </div>
                        </div>
                        <div class="day_match_box_body_item">
                            <div class="day_match_box_body_left">
                                <label for="day_match_bun">
                                    <span v-if="match19" style="color: green">匹配20车数据</span>
                                    <span v-else style="color: rgb(255, 152, 0)">匹配20车数据</span>
                                </label>
                            </div>
                            <div class="day_match_box_body_right">
                                <input id="day_match_bun" type="checkbox" v-model="match19">
                            </div>
                        </div>
                    </div>
                    <div class="day_newclient_box_bottom">
                        <div class="day_new_button" @click="isShowMatchBox = false">
                            <span>取消</span>
                        </div>
                        <div class="day_new_button" style="margin-left:8px;" @click="confirmChangeMatch()">
                            <span>确认</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- match box end -->

        <!-- change template name box start -->
        <transition name="remove-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowChangeNameBox" class="day_newclient_back"></div>
        </transition>
        <transition name="remove-client-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowChangeNameBox" class="day_newclient_front" @click.self.prevent="isShowChangeNameBox = false">
                <div class="day_newclient_box">
                    <div class="day_newclient_box_title">
                        <span>修改模板名</span>
                    </div>
                    <div class="day_match_box_body">
                        <div class="day_changename_item">
                            <div class="day_changename_item_left">
                                <span>原有模板名</span>
                            </div>
                            <div class="day_changename_item_right">
                                <div>
                                    <span>{{templateName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="day_changename_item" style="margin-top: 8px;">
                            <div class="day_changename_item_left">
                                <span>修改模板名</span>
                            </div>
                            <div class="day_changename_item_right">
                                <input type="text" v-model="newTemplateName" placeholder="请输入名称">
                            </div>
                        </div>
                    </div>
                    <div class="day_newclient_box_bottom">
                        <div class="day_new_button" @click="isShowChangeNameBox = false">
                            <span>取消</span>
                        </div>
                        <div class="day_new_button" style="margin-left:8px;" @click="changeTemplateNameMethod()">
                            <span>确认</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- change template name box end -->

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
            newClientPostcode: null,
            isShowMissionTypeBox: false,
            tempClientName: null,
            tempClient_id: null,
            chooseMissionType: null,
            tempNumInArray: null,
            isShowMatchBox: false,
            matchBun: false,
            match14: false,
            match19: false,
            isShowChangeNameBox: false,
            newTemplateName: null
        }
    },

    methods:{
        changeTemplateNameMethod(){
            axios
                .post(config.server + '/template/changeName',{
                    _id: this.$route.query.id,
                    newTemplateName:this.newTemplateName
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.isShowChangeNameBox = false
                        this.tipsShowColor = 'green'
                        this.tipsInfo = '修改成功'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 1500);
                        this.getTemplateInfo()
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '修改失败'
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

        showChangeNameBoxMethod(){
            this.isShowChangeNameBox = true
        },

        confirmChangeMatch(){
            axios
                .post(config.server + '/template/changeMatch',{
                    _id: this.$route.query.id,
                    matchBun: this.matchBun,
                    match14: this.match14,
                    match19: this.match19
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.isShowMatchBox = false
                        this.tipsShowColor = 'green'
                        this.tipsInfo = '更新匹配成功'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 1500);
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '更新匹配失败'
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

        openMatchBoxMethod(){
            console.log('123')
            this.isShowMatchBox = true
        },

        confirmChangeTypeMethod(){
            if(this.chooseMissionType === null){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请选择任务类型'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }else{
                axios
                    .post(config.server + '/template/changeMissionType',{
                        _id: this.$route.query.id,
                        client_id: this.tempClient_id,
                        isIncreaseOrder: this.chooseMissionType
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.isShowMissionTypeBox = false
                            this.chooseClientList[this.tempNumInArray].isIncreaseOrder = this.chooseMissionType
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '更新失败'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },

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

        openChooseMissionTypeBoxMethod(item,index){
            this.tempClientName = item.clientbname
            this.tempClient_id = item._id
            this.tempNumInArray = index
            this.isShowMissionTypeBox = true
        },

        pullClientMethod(index){
            this.chooseClientList.splice(index,1)
        },

        openChooseLiseMethod(){
            if(this.daynew_bottom_frame_data === 'daynew_bottom_frame'){
                this.daynew_bottom_frame_data = 'daynew_bottom_frame_wide'
            }else{
                this.daynew_bottom_frame_data = 'daynew_bottom_frame'
            }
            
        },

        saveTemplate(){
            let shppingData = this.chooseClientList.map(item => {
                return {
                    client_id: item.client_id,//客户_id
                    clientName: item.clientbname,//客户名称
                    clientNameEN: item.clientbnameEN,//英文名称
                    clientAddress: item.clientbaddress,//客户地址
                    clientPhone: item.clientbphone,//客户电话
                    clientPostcode: item.clientbpostcode,//客户邮编
                    isIncreaseOrder: item.isIncreaseOrder//任务类型
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
                        console.log(doc)
                        this.templateName = doc.data.doc.templateName
                        this.matchBun = doc.data.doc.matchBun
                        this.match14 = doc.data.doc.match14
                        this.match19 = doc.data.doc.match19
                        this.chooseClientList = doc.data.doc.clientArray.map(item => {
                            return {
                                client_id : item.client_id,//客户_id
                                clientbname: item.clientName,//客户名称
                                clientbnameEN: item.clientNameEN,//英文名称
                                clientbaddress: item.clientAddress,//客户地址
                                clientbphone: item.clientPhone,//客户电话
                                clientbpostcode: item.clientPostcode,//客户邮编
                                isIncreaseOrder: item.isIncreaseOrder,//任务类型
                                _id: item._id//数组中的_id
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

.daynew_title_center{
    display: flex;
    display: -webkit-flex;
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

.daynew_bottom_content_frame_missiontype{
    position: absolute;
    right: 36px;
    top: 0;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border: 1px solid #eee;
    height: 28px;
    line-height: 26px;
    width: 44px;
    margin-top: 1px;
    font-size: 14px;
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

.day_newclient_box_body_clientname{
    border-bottom: 1px solid #eee;
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

.day_type_frame{
    display: flex;
    display: -webkit-flex;
    margin-top: 8px;
}

.day_type_frame_border{
    border-radius: 10px;
    border: 1px solid #eee;
    width: 58px;
    margin: 0 4px;
}

.day_type_frame_border_red{
    border-radius: 10px;
    border: 1px solid #d74342;
    width: 58px;
    margin: 0 4px;
}

.icon_bill {
    background: #e0e0e0;
    mask-image: url(../../../public/icons/icon_bill.svg);
    -webkit-mask-image: url(../../../public/icons/icon_bill.svg);
    width: 36px;
    height: 36px;
    margin: 0 auto;
    transition: 0.2s;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 36px;
    -webkit-mask-size: 36px;
}

.icon_bill_red {
    background: #d74342;
    mask-image: url(../../../public/icons/icon_bill.svg);
    -webkit-mask-image: url(../../../public/icons/icon_bill.svg);
    width: 36px;
    height: 36px;
    margin: 0 auto;
    transition: 0.2s;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 36px;
    -webkit-mask-size: 36px;
}

.icon_increaseorder {
    background: #e0e0e0;
    mask-image: url(../../../public/icons/increaseOrder1.svg);
    -webkit-mask-image: url(../../../public/icons/increaseOrder1.svg);
    width: 36px;
    height: 36px;
    margin: 0 auto;
    transition: 0.2s;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 36px;
    -webkit-mask-size: 36px;
}

.icon_increaseorder_red {
    background: #d74342;
    mask-image: url(../../../public/icons/increaseOrder1.svg);
    -webkit-mask-image: url(../../../public/icons/increaseOrder1.svg);
    width: 36px;
    height: 36px;
    margin: 0 auto;
    transition: 0.2s;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 36px;
    -webkit-mask-size: 36px;
}

.icon_return {
    background: #e0e0e0;
    mask-image: url(../../../public/icons/increaseOrder2.svg);
    -webkit-mask-image: url(../../../public/icons/increaseOrder2.svg);
    width: 36px;
    height: 36px;
    margin: 0 auto;
    transition: 0.2s;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 36px;
    -webkit-mask-size: 36px;
}

.icon_return_red {
    background: #d74342;
    mask-image: url(../../../public/icons/increaseOrder2.svg);
    -webkit-mask-image: url(../../../public/icons/increaseOrder2.svg);
    width: 36px;
    height: 36px;
    margin: 0 auto;
    transition: 0.2s;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 36px;
    -webkit-mask-size: 36px;
}

.icon_bun {
    background: #e0e0e0;
    mask-image: url(../../../public/icons/icon_bun.svg);
    -webkit-mask-image: url(../../../public/icons/icon_bun.svg);
    width: 36px;
    height: 36px;
    margin: 0 auto;
    transition: 0.2s;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 36px;
    -webkit-mask-size: 36px;
}

.icon_bun_red {
    background: #d74342;
    mask-image: url(../../../public/icons/icon_bun.svg);
    -webkit-mask-image: url(../../../public/icons/icon_bun.svg);
    width: 36px;
    height: 36px;
    margin: 0 auto;
    transition: 0.2s;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 36px;
    -webkit-mask-size: 36px;
}

.icon_back {
    background: #e0e0e0;
    mask-image: url(../../../public/icons/baseline-reply_all-24px.svg);
    -webkit-mask-image: url(../../../public/icons/baseline-reply_all-24px.svg);
    width: 36px;
    height: 36px;
    margin: 0 auto;
    transition: 0.2s;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 36px;
    -webkit-mask-size: 36px;
}

.icon_back_red {
    background: #d74342;
    mask-image: url(../../../public/icons/baseline-reply_all-24px.svg);
    -webkit-mask-image: url(../../../public/icons/baseline-reply_all-24px.svg);
    width: 36px;
    height: 36px;
    margin: 0 auto;
    transition: 0.2s;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 36px;
    -webkit-mask-size: 36px;
}

.icon_edit{
    background: #fff;
    mask-image: url(../../../public/icons/icon_edit.svg);
    -webkit-mask-image: url(../../../public/icons/icon_edit.svg);
    width: 40px;
    height: 40px;
    margin: 0 auto;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 24px;
    -webkit-mask-size: 24px;
    mask-position: center;
    -webkit-mask-position: center;
}

.icon_match{
    background: #fff;
    mask-image: url(../../../public/icons/icon_match.svg);
    -webkit-mask-image: url(../../../public/icons/icon_match.svg);
    width: 40px;
    height: 40px;
    margin: 0 auto;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 36px;
    -webkit-mask-size: 36px;
    mask-position: center;
    -webkit-mask-position: center;
}

.icon_change {
    background: #e0e0e0;
    mask-image: url(../../../public/icons/icon_change.svg);
    -webkit-mask-image: url(../../../public/icons/icon_change.svg);
    width: 36px;
    height: 36px;
    mask-size: 36px;
    -webkit-mask-size: 36px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}

.icon_change_red {
    background: #d74342;
    mask-image: url(../../../public/icons/icon_change.svg);
    -webkit-mask-image: url(../../../public/icons/icon_change.svg);
    width: 36px;
    height: 36px;
    mask-size: 36px;
    -webkit-mask-size: 36px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}

.icon_transport {
    background: #e0e0e0;
    mask-image: url(../../../public/icons/icon_transport.svg);
    -webkit-mask-image: url(../../../public/icons/icon_transport.svg);
    width: 36px;
    height: 36px;
    mask-size: 42px;
    -webkit-mask-size: 42px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}

.icon_transport_red {
    background: #d74342;
    mask-image: url(../../../public/icons/icon_transport.svg);
    -webkit-mask-image: url(../../../public/icons/icon_transport.svg);
    width: 36px;
    height: 36px;
    mask-size: 42px;
    -webkit-mask-size: 42px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}

.icon_other {
    background: #e0e0e0;
    mask-image: url(../../../public/icons/icon_other.svg);
    -webkit-mask-image: url(../../../public/icons/icon_other.svg);
    width: 36px;
    height: 36px;
    mask-size: 48px;
    -webkit-mask-size: 48px;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
}

.icon_other_red {
    background: #d74342;
    mask-image: url(../../../public/icons/icon_other.svg);
    -webkit-mask-image: url(../../../public/icons/icon_other.svg);
    width: 36px;
    height: 36px;
    mask-size: 48px;
    -webkit-mask-size: 48px;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
}

.day_match_box_body{
    border: 1px solid #eee;
    margin: 8px;
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    
}

.day_match_box_body_item{
    height: 30px;
    line-height: 30px;
    display: flex;
    display: -webkit-flex;
}

.day_match_box_body_left{
    width: 116px;
    text-align: left;
}

.day_match_box_body_right{
    padding-top: 2px;
    padding-left: 8px;
}

.day_match_box_body_right input{
    width: 20px;
    height: 20px;
}

.day_changename_item{
    display: flex;
    display: -webkit-flex;
}

.day_changename_item_left{
    width: 80px;
    text-align: right;
    padding-right: 8px;
    height: 30px;
    line-height: 30px;
}

.day_changename_item_right div{
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    width: 120px;
    height: 30px;
    line-height: 30px;
}

.day_changename_item_right input{
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
}
</style>
