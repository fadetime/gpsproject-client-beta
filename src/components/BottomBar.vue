<template>
    <div id="bottombar">
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInUp faster"
                    leave-active-class="animated slideOutDown faster">
            <div v-if="showBottom"
                 class="phone-viewport">
                <!-- 白班主管  -->
                <md-bottom-bar class="md-accent"
                               md-type="shift"
                               v-if="driverRole === 'dayshiftLeader'">
                    <md-bottom-bar-item v-if="driverRole === 'dayshiftLeader'"
                                        id="bottom-bar-item-home"
                                        @click="goDayMissionPool">
                        <div class="md-bottom-bar-icon baseline_home"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.home}}</span>
                        <i class="badge"
                           v-if="newPosts"
                           style="width:24px;height:24px;font-size:14px">{{ newPosts }}</i>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-search"
                                        @click="gosearch">
                        <div class="md-bottom-bar-icon search_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.search}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-notice" @click="goNotice">
                        <div class="md-bottom-bar-icon notification_outline"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span v-if="lang === 'ch'" class="md-bottom-bar-label">通知</span>
                        <span v-else class="md-bottom-bar-label">NOTICE</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-favorites"
                                        @click="gosetup">
                        <div class="md-bottom-bar-icon settings_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.setup}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
                <!-- 白班主管  -->

                <!-- 白班 -->
                <md-bottom-bar v-else-if="driverRole === 'dayshift'"
                               class="md-accent"
                               md-type="shift">
                    <md-bottom-bar-item id="bottom-bar-item-home"
                                        @click="goDayHome">
                        <div class="md-bottom-bar-icon baseline_home"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.home}}</span>
                        <i class="badge"
                           v-if="newPosts"
                           style="width:24px;height:24px;font-size:14px">{{ newPosts }}</i>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-mission"
                                        @click="goDayDriverMissionPage">
                        <div class="md-bottom-bar-icon assignment_turned"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span v-if="lang === 'ch'" class="md-bottom-bar-label">任务</span>
                        <span v-else class="md-bottom-bar-label">MISSION</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-notice" @click="goNotice">
                        <div class="md-bottom-bar-icon notification_outline"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span v-if="lang === 'ch'" class="md-bottom-bar-label">通知</span>
                        <span v-else class="md-bottom-bar-label">NOTICE</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-favorites"
                                        @click="gosetup">
                        <div class="md-bottom-bar-icon settings_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.setup}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
                <!-- 白班 -->
                
                <!-- count box start -->
                <md-bottom-bar v-else-if="driverRole === 'countBox'"
                               class="md-accent"
                               md-type="shift">
                    <md-bottom-bar-item id="bottom-bar-item-home"
                                        @click="goCountBox">
                        <div class="md-bottom-bar-icon baseline_home"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.home}}</span>
                        <i class="badge"
                           v-if="newPosts"
                           style="width:24px;height:24px;font-size:14px">{{ newPosts }}</i>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-mission" @click="goNotice">
                        <div class="md-bottom-bar-icon notification_outline"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span v-if="lang === 'ch'" class="md-bottom-bar-label">通知</span>
                        <span v-else class="md-bottom-bar-label">NOTICE</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-favorites"
                                        @click="gosetup">
                        <div class="md-bottom-bar-icon settings_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.setup}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
                <!-- count box end -->

                <!-- 损坏框申报 -->
                <md-bottom-bar v-else-if="driverRole === 'breakbox'"
                               class="md-accent"
                               md-type="shift">
                    <md-bottom-bar-item id="bottom-bar-item-home"
                                        @click="goBreakBox">
                        <div class="md-bottom-bar-icon baseline_home"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.home}}</span>
                        <i class="badge"
                           v-if="newPosts"
                           style="width:24px;height:24px;font-size:14px">{{ newPosts }}</i>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-mission" @click="goNotice">
                        <div class="md-bottom-bar-icon notification_outline"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span v-if="lang === 'ch'" class="md-bottom-bar-label">通知</span>
                        <span v-else class="md-bottom-bar-label">NOTICE</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-favorites"
                                        @click="gosetup">
                        <div class="md-bottom-bar-icon settings_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.setup}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
                <!-- 损坏框申报 -->

                <!-- leader -->
                <md-bottom-bar v-else-if="driverRole === 'leader'"
                               class="md-accent"
                               md-type="shift">
                    <md-bottom-bar-item id="bottom-bar-item-home"
                                        @click="goBreakBoxCheck">
                        <div class="md-bottom-bar-icon baseline_home"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.home}}</span>
                        <i class="badge"
                           v-if="newPosts"
                           style="width:24px;height:24px;font-size:14px">{{ newPosts }}</i>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-mission" @click="goNotice">
                        <div class="md-bottom-bar-icon notification_outline"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span v-if="lang === 'ch'" class="md-bottom-bar-label">通知</span>
                        <span v-else class="md-bottom-bar-label">NOTICE</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-favorites"
                                        @click="gosetup">
                        <div class="md-bottom-bar-icon settings_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.setup}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
                <!-- leader end -->

                <!-- driver start -->
                <md-bottom-bar v-else-if="driverRole === 'user'"
                               class="md-accent"
                               md-type="shift">
                    <md-bottom-bar-item id="bottom-bar-item-home"
                                        @click="gohome">
                        <div class="md-bottom-bar-icon baseline_home"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.home}}</span>
                        <i class="badge"
                           v-if="newPosts"
                           style="width:24px;height:24px;font-size:14px">{{ newPosts }}</i>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item v-if="driverRole != 'dayshift'"
                                        id="bottom-bar-item-finish"
                                        @click="goFinish">
                        <div class="md-bottom-bar-icon assignment_turned"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.finish}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-mission" @click="goNotice">
                        <div class="md-bottom-bar-icon notification_outline"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span v-if="lang === 'ch'" class="md-bottom-bar-label">通知</span>
                        <span v-else class="md-bottom-bar-label">NOTICE</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-favorites"
                                        @click="gosetup">
                        <div class="md-bottom-bar-icon settings_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.setup}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
                <!-- driver end -->

                <!-- car check start -->
                <md-bottom-bar v-else-if="driverRole === 'checker'"
                               class="md-accent"
                               md-type="shift">
                    <md-bottom-bar-item id="bottom-bar-item-check"
                                        @click="goCheck">
                        <div class="md-bottom-bar-icon baseline-assignment"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.check}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-mission" @click="goNotice">
                        <div class="md-bottom-bar-icon notification_outline"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span v-if="lang === 'ch'" class="md-bottom-bar-label">通知</span>
                        <span v-else class="md-bottom-bar-label">NOTICE</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-favorites"
                                        @click="gosetup">
                        <div class="md-bottom-bar-icon settings_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.setup}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
                <!-- car check end -->

                <!-- bill start -->
                <md-bottom-bar v-else-if="driverRole === 'bill'"
                               class="md-accent"
                               md-type="shift">
                    <md-bottom-bar-item v-if="driverRole === 'bill'"
                                        id="bottom-bar-item-bill"
                                        @click="goBill">
                        <div class="md-bottom-bar-icon list_alt"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.bill}}</span>
                        <i class="badge"
                           v-if="haveBill"
                           style="width:24px;height:24px;font-size:14px;color:#d74342">单</i>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-mission" @click="goNotice">
                        <div class="md-bottom-bar-icon notification_outline"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span v-if="lang === 'ch'" class="md-bottom-bar-label">通知</span>
                        <span v-else class="md-bottom-bar-label">NOTICE</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-favorites"
                                        @click="gosetup">
                        <div class="md-bottom-bar-icon settings_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.setup}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
                <!-- bill end -->

                <!-- repair man start -->
                <md-bottom-bar v-else-if="driverRole === 'maintain'"
                               class="md-accent"
                               md-type="shift">
                    <md-bottom-bar-item id="bottom-bar-item-fixcar"
                                        @click="gofix">
                        <div class="md-bottom-bar-icon feedback_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.sms}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-mission" @click="goNotice">
                        <div class="md-bottom-bar-icon notification_outline"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span v-if="lang === 'ch'" class="md-bottom-bar-label">通知</span>
                        <span v-else class="md-bottom-bar-label">NOTICE</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-favorites"
                                        @click="gosetup">
                        <div class="md-bottom-bar-icon settings_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.setup}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>
                <!-- repair man end -->

                <md-bottom-bar v-else
                               class="md-accent"
                               md-type="shift">
                    <md-bottom-bar-item v-if="driverRole === 'dayshiftLeader'"
                                        id="bottom-bar-item-home"
                                        @click="goDayMissionPool">
                        <div class="md-bottom-bar-icon baseline_home"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.home}}</span>
                        <i class="badge"
                           v-if="newPosts"
                           style="width:24px;height:24px;font-size:14px">{{ newPosts }}</i>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item v-if="driverRole != 'dayshift'"
                                        id="bottom-bar-item-home"
                                        @click="gohome">
                        <div class="md-bottom-bar-icon baseline_home"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.home}}</span>
                        <i class="badge"
                           v-if="newPosts"
                           style="width:24px;height:24px;font-size:14px">{{ newPosts }}</i>
                    </md-bottom-bar-item>

                    <md-bottom-bar-item v-if="driverRole != 'dayshift'"
                                        id="bottom-bar-item-finish"
                                        @click="goFinish">
                        <div class="md-bottom-bar-icon assignment_turned"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.finish}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item v-if="driverRole != 'dayshift'"
                                        id="bottom-bar-item-posts"
                                        @click="gomission"
                                        v-show="driverName != '钟兆雷'">
                        <div class="md-bottom-bar-icon search_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.find}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item v-if="driverRole === 'dayshift'"
                                        id="bottom-bar-item-search"
                                        @click="gosearch">
                        <div class="md-bottom-bar-icon search_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.search}}</span>
                    </md-bottom-bar-item>
                    
                    <md-bottom-bar-item v-if="driverRole === 'checker' || driverName === '钟兆雷'"
                                        id="bottom-bar-item-check"
                                        @click="goCheck">
                        <div class="md-bottom-bar-icon baseline-assignment"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.check}}</span>
                    </md-bottom-bar-item>
                    <md-bottom-bar-item id="bottom-bar-item-favorites"
                                        @click="gosetup">
                        <div class="md-bottom-bar-icon settings_white"
                             style="-webkit-mask-size: 28px 28px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                        <span class="md-bottom-bar-label">{{language.bottomBar.setup}}</span>
                    </md-bottom-bar-item>
                </md-bottom-bar>

            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "Shift",
    mounted() {
        this.driverName = localStorage.getItem("drivername");
    },
    computed: {
        newPosts: function() {
            return this.$store.state.needDoNum;
        },
        language() {
            return this.$store.getters.getLanguage;
        },
        lang() {
            return this.$store.state.lang;
        },
        showBottom: function() {
            return this.$store.state.showBottom;
        },
        driverRole: function() {
            return localStorage.getItem("driverRole");
        },
        haveBill: function() {
            return this.$store.state.haveBill;
        }
    },
    data() {
        return {
            driverName: null
        };
    },

    methods: {
        gohome() {
            this.$router.push("/");
        },
        goDayHome() {
            this.$router.push("/dayshifthome");
        },
        goCountBox() {
            this.$router.push("/countbox");
        },
        goBreakBox() {
            this.$router.push("/brokeboxreport");
        },
        goBreakBoxCheck() {
            this.$router.push("/brokeboxreportcheck");
        },
        goDayMissionPool() {
            this.$router.push("/daypool");
        },
        gomission() {
            this.$router.push("/history");
        },
        gosearch() {
            this.$router.push("/search");
        },
        goNotice() {
            this.$router.push("/notice");
        },
        gosetup() {
            this.$router.push("/setup");
        },
        goFinish() {
            this.$router.push("/finish");
        },
        goBill() {
            this.$router.push("/bill");
        },
        goCheck() {
            this.$router.push("/check");
        },
        gofix() {
            this.$router.push("/fixcar");
        },
        goDayDriverMissionPage() {
            this.$router.push("/ddmpage");
        }
    }
};
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
    font-family: "Roboto Mono", monospace;
}

.baseline_home {
    background: #fff;
    mask-image: url(../../public/icons/baseline-home-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-home-36px.svg);
    width: 36px;
    height: 36px;
}

.notification_outline{
    background: #fff;
    mask-image: url(../../public/icons/baseline-notification_important-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-notification_important-24px.svg);
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

.baseline-assignment {
    background: #fff;
    mask-image: url(../../public/icons/baseline-assignment-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-assignment-24px.svg);
    width: 36px;
    height: 36px;
}
</style>
