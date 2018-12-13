<template>
    <div id="searchpage">
        <div class="search-title">
            <span>搜索客户</span>
        </div>
        <div class="search-body">
            <div class="search-body-top">
                <input type="text" placeholder="请输入客户名称" v-model="keyWord" @keyup.enter="searchMethod">
            </div>
            <div v-if="!returnNull" class="search-body-center">
                <div class="search-body-center-item" v-for="(item,index) in clientArray" :key="index">
                    <div class="search-body-center-item-title">
                        <span>{{item.clientbname}}</span>
                    </div>
                    <div class="search-body-center-item-body">
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>客户电话：</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientbphone}}</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>客户邮编：</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientbpostcode}}</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>客户地址：</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientbaddress}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="pageNow > 0" v-if="countNum >= pageSize * pageNow" class="search-body-center-more" @click="getMoreMethod">
                    <span>更多信息</span>
                </div>
                <div v-show="pageNow > 0 && clientArray.length != 0" v-else>
                    <span style="color:#6a6a6a">~~没有更多信息~~</span>
                </div>
                <div v-if="clientArray.length === 0" class="search-body-logo">
                    <img src="../../public/img/ebuyLogo.png" alt="ebuylogo">
                </div>
            </div>
            <div v-else class="search-body-center">
                <div style="padding-top:10vh">
                    <span>~~未找到该客户~~</span>
                </div>
                <div>
                    <img src="../../public/img/crycat.gif" alt="notfond">
                </div>
            </div>
        </div>
        <div class="search-footer">
            <!-- 底部占位符 -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import config from '../assets/js/config'

export default {
    data(){
        return {
            keyWord:null,
            pageSize:5,
            pageNow:1,
            clientArray:[],
            countNum:null,
            returnNull:false
        }
    },
    methods:{
        searchMethod(){
            this.returnNull = false
            this.pageNow = 1
            this.clientArray = []
            axios.post(config.server + '/clientb/find',{
                    pageSize:this.pageSize,
                    pageNow:this.pageNow,
                    word:this.keyWord
                })
            .then(doc => {
                console.log(doc.data.count)
                if(doc.data.code === 0){
                    this.countNum = doc.data.count
                    this.clientArray=this.clientArray.concat(doc.data.doc)
                    // this.pageNow += 1
                }else{
                    this.returnNull = true
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        getMoreMethod(){
            this.pageNow += 1
            axios.post(config.server + '/clientb/find',{
                    pageSize:this.pageSize,
                    pageNow:this.pageNow,
                    word:this.keyWord
                })
            .then(doc => {
                this.clientArray=this.clientArray.concat(doc.data.doc)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.search-title{
    height: 50px;
    background: #d74342;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.search-title span{
    color: #fff;
    font-size: 18px;
    line-height: 50px;
}

.search-body {
    padding-top: 10px;
}

.search-body-top input{
    text-align: center;
    font-size: 16px;
    border-radius: 20px;
    height: 30px;
    border: 1px solid #e0e0e0;
    width: 80%;
    transition: 0.2s;
}

.search-body-top input:focus{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    outline: none;
    transition: 0.2s;
}

.search-body-center{
    padding-top: 10px;
}

.search-body-center-item{
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin-bottom: 10px
}

.search-body-center-item-title{
    height: 30px;
    line-height: 30px;
    border-bottom:1px solid #e0e0e0;
    font-size: 16px;
}

.search-body-center-item-body{
    padding-bottom: 5px;
}

.search-body-center-item-body-item{
    display: flex;
    display: -webkit-flex;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
}

.search-body-center-item-body-item-left{
    flex-basis: 30%;
    text-align: right;
}

.search-body-center-item-body-item-right{
    flex-basis: 70%;
    text-align: left;
}

.search-body-center-more{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 100px;
    margin: 0 auto;
    border-radius: 15px;
    border: 1px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
    transition: 0.2s;
}

.search-body-center-more:active{
    box-shadow:none;
    transition: 0.2s;
}

.search-body-logo{
    width: 50%;
    margin: 0 auto;
    padding-top: 10vh;
}

.search-footer{
    height: 80px;
}
</style>

