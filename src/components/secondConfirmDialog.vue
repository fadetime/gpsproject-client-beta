<template>
    <div id="second_confirm_dialog">
        <transition name="second_confirm_dialog-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
                <div v-if="isShowChild" class="second_confirm_dialog_back"></div>
        </transition>
        <transition name="second_confirm_dialog-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
                <div v-if="isShowChild" class="second_confirm_dialog_front" @click.self.prevent="closeDialogMethod()">
                    <div class="second_confirm_dialog_box">
                        <div class="second_confirm_dialog_box_title">
                            <span v-if="lang === 'ch'">提示</span>
                            <span v-else>TIPS</span>
                        </div>
                        <div class="second_confirm_dialog_box_body">
                            <span>{{msg}}</span>
                        </div>
                        <div class="second_confirm_dialog_box_bottom">
                            <div class="second_confirm_dialog_box_bottom_button" @click="secondBottonMethod('cancel')">
                                <span v-if="lang === 'ch'">取消</span>
                                <span v-else>Cancel</span>
                            </div>
                            <div class="second_confirm_dialog_box_bottom_button" style="margin-left:8px" @click="secondBottonMethod('confirm')">
                                <span v-if="lang === 'ch'">确定</span>
                                <span v-else>Confirm</span>
                            </div>
                        </div>
                    </div>
                </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        msg:String,
        isShowChild:Boolean
    },

    data(){
        return {
            secondBottonValue:false
        }
    },

    computed: {
        lang() {
            return this.$store.state.lang
        }
    },

    methods: {
        closeDialogMethod(){
            this.secondBottonValue = false
            this.$emit('secondBottonValue',this.secondBottonValue)
        },

        secondBottonMethod(mode){
            if(mode === 'confirm'){
                this.secondBottonValue = true
            }else{
                this.secondBottonValue = false
            }
            this.$emit('secondBottonValue',this.secondBottonValue)
        }
    }
}
</script>

<style scoped>
.second_confirm_dialog_back{
    position: fixed;
    background-color: rgba(0, 0, 0, 0.12);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 124;
}

.second_confirm_dialog_front{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 125;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.second_confirm_dialog_box{
    background-color: #f7f7f7;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.second_confirm_dialog_box_title{
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.second_confirm_dialog_box_body{
    padding: 12px 12px 8px;
}

.second_confirm_dialog_box_bottom{
    display: flex;
    display: -webkit-flex;
    padding: 8px 12px;
    justify-content: center;
}

.second_confirm_dialog_box_bottom_button{
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 100px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
}
</style>

