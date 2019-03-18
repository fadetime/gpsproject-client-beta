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
            <div v-if="!isHaveCount" class="countbox_body_item">
                <div class="countbox_body_frame" @click="isShowCreateDialog = true">
                    <div class="add_icon"></div>
                    <div>
                        <span>ADD</span>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="countbox_body_content_frame_body">
                    <div class="countbox_body_content_frame_body_title">
                        <div class="countbox_body_content_frame_body_top">
                            <div>{{collection.date | dateFilter}}</div>
                            <div>{{collection.submitter}}</div>
                        </div>
                        <div class="countbox_body_content_frame_body_time">
                            <div class="countbox_body_content_frame_body_time_frame">
                                <span>{{collection.date | timefilter}}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="countbox_body_content_frame_body_array">
                        <div class="countbox_body_content_frame_body_array_frame">
                            <div class="countbox_body_content_frame_body_array_title">
                                <span>DT AREA</span>
                            </div>
                            <div class="countbox_body_content_frame_body_array_space">
                                <div class="countbox_body_content_frame_body_array_item">
                                    <div class="countbox_body_content_frame_body_array_item_left">
                                        <span>Number</span>
                                    </div>
                                    <div class="countbox_body_content_frame_body_array_item_right">
                                        <span v-if="collection.area1number">{{collection.area1number}}</span>
                                        <span v-else>Null</span>
                                    </div>
                                </div>
                                <div v-if="collection.area1image" class="countbox_body_content_frame_body_array_item_frame">
                                    <img :src="collection.area1image | imgurl" style="width: 100%;height: 100%;object-fit: cover;">
                                </div>
                                <div v-else class="countbox_body_content_frame_body_array_frame_multiple">
                                <div class="countbox_body_content_frame_body_array_frame_multiple_frame" v-for="(item,index) in collection.area1imageArray" :key="index">
                                    <img :src="'uploads/countBox/'+item | imgurl" style="width: 100%;height: 100%;object-fit: cover;">
                                </div>
                            </div>
                            </div>
                            <div class="countbox_body_content_frame_body_array_space_button" @click="addNumMethod('1')">
                                <span>+ Add number</span>
                            </div>
                        </div>
                    </div>

                    <div class="countbox_body_content_frame_body_array">
                        <div class="countbox_body_content_frame_body_array_frame">
                            <div class="countbox_body_content_frame_body_array_title">
                                <span>COLD STORAGE AREA</span>
                            </div>
                            <div class="countbox_body_content_frame_body_array_space">
                                <div class="countbox_body_content_frame_body_array_item">
                                    <div class="countbox_body_content_frame_body_array_item_left">
                                        <span>Number</span>
                                    </div>
                                    <div class="countbox_body_content_frame_body_array_item_right">
                                        <span v-if="collection.area2number">{{collection.area2number}}</span>
                                        <span v-else>Null</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="collection.area2image" class="countbox_body_content_frame_body_array_item_frame">
                                <img :src="collection.area2image | imgurl" style="width: 100%;height: 100%;object-fit: cover;">
                            </div>
                            <div v-else class="countbox_body_content_frame_body_array_frame_multiple">
                                <div class="countbox_body_content_frame_body_array_frame_multiple_frame" v-for="(item,index) in collection.area2imageArray" :key="index">
                                    <img :src="'uploads/countBox/'+item | imgurl" style="width: 100%;height: 100%;object-fit: cover;">
                                </div>
                            </div>
                            <div class="countbox_body_content_frame_body_array_space_button" @click="addNumMethod('2')">
                                <span>+ Add number</span>
                            </div>
                        </div>
                    </div>

                    <div class="countbox_body_content_frame_body_array">
                        <div class="countbox_body_content_frame_body_array_frame">
                            <div class="countbox_body_content_frame_body_array_title">
                                <span>FACTORY AREA</span>
                            </div>
                            <div class="countbox_body_content_frame_body_array_space">
                                <div class="countbox_body_content_frame_body_array_item">
                                    <div class="countbox_body_content_frame_body_array_item_left">
                                        <span>Number</span>
                                    </div>
                                    <div class="countbox_body_content_frame_body_array_item_right">
                                        <span v-if="collection.area3number">{{collection.area3number}}</span>
                                        <span v-else>Null</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="collection.area3image" class="countbox_body_content_frame_body_array_item_frame">
                                <img :src="collection.area3image | imgurl" style="width: 100%;height: 100%;object-fit: cover;">
                            </div>
                            <div v-else class="countbox_body_content_frame_body_array_frame_multiple">
                                <div class="countbox_body_content_frame_body_array_frame_multiple_frame" v-for="(item,index) in collection.area3imageArray" :key="index">
                                    <img :src="'uploads/countBox/'+item | imgurl" style="width: 100%;height: 100%;object-fit: cover;">
                                </div>
                            </div>
                            <div class="countbox_body_content_frame_body_array_space_button" @click="addNumMethod('3')">
                                <span>+ Add number</span>
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
        <!-- single pic input -->
        <input type="file"
                style="display:none"
                id="upload_pic"
                @change="fileChange($event)"
                accept="image/*">
        <!-- multiple pic input  -->
        <input type="file"
                style="display:none"
                id="upload_multiple_pic"
                multiple="multiple"
                @change="multiplePicChange($event)"
                accept="image/*">
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
                        <div class="count_box_body_item_center">
                            <div class="count_box_center_button count_box_center_button_left" :style="choiseLeft" @click="changeButtonColor('left')">Single PIC</div>
                            <div class="count_box_center_button count_box_center_button_right" :style="choiseRight" @click="changeButtonColor('right')">Multiple PIC</div>
                        </div>
                        <div v-if="isShowSinglePic" class="count_box_body_item_frame">
                            <div class="photo_frame" @click="uploadFile" ref="photoFrame">
                                <div v-if="!updateImagePreview" class="icon_add" style="-webkit-mask-size: 54px 54px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                                <img v-else :src="updateImagePreview" alt="newimg">
                            </div>
                        </div>
                        <div v-else style="height:148px" class="count_box_body_item_multiple_area">
                            <div class="multiple_pic_frame" @click="uploadMultipleFile">
                                <div class="icon_add" style="-webkit-mask-size: 54px 54px;-webkit-mask-repeat: no-repeat;-webkit-mask-position: center;"></div>
                            </div>
                            <div v-for="(item,index) in multiplePicArray" :key="index" class="multiple_pic_frame">
                                <img :src="item" alt="newimg">
                            </div>
                        </div>
                    </div>
                    <div class="count_box_footer">
                        <div class="count_box_footer_button" @click="isShowAddCountDialog = false">
                            <span>Cancel</span>
                        </div>
                        <div class="count_box_footer_button" @click="editNumberMethod()" style="margin-left:8px">
                            <span>Confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- count box dialog end  -->

        <!-- create mission dialog start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowCreateDialog" class="count_back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowCreateDialog"
                 class="count_front"
                 @click.self.prevent="isShowCreateDialog = false">
                <div class="count_box">
                    <div class="count_box_title">
                        <span>Information</span>
                    </div>
                    <div style="padding-top: 10px;">
                        <span>Do you start check basket?</span>
                    </div>
                    <div class="count_box_footer">
                        <div class="count_box_footer_button" @click="isShowCreateDialog = false">
                            <span>NO</span>
                        </div>
                        <div class="count_box_footer_button" @click="openCountBoxDialogMethod" style="margin-left:8px">
                            <span>YES</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- create mission dialog end -->

        <!-- first page notice start -->
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowFirstPageNotice"
                 class="first_notic_back">
                <div class="first_notic_back_close" @click="isShowFirstPageNotice = false">
                    <span v-if="lang === 'ch'" style="font-size:14px">已读</span>
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
import lrz from "lrz";

