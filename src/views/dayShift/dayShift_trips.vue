<template>
    <div id="ds_trips">
        <div style="height:40px;"></div>
        <div v-if="tripsArray.length === 0" style="width: 50%;margin: 0 auto;padding-top: 17.5vh;">
            <img src="../../../public/img/ebuyLogo.png" alt="logo">
            <br>
            <span>~未找到任务~</span>
        </div>
        <div v-else>
            <div v-for="(item,index) in tripsArray" :key="index" class="dst_content_frame">
                <div class="dst_content_title">
                    <span>{{item.driverName}}</span>
                </div>
                <div class="dst_content_center">
                    <div class="dst_content_center_left">
                        <div class="dst_content_center_item">
                            <div class="dst_content_center_item_name">
                                <span>创建日期</span>
                            </div>
                            <div class="dst_content_center_item_content">
                                <span>{{item.orderDate | dateFilter}}</span>
                            </div>
                        </div>
                        <div class="dst_content_center_item">
                            <div class="dst_content_center_item_name">
                                <span>出车时间</span>
                            </div>
                            <div class="dst_content_center_item_content">
                                <span v-if="item.goTime">{{item.goTime | timefilter}}</span>
                                <span v-else>未填写</span>
                            </div>
                        </div>
                        <div class="dst_content_center_item">
                            <div class="dst_content_center_item_name">
                                <span>使用车辆</span>
                            </div>
                            <div class="dst_content_center_item_content">
                                <span v-if="item.carPlate">{{item.carPlate}}</span>
                                <span v-else>未选择</span>
                            </div>
                        </div>
                    </div>
                    <div class="dst_content_center_right">
                        <div class="dst_content_center_item">
                            <div class="dst_content_center_item_name">
                                <span>创建时间</span>
                            </div>
                            <div class="dst_content_center_item_content">
                                <span>{{item.orderDate | timefilter}}</span>
                            </div>
                        </div>
                        <div class="dst_content_center_item">
                            <div class="dst_content_center_item_name">
                                <span>完成时间</span>
                            </div>
                            <div class="dst_content_center_item_content">
                                <span v-if="item.backTime">{{item.backTime | timefilter}}</span>
                                <span v-else>未填写</span>
                            </div>
                        </div>
                        <div class="dst_content_center_item">
                            <div class="dst_content_center_item_name">
                                <span>客户数量</span>
                            </div>
                            <div class="dst_content_center_item_content">
                                <span>{{item.clientArray.length}}</span>
                            </div>
                        </div>
                        <div class="dst_content_center_item">
                            <div class="dst_content_center_item_name">
                                <span>任务状态</span>
                            </div>
                            <div class="dst_content_center_item_content">
                                <span v-if="item.missionFinish" style="color:green">已完成</span>
                                <span v-else style="color:rgb(255, 152, 0)">未完成</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dst_content_bottom">
                    <div class="dst_botton" style="background-color:rgb(255, 152, 0);color:#fff;border:unset" @click="openDelBoxMethod(item)">
                        <span>删除</span>
                    </div>
                    <div class="dst_botton" @click="openEditMethod(item)">
                        <span>修改</span>
                    </div>
                    <div class="dst_botton" @click="openDeatilMethod(item)">
                        <span>查看</span>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:56px;"></div>

        <!-- mission detail start -->
        <transition name="dst-detail-back" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowDetail" class="dst_detail_back"></div>
        </transition>
        <transition name="dst-detail-back" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowDetail" class="dst_detail_front" @click.self.prevent="isShowDetail = false">
                <div class="dst_detail_box">
                    <div class="dst_detail_box_title">
                        <span>{{clientDetailDriver}}</span>
                    </div>
                    <div class="dst_detail_box_body">
                        <div v-for="(item,index) in clientDetailArray" :key="index" class="dst_detail_box_body_frame">
                            <div class="dst_detail_box_body_frame_left">
                                <span>{{index + 1}}</span>
                            </div>
                            <div class="dst_detail_box_body_frame_center">
                                <span>{{item.clientName}}</span>
                            </div>
                            <div class="dst_detail_box_body_frame_right">
                                <span v-if="item.finisDate" style="color:green">已完成</span>
                                <span v-else style="color:rgb(255, 152, 0)">配送中</span>
                            </div>
                        </div>
                        
                    </div>
                    <div class="dst_detail_box_info">
                        <div>
                            <span>共{{clientDetailArray.length}}单</span>
                        </div>
                    </div>
                    <div class="dst_detail_box_bottom">
                        <div class="dst_botton" style="width:80px" @click="isShowDetail = false">
                            <span>取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- mission detail end -->

        <!-- edit mission start  -->
        <transition name="dst-detail-back" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowEdit" class="dst_detail_back"></div>
        </transition>
        <transition name="dst-detail-back" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowEdit" class="dst_detail_front" @click.self.prevent="isShowEdit = false">
                <div class="dst_detail_box">
                    <div class="dst_detail_box_title">
                        <span>{{clientDetailDriver}}</span>
                    </div>
                    <div class="dst_detail_box_body">
                        <div class="dst_edit_box_body_frame" v-for="(item,index) in clientDetailArray" :key="index">
                            <div class="dst_edit_box_body_frame_left">
                                <span>{{item.clientName}}</span>
                            </div>
                            <div class="dst_edit_box_body_frame_right">
                                <div class="dst_circle_botton" @click="showDelClientBoxMethod(item,index)">
                                    <span>x</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dst_detail_box_bottom">
                        <div class="dst_botton" @click="isShowEdit = false" style="width:80px">
                            <span>取消</span>
                        </div>
                        <div class="dst_botton" @click="openNewClientMethod()" style="width:80px;margin-left:8px">
                            <span>增加</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- edit mission end  -->

        <!-- add new client box start -->
        <transition name="dst-detail-back" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowAddNew" class="dst_detail_back" style="z-index: 25"></div>
        </transition>
        <transition name="dst-detail-back" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowAddNew" class="dst_detail_front" style="z-index: 26" @click.self.prevent="isShowAddNew = false">
                <div class="dst_detail_box">
                    <div class="dst_detail_box_title">
                        <span>增加新客户</span>
                    </div>
                    <div class="dst_add_box_body">
                        <div class="dst_add_box_body_top">
                            <input type="text" placeholder="请输入客户名" @keyup.enter="searchClientMethod()" v-model="keyWord">
                            <div class="dst_add_box_body_top_clear" @click="searchClearMethod()">
                                <span>清除</span>
                            </div>
                            <div class="dst_add_box_body_top_res">
                                <div class="dst_add_box_body_top_res_item" v-for="(item,index) in searchResArray" :key="index" @click="chooseClientMethod(item)">
                                    <span>{{item.clientbname}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dst_add_box_body_center">
                            <div class="dst_add_box_body_center_frame">
                                <div class="dst_add_box_body_center_frame_left">
                                    <span>客户名称</span>
                                </div>
                                <div class="dst_add_box_body_center_frame_right">
                                    <span v-if="chooseClientInfo">{{chooseClientInfo.clientbname}}</span>
                                </div>
                            </div>
                            <div class="dst_add_box_body_center_frame">
                                <div class="dst_add_box_body_center_frame_left">
                                    <span>客户地址</span>
                                </div>
                                <div class="dst_add_box_body_center_frame_right">
                                    <span v-if="chooseClientInfo">{{chooseClientInfo.clientbaddress}}</span>
                                </div>
                            </div>
                            <div class="dst_add_box_body_center_frame">
                                <div class="dst_add_box_body_center_frame_left">
                                    <span>客户邮编</span>
                                </div>
                                <div class="dst_add_box_body_center_frame_right">
                                    <span v-if="chooseClientInfo">{{chooseClientInfo.clientbpostcode}}</span>
                                </div>
                            </div>
                            <div class="dst_add_box_body_center_frame">
                                <div class="dst_add_box_body_center_frame_left">
                                    <span>客户电话</span>
                                </div>
                                <div class="dst_add_box_body_center_frame_right">
                                    <span v-if="chooseClientInfo">{{chooseClientInfo.clientbphone}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dst_add_box_body_type">
                            <div class="dst_add_box_body_type_item">
                                <div v-if="chooseType === 'increase'" class="dst_add_box_body_type_frame_red" @click="chooseTypeMethod('increase')">
                                    <div class="icon_increase_red"></div>
                                    <div>
                                        <span>加单</span>
                                    </div>
                                </div>
                                <div v-else class="dst_add_box_body_type_frame" @click="chooseTypeMethod('increase')">
                                    <div class="icon_increase"></div>
                                    <div>
                                        <span style="color: gray">加单</span>
                                    </div>
                                </div>
                                <div v-if="chooseType === 'return'" class="dst_add_box_body_type_frame_red" @click="chooseTypeMethod('return')">
                                    <div class="icon_return_red"></div>
                                    <div>
                                        <span>补单</span>
                                    </div>
                                </div>
                                <div v-else class="dst_add_box_body_type_frame" @click="chooseTypeMethod('return')">
                                    <div class="icon_return"></div>
                                    <div>
                                        <span style="color: gray">补单</span>
                                    </div>
                                </div>
                                <div v-if="chooseType === 'back'" class="dst_add_box_body_type_frame_red" @click="chooseTypeMethod('back')">
                                    <div class="icon_back_red"></div>
                                    <div>
                                        <span>退单</span>
                                    </div>
                                </div>
                                <div v-else class="dst_add_box_body_type_frame" @click="chooseTypeMethod('back')">
                                    <div class="icon_back"></div>
                                    <div>
                                        <span style="color: gray">退单</span>
                                    </div>
                                </div>
                            </div>
                            <div class="dst_add_box_body_type_item" style="padding-top:4px;">
                                <div v-if="chooseType === 'transport'" class="dst_add_box_body_type_frame_red" @click="chooseTypeMethod('transport')">
                                    <div class="icon_transport_red"></div>
                                    <div>
                                        <span>运输</span>
                                    </div>
                                </div>
                                <div v-else class="dst_add_box_body_type_frame" @click="chooseTypeMethod('transport')">
                                    <div class="icon_transport"></div>
                                    <div>
                                        <span style="color: gray">运输</span>
                                    </div>
                                </div>
                                <div v-if="chooseType === 'other'" class="dst_add_box_body_type_frame_red" @click="chooseTypeMethod('other')">
                                    <div class="icon_other_red"></div>
                                    <div>
                                        <span>其他</span>
                                    </div>
                                </div>
                                <div v-else class="dst_add_box_body_type_frame" @click="chooseTypeMethod('other')">
                                    <div class="icon_other"></div>
                                    <div>
                                        <span style="color: gray">其他</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="dst_detail_box_bottom">
                        <div class="dst_botton" @click="isShowAddNew = false" style="width:80px">
                            <span>取消</span>
                        </div>
                        <div class="dst_botton" @click="confirmAddNewClientMethod()" style="width:80px;margin-left:8px">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- add new client box end -->

        <!-- add client error start -->
        <transition name="dst-detail-back" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="showAddClientError" class="dst_detail_back" style="z-index: 25"></div>
        </transition>
        <transition name="dst-detail-back" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="showAddClientError" class="dst_detail_front" style="z-index: 26" @click.self.prevent="showAddClientError = false">
                <div class="dst_detail_box">
                    <div class="dst_detail_box_title">
                        <span>是否继续添加?</span>
                    </div>
                    <div class="dst_add_box_body">
                        <div class="dst_adderr_box_body_frame">
                            <span>今日任务池中已存在该任务</span>
                            <span v-if="addErrInfo.dayMission_id">,该任务已经分配到司机</span>
                            <span v-if="addErrInfo.isFinish">,并且该任务已经完成.</span>
                        </div>
                    </div>
                    <div class="dst_detail_box_bottom">
                        <div class="dst_botton" @click="showAddClientError = false" style="width:80px">
                            <span>取消</span>
                        </div>
                        <div class="dst_botton" @click="secondAddNewClientMethod()" style="width:80px;margin-left:8px">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- add client error end -->

        <!-- del trips dialog start -->
        <transition name="dst-detail-back" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="showDelBox" class="dst_detail_back" style="z-index: 25"></div>
        </transition>
        <transition name="dst-detail-back" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="showDelBox" class="dst_detail_front" style="z-index: 26" @click.self.prevent="showDelBox = false">
                <div class="dst_detail_box">
                    <div class="dst_detail_box_title">
                        <span>删除车次</span>
                    </div>
                    <div class="dst_add_box_body">
                        <div class="dst_adderr_box_body_frame">
                            <div>
                                <span>是否删除该车次以及任务池中的客户？</span>
                            </div>
                            <div>
                                <div class="dst_adderr_box_body_frame_bottom_item">
                                    <div class="dst_adderr_box_body_frame_bottom_item_left">
                                        <span>任务司机</span>
                                    </div>
                                    <div class="dst_adderr_box_body_frame_bottom_item_right">
                                        <span>{{clientDetailDriver}}</span>
                                    </div>
                                </div>
                                <div class="dst_adderr_box_body_frame_bottom_item" style="margin-top: 4px">
                                    <div class="dst_adderr_box_body_frame_bottom_item_left">
                                        <span>客户数量</span>
                                    </div>
                                    <div class="dst_adderr_box_body_frame_bottom_item_right">
                                        <span>{{clientDetailArray.length}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dst_detail_box_bottom">
                        <div class="dst_botton" @click="showDelBox = false" style="width:80px">
                            <span>取消</span>
                        </div>
                        <div class="dst_botton" @click="delTripsMethod()" style="width:80px;margin-left:8px">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- del trips dialog end -->
        
        <!-- del client box start -->
        <transition name="dst-detail-back" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="showDelClientBox" class="dst_detail_back" style="z-index: 25"></div>
        </transition>
        <transition name="dst-detail-back" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="showDelClientBox" class="dst_detail_front" style="z-index: 26" @click.self.prevent="showDelClientBox = false">
                <div class="dst_detail_box">
                    <div class="dst_detail_box_title">
                        <span>删除客户</span>
                    </div>
                    <div class="dst_add_box_body">
                        <div class="dst_adderr_box_body_frame" style="height: 92px;line-height: 74px">
                            <span>是否确认删除该客户?</span>
                        </div>
                    </div>
                    <div class="dst_detail_box_bottom">
                        <div class="dst_botton" @click="showDelClientBox = false" style="width:80px">
                            <span>取消</span>
                        </div>
                        <div class="dst_botton" @click="confirmDelClientInTrips()" style="width:80px;margin-left:8px">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- del client box end -->

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

    data(){
        return {
            tripsArray: [],
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            isShowDetail: false,
            clientDetailArray: [],
            clientDetail_id: null,
            clientDetailDriver: null,
            isShowEdit: false,
            isShowAddNew: false,
            keyWord: null,
            searchResArray: [],
            chooseClientInfo: null,
            showAddClientError: false,
            isShowLoadingAnimation: false,
            addErrInfo: null,
            chooseType: null,
            showDelBox: false,
            showDelClientBox: false
        }
    },
    mounted(){
        this.getTodayDayShiftMissionMethod()
    },

    methods:{
        showDelClientBoxMethod(item,index){
            console.log(item)
            console.log(index)
            this.showDelClientBox = true
        },

        confirmDelClientInTrips(){
            console.log('123')
        },

        delTripsMethod(){
            this.isShowLoadingAnimation = true
            axios
                .post(config.server + '/dsdriver/delTrips',{
                    mission_id: this.clientDetail_id
                })
                .then(doc => {
                    this.isShowLoadingAnimation = false
                    if(doc.data.code === 0){
                        this.showDelBox = false
                        this.isShowLoadingAnimation = false
                        this.getTodayDayShiftMissionMethod()
                        this.tipsShowColor = 'green'
                        this.tipsInfo = '删除成功'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 2000);
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '删除失败'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    this.isShowLoadingAnimation = false
                    console.log(err)
                })
        },

        openDelBoxMethod(item){
            this.showDelBox = true
            this.clientDetailDriver = item.driverName
            this.clientDetailArray = item.clientArray
            this.clientDetail_id = item._id
        },

        chooseTypeMethod(type){
            this.chooseType = type
        },

        secondAddNewClientMethod(){
            this.isShowLoadingAnimation = true
            this.isShowLoadingAnimation = true
            let tempDate = new Date().toDateString()
            tempDate = new Date(tempDate).toISOString()
            let clientName = this.chooseClientInfo.clientbname
            let clientNameEN = this.chooseClientInfo.clientbnameEN
            let client_id = this.chooseClientInfo._id
            let clientAddress = this.chooseClientInfo.clientbaddress
            let clientPhone = this.chooseClientInfo.clientbphone
            let clientPostcode = this.chooseClientInfo.clientbpostcode
            axios
                .post(config.server + '/dsdriver/secondAddClient',{
                    orderDate: tempDate,
                    clientName: clientName,
                    clientNameEN: clientNameEN,
                    client_id: client_id,
                    clientAddress: clientAddress,
                    clientPhone: clientPhone,
                    clientPostcode: clientPostcode,
                    isIncreaseOrder: this.chooseType,
                    orderDate: new Date().toISOString(),
                    dayMission_id: this.clientDetail_id,//driver mission _id
                    driverName: this.clientDetailDriver
                })
                .then(doc => {
                    this.isShowLoadingAnimation = false
                    if(doc.data.code === 0){
                        this.showAddClientError = false
                        this.getTodayDayShiftMissionMethod()
                        this.tipsShowColor = 'green'
                        this.tipsInfo = '添加成功'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 2000);
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '添加失败'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    this.isShowLoadingAnimation = false
                    console.log(err)
                })
        },

        confirmAddNewClientMethod(){
            if(this.chooseClientInfo && this.chooseType){
                this.isShowLoadingAnimation = true
                let tempDate = new Date().toDateString()
                tempDate = new Date(tempDate).toISOString()
                let clientName = this.chooseClientInfo.clientbname
                let clientNameEN = this.chooseClientInfo.clientbnameEN
                let client_id = this.chooseClientInfo._id
                let clientAddress = this.chooseClientInfo.clientbaddress
                let clientPhone = this.chooseClientInfo.clientbphone
                let clientPostcode = this.chooseClientInfo.clientbpostcode
                axios
                    .post(config.server + '/dsdriver/addClient',{
                        orderDate: tempDate,
                        clientName: clientName,
                        clientNameEN: clientNameEN,
                        client_id: client_id,
                        clientAddress: clientAddress,
                        clientPhone: clientPhone,
                        clientPostcode: clientPostcode,
                        isIncreaseOrder: this.chooseType,
                        orderDate: tempDate,
                        newDate: new Date().toISOString(),
                        dayMission_id: this.clientDetail_id,//driver mission _id
                        driverName: this.clientDetailDriver
                    })
                    .then(doc => {
                        this.isShowLoadingAnimation = false
                        if(doc.data.code === 0 && !doc.data.msg){
                            this.getTodayDayShiftMissionMethod()
                            this.isShowAddNew = false
                            this.tipsShowColor = 'green'
                            this.tipsInfo = '添加成功'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }else if(doc.data.code === 0 && doc.data.msg){
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '添加失败'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 3000);
                        }else if(doc.data.code === 1){
                            this.isShowAddNew = false
                            this.showAddClientError = true
                            this.addErrInfo = doc.data.doc
                        }
                    })
                    .catch(err => {
                        this.isShowLoadingAnimation = false
                        console.log(err)
                    })
            }else if(this.chooseType === null){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请选择任务类型'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }else{
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请选择客户'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }
        },

        chooseClientMethod(item){
            this.chooseClientInfo = item
            this.searchResArray = []
        },

        searchClearMethod(){
            this.keyWord = null
            this.searchResArray = []
        },

        searchClientMethod(){
            if(this.keyWord){
                axios
                    .post(config.server + '/dsdriver/search',{
                        keyWord: this.keyWord
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.searchResArray = doc.data.doc
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '未找到符合条件的数据'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }else{
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请输入关键字'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }
        },

        openNewClientMethod(){
            this.isShowEdit = false
            this.isShowAddNew = true
        },

        openEditMethod(item){
            this.clientDetailDriver = item.driverName
            this.clientDetailArray = item.clientArray
            this.clientDetail_id = item._id
            this.isShowEdit = true
        },

        openDeatilMethod(item){
            this.clientDetailDriver = item.driverName
            this.clientDetailArray = item.clientArray
            this.isShowDetail = true
        },

        getTodayDayShiftMissionMethod(){
            let tempToday = new Date().toDateString()
            tempToday = new Date(tempToday).toISOString()
            axios
                .post(config.server + '/dsdriver/findByDate',{
                    tripsDate: tempToday
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.tripsArray = doc.data.doc
                    }else if(doc.data.code === 1){
                        this.tripsArray = []
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '查找任务时出现错误'
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
    }
}
</script>

<style scoped>
.dst_content_frame{
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin: 8px 24px;
}

.dst_content_title{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
}

.dst_content_center{
    display: flex;
    display: -webkit-flex;
    padding: 0 8px;
    flex-wrap: wrap;
    justify-content: space-around;
}

.dst_content_center_item{
    display: flex;
    display: -webkit-flex;
    height: 24px;
    line-height: 24px;
}

.dst_content_center_item_name{
    width: 60px;
    text-align: right;
}

.dst_content_center_item_content{
    width: 92px;
    text-align: left;
    padding-left: 8px;
}

.dst_content_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    padding: 8px 0;
}

.dst_detail_back{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.12);
    z-index: 24;
}

.dst_detail_front{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 25;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.dst_detail_box{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    overflow: hidden;
}

.dst_detail_box_title{
    height: 30px;
    line-height: 30px;
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 16px;
}

.dst_detail_box_body{
    margin: 8px;
    height: 320px;
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    border: 1px solid #eee;
}

.dst_detail_box_body_frame{
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #eee;
    padding: 2px 8px;
    height: 24px;
    line-height: 20px;
}

.dst_detail_box_body_frame_left{
    width: 28px;
    text-align: right;
    padding-right: 8px;
}

.dst_detail_box_body_frame_center{
    width: 120px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.dst_detail_box_body_frame_right{
    width: 60px;
    text-align: right;
}

.dst_detail_box_info{
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 8px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
}

.dst_detail_box_info div{
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
}

.dst_detail_box_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    padding-bottom: 8px;
}

.dst_botton{
    border: 1px solid #eee;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 60px;
}

.dst_edit_box_body_frame{
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #eee;
    height: 30px;
    line-height: 30px;
    padding: 0 8px;
    margin: 4px 0;
}

.dst_edit_box_body_frame_left{
    width: 160px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.dst_edit_box_body_frame_right{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.dst_circle_botton{
    width: 28px;
    height: 28px;
    line-height: 25px;
    border: 1px solid #eee;
    border-radius: 100%;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.dst_add_box_body{
    margin: 8px;
}

.dst_add_box_body_top{
    position: relative;
}

.dst_add_box_body_top input{
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    text-align: center;
    width: 180px;
}

.dst_add_box_body_top_clear{
    position: absolute;
    right: 22px;
    top: 2px;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 2px;
}

.dst_add_box_body_top_res{
    position: absolute;
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    top: 33px;
    left: 18px;
    overflow: hidden;
}

.dst_add_box_body_top_res_item{
    height: 30px;
    line-height: 30px;
    border: 1px solid #eee;
    width: 180px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.dst_add_box_body_center{
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin-top: 8px;
}

.dst_add_box_body_center_frame{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    padding: 0 8px;
}

.dst_add_box_body_center_frame_left{
    width: 60px;
    text-align: right;
}

.dst_add_box_body_center_frame_right{
    width: 140px;
    padding-left: 8px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.dst_adderr_box_body_frame{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 8px;
    border-radius: 10px;
    border: 1px solid #eee;
    width: 200px;
}

.dst_adderr_box_body_frame_bottom_item{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
}

.dst_adderr_box_body_frame_bottom_item_left{
    width: 68px;
    text-align: right;
    padding-right: 8px;
}

.dst_adderr_box_body_frame_bottom_item_right{
    width: 100px;
    text-align: left;
    padding: 0 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
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

.dst_add_box_body_type{
    display: flex;
    display: -webkit-flex;
    padding-top: 8px;
    flex-direction: column;
}

.dst_add_box_body_type_frame{
    border: 1px solid #eee;
    border-radius: 10px;
    font-size: 10px;
    width: 50px;
}

.dst_add_box_body_type_frame_red{
    border: 1px solid #d74342;
    border-radius: 10px;
    font-size: 10px;
    width: 50px;
}

.dst_add_box_body_type_item{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
}

.icon_increase {
    background: #e0e0e0;
    mask-image: url(../../../public/icons/increaseOrder1.svg);
    -webkit-mask-image: url(../../../public/icons/increaseOrder1.svg);
    width: 28px;
    height: 28px;
    mask-size: 28px;
    -webkit-mask-size: 28px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}

.icon_increase_red{
    background: #d74342;
    mask-image: url(../../../public/icons/increaseOrder1.svg);
    -webkit-mask-image: url(../../../public/icons/increaseOrder1.svg);
    width: 28px;
    height: 28px;
    mask-size: 28px;
    -webkit-mask-size: 28px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}

.icon_return {
    background: #e0e0e0;
    mask-image: url(../../../public/icons/increaseOrder2.svg);
    -webkit-mask-image: url(../../../public/icons/increaseOrder2.svg);
    width: 28px;
    height: 28px;
    mask-size: 28px;
    -webkit-mask-size: 28px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}

.icon_return_red{
    background: #d74342;
    mask-image: url(../../../public/icons/increaseOrder2.svg);
    -webkit-mask-image: url(../../../public/icons/increaseOrder2.svg);
    width: 28px;
    height: 28px;
    mask-size: 28px;
    -webkit-mask-size: 28px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}

.icon_back {
    background: #e0e0e0;
    mask-image: url(../../../public/icons/baseline-reply_all-24px.svg);
    -webkit-mask-image: url(../../../public/icons/baseline-reply_all-24px.svg);
    width: 28px;
    height: 28px;
    mask-size: 28px;
    -webkit-mask-size: 28px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}

.icon_back_red{
    background: #d74342;
    mask-image: url(../../../public/icons/baseline-reply_all-24px.svg);
    -webkit-mask-image: url(../../../public/icons/baseline-reply_all-24px.svg);
    width: 28px;
    height: 28px;
    mask-size: 28px;
    -webkit-mask-size: 28px;
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
    width: 28px;
    height: 28px;
    mask-size: 32px;
    -webkit-mask-size: 32px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}

.icon_transport_red{
    background: #d74342;
    mask-image: url(../../../public/icons/icon_transport.svg);
    -webkit-mask-image: url(../../../public/icons/icon_transport.svg);
    width: 28px;
    height: 28px;
    mask-size: 32px;
    -webkit-mask-size: 32px;
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
    width: 28px;
    height: 28px;
    mask-size: 36px;
    -webkit-mask-size: 36px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}

.icon_other_red{
    background: #d74342;
    mask-image: url(../../../public/icons/icon_other.svg);
    -webkit-mask-image: url(../../../public/icons/icon_other.svg);
    width: 28px;
    height: 28px;
    mask-size: 36px;
    -webkit-mask-size: 36px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    margin: 0 auto;
    transition: 0.2s;
}
</style>
