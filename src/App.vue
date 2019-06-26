<template>
    <div id="app" v-if="loadingDone">
        <keep-alive>
            <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
                <router-view class="child-view" />
            </transition>
        </keep-alive>
        <bottom-bar v-if="token" style="position:fixed;bottom:0;width: 100%;"></bottom-bar>
    </div>
</template>

<script>
import BottomBar from './components/BottomBar'
export default {
    components: {
        BottomBar
    },
    data() {
        return {
            loadingDone: false,
            lang: 'ch'
        }
    },
    created() {
        document.getElementById('appLoading').className = 'animated fadeOut'
        setTimeout(() => {
            document.body.removeChild(document.getElementById('appLoading'))
            this.loadingDone = true
        }, 100)
        this.getLang()
    },
    mounted() {
        if (!localStorage.drivertoken) {
            this.$router.push('/login')
        } else {
            let item = localStorage.drivertoken
            this.$store.dispatch('setToken', item)
        }
        if(this.$store.state.haveBill){
            this.$store.dispatch('setHaveBill', true)
        }
    },

    computed: {
        token() {
            return this.$store.state.haveToken
        }
    },
    methods: {
        getLang() {
            if (localStorage.lang) {
                this.$store.dispatch('setLanguage', localStorage.lang)
            } else {
                this.$store.dispatch('setLanguage', 'ch')
            }
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    transition: 1s;
}

.child-view {
    position: absolute;
    width: 100%;
}
@import '~vue-material/dist/theme/engine'; // Import the theme engine
@include md-register-theme(
    'default',
    (
        primary: #d74342,
        // The primary color of your application
            accent: #d74342// The accent or secondary color
    )
);
@import '~vue-material/dist/theme/all'; // Apply the theme
</style>
