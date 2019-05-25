<template>
    <div id="homepage" style="overflow：hidden">
        <div style="position:fixed;top:-20px;width:100%;height:70px;background-color:#fff;z-index:9"></div>
        <div>
            <div class="topusername" style="box-shadow: 0px 1px 5px;">
                <div class="topusername-left"></div>
                <div class="topusername-center">
                    <span>{{drivername}}</span>
                </div>
                <div class="topusername-right" @click="refresh">
                    <img src="../../public/icons/refresh.png" alt="refresh" id="arrow">
                </div>
            </div>
            <div class="emptyarea-top">
                <!-- 顶部占位符 -->
            </div>
            <div v-if="allMission.length == 0 && !isShowCarWash" style="width: 50%;margin: 0 auto;padding-top: 15vh;">
                <img src="../../public/img/ebuyLogo.png" alt="logo">
                <br>
                <span>~{{language.homePage.whenEmpty}}~</span>
            </div>
            <div v-else ref="mainbox">
                <md-card md-with-hover style="width:80%;margin:10px auto;border-radius: 10px;" v-for="(item,index) in allMission" :key="index">
                    <md-ripple>
                        <div v-if="lockArray[index] && lockCount != allMission.length" class="locklayer">
                            <md-icon class="md-size-3x">lock</md-icon>
                        </div>
                        <div @click="opendetail(item,index)" style="position: relative;">
                            <div v-if="item.complete">
                                <div v-if="lang === 'en'" class="completediv">
                                    <img src="../../public/img/missionComplete.png" alt="complete">
                                </div>
                                <div v-else class="completediv">
                                    <img src="../../public/img/missionCompleteCH.png" alt="complete">
                                </div>
                            </div>
                            
                            <div class="card-text" style="padding:10px 0 10px 0px;border-bottom: 1px solid #eee;">
                                <div style="margin: 0 auto;">
                                    <div v-if="item.missionLineEN">
                                        <div v-if="lang === 'ch'">
                                            <div>
                                                <span style="font-size:18px;">{{item.missionline}}</span>
                                            </div>
                                            <div style="height:18px;line-height:18px;text-align: center;">
                                                <span style="font-size:12px;color:#6a6a6a">{{item.missionLineEN}}</span>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div>
                                                <span style="font-size:18px;">{{item.missionLineEN}}</span>
                                            </div>
                                            <div style="height:18px;line-height:18px;text-align: center;">
                                                <span style="font-size:12px;color:#6a6a6a">{{item.missionline}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <span style="font-size:18px;">{{item.missionline}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="card-text" style="padding:10px 0 10px 30px">
                                <div>
                                    <span style="font-size:16px;color: #989898">{{language.homePage.amountOfUsers}}</span>
                                </div>
                            </div>

                            <div class="card-text" style="padding:5px 20px 5px 40px">
                                <div class="card-text-left">
                                    <div class="allclientnumicon"></div>
                                </div>
                                <div class="card-text-right" style="padding-left:50px">
                                    <span style="font-size:16px">{{language.homePage.amountBefore}} {{item.missionclient.length}} {{language.homePage.amountAfter}}</span>
                                </div>
                            </div>

                            <div class="card-text" style="padding:10px 0 10px 30px">
                                <div>
                                    <span style="font-size:16px;color: #989898">{{language.homePage.amountOfFinish}}</span>
                                </div>
                            </div>

                            <div class="card-text" style="padding:5px 20px 5px 40px">
                                <div class="card-text-left">
                                    <div class="assignmenticon"></div>
                                </div>
                                <div class="card-text-right" style="padding-left:50px">
                                    <span style="font-size:16px">{{language.homePage.amountBefore}} {{finishNumber[index]}} {{language.homePage.amountAfter}}</span>
                                </div>
                            </div>

                            <div class="card-text" style="padding:20px 0 10px 30px">
                                <div>
                                    <span style="font-size:16px;color: #989898">{{language.homePage.orderTime}}</span>
                                </div>
                            </div>

                            <div class="card-text" style="padding:5px 20px 20px 40px">
                                <div class="card-text-left">
                                    <div class="date_rangeicon"></div>
                                </div>
                                <div class="card-text-right" style="padding-left:50px">
                                    <span style="font-size:16px">{{item.missiondate | dateFilter}}</span>
                                </div>
                            </div>

                            <div style="display: -webkit-flex;display: flex;-webkit-flex-flow: row;flex-flow: row;padding: 0 0 10px 0;justify-content: center;">
                                <div v-for="(x,n) in item.missionclient" :key="n" v-show="n < 5" style="overflow:hidden;width:50px;height:50px;margin: 0 5px;box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);" >
                                    <img :src="x.image | imgurl" alt="x.clientbname" style="height:100%;width:100%;object-fit:contain" v-on:error.once="loadDefault($event)">
                                </div>
                            </div>
                            <div class="card-text" style="padding:10px 0;border-top:1px solid #eee">
                                <div style="margin:0 auto;color:#707070;font-size:18px">
                                    <span>>>></span>
                                    <span> {{language.homePage.clickForDetails}} </span>
                                    <span>>>></span>
                                </div>
                            </div>
                        </div>

                    </md-ripple>
                </md-card>
            </div>
            <!-- car wash start -->
            <div v-if="isShowCarWash" style="width:80%;margin:10px auto">
                <div class="carwashbox">
                    <div class="carwashbox-title" >
                        <span v-if="lang === 'ch'">洗车任务</span>
                        <span v-else>Car Wash</span>
                    </div>
                    <div v-if="isShowCarWash" class="carwashbox-body">
                        <img src="../../public/img/carwash.gif" alt="carWash">
                    </div>
                    <div class="carwashbox-footer">
                        <div class="carwashbox-footer-button"
                             style="width: 100px;"
                             @click="openCarWashConfrimBox('confirm')">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- car wash end -->
            <div class="emptyarea-bottom">
                <!-- 底部占位符 -->
            </div>
        </div>

        <!-- check car box start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="showCheckCarBox" class="checkcar-back"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="showCheckCarBox" class="checkcar-front" @click.self.prevent="showCheckCarBox = false" @touchmove.prevent>
                <div class="checkcar-body">
                    <div class="checkcar-body-top">
                        <span>{{language.homePage.checkCarTitle}}</span>
                    </div>
                    <div class="checkcar-body-center">
                        <div class="checkcar-body-center-title">
                            <span>{{carNum}}</span>
                        </div>
                        <div v-if="checkPage" class="checkcar-body-center-page" >
                            <div style="display:flex">
                                <div>
                                    <div class="checkcar-body-center-item">
                                        <label for="checkwiper" class="checkcar-body-center-item-left">
                                            <span>{{language.homePage.wiper}}</span>
                                        </label>
                                        <div class="checkcar-body-center-item-middle">
                                            <md-checkbox id="checkwiper" v-model="wiper" style="margin:0"></md-checkbox>
                                        </div>
                                        <div class="checkcar-body-center-item-right">
                                            <span v-if="wiper" style="color:green">{{language.homePage.ok}}</span>
                                            <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                        </div>
                                    </div>
                                    <div class="checkcar-body-center-item">
                                        <label for="checkheadlight" class="checkcar-body-center-item-left">
                                            <span>{{language.homePage.headlight}}</span>
                                        </label>
                                        <div class="checkcar-body-center-item-middle">
                                            <md-checkbox id="checkheadlight" v-model="headlight" style="margin:0"></md-checkbox>
                                        </div>
                                        <div class="checkcar-body-center-item-right">
                                            <span v-if="headlight" style="color:green">{{language.homePage.ok}}</span>
                                            <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                        </div>
                                    </div>
                                    <div class="checkcar-body-center-item">
                                        <label for="checkmirror" class="checkcar-body-center-item-left">
                                            <span>{{language.homePage.mirror}}</span>
                                        </label>
                                        <div class="checkcar-body-center-item-middle">
                                            <md-checkbox id="checkmirror" v-model="mirror" style="margin:0"></md-checkbox>
                                        </div>
                                        <div class="checkcar-body-center-item-right">
                                            <span v-if="mirror" style="color:green">{{language.homePage.ok}}</span>
                                            <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                        </div>
                                    </div>
                                    <div class="checkcar-body-center-item">
                                        <label for="checktyre" class="checkcar-body-center-item-left">
                                            <span>{{language.homePage.tyre}}</span>
                                        </label>
                                        <div class="checkcar-body-center-item-middle">
                                            <md-checkbox id="checktyre" v-model="tyre" style="margin:0"></md-checkbox>
                                        </div>
                                        <div class="checkcar-body-center-item-right">
                                            <span v-if="tyre" style="color:green">{{language.homePage.ok}}</span>
                                            <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="checkcar-body-center-item">
                                        <label for="checkbackup" class="checkcar-body-center-item-left">
                                            <span>{{language.homePage.backup}}</span>
                                        </label>
                                        <div class="checkcar-body-center-item-middle">
                                            <md-checkbox id="checkbackup" v-model="backup" style="margin:0"></md-checkbox>
                                        </div>
                                        <div class="checkcar-body-center-item-right">
                                            <span v-if="backup" style="color:green">{{language.homePage.ok}}</span>
                                            <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                        </div>
                                    </div>
                                    <div class="checkcar-body-center-item">
                                        <label for="checkbrake" class="checkcar-body-center-item-left">
                                            <span>{{language.homePage.brake}}</span>
                                        </label>
                                        <div class="checkcar-body-center-item-middle">
                                            <md-checkbox id="checkbrake" v-model="brake" style="margin:0"></md-checkbox>
                                        </div>
                                        <div class="checkcar-body-center-item-right">
                                            <span v-if="brake" style="color:green">{{language.homePage.ok}}</span>
                                            <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                        </div>
                                    </div>
                                    <div class="checkcar-body-center-item">
                                        <label for="checkbrake" class="checkcar-body-center-item-left">
                                            <span v-if="lang === 'ch'">油卡</span>
                                            <span v-else>CetrolCard</span>
                                        </label>
                                        <div class="checkcar-body-center-item-middle">
                                            <md-checkbox id="checkbrake" v-model="petrolCard" style="margin:0"></md-checkbox>
                                        </div>
                                        <div class="checkcar-body-center-item-right">
                                            <span v-if="petrolCard" style="color:green">{{language.homePage.ok}}</span>
                                            <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="checkcar-body-center-item">
                                    <div class="checkcar-body-center-item-left">
                                        <span>{{language.homePage.box}}</span>
                                    </div>
                                    <div class="checkcar-body-center-item-right">
                                        <input type="number" style="margin-left:8px;height: 30px;line-height: 30px;border-radius: 10px;border: 1px solid rgba(0,0,0,0.5);text-align:center;" v-model="boxNum">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="checkcar-body-center-page">
                            <div class="checkcar-body-center-item">
                                <label for="checkbrake" class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.otherOk}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkbrake" v-model="otherError" style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="otherError" style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div>
                                <textarea name="othererror" id="othererror" rows="5" style="width:100%" :disabled="otherError" :placeholder="language.homePage.description" v-model="otherErrorText"></textarea>
                            </div>

                            <!-- take photo area start -->
                            <div class="checkcar-body-center-camera" @click="uploadFile">
                                <div v-if="!updateImagePreview" class="checkcar-camera"></div>
                                <img v-else :src="updateImagePreview" class="checkcar-photo" alt="newimg">
                            </div>
                            <input type="file" style="display:none" id="upload_file" @change="fileChange($event)" accept="image/*">
                            <!-- take photo area end -->
                            
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised" style="margin:0;width:100%;box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);" @click="changeOtherCheckPage">
                            {{language.homePage.other}}
                        </md-button>
                    </div>
                    <div>
                        <md-button class="md-raised" style="margin:0;width:100%;box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);" @click="openPreviewMethod">
                            {{language.homePage.PreviewClient}}
                        </md-button>
                    </div>
                    <div>
                        <md-button class="md-raised" style="margin:0;width:100%;box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);" @click="confirmCheckCar">
                            {{language.homePage.confirmCheck}}
                        </md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- check car box end -->

        <!-- check again box start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="showCheckAgainBox" class="checkcar-back"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="showCheckAgainBox" class="checkcar-front" @click.self.prevent="showCheckAgainBox = false" @touchmove.prevent>
                <div class="checkcar-body">
                    <div class="checkcar-body-top">
                        <span>{{language.homePage.checkCarTitle}}</span>
                    </div>
                    <div class="checkcar-body-center">
                        <div class="checkcar-body-center-title">
                            <span>{{carNum}}</span>
                        </div>
                        <div class="checkcar-body-center-item">
                            <label for="checkwiper" class="checkcar-body-center-item-left">
                                <span>{{language.homePage.clean}}</span>
                            </label>
                            <div class="checkcar-body-center-item-middle">
                                <md-checkbox id="checkwiper" v-model="clean" style="margin:0"></md-checkbox>
                            </div>
                            <div class="checkcar-body-center-item-right">
                                <span v-if="clean" style="color:green">{{language.homePage.ok}}</span>
                                <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                            </div>
                        </div>
                        <div class="checkcar-body-center-item">
                            <div class="checkcar-body-center-item-left">
                                <span>{{language.homePage.box}}</span>
                            </div>
                            <div class="checkcar-body-center-item-right">
                                <input type="number" style="width:160%;margin-left:10px;" v-model="boxNumAgain">
                            </div>
                        </div>
                        <div class="checkcar-body-center-item">
                            <label for="checkbrake" class="checkcar-body-center-item-left">
                                <span>{{language.homePage.otherOk}}</span>
                            </label>
                            <div class="checkcar-body-center-item-middle">
                                <md-checkbox id="checkbrake" v-model="otherErrorAgain" style="margin:0"></md-checkbox>
                            </div>
                            <div class="checkcar-body-center-item-right">
                                <span v-if="otherErrorAgain" style="color:green">{{language.homePage.ok}}</span>
                                <span v-else style="color:#c3c304">{{language.homePage.error}}</span>
                            </div>
                        </div>
                        <div>
                            <textarea name="othererror" id="othererror" rows="5" style="width:100%" :disabled="otherErrorAgain" :placeholder="language.homePage.description" v-model="otherErrorTextAgain"></textarea>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised" style="margin:0;width:100%;box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);" @click="confirmCheckAgain">
                            {{language.homePage.confirmCheck}}
                        </md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- check again box end -->
        
        <!-- Preview client start -->
        <transition name="preview-client-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="previewClient" class="previewclient-back" ></div>
        </transition>
        <transition name="preview-client-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="previewClient" class="previewclient-front" @click.self.prevent="closePreviewMethod">
                <div class="previewclient-box">
                    <div class="checkcar-body-top">
                        <span>{{language.homePage.previewClient}}</span>
                    </div>
                    <div class="previewclient-box-body">
                        <div class="previewclient-box-body-title">
                            <div class="previewclient-box-body-title-left">
                                No.
                            </div>
                            <div class="previewclient-box-body-title-right">
                                <span>{{language.homePage.clientName}}</span>
                            </div>
                        </div>
                        <div class="previewclient-box-body-body">
                            <div v-for="(item,index) in clientArray" :key="index" style="display:flex;display:-webkit-flex" @click="showFullName(item)">
                                <div class="previewclient-box-body-body-left">
                                    <span>{{index + 1}}</span>
                                </div>
                                <div class="previewclient-box-body-body-right">
                                    <span v-if="lang === 'en'">{{item.clientbnameEN}}</span>
                                    <span v-else>{{item.clientbname}}</span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised" style="margin:0;width:100%;box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);" @click="closePreviewMethod">
                            {{language.homePage.close}}
                        </md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- Preview client end -->

        <!-- 操作提示 -->
        <transition name="tips-classes-transition" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
            <div class="errinfo" v-if="showError" @click="showError = false">
                <span>{{errorInfo}}</span>
            </div>
        </transition>
        <!-- 操作提示 -->

        <!-- car wash confirm box start  -->
        <transition name="carwash-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowCarWashComfirmBox" class="previewclient-back" ></div>
        </transition>
        <transition name="carwash-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowCarWashComfirmBox" class="previewclient-front" @click.self.prevent="isShowCarWashComfirmBox = false">
                <div class="previewclient-box">
                    <div class="checkcar-body-top">
                        <div v-if="isComfirmCarWashMode">
                            <span v-if="lang === 'ch'">完成洗车</span>
                            <span v-else>Finish Car Wash</span>
                        </div>
                        <div v-else>
                            <span v-if="lang === 'ch'">取消洗车</span>
                            <span v-else>Cancel Car Wash</span>
                        </div>
                    </div>
                    <div v-if="isComfirmCarWashMode" class="CarWashComfirmBox-body">
                        <div v-if="choiseCar === null" class="CarWashComfirmBox-body-title">
                            <span v-if="lang === 'ch'">选择车辆</span>
                            <span v-else>Select Car</span>
                        </div>
                        <div v-else class="CarWashComfirmBox-body-title" style="color:#212121">
                            <span>{{choiseCar.carid}}</span>
                        </div>
                        <div class="CarWashComfirmBox-body-box">
                            <div v-for="(item,index) in carPlateArray" :key="index" class="CarWashComfirmBox-body-box-item" @click="choiseCarMethod(item)">
                                <span>{{item.carid}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-else class="CarWashComfirmBox-body">
                        <div v-if="choiseCar === null" class="CarWashComfirmBox-body-title">
                            <span v-if="lang === 'ch'">取消原因</span>
                            <span v-else>Cancel Reason</span>
                        </div>
                        <div class="CarWashComfirmBox-body-textarea">
                            <textarea name="cancelreason" id="cancelreason" v-model="removeReason"></textarea>
                        </div>
                        
                    </div>
                    <div class="CarWashComfirmBox-footer">
                        <div class="carwashbox-footer-button"
                             style="width: 100px;margin-right:10px" 
                             @click="isShowCarWashComfirmBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>cancel</span>
                        </div>
                        <div v-if="isComfirmCarWashMode" class="carwashbox-footer-button"
                             style="width: 100px;"
                             @click="confirmCarWashMethod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                        <div v-else class="carwashbox-footer-button"
                             style="width: 100px;"
                             @click="cancelCarWashMethod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- car wash confirm box end  -->
        <!-- key tips box start -->
        <transition name="carwash-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowKeyTips" class="previewclient-back" ></div>
        </transition>
        <transition name="carwash-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowKeyTips" class="previewclient-front" @click.self.prevent="isShowKeyTips = false">
                <div class="previewclient-box">
                    <div class="checkcar-body-top">
                        <span v-if="lang === 'ch'">配送完成</span>
                        <span v-else>Shipping Finish</span>
                    </div>
                    <div style="width:80%;margin:0 auto;text-align:left;padding-top:10px;font-size:16px">
                        <span v-if="lang === 'ch'">辛苦啦，请将车钥匙放回指定位置，便于其他司机取用。</span>
                        <span v-else>Remember to put the car key to original car key hanger. Thanks on your co-operation !</span>
                    </div>
                    <div>
                        <img src="../../public/img/star.gif" alt="staricon" style="width:100px;height:100px">
                    </div>
                    <div style="margin-bottom:10px">
                        <div class="carwashbox-footer-button"
                             style="width: 100px;"
                             @click="isShowKeyTips = false">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- key tips box end -->

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
                        <img v-if="lang === 'ch'" :src="firstPageImage | imgurl" alt="notice_pic">
                        <img v-else :src="firstPageImageEN | imgurl" alt="notice_pic">
                    </div>
                </div>
                <div class="first_notic_back_bottom">
                    <div class="first_notic_back_bottom_frame">
                        <span v-if="lang === 'ch'">{{firstPageText}}</span>
                        <span v-else>{{firstPageTextEN}}</span>
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
                    <img v-if="lang === 'ch'" :src="firstPageImage | imgurl" alt="notice_pic">
                    <img v-else :src="firstPageImageEN | imgurl" alt="notice_pic">
                </div>
            </div>
        </transition>
        <!-- big image dialog end -->

        <!-- 机油报警提示窗口 start -->
        <transition name="warning-classes-back"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowOilWarning" class="oilwarning_dialog_back"></div>
        </transition>
        <transition name="warning-classes-front"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowOilWarning" class="oilwarning_dialog_front">   
                <div class="oilwarning_dialog_front_box">
                    <div class="oilwarning_dialog_front_box_title">
                        <span v-if="lang === 'ch'">请更换车辆机油</span>
                        <span v-else>Kindly change engine oil</span>
                    </div>
                    <div class="oilwarning_dialog_front_box_body">
                        <div class="oilwarning_dialog_front_box_body_left">
                            <div class="notification_icon"></div>
                        </div>
                        <div class="oilwarning_dialog_front_box_body_right">
                            <div class="oilwarning_dialog_front_box_body_right_item">
                                <div class="oilwarning_dialog_front_box_body_right_item_name">
                                    <span v-if="lang === 'ch'">最后更换机油</span>
                                    <span v-else>Last change</span>
                                </div>
                                <div class="oilwarning_dialog_front_box_body_right_item_value">
                                    <span>{{warningInfo.lastOilKelometer}} Km</span>
                                </div>
                            </div>
                            <div class="oilwarning_dialog_front_box_body_right_item">
                                <div class="oilwarning_dialog_front_box_body_right_item_name">
                                    <span v-if="lang === 'ch'">车辆已行驶</span>
                                    <span v-else>Mileage drive</span>
                                </div>
                                <div class="oilwarning_dialog_front_box_body_right_item_value">
                                    <span>{{warningInfo.kelometer}} Km</span>
                                </div>
                            </div>
                            <!-- <div class="oilwarning_dialog_front_box_body_right_item">
                                <div class="oilwarning_dialog_front_box_body_right_item_name"> 
                                    <span v-if="lang === 'ch'">机油行驶性能</span>
                                    <span v-else>EngineOil max usage</span>
                                </div>
                                <div class="oilwarning_dialog_front_box_body_right_item_value">
                                    <span>{{warningInfo.oilProperty}} Km</span>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="oilwarning_dialog_front_box_bottom">
                        <div class="oilwarning_botton" @click="isShowOilWarning = false">
                            <span>确认</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 机油报警提示窗口 end -->
    </div>
</template>

<script>
import axios from 'axios'
import config from '../assets/js/config'
import lrz from 'lrz'
import _ from 'lodash'

export default {
    name: 'homepage',
    beforeCreate() {
        if(localStorage.getItem('driverRole') === 'dayshift'){
            this.$router.push('/ddmpage')
        }else if(localStorage.getItem('driverRole') === 'breakbox'){
            this.$router.push('/brokeboxreport')
        }else if(localStorage.getItem('driverRole') === 'leader'){
            this.$router.push('/brokeboxreportcheck')
        }else if(localStorage.getItem('driverRole') === 'countBox'){
            this.$router.push('/countbox')
        }else if(localStorage.getItem('driverRole') === 'checker'){
            this.$router.push('/check')
        }else if(localStorage.getItem('driverRole') === 'bill'){
            this.$router.push('/bill')
        }else if(localStorage.getItem('driverRole') === 'dayshiftLeader'){
            this.$router.push('/dayshifthome/pool')
        }else if(localStorage.getItem('driverRole') === 'maintain'){
            this.$router.push('/fixcar')
        }else if(localStorage.getItem('driverRole') === 'dayShiftChecker'){
            this.$router.push('/checkPage_day')
        }
    },

    mounted() {
        this.drivername = localStorage.getItem('drivername')
        let driverRole = localStorage.getItem('driverRole')
        this.getChoiceDayMethod()
        this.getDriverMission()
        let today = new Date().getDay()
        this.findFirstPageNotice()
        if(today === 1 && driverRole === 'user'){
            this.findCarWashMethod()
        }
    },

    data() {
        return {
            allMission: [],
            uploadDialog: false,
            drivername: '',
            dialogName: '',
            finishNumber: [],
            needDoNum: 0,
            imgDefault: '/img/ebuyLogo.png',
            choiceDayClassA: 'choiceday',
            choiceDayClassB: 'bechoiceday',
            choiceDayClassC: 'choiceday',
            showCheckCarBox: false,
            wiper: true,
            headlight: true,
            mirror: true,
            tyre: true,
            backup: true,
            brake: true,
            otherError: true,
            carNum: null,
            checkPage: true,
            otherErrorText: null,
            otherErrorTextAgain: null,
            boxNum: null,
            errorInfo: '',
            showError: false,
            showCheckAgainBox: false,
            boxNumAgain: null,
            carCheck_id: null,
            clean: true,
            otherErrorAgain: true,
            updateImagePreview:'',
            updateImage:'',
            previewClient:false,
            missionclient:[],
            clientArray:[],
            petrolCard:true,
            isShowCarWash:false,
            isShowCarWashComfirmBox:false,
            isComfirmCarWashMode:true,
            carPlateArray:[],
            choiseCar:null,
            _id:null,
            removeReason:null,
            isShowKeyTips:false,
            lockArray:[],
            lockCount:0,
            isShowFirstPageNotice:false,
            isShowBigImageDialog:false,
            firstPageText:null,
            firstPageTextEN:null,
            firstPageImage:null,
            firstPageImageEN:null,
            isShowOilWarning: false,
            warningInfo:null
        }
    },
    computed: {
        language() {
            return this.$store.getters.getLanguage
        },
        choiseDay() {
            return this.$store.state.choiseDay
        },
        lang() {
            return this.$store.state.lang
        }
    },
    methods: {
        findFirstPageNotice(){
            let noticeOldTime = localStorage.getItem('noticeOldTime')
            if(noticeOldTime){
                let tempdate = new Date().toLocaleDateString()
                tempdate = new Date(tempdate).getTime()
                if(noticeOldTime < tempdate){
                    axios
                    .get(config.server + '/announcement/find')
                    .then(doc => {
                        console.log(doc)
                        if(doc.data.code === 0){
                            this.firstPageText = doc.data.text
                            this.firstPageTextEN = doc.data.textEN
                            this.firstPageImage = doc.data.image
                            this.firstPageImageEN = doc.data.imageEN
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
                        console.log(doc)
                        if(doc.data.code === 0){
                            this.firstPageText = doc.data.text
                            this.firstPageTextEN = doc.data.textEN
                            this.firstPageImage = doc.data.image
                            this.firstPageImageEN = doc.data.imageEN
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
        //car wash start
        cancelCarWashMethod(){
            let tempDate = new Date().toISOString()
            axios
                .post(config.server + '/carwash/cancel', {
                    _id:this._id,
                    finishDate:tempDate,
                    removeReason:this.removeReason
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.isShowCarWashComfirmBox = false
                        this.findCarWashMethod()
                        if(this.lang === 'ch'){
                            this.errorInfo = '取消洗车成功'
                        }else{
                            this.errorInfo = 'Cancel mission success'
                        }
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 3000);
                    }else{
                        console.log(doc)
                        if(this.lang === 'ch'){
                            this.errorInfo = '取消洗车出错'
                        }else{
                            this.errorInfo = 'Catch an error while cancel'
                        }
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        confirmCarWashMethod(){
            let tempDate = new Date().toISOString()
            axios
                .post(config.server + '/carwash/edit', {
                    carPlate:this.choiseCar.carid,
                    finishDate:tempDate,
                    car_id:this.choiseCar._id,
                    _id:this._id
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.isShowCarWashComfirmBox = false
                        this.findCarWashMethod()
                        if(this.lang === 'ch'){
                            this.errorInfo = '洗车任务完成'
                        }else{
                            this.errorInfo = 'Finish Car Wash'
                        }
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 3000);
                    }else{
                        console.log(doc)
                        this.errorInfo = '查找车辆出错'
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        choiseCarMethod(carInfo){
            this.choiseCar = carInfo
        },

        openCarWashConfrimBox(mode){
            this.findAllCarPlate()
            this.isComfirmCarWashMode = true
            this.isShowCarWashComfirmBox = true
        },

        findAllCarPlate(){
            axios
                .get(config.server + '/car/allplate')
                .then(doc => {
                    if(doc.data.code === 0){
                        this.carPlateArray = doc.data.doc
                    }else{
                        this.isShowCarWash = true
                        if(this.lang === 'ch'){
                            this.errorInfo = '查找车辆出错'
                        }else{
                            this.errorInfo = 'Catch an error while find car info'
                        }
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        findCarWashMethod() {
            let tempDate = new Date().toDateString()
            tempDate =new Date(tempDate).toISOString()
            axios
                .post(config.server + '/carwash/find', {
                    createDate:tempDate,
                    creator:this.drivername
                })
                .then(doc => {
                    if(doc.data.code === 1){//无任务
                        this.isShowCarWash = true
                        this.createCarWashMethod()
                    }else if(doc.data.code === 0){//有任务 但未完成
                        this.isShowCarWash = true
                        this._id = doc.data.doc
                        if(this.lang === 'ch'){
                            this.errorInfo = '今日有洗车任务'
                        }else{
                            this.errorInfo = 'Have an car wash mission'
                        }
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 3000);
                    }else if(doc.data.code === 3){//有任务 但已完成
                        this.isShowCarWash = false
                        this._id = null
                    }else{//其他
                        if(this.lang === 'ch'){
                            this.errorInfo = '查找洗车任务出错'
                        }else{
                            this.errorInfo = 'Catch an error while find carwash mission'
                        }
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        createCarWashMethod() {
            let tempDate = new Date().toISOString()
            axios
                .post(config.server + '/carwash/create', {
                    createDate:tempDate,
                    creator:this.drivername
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this._id = doc.data.doc
                        if(this.lang === 'ch'){
                            this.errorInfo = '今日有洗车任务'
                        }else{
                            this.errorInfo = 'Have an car wash mission'
                        }
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 3000);
                    }else{
                        console.log(doc)
                        this.isShowCarWash = true
                        if(this.lang === 'ch'){
                            this.errorInfo = '创建洗车任务出错'
                        }else{
                            this.errorInfo = 'Catch an error while create CarWash'
                        }
                        this.showError = true
                        setTimeout(() => {
                            this.showError = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        //car wash end

        closePreviewMethod(){
            this.previewClient = false
            this.$refs.mainbox.style.position='relative'
        },

        openPreviewMethod(){
            this.previewClient = true
            this.$refs.mainbox.style.position='fixed'
        },

        showFullName(item){
            this.showError = true
            if(this.lang === 'en'){
                this.errorInfo = item.clientbnameEN
            }else{
                this.errorInfo = item.clientbname
            }
            setTimeout(() => {
                this.showError = false
            }, 3000);
        },

        // upload photo method start
        fileChange(el) {
            if (typeof FileReader === 'undefined') {
                return alert('浏览器不支持上传图片')
            }
            if (!el.target.files[0].size) return //判断是否有文件数量
            this.updateImagePreview = window.URL.createObjectURL(
                el.target.files[0]
            )
            this.updateImage = el.target.files[0]
            el.target.value = ''
        },

        uploadFile() {
            document.getElementById('upload_file').click()
        },
        // upload photo method end
        showKeyTipsMethod() {
            this.isShowKeyTips = true
        },

        confirmCheckAgain() {
            if (!this.boxNumAgain) {
                this.showError = true
                this.errorInfo = this.language.homePage.boxNumErr
                setTimeout(() => {
                    this.showError = false
                }, 2000)
            } else {
                axios
                    .post(config.server + '/checkcar/edit', {
                        carCheck_id: this.carCheck_id,
                        boxNumAgain: this.boxNumAgain,
                        mission_id: this.$store.state.tempArr._id,
                        clean: this.clean,
                        finishDate:new Date().getTime()
                    })
                    .then(doc => {
                        if (doc.data.code === 0) {
                            // this.$router.push('/detailpage')
                            let tempHours = new Date().getHours()
                            console.log(tempHours)
                            if(this.drivername === 'Vijay' || this.drivername === '钟兆雷' || this.drivername === 'Karan' || this.drivername === 'Velu'){
                                if(tempHours > 10 && tempHours < 14){
                                    this.isShowKeyTips = true
                                }
                            }else{
                                if(tempHours > 9 && tempHours < 13){
                                    this.isShowKeyTips = true
                                }
                            }
                            this.showCheckAgainBox = false
                            this.getDriverMission()
                        } else {
                            console.log(doc)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

                axios.post(config.server + '/client-driver/complete',{
                    mission_id: this.$store.state.tempArr._id,
                })
                .then(item => {
                    console.log(item)
                })
                .catch(err => {
                    console.log(err)
                })
                if (!this.otherErrorAgain) {
                    let errData = {}
                    this.$set(
                        errData,
                        'car_id',
                        this.$store.state.tempArr.Car_id
                    ) //车辆_id
                    this.$set(errData, 'driver', this.drivername) //司机
                    this.$set(errData, 'other', 1)
                    this.$set(errData, 'note', this.otherErrorTextAgain)
                    axios
                        .post(config.server + '/fixcar/', errData)
                        .then(doc => {
                            if (doc.data.code === 0) {
                                console.log('货后报损成功')
                            } else {
                                console.log(doc)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }
        },
        
        changeOtherCheckPage() {
            this.checkPage = !this.checkPage
        },
        confirmCheckCar() {
            if (!this.boxNum) {
                this.showError = true
                this.errorInfo = this.language.homePage.boxNumErr
                setTimeout(() => {
                    this.showError = false
                }, 2000)
            } else {
                let tempData = {
                    driver: this.drivername,
                    mission_id: this.$store.state.tempArr._id,
                    car_id: this.$store.state.tempArr.Car_id,
                    wiper: this.wiper,
                    headlight: this.headlight,
                    mirror: this.mirror,
                    tyre: this.tyre,
                    backup: this.backup,
                    brake: this.brake,
                    boxNum: this.boxNum,
                    petrolCard:this.petrolCard
                }
                let errData = {}
                let payload = new FormData()
                if (!this.otherError) {
                    this.$set(tempData, 'text', this.otherErrorText)
                }
                if (
                    !this.wiper ||
                    !this.headlight ||
                    !this.mirror ||
                    !this.tyre ||
                    !this.backup ||
                    !this.brake ||
                    !this.otherError ||
                    this.updateImage
                ) {
                    console.log('enter long if')
                    
                    this.$set(tempData, 'finish', false)
                    this.$set(errData, 'car_id', tempData.car_id) //车辆_id
                    payload.append('car_id', tempData.car_id)
                    this.$set(errData, 'driver', this.drivername) //司机
                    payload.append('driver', this.drivername)
                    if (!this.wiper) {
                        this.$set(errData, 'wiper', 1)
                        payload.append('wiper', 1)
                    }
                    if (!this.headlight) {
                        this.$set(errData, 'headlight', 1)
                        payload.append('headlight', 1)
                    }
                    if (!this.mirror) {
                        this.$set(errData, 'mirror', 1)
                        payload.append('mirror', 1)
                    }
                    if (!this.tyre) {
                        this.$set(errData, 'tyre', 1)
                        payload.append('tyre', 1)
                    }
                    if (!this.backup) {
                        this.$set(errData, 'backup', 1)
                        payload.append('backup', 1)
                    }
                    if (!this.brake) {
                        this.$set(errData, 'brake', 1)
                        payload.append('brake', 1)
                    }
                    if (!this.otherError) {
                        this.$set(errData, 'other', 1)
                        payload.append('other', 1)
                        this.$set(errData, 'note', this.otherErrorText)
                        payload.append('note', this.otherErrorText)
                    }
                    if(this.updateImage){
                        console.log('enter have photo method')
                        let maxSize = 200 * 1024 //200KB
                        lrz(this.updateImage, {
                            quality: 0.5
                        })
                        .then(res => {
                            if (this.updateImage.size > maxSize) {
                                this.updateImage = res.file
                            }
                            payload.append('image', this.updateImage)
                            axios.post(config.server + '/fixcar/photo', payload)
                            .then(doc => {
                                console.log('fix car info with photo send done')
                                this.updateImage = ''
                                this.updateImagePreview=''
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        })
                        .catch(err => {
                            console.log('lrz err')
                            console.log(err)
                        })
                    }else{
                        axios
                        .post(config.server + '/fixcar/', errData)
                        .then(doc => {
                            console.log('fix car info send done')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }
                }
                this.showCheckCarBox = false
                axios
                    .post(config.server + '/checkcar/', tempData)
                    .then(doc => {
                        if (doc.data.code === 0) {
                            this.$router.push('/detailpage')
                        } else {
                            console.log(doc)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        
        getChoiceDayMethod() {
            if (this.choiseDay === 'today') {
                this.choiceDayClassA = 'choiceday'
                this.choiceDayClassB = 'bechoiceday'
                this.choiceDayClassC = 'choiceday'
            } else if (this.choiseDay === 'yesterday') {
                this.choiceDayClassA = 'bechoiceday'
                this.choiceDayClassB = 'choiceday'
                this.choiceDayClassC = 'choiceday'
            } else {
                this.choiceDayClassA = 'choiceday'
                this.choiceDayClassB = 'choiceday'
                this.choiceDayClassC = 'bechoiceday'
            }
        },
        choiceDayMethod(item) {
            if (item === 'today') {
                this.choiceDayClassA = 'choiceday'
                this.choiceDayClassB = 'bechoiceday'
                this.choiceDayClassC = 'choiceday'
                this.$store.dispatch('setChoiseDay', 'today')
                this.getDriverMission()
            } else if (item === 'yesterday') {
                this.choiceDayClassA = 'bechoiceday'
                this.choiceDayClassB = 'choiceday'
                this.choiceDayClassC = 'choiceday'
                this.$store.dispatch('setChoiseDay', 'yesterday')
                this.getDriverMission()
            } else {
                this.choiceDayClassA = 'choiceday'
                this.choiceDayClassB = 'choiceday'
                this.choiceDayClassC = 'bechoiceday'
                this.$store.dispatch('setChoiseDay', 'tomorrow')
                this.getDriverMission()
            }
        },
        opendetail(item, index) {
            this.clientArray = item.missionclient
            this.carCheck_id = item.carCheck_id
            item.missionclient = _.orderBy(
                item.missionclient,
                ['finishdate'],
                ['desc']
            )
            this.$store.dispatch('setTempArr', item)
            this.mission_id = item._id
            this.carNum = item.missioncar
            if (!item.carCheckFirst) {
                this.showCheckCarBox = true
            } else if (
                item.missionclient.length == this.finishNumber[index] &&
                !item.carCheckFinish
            ) {
                this.showCheckAgainBox = true
            } else {
                this.$router.push('/detailpage')
                this.$store.dispatch('setShowButtom', false)
            }
            this.findCarOilWarning()
        },

        //查找车辆是否报警方法 start
        findCarOilWarning(){
            axios
                .post(config.server + '/dirver/findOilWarning', {
                    carNo: this.carNum
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.isShowOilWarning = true
                        this.warningInfo = {
                            lastOilKelometer:doc.data.lastOilKelometer,
                            kelometer:doc.data.kelometer,
                            oilProperty:doc.data.oilProperty
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        //查找车辆是否报警方法 end

        loadDefault(e) {
            e.currentTarget.src = this.imgDefault
        },

        getDriverMission() {
            this.needDoNum = 0
            this.$store.dispatch('setDoNum', this.needDoNum)
            axios
                .post(config.server + '/client-driver/', {
                    drivername: this.drivername
                })
                .then(doc => {
                    this.allMission = doc.data.doc
                    this.allMission = _.orderBy(this.allMission,['complete'],['asc'])
                    this.lockCount = 0
                    // 计算完成任务数 和 加锁任务
                    let startNum = -1
                    let countNum = 0
                    this.allMission.forEach(elementX => {
                        startNum += 1
                        elementX.missionclient.forEach(elementY => {
                            if (elementY.finishdate) {
                                countNum += 1
                            } else {
                                this.needDoNum += 1
                            }
                        })
                        this.finishNumber[startNum] = countNum
                        countNum = 0

                        if(elementX.complete){
                            this.lockArray.push(false)
                            this.lockCount ++
                        }else{
                            if(elementX.carCheckFirst){
                                this.lockArray.push(false)
                            }else{
                                this.lockArray.push(true)
                                this.lockCount ++
                            }
                        }
                    })
                    this.$store.dispatch('setDoNum', this.needDoNum)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        refresh() {
            let arrow = document.querySelector('#arrow')
            arrow.style.transform = 'rotate(360deg)'
            arrow.style.transition = '0.5s'
            setTimeout(() => {
                arrow.style.transform = 'rotate(0deg)'
                arrow.style.transition = '0.5s'
            }, 300)
            this.getDriverMission()
        }
    }
}
</script>

<style scoped>
.emptyarea-top {
    padding: 30px 0;
}

.emptyarea-bottom {
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

.topusername-right img {
    width: 25px;
}

.card-text {
    text-align: left;
    padding: 5px 20px;
    font-size: 20px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    word-wrap: break-word;
}

.card-text-left {
    flex-basis: 40%;
}

.card-text-right {
    flex-basis: 60%;
    min-width: 160px;
}

.card-camera {
    text-align: right;
    position: absolute;
    top: 150px;
    right: 13px;
}

.allclientnumicon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-assignment_late-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-assignment_late-24px.svg);
    width: 24px;
    height: 24px;
}

.assignmenticon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-assignment_turned_in-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-assignment_turned_in-24px.svg);
    width: 24px;
    height: 24px;
}

.date_rangeicon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-date_range-24px24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-date_range-24px24px.svg);
    width: 24px;
    height: 24px;
}

.choiceday {
    font-size: 16px;
    /* border:1px solid rgba(0,0,0,0.2); */
    width: 80px;
    height: 25px;
    line-height: 24px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.bechoiceday {
    font-size: 16px;
    background-color: #d74342;
    width: 80px;
    height: 25px;
    line-height: 24px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
}

.checkcar-back {
    position: fixed;
    z-index: 23;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.previewclient-back {
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.checkcar-front {
    position: fixed;
    z-index: 24;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.previewclient-front {
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

.checkcar-body {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.previewclient-box{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    width: 80%;
}

.checkcar-body-top {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.checkcar-body-center {
    padding: 8px;
}

.checkcar-body-center-title {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    font-size: 16px;
    height: 30px;
    line-height: 30px;
}

.checkcar-body-center-item {
    display: flex;
    display: -webkit-flex;
    height: 40px;
    line-height: 40px;
}

.checkcar-body-center-item-left {
    text-align: right;
    line-height: 34px;
    padding-right: 4px;
    width: 80px;
}

.checkcar-body-center-item-middle {
    padding-left: 4px;
    width: 30px;
}

.checkcar-body-center-item-right {
    padding-left: 4px;
    width: 40px;
    line-height: 34px;
}

.errinfo {
    position: fixed;
    z-index: 19;
    top: 8px;
    background-color: rgba(255, 255, 0, 0.7);
    width: 100%;
    z-index: 99;
}

.errinfo span {
    font-size: 16px;
    line-height: 32px;
}

.completediv{
    position: absolute;
    top: 5px;
    right: 5px;
}

.completediv img{
    width: 150px;
    transform:rotate(14deg);
    -ms-transform:rotate(14deg); 	/* IE 9 */
    -moz-transform:rotate(14deg); 	/* Firefox */
    -webkit-transform:rotate(14deg); /* Safari 和 Chrome */
    -o-transform:rotate(14deg); 
}

.checkcar-camera{
    background: var(--md-theme-default-icon-on-background, rgba(0, 0, 0, 0.54));
    background-size: 48px 48px;
    mask-image: url(../../public/icons/baseline-camera_alt-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-camera_alt-24px.svg);
    width: 48px;
    height: 48px;
}

.checkcar-body-center-camera{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    background: #ebebe4;
    border:2px dashed #696969
}

.checkcar-photo{
    height: 150px;
}

.previewclient-box-body{
    margin: 0 10px;
    margin-top: 10px;
}

.previewclient-box-body-title{
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #e0e0e0;
    font-size: 16px;
}

.previewclient-box-body-title-left{
    width: 40px;
}

.previewclient-box-body-title-right{
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap
}

.previewclient-box-body-body{
    height: 377px;
    overflow-y:scroll;
}

.previewclient-box-body-body-left{
    width: 40px;
    height: 30px;
    line-height: 30px;
}

.previewclient-box-body-body-right{
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    height: 30px;
    line-height: 30px;
}

.carwashbox{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.carwashbox-title{
    font-size:18px;
    padding: 10px 0px 10px 0px;
    border-bottom: 1px solid rgb(238, 238, 238);
    text-align:center;
}

.carwashbox-body{
    border-radius: 10px;
    overflow: hidden;
    width: 240px;
    margin: 10px auto;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.carwashbox-footer {
    display: flex;
    display: -webkit-flex;
    padding-bottom: 10px;
}

.carwashbox-footer-button {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 100px;
    margin: 0 auto;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    height: 30px;
    line-height: 30px;
    transition: 0.2s;
}

.carwashbox-footer-button:active {
    box-shadow: none;
    transition: 0.2s;
}

.CarWashComfirmBox-body{
    font-size:16px;
    color: rgb(106, 106, 106);
    margin-top: 10px;
}

.CarWashComfirmBox-body-title{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e0e0e0;
    width: 80%;
    margin: 0 auto;
    color:#6a6a6a;
}

.CarWashComfirmBox-body-box{
    height: 150px;
    overflow: auto;
    width: 80%;
    margin: 10px auto;
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.CarWashComfirmBox-body-textarea{
    height: 150px;
    overflow: auto;
    width: 80%;
    margin: 10px auto;
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.CarWashComfirmBox-body-textarea textarea{
    width: 100%;
    height: 100%;
    font-size: 16px;
    border: none;
    outline: none;
}

.CarWashComfirmBox-body-box-item{
    height: 30px;
    line-height: 30px;
}

.CarWashComfirmBox-footer{
    display: flex;
    display: -webkit-flex;
    margin-top: 10px;
    margin-bottom: 10px;
}

.locklayer{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #e0e0e080;
    z-index: 24;
    display: flex;
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

.oilwarning_dialog_back{
    position: fixed;
    z-index: 104;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.oilwarning_dialog_front{
    position: fixed;
    z-index: 105;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.oilwarning_dialog_front_box{
    background-color: #f7f7f7;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    overflow: hidden;
}

.oilwarning_dialog_front_box_title{
    background-color: #d74342;
    height: 30px;
    line-height: 30px;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 16px;
}

.oilwarning_dialog_front_box_body{
    display: flex;
    display: -webkit-flex;
    margin: 8px 12px;
    padding: 8px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
}

.notification_icon{
    /* background: var(--md-theme-default-icon-on-background, rgba(0, 0, 0, 0.54)); */
    background-color: #ff9800;
    background-size: 48px 48px;
    mask-image: url(../../public/icons/baseline-report_problem-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-report_problem-24px.svg);
    width: 48px;
    height: 48px;
    -webkit-mask-size: 48px 48px;
    mask-size: 48px 48px;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
}

.oilwarning_dialog_front_box_body_left{
    display: flex;
    justify-content: center;
    align-items: center;
}

.oilwarning_dialog_front_box_body_right_item{
    display: flex;
    display: -webkit-flex;
    height: 24px;
    line-height: 24px;
}

.oilwarning_dialog_front_box_body_right_item_name{
    width: 100px;
    text-align: right;
}

.oilwarning_dialog_front_box_body_right_item_value{
    width: 80px;
    text-align: left;
    margin-left: 8px;
}

.oilwarning_dialog_front_box_bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-bottom: 8px;
}

.oilwarning_botton{
    height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 100px;
    line-height: 30px;
    border-radius: 10px;
}
</style>
