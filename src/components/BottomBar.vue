<template>
<div id="bottombar">
    <div class="phone-viewport">
        <md-bottom-bar class="md-accent" md-type="shift">
            <md-bottom-bar-item id="bottom-bar-item-home" @click="gohome">
                <md-icon class="md-bottom-bar-icon">home</md-icon>
                <span class="md-bottom-bar-label">主页</span>
                <i class="badge" v-if="newPosts">{{ newPosts }}</i>
            </md-bottom-bar-item>
            <md-bottom-bar-item id="bottom-bar-item-finish" md-label="完成" md-icon="assignment_turned_in" @click="goFinish"></md-bottom-bar-item>
            <md-bottom-bar-item id="bottom-bar-item-posts" md-label="查找" md-icon="search" @click="gomission"></md-bottom-bar-item>
            <md-bottom-bar-item id="bottom-bar-item-favorites" md-label="设置" md-icon="settings" @click="gosetup"></md-bottom-bar-item>
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
</style>
