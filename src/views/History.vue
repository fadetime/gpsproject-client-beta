<template>
<div id="history">
    <div class="topusername" style="box-shadow: 0px 1px 5px;">
        <div class="topusername-left"></div>
        <div class="topusername-center">
            <span>潇洒强</span>
        </div>
        <div class="topusername-right" @click="test">
        </div>
    </div>
    <div class="emptyarea-top">
        <!-- 顶部占位符 -->
    </div>

    <div style="padding:0 40px">
        <md-datepicker v-model="selectedDate">
            <label>请选择日期</label>
        </md-datepicker>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            selectedDate: null
        }
    },
    methods: {
        test() {
            console.log('111')
            document.getElementById('.date_picker').click()
        }
    }
}
</script>

<style scoped>
.emptyarea-top {
    padding: 30px 0;
}

.topusername {
    background-color: #d74342;
    padding: 10px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    word-wrap: break-word;
    position: fixed;
    z-index: 9;
    width: 100%;
    top: 0;
}

.topusername-left {
    flex-basis: 20%;
    margin: 0 auto;
}

.topusername-center {
    color: #fff;
    font-size: 20px;
    flex-basis: 50%;
    margin: 0 auto;
}

.topusername-center span {
    line-height: 30px;
}

.topusername-right {
    flex-basis: 20%;
    margin: 0 auto;
}
</style>
