<template>
    <div id="dayshifthome">
        <div class="search-title">
            <span>{{drivername}}</span>
        </div>
        <div style="height:40px">
            <!-- 顶部占位符 -->
        </div>
        <div class="dayhome_topbutton">
            <div :class="dayhome_topbutton_left" @click="changeShowMode('left')">
                <span>未分配</span>
            </div>
            <div :class="dayhome_topbutton_center" @click="changeShowMode('center')">
                <span>已分配</span>
            </div>
            <div :class="dayhome_topbutton_right" @click="changeShowMode('right')">
                <span>已完成</span>
            </div>
        </div>
        <div v-if="isShowLeftWindow">
            <div v-if="missionArray.length === 0" style="width: 50%;margin: 0 auto;padding-top: 17.5vh;">
                <img src="../../public/img/ebuyLogo.png" alt="logo">
                <br>
                <span>~{{language.homePage.whenEmpty}}~</span>
            </div>
            <div v-else
                style="margin-top:10px">
                <div class="search-body-center-item"
                    v-for="(item,index) in missionArray"
                    :key="index">
                    <div class="search-body-center-item-title">
                        <span v-if="lang === 'ch'">{{item.clientName}}</span>
                        <span v-else>{{item.clientNameEN}}</span>
                    </div>
                    <div class="search-body-center-item-body">
                        <div v-if="item.backTime">
                            <div v-if="lang === 'en'"
                                class="completediv">
                                <img src="../../public/img/missionComplete.png"
                                    alt="complete">
                            </div>
                            <div v-else
                                class="completediv">
                                <img src="../../public/img/missionCompleteCH.png"
                                    alt="complete">
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span v-if="lang === 'ch'">任务类型:</span>
                                <span v-else>Types:</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span v-if="item.isIncreaseOrder === 'true'">加单</span>
                                <span v-else-if="item.isIncreaseOrder === 'false'">补单</span>
                                <span v-else-if="item.isIncreaseOrder === 'delivery'">运输</span>
                                <span v-else-if="item.isIncreaseOrder === 'other'">其他</span>
                                <span v-else>退单</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>{{language.searchPage.clientPhone}}</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientPhone}}</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>{{language.searchPage.postCode}}</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientPostcode}}</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span v-if="lang === 'ch'">任务司机:</span>
                                <span v-else>State</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <div>
                                    <span v-if="item.driverName">{{item.driverName}}</span>
                                    <span v-else>未分配</span>
                                </div>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span v-if="lang === 'ch'">任务状态:</span>
                                <span v-else>State</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <div v-if="lang === 'ch'">
                                    <span v-if="item.dayMission_id">配送中</span>
                                    <span v-else>等待中</span>
                                </div>
                                <div v-else>
                                    <span v-if="item.dayMission_id">Shipping</span>
                                    <span v-else>Waiting</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="!item.dayMission_id">
                            <transition name="custom-classes-transition"
                                        enter-active-class="animated slideInUp faster"
                                        leave-active-class="animated slideOutDown faster">
                                <div v-if="!isShowChoiseConfirmBox"
                                    style="margin-top: 5px;margin-bottom: 5px;display:flex;display:-webkit-flex">
                                    <div class="search-body-center-button" style="background-color: #d74342;color: #fff;border: unset;" @click="showDelBoxMethod(item)">
                                        <span>删除任务</span>
                                    </div>
                                    <div class="search-body-center-button"
                                        @click="choiseMissionFromPool(item)">
                                        <span v-if="lang === 'ch'">选择任务</span>
                                        <span v-else>Choise</span>
                                    </div>
                                </div>
                            </transition>
                            <transition name="custom-classes-transition"
                                        enter-active-class="animated slideInRight faster"
                                        leave-active-class="animated slideOutRight faster">
                                <div v-if="isShowChoiseConfirmBox"
                                    class="daycheckbox">
                                    <!-- check box  -->
                                    <input type="checkbox" :value="item" v-model="choiseMissionArray" />
                                    <!-- check box  -->
                                </div>
                            </transition>
                        </div>
                        <div v-else style="padding-top:6px;">
                            <div class="search-body-center-button" style="background-color:#d74342;color:#fff;border: unset;" @click="delConfiguredClientMethod(item)">
                                <span>删除</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isShowCenterWindow">
            <div v-if="shippingArray.length === 0" style="width: 50%;margin: 0 auto;padding-top: 17.5vh;">
                <img src="../../public/img/ebuyLogo.png"
                    alt="logo">
                <br>
                <span>~{{language.homePage.whenEmpty}}~</span>
            </div>
            <div v-else
                style="margin-top:10px">
                <div class="search-body-center-item"
                    v-for="(item,index) in shippingArray"
                    :key="index">
                    <div class="search-body-center-item-title">
                        <span v-if="lang === 'ch'">{{item.clientName}}</span>
                        <span v-else>{{item.clientNameEN}}</span>
                    </div>
                    <div class="search-body-center-item-body">
                        <div v-if="item.backTime">
                            <div v-if="lang === 'en'" class="completediv">
                                <img src="../../public/img/missionComplete.png" alt="complete">
                            </div>
                            <div v-else class="completediv">
                                <img src="../../public/img/missionCompleteCH.png" alt="complete">
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span v-if="lang === 'ch'">任务类型:</span>
                                <span v-else>Types:</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span v-if="item.isIncreaseOrder === 'true'">加单</span>
                                <span v-else-if="item.isIncreaseOrder === 'false'">补单</span>
                                <span v-else-if="item.isIncreaseOrder === 'delivery'">运输</span>
                                <span v-else-if="item.isIncreaseOrder === 'other'">其他</span>
                                <span v-else>退单</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>{{language.searchPage.clientPhone}}</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientPhone}}</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>{{language.searchPage.postCode}}</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientPostcode}}</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span v-if="lang === 'ch'">任务司机:</span>
                                <span v-else>State</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <div>
                                    <span v-if="item.driverName">{{item.driverName}}</span>
                                    <span v-else>未分配</span>
                                </div>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span v-if="lang === 'ch'">任务状态:</span>
                                <span v-else>State</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <div v-if="lang === 'ch'">
                                    <span v-if="item.dayMission_id">配送中</span>
                                    <span v-else>等待中</span>
                                </div>
                                <div v-else>
                                    <span v-if="item.dayMission_id">Shipping</span>
                                    <span v-else>Waiting</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="!item.dayMission_id">
                            <transition name="custom-classes-transition"
                                        enter-active-class="animated slideInUp faster"
                                        leave-active-class="animated slideOutDown faster">
                                <div v-if="!isShowChoiseConfirmBox"
                                    style="margin-top: 5px;margin-bottom: 5px;display:flex;display:-webkit-flex">
                                    <div class="search-body-center-button" style="background-color: #d74342;color: #fff;border: unset;" @click="showDelBoxMethod(item)">
                                        <span>删除任务</span>
                                    </div>
                                    <div class="search-body-center-button"
                                        @click="choiseMissionFromPool(item)">
                                        <span v-if="lang === 'ch'">选择任务</span>
                                        <span v-else>Choise</span>
                                    </div>
                                </div>
                            </transition>
                            <transition name="custom-classes-transition"
                                        enter-active-class="animated slideInRight faster"
                                        leave-active-class="animated slideOutRight faster">
                                <div v-if="isShowChoiseConfirmBox"
                                    class="daycheckbox">
                                    <!-- check box  -->
                                    <input type="checkbox" :value="item" v-model="choiseMissionArray" />
                                    <!-- check box  -->
                                </div>
                            </transition>
                        </div>
                        <div v-else style="padding-top:6px;">
                            <div class="search-body-center-button" style="background-color:#d74342;color:#fff;border: unset;" @click="delConfiguredClientMethod(item)">
                                <span>删除</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isShowRightWindow">
            <div v-if="finishArray.length === 0" style="width: 50%;margin: 0 auto;padding-top: 17.5vh;">
                <img src="../../public/img/ebuyLogo.png" alt="logo">
                <br>
                <span>~{{language.homePage.whenEmpty}}~</span>
            </div>
            <div v-else style="margin-top:10px">
                <div class="search-body-center-item" v-for="(item,index) in finishArray" :key="index">
                    <div class="search-body-center-item-title">
                        <span v-if="lang === 'ch'">{{item.clientName}}</span>
                        <span v-else>{{item.clientNameEN}}</span>
                    </div>
                    <div class="search-body-center-item-body">
                        <div v-if="item.backTime">
                            <div v-if="lang === 'en'" class="completediv">
                                <img src="../../public/img/missionComplete.png" alt="complete">
                            </div>
                            <div v-else class="completediv">
                                <img src="../../public/img/missionCompleteCH.png" alt="complete">
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span v-if="lang === 'ch'">任务类型:</span>
                                <span v-else>Types:</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span v-if="item.isIncreaseOrder === 'true'">加单</span>
                                <span v-else-if="item.isIncreaseOrder === 'false'">补单</span>
                                <span v-else-if="item.isIncreaseOrder === 'delivery'">运输</span>
                                <span v-else-if="item.isIncreaseOrder === 'other'">其他</span>
                                <span v-else>退单</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>{{language.searchPage.clientPhone}}</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientPhone}}</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span>{{language.searchPage.postCode}}</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <span>{{item.clientPostcode}}</span>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span v-if="lang === 'ch'">任务司机:</span>
                                <span v-else>State</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <div>
                                    <span v-if="item.driverName">{{item.driverName}}</span>
                                    <span v-else>未分配</span>
                                </div>
                            </div>
                        </div>
                        <div class="search-body-center-item-body-item">
                            <div class="search-body-center-item-body-item-left">
                                <span v-if="lang === 'ch'">任务状态:</span>
                                <span v-else>State</span>
                            </div>
                            <div class="search-body-center-item-body-item-right">
                                <div v-if="lang === 'ch'">
                                    <span v-if="item.dayMission_id">已完成</span>
                                </div>
                                <div v-else>
                                    <span v-if="item.dayMission_id">Done</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="!item.dayMission_id">
                            <transition name="custom-classes-transition"
                                        enter-active-class="animated slideInUp faster"
                                        leave-active-class="animated slideOutDown faster">
                                <div v-if="!isShowChoiseConfirmBox"
                                    style="margin-top: 5px;margin-bottom: 5px;display:flex;display:-webkit-flex">
                                    <div class="search-body-center-button" style="background-color: #d74342;color: #fff;border: unset;" @click="showDelBoxMethod(item)">
                                        <span>删除任务</span>
                                    </div>
                                    <div class="search-body-center-button"
                                        @click="choiseMissionFromPool(item)">
                                        <span v-if="lang === 'ch'">选择任务</span>
                                        <span v-else>Choise</span>
                                    </div>
                                </div>
                            </transition>
                            <transition name="custom-classes-transition"
                                        enter-active-class="animated slideInRight faster"
                                        leave-active-class="animated slideOutRight faster">
                                <div v-if="isShowChoiseConfirmBox"
                                    class="daycheckbox">
                                    <!-- check box  -->
                                    <input type="checkbox" :value="item" v-model="choiseMissionArray" />
                                    <!-- check box  -->
                                </div>
                            </transition>
                        </div>
                        <div v-else style="padding-top:6px;">
                            <div class="search-body-center-button" style="background-color:#d74342;color:#fff;border: unset;" @click="delConfiguredClientMethod(item)">
                                <span>删除</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:60px">
            <!-- 底部占位符 -->
        </div>
        <div v-if="isShowChoiseConfirmBox"
             style="height:60px">
            <!-- 额外的底部占位符 -->
        </div>
        <!-- choise confirm box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated slideInUp faster"
                    leave-active-class="animated slideOutDown faster">
            <div v-if="isShowChoiseConfirmBox"
                 class="choiseconfirm-box">
                <div class="choiseconfirm-box-left">
                    <span>已选：</span>
                    <span>{{choiseMissionArray.length}}</span>
                    <span>个客户</span>
                </div>
                <div class="choiseconfirm-box-right">
                    <div class="search-body-center-button"
                         @click="cancelMethod()">
                        <span v-if="lang === 'ch'">取消</span>
                        <span v-else>Cancel</span>
                    </div>
                    <div class="search-body-center-button"
                         style="margin-left:10px"
                         @click="startDayShiftMission()">
                        <span v-if="lang === 'ch'">分配</span>
                        <span v-else>Start</span>
                    </div>
                </div>

            </div>
        </transition>
        <!-- choise confirm box end -->

        <!-- choise driver box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowChoiseDriverBox"
                 class="confirmstart-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowChoiseDriverBox"
                 class="confirmstart-front"
                 @click.self.prevent="isShowChoiseDriverBox = false">
                <div class="confirmstart-box">
                    <div class="confirmstart-box-title">
                        <span v-if="lang === 'ch'">司机选择</span>
                        <span v-else>Confirm Client</span>
                    </div>
                    <div class="confirmstart-box-body">
                        <div class="dayshift_driverbox_body">
                            <div class="dayshift_driverbox_body_item" v-for="(item,index) in driverArray" :key="index" @click="choiseDriverMethod(item)">
                                <span>{{item.dirvername}}</span>
                                <div v-if="choiseDriver === item.dirvername" class="dayshift_icon_check"></div>
                            </div>
                        </div>
                    </div>
                    <div class="confirmstart-box-bottom">
                        <div class="search-body-center-button" @click="isShowChoiseDriverBox = false">
                            <span>取消</span>
                        </div>
                        <div class="search-body-center-button" @click="confirmChoiseDriverMethod()">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- choise driver box end -->

        <!-- confirm start box start -->
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowConfirmStartBox"
                 class="confirmstart-back"></div>
        </transition>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowConfirmStartBox"
                 class="confirmstart-front"
                 @click.self.prevent="isShowConfirmStartBox = false">
                <div class="confirmstart-box">
                    <div class="confirmstart-box-title">
                        <span v-if="lang === 'ch'">确认信息</span>
                        <span v-else>Confirm Client</span>
                    </div>
                    <div class="confirmstart-box-body">
                        <div class="confirmstart-box-body-screen" style="height:30px;line-height:30px;padding:0 4px;display:flex;display:-webkit-flex;justify-content:center;font-size:16px">
                            <div>
                                <span>配送司机</span>
                            </div>
                            <div style="margin-left:10px">
                                <span>{{choiseDriver}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="confirmstart-box-body">
                        <div class="confirmstart-box-body-screen">
                            <div class="confirmstart-box-body-item"
                                 v-for="(item,index) in choiseMissionArray"
                                 :key="index">
                                <div class="confirmstart-box-body-item-left">
                                    {{index + 1}}
                                </div>
                                <div class="confirmstart-box-body-item-center">
                                    <span v-if="lang === 'ch'">{{item.clientName}}</span>
                                    <span v-else>{{item.clientNameEN}}</span>
                                </div>
                                <div class="confirmstart-box-body-item-right">
                                    <span v-if="item.isIncreaseOrder === 'true'">加单</span>
                                    <span v-else-if="item.isIncreaseOrder === 'false'">补单</span>
                                    <span v-else-if="item.isIncreaseOrder === 'delivery'">运输</span>
                                    <span v-else-if="item.isIncreaseOrder === 'other'">其他</span>
                                    <span v-else>退单</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="confirmstart-box-bottom">
                        <div class="search-body-center-button"
                             @click="isShowConfirmStartBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>Cancel</span>
                        </div>
                        <div class="search-body-center-button"
                             style="margin-left:10px"
                             @click="saveMission()">
                            <span v-if="lang === 'ch'">确认</span>
                            <span v-else>Confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm start box end -->

        <!-- first page notice start -->
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowFirstPageNotice"
                 class="first_notic_back">
                <div class="first_notic_back_close" @click="isShowFirstPageNotice = false">
                    <span v-if="lang === 'ch'" style="font-size:14px;line-height: 40px;">已读</span>
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
                    <img :src="firstPageImage | imgurl" alt="notice_pic">
                </div>
            </div>
        </transition>
        <!-- big image dialog end -->

        <!-- 删除提示 start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="showRemoveBox"
                 class="removebox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="showRemoveBox"
                 class="removebox-front"
                 @click.self.prevent="showRemoveBox = false">
                <div class="removebox-box">
                    <div class="removebox-box-top">
                        <span v-if="lang === 'ch'">删除任务</span>
                        <span v-else>Remove Mission</span>
                    </div>
                    <div class="removebox-box-body">
                        <div class="removebox-box-body-title">
                            <span v-if="lang === 'ch'"
                                  style="font-size:16px">删除原因</span>
                            <span v-else
                                  style="font-size:16px">Choise Reason</span>
                        </div>
                        <div class="removebox-box-body-item">
                            <div>
                                <input type="radio"
                                       id="radio1"
                                       value="添加错误"
                                       v-model="radioPicked">
                            </div>
                            <div style="padding-left:10px">
                                <label v-if="lang === 'ch'"
                                       for="radio1">添加错误</label>
                                <label v-else
                                       for="radio1">Add error</label>
                            </div>
                        </div>
                        <div class="removebox-box-body-item">
                            <div>
                                <input type="radio"
                                       id="radio2"
                                       value="送货取消"
                                       v-model="radioPicked">
                            </div>
                            <div style="padding-left:10px">
                                <label v-if="lang === 'ch'"
                                       for="radio2">送货取消</label>
                                <label v-else
                                       for="radio2">chancelled</label>
                            </div>
                        </div>
                        <div class="removebox-box-body-item">
                            <div>
                                <input type="radio"
                                       id="radio3"
                                       value="other"
                                       v-model="radioPicked">
                            </div>
                            <div style="padding-left:10px">
                                <label v-if="lang === 'ch'"
                                       for="radio3">其他原因</label>
                                <label v-else
                                       for="radio3">other</label>
                            </div>
                        </div>
                        <div class="removebox-box-body-item">
                            <textarea :disabled="radioPicked != 'other'"
                                      style="margin:0 10px;width: 180px;border-radius: 10px;"
                                      name="otherreason"
                                      id="otherreason"
                                      cols="30"
                                      rows="10"
                                      v-model="otherText"></textarea>
                        </div>
                    </div>
                    <div class="removebox-box-footer">
                        <div class="removebox-body-center-button"
                             style="width: 80px;margin-right:10px"
                             @click="showRemoveBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="removebox-body-center-button"
                             style="width: 80px;"
                             @click="removeMissionMtehod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 删除提示 end-->

        <!-- 配置司机后的删除确认框 start-->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowConfiguredRemoveBox"
                 class="removebox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowConfiguredRemoveBox"
                 class="removebox-front"
                 @click.self.prevent="isShowConfiguredRemoveBox = false">
                <div class="removebox-box">
                    <div class="removebox-box-top">
                        <span v-if="lang === 'ch'">删除已分配任务</span>
                        <span v-else>Remove Mission</span>
                    </div>
                    <div class="dayshift_configureddel_body">
                        <div class="dayshift_configureddel_body_title">
                            <span>{{shippingDate.clientName}}</span>
                        </div>
                        <div class="dayshift_configureddel_body_content">
                            <span>是否确认删除?</span>
                        </div>
                    </div>
                    <div class="dayshift_configureddel_bottom">
                        <div class="removebox-body-center-button" style="background-color:#fff;" @click="isShowConfiguredRemoveBox = false">
                            <span>取消</span>
                        </div>
                        <div class="removebox-body-center-button" style="background-color:#fff;margin-left:8px" @click="confirmRemoveConfiguredClientMethod()">
                            <span>确定</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 配置司机后的删除确认框 end-->

        <!-- loading animation start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowLoadingAnimation" class="tripcount_loading_back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowLoadingAnimation" class="tripcount_loading_front" @touchmove.prevent>
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
import _ from "lodash";
import tipsBox from "../components/tipsBox"

export default {
    components:{
        tipsBox
    },
    mounted() {
        this.drivername = localStorage.getItem("drivername");
        this.getMissionPool();
        this.findFirstPageNotice()
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
            drivername: null,
            missionArray: [],
            shippingArray: [],
            finishArray: [],
            finishNumber: [],
            radioPicked: null,
            otherText: null,
            missionInfo: null,
            needDoNum: 0,
            isShowChoiseConfirmBox: false,
            isShowConfirmStartBox: false,
            choiseMissionArray: [],
            isShowFirstPageNotice:false,
            isShowBigImageDialog:false,
            firstPageTextEN:null,
            firstPageText:null,
            tipsShowColor:null,
            tipsInfo:null,
            isShowTipsBox:null,
            isShowChoiseDriverBox:false,
            driverArray:[],
            choiseDriver:null,
            choiseDriver_id:null,
            showRemoveBox:false,
            isShowConfiguredRemoveBox:false,
            shippingDate:null,
            isShowLoadingAnimation:false,
            dayhome_topbutton_left: 'dayhome_topbutton_redline',
            dayhome_topbutton_center: 'dayhome_topbutton_whiteline',
            dayhome_topbutton_right: 'dayhome_topbutton_whiteline',
            isShowLeftWindow: true,
            isShowCenterWindow: false,
            isShowRightWindow: false
        };
    },
    methods: {
        
        getFinishMissionPool(){
            this.finishArray = []
            let b = new Date().toISOString();
            axios
                .post(config.server + "/dayShiftmission/find", {
                    driverName: this.drivername,
                    orderDate: b,
                    mode:'finish'
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.finishArray = doc.data.doc;
                        this.finishArray = _.orderBy(
                            this.finishArray,
                            ["backTime"],
                            ["desc"]
                        );
                    } else if (doc.data.code === 1) {
                        if (this.lang === "ch") {
                            this.tipsInfo = "未找该日任务";
                        } else {
                            this.tipsInfo = "Mission not found in today";
                        }
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
                        }, 3000);
                    } else {
                        if (this.lang === "ch") {
                            this.tipsInfo = "未找到白班任务";
                        } else {
                            this.tipsInfo = "Mission not found";
                        }
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getShippingMissionPool(){
            this.shippingArray = []
            let b = new Date().toISOString();
            axios
                .post(config.server + "/dayShiftmission/find", {
                    driverName: this.drivername,
                    orderDate: b,
                    mode:'shipping'
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.shippingArray = doc.data.doc;
                        this.shippingArray = _.orderBy(
                            this.shippingArray,
                            ["backTime"],
                            ["desc"]
                        );
                    } else if (doc.data.code === 1) {
                        if (this.lang === "ch") {
                            this.tipsInfo = "未找该日任务";
                        } else {
                            this.tipsInfo = "Mission not found in today";
                        }
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
                        }, 3000);
                    } else {
                        if (this.lang === "ch") {
                            this.tipsInfo = "未找到白班任务";
                        } else {
                            this.tipsInfo = "Mission not found";
                        }
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        changeShowMode(mode){
            if(mode === 'left'){
                this.getMissionPool()
                this.isShowLeftWindow = true
                this.isShowCenterWindow = false
                this.isShowRightWindow = false
                this.dayhome_topbutton_left = 'dayhome_topbutton_redline'
                this.dayhome_topbutton_center = 'dayhome_topbutton_whiteline'
                this.dayhome_topbutton_right = 'dayhome_topbutton_whiteline'
            }else if(mode === 'center'){
                this.getShippingMissionPool()
                this.isShowLeftWindow = false
                this.isShowCenterWindow = true
                this.isShowRightWindow = false
                this.dayhome_topbutton_left = 'dayhome_topbutton_whiteline'
                this.dayhome_topbutton_center = 'dayhome_topbutton_redline'
                this.dayhome_topbutton_right = 'dayhome_topbutton_whiteline'
            }else{
                this.getFinishMissionPool()
                this.isShowLeftWindow = false
                this.isShowCenterWindow = false
                this.isShowRightWindow = true
                this.dayhome_topbutton_left = 'dayhome_topbutton_whiteline'
                this.dayhome_topbutton_center = 'dayhome_topbutton_whiteline'
                this.dayhome_topbutton_right = 'dayhome_topbutton_redline'
            }
        },

        confirmRemoveConfiguredClientMethod(){
            this.isShowLoadingAnimation = true
            axios
                .post(config.server + "/dayShiftmission/removeConfiguredClient", {
                    dayMission_id:this.shippingDate.dayMission_id,
                    pool_id:this.shippingDate.pool_id
                })
                .then(doc => {
                    this.isShowLoadingAnimation = false
                    if(doc.data.code === 0){
                        this.isShowConfiguredRemoveBox = false
                        this.tipsShowColor = 'green'
                        this.tipsInfo = '删除成功'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 2000);
                        this.getMissionPool()
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '删除时发生错误'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        delConfiguredClientMethod(item){
            console.log(item)
            if(item.dayMission_id){
                this.isShowConfiguredRemoveBox = true
                this.shippingDate={
                    dayMission_id: item.dayMission_id,
                    clientName: item.clientName,
                    pool_id:item._id
                }
            }else{
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '删除已分配任务发生错误'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }
        },

        removeMissionMtehod() {
            if (this.radioPicked === null) {
                this.showError = true;
                if (this.lang === "ch") {
                    this.errorInfo = "请选择删除原因";
                } else {
                    this.errorInfo = "Choise reason";
                }
                setTimeout(() => {
                    this.showError = false;
                }, 3000);
            } else {
                let tempDate;
                if (this.radioPicked === "other") {
                    tempDate = {
                        _id: this.missionInfo._id,
                        removeReason: this.otherText
                    };
                } else {
                    tempDate = {
                        _id: this.missionInfo._id,
                        removeReason: this.radioPicked
                    };
                }
                axios
                    .post(config.server + "/dayShiftmission/remove", tempDate)
                    .then(doc => {
                        if (doc.data.code === 0) {
                            this.showError = true;
                            if (this.lang === "ch") {
                                this.errorInfo = "删除成功";
                            } else {
                                this.errorInfo = "Remove success";
                            }
                            this.showRemoveBox = false;
                            this.getMissionPool();
                            setTimeout(() => {
                                this.showError = false;
                            }, 3000);
                        } else {
                            this.showError = true;
                            if (this.lang === "ch") {
                                this.errorInfo = "删除失败";
                            } else {
                                this.errorInfo = "Remove fail";
                            }
                            this.showRemoveBox = false;
                            setTimeout(() => {
                                this.showError = false;
                            }, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },

        showDelBoxMethod(item){
            this.showRemoveBox = true
            this.missionInfo = item;
        },

        confirmChoiseDriverMethod(){
            if(!this.choiseDriver){
                this.tipsShowColor = 'yellow'
                this.tipsInfo = '请选择司机'
                this.isShowTipsBox = true
                setTimeout(() => {
                    this.isShowTipsBox = false
                }, 3000);
            }else{
                this.isShowChoiseDriverBox = false
                this.isShowConfirmStartBox = true;
                console.log(this.choiseMissionArray)
            }
        },

        choiseDriverMethod(item){
            this.choiseDriver = item.dirvername
            this.choiseDriver_id = item._id
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
                                this.firstPageTextEN = doc.data.textEN
                                this.firstPageImage = doc.data.image
                                this.isShowFirstPageNotice = true
                                localStorage.noticeOldTime = tempdate
                            }else{
                                this.tipsShowColor = 'yellow'
                                if (this.lang === "ch") {
                                    this.tipsInfo = "获取首页通知失败";
                                } else {
                                    this.tipsInfo = "Get first page notice failed";
                                }
                                this.isShowTipsBox = true
                                setTimeout(() => {
                                    this.isShowTipsBox = false;
                                }, 3000)
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
                            this.firstPageTextEN = doc.data.textEN
                            this.firstPageImage = doc.data.image
                            this.isShowFirstPageNotice = true
                            localStorage.noticeOldTime = noticeOldTime
                        }else{
                            this.tipsShowColor = 'yellow'
                            if (this.lang === "ch") {
                                this.tipsInfo = "获取首页通知失败";
                            } else {
                                this.tipsInfo = "Get first page notice failed";
                            }
                            this.isShowTipsBox = true
                            setTimeout(() => {
                                this.isShowTipsBox = false;
                            }, 3000)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    }) 
           }          
        },

        saveMission() {
            this.isShowLoadingAnimation = true
            let tempDate = new Date().toISOString();
            console.log(this.choiseMissionArray)
            axios
                .post(config.server + "/dsdriver/create", {
                    driverName: this.choiseDriver,
                    orderDate: tempDate,
                    clientArray: this.choiseMissionArray
                })
                .then(doc => {
                    this.isShowLoadingAnimation = false
                    if (doc.data.code === 0) {
                        this.isShowConfirmStartBox = false
                        this.isShowChoiseConfirmBox = false
                        this.getMissionPool();
                        this.tipsShowColor = 'green'
                        if (this.lang === "ch") {
                            this.tipsInfo = "建立任务成功";
                        } else {
                            this.tipsInfo = "Create mission success";
                        }
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
                        }, 3000)
                    }else{
                        this.tipsShowColor = 'yellow'
                        if (this.lang === "ch") {
                            this.tipsInfo = "建立任务错误";
                        } else {
                            this.tipsInfo = "Catch an error while create mission";
                        }
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                    if (this.lang === "ch") {
                        this.tipsInfo = "客户端错误";
                    } else {
                        this.tipsInfo = "web client error";
                    }
                    this.isShowTipsBox = true
                    setTimeout(() => {
                        this.isShowTipsBox = false;
                    }, 3000);
                });
        },

        startDayShiftMission() {
            axios
                .post(config.server + "/dirver/findDayDriver")
                .then(doc => {
                    if(doc.data.code === 0){
                        this.choiseDriver = null
                        this.choiseDriver_id = null
                        this.isShowChoiseDriverBox = true
                        this.driverArray = doc.data.doc
                    }else{
                        this.tipsShowColor = 'yellow'
                        this.tipsInfo = '获取司机数据失败'
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        cancelMethod() {
            this.isShowChoiseConfirmBox = false;
            this.choiseMissionArray = [];
        },

        choiseMissionFromPool(client) {
            this.choiseMissionArray.push(client);
            this.isShowChoiseConfirmBox = true;
        },

        startMissionMethod(mission) {
            let goTime = new Date().toISOString();
            axios
                .post(config.server + "/dayShiftmission/start", {
                    _id: mission._id,
                    goTime: goTime
                })
                .then(doc => {
                    console.log(doc);
                    if (doc.data.code === 0) {
                        this.getMissionPool();
                        if (this.lang === "ch") {
                            this.tipsInfo = "状态更新成功";
                        } else {
                            this.tipsInfo = "state update success";
                        }
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
                        }, 2000);
                    } else {
                        if (this.lang === "ch") {
                            this.tipsInfo = "状态更新失败";
                        } else {
                            this.tipsInfo = "state update failed";
                        }
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getMissionPool() {
            this.missionArray = []
            let b = new Date().toISOString();
            this.needDoNum = 0;
            this.$store.dispatch("setDoNum", this.needDoNum);
            axios
                .post(config.server + "/dayShiftmission/find", {
                    driverName: this.drivername,
                    orderDate: b,
                    mode:'mission'
                })
                .then(doc => {
                    if (doc.data.code === 0) {
                        this.missionArray = doc.data.doc;
                        this.missionArray = _.orderBy(
                            this.missionArray,
                            ["backTime"],
                            ["desc"]
                        );
                        this.missionArray.forEach(elementX => {
                            if (!elementX.backTime) {
                                this.needDoNum += 1;
                            }
                        });
                        this.$store.dispatch("setDoNum", this.needDoNum);
                    } else if (doc.data.code === 1) {
                        if (this.lang === "ch") {
                            this.tipsInfo = "未找该日任务";
                        } else {
                            this.tipsInfo = "Mission not found in today";
                        }
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
                        }, 3000);
                    } else {
                        if (this.lang === "ch") {
                            this.tipsInfo = "未找到白班任务";
                        } else {
                            this.tipsInfo = "Mission not found";
                        }
                        this.isShowTipsBox = true
                        setTimeout(() => {
                            this.isShowTipsBox = false;
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
.search-title {
    height: 40px;
    background: #d74342;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 24;
}

.search-title span {
    color: #fff;
    font-size: 18px;
    line-height: 40px;
}

.dayhome_topbutton{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    height: 38px;
    border-bottom: 1px solid #eee;
}

.dayhome_topbutton div{
    height: 30px;
    line-height: 38px;
    width: 68px;
    font-size: 16px;
}

.dayhome_topbutton_whiteline{
    border-bottom: 1px solid #fff;
    transition: 0.5s
}

.dayhome_topbutton_redline{
    border-bottom: 1px solid #d74342;
    transition: 0.5s
}

.search-body-center-item {
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 10px;
    background-color: #fff;
}

.search-body-center-item-title {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 16px;
}

.search-body-center-item-body {
    padding-bottom: 5px;
    height: 168px;
    position: relative;
}

.search-body-center-item-body-item {
    display: flex;
    display: -webkit-flex;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
}

.search-body-center-item-body-item-left {
    flex-basis: 30%;
    text-align: right;
}

.search-body-center-item-body-item-right {
    flex-basis: 70%;
    text-align: left;
    padding-left: 8px;
}

.search-body-center-button {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 80px;
    margin: 0 auto;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
    transition: 0.2s;
    border: 1px solid #eee;
}

.search-body-center-button:active {
    box-shadow: none;
    transition: 0.2s;
}

.removebox-back {
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.removebox-front {
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

.removebox-box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.removebox-box-top {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.removebox-box-body {
    font-size: 16px;
}

.removebox-box-body-title {
    padding-top: 10px;
    border-bottom: 1px solid #e0e0e0;
    height: 40px;
    line-height: 30px;
    margin: 0 10px;
}

.removebox-box-body-item {
    margin-top: 5px;
    font-size: 14px;
    display: flex;
    display: -webkit-flex;
    justify-content: left;
}

.removebox-box-body-item input {
    width: 16px;
    height: 16px;
    margin-left: 30px;
}

.removebox-box-footer {
    display: flex;
    display: -webkit-flex;
    margin: 10px;
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

.completediv {
    position: absolute;
    top: 5px;
    right: 5px;
}

.completediv img {
    width: 150px;
    transform: rotate(14deg);
    -ms-transform: rotate(14deg); /* IE 9 */
    -moz-transform: rotate(14deg); /* Firefox */
    -webkit-transform: rotate(14deg); /* Safari 和 Chrome */
    -o-transform: rotate(14deg);
}

.choiseconfirm-box {
    border: 1px solid #e6e6e6;
    margin-left: 20px;
    margin-right: 20px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 64px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    background: #fff;
    border-radius: 5px;
}

.choiseconfirm-box-left {
    line-height: 40px;
    font-size: 16px;
}

.choiseconfirm-box-right {
    display: flex;
    display: -webkit-flex;
    margin-left: 20px;
    padding: 5px 0;
}

.day_delbutton{
    position: absolute;
    bottom: 8px;
    left: 8px;
}

.daycheckbox {
    position: absolute;
    bottom: 2px;
    right: 8px;
}

.daycheckbox input {
    height: 30px;
    width: 30px;
}

.confirmstart-back {
    position: fixed;
    z-index: 23;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.confirmstart-front {
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

.confirmstart-box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.confirmstart-box-title {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.confirmstart-box-body {
    margin-top: 10px;
}

.confirmstart-box-body-screen {
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 300px;
    overflow: auto;
    padding: 8px;
    border-radius: 10px;
    border: 1px solid #eee;
}

.confirmstart-box-body-item {
    display: flex;
    display: -webkit-flex;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
}

.confirmstart-box-body-item-left {
    width: 20px;
    text-align: right;
}

.confirmstart-box-body-item-center {
    width: 180px;
    margin-left: 8px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.confirmstart-box-body-item-right{
    padding-left: 8px;
}

.confirmstart-box-bottom {
    display: flex;
    display: -webkit-flex;
    margin-top: 10px;
    margin-bottom: 10px;
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

.dayshift_driverbox_body{
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin: 0 10px;
    border-radius: 10px;
    padding: 8px;
}

.dayshift_driverbox_body_item{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    position: relative;
    width: 160px;
}

.dayshift_icon_check{
    mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    background-color: green;
    -webkit-mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    width: 30px;
    height: 30px;
    mask-size: 30px 30px;
    mask-repeat: no-repeat;
    mask-position: center;
    position: absolute;
    top: 0;
    right: 0;
}

.dayshift_configureddel_body{
    margin: 10px 12px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    border: 1px solid #eee;
    padding: 10px;
}

.dayshift_configureddel_body_title{
    line-height: 30px;
    height: 30px;
    border-bottom: 1px solid #eee;
}

.dayshift_configureddel_body_content{
    height: 50px;
    line-height: 60px;
}

.dayshift_configureddel_bottom{
    display: flex;
    display: -webkit-flex;
    margin: 0 8px 10px 8px
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
</style>
