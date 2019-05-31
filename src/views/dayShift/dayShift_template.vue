<template>
    <div id="daytemplate">
        <div class="daytemplate_title">
            <div class="daytemplate_title_left" @click="goBackMethod()">
                <div>
                    <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                </div>
            </div>
            <div class="daytemplate_title_center">
                <span>任务模板</span>
            </div>
            <div class="daytemplate_title_right" @click="openNewTempLate()">
                <div class="day_icon_add"></div>
            </div>
        </div>
        <div class="daytemplate_center">
            <div  class="daytemplate_center_body">
                <div class="daytemplate_center_body_title">
                    <div>
                        <span>所有模板</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="daytemplate_content">
            <div v-for="(item,index) in templateList" :key="index" class="daytemplate_content_frame">
                <div class="daytemplate_content_frame_top">
                    <span>{{item.templateName}}</span>
                </div>
                <div class="daytemplate_content_frame_bottom">
                    <div class="day_whitebutton" style="width:80px" @click="changeTemplateMethod(item)">
                        <span>修改</span>
                    </div>
                    <div class="day_whitebutton" style="width:80px;margin-left:8px;" @click="delTemplate(item)">
                        <span>删除</span>
                    </div>
                    <div class="day_whitebutton" style="width:80px;margin-left:8px;" @click="useTemplate(item)">
                        <span>使用</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- confirm del box start -->
        <transition name="day-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowDelDialog" class="daytemplate_template_back"></div>
        </transition>
        <transition name="day-client-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowDelDialog" class="daytemplate_template_front" @click.self.prevent="isShowDelDialog = false">
                <div class="daytemplate_del_box">
                    <div class="daytemplate_del_box_title">
                        <span>{{delInfo.templateName}}</span>
                    </div>
                    <div class="daytemplate_del_box_body">
                        <span>是否确认删除该模板?</span>
                    </div>
                    <div class="daytemplate_del_box_bottom">
                        <div class="day_whitebutton" @click="isShowDelDialog = false">
                            <span>取消</span>
                        </div>
                        <div class="day_whitebutton" style="margin-left:8px;" @click="confirmDelMethod()">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </transition>
        <!-- confirm del box end -->

        <!-- new templage start -->
        <transition name="day-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowNewTemplateDialog" class="daytemplate_template_back"></div>
        </transition>
        <transition name="day-client-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowNewTemplateDialog" class="daytemplate_template_front" @click.self.prevent="isShowNewTemplateDialog = false">
                <div class="daytemplate_template_box">
                    <div class="daytemplate_template_box_title">
                        <span>创建模板</span>
                    </div>
                    <div class="daytemplate_template_box_body">
                        <div class="daytemplate_template_box_body_name">
                            <span>模板名称</span>
                        </div>
                        <div class="daytemplate_template_box_body_input">
                            <input type="text" v-model="templateName">
                        </div>
                    </div>
                    <div class="daytemplate_template_box_bottom">
                        <div class="day_whitebutton" @click="isShowNewTemplateDialog = false">
                            <span>取消</span>
                        </div>
                        <div class="day_whitebutton" style="margin-left:8px;" @click="createNewTemplateMethod()">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- new templage end -->
        
        <!-- add client dialog start -->
        <transition name="day-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowAddClientDialog" class="daytemplate_template_back"></div>
        </transition>
        <transition name="day-client-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowAddClientDialog" class="daytemplate_template_front">
                <div class="daytemplate_template_box">
                    <div class="daytemplate_template_box_title">
                        <span>添加任务</span>
                    </div>
                    <div class="daytemplate_addnew_box_body">
                        <div class="daytemplate_addnew_box_body_input">
                            <div class="daytemplate_addnew_box_body_input_left">
                                <input type="text">
                            </div>
                            <div>
                                <div class="day_whitebutton">
                                    <span>搜索</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- add client dialog end -->

        <!-- choise driver box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowChoiseDriverBox" class="confirmstart-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowChoiseDriverBox" class="confirmstart-front"
                 @click.self.prevent="isShowChoiseDriverBox = false">
                <div class="confirmstart-box">
                    <div class="confirmstart-box-title">
                        <span v-if="lang === 'ch'">司机选择</span>
                        <span v-else>Confirm Driver</span>
                    </div>
                    <div class="confirmstart-box-body">
                        <div class="dayshift_driverbox_body">
                            <div class="dayshift_driverbox_body_item" v-for="(item,index) in driverArray" :key="index" @click="choiseDriverMethod(item)">
                                <span>{{item.dirvername}}</span>
                                <div v-if="choiseDriver === item.dirvername" class="dayshift_icon_check"></div>
                            </div>
                        </div>
                    </div>
                    <div class="confirmstart-box-bottom">
                        <div class="day_whitebutton" @click="isShowChoiseDriverBox = false">
                            <span>取消</span>
                        </div>
                        <div class="day_whitebutton" @click="confirmChoiseDriverMethod()">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- choise driver box end -->

        <!-- show choose client start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowChooseClientBox" class="confirmstart-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowChooseClientBox" class="confirmstart-front"
                 @click.self.prevent="isShowChooseClientBox = false">
                <div class="confirmstart-box">
                    <div class="confirmstart-box-title">
                        <div v-if="showFrontPage">
                            <span v-if="lang === 'ch'">已选任务确认</span>
                            <span v-else>Confirm Client</span>
                        </div>
                        <div v-else>
                            <span>客服数据</span>
                        </div>
                    </div>
                    <div class="ds_change_pagearea">
                        <div class="ds_change_pagearea_button">
                            <div>
                                <div class="icon_change"></div>
                            </div>
                            <div class="ds_change_pagearea_right" @click="changePageMethod()">
                                <span>切换</span>
                            </div>
                        </div>
                    </div>
                    <div class="confirmstart-box-body">
                        <div class="dayshift_driverbox_body">
                            <div v-show="showFrontPage" class="dayshift_checkclientbox_body_item" v-for="(item,index) in tempArray" :key="index">
                                <div class="dayshift_checkclientbox_body_item_left">
                                    <input :id="'checkclientbox' + index " type="checkbox" :value="item" v-model="confirmClientArray">
                                </div>
                                <label :for="'checkclientbox' + index" class="dayshift_checkclientbox_body_item_center">
                                    <span>{{item.clientName}}</span>
                                </label>
                                <label :for="'checkclientbox' + index" class="dayshift_checkclientbox_body_item_right">
                                    <span v-if="item.isIncreaseOrder === 'order'">订单</span>
                                    <span v-else-if="item.isIncreaseOrder === 'true'">加单</span>
                                    <span v-else-if="item.isIncreaseOrder === 'false'">补单</span>
                                    <span v-else-if="item.isIncreaseOrder === 'bun'">面食</span>
                                    <span v-else-if="item.isIncreaseOrder === 'return'">退单</span>
                                    <span v-else-if="item.isIncreaseOrder === 'change'">换货</span>
                                    <span v-else-if="item.isIncreaseOrder === 'delivery'">运输</span>
                                    <span v-else-if="item.isIncreaseOrder === 'other'">其他</span>
                                    <span v-else style="color: #d74342">未选择</span>
                                </label>
                            </div>
                            <div v-show="!showFrontPage" class="dayshift_checkclientbox_body_item" v-for="(item,index) in customerClientNameArray" :key="'c' + index">
                                <span v-if="item.matchErr" style="color: #d74342">{{item.name}}</span>
                                <span v-else>{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="dayshift_driverbox_bottom">
                        <div class="day_whitebutton" @click="isShowChooseClientBox = false">
                            <span>取消</span>
                        </div>
                        <div class="day_whitebutton" @click="confirmChooseClientMethod()" style="margin-left:8px;">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- show choose client end -->

        <!-- tips box start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips box end -->

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
import axios from "axios";
import config from "../../assets/js/config";
import tipsBox from "../../components/tipsBox"

export default {
    components:{
        tipsBox
    },

    mounted(){
        this.findAllTemplateMethod()
    },

    computed: {
        language() {
            return this.$store.getters.getLanguage;
        },
        lang() {
            return this.$store.state.lang;
        }
    },

    data(){
        return {
            isShowNewTemplateDialog: false,
            isShowAddClientDialog: false,
            templateName: null,
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            templateList:[],
            isShowChoiseDriverBox: false,
            driverArray: [],
            choiseDriver: null,
            choiseDriver_id: null,
            tempArray: [],
            isShowChooseClientBox: false,
            confirmClientArray: [],
            isShowLoadingAnimation: false,
            isShowDelDialog: false,
            delInfo: null,
            customerClientNameArray: [],
            showFrontPage: true
        }
    },

    methods:{
        changePageMethod(){
            this.showFrontPage = !this.showFrontPage
        },

        goBackMethod(){
            this.$router.push({path:'/search'})
        },

        confirmDelMethod(){
            this.isShowLoadingAnimation = true
            axios
                .post(config.server + '/template/del',{
                    _id:this.delInfo._id
                })
                .then(doc => {
                    this.isShowLoadingAnimation = false
                    if(doc.data.code === 0){
                        this.isShowDelDialog = false
                        this.tipsShowColor = 'green'
                        this.tipsInfo = '删除成功'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 2000);
                        this.findAllTemplateMethod()
                    }else{
                        this.tipsShowColor = 'green'
                        this.tipsInfo = '删除失败'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 2000);
                    }
                })
                .catch(err => {
                    this.isShowLoadingAnimation = false
                    console.log(err)
                })
        },

        confirmChooseClientMethod() {
            if(this.choiseDriver || this.choiseDriver_id){
                this.isShowLoadingAnimation = true
                let shippingDate = []
                let allClientArray = this.tempArray
                let chooseClientArray = this.confirmClientArray
                async function changeQueueMethod() {
                    return new Promise(() => {
                        allClientArray.forEach(allClient => {
                            chooseClientArray.forEach(chooseClient => {
                                if(allClient === chooseClient){
                                    shippingDate.push(allClient)
                                }
                            })
                        });
                    })
                }
                async function waitQueueMethod() {
                    await changeQueueMethod()
                }
                waitQueueMethod()
                axios
                    .post(config.server + '/template/createMission',{
                        clientArray: shippingDate,
                        driverName: this.choiseDriver,
                        driver_id: this.choiseDriver_id,
                        date: new Date().toISOString()
                    })
                    .then(doc => {
                        this.isShowLoadingAnimation = false
                        if(doc.data.code === 0){
                            this.tipsShowColor = 'green'
                            this.tipsInfo = '司机任务建立成功'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 3000);
                            this.isShowChooseClientBox = false
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '司机任务建立失败'
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
            }else{
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '提交时出现问题'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = true  
                }, 3000);
            }
        },

        confirmChoiseDriverMethod(){
            if(this.choiseDriver === null){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请选择司机'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 2000);
            }else{
                this.isShowChoiseDriverBox = false
                this.isShowChooseClientBox = true
                // this.confirmClientArray = this.tempArray
                axios
                    .post(config.customerServiceAddress + "/orders/ordersMs",{
                        date: new Date().toDateString()
                    })
                    .then(doc => {
                        if(doc.data.status === 0){
                            this.customerClientNameArray = []
                            if(doc.data.payload.length != 0){
                                doc.data.payload.forEach(item => {
                                    let matchErr = true
                                    this.tempArray.forEach(templateInfo => {
                                        if(templateInfo.clientName === item._customer._customerProfile.companyName){
                                            matchErr = false
                                            this.confirmClientArray.push(templateInfo)
                                        }
                                    });
                                    this.customerClientNameArray.push({
                                        name:item._customer._customerProfile.companyName,
                                        matchErr: matchErr
                                    })
                                })
                            }
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '获取客服后台数据失败'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },

        choiseDriverMethod(item){
            console.log(item)
            this.choiseDriver = item.dirvername
            this.choiseDriver_id = item._id
        },

        useTemplate(item){
            this.tempArray = item.clientArray
            axios
                .post(config.server + "/dirver/findDayDriver")
                .then(doc => {
                    if(doc.data.code === 0){
                        this.choiseDriver = null
                        this.choiseDriver_id = null
                        this.isShowChoiseDriverBox = true
                        this.driverArray = doc.data.doc
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '获取司机数据失败'
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

        delTemplate(item){
            console.log(item)
            this.delInfo = item
            this.isShowDelDialog = true
        },

        changeTemplateMethod(item){
            this.$router.push({path:'/template_newclient',query:{id:item._id}})
        },

        findAllTemplateMethod(){
            axios
                .post(config.server + '/template/findAll')
                .then(doc => {
                    if(doc.data.code === 0){
                        this.templateList = doc.data.doc
                        if(this.$route.query.code === 0){
                            this.tipsShowColor = 'green'
                            this.tipsInfo = '更新成功'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '未找到符合条件的模板'
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

        createNewTemplateMethod(){
            if(this.templateName === null){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请输入模板名称'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }else{
                axios
                    .post(config.server + '/template/create',{
                        templateName:this.templateName,
                        creater: localStorage.drivername
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.$router.push({path:'/template_newclient',query:{id:doc.data.new_id}})
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '创建失败'
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

        openNewTempLate(){
            this.isShowNewTemplateDialog = true
        }
    }
}
</script>


<style scoped>
.day_icon_add{
    background: #fff;
    mask-image: url(../../../public/icons/baseline-add-24px.svg);
    -webkit-mask-image: url(../../../public/icons/baseline-add-24px.svg);
    width: 40px;
    height: 40px;
    mask-size: 40px;
    -webkit-mask-size: 40px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
}

.daytemplate_title{
    height: 40px;
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 16px;
    line-height: 40px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between
}

.daytemplate_title_left{
    width: 80px;
}

.daytemplate_title_right{
    width: 80px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.daytemplate_center{
    margin-top: 12px;
}

.daytemplate_center_body_title{
    font-size: 16px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.daytemplate_center_body_title div{
    width: 120px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
}

.daytemplate_template_back {
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.daytemplate_template_front {
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

.daytemplate_template_box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.daytemplate_template_box_title{
    height: 30px;
    background-color: #d74342;
    line-height: 30px;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.daytemplate_template_box_body{
    margin: 8px;
    padding: 8px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    border: 1px solid #eee;
}

.daytemplate_template_box_body_name{
    height: 30px;
    line-height: 30px;
}

.daytemplate_template_box_body_input input{
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 30px;
    text-align: center;
}

.daytemplate_template_box_bottom{
    display: flex;
    display: -webkit-flex;
    margin-bottom: 8px;
    justify-content: center;
    margin-left: 8px;
    margin-right: 8px;
}

.day_whitebutton{
    border: 1px solid #eee;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 100px;
    background-color: #fff;
}

.daytemplate_addnew_box_body{
    margin-top: 8px;
}

.daytemplate_addnew_box_body_input{
    display: flex;
    display: -webkit-flex;
}

.daytemplate_addnew_box_body_input_left input{
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
}

.daytemplate_content_frame{
    border: 1px solid #eee;
    margin: 4px 0;
}

.daytemplate_content_frame_top{
    font-size: 16px;
    height: 40px;
    line-height: 40px;
}

.daytemplate_content_frame_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    padding: 3px 0;
}

.confirmstart-back {
    position: fixed;
    z-index: 23;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.confirmstart-front {
    position: fixed;
    z-index: 24;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.confirmstart-box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.confirmstart-box-title {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.confirmstart-box-body {
    margin-top: 10px;
}

.confirmstart-box-body-screen {
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 300px;
    overflow: auto;
    padding: 8px;
    border-radius: 10px;
}

.confirmstart-box-body-item {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
}

.confirmstart-box-body-item-left {
    width: 20px;
    margin-left: 10px;
    text-align: right;
}

.confirmstart-box-body-item-right {
    width: 180px;
    margin-left: 20px;
    text-align: left;
}

.confirmstart-box-bottom {
    display: flex;
    display: -webkit-flex;
    margin-top: 10px;
    margin-bottom: 10px;
}

.dayshift_driverbox_body{
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin: 0 10px;
    border-radius: 10px;
    padding: 8px;
    height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
}

.dayshift_driverbox_body_item{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    position: relative;
    width: 160px;
}

.dayshift_icon_check{
    mask-image: url(../../../public/icons/baseline-check_circle_outline-24px.svg);
    background-color: green;
    -webkit-mask-image: url(../../../public/icons/baseline-check_circle_outline-24px.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    mask-repeat: no-repeat;
    mask-position: center;
    position: absolute;
    top: 0;
    right: 0;
}

.icon_change{
    mask-image: url(../../../public/icons/icon_change.svg);
    -webkit-mask-image: url(../../../public/icons/icon_change.svg);
    background-color: rgba(0, 0, 0, 0.5);
    width: 30px;
    height: 30px;
    mask-size: 24px;
    -webkit-mask-size: 24px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}

.dayshift_checkclientbox_body_item{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
}

.dayshift_checkclientbox_body_item_left input{
    height: 24px;
    width: 24px;
}

.dayshift_checkclientbox_body_item_center{
    width: 146px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 8px;
}

.dayshift_driverbox_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin: 8px 0
}

.daytemplate_del_box{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    overflow: hidden;
}

.daytemplate_del_box_title{
    background-color: #d74342;
    color: #fff;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 16px;
}

.daytemplate_del_box_body{
    margin: 8px;
    padding: 8px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    border: 1px solid #eee;
    width: 208px;
    height: 60px;
    line-height: 44px;
}

.daytemplate_del_box_bottom{
    display: flex;
    display: -webkit-flex;
    margin: 8px 0;
    justify-content: center;
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

.ds_change_pagearea{
    display: flex;
    display: -webkit-flex;
    margin-top: 8px;
    padding: 0 8px;
    justify-content: flex-end
}

.ds_change_pagearea_button{
    border: 1px solid #eee;
    display: flex;
    display: -webkit-flex;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 0 4px;
}

.ds_change_pagearea_right{
    height: 30px;
    line-height: 30px;
}
</style>
