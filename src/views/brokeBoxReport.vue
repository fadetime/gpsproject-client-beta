<template>
    <div id="broke_box_report">
        <div class="page_title">
            <div style="width:24px;margin-left: 8px;"></div>
            <div>
                <span v-if="lang === 'ch'">坏框统计申报</span>
                <span v-else>Basket break report</span>
            </div>
            <div style="margin-right: 8px;" @click="showSmallDialogMethod">
                <div class="add_icon"></div>
            </div>
        </div>
        <div style="height:40px">
            <!-- empty space area -->
        </div>
        <input type="file"
                style="display:none"
                id="upload_pic"
                @change="fileChange($event)"
                accept="image/*">
        <div v-if="breakBasketArray != 0" class="break_page_body">
            <div class="page_body_item" v-for="(item,index) in breakBasketArray" :key="index">
                <div class="page_body_item_top" @click="openDetail(index)">
                    <div class="page_body_item_left">
                        <div class="page_body_item_left_frame">
                            <div class="icon_mail"></div>
                        </div>
                    </div>
                    <div class="page_body_item_right">
                        <div class="page_body_item_right_box">
                            <div>
                                <span>{{item.date | dateFilter}}{{item.date | timefilter}}</span>
                            </div>
                            <div style="padding-right:8px">
                                <span>{{item.basketNum}}pic</span>
                            </div>
                        </div>
                        <div class="page_body_item_right_note">
                            <span>{{item.note}}</span>
                        </div>
                    </div>
                </div>
                <div class="page_body_item_bottom" ref="myrefBottom">
                    <div style="height:10px">
                        <!-- empty space area -->
                    </div>
                    <div class="page_body_item_bottom_button" @click="openDelMethod(item)">
                        <span v-if="lang === 'ch'">删除申请</span>
                        <span v-else>Delete</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div ref="breakEmpty" class="breakbox_empty">
                <div class="icon_empty"></div>
                <div v-if="lang === 'ch'" style="font-size:16px;color:#e0e0e0;padding-top:10px">~空~</div>
                <div v-else style="font-size:16px;color:#e0e0e0;padding-top:10px">~EMPTY~</div>
            </div>
        </div>
        <!-- error tips start -->
        <transition name="carwash-transition" enter-active-class="animated slideInDown faster" leave-active-class="animated slideOutUp faster">
            <div v-if="showErrorTips" class="error_tips" @click="showErrorTips = false">
                {{errorInfo}}
            </div>
        </transition>
        <!-- error tips end -->

        <!-- del dialog start -->
        <transition name="carwash-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="showDelDialog" class="dialog_del_back"></div>
        </transition>
        <transition name="carwash-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="showDelDialog" class="dialog_del_front">
                <div class="dialog_del_front_box">
                    <div class="dialog_del_front_box_title">
                        <span v-if="lang === 'ch'">删除</span>
                        <span v-else>Delete</span>
                    </div>
                    <div class="dialog_del_front_box_body">
                        <span v-if="lang === 'ch'">是否确认？</span>
                        <span v-else>Confirm deletion?</span>
                    </div>
                    <div class="dialog_del_front_box_bottom">
                        <div class="dialog_del_front_box_bottom_left" @click="closeDelMethod">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>cancel</span>
                        </div>
                        <div class="dialog_del_front_box_bottom_right" @click="conformDelMethod">
                            <span v-if="lang === 'ch'">确认</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- del dialog start -->

        <!-- 右上小窗口 start -->
        <div v-if="isShowSmallDialog" class="small_dialog_back" @click="isShowSmallDialog = false"></div>
        <transition name="carwash-transition" leave-active-class="animated fadeOut faster">
            <div v-if="isShowSmallDialog" class="small_dialog_front_Triangle"></div>
        </transition>
        <transition name="carwash-transition" leave-active-class="animated fadeOut faster">
            <div v-if="isShowSmallDialog" class="small_dialog_front">
                <div class="small_dialog_front_item">
                    <div class="icon_refresh"></div>
                    <div @click="openAddReportDialogMethod">
                        <span v-if="lang === 'ch'">添加申报</span>
                        <span v-else>add+</span>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 右上小窗口 end -->

        <!-- add report dialog start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowAddReportDialog" class="addreport-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowAddReportDialog"
                 class="addreport-front"
                 @click.self.prevent="isShowAddReportDialog = false">
                <div class="addreport-box">
                    <div class="page_body_box_item" style="padding-top:12px;height:30px;line-height:30px">
                        <div class="page_body_box_item_left">
                            <span v-if="lang === 'ch'">损坏数量</span>
                            <span v-else>Basket number</span>
                        </div>
                        <div class="page_body_box_item_right">
                            <input type="number" style="width:100%;text-align:center" v-model="number">
                        </div>
                    </div>
                    <div class="page_body_box_item" style="height:60px;line-height:30px;margin-top:24px">
                        <div class="page_body_box_item_left">
                            <span v-if="lang === 'ch'">申报备注</span>
                            <span v-else>Report note</span>
                        </div>
                        <div class="page_body_box_item_right">
                            <textarea style="width:100%;height:70px" v-model="note"></textarea>
                        </div>
                    </div>
                    <div class="page_body_box_item" style="height:162px">
                        <div class="photo_frame" @click="uploadFile" ref="photoFrame">
                            <div v-if="!updateImagePreview" class="icon_add" style="-webkit-mask-size: 54px 54px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                            <img v-else :src="updateImagePreview" alt="newimg">
                        </div>
                    </div>
                    <div class="page_body_box_item" style="height:30px;line-height:30px;margin-top:8px">
                        <div class="page_body_box_item_button" @click="clearMethod">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>Cancel</span>
                        </div>
                        <div class="page_body_box_item_button" style="margin-left:8px" @click="confirmMethod">
                            <span v-if="lang === 'ch'">提交</span>
                            <span v-else>Comfirm</span>
                        </div>
                    </div>
                    <div style="height:8px"></div>
                </div>
            </div>
        </transition>
        <!-- add report dialog end -->

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
    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";

