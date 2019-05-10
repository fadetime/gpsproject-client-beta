<template>
    <div id="monthPicker">
        <transition name="monthpicker-back-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowMonthBox" class="monthpicker_back"></div>
        </transition>
        <transition name="monthpicker-front-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
        <div v-if="isShowMonthBox" class="monthpicker_front" @click.prevent.self="closeMonthPicker()" @touchmove.prevent>
            <div class="monthpicker_box">
                <div class="monthpicker_box_title">
                    <span>月份选择</span>
                </div>
                <div class="monthpicker_box_body">
                    <div class="monthpicker_box_body_item">
                        <div class="monthpicker_box_body_item_frame" @click="chooseMonth(1)">
                            <div v-if="topMonth === 1" class="monthpicker_box_body_item_frame_redborder">
                                <span>1</span>
                            </div>
                            <span>1</span>
                        </div>
                        <div class="monthpicker_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(2)">
                            <div v-if="topMonth === 2" class="monthpicker_box_body_item_frame_redborder">
                                <span>2</span>
                            </div>
                            <span>2</span>
                        </div>
                        <div class="monthpicker_box_body_item_frame" @click="chooseMonth(3)">
                            <div v-if="topMonth === 3" class="monthpicker_box_body_item_frame_redborder">
                                <span>3</span>
                            </div>
                            <span>3</span>
                        </div>
                    </div>
                    <div class="monthpicker_box_body_item">
                        <div class="monthpicker_box_body_item_frame" @click="chooseMonth(4)">
                            <div v-if="topMonth === 4" class="monthpicker_box_body_item_frame_redborder">
                                <span>4</span>
                            </div>
                            <span>4</span>
                        </div>
                        <div class="monthpicker_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(5)">
                            <div v-if="topMonth === 5" class="monthpicker_box_body_item_frame_redborder">
                                <span>5</span>
                            </div>
                            <span>5</span>
                        </div>
                        <div class="monthpicker_box_body_item_frame" @click="chooseMonth(6)">
                            <div v-if="topMonth === 6" class="monthpicker_box_body_item_frame_redborder">
                                <span>6</span>
                            </div>
                            <span>6</span>
                        </div>
                    </div>
                    <div class="monthpicker_box_body_item">
                        <div class="monthpicker_box_body_item_frame" @click="chooseMonth(7)">
                            <div v-if="topMonth === 7" class="monthpicker_box_body_item_frame_redborder">
                                <span>7</span>
                            </div>
                            <span>7</span>
                        </div>
                        <div class="monthpicker_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(8)">
                            <div v-if="topMonth === 8" class="monthpicker_box_body_item_frame_redborder">
                                <span>8</span>
                            </div>
                            <span>8</span>
                        </div>
                        <div class="monthpicker_box_body_item_frame" @click="chooseMonth(9)">
                            <div v-if="topMonth === 9" class="monthpicker_box_body_item_frame_redborder">
                                <span>9</span>
                            </div>
                            <span>9</span>
                        </div>
                    </div>
                    <div class="monthpicker_box_body_item" style="margin-bottom:0">
                        <div class="monthpicker_box_body_item_frame" @click="chooseMonth(10)">
                            <div v-if="topMonth === 10" class="monthpicker_box_body_item_frame_redborder">
                                <span>10</span>
                            </div>
                            <span>10</span>
                        </div>
                        <div class="monthpicker_box_body_item_frame" style="margin:0 12px" @click="chooseMonth(11)">
                            <div v-if="topMonth === 11" class="monthpicker_box_body_item_frame_redborder">
                                <span>11</span>
                            </div>
                            <span>11</span>
                        </div>
                        <div class="monthpicker_box_body_item_frame" @click="chooseMonth(12)">
                            <div v-if="topMonth === 12" class="monthpicker_box_body_item_frame_redborder">
                                <span>12</span>
                            </div>
                            <span>12</span>
                        </div>
                    </div>
                </div>
                <div class="monthpicker_box_bottom">
                    <div class="white_button" @click="closeMonthPicker()">
                        <span>关闭</span>
                    </div>
                    <div class="white_button" @click="confirmChooseMonthMethod()" style="margin-left:8px">
                        <span>确定</span>
                    </div>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return{
            topMonth: 0,
            isShowMonthBox: false,
            isPressDoneButton:false,
            finalState:false
        }
    },

    props: {
        openMonthChooseBox:Boolean
    },
    
    watch: {
        openMonthChooseBox: function(value){
            this.isShowMonthBox = value
        }
    },

    methods:{
        confirmChooseMonthMethod(){
            if(this.topMonth === 0){
                this.finalState = false
            }else{
                this.finalState = true
            }
            this.$emit('finalState', this.finalState)
        },

        closeMonthPicker(){
            this.isShowMonthBox = false
            this.$emit('closeMonthChooseBox', this.isShowMonthBox)
        },

        monthPickerDoneMethod(){
            this.isPressDoneButton = true
        },

        chooseMonth(num){
            this.topMonth = num
            this.$emit('monthNum', this.topMonth)
        }
    }
}
</script>

<style scoped>
.monthpicker_back{
    position: fixed;
    background-color: rgba(0, 0, 0, 0.12);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 23;
}

.monthpicker_front{
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

.monthpicker_box{
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    overflow: hidden;
}

.monthpicker_box_title{
    background-color: #d74342;
    color: #fff;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.monthpicker_box_body{
    margin: 12px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    padding: 12px;
    background-color: #fff;
}

.monthpicker_box_body_item{
    display: flex;
    display: -webkit-flex;
    margin-bottom: 12px;
}

.monthpicker_box_body_item_frame{
    width: 40px;
    height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    border: 1px solid #eee;
    position: relative;
}

.monthpicker_box_body_item_frame span{
    line-height: 30px;
}

.monthpicker_box_body_item_frame_redborder{
    position: absolute;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    border-radius: 10px;
    background-color: #d74342;
    color: #fff;
}

.monthpicker_box_bottom{
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
