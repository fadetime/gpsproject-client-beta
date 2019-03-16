<template>
    <div id="break_basket_check">
        <div class="page_title">
            <div style="width:24px;margin-left: 8px;"></div>
            <div>
                <span v-if="lang === 'ch'">坏框统计审批</span>
                <span v-else>Basket verificator</span>
            </div>
            <div style="margin-right: 8px;" @click="showSmallDialogMethod">
                <div class="add_icon"></div>
            </div>
        </div>
        <div style="height:40px">
            <!-- empty space area -->
        </div>
        <div class="break_top_button">
            <div class="break_top_button_item break_top_button_item_left" @click="buttonChangeModeMethod('left')" ref="break_top_button_left">
                <span v-if="lang === 'ch'">未审批</span>
                <span v-else>Pending</span>
            </div>
            <div class="break_top_button_item break_top_button_item_right" @click="buttonChangeModeMethod('right')" ref="break_top_button_right">
                <span v-if="lang === 'ch'">已审批</span>
                <span v-else>Verified</span>
            </div>
        </div>
        <div class="break_body" ref="break_body">
            <!-- 未审批数据展示区 -->
            <div v-show="topButtonSwitch" class="page_body_item" v-for="(item,index) in breakBasketArray" :key="index">
                <div class="page_body_item_top" @click="openDetail(index)">
                    <div class="page_body_item_left">
                        <div class="page_body_item_left_frame">
                            <div class="icon_mail"></div>
                        </div>
                    </div>
                    <div class="page_body_item_right">
                        <div class="page_body_item_right_box">
                            <div>
                                <span>{{item.submitter}}</span>
                            </div>
                        </div>
                        <div class="page_body_item_right_note">
                            <span>{{item.date | dateFilter}}{{item.date | timefilter}}</span>
                        </div>
                    </div>
                </div>
                <div class="page_body_item_bottom" ref="myrefBottom">
                    <div style="height:10px;border-top:1px solid #eee">
                        <!-- empty space area -->
                    </div>
                    <div class="page_body_item_bottom_content">
                        <div class="page_body_item_bottom_content_left" @click="openBigImg(item.image)">
                            <img :src="item.image | imgurl" alt="break_basket_img">
                        </div>
                        <div class="page_body_item_bottom_content_right">
                            <span>{{item.note}}</span>
                        </div>
                    </div>
                    <div class="page_body_item_bottom_button">
                        <div class="page_body_item_bottom_button_left" @click="approvalMethod('agree',item)">
                            <span v-if="lang === 'ch'">同意</span>
                            <span v-else>Confirm</span>
                        </div>
                        <div class="page_body_item_bottom_button_right" @click="approvalMethod('deny',item)">
                            <span v-if="lang === 'ch'">拒绝</span>
                            <span v-else>Delete</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 已审批数据展示区 -->
            <div v-show="!topButtonSwitch" class="page_body_item" v-for="(item,index) in breakBasketArray_old" :key="'old' + index">
                <div class="page_body_item_top" @click="openDetailOld(index)">
                    <div class="page_body_item_left">
                        <div class="page_body_item_left_frame">
                            <div class="icon_drafts"></div>
                        </div>
                    </div>
                    <div class="page_body_item_right">
                        <div class="page_body_item_right_box">
                            <div>
                                <span>{{item.submitter}}</span>
                            </div>
                        </div>
                        <div class="page_body_item_right_note">
                            <span>{{item.date | dateFilter}}{{item.date | timefilter}}</span>
                        </div>
                    </div>
                </div>
                <div class="page_body_item_bottom" ref="myrefBottomOld">
                    <div style="height:10px;border-top:1px solid #eee">
                        <!-- empty space area -->
                    </div>
                    <div class="page_body_item_bottom_Info">
                        <div>
                            <span style="color:#6a6a6a">审批人员:</span>
                            <span>{{item.approver}}</span>
                        </div>
                        <div>
                            <span style="color:#6a6a6a">审批时间:</span>
                            <span>{{item.finishDate | dateFilter}}</span>
                        </div>
                    </div>
                    <div class="page_body_item_bottom_content">
                        <div class="page_body_item_bottom_content_left">
                            <img :src="item.image | imgurl" alt="break_basket_img">
                        </div>
                        <div class="page_body_item_bottom_content_right">
                            <span>{{item.note}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="!topButtonSwitch" class="bottom_space" v-if="isShowNextButton">
                <div class="next_page_button" @click="NextPageMethod">
                    <span v-if="lang === 'ch'">下一页</span>
                    <span v-else>NEXT</span>
                </div>
            </div>
        </div>

        <!-- first page notice start -->
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowFirstPageNotice"
                 class="first_notic_back">
                <div class="first_notic_back_close" @click="isShowFirstPageNotice = false">
                    <span v-if="lang === 'ch'" style="font-size:14px;line-height: 38px;">已读</span>
                    <span v-else style="font-size:13px;line-height: 42px;">READ</span>
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
                    <span style="font-size: 24px;line-height: 36px;">x</span>
                </div>
                <div class="bigimg_dialog_frame">
                    <img :src="firstPageImage | imgurl" alt="notice_pic">
                </div>
            </div>
            <div v-else-if="isShowBreakBigImageDialog" class="bigimg_dialog">
                <div class="first_notic_back_close" @click="isShowBreakBigImageDialog = false">
                    <span style="font-size: 24px;line-height: 36px;">x</span>
                </div>
                <div class="bigimg_dialog_frame">
                    <img :src="breakBasketTempImage | imgurl" alt="notice_pic">
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

        <!-- 右上小窗口 start -->
        <div v-if="isShowSmallDialog" class="small_dialog_back" @click="isShowSmallDialog = false"></div>
        <transition name="carwash-transition" leave-active-class="animated fadeOut faster">
            <div v-if="isShowSmallDialog" class="small_dialog_front_Triangle"></div>
        </transition>
        <transition name="carwash-transition" leave-active-class="animated fadeOut faster">
            <div v-if="isShowSmallDialog" class="small_dialog_front">
                <div class="small_dialog_front_item" @click="refreshDataMethod">
                    <div class="icon_refresh"></div>
                    <div>
                        <span>刷新页面</span>
                    </div>
                </div>
                <!-- <div class="small_dialog_front_item" style="margin-bottom:4px">
                    <div class="icon_search"></div>
                    <div>
                        <span>查找审批</span>
                    </div>
                </div> -->
            </div>
        </transition>
        <!-- 右上小窗口 end -->
    </div>
</template>
<script>
import axios from "axios";
import config from "../assets/js/config";

export default {
    mounted(){
        let screenHeight = document.documentElement.clientHeight
        let lindBoxHeight = screenHeight - 80 - 56
        this.$refs.break_body.style.height = lindBoxHeight + 'px'
        this.getNewBreakBoxCheckMethod()
        this.getOldBreakBoxCheckMethod()
        this.findFirstPageNotice()
    },

    computed: {
        lang() {
            return this.$store.state.lang;
        }
    },

    data(){
        return{
            breakBasketArray:[],
            breakBasketArray_old:[],
            showErrorTips:false,
            topButtonSwitch:true,
            errorInfo:null,
            isShowSmallDialog:false,
            isShowFirstPageNotice:false,
            isShowBigImageDialog:false,
            pageNow:1,
            isShowNextButton:true,
            isShowBreakBigImageDialog:false,
            breakBasketTempImage:null
        }
    },

    methods:{
        openBigImg(itemImg){
            this.breakBasketTempImage = itemImg
            this.isShowBreakBigImageDialog = true
        },

        NextPageMethod(){
            this.pageNow ++
            axios
                .post(config.server + '/breakboxreport/findold',{
                    pageNow:this.pageNow
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.breakBasketArray_old = this.breakBasketArray_old.concat(doc.data.doc)
                        if(doc.data.doc.length < 10){
                            this.isShowNextButton = false
                        }else{
                            this.isShowNextButton = true
                        }
                    }else if(doc.data.code === 1){
                        this.isShowNextButton = false
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

        findFirstPageNotice(){
            let noticeOldTime = localStorage.getItem('noticeOldTime')
            if(noticeOldTime){
                let tempdate = new Date().toLocaleDateString()
                tempdate = new Date(tempdate).getTime()
                if(noticeOldTime < tempdate){
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

        refreshDataMethod(){
            this.isShowSmallDialog = false
            this.getNewBreakBoxCheckMethod()
            this.getOldBreakBoxCheckMethod()
            if(this.lang === 'ch'){
                this.errorInfo = '刷新成功'
            }else{
                this.errorInfo = 'Refresh success '
            }
            this.showErrorTips = true
            setTimeout(() => {
                this.showErrorTips = false
            }, 2000);
        },

        showSmallDialogMethod(){
            this.isShowSmallDialog = true
        },

        approvalMethod(mode,item){
            let tempApprover = localStorage.getItem("drivername");
            let tempApprover_id = localStorage.getItem("_id");
            let tempDate = new Date()
            axios
                .post(config.server + '/breakboxreport/approval',{
                    _id:item._id,//申请信息的_id
                    result:mode,
                    approver:tempApprover,
                    approver_id:tempApprover_id,
                    finishDate:tempDate
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.getNewBreakBoxCheckMethod()
                        this.getOldBreakBoxCheckMethod()
                        if(this.lang === 'ch'){
                            this.errorInfo = '审批成功'
                        }else{
                            this.errorInfo = 'Update success '
                        }
                        this.showErrorTips = true
                        setTimeout(() => {
                            this.showErrorTips = false
                        }, 2000);
                    }else{
                        if(this.lang === 'ch'){
                            this.errorInfo = '审批失败'
                        }else{
                            this.errorInfo = 'Update failed '
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

        openDetail(index){
            let refName = 'detailBox' + index
            if(this.$refs.myrefBottom[index].style.height === '168px'){
                this.$refs.myrefBottom[index].style.height = '0'
            }else{
                this.$refs.myrefBottom[index].style.height = '168px'
            }
        },

        openDetailOld(index){
            if(this.$refs.myrefBottomOld[index].style.height === '168px'){
                this.$refs.myrefBottomOld[index].style.height = '0'
            }else{
                this.$refs.myrefBottomOld[index].style.height = '168px'
            }
        },

        getNewBreakBoxCheckMethod(){
            axios
                .post(config.server + '/breakboxreport/findnew',{
                    submitter_id:this.submitter_id
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.breakBasketArray = doc.data.doc
                    }else if(doc.data.code === 1){
                        this.breakBasketArray = []
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

        getOldBreakBoxCheckMethod(){
            axios
                .post(config.server + '/breakboxreport/findold',{
                    pageNow:this.pageNow
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.breakBasketArray_old = doc.data.doc
                        if(doc.data.doc.length < 10){
                            this.isShowNextButton = false
                        }else{
                            this.isShowNextButton = true
                        }
                    }else if(doc.data.code === 1){
                        this.isShowNextButton = false
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

        buttonChangeModeMethod(item){
            if(item === 'left'){
                this.topButtonSwitch = true
                this.$refs.break_top_button_left.style.color = '#2c3e50'
                this.$refs.break_top_button_right.style.color = '#eee'
            }else{
                this.topButtonSwitch = false
                this.$refs.break_top_button_left.style.color = '#eee'
                this.$refs.break_top_button_right.style.color = '#2c3e50'
            }
            
        }
    }
}
</script>

<style scoped>
.break_body{
    background-color: #f7f7f7;
    padding-top: 10px;
    overflow-y: auto;
}

.page_title{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    background-color: #d74342;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.break_top_button{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 40px;
    align-items: center;
}

.break_top_button_item{
    border: 1px solid #eee;
    font-size: 16px;
    width: 100px;
    height:30px;
    line-height: 30px;
}

.break_top_button_item_left{
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.break_top_button_item_right{
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.page_body_item{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    margin-bottom: 10px;
    margin-left: 24px;
    margin-right: 24px;
    background-color: #fff;
}

.page_body_item_top{
    display: flex;
    display: -webkit-flex;
}

.page_body_item_bottom{
    height: 0;
    overflow: hidden;
    transition: 0.25s;
}

.page_body_item_bottom_Info{
    display: flex;
    display:-webkit-flex;
    justify-content: space-around;
    height: 30px;
    line-height: 30px;
}

.page_body_item_bottom_content{
    display: flex;
    display:-webkit-flex;
    justify-content: space-around;
}

.page_body_item_bottom_content_left{
    width: 100px;
    height: 120px;
}

.page_body_item_bottom_content_left img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.page_body_item_bottom_content_right{
    width: 100px;
    height: 120px;
    overflow-y: auto;
    text-align: left;
}

.page_body_item_bottom_button{
    height:30px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    line-height:30px;
    color:#fff;
    margin-top: 8px;
    display: flex;
    display: -webkit-flex;
    overflow: hidden;
    justify-content: center;
}

.page_body_item_bottom_button_left{
    background-color:#448aff;
    flex-basis: 50%
}

.page_body_item_bottom_button_right{
    background-color:#d74342;
    flex-basis: 50%
}

.page_body_item_left{
    flex-basis: 20%;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.page_body_item_left_frame{
    background-color: #448aff;
    height: 32px;
    width: 32px;
    border-radius: 100%;
    display:flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.icon_mail{
    background: #fff;
    mask-image: url(../../public/icons/baseline-mail-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-mail-24px.svg);
    width: 24px;
    height: 24px;
}

.icon_drafts{
    background: #fff;
    mask-image: url(../../public/icons/baseline-drafts-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-drafts-24px.svg);
    width: 24px;
    height: 24px;
}

.icon_refresh{
    background: #fff;
    mask-image: url(../../public/icons/baseline-loop-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-loop-24px.svg);
    width: 24px;
    height: 24px;
}

.icon_search{
    background: #fff;
    mask-image: url(../../public/icons/baseline-search-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-search-24px.svg);
    width: 24px;
    height: 24px;
}

.add_icon{
    background: #fff;
    mask-image: url(../../public/icons/baseline-add-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-add-24px.svg);
    width: 24px;
    height: 24px;
}

.page_body_item_right{
    flex-basis: 80%;
    text-align: left;
}

.page_body_item_right_box{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
}

.page_body_item_right_note{
    height: 30px;
    line-height: 30px;
    color:#6a6a6a;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 220px;
}

.small_dialog_back{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.small_dialog_front_Triangle{
    position: fixed;
    top: 30px;
    right:15px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #6a6a6ae0;
}

.small_dialog_front{
    position: fixed;
    top: 40px;
    right:8px;
    color: #fff;
    background-color: #6a6a6ae0;
    padding-left: 4px;
    padding-right: 8px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.small_dialog_front_item{
    display: flex;
    display: -webkit-flex;
    height: 24px;
    line-height: 24px;
    margin-top: 4px;
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
    width: 40px;
    height: 40px;
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

.bottom_space{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 8px;
}

.next_page_button{
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 100%;
    height: 50px;
    width: 50px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    font-size: 10px;
    justify-content: center;
}
</style>
