<template>
    <div id="report_basket">
        <div class="report_basket_title">
            <div class="report_basket_title_left">
                <div>
                    <img src="../../../public/icons/left.png" alt="exit" style="width: 20px;">
                </div>
            </div>
            <div class="report_basket_title_center">
                <span>框数检查报告</span>
            </div>
            <div class="report_basket_title_right" @click="openChooseMonthBox">
                <span>{{topMonth}}月</span>
            </div>
        </div>
        <div class="report_basket_top">
            <div v-for="(item,index) in maxDay" :key="index" @click="chooseDayMethod(item)">
                <div v-if="chooseDayValue === item" class="report_basket_top_item_red">
                    <span>{{item}}</span>
                </div>
                <div v-else class="report_basket_top_item">
                    <span>{{item}}</span>
                </div>
            </div>
        </div>
        <div v-if="missionInfo" class="report_basket_body">
            <div class="report_basket_body_title">
                <div class="report_basket_body_title_left">
                    <div class="report_basket_body_title_left_title">
                        <span>创建人</span>
                    </div>
                    <div class="report_basket_body_title_left_content">
                        <span>{{missionInfo.creater}}</span>
                    </div>
                </div>
                <div class="report_basket_body_title_right">
                    <div class="report_basket_body_title_left_title">
                        <span>创建时间</span>
                    </div>
                    <div class="report_basket_body_title_left_content">
                        <span>{{missionInfo.missionDate | dateFilter}}</span>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- 月份选择框 start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowMonthBox" class="report_basket_month_back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
        <div v-if="isShowMonthBox" class="report_basket_month_front" @click.prevent.self="isShowMonthBox = false" @touchmove.prevent>
            <div class="report_basket_month_box">
                <div class="report_basket_month_box_title">
                    <span>月份选择</span>
                </div>
                <div class="report_basket_month_box_body">
                    <div class="report_basket_month_box_body_item">
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(1)">
                            <span>1</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(2)">
                            <span>2</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(3)">
                            <span>3</span>
                        </div>
                    </div>
                    <div class="report_basket_month_box_body_item">
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(4)">
                            <span>4</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(5)">
                            <span>5</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(6)">
                            <span>6</span>
                        </div>
                    </div>
                    <div class="report_basket_month_box_body_item">
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(7)">
                            <span>7</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(8)">
                            <span>8</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(9)">
                            <span>9</span>
                        </div>
                    </div>
                    <div class="report_basket_month_box_body_item" style="margin-bottom:0">
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(10)">
                            <span>10</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(11)">
                            <span>11</span>
                        </div>
                        <div class="report_basket_month_box_body_item_frame" @click="chooseMonth(12)">
                            <span>12</span>
                        </div>
                    </div>
                </div>
                <div class="report_basket_month_box_bottom">
                    <div class="white_button" @click="isShowMonthBox = false">
                        <span>关闭</span>
                    </div>
                </div>
            </div>
        </div>
        </transition>
        <!-- 月份选择框 end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../../assets/js/config";

export default {
    mounted(){
        this.topMonth = new Date().getMonth() + 1
        this.getMaxDayMethod()
    },

    data(){
        return {
            topMonth:null,
            maxDay:null,
            isShowMonthBox:false,
            chooseDayValue:null,
            missionInfo:null
        }
    },

    methods:{
        chooseDayMethod(day){
            console.log(day)
            this.chooseDayValue = day
            let tempDate = new Date().setMonth(this.topMonth - 1)
            tempDate = new Date(tempDate).setDate(day)
            tempDate = new Date(tempDate).toLocaleDateString()
            tempDate = new Date(tempDate).toISOString()
            axios
                .post(config.server + "/tripCount/oneDay", {
                    missionDate:tempDate
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        this.missionInfo = doc.data.doc
                    }else if(doc.data.code === 1){
                        console.log('未找到当日数据')
                    }else{
                        console.log('服务器出现错误')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getMaxDayMethod(){
            let tempDate = new Date()
            tempDate = new Date(tempDate).setMonth(this.topMonth)
            tempDate = new Date(tempDate).setDate(0)
            this.maxDay = new Date(tempDate).getDate(0)
            console.log(this.maxDay)
        },
        openChooseMonthBox(){
            this.isShowMonthBox = true
        },
        chooseMonth(num){
            this.topMonth = num
            this.isShowMonthBox = false
            this.getMaxDayMethod()
        }
    }
}
</script>

<style scoped>
.report_basket_title{
    height: 40px;
    line-height: 40px;
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 16px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}

.report_basket_title_left{
    width: 80px;
    display: flex;
    display: -webkit-flex;
}

.report_basket_title_left div{
    padding-left: 12px;
}

.report_basket_title_right{
    width: 80px;
}

.report_basket_top{
    display: flex;
    display: -webkit-flex;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 4px 0;
}

.report_basket_top_item{
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 30px;
    border-radius: 5px;
    flex-shrink: 0;
    margin: 4px;
}

.report_basket_top_item_red{
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 30px;
    border-radius: 5px;
    flex-shrink: 0;
    margin: 4px;
    background-color: #d74342;
    color: #fff;
}

.report_basket_body_title{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
}

.report_basket_body_title_left{
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #d74342;
}

.report_basket_body_title_left_title{
    width: 60px;
    text-align: right;
}

.report_basket_body_title_left_content{
    width: 72px;
    text-align: left;
    padding-left: 4px;
}

.report_basket_body_title_right{
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #d74342;
}

.report_basket_month_back{
    position: fixed;
    background-color: rgba(0, 0, 0, 0.12);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 23;
}

.report_basket_month_front{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 24;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.report_basket_month_box{
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    overflow: hidden;
}

.report_basket_month_box_title{
    background-color: #d74342;
    color: #fff;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.report_basket_month_box_body{
    margin: 12px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    padding: 12px;
    background-color: #fff;
}

.report_basket_month_box_body_item{
    display: flex;
    display: -webkit-flex;
    margin-bottom: 12px;
}

.report_basket_month_box_body_item_frame{
    width: 30px;
    height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    border: 1px solid #eee;
}

.report_basket_month_box_body_item_frame span{
    line-height: 30px;
}

.report_basket_month_box_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 8px;
}

.white_button{
    height: 30px;
    line-height: 30px;
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 80px;
    border-radius: 10px;
    background-color: #fff;
}
</style>
