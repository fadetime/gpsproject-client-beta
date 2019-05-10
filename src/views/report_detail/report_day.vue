<template>
    <div id="report_day">
        <div class="report_day_title">
            <div class="report_day_title_left" @click="goBackMethod()">
                <div>
                    <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                </div>
            </div>
            <div class="report_day_title_center">
                <span>白班统计</span>
            </div>
            <div class="report_day_title_right" @click="openChooseMonthBox()">
                <span v-if="topMonth === 0"> 请选择</span>
                <span v-else>{{topMonth}}月</span>
            </div>
        </div>
        <div class="report_day_top_empty"></div>
        <div class="report_day_body">
            <div v-if="thisMonthInfo" class="report_day_body_item">
                <div class="report_day_body_item_frame">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班任务总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span>{{thisMonthInfo.allNum}}单</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班加单总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span>{{thisMonthInfo.increaseNum}}单</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班补单总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span>{{thisMonthInfo.recoupNum}}单</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班退单总数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span>{{thisMonthInfo.returnNum}}单</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
                <div class="report_day_body_item_frame">
                    <div class="report_day_body_item_frame_left">
                        <span>本月白班其他单数</span>
                    </div>
                    <div class="report_day_body_item_frame_right">
                        <span>{{thisMonthInfo.otherNum}}单</span>
                    </div>
                    <div class="report_day_righticon">
                        <img src="../../../public/icons/baseline_arrow_forward_ios_white_24dp.png">
                    </div>
                </div>
            </div>
            
        </div>
        <!-- time picker start -->
        <monthPicker :openMonthChooseBox="ShowMonthChooseBox" @closeMonthChooseBox="closeMonthChooseBox" @monthNum="getMonthMethod" @finalState="finalState"/>
        <!-- time picker end -->
        <!-- tips dialog start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips dialog end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../assets/js/config";
import tipsBox from "../../components/tipsBox"
import monthPicker from "../../components/monthPicker"

export default {
    components:{
        monthPicker,
        tipsBox
    },

    data(){
        return {
            isShowMonthPicker: false,
            ShowMonthChooseBox: false,
            topMonth: 0,
            tipsShowColor: null,
            tipsInfo: null,
            isShowTipsBox: null,
            thisMonthInfo: null
        }
    },

    methods:{
        finalState(value){
            if(value){
                this.ShowMonthChooseBox = false
                axios
                    .post(config.server + '/dayShiftmission/thisMonthInfo',{
                        myMonth:this.topMonth
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.thisMonthInfo = doc.data
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '未找到相应数据'
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
                this.tipsInfo = '请选择月份'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }
        },

        getMonthMethod(month){
            console.log(month)
            this.topMonth = month
        },

        openChooseMonthBox(){
            this.ShowMonthChooseBox = true
        },

        closeMonthChooseBox(value){
            this.ShowMonthChooseBox = value
        },

        goBackMethod(){
            this.$router.push("/report");
        },
    }
}
</script>

<style scoped>
.report_day_title{
    height: 40px;
    font-size: 16px;
    background-color: #d74342;
    line-height: 40px;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}

.report_day_title_left{
    width: 80px;
    display: flex;
    display: -webkit-flex;
}

.report_day_title_left div{
    padding-left: 12px;
}

.report_day_title_right{
    width: 80px;
}

.report_day_top_empty{
    height: 40px;
}

.report_day_body_item{
    margin-top: 12px;
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.report_day_body_item_frame{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #eee;
    position: relative;
}

.report_day_body_item_frame_left{
    width: 132px;
    text-align: left;
}

.report_day_body_item_frame_right{
    width: 52px;
    text-align: right;
}

.report_day_righticon{
    position: absolute;
    right: 4px;
    top: -2px;
}

.report_day_righticon img{
    height: 30px;
}
</style>
