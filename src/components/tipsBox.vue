<template>
    <div id="tipsbox">
        <transition name="tipsbox-classes-transition"
                    enter-active-class="animated bounceIn"
                    leave-active-class="animated bounceOut faster">
            <div v-if="isOpenTipBox" class="tipBox-front">
                <div class="tip-front-box" @click ="isOpenTipBox = false">
                    <div>
                        <md-icon v-if="showColor === 'green'" class="md-size-2x" style="color:green">check_circle</md-icon>
                        <md-icon v-else-if="showColor === 'yellow'" class="md-size-2x" style="color:#ffab40">report_problem</md-icon>
                    </div>
                    <div style="font-size:16px;line-height:48px">
                        <span>{{msg}}</span>
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
        isOpenTipBox:Boolean,
        showColor:String
    }
}
</script>

<style scoped>
.tipBox-front {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    z-index: 103;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.tip-front-box {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    background: #fff;
    border-top: 1px solid #ffab40;
    padding: 0 8px;
    border-radius: 10px;
    display: flex;
    display:-webkit-flex;
}
</style>
