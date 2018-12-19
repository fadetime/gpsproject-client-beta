<template>
    <div id="bottombar">
        <transition name="custom-classes-transition" enter-active-class="animated slideInUp faster" leave-active-class="animated slideOutDown faster">
            <div v-if="showBottom" class="phone-viewport">
                <md-bottom-bar class="md-accent" md-type="shift">
                    <md-bottom-bar-item v-if="driverRole != 'dayshift'" id="bottom-bar-item-home" @click="gohome">
                        <div class="md-bottom-bar-icon baseline_home" style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.home}}</span>
                        <i class="badge" v-if="newPosts" style="width:24px;height:24px;font-size:14px">{{ newPosts }}</i>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item v-if="driverRole === 'dayshift'" id="bottom-bar-item-home" @click="goDayHome">
                        <div class="md-bottom-bar-icon baseline_home" style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.home}}</span>
                        <i class="badge" v-if="newPosts" style="width:24px;height:24px;font-size:14px">{{ newPosts }}</i>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item v-if="driverRole != 'dayshift'" id="bottom-bar-item-finish" @click="goFinish">
                        <div class="md-bottom-bar-icon assignment_turned" style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.finish}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item v-if="driverRole === 'bill'" id="bottom-bar-item-bill" @click="goBill">
                        <div class="md-bottom-bar-icon list_alt" style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.bill}}</span>
                        <i class="badge" v-if="haveBill" style="width:24px;height:24px;font-size:14px;color:#d74342">单</i>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item v-if="driverRole != 'dayshift'" id="bottom-bar-item-posts" @click="gomission">
                        <div class="md-bottom-bar-icon search_white" style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.find}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item v-if="driverRole === 'dayshift'" id="bottom-bar-item-search" @click="gosearch">
                        <div class="md-bottom-bar-icon search_white" style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.search}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item v-if="driverRole === 'maintain'" id="bottom-bar-item-fixcar" @click="gofix">
                        <div class="md-bottom-bar-icon feedback_white" style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.sms}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-favorites" @click="gosetup">
                        <div class="md-bottom-bar-icon settings_white" style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.setup}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Shift',
    computed: {
        newPosts: function() {
            return this.$store.state.needDoNum
        },
        language() {
            return this.$store.getters.getLanguage
        },
        showBottom: function() {
            return this.$store.state.showBottom
        },
        driverRole: function() {
            return localStorage.getItem('driverRole')
        },
        haveBill: function() {
            return this.$store.state.haveBill
        },
    },
    methods: {
        gohome() {
            this.$router.push('/')
        },
        goDayHome() {
            this.$router.push('/dayshifthome')
        },
        gomission() {
            this.$router.push('/history')
        },
        gosearch() {
            this.$router.push('/search')
        },
        gosetup() {
            this.$router.push('/setup')
        },
        goFinish() {
            this.$router.push('/finish')
        },
        goBill(){
            this.$router.push('/bill')
        },
        gofix() {
            this.$router.push('/fixcar')
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
    border: 1px solid rgba(#000, 0.26);
    background: rgba(#000, 0.06);
}

.phone-viewport {
    display: inline-flex;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, 0.26);
    background: rgba(#000, 0.06);
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
    letter-spacing: -0.05em;
    font-family: 'Roboto Mono', monospace;
}

.baseline_home {
    background: #fff;
    mask-image: url(../../public/icons/baseline-home-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-home-36px.svg);
    width: 36px;
    height: 36px;
}

.assignment_turned {
    background: #fff;
    mask-image: url(../../public/icons/baseline-assignment_turned_in-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-assignment_turned_in-36px.svg);
    width: 36px;
    height: 36px;
}

.list_alt {
    background: #fff;
    mask-image: url(../../public/icons/baseline-list_alt-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-list_alt-24px.svg);
    width: 36px;
    height: 36px;
}

.search_white {
    background: #fff;
    mask-image: url(../../public/icons/baseline-search-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-search-36px.svg);
    width: 36px;
    height: 36px;
}

.settings_white {
    background: #fff;
    mask-image: url(../../public/icons/baseline-settings-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-settings-36px.svg);
    width: 36px;
    height: 36px;
}

.feedback_white {
    background: #fff;
    mask-image: url(../../public/icons/baseline-feedback-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-feedback-24px.svg);
    width: 36px;
    height: 36px;
}
</style>