export default {
    mounted(){
        let screenHeight = document.documentElement.clientHeight
        let lindBoxHeight = screenHeight - 40 - 56 - 3
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
            collection:null,
            isShowFirstPageNotice:false,
            firstPageText:null,
            firstPageImage:null,
            updateImagePreview:null,
            updateImage:[],
            isShowCreateDialog:false,
            editPart:null,
            multiplePicArray:[],
            choiseLeft:'',
            choiseRight:'color:#eee',
            isShowSinglePic:true
        }
    },

    methods:{
        changeButtonColor(item){
            if(item === 'left'){
                this.choiseLeft = ''
                this.choiseRight = 'color:#eee'
                this.isShowSinglePic = true
            }else{
                this.choiseLeft = 'color:#eee'
                this.choiseRight = ''
                this.isShowSinglePic = false
            }
        },
        // test method
        multiplePicChange(el) {
            console.log(this.updateImage)
            if (typeof FileReader === "undefined") {
                return alert("浏览器不支持上传图片");
            }
            if (!el.target.files[0].size) return; //判断是否有文件数量
            this.updateImagePreview = window.URL.createObjectURL(
                el.target.files[0]
            );
            for (let index = 0; index < el.target.files.length; index++) {
                this.updateImagePreview = window.URL.createObjectURL(
                el.target.files[index]);
                this.multiplePicArray.push(this.updateImagePreview)
                let tempArray = el.target.files[index]
                this.updateImage.push(tempArray)
            }
            console.log(this.updateImage)
            console.log(typeof(this.updateImage))
            el.target.value = "";
            // console.log(el.target.files)
        },
        // test method
        //图片上传
        //多图上传
        uploadMultipleFile() {
            document.getElementById("upload_multiple_pic").click();
        },
        // 单图上传 start
        uploadFile() {
            document.getElementById("upload_pic").click();
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
        // 单图上传 end

        editNumberMethod(){
            if(!this.updateImagePreview){
                this.errorInfo = 'Please upload image'
                this.showErrorTips = true
                setTimeout(() => {
                       this.showErrorTips = false 
                }, 2000);
            }else{
                let payload = new FormData();
                let date = new Date().toISOString()
                // 上传单张图片
                if(this.isShowSinglePic){
                    let maxSize = 200 * 1024; //200KB
                    lrz(this.updateImage, {
                        quality: 0.5
                    })
                        .then(res => {
                            if (this.updateImage.size > maxSize) {
                                this.updateImage = res.file;
                            }
                            payload.append("image", this.updateImage);
                            payload.append("number", this.number);
                            payload.append("date", date);
                            payload.append("_id",this.collection._id);
                            payload.append("editPart",this.editPart);
                            axios({
                                method: "post",
                                url: config.server + "/boxcount/edit",
                                data: payload,
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            })
                                .then(doc => {
                                    console.log(doc)
                                    if(doc.data.code === 0){
                                        this.findCountBoxCollection()
                                        this.isShowAddCountDialog = false
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
                }else{
                // 上传多张图片
                this.updateImage.forEach(element => {
                    payload.append("image", element);
                });
                payload.append("number", this.number);
                payload.append("date", date);
                payload.append("_id",this.collection._id);
                payload.append("editPart",this.editPart);
                axios({
                    method: "post",
                    url: config.server + "/boxcount/editM",
                    data: payload,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then(doc => {
                        console.log(doc)
                        if(doc.data.code === 0){
                            this.findCountBoxCollection()
                            this.isShowAddCountDialog = false
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
                }
                
            }
        },

        openCountBoxDialogMethod(){
            this.createNewCountMethod()
        },

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
                    _id:this.collection._id,
                    submitter:this.userName
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.isHaveCount = false
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
                    _id:this.collection._id
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

        addNumMethod(item){
            this.updateImagePreview = null
            this.isShowAddCountDialog = true
            this.editPart = item
            this.multiplePicArray = []
            this.updateImage = []
        },

        findCountBoxCollection(){
            axios
                .post(config.server + '/boxcount/find',{
                    submitter:this.userName
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        console.log(doc)
                        this.collection = doc.data.doc
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

        createNewCountMethod(){
            let tempDate = new Date().toISOString()
            axios
                .post(config.server + '/boxcount/create',{
                    date:tempDate,
                    submitter:this.userName
                })
                .then(doc => {
                    console.log(doc)
                    if(doc.data.code === 0){
                        if(this.lang === 'ch'){
                            this.errorInfo = '创建成功'
                        }else{
                            this.errorInfo = 'Create success'
                        }
                        this.showErrorTips = true
                        this.findCountBoxCollection()
                        this.isShowCreateDialog = false
                        setTimeout(() => {
                            this.showErrorTips = false
                        }, 2000);
                    }else{
                        if(this.lang === 'ch'){
                            this.errorInfo = '创建失败'
                        }else{
                            this.errorInfo = 'Create failed'
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
    z-index: 24;
}

.countbox_body{
    background-color: #f7f7f7;
    position: relative;
    margin-top: 3px;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
}

.countbox_body_item{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
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

.count_box_body_item_center{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 8px;
}

.count_box_center_button{
    width: 100px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border: 1px solid #eee;
}

.count_box_center_button_left{
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.count_box_center_button_right{
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
.count_box_body_item_frame{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    width: 300px;
}

.count_box_body_item_multiple_area{
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    width: 300px;
    justify-content: center;
}

.count_box_body_item_left{
    width: 80px;
    text-align: right;
}

.count_box_body_item_right{
    width: 160px;
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

.photo_frame{
    border: 2px dashed rgb(169, 169, 169);;
    width: 100px;
    height: 140px;
    margin-top: 8px;
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

.multiple_pic_frame{
    border: 2px dashed rgb(169, 169, 169);;
    width: 68px;
    height: 68px;
    margin-top: 8px;
    background-color: #e0e0e0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}
.icon_add{
    background: #fff;
    mask-image: url(../../public/icons/baseline-add_circle_outline-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-add_circle_outline-24px.svg);
    width: 54px;
    height: 54px;
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

.countbox_body_content_frame_title{
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 16px;
    height: 30px;
    line-height: 30px;
}

.countbox_body_content_frame_body_title{
    background-color: #fff;
}

.countbox_body_content_frame_body_top{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
}

.countbox_body_content_frame_body_time{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    height: 30px;
    line-height: 30px;
}

.countbox_body_content_frame_body_time_frame{
    width: 80%;
    border-top: 1px solid #eee;
    color: rgba(0, 0, 0, 0.5)
}

.countbox_body_content_frame_body_array{
    background-color: #fff;
    margin-top: 8px;
    padding: 0 24px;
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
    line-height: 30px;
    justify-content: center;
}

.countbox_body_content_frame_body_array_space{
    overflow-y: auto;
    margin-top: 4px;
}

.countbox_body_content_frame_body_array_item{
    display: flex;
    display: -webkit-flex;
    line-height: 30px;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 10px;
}

.countbox_body_content_frame_body_array_item_frame{
    height: 120px;
    width: 80px;
    margin: 0 auto;
}

.countbox_body_content_frame_body_array_frame_multiple{
    height: 130px;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 12px;
}

.countbox_body_content_frame_body_array_frame_multiple_frame{
    width: 60px;
    height: 60px;
    margin-left: 2px;
    margin-right: 2px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.countbox_body_content_frame_body_array_item_left{
    flex-basis: 50%
}

.countbox_body_content_frame_body_array_item_right{
    flex-basis: 50%
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
</style>