export default {
    computed: {
        lang() {
            return this.$store.state.lang;
        }
    },
    data(){
        return {
            showDelDialog:false,
            submitter:null,
            submitter_id:null,
            breakBasketArray:[],
            showErrorTips:false,
            errorInfo:null,
            isShowSmallDialog:false,
            isShowAddReportDialog:false,
            number:null,
            note:null,
            updateImagePreview:null,
            tempDelData:null,
            isShowFirstPageNotice:false,
            isShowBigImageDialog:false
        }
    },

    mounted() {
        let screenHeight = document.documentElement.clientHeight
        let lindBoxHeight = screenHeight - 40 - 60
        this.$refs.breakEmpty.style.height = lindBoxHeight + 'px'
        this.submitter = localStorage.getItem("drivername");
        this.submitter_id = localStorage.getItem("_id");
        this.getBreakBasketArray()
        this.findFirstPageNotice()
    },

    methods:{
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

        conformDelMethod(){
            axios
                .post(config.server + '/breakboxreport/del',{
                    _id:this.tempDelData._id,
                    image:this.tempDelData.image
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.getBreakBasketArray()
                        this.showDelDialog = false
                        if (this.lang === "ch") {
                            this.errorInfo = "删除成功";
                        } else {
                            this.errorInfo = "Delete success";
                        }
                        this.showErrorTips = true;
                        setTimeout(() => {
                            this.showErrorTips = false;
                        }, 2000);
                    }else{
                        if (this.lang === "ch") {
                            this.errorInfo = "删除失败";
                        } else {
                            this.errorInfo = "Delete failed";
                        }
                        this.showErrorTips = true;
                        setTimeout(() => {
                            this.showErrorTips = false;
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        confirmMethod(){
            //
            if (!this.number) {
                if (this.lang === "ch") {
                    this.errorInfo = "请填写框数";
                } else {
                    this.errorInfo = "please input basket number";
                }
                this.showErrorTips = true;
                setTimeout(() => {
                    this.showErrorTips = false;
                }, 2000);
            } else if(!this.updateImagePreview){
                if (this.lang === "ch") {
                    this.errorInfo = "请上传照片";
                } else {
                    this.errorInfo = "please upload picture";
                }
                this.showErrorTips = true;
                setTimeout(() => {
                    this.showErrorTips = false;
                }, 2000);
            }else{
                let payload = new FormData();
                let date = new Date().toISOString()
                let maxSize = 200 * 1024; //200KB
                lrz(this.updateImage, {
                    quality: 0.5
                })
                    .then(res => {
                        if (this.updateImage.size > maxSize) {
                            this.updateImage = res.file;
                        }
                        payload.append("image", this.updateImage);
                        payload.append("basketNum", this.number);
                        payload.append("note", this.note);
                        payload.append("submitter_id", this.submitter_id);
                        payload.append("submitter",this.submitter);
                        payload.append("date",date);
                        axios({
                            method: "post",
                            url: config.server + "/breakboxreport/create",
                            data: payload,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        })
                            .then(doc => {
                                if(doc.data.code === 0){
                                    this.number = null
                                    this.note = null
                                    this.updateImage = null
                                    this.updateImagePreview = null
                                    this.showErrorTips = true
                                    this.isShowAddReportDialog = false
                                    this.getBreakBasketArray()
                                    if(this.lang === 'ch'){
                                        this.errorInfo = '提交成功'
                                    }else{
                                        this.errorInfo = 'Submit success'
                                    }
                                    setTimeout(() => {
                                        this.showErrorTips = false
                                    }, 2000);
                                }else{
                                    this.showErrorTips = true
                                    if(this.lang === 'ch'){
                                        this.errorInfo = '提交错误'
                                    }else{
                                        this.errorInfo = 'Submit error'
                                    }
                                    setTimeout(() => {
                                        this.showErrorTips = false
                                    }, 2000);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        console.log("lrz err");
                        console.log(err);
                    });
                
            }
        
            //
        },

        fileChange(el) {
            if (typeof FileReader === "undefined") {
                return alert("浏览器不支持上传图片");
            }
            if (!el.target.files[0].size) return; //判断是否有文件数量
            this.updateImagePreview = window.URL.createObjectURL(
                el.target.files[0]
            );
            this.updateImage = el.target.files[0];
            el.target.value = "";
        },

        uploadFile() {
            document.getElementById("upload_pic").click();
        },

        clearMethod(){
            this.updateImagePreview = null
            this.number = null
            this.note = null
            this.isShowAddReportDialog = false
        },

        openAddReportDialogMethod(){
            this.isShowAddReportDialog = true
            this.isShowSmallDialog = false
        },

        showSmallDialogMethod(){
            this.isShowSmallDialog = true
        },

        getBreakBasketArray(){
            axios
                .post(config.server + '/breakboxreport/findforuser',{
                    submitter_id:this.submitter_id
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.breakBasketArray = doc.data.doc
                    }else if(doc.data.code === 1){
                        console.log('无可用数据')
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

        openDelMethod(item){
            this.tempDelData = item
            this.showDelDialog = true
        },

        closeDelMethod(){
            this.showDelDialog = false
        },

        openDetail(index){
            if(this.$refs.myrefBottom[index].style.height === '40px'){
                this.$refs.myrefBottom[index].style.height = '0'
            }else{
                this.$refs.myrefBottom[index].style.height = '40px'
            }
        }
    }
}
</script>

<style scoped>
.page_title{
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
    align-items: center
}

.icon_mail{
    background: #fff;
    mask-image: url(../../public/icons/baseline-mail-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-mail-24px.svg);
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

.icon_add{
    background: #fff;
    mask-image: url(../../public/icons/baseline-add_circle_outline-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-add_circle_outline-24px.svg);
    width: 54px;
    height: 54px;
}

.break_page_body{
    margin-top: 8px;
    margin-left:24px;
    margin-right: 24px;
}

.page_body_item{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    margin-top: 10px;
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

.page_body_item_bottom_button{
    height:30px;
    background-color:#d74342;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    line-height:30px;
    color:#fff;
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

.dialog_del_back{
    background-color: rgba(0, 0, 0, 0.12);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
}

.dialog_del_front{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    z-index: 21;
    overflow: hidden;
}

.dialog_del_front_box{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    overflow: hidden;
}

.dialog_del_front_box_title{
    background-color: #d74342;
    color: #fff;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.dialog_del_front_box_body{
    height: 40px;
    line-height: 40px;
}

.dialog_del_front_box_bottom{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    border-top: 1px solid #eee;
}

.dialog_del_front_box_bottom_left{
    width: 100px;
}

.dialog_del_front_box_bottom_right{
    width: 100px;
    border-left: 1px solid #eee;
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

.small_dialog_back{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.addreport-back {
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.addreport-front {
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

.addreport-box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
}

.page_body_box_item{
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    justify-content: center;
}

.photo_frame{
    border: 2px dashed rgb(169, 169, 169);;
    width: 100px;
    height: 140px;
    margin-top: 20px;
    background-color: #e0e0e0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.photo_frame img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.page_body_box_item_left{
    width: 80px;
}

.page_body_box_item_right{
    width: 180px;
    margin-right: 12px;
}

.page_body_box_item_right input{
    height: 30px;
}

.page_body_box_item_button{
    width: 100px;
    border-radius: 10px;
    border: 1px solid #eee;
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

.breakbox_empty{
    background-color: #f7f7f7;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.icon_empty{
    background: #e0e0e0;
    mask-image: url(../../public/icons/empty.svg);
    -webkit-mask-image: url(../../public/icons/empty.svg);
    width: 64px;
    height: 64px;
    margin-top: -78px
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
