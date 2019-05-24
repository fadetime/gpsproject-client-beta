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
                        <span>123</span>
                    </div>
                    <div class="dst_detail_box_body">
                        <div>
                            123
                        </div>
                        <div>
                            234
                        </div>
                    </div>
                    <div class="dst_detail_box_bottom">
                        <div class="dst_botton">
                            <span>取消</span>
                        </div>
                        <div class="dst_botton" style="background-color:rgb(255, 152, 0);color:#fff;border:unset">
                            <span>删除</span>
                        </div>
                        <div class="dst_botton">
                            <span>修改</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- mission detail end -->

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
            isShowDetail: false
        }
    },
    mounted(){
        this.getTodayDayShiftMissionMethod()
    },

    methods:{
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
                        console.log(doc.data.doc)
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

.dst_detail_box_bottom{
    display: flex;
    display: -webkit-flex;
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
</style>
