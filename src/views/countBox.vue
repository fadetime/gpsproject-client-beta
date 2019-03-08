<template>
    <div id="countboxpage">
        <div class="countbox_title">
            <div style="width:20px"></div>
            <div>
                <span style="font-size:16px">Count basket</span>
            </div>
            <div style="width:20px"></div>
        </div>
        <div style="height:40px">
            <!-- empty space -->
        </div>
        <div class="countbox_body" ref="count_body">
            <div v-if="!isHaveCount" class="countbox_body_frame" @click="openCountBoxDialog">
                <div class="add_icon"></div>
                <div>
                    <span>ADD</span>
                </div>
            </div>
            <div v-else class="countbox_body_content">
                <div class="countbox_body_content_frame">
                    <div class="countbox_body_content_frame_title">
                        <span>Count basket collection</span>
                    </div>
                    <div class="countbox_body_content_frame_body">
                        <div class="countbox_body_content_frame_body_top">
                            <div>{{collection_date | dateFilter}}</div>
                            <div>{{collection_name}}</div>
                        </div>
                        <div class="countbox_body_content_frame_body_time">
                            <div class="countbox_body_content_frame_body_time_frame">
                                <span>{{collection_date | timefilter}}</span>
                            </div>
                        </div>
                        <div class="countbox_body_content_frame_body_array">
                            <div class="countbox_body_content_frame_body_array_frame">
                                <div class="countbox_body_content_frame_body_array_title">
                                    <div class="countbox_body_content_frame_body_array_title_date">
                                        <span>DATE</span>
                                    </div>
                                    <div class="countbox_body_content_frame_body_array_title_time">
                                        <span>TIME</span>
                                    </div>
                                    <div class="countbox_body_content_frame_body_array_title_num">
                                        <span>NUM</span>
                                    </div>
                                </div>
                                <div class="countbox_body_content_frame_body_array_space">
                                    <div class="countbox_body_content_frame_body_array_item" v-for="(item,index) in collection_array" :key="index">
                                        <div class="countbox_body_content_frame_body_array_item_date">
                                            <span>{{item.date | dateFilter}}</span>
                                        </div>
                                        <div class="countbox_body_content_frame_body_array_item_time">
                                            <span>{{item.date | timefilter}}</span>
                                        </div>
                                        <div class="countbox_body_content_frame_body_array_item_num">
                                            <span>{{item.number}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="countbox_body_content_frame_body_array_space_button" @click="addNumMethod()">
                                    <span>+ Add basket number</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="countbox_body_content_frame_bottom">
                        <div class="countbox_body_content_frame_bottom_button" @click="delCollectionMethod">
                            <span>Delete</span>
                        </div>
                        <div class="countbox_body_content_frame_bottom_button" @click="submitCollectionMethod">
                            <span>Submit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- count box dialog start  -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowAddCountDialog" class="count_back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowAddCountDialog"
                 class="count_front"
                 @click.self.prevent="isShowAddCountDialog = false">
                <div class="count_box">
                    <div class="count_box_title">
                        <span>Add number</span>
                    </div>
                    <div class="count_box_body">
                        <div class="count_box_body_item">
                            <div class="count_box_body_item_left">
                                <span>Staff</span>
                            </div>
                            <div class="count_box_body_item_right">
                                <div>
                                    <span>{{userName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="count_box_body_item">
                            <div class="count_box_body_item_left">
                                <span>Number</span>
                            </div>
                            <div class="count_box_body_item_right">
                                <input type="number" v-model="number">
                            </div>
                        </div>
                    </div>
                    <div class="count_box_footer">
                        <div class="count_box_footer_button" @click="countBoxDialogMethod('cancel')">
                            <span>Cancel</span>
                        </div>
                        <div v-if="isHaveCount" class="count_box_footer_button" @click="countBoxDialogMethod('addNum')">
                            <span>Confirm</span>
                        </div>
                        <div v-else class="count_box_footer_button" @click="countBoxDialogMethod('confirm')">
                            <span>Confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- count box dialog end  -->

        <!-- first page notice start -->
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowFirstPageNotice"
                 class="first_notic_back">
                <div class="first_notic_back_close" @click="isShowFirstPageNotice = false">
                    <span>x</span>
                </div>
                <div class="first_notic_back_top">
                    <img src="../../public/img/handshake.png" alt="handshake"> 
                </div> 
                <div class="first_notic_back_center">
                    <div class="first_notic_back_center_frame" @click="isShowBigImageDialog = true">
                        <img :src="firstPageImage | imgurl" alt="notice_pic">
                    </div>
                </div>
                <div class="first_notic_back_bottom">
                    <div class="first_notic_back_bottom_frame">
                        <span>{{firstPageText}}</span>
                    </div>
                </div>
            </div>
        </transition>
        <!-- first page notice end -->

        <!-- big image dialog start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowBigImageDialog" class="bigimg_dialog">
                <div class="first_notic_back_close" @click="isShowBigImageDialog = false">
                    <span>x</span>
                </div>
                <div class="bigimg_dialog_frame">
                    <img :src="firstPageImage | imgurl" alt="notice_pic">
                </div>
            </div>
        </transition>
        <!-- big image dialog end -->

        <!-- error tips start -->
        <transition name="carwash-transition" enter-active-class="animated slideInDown faster" leave-active-class="animated slideOutUp faster">
            <div v-if="showErrorTips" class="error_tips" @click="showErrorTips = false">
                {{errorInfo}}
            </div>
        </transition>
        <!-- error tips end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";

export default {
    mounted(){
        let screenHeight = document.documentElement.clientHeight
        let lindBoxHeight = screenHeight - 40 - 56
        this.$refs.count_body.style.height = lindBoxHeight + 'px'
        this.userName = localStorage.getItem('drivername')
        this.findCountBoxCollection()
        this.findFirstPageNotice()
    },

    computed: {
        lang() {
            return this.$store.state.lang;
        }
    },

    data(){
        return {
            isHaveCount:false,
            isShowAddCountDialog:false,
            isShowBigImageDialog:false,
            userName: null,
            number:null,
            showErrorTips:false,
            errorInfo:null,
            collection_date:null,
            collection_name:null,
            collection_array:[],
            collection_id:null,
            isShowFirstPageNotice:false,
            firstPageText:null,
            firstPageImage:null
        }
    },

    methods:{
        findFirstPageNotice(){
            let noticeOldTime = localStorage.getItem('noticeOldTime')
            if(noticeOldTime){
                let tempdate = new Date().toLocaleDateString()
                tempdate = new Date(tempdate).getTime()
                if(noticeOldTime < tempdate){
                    console.log('if')
                    axios
                    .get(config.server + '/announcement/find')
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.firstPageText = doc.data.text
                            this.firstPageImage = doc.data.image
                            this.isShowFirstPageNotice = true
                            localStorage.noticeOldTime = tempdate
                        }else{
                            if(this.lang === 'ch'){
                                this.errorInfo = '获取首页通知失败'
                            }else{
                                this.errorInfo = 'Get first page notice failed'
                            }
                            this.showErrorTips = true
                            setTimeout(() => {
                                this.showErrorTips = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }else{
                noticeOldTime = new Date().toLocaleDateString()
                noticeOldTime = new Date(noticeOldTime).getTime()
                axios
                    .get(config.server + '/announcement/find')
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.firstPageText = doc.data.text
                            this.firstPageImage = doc.data.image
                            this.isShowFirstPageNotice = true
                            localStorage.noticeOldTime = noticeOldTime
                        }else{
                            if(this.lang === 'ch'){
                                this.errorInfo = '获取首页通知失败'
                            }else{
                                this.errorInfo = 'Get first page notice failed'
                            }
                            this.showErrorTips = true
                            setTimeout(() => {
                                this.showErrorTips = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    }) 
           }          
        },

        delCollectionMethod(){
            axios
                .post(config.server + '/boxcount/remove',{
                    _id:this.collection_id,
                    submitter:this.userName
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.findCountBoxCollection()
                        if(this.lang === 'ch'){
                            this.errorInfo = '删除成功'
                        }else{
                            this.errorInfo = 'Delete collection success'
                        }
                        this.showErrorTips = true
                        setTimeout(() => {
                            this.showErrorTips = false
                        }, 2000);
                    }else{
                        if(this.lang === 'ch'){
                            this.errorInfo = '删除失败'
                        }else{
                            this.errorInfo = 'Delete collection failed'
                        }
                        this.showErrorTips = true
                        setTimeout(() => {
                            this.showErrorTips = false
                        }, 2000);
                    }
                })
                .then(err => {
                    console.log(err)
                })
        },

        submitCollectionMethod(){
            let tempDate = new Date().toISOString()
            axios
                .post(config.server + '/boxcount/submit',{
                    date:tempDate,
                    _id:this.collection_id
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        if(this.lang === 'ch'){
                            this.errorInfo = '提交成功'
                        }else{
                            this.errorInfo = 'Submit collection success'
                        }
                        this.showErrorTips = true
                        setTimeout(() => {
                            this.showErrorTips = false
                        }, 2000);

                        this.isHaveCount = false
                        this.findCountBoxCollection()
                    }else if(doc.data.code === 1){
                        this.isHaveCount = true
                    }else{
                        if(this.lang === 'ch'){
                            this.errorInfo = '获取数据失败'
                        }else{
                            this.errorInfo = 'Failed to get data'
                        }
                        this.showErrorTips = true
                        setTimeout(() => {
                            this.showErrorTips = false
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        addNumMethod(){
            this.isShowAddCountDialog = true
        },

        findCountBoxCollection(){
            axios
                .post(config.server + '/boxcount/find',{
                    submitter:this.userName
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        console.log(doc)
                        this.collection_date = doc.data.doc.date
                        this.collection_name = doc.data.doc.submitter
                        this.collection_array = doc.data.doc.countArray
                        this.collection_id = doc.data.doc._id
                        this.isHaveCount = true
                    }else if(doc.data.code === 1){
                        this.isHaveCount = false
                    }else{
                        if(this.lang === 'ch'){
                            this.errorInfo = '获取数据失败'
                        }else{
                            this.errorInfo = 'Failed to get data'
                        }
                        this.showErrorTips = true
                        setTimeout(() => {
                            this.showErrorTips = false
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        countBoxDialogMethod(mode){
            if(mode === 'confirm'){
                let tempDate = new Date().toISOString()
                axios
                    .post(config.server + '/boxcount/create',{
                        date:tempDate,
                        submitter:this.userName,
                        number:this.number
                    })
                    .then(doc => {
                        console.log(doc)
                        if(this.lang === 'ch'){
                            this.errorInfo = '创建成功'
                        }else{
                            this.errorInfo = 'Create success'
                        }
                        this.showErrorTips = true
                        this.isShowAddCountDialog = false
                        this.number = null
                        this.findCountBoxCollection()
                        setTimeout(() => {
                            this.showErrorTips = false
                        }, 2000);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }else if(mode === 'addNum'){
                let tempDate = new Date().toISOString()
                axios
                    .post(config.server + '/boxcount/edit',{
                        _id:this.collection_id,
                        date:tempDate,
                        number:this.number
                    })
                    .then(doc => {
                        console.log('############')
                        console.log(doc)
                        console.log('############')
                        if(this.lang === 'ch'){
                            this.errorInfo = '添加成功'
                        }else{
                            this.errorInfo = 'Add success'
                        }
                        this.showErrorTips = true
                        this.isShowAddCountDialog = false
                        this.number = null
                        this.findCountBoxCollection()
                        setTimeout(() => {
                            this.showErrorTips = false
                        }, 2000);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }else{
                this.isShowAddCountDialog = false
                this.number = null
            }
        },

        openCountBoxDialog(){
            this.isShowAddCountDialog = true
        }
    }
}
</script>

<style scoped>
.countbox_title{
    background-color: #d74342;
    color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
}

.countbox_body{
    background-color: #f7f7f7;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.countbox_body_frame{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -80px;
}

.add_icon{
    background: #d74342;
    mask-image: url(../../public/icons/baseline-add_circle_outline-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-add_circle_outline-24px.svg);
    width: 54px;
    height: 54px;
    -webkit-mask-size: 54px 54px;
}

.countbox_body_frame_bottom{
    height: 30px;
    line-height: 30px;
}

.count_back {
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.count_front {
    position: fixed;
    z-index: 26;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.count_box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.count_box_title{
    height: 30px;
    line-height: 30px;
    background: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.count_box_body_item{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
}

.count_box_body_item_left{
    width: 80px;
    text-align: right;
}

.count_box_body_item_right{
    width: 100px;
    text-align: center;
    margin-left: 8px;
    margin-right: 12px;
}

.count_box_body_item_right div{
    border: 1px solid #9a9a9a;
    width: 100%;
    background-color: #eee;
}

.count_box_body_item_right input{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
}

.count_box_footer{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 8px;
    margin-left: 8px;
    margin-right: 8px;
}

.count_box_footer_button{
    width: 100px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    border: 1px solid #eee;
}

.countbox_body_content_frame{
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    overflow: hidden;
}

.countbox_body_content_frame_title{
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 16px;
    height: 30px;
    line-height: 30px;
}

.countbox_body_content_frame_body_top{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
}

.countbox_body_content_frame_body_time{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
}

.countbox_body_content_frame_body_time_frame{
    width: 80%;
    border-top: 1px solid #eee;
    color: rgba(0, 0, 0, 0.5)
}

.countbox_body_content_frame_body_array{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-left: 12px;
    margin-right: 12px;
}

.countbox_body_content_frame_body_array_frame{
    background-color: #f7f7f7;
    overflow: hidden;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #eee;
}

.countbox_body_content_frame_body_array_title{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    align-items: center;
}

.countbox_body_content_frame_body_array_title_date{
    height: 25px;
    line-height: 25px;
    width: 100px;
}

.countbox_body_content_frame_body_array_title_time{
    border-left: 2px solid #eee;
    margin-left: 2px;
    height: 25px;
    line-height: 25px;
    width: 120px;
}

.countbox_body_content_frame_body_array_title_num{
    border-left: 2px solid #eee;
    margin-left: 2px;
    height: 25px;
    line-height: 25px;
    width: 80px;
}

.countbox_body_content_frame_body_array_space{
    height: 180px;
    overflow-y: auto;
    margin-top: 4px;
}

.countbox_body_content_frame_body_array_item{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 10px;
}

.countbox_body_content_frame_body_array_item_date{
    width: 100px;
}

.countbox_body_content_frame_body_array_item_time{
    width: 120px;
}

.countbox_body_content_frame_body_array_item_num{
    width: 80px;
}

.countbox_body_content_frame_body_array_space_button{
    border: 1px solid #eee;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.countbox_body_content_frame_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    margin-bottom: 10px;
}

.countbox_body_content_frame_bottom_button{
    border: 1px solid #eee;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.error_tips {
    position: fixed;
    top: 0;
    background-color: rgba(255, 255, 0, 0.7);
    width: 100%;
    z-index: 99;
    height: 40px;
    line-height: 40px
}

.first_notic_back{
    position: fixed;
    z-index: 101;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f7f7f7;
    overflow-y: auto;
}

.first_notic_back_close{
    position: fixed;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    z-index: 143;
    top: 10px;
    color: #000;
    background-color: #fff;
    font-size: 20px;
    line-height: 26px;
    right: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.first_notic_back_center{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 10px;
}

.first_notic_back_center_frame{
    background-color: #fff;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 220px;
    height: 260px;
}

.first_notic_back_center_frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.first_notic_back_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.first_notic_back_bottom_frame{
    width: 320px;
    text-align: left;
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    padding: 12px;
    /* white-space: pre-wrap; */
    word-wrap: break-word;
    text-overflow: ellipsis;
    line-height: 25px;
}

.bigimg_dialog{
    position: fixed;
    z-index: 103;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.bigimg_dialog_frame{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}
</style>
