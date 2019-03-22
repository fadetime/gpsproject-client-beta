<template>
    <div id="tripcount">
        <div class="tripcount_title">
            <span>Basket per trip counting</span>
        </div>
        <div style="height:40px">
            <!-- title empty space -->
        </div>
        <div class="tripcount_body" ref="tripcount_body">
            <div v-if="!pageFlag" class="tripcount_body_item">
                <div class="tripcount_body_frame" @click="addMission">
                    <div class="add_icon"></div>
                    <div>
                        <span>ADD</span>
                    </div>
                </div>
            </div>
            <div v-else class="tripcount_body_content">
                <div class="tripcount_body_content_title">
                    <div class="tripcount_body_content_title_left">
                        <span>Mission Date</span>
                    </div>
                    <div class="tripcount_body_content_title_right">
                        <span>{{missionDate}}</span>
                    </div>
                </div>
                <div class="tripcount_body_content_top">
                    <div class="tripcount_body_content_top_item">
                        <span>No.</span>
                    </div>
                    <div class="tripcount_body_content_top_item">
                        <span>Car No</span>
                    </div>
                    <div class="tripcount_body_content_top_item">
                        <span>Out</span>
                    </div>
                    <div class="tripcount_body_content_top_item" style="border-right: none">
                        <span>In</span>
                    </div>
                </div>
                <div class="tripcount_body_content_center_frame" ref="infoArea" style="height:300px;">
                    <div class="tripcount_body_content_center" v-for="(item,index) in missionArray" :key="index" @click="editCountMethod(item,index)">
                        <div class="tripcount_body_content_center_item">
                            <span>{{index}}</span>
                        </div>
                        <div class="tripcount_body_content_center_item">
                            <span v-if="item.carNo">{{item.carNo}}</span>
                            <span v-else>Null</span>
                        </div>
                        <div class="tripcount_body_content_center_item">
                            <span v-if="item.out">{{item.out}}</span>
                            <span v-else>Null</span>
                        </div>
                        <div class="tripcount_body_content_center_item">
                            <span v-if="item.in">{{item.in}}</span>
                            <span v-else>Null</span>
                        </div>
                    </div>
                </div>
                <div style="display:flex;display:-webkit-flex;justify-content:center;margin-top:10px;margin-left:24px;margin-right:24px;">
                    <div class="tripcount_box_footer_button" style="width:100%" @click="openConfirmDialog">
                        <span>Submit</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- add mission tips start -->
        <transition name="remove-client-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowAddTips"
                 class="tripcount_add_tips_back" @click.self.prevent="isShowAddTips = false">
                <div class="tripcount_add_tips_box">
                    <div class="tripcount_add_tips_box_title">
                        <span>TIPS</span>
                    </div>
                    <div class="tripcount_add_tips_box_body">
                        <span>Do you want create today mission?</span>
                    </div>
                    <div class="tripcount_add_tips_box_bottom">
                        <div class="tripcount_box_footer_button" @click="isShowAddTips = false">
                            <span>NO</span>
                        </div>
                        <div class="tripcount_box_footer_button" style="margin-left:8px" @click="confirmAddMission">
                            <span>YES</span>
                        </div>
                    </div>
                </div> 
                
            </div>
        </transition> 
        <!-- add mission tips end -->

        <!-- edit item dialog start -->
        <transition name="remove-client-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowEditDialog"
                 class="tripcount_add_tips_back" @click.self.prevent="isShowEditDialog = false">
                <div class="tripcount_add_tips_box">
                    <div class="tripcount_add_tips_box_title">
                        <span>Edit Information</span>
                    </div>
                    <div class="tripcount_edit_body">
                        <div class="tripcount_edit_item">
                            <div class="tripcount_edit_item_left">
                                <span>No.</span>
                            </div>
                            <div class="tripcount_edit_item_right">
                                <div class="tripcount_edit_item_right_box">
                                    <span>{{shippingIndex}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="tripcount_edit_item">
                            <div class="tripcount_edit_item_left">
                                <span>Car No.</span>
                            </div>
                            <div class="tripcount_edit_item_right" @click="openCarListDialog">
                                <div class="tripcount_edit_item_right_box" style="background-color:#fff;border: 1px solid rgba(0,0,0,0.4);">
                                    <span v-if="shippingDate.carNo">{{shippingDate.carNo}}</span>
                                    <span v-else>Choise</span>
                                </div>
                            </div>
                        </div>
                        <div class="tripcount_edit_item">
                            <div class="tripcount_edit_item_left">
                                <span>Out num</span>
                            </div>
                            <div class="tripcount_edit_item_right">
                                <input type="number" v-model="shippingDate.out">
                            </div>
                        </div>
                        <div class="tripcount_edit_item" style="margin-bottom:8px;">
                            <div class="tripcount_edit_item_left">
                                <span>In num</span>
                            </div>
                            <div class="tripcount_edit_item_right">
                                <input type="number" v-model="shippingDate.in">
                            </div>
                        </div>
                    </div>
                    <div class="tripcount_add_tips_box_bottom">
                        <div class="tripcount_box_footer_button" @click="isShowEditDialog = false">
                            <span>Cancel</span>
                        </div>
                        <div class="tripcount_box_footer_button" style="margin-left:8px" @click="confirmEditMission">
                            <span>Submit</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>    
        <!-- edit item dialog end -->

        <!-- car list start -->
        <transition name="remove-client-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowCarlistDialog"
                 class="tripcount_add_tips_back" @click.self.prevent="isShowCarlistDialog = false">
                <div class="tripcount_add_tips_box">
                    <div class="tripcount_add_tips_box_title">
                        <span>Car list</span>
                    </div>
                    <div class="tripcount_carlist_body">
                        <div class="tripcount_carlist_body_title">
                            <div class="tripcount_carlist_body_title_left">
                                <span>No.</span>
                            </div>
                            <div class="tripcount_carlist_body_title_right">
                                <span>Car No.</span>
                            </div>
                        </div>
                        <div class="tripcount_carlist_body_frame">
                            <div class="tripcount_carlist_body_content" v-for="(item,index) in carListArray" :key="index" @click="choiseCarMethod(item)">
                                <div class="tripcount_carlist_body_content_left">
                                    <span>{{index}}</span>
                                </div>
                                <div class="tripcount_carlist_body_content_right">
                                    <span>{{item.carid}}</span>
                                </div>
                                <div v-if="choiseCar === item" class="tripcount_carlist_body_content_icon">
                                    <div class="check_icon"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tripcount_carlist_bottom">
                        <div class="tripcount_box_footer_button" @click="isShowCarlistDialog = false">
                            <span>Cancel</span>
                        </div>
                        <div class="tripcount_box_footer_button" style="margin-left:8px" @click="confirmChoiseCar()">
                            <span>Choise</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- car list end -->

        <!-- confirm submit dialog start -->
        <transition name="remove-client-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowConfirmDialog"
                 class="tripcount_add_tips_back" @click.self.prevent="isShowConfirmDialog = false">
                <div class="tripcount_add_tips_box">
                    <div class="tripcount_add_tips_box_title">
                        <span>Confirm info</span>
                    </div>
                    <div style="margin:12px 24px">
                        <span>Do you confirm to submit?</span>
                    </div>
                    <div class="tripcount_add_tips_box_bottom">
                        <div class="tripcount_box_footer_button" @click="isShowConfirmDialog = false">
                            <span>Cancel</span>
                        </div>
                        <div class="tripcount_box_footer_button" style="margin-left:8px" @click="confirmSubmitMission">
                            <span>Confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm submit dialog end -->

        <!-- loading animation start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="loadingAnimation" class="tripcount_loading_back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="loadingAnimation"
                 class="tripcount_loading_front">
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
import axios from "axios";
import config from "../assets/js/config";

export default {
    mounted(){
        let screenHeight = document.documentElement.clientHeight
        this.lindBoxHeight = screenHeight - 40 - 56 - 7
        this.$refs.tripcount_body.style.height = this.lindBoxHeight + 'px'
        this.userName = localStorage.getItem('drivername')
        this.user_id = localStorage.getItem('_id')
        this.getMission()
    },

    data(){
        return{
            lindBoxHeight:0,
            isShowAddTips:false,
            isShowEditDialog:false,
            isShowCarlistDialog:false,
            isShowConfirmDialog:false,
            pageFlag:false,
            missionDate:new Date().toLocaleDateString(),
            userName:null,
            user_id:null,
            missionArray:null,
            mission_id:null,
            shippingDate:null,
            shippingIndex:null,
            carListArray:[],
            choiseCar:null,
            loadingAnimation:false
        }
    },

    methods:{
        confirmSubmitMission(){
            let tempDate = new Date().toISOString()
            axios
                .post(config.server + '/tripCount/finish',{
                    mission_id:this.mission_id,
                    finishDate:tempDate
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.isShowConfirmDialog = false
                        this.getMission()
                    } else {
                        console.log('submit failed')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        openConfirmDialog(){
            this.isShowConfirmDialog = true
        },

        confirmEditMission(){
            let tempDate = new Date().toISOString()
            axios
                .post(config.server + '/tripCount/edit',{
                    mission_id:this.mission_id,
                    array_id:this.shippingDate._id,
                    carNo:this.shippingDate.carNo,
                    out:this.shippingDate.out,
                    in:this.shippingDate.in,
                    lastEditDate:tempDate
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.getMission()
                        this.isShowEditDialog = false
                    } else {
                        console.log('update failed')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        confirmChoiseCar(){
            this.shippingDate.carNo = this.choiseCar.carid
            this.isShowCarlistDialog = false
        },

        choiseCarMethod(carInfo){
            this.choiseCar = carInfo
        },

        openCarListDialog(){
            this.isShowCarlistDialog = true
            axios
                .get(config.server + '/car/clientGet')
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.carListArray = doc.data.doc
                    }else{
                        console.log('获取车辆信息错误')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        editCountMethod(item,index){
            console.log(item)
            this.shippingDate = item
            this.shippingIndex = index
            this.isShowEditDialog = true
        },

        getMission() {
            axios
                .get(config.server + '/tripCount/')
                .then(doc => {
                    console.log(doc)    
                    if(doc.data.code === 0){
                        this.mission_id = doc.data.doc._id
                        this.missionArray = doc.data.doc.missionArray
                        this.missionDate = new Date(doc.data.doc.missionDate).toLocaleDateString()
                        setTimeout(() => {
                                let infoAreaPx = this.lindBoxHeight - 120
                        this.$refs.infoArea.style.height = infoAreaPx + 'px'
                        }, 0);
                        this.pageFlag = true
                    }else{
                        this.pageFlag = false
                        this.mission_id = null
                        this.missionArray = []
                        this.missionDate = new Date().toLocaleDateString()
                    }
                                                                                                                                                         
                })
                .catch(err => {
                    console.log(err)
                })
        },

        confirmAddMission(){
            this.loadingAnimation = true
            let date = new Date()
            let dateString = new Date(date).toDateString()
            axios
                .post(config.server + '/tripCount/create',{
                    creater: this.userName,
                    creater_id: this.user_id,//创建人_id
                    createDate: date,//创建时间
                    missionDate: new Date(dateString).toISOString(),//任务时间
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.getMission()
                    }else{
                        console.log(doc)
                    }
                    this.isShowAddTips = false
                    this.loadingAnimation = false
                })
                .catch(err => {
                    this.loadingAnimation = false
                    console.log(err)
                })
        },

        addMission(){
            this.isShowAddTips = true
        }
    }
}
</script>

<style scoped>
.tripcount_title{
    height: 40px;
    position: fixed;
    background-color: #d74342;
    top: 0;
    left: 0;
    right: 0;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

.tripcount_body{
    position: relative;
    background-color: #f7f7f7;
    margin-top: 3px;
}

.tripcount_body_item{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tripcount_body_frame{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.tripcount_body_content{
    margin-top: 8px;
}

.tripcount_body_content_title{
    display: flex;
    display: -webkit-flex;
    background-color: #fff;
    height: 30px;
    line-height: 30px;
    margin: 0 24px;
    justify-content: space-around;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.tripcount_body_content_title_left{
    color: rgba(0, 0, 0, 0.5)
}

.tripcount_body_content_top{
    display: flex;
    display: -webkit-flex;
    background-color: #fff;
    margin-top: 8px;
    margin-left: 24px;
    margin-right: 24px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.tripcount_body_content_top_item{
    flex-basis: 25%;
    border-right: 1px solid #eee;
}

.tripcount_body_content_center_frame{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin-left: 24px;
    margin-right: 24px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
}

.tripcount_body_content_center{
    display: flex;
    display: -webkit-flex;
    background-color: #fff;
    margin-top: 4px;
}

.tripcount_body_content_center_item{
    flex-basis: 25%;
    line-height: 30px;
    height: 30px;
}
.add_icon{
    background: #d74342;
    mask-image: url(../../public/icons/baseline-add_circle_outline-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-add_circle_outline-24px.svg);
    width: 54px;
    height: 54px;
    -webkit-mask-size: 54px 54px;
    mask-size: 54px 54px;
}
.tripcount_add_tips_back{
    position: fixed;
    z-index: 24;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.12);
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.tripcount_add_tips_box{
    background-color: #f7f7f7;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.tripcount_add_tips_box_title{
    height: 30px;
    line-height: 30px;
    background-color: #d74342;
    color: #fff;
    font-size: 16px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.tripcount_add_tips_box_body{
    padding: 12px 12px;
}

.tripcount_add_tips_box_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    padding-bottom: 8px;
}

.tripcount_box_footer_button{
    width: 100px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    border: 1px solid #eee;
    background-color: #fff;
}

.tripcount_edit_body{
    background-color: #fff;
    margin:10px 12px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.tripcount_edit_item{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    margin-top: 8px;
}

.tripcount_edit_item_left{
    width: 60px;
    text-align: right;
    background-color: #fff;
}

.tripcount_edit_item_right{
    font-size: 18px;
    margin-left: 8px;
}

.tripcount_edit_item_right input{
    width: 100px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    text-align: center;
}

.tripcount_edit_item_right_box{
    background-color: #eee;
    width: 100px;
    border-radius: 10px;
    border: 1px solid #e6e6e6;
}

.tripcount_carlist_body{
    background-color: #fff;
    margin: 10px 12px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.tripcount_carlist_body_title{
    display: flex;
    display: -webkit-flex;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 30px;
    line-height: 30px;
}

.tripcount_carlist_body_title_left{
    width: 60px;
    border-right: 1px solid #eee;
}

.tripcount_carlist_body_title_right{
    width: 100px;
}

.tripcount_carlist_body_frame{
    height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
}

.tripcount_carlist_body_content{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    position: relative;
}

.tripcount_carlist_body_content_left{
    width: 60px;
}

.tripcount_carlist_body_content_right{
    width: 100px;
}

.tripcount_carlist_body_content_icon{
    position: absolute;
    right: 4px;
}

.tripcount_carlist_bottom{
    display: flex;
    display: -webkit-flex;
    margin-bottom: 8px;
}

.check_icon{
    background: #4caf50;
    mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    width: 35px;
    height: 35px;
    -webkit-mask-size: 35px 35px;
    mask-size: 35px 35px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
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

