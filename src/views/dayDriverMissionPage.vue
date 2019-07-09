<template>
    <div id="daydrivermissionpage">
        <div class="page-title">
            <div class="page-title-left"></div>
            <div class="page-title-center">
                <span v-if="lang === 'ch'">白班任务</span>
                <span v-else>Day Shift Mission</span>
            </div>
            <div class="page-title-right" @click="refresh()">
                <img src="../../public/icons/refresh.png" id="arrow">
            </div>
        </div>

        <div style="height:40px">
            <!-- 顶部占位符 -->
        </div>
        <div v-if="missionArray.length === 0"
             style="width: 50%;margin: 0 auto;padding-top: 17.5vh;">
            <img src="../../public/img/ebuyLogo.png"
                 alt="logo">
            <br>
            <span>~{{language.homePage.whenEmpty}}~</span>
        </div>
        <div v-else
             style="margin-top:10px">
            <div class="search-body-center-item">
                <div class="missioncard" style="position:relative" v-for="(item,index) in missionArray" :key="index" @click="startMission(item)">
                    <div class="missioncard-topline"></div>
                    <div class="missioncard-title">
                        <span v-if="lang === 'ch'">白班任务</span>
                        <span v-else>Day shif mission</span>
                    </div>
                    <div class="missioncard-body">
                        <div class="missioncard-body-item">
                            <div class="missioncard-body-item-left">
                                <span v-if="lang === 'ch'">司机姓名</span>
                                <span v-else>Driver Name</span>
                            </div>
                            <div class="missioncard-body-item-right">
                                <span>{{item.driverName}}</span>
                            </div>
                        </div>
                        <div class="missioncard-body-item">
                            <div class="missioncard-body-item-left">
                                <span v-if="lang === 'ch'">使用车辆</span>
                                <span v-else>Car plate</span>
                            </div>
                            <div class="missioncard-body-item-right">
                                <span v-if="item.carPlate === null"
                                      v-show="lang === 'ch'">未选择</span>
                                <span v-if="item.carPlate === null"
                                      v-show="lang === 'en'">Not set</span>
                                <span>{{item.carPlate}}</span>
                            </div>
                        </div>
                        <div class="missioncard-body-item">
                            <div class="missioncard-body-item-left">
                                <span v-if="lang === 'ch'">出车时间</span>
                                <span v-else>Go time</span>
                            </div>
                            <div class="missioncard-body-item-right">
                                <span v-if="item.goTime === null"
                                      v-show="lang === 'ch'">未配置</span>
                                <span v-if="item.goTime === null"
                                      v-show="lang === 'en'">Not set</span>
                                <span v-else>{{item.goTime | timefilter}}</span>
                            </div>
                        </div>
                        <div class="missioncard-body-item">
                            <div class="missioncard-body-item-left">
                                <span v-if="lang === 'ch'">收车时间</span>
                                <span v-else>Back time</span>
                            </div>
                            <div class="missioncard-body-item-right">
                                <span v-if="item.backTime === null"
                                      v-show="lang === 'ch'">未配置</span>
                                <span v-if="item.backTime === null"
                                      v-show="lang === 'en'">Not set</span>
                                <span v-else>{{item.backTime | timefilter}}</span>
                            </div>
                        </div>
                        <div class="missioncard-body-item">
                            <div class="missioncard-body-item-left">
                                <span v-if="lang === 'ch'">任务日期</span>
                                <span v-else>mission Date</span>
                            </div>
                            <div class="missioncard-body-item-right">
                                <span>{{item.orderDate | dateFilter}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.backTime && item.missionFinish"
                         style="position: absolute;transform:rotate(-30deg);top:30px">
                        <div v-if="lang === 'ch'">
                            <img src="../../public/img/missionCompleteCH.png"
                                 style="height:100px">
                        </div>
                        <div v-else>
                            <img src="../../public/img/missionComplete.png"
                                 style="height:100px">
                        </div>
                    </div>
                    <div class="missioncard-bottom">
                        <span v-if="lang === 'ch'">>>> 任务详情 >>></span>
                        <span v-else>>>> Mission detail >>></span>
                    </div>
                </div>
            </div>
        </div>

        <div style="height:70px">
            <!-- 底部占位符 -->
        </div>

        <!-- check car box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showCheckCarBox"
                 class="checkcar-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showCheckCarBox"
                 class="checkcar-front"
                 @click.self.prevent="showCheckCarBox = false"
                 @touchmove.prevent>
                <div class="checkcar-body">
                    <div class="checkcar-body-top">
                        <span>{{language.homePage.checkCarTitle}}</span>
                    </div>
                    <div class="checkcar-body-center">
                        <div class="checkcar-body-center-title">
                            <span>{{carNum}}</span>
                        </div>
                        <div v-if="checkPage"
                             class="checkcar-body-center-page">
                            <div class="checkcar-body-center-item">
                                <label for="checkwiper"
                                       class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.wiper}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkwiper"
                                                 v-model="wiper"
                                                 style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="wiper"
                                          style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else
                                          style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <label for="checkheadlight"
                                       class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.headlight}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkheadlight"
                                                 v-model="headlight"
                                                 style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="headlight"
                                          style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else
                                          style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <label for="checkmirror"
                                       class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.mirror}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkmirror"
                                                 v-model="mirror"
                                                 style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="mirror"
                                          style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else
                                          style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <label for="checktyre"
                                       class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.tyre}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checktyre"
                                                 v-model="tyre"
                                                 style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="tyre"
                                          style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else
                                          style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <label for="checkbackup"
                                       class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.backup}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkbackup"
                                                 v-model="backup"
                                                 style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="backup"
                                          style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else
                                          style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <label for="checkbrake"
                                       class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.brake}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkbrake"
                                                 v-model="brake"
                                                 style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="brake"
                                          style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else
                                          style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <label for="checkbrake"
                                       class="checkcar-body-center-item-left">
                                    <span>油卡</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkbrake"
                                                 v-model="petrolCard"
                                                 style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="petrolCard"
                                          style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else
                                          style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div class="checkcar-body-center-item">
                                <div class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.box}}</span>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <input type="number"
                                           style="width:160%;margin-left:11px;"
                                           v-model="boxNum">
                                </div>
                            </div>
                        </div>
                        <div v-else
                             class="checkcar-body-center-page">
                            <div class="checkcar-body-center-item">
                                <label for="checkbrake"
                                       class="checkcar-body-center-item-left">
                                    <span>{{language.homePage.otherOk}}</span>
                                </label>
                                <div class="checkcar-body-center-item-middle">
                                    <md-checkbox id="checkbrake"
                                                 v-model="otherError"
                                                 style="margin:0"></md-checkbox>
                                </div>
                                <div class="checkcar-body-center-item-right">
                                    <span v-if="otherError"
                                          style="color:green">{{language.homePage.ok}}</span>
                                    <span v-else
                                          style="color:#c3c304">{{language.homePage.error}}</span>
                                </div>
                            </div>
                            <div>
                                <textarea name="othererror"
                                          id="othererror"
                                          rows="5"
                                          style="width:100%"
                                          :disabled="otherError"
                                          :placeholder="language.homePage.description"
                                          v-model="otherErrorText"></textarea>
                            </div>

                            <!-- take photo area start -->
                            <div class="checkcar-body-center-camera"
                                 @click="uploadFile">
                                <div v-if="!updateImagePreview"
                                     class="checkcar-camera"></div>
                                <img v-else
                                     :src="updateImagePreview"
                                     class="checkcar-photo"
                                     alt="newimg">
                            </div>
                            <input type="file"
                                   style="display:none"
                                   id="upload_file"
                                   @change="fileChange($event)"
                                   accept="image/*">
                            <!-- take photo area end -->

                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised"
                                   style="margin:0;width:100%;box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);"
                                   @click="changeOtherCheckPage">
                            {{language.homePage.other}}
                        </md-button>
                    </div>
                    <div>
                        <md-button class="md-raised"
                                   style="margin:0;width:100%;box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);"
                                   @click="confirmCheckCar">
                            {{language.homePage.confirmCheck}}
                        </md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- check car box end -->

        <!-- check again box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showCheckAgainBox"
                 class="checkcar-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showCheckAgainBox"
                 class="checkcar-front"
                 @click.self.prevent="showCheckAgainBox = false"
                 @touchmove.prevent>
                <div class="checkcar-body">
                    <div class="checkcar-body-top">
                        <span>{{language.homePage.checkCarTitle}}</span>
                    </div>
                    <div class="checkcar-body-center">
                        <div class="checkcar-body-center-title">
                            <span>{{carNum}}</span>
                        </div>
                        <div class="checkcar-body-center-item">
                            <label for="checkwiper"
                                   class="checkcar-body-center-item-left">
                                <span>{{language.homePage.clean}}</span>
                            </label>
                            <div class="checkcar-body-center-item-middle">
                                <md-checkbox id="checkwiper"
                                             v-model="clean"
                                             style="margin:0"></md-checkbox>
                            </div>
                            <div class="checkcar-body-center-item-right">
                                <span v-if="clean"
                                      style="color:green">{{language.homePage.ok}}</span>
                                <span v-else
                                      style="color:#c3c304">{{language.homePage.error}}</span>
                            </div>
                        </div>
                        <div class="checkcar-body-center-item">
                            <div class="checkcar-body-center-item-left">
                                <span>{{language.homePage.box}}</span>
                            </div>
                            <div class="checkcar-body-center-item-right">
                                <input type="number"
                                       style="width:160%;margin-left:10px;"
                                       v-model="boxNumAgain">
                            </div>
                        </div>
                        <div class="checkcar-body-center-item">
                            <label for="checkbrake"
                                   class="checkcar-body-center-item-left">
                                <span>{{language.homePage.otherOk}}</span>
                            </label>
                            <div class="checkcar-body-center-item-middle">
                                <md-checkbox id="checkbrake"
                                             v-model="otherErrorAgain"
                                             style="margin:0"></md-checkbox>
                            </div>
                            <div class="checkcar-body-center-item-right">
                                <span v-if="otherErrorAgain"
                                      style="color:green">{{language.homePage.ok}}</span>
                                <span v-else
                                      style="color:#c3c304">{{language.homePage.error}}</span>
                            </div>
                        </div>
                        <div>
                            <textarea name="othererror"
                                      id="othererror"
                                      rows="5"
                                      style="width:100%;border-radius:10px"
                                      :disabled="otherErrorAgain"
                                      :placeholder="language.homePage.description"
                                      v-model="otherErrorTextAgain"></textarea>
                        </div>
                    </div>
                    <div>
                        <md-button class="md-raised"
                                   style="margin:0;width:100%;box-shadow: 0 -3px 1px -2px rgba(0,0,0,.2), 0 -2px 2px 0 rgba(0,0,0,.14), 0 -1px 5px 0 rgba(0,0,0,.12);"
                                   @click="confirmCheckAgain()">
                            {{language.homePage.confirmCheck}}
                        </md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- check again box end -->

        <!-- choise car box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showChoiseCarBox"
                 class="checkcar-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showChoiseCarBox"
                 class="checkcar-front"
                 @click.self.prevent="showChoiseCarBox = false">
                <div class="checkcar-body">
                    <div class="checkcar-body-top">
                        <span v-if="lang === 'ch'">车辆选择</span>
                        <span v-else>Choise car</span>
                    </div>
                    <div class="findcar-body">
                        <div class="findcar-body-title">
                            <span>{{choiseCarNum}}</span>
                        </div>
                        <div class="findcar-body-center">
                            <div class="findcar-body-center-item"
                                 v-for="(item,index) in carInfoArray"
                                 :key="index"
                                 @click="choiseCarMethod(item)">
                                <span>{{item.carid}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 8px;">
                        <div class="removebox-body-center-button" style="width: 80px;" @click="showTripsClientMethod()">
                            <span v-if="lang === 'ch'">查看客户</span>
                            <span v-else>Show Client</span>
                        </div>
                    </div>
                    <div class="findcar-bottom">
                        <div class="removebox-body-center-button"
                             style="width: 80px;margin-right:10px"
                             @click="showChoiseCarBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="removebox-body-center-button"
                             style="width: 80px;"
                             @click="confirmChoiseCar()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- choise car box end -->

        <!-- mission detail page start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInRight faster"
                    leave-active-class="animated slideOutRight faster">
            <div v-if="showMissionDetail"
                 class="missiondetail">
                <div class="missiondetail-title">
                    <div style="flex-basis:15%" @click="trunBackMethod()">
                        <div>
                            <img src="../../public/icons/left.png" alt="exit" style="width: 20px;">
                        </div>
                    </div>
                    <div style="flex-basis:70%">
                        <span v-if="lang === 'ch'">任务详情</span>
                        <span v-else>Mission detail</span>
                    </div>
                    <div style="flex-basis:15%"></div>
                </div>
                <div style="height:40px"></div>
                <div class="missiondetail-body">
                    <div v-for="(item,index) in detailDate" :key="index" class="missiondetail-body-item">
                        <div class="missiondetail-body-item-title">
                            <span>{{item.clientName}}</span>
                            <div v-if="item.image" class="missiondetail-body-item-title-img" @click="openBigImgMethod(item.image)">
                                <img :src="item.image | imgurl">
                            </div>
                        </div>
                        <div class="missiondetail-body-item-body">
                            <div class="missiondetail-body-item-body-left">
                                <span>任务类型</span>
                            </div>
                            <div class="missiondetail-body-item-body-right">
                                <span v-if="item.isIncreaseOrder === 'order'">订单</span>
                                <span v-else-if="item.isIncreaseOrder === 'true'">加单</span>
                                <span v-else-if="item.isIncreaseOrder === 'false'">补单</span>
                                <span v-else-if="item.isIncreaseOrder === 'bun'">面食</span>
                                <span v-else-if="item.isIncreaseOrder === 'return'">退单</span>
                                <span v-else-if="item.isIncreaseOrder === 'change'">换货</span>
                                <span v-else-if="item.isIncreaseOrder === 'delivery'">运输</span>
                                <span v-else-if="item.isIncreaseOrder === 'other'">其他</span>
                                <span v-else style="color: #d74342">未选择</span>
                            </div>
                        </div>
                        <div class="missiondetail-body-item-body">
                            <div class="missiondetail-body-item-body-left">
                                <span>电话号码</span>
                            </div>
                            <div class="missiondetail-body-item-body-right">
                                <span>{{item.clientPhone}}</span>
                            </div>
                        </div>
                        <div class="missiondetail-body-item-body">
                            <div class="missiondetail-body-item-body-left">
                                <span>邮编号码</span>
                            </div>
                            <div class="missiondetail-body-item-body-right">
                                <span>{{item.clientPostcode}}</span>
                            </div>
                        </div>
                        <div class="missiondetail-body-item-body" style="padding-bottom: 12px;height: unset;position: relative">
                            <div class="missiondetail-body-item-body-left">
                                <span>客户地址</span>
                            </div>
                            <div class="missiondetail-body-item-body-right" style="line-height:20px;padding-top:6px">
                                <span>{{item.clientAddress}}</span>
                            </div>
                            <div class="icon_dollar_frame" v-if="item.receiptMission && !item.receiptFinishDate" @click="openReceiptBoxMethod(item)">
                                <div class="icon_dollar"></div>
                            </div>
                        </div>
                        <div v-if="item.finisDate" style="position: absolute;transform:rotate(-30deg);top:30px">
                            <div v-if="lang === 'ch'">
                                <img src="../../public/img/missionCompleteCH.png" style="height:100px">
                            </div>
                            <div v-else>
                                <img src="../../public/img/missionComplete.png" style="height:100px">
                            </div>
                        </div>
                        <div v-else>
                            <div class="ddmision_detail_bottom">
                                <div class="removebox-body-center-button"
                                     style="width: 80px;"
                                     @click="finishClientMethod(item)">
                                    <span v-if="lang === 'ch'">完成</span>
                                    <span v-else>confirm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height:60px"></div>
            </div>
        </transition>
        <!-- mission detail page end -->

        <!-- confirm and remove mission box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showCRbox"
                 class="checkcar-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showCRbox" class="checkcar-front"
                 @click.self.prevent="showCRbox = false">
                <div class="checkcar-body">
                    <div class="checkcar-body-top">
                        <div>
                            <span v-if="lang === 'ch'">确认完成</span>
                            <span v-else>Confirm finish</span>
                        </div>
                    </div>
                    <div class="findcar-body" style="border: 1px solid #e6e6e6;">
                        <div style="font-size:16px;height:30px;line-height:30px;overflow: hidden;">
                            <span>{{shippingClient.clientName}}</span>
                        </div>
                        <div class="daydriver_photoarea">
                            <div class="photoarea" @click="uploadImgFile()">
                                <md-icon class="md-size-3x" style="padding-top:28px" v-if="!updateImagePreview">add_a_photo</md-icon>
                                <img :src="updateImagePreview" v-else>
                            </div>
                        </div>
                    </div>
                    <div class="findcar-bottom">
                        <div class="removebox-body-center-button"
                             style="width: 80px;margin-right:10px"
                             @click="showCRbox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div>
                            <div class="removebox-body-center-button"
                                 style="width: 80px;"
                                 @click="confirmFinishClientMethod()">
                                <span v-if="lang === 'ch'">确定</span>
                                <span v-else>confirm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <input type="file" style="display:none" id="daydriver_upload_file" @change="fileChange($event)" accept="image/*">
        <!-- confirm and remove mission box end -->

        <!-- show client array before start mission -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowPreview" class="checkcar-back" style="z-index: 24;"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowPreview" class="checkcar-front" @click.self.prevent="isShowPreview = false">
                <div class="checkcar-body" style="width:unset">
                    <div class="checkcar-body-top">
                        <span v-if="lang === 'ch'">客户预览</span>
                    </div>
                    <div class="ddm_preview_center">
                        <div class="ddm_preview_item" v-for="(item,index) in tempClientArray" :key="index">
                            <div class="ddm_preview_item_left">
                                <span>{{index + 1}}</span>
                            </div>
                            <div class="ddm_preview_item_center">
                                <span>{{item.clientName}}</span>
                            </div>
                            <div class="ddm_preview_item_right">
                                <span v-if="item.isIncreaseOrder === 'order'">订单</span>
                                <span v-else-if="item.isIncreaseOrder === 'true'">加单</span>
                                <span v-else-if="item.isIncreaseOrder === 'false'">补单</span>
                                <span v-else-if="item.isIncreaseOrder === 'bun'">面食</span>
                                <span v-else-if="item.isIncreaseOrder === 'return'">退单</span>
                                <span v-else-if="item.isIncreaseOrder === 'change'">换货</span>
                                <span v-else-if="item.isIncreaseOrder === 'delivery'">运输</span>
                                <span v-else-if="item.isIncreaseOrder === 'other'">其他</span>
                                <span v-else style="color: #d74342">未选择</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="removebox-body-center-button" style="width: 80px;margin-bottom:8px;" @click="isShowPreview = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- show client array before start mission -->

        <!-- show client big img start -->
        <transition name="ddm-bigimg-transition-back" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowBigImg" class="ddm_big_back"></div>
        </transition>
        <transition name="ddm-bigimg-transition-front" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowBigImg" class="ddm_big_front" @click="isShowBigImg = false">
                <div>
                    <img :src="tempImg | imgurl">
                </div>
            </div>
        </transition>
        <!-- show client big img end -->

        <!-- show receipt box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowReceiptBox" class="checkcar-back" style="z-index: 24;"></div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowReceiptBox" class="checkcar-front" @click.self.prevent="isShowReceiptBox = false">
                <div class="ddm_receitp_box">
                    <div class="ddm_receitp_box_title">
                        <span>收款信息</span>
                    </div>
                    <div class="ddm_receitp_box_body">
                        <div class="ddm_receitp_box_body_top">
                            <span>{{tempReceiptInfo.clientName}}</span>
                        </div>
                        <div class="ddm_receitp_box_body_bottom">
                            <div v-if="tempReceiptInfo && tempReceiptInfo.receiptRemark" class="ddm_receitp_box_body_bottom_text">
                                <span>{{tempReceiptInfo.receiptRemark}}</span>
                            </div>
                            <div v-if="tempReceiptInfo && tempReceiptInfo.receiptImage" class="ddm_receitp_box_body_bottom_img" style="margin-top: 8px;" @click="isShowReceiptBigImgMethod(tempReceiptInfo.receiptImage)">
                                <img :src="'https://s3-ap-southeast-1.amazonaws.com/easybuy-products/' + tempReceiptInfo.receiptImage">
                            </div>
                        </div>
                    </div>
                    <div class="ddm_receitp_box_bottom">
                        <div class="removebox-body-center-button" @click="noReceiptMethod()">
                            <span>未收</span>
                        </div>
                        <div class="removebox-body-center-button" style="margin-left: 8px" @click="submitReceiptMethod()">
                            <span>已收</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </transition>
        <!-- show receipt box end -->

        <!-- show receipt big img start -->
        <transition name="ddm-bigimg-transition-back" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="isShowReceiptBigImg" class="ddm_big_back"></div>
        </transition>
        <transition name="ddm-bigimg-transition-front" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <div v-if="isShowReceiptBigImg" class="ddm_big_front" @click="isShowReceiptBigImg = false">
                <div>
                    <img :src="'https://s3-ap-southeast-1.amazonaws.com/easybuy-products/' + tempReceiptImg">
                </div>
            </div>
        </transition>
        <!-- show receipt big img end -->

        <!-- loading animation start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowLoadingAnimation" class="tripcount_loading_back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowLoadingAnimation"
                 class="tripcount_loading_front">
                <div class="tripcount_loading_box">
                    <div class="spinner">
                        <div class="rect1"></div>
                        <div class="rect2"></div>
                        <div class="rect3"></div>
                        <div class="rect4"></div>
                        <div class="rect5"></div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- loading animation end -->

        <!-- tips box start -->
        <tipsBox :showColor="tipsShowColor" :msg="tipsInfo" :isOpenTipBox="isShowTipsBox"></tipsBox>
        <!-- tips box end -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";
import async from "async";
import tipsBox from "../components/tipsBox"

export default {
    components:{
        tipsBox
    },
    
    mounted() {
        this.driverName = localStorage.getItem("drivername");
        this.getDayShiftDriverMission();
    },

    computed: {
        language() {
            return this.$store.getters.getLanguage;
        },

        lang() {
            return this.$store.state.lang;
        }
    },

    data() {
        return {
            _id: null,
            carCheck_id: null,
            driverName: null,
            missionArray: [],
            showCheckCarBox: false,
            carNum: null,
            boxNum: null,
            checkPage: true,
            otherError: true,
            otherErrorText: null,
            updateImagePreview: null,
            updateImage:null,
            wiper: true,
            headlight: true,
            mirror: true,
            tyre: true,
            backup: true,
            brake: true,
            petrolCard: true,
            showChoiseCarBox: false,
            carInfoArray: null,
            choiseCarNum: null,
            showMissionDetail: false,
            detailDate: null,
            showCRbox: false,
            shippingClient: null,
            showCheckAgainBox: false,
            clean: true,
            otherErrorAgain: true,
            boxNumAgain: null,
            otherErrorTextAgain: null,
            tipsShowColor:null,
            tipsInfo:null,
            isShowTipsBox:null,
            isShowBigImg: false,
            tempImg: null,
            tempClientArray: [],
            isShowPreview: false,
            isShowLoadingAnimation: false,
            isShowReceiptBox: false,
            tempReceiptInfo: null,
            isShowReceiptBigImg: false,
            tempReceiptImg: null
        };
    },

    methods: {
        noReceiptMethod(){
            axios
            .post(config.customerServiceAddress + '/driverTasks/feedback/' + this.tempReceiptInfo.receipt_id, {
                feedback: this.drivername + ',未取到.'
            })
            .then(doc => {
                if(doc.data.status === 0){
                    this.isShowReceiptBox = false
                }else{
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '更新任务状态出错'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false
                    }, 2000);
                }
            })
            .catch(err => {
                console.log(err)
            })
        },

        isShowReceiptBigImgMethod(url){
            this.tempReceiptImg = url
            this.isShowReceiptBigImg = true
        },

        submitReceiptMethod(){
            axios
            .post(config.customerServiceAddress + '/driverTasks/update/' + this.tempReceiptInfo.receipt_id, {
                finishDate: new Date(),
                driver: this.drivername
            })
            .then(doc => {
                if(doc.data.status === 0){
                    axios
                    .post(config.server + '/dsdriver/finishReceipt',{
                        tripsArray_id: this.tempReceiptInfo._id,
                        receiptFinishDate: new Date(),
                        mission_id: this._id
                    })
                    .then(doc => {
                        if(doc.data.code === 0){
                            this.getDayShiftDriverMission();
                            this.isShowReceiptBox = false
                            this.tipsShowColor = 'green'
                            this.tipsInfo = '提交成功'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }else{
                            this.tipsShowColor = 'yellow'
                            this.tipsInfo = '更新任务状态出错'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }else{
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '提交到客服后台失败'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false
                    }, 2000);
                }
            })
            .catch(err => {
                console.log(err)
            })
        },

        openReceiptBoxMethod(info){
            console.log(info)
            this.tempReceiptInfo = info
            this.isShowReceiptBox = true
        },

        showTripsClientMethod(){
            this.isShowPreview =  true
        },
        
        openBigImgMethod(img){
            this.tempImg = img
            this.isShowBigImg = true
        },

        refresh() {
            let arrow = document.querySelector('#arrow')
            arrow.style.transform = 'rotate(360deg)'
            arrow.style.transition = '0.5s'
            setTimeout(() => {
                arrow.style.transform = 'rotate(0deg)'
                arrow.style.transition = '0.5s'
            }, 300)
            this.getDayShiftDriverMission();
        },

        uploadImgFile() {
            document.getElementById("daydriver_upload_file").click();
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

        confirmCheckAgain() {
            if (!this.boxNumAgain) {
                this.tipsShowColor = 'yellow'
                this.tipsInfo = this.language.homePage.boxNumErr;
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            } else {
                axios
                    .post(config.server + "/checkcar/editByday", {
                        carCheck_id: this.carCheck_id,
                        boxNumAgain: this.boxNumAgain,
                        mission_id: this._id,
                        clean: this.clean,
                        finishDate: new Date().toISOString()
                    })
                    .then(doc => {
                        if (doc.data.code === 0) {
                            this.showCheckAgainBox = false;
                            this.getDayShiftDriverMission();
                        } else {
                            console.log(doc);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });

                axios
                    .post(config.server + "/client-driver/complete", {
                        mission_id: this.$store.state.tempArr._id
                    })
                    .then(item => {
                        console.log(item);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                if (!this.otherErrorAgain) {
                    let errData = {};
                    this.$set(
                        errData,
                        "car_id",
                        this.$store.state.tempArr.Car_id
                    ); //车辆_id
                    this.$set(errData, "driver", this.drivername); //司机
                    this.$set(errData, "other", 1);
                    this.$set(errData, "note", this.otherErrorTextAgain);
                    axios
                        .post(config.server + "/fixcar/", errData)
                        .then(doc => {
                            if (doc.data.code === 0) {
                                console.log("货后报损成功");
                            } else {
                                console.log(doc);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        },

        changeMissionState() {
            axios
                .post(config.server + "/dsdriver/finishMission", {
                    mission_id: this._id
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.getDayShiftDriverMission()
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        findMissionByID() {
            axios
            .post(config.server + "/dsdriver/findById", {
                mission_id: this._id
            })
            .then(doc => {
                if (doc.data.code === 0) {
                    this.detailDate = doc.data.doc.clientArray;
                    //
                    let count = 0;
                    let notFinishMissionFlag = false;
                    async.whilst(
                        function() {
                            return count < 1;
                        },
                        function(callback) {
                            doc.data.doc.clientArray.some(element => {
                                count++;
                                if (!element.finisDate) {
                                    notFinishMissionFlag = true;
                                }
                                return notFinishMissionFlag;
                            });
                            callback(null, notFinishMissionFlag);
                        },
                        (err, n) => {
                            if (!n) {
                                this.changeMissionState();
                            }
                        }
                    );
                    //
                } else {
                    console.log(doc);
                }
            })
            .catch(err => {
                console.log(err);
            });
        },

        confirmFinishClientMethod() {
            this.isShowLoadingAnimation = true
            if(this.updateImagePreview){
                let payload = new FormData();
                payload.append("mission_id", this._id);
                payload.append("clientName", this.shippingClient.clientName);
                let tempDate = new Date().toISOString();
                payload.append("finisDate", tempDate);
                payload.append("pool_id",this.shippingClient.pool_id)
                let maxSize = 200 * 1024; //200KB
                lrz(this.updateImage, {
                    quality: 0.5
                })
                .then(res => {
                    if (this.updateImage.size > maxSize) {
                            this.updateImage = res.file;
                    }
                    payload.append("image", this.updateImage);
                    axios
                        .post(config.server + "/dsdriver/finish",payload)
                        .then(doc => {
                            this.isShowLoadingAnimation = false
                            if (doc.data.code === 0) {
                                this.findMissionByID();
                                this.showCRbox = false;
                                if (this.lang === "ch") {
                                    this.tipsInfo = "任务提交成功";
                                } else {
                                    this.tipsInfo = "Submit mission success";
                                }
                                this.tipsShowColor = 'green'
                                this.isShowTipsBox = true
                                setTimeout(() => {
                                    this.isShowTipsBox = false
                                }, 2000);
                            } else {
                                if (this.lang === "ch") {
                                    this.tipsInfo = "任务提交失败";
                                } else {
                                    this.tipsInfo = "submit mission fail";
                                }
                                this.tipsShowColor = 'yellow'
                                this.isShowTipsBox = true
                                setTimeout(() => {
                                    this.isShowTipsBox = false
                                }, 2000);
                            }
                        })
                        .catch(err => {
                            this.isShowLoadingAnimation = false
                            console.log(err);
                        });

                })
                .catch(err => {
                    this.isShowLoadingAnimation = false
                    console.log(err)
                    this.tipsShowColor = 'yellow'
                    this.tipsInfo = '压缩图片时发生错误'
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false
                    }, 3000);
                })
            }else{
                let payload = new FormData();
                payload.append("mission_id", this._id);
                payload.append("clientName", this.shippingClient.clientName);
                let tempDate = new Date().toISOString();
                payload.append("finisDate", tempDate);
                payload.append("pool_id",this.shippingClient.pool_id)
                axios
                    .post(config.server + "/dsdriver/finish",payload)
                    .then(doc => {
                        this.isShowLoadingAnimation = false
                        if (doc.data.code === 0) {
                            this.findMissionByID();
                            this.showCRbox = false;
                            if (this.lang === "ch") {
                                this.tipsInfo = "任务提交成功";
                            } else {
                                this.tipsInfo = "Submit mission success";
                            }
                            this.tipsShowColor = 'green'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        } else {
                            if (this.lang === "ch") {
                                this.tipsInfo = "任务提交失败";
                            } else {
                                this.tipsInfo = "submit mission fail";
                            }
                            this.tipsShowColor = 'yellow'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        this.isShowLoadingAnimation = false
                        console.log(err);
                    });
            }
        },

        finishClientMethod(clientInfo) {
            this.updateImagePreview = null
            this.shippingClient = clientInfo;
            this.showCRbox = true;
        },

        trunBackMethod() {
            this.showMissionDetail = false;
        },

        confirmChoiseCar() {
            if (this.choiseCarNum) {
                let tempDate = new Date().toISOString();
                axios
                    .post(config.server + "/dsdriver/car", {
                        _id: this._id,
                        Car_id: this.Car_id,
                        carPlate: this.choiseCarNum,
                        goTime: tempDate
                    })
                    .then(doc => {
                        if (doc.data.code === 0) {
                            this.getDayShiftDriverMission();
                            this.showChoiseCarBox = false;
                            this.showCheckCarBox = true;
                        } else {
                            if (this.lang === "ch") {
                                this.tipsInfo = "更新车辆成功";
                            } else {
                                this.tipsInfo = "Update car success";
                            }
                            this.tipsShowColor = 'green'
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                if (this.lang === "ch") {
                    this.tipsInfo = "请选择车辆";
                } else {
                    this.tipsInfo = "Please choise car";
                }
                this.tipsShowColor = 'yellow'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }
        },

        choiseCarMethod(carInfo) {
            this.choiseCarNum = carInfo.carid;
            this.Car_id = carInfo._id;
        },

        findAllCarPlate() {
            axios
                .get(config.server + "/car/allplate")
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.carInfoArray = doc.data.doc;
                    } else {
                        if (this.lang === "ch") {
                            this.tipsInfo = "查找车辆出错";
                        } else {
                            this.tipsInfo = "Catch an error while find car info";
                        }
                        this.tipsShowColor = 'yellow'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        uploadFile() {
            document.getElementById("upload_file").click();
        },

        confirmCheckCar() {
            if (!this.boxNum) {
                this.tipsInfo = this.language.homePage.boxNumErr
                this.tipsShowColor = 'yellow'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            } else {
                let tempData = {
                    driver: this.driverName,
                    mission_id: this._id,
                    car_id: this.Car_id,
                    wiper: this.wiper,
                    headlight: this.headlight,
                    mirror: this.mirror,
                    tyre: this.tyre,
                    backup: this.backup,
                    brake: this.brake,
                    boxNum: this.boxNum,
                    petrolCard: this.petrolCard
                };
                let errData = {};
                let payload = new FormData();
                if (!this.otherError) {
                    this.$set(tempData, "text", this.otherErrorText);
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
                    console.log("enter long if");

                    this.$set(tempData, "finish", false);
                    this.$set(errData, "car_id", tempData.car_id); //车辆_id
                    payload.append("car_id", tempData.car_id);
                    this.$set(errData, "driver", this.driverName); //司机
                    payload.append("driver", this.driverName);
                    if (!this.wiper) {
                        this.$set(errData, "wiper", 1);
                        payload.append("wiper", 1);
                    }
                    if (!this.headlight) {
                        this.$set(errData, "headlight", 1);
                        payload.append("headlight", 1);
                    }
                    if (!this.mirror) {
                        this.$set(errData, "mirror", 1);
                        payload.append("mirror", 1);
                    }
                    if (!this.tyre) {
                        this.$set(errData, "tyre", 1);
                        payload.append("tyre", 1);
                    }
                    if (!this.backup) {
                        this.$set(errData, "backup", 1);
                        payload.append("backup", 1);
                    }
                    if (!this.brake) {
                        this.$set(errData, "brake", 1);
                        payload.append("brake", 1);
                    }
                    if (!this.otherError) {
                        this.$set(errData, "other", 1);
                        payload.append("other", 1);
                        this.$set(errData, "note", this.otherErrorText);
                        payload.append("note", this.otherErrorText);
                    }
                    if (this.updateImage) {
                        let maxSize = 200 * 1024; //200KB
                        lrz(this.updateImage, {
                            quality: 0.5
                        })
                        .then(res => {
                            if (this.updateImage.size > maxSize) {
                                this.updateImage = res.file;
                            }
                            payload.append("image", this.updateImage);
                            axios
                                .post(
                                    config.server + "/fixcar/photo",
                                    payload
                                )
                                .then(doc => {
                                    console.log("fix car info with photo send done");
                                    this.updateImage = "";
                                    this.updateImagePreview = "";
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        })
                        .catch(err => {
                            console.log("lrz err");
                            console.log(err);
                        });
                    } else {
                        axios
                        .post(config.server + "/fixcar/", errData)
                        .then(doc => {
                            console.log("fix car info send done");
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
                }
                this.showCheckCarBox = false;
                axios
                .post(config.server + "/checkcar/day", tempData)
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.getDayShiftDriverMission();
                    } else {
                        console.log(doc);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
        },

        changeOtherCheckPage() {
            this.checkPage = !this.checkPage;
        },

        startMission(missionInfo) {
            this.tempClientArray = missionInfo.clientArray
            this._id = missionInfo._id;
            if (!missionInfo.goTime) {
                this.findAllCarPlate();
                this.showChoiseCarBox = true;
            } else if (!missionInfo.carCheck_id) {
                this.showCheckCarBox = true;
            } else if (missionInfo.missionFinish) {
                if (!missionInfo.backTime) {
                    this.carCheck_id = missionInfo.carCheck_id;
                    this.showCheckAgainBox = true;
                } else {
                    this.detailDate = missionInfo.clientArray;
                    this.showMissionDetail = true;
                }
            } else {
                this.detailDate = missionInfo.clientArray;
                this.showMissionDetail = true;
                console.log(this.detailDate)
                let count = 0;
                let notFinishMissionFlag = false;
                async.whilst(
                    function() {
                        return count < 1;
                    },
                    function(callback) {
                        missionInfo.clientArray.some(element => {
                            count++;
                            if (!element.finisDate) {
                                notFinishMissionFlag = true;
                            }
                            return notFinishMissionFlag;
                        });
                        callback(null, notFinishMissionFlag);
                    },
                    (err, n) => {
                        if (!n) {
                            this.changeMissionState();
                        }
                    }
                );
            }
        },

        getDayShiftDriverMission() {
            let tempDate = new Date().toISOString();
            axios
                .post(config.server + "/dsdriver/find", {
                    today: tempDate,
                    driverName: this.driverName
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.missionArray = doc.data.doc;
                    } else if(doc.data.code === 1){
                        this.missionArray = []
                    }else{
                        if (this.lang === "ch") {
                            this.tipsInfo = "查找时出现问题";
                        } else {
                            this.tipsInfo = "Catch an error while find info";
                        }
                        this.tipsShowColor = 'yellow'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
.page-title {
    font-size: 18px;
    background: #d74342;
    color: #fff;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    z-index: 24;
}

.page-title-left {
    flex-basis: 20%;
}

.page-title-center {
    flex-basis: 60%;
}

.page-title-right {
    flex-basis: 20%;
}

.page-title-right img{
    height: 30px;
}
.emptyArea {
    height: 40px;
}

.page-title-datebox {
    border: 1px solid #e6e6e6;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 23;
}

.missioncard {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    border-radius: 10px;
}

.missioncard-topline {
    border-top: 2px solid #d74342;
    margin: 0 20px;
}

.missioncard-title {
    font-size: 18px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e6e6e6;
    margin: 0 10px;
}

.missioncard-body {
    font-size: 16px;
}

.missioncard-body-item {
    display: flex;
    display: -webkit-flex;
    height: 30px;
    line-height: 30px;
    justify-content: center;
}

.missioncard-body-item-left {
    width: 100px;
    text-align: right;
    margin-right: 10px;
}

.missioncard-body-item-right {
    width: 120px;
    text-align: left;
    margin-left: 10px;
}

.missioncard-bottom {
    font-size: 16px;
    color: #6a6a6a;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #e6e6e6;
    margin-left: 10px;
    margin-right: 10px;
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

.checkcar-body {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    width: 180px;
    border-radius: 10px;
    overflow: hidden;
}

.checkcar-body-top {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.checkcar-body-center {
    padding: 8px 12px;
}

.checkcar-body-center-title {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    font-size: 16px;
}

.checkcar-body-center-item {
    display: flex;
    display: -webkit-flex;
    height: 40px;
    line-height: 40px;
}

.checkcar-body-center-item-left {
    flex-basis: 50%;
    text-align: right;
    line-height: 34px;
    padding-right: 8px;
}

.checkcar-body-center-item-middle {
    padding-left: 16px;
    flex-basis: 25%;
}

.checkcar-body-center-item-right {
    padding-left: 8px;
    flex-basis: 25%;
    line-height: 34px;
}

.findcar-body {
    margin-top: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
}

.findcar-body-title {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e6e6e6;
}

.findcar-body-center {
    height: 200px;
    overflow: auto;
}

.findcar-body-center-item {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
}

.removebox-body-center-button {
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

.removebox-body-center-button:active {
    box-shadow: none;
    transition: 0.2s;
}

.findcar-bottom {
    display: flex;
    display: -webkit-flex;
    margin: 10px;
}

.ddmision_detail_bottom{
    display: flex;
    display: -webkit-flex;
    padding-bottom: 8px;
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

.checkcar-body-center-camera {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    background: #ebebe4;
    border: 2px dashed #696969;
}

.checkcar-camera {
    background: var(--md-theme-default-icon-on-background, rgba(0, 0, 0, 0.54));
    background-size: 48px 48px;
    mask-image: url(../../public/icons/baseline-camera_alt-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-camera_alt-24px.svg);
    width: 48px;
    height: 48px;
}

.checkcar-photo {
    height: 150px;
}

.missiondetail {
    position: fixed;
    background-color: #fff;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 24;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.missiondetail-title {
    height: 40px;
    background-color: #d74342;
    line-height: 40px;
    color: #fff;
    font-size: 18px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    display: -webkit-flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 25;
}

.missiondetail-body-item {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 10px;
    position: relative;
    border: 1px solid #eee;
}

.missiondetail-body-item-title {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    border-bottom: 1px solid #e6e6e6;
    margin-left: 10px;
    margin-right: 10px;
    position: relative;
}

.missiondetail-body-item-title-img{
    border-radius: 100%;
    height: 60px;
    width: 60px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border: 1px solid #eee;
    overflow: hidden;
    position: absolute;
    top: 4px;
    right: 0px;
}

.missiondetail-body-item-title-img img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.missiondetail-body-item-body {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
}

.missiondetail-body-item-body-left {
    width: 100px;
    margin-right: 10px;
    text-align: right;
}

.missiondetail-body-item-body-right {
    width: 200px;
    margin-left: 10px;
    text-align: left;
}

.daydriver_photoarea{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    height: 120px;
}

.photoarea{
    width: 100px;
    height: 100px;
    border: 1px solid #eee;
    border-radius: 10px;
    background-color: #eee;
    overflow: hidden;
}

.tripcount_loading_back {
    position: fixed;
    z-index: 101;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.tripcount_loading_front {
    position: fixed;
    z-index: 102;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.tripcount_loading_box{
    background-color: rgba(255, 255, 255, 0.7);
    width: 100%;
}

.spinner {
    margin: 32px auto;
    width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;
}

.spinner>div {
    background-color: rgba(212, 50, 49, 1);
    height: 100%;
    width: 6px;
    display: inline-block;
    margin-right: 4px;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

.ddm_big_back{
    position: fixed;
    z-index: 24;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.ddm_big_front{
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

.ddm_preview_center{
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin: 8px;
    padding: 8px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 300px;

}

.ddm_preview_item{
    display: flex;
    display: -webkit-flex;
}

.ddm_preview_item_left{
    width: 20px;
}

.ddm_preview_item_center{
    width: 140px;
    text-align: left;
    padding-left: 8px;
}

.ddm_preview_item_right{
    width: 44px;
    text-align: left;
}

.icon_dollar{
    mask-image: url(../../public/icons/icon_money.svg);
    background-color: green;
    height: 42px;
    width: 42px;
    mask-size: 42px;
    mask-position: center;
    mask-repeat: no-repeat;
}

.icon_dollar_frame{
    position: absolute;
    left: 12px;
    bottom: -32px;
    border:1px solid #eee;
    border-radius: 100%;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.ddm_receitp_box{
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.ddm_receitp_box_title{
    height: 30px;
    line-height: 30px;
    background-color: #d74342;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.ddm_receitp_box_body{
    margin: 12px;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.ddm_receitp_box_body_top{
    border-bottom: 1px solid #eee;
    line-height: 30px;
    height: 30px;
}

.ddm_receitp_box_body_bottom{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8px;
}

.ddm_receitp_box_body_bottom_img{
    height: 100px;
    width: 100px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin: 0 8px;   
}

.ddm_receitp_box_body_bottom_img img{
    object-fit: contain;
    height: 100%;
    width: 100%;
}

.ddm_receitp_box_body_bottom_text{
    height: 100px;
    width: 180px;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 8px;
    word-wrap: break-word;
    text-align: left;
}

.ddm_receitp_box_bottom{
    padding: 0 12px 12px 12px;
    display: flex;
    justify-content: center;
}
</style>
