<template>
<div id="bottombar">
    <div class="phone-viewport">
        <md-bottom-bar class="md-accent" md-type="shift">
            <md-bottom-bar-item id="bottom-bar-item-home" @click="gohome">
                <div class="md-bottom-bar-icon baseline_home"></div>
                <span class="md-bottom-bar-label">主页</span>
                <i class="badge" v-if="newPosts">{{ newPosts }}</i>
            </md-bottom-bar-item>
            <md-bottom-bar-item id="bottom-bar-item-finish" @click="goFinish">
                <div class="md-bottom-bar-icon assignment_turned"></div>
                <span class="md-bottom-bar-label">完成</span>
            </md-bottom-bar-item>
            <md-bottom-bar-item id="bottom-bar-item-posts" @click="gomission">
                <div class="md-bottom-bar-icon search_white"></div>
                <span class="md-bottom-bar-label">查找</span>
            </md-bottom-bar-item>
            <md-bottom-bar-item id="bottom-bar-item-favorites" @click="gosetup">
                <div class="md-bottom-bar-icon settings_white"></div>
                <span class="md-bottom-bar-label">设置</span>
            </md-bottom-bar-item>
        </md-bottom-bar>
    </div>
</div>
</template>

<script>
export default {
    name: 'Shift',
    computed:{
        newPosts: function() {
            return this.$store.state.needDoNum;
        }
    },
    methods: {
        gohome() {
            this.$router.push('/')
        },
        gomission() {
            this.$router.push('/history')
        },
        gosetup() {
            this.$router.push('/setup')
        },
        goFinish() {
            this.$router.push('/finish')
        }
    }
}
</script>

<style scoped>
#bottombar {
    z-index: 100;
}

.phone-viewport {
    width: 100%;
    display: inline-flex;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
}

.phone-viewport {
    display: inline-flex;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
}

.badge {
    width: 19px;
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 6px;
    right: 6px;
    background: #fff;
    border-radius: 100%;
    color: #000;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -.05em;
    font-family: 'Roboto Mono', monospace;
}

.baseline_home{
    background: #fff;
    mask-image: url(../../public/icons/baseline-home-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-home-36px.svg);
    width: 36px;
    height: 36px;
}

.assignment_turned{
    background: #fff;
    mask-image: url(../../public/icons/baseline-assignment_turned_in-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-assignment_turned_in-36px.svg);
    width: 36px;
    height: 36px;
}

.search_white{
    background: #fff;
    mask-image: url(../../public/icons/baseline-search-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-search-36px.svg);
    width: 36px;
    height: 36px;
}

.settings_white{
    background: #fff;
    mask-image: url(../../public/icons/baseline-settings-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-settings-36px.svg);
    width: 36px;
    height: 36px;
}
</style>
