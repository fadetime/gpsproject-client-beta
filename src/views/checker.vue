<template>
    <div id="checkerpage">
        <div class="check-top">
            <span v-if="lang === 'ch'">车辆检查</span>
            <span v-else>Car Check</span>
        </div>
        <div style="height:40px">
            <!-- 顶部占位符 -->
        </div>
        <div v-if="checkMissionArray.length === 0"
             class="check-body-empty">
            <div class="checkbody-empty-box"
                 @click="isShowCheckBox = true">
                <div class="check-icon"
                     style="margin:10px 0"></div>
                <div style="padding:5px 0">
                    <span style="color:#6a6a6a">检查任务</span>
                </div>
            </div>
        </div>
        <div v-else
             class="check-body">
            <div v-for="(item,index) in checkMissionArray"
                 :key="index"
                 class="check-body-box"
                 @click="openMissionBoxMethod(item)">
                <div class="check-body-box-top"></div>
                <div class="check-body-box-center">
                    <div class="check-body-box-center-left">
                        <em>{{index + 1}}</em>
                    </div>
                    <div class="check-body-box-center-center">
                        {{item.carPlate}}
                    </div>
                    <div v-if="item.isFinish" class="check-body-box-center-right">
                        <div class="baseline-check"></div>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:60px">
            <!-- 底部占位符 -->
        </div>
        <!-- mission box start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowCheckBox"
                 class="checkbox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowCheckBox"
                 class="checkbox-front"
                 @click.self.prevent="isShowCheckBox = false">
                <div class="checkbox-box">
                    <div class="checkbox-box-top">
                        <span v-if="lang === 'ch'">创建任务</span>
                        <span v-else>Create mission</span>
                    </div>
                    <div class="checkbox-box-body">
                        <div class="checkbox-box-body-top"
                             style="width:175px">
                            <div class="checkbox-box-body-top-title">
                                <div>
                                    <span>当前日期</span>
                                </div>
                            </div>
                            <span>{{billDate | dateFilter}}</span>
                        </div>
                    </div>
                    <div class="checkbox-box-bottom">
                        <div class="checkbox-body-center-button"
                             style="width: 80px;margin-right:10px"
                             @click="isShowCheckBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>chancel</span>
                        </div>
                        <div class="checkbox-body-center-button"
                             style="width: 80px;"
                             @click="createCheckMtehod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>confirm</span>
                        </div>
                    </div>
                </div>

            </div>
        </transition>
        <!-- mission box end -->

        <!-- mission check box start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowMissionBox"
                 class="checkbox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowMissionBox"
                 class="checkbox-front"
                 @click.self.prevent="isShowMissionBox = false">
                <div class="checkbox-box">
                    <div class="checkbox-box-top">
                        <span>{{tempData.carPlate}}</span>
                    </div>
                    <div class="checkbox-box-body">
                        <div class="checkbox-box-body-top">
                            <div class="checkbox-box-body-top-title">
                                <div>
                                    <span v-if="lang === 'ch'">状态检查</span>
                                    <span v-else>State check</span>
                                </div>
                            </div>
                            <div>
                                <div class="checkboxbox-body-item">
                                    <div v-if="tempData.brakeLight"
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('brake')">
                                        <div class="brakeLights-icon"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">刹车灯</div>
                                        <div v-else
                                             class="greentext">Brake Light</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('brake')">
                                        <div class="brakeLights-icon-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">刹车灯</div>
                                        <div v-else
                                             class="redtext">Brake Light</div>
                                    </div>
                                    <div v-if="tempData.headlight"
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('light')">
                                        <div class="light-icon"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">前大灯</div>
                                        <div v-else
                                             class="greentext">Front Light</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('light')">
                                        <div class="light-icon-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">前大灯</div>
                                        <div v-else
                                             class="redtext">Front Light</div>
                                    </div>
                                    <div v-if="tempData.drivingRecorder"
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('drivingRecorder')">
                                        <div class="drivingRecorder"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">记录仪</div>
                                        <div v-else
                                             class="greentext">Recorder</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('drivingRecorder')">
                                        <div class="drivingRecorder-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">记录仪</div>
                                        <div v-else
                                             class="redtext">Recorder</div>
                                    </div>
                                </div>    
                                <div class="checkboxbox-body-item">
                                    <div v-if="tempData.carWindow"
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('carWindow')">
                                        <div class="carWindow"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">车窗</div>
                                        <div v-else
                                             class="greentext">Car window</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('carWindow')">
                                        <div class="carWindow-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">车窗</div>
                                        <div v-else
                                             class="redtext">Car window</div>
                                    </div>
                                    <div v-if="tempData.tyre"
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('tyre')">
                                        <div class="tyre-icon"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">轮 胎</div>
                                        <div v-else
                                             class="greentext">Tyre</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('tyre')">
                                        <div class="tyre-icon-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">轮 胎</div>
                                        <div v-else
                                             class="redtext">Tyre</div>
                                    </div>
                                    <div v-if="tempData.petrolCard"
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('petrolCard')">
                                        <div class="card-icon"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">油 卡</div>
                                        <div v-else
                                             class="greentext">Petrol Card</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('petrolCard')">
                                        <div class="card-icon-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">油 卡</div>
                                        <div v-else
                                             class="redtext">Petrol Card</div>
                                    </div>
                                </div>
                                <div class="checkboxbox-body-item">
                                    <div v-if="tempData.cart"
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('cart')">
                                        <div class="cart_icon"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">手推车</div>
                                        <div v-else
                                             class="greentext">Trolly</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('cart')">
                                        <div class="cart_icon-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">手推车</div>
                                        <div v-else
                                             class="redtext">Trolly</div>
                                    </div>
                                    <div v-if="tempData.taillight"
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('taillight')">
                                        <div class="headlight"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">尾灯</div>
                                        <div v-else
                                             class="greentext">Back light</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('taillight')">
                                        <div class="headlight-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">尾灯</div>
                                        <div v-else
                                             class="redtext">Back light</div>
                                    </div>
                                    <div v-if="tempData.sideMirror"
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('sideMirror')">
                                        <div class="side_mirror"></div>
                                        <div v-if="lang === 'ch'"
                                             class="greentext">后视镜</div>
                                        <div v-else
                                             class="greentext">Side mirror</div>
                                    </div>
                                    <div v-else
                                         style="font-size:14px;width: 80px;"
                                         @click="checkButtonMethod('sideMirror')">
                                        <div class="side_mirror-red"></div>
                                        <div v-if="lang === 'ch'"
                                             class="redtext">后视镜</div>
                                        <div v-else
                                             class="redtext">Side mirror</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="checkbox-box-body-top">
                            <div class="checkbox-box-body-top-title">
                                <div>
                                    <span v-if="lang === 'ch'">里程检查</span>
                                    <span v-else>kilometers</span>
                                </div>
                            </div>
                            <div style="display:flex;display: -webkit-flex;justify-content: center;">
                                <div class="kilometers-icon"></div>
                            </div>
                            <div style="margin-top:4px">
                                <input type="number" style="border: 1px solid #eee;height: 30px;text-align:center;width: 148px;" v-model="tempData.kilometer">
                            </div>
                        </div>

                        <div class="checkbox-box-body-top">
                            <div class="checkbox-box-body-top-title">
                                <div>
                                    <span v-if="lang ==='ch'">其他问题</span>
                                    <span v-else>Other</span>
                                </div>
                            </div>
                            <div>
                                <input type="text" style="border: 1px solid #eee;height: 30px;text-align:center;width: 148px;" v-model="tempData.note">
                            </div>
                        </div>
                    </div>
                    <div class="checkbox-box-bottom">
                        <div class="checkbox-body-center-button"
                             style="width: 80px;"
                             @click="isShowMissionBox = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>Chancel</span>
                        </div>
                        <div v-if="!tempData.isFinish" class="checkbox-body-center-button"
                             style="width: 80px;background-color:#ff9800;border:none;color:#fff"
                             @click="openPassDialogMethod()">
                            <span v-if="lang === 'ch'">跳过</span>
                            <span v-else>Pass</span>
                        </div>
                        <div v-if="!tempData.isFinish" class="checkbox-body-center-button"
                             style="width: 80px;"
                             @click="openConfirmDialogMethod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>Confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- mission check box end -->

        <!-- confirm dialog start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowPassDialog"
                 class="checkbox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowPassDialog"
                 class="checkbox-front"
                 @click.self.prevent="isShowPassDialog = false">
                <div class="checkbox-box">
                    <div class="confirmbox-box-title">
                        <span>Tips</span>
                    </div>
                    <div class="confirmbox-box-body">
                        <div style="padding-top: 12px;">
                            <span>Do you want pass this car?</span>
                        </div>
                    </div>
                    <div class="confirmbox-box-bottom">
                        <div class="confirmbox-box-bottom-button" @click="isShowPassDialog = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>Cancel</span>
                        </div>
                        <div class="confirmbox-box-bottom-button" style="margin-left:10px" @click="comfirmPassMtehod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>Confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm dialog start -->
        <transition name="remove-classes-transition"
                    enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">
            <div v-if="isShowConfirmDialog"
                 class="checkbox-back"></div>
        </transition>
        <transition name="remove-client-transition"
                    enter-active-class="animated zoomIn faster"
                    leave-active-class="animated zoomOut faster">
            <div v-if="isShowConfirmDialog"
                 class="checkbox-front"
                 @click.self.prevent="isShowConfirmDialog = false">
                <div class="checkbox-box">
                    <div class="confirmbox-box-title">
                        <span v-if="lang === 'ch'">检查确认</span>
                        <span v-else>Check confirm</span>
                    </div>
                    <div class="confirmbox-box-body">
                        <div class="confirmbox-box-body-title">
                            <span>{{tempData.carPlate}}</span>
                        </div>
                        <div class="confirmbox-box-body-center">
                            <div class="confirmbox-box-body-center-item">
                                <div class="confirmbox-box-body-center-item-left">
                                    <div class="confirmbox-box-body-center-item-name">
                                        <span v-if="lang === 'ch'">刹车灯:</span>
                                        <span v-else>Brake Light:</span>
                                    </div>
                                    <div class="confirmbox-box-body-center-item-content">
                                        <div v-if="lang === 'ch'">
                                            <span v-if="tempData.brakeLight" style="color:#2f9514">正常</span>
                                            <span v-else style="color:#d74342">损坏</span>
                                        </div>
                                        <div v-else>
                                            <span v-if="tempData.brakeLight" style="color:#2f9514">OK</span>
                                            <span v-else style="color:#d74342">ERR</span>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="confirmbox-box-body-center-item-right">
                                    <div class="confirmbox-box-body-center-item-name">
                                        <span v-if="lang === 'ch'">前大灯:</span>
                                        <span v-else>Front Light:</span>
                                    </div>
                                    <div class="confirmbox-box-body-center-item-content">
                                        <div v-if="lang === 'ch'">
                                            <span v-if="tempData.headlight" style="color:#2f9514">正常</span>
                                            <span v-else style="color:#d74342">损坏</span>
                                        </div>
                                        <div v-else>
                                            <span v-if="tempData.headlight" style="color:#2f9514">OK</span>
                                            <span v-else style="color:#d74342">ERR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="confirmbox-box-body-center-item">
                                <div class="confirmbox-box-body-center-item-left">
                                    <div class="confirmbox-box-body-center-item-name">
                                        <span v-if="lang === 'ch'">轮胎:</span>
                                        <span v-else>Tyre:</span>
                                    </div>
                                    <div class="confirmbox-box-body-center-item-content">
                                        <div v-if="lang === 'ch'">
                                            <span v-if="tempData.tyre" style="color:#2f9514">正常</span>
                                            <span v-else style="color:#d74342">损坏</span>
                                        </div>
                                        <div v-else>
                                            <span v-if="tempData.tyre" style="color:#2f9514">OK</span>
                                            <span v-else style="color:#d74342">ERR</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="confirmbox-box-body-center-item-right">
                                    <div class="confirmbox-box-body-center-item-name">
                                        <span v-if="lang === 'ch'">油卡:</span>
                                        <span v-else>Petrol Card:</span>
                                    </div>
                                    <div class="confirmbox-box-body-center-item-content">
                                        <div v-if="lang === 'ch'">
                                            <span v-if="tempData.petrolCard" style="color:#2f9514">正常</span>
                                            <span v-else style="color:#d74342">损坏</span>
                                        </div>
                                        <div v-else>
                                            <span v-if="tempData.petrolCard" style="color:#2f9514">OK</span>
                                            <span v-else style="color:#d74342">ERR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="confirmbox-box-body-center-item">
                                <div class="confirmbox-box-body-center-item-left">
                                    <div class="confirmbox-box-body-center-item-name">
                                        <span v-if="lang === 'ch'">小推车:</span>
                                        <span v-else>Trolly:</span>
                                    </div>
                                    <div class="confirmbox-box-body-center-item-content">
                                        <div v-if="lang === 'ch'">
                                            <span v-if="tempData.cart" style="color:#2f9514">正常</span>
                                            <span v-else style="color:#d74342">损坏</span>
                                        </div>
                                        <div v-else>
                                            <span v-if="tempData.cart" style="color:#2f9514">OK</span>
                                            <span v-else style="color:#d74342">ERR</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="confirmbox-box-body-center-item-right">
                                    <div class="confirmbox-box-body-center-item-name">
                                        <span v-if="lang === 'ch'">记录仪:</span>
                                        <span v-else>Recorder:</span>
                                    </div>
                                    <div class="confirmbox-box-body-center-item-content">
                                        <div v-if="lang === 'ch'">
                                            <span v-if="tempData.drivingRecorder" style="color:#2f9514">正常</span>
                                            <span v-else style="color:#d74342">损坏</span>
                                        </div>
                                        <div v-else>
                                            <span v-if="tempData.drivingRecorder" style="color:#2f9514">OK</span>
                                            <span v-else style="color:#d74342">ERR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="confirmbox-box-body-center-item">
                                <div class="confirmbox-box-body-center-item-left">
                                    <div class="confirmbox-box-body-center-item-name">
                                        <span v-if="lang === 'ch'">车窗:</span>
                                        <span v-else>Car window:</span>
                                    </div>
                                    <div class="confirmbox-box-body-center-item-content">
                                        <div v-if="lang === 'ch'">
                                            <span v-if="tempData.carWindow" style="color:#2f9514">正常</span>
                                            <span v-else style="color:#d74342">损坏</span>
                                        </div>
                                        <div v-else>
                                            <span v-if="tempData.carWindow" style="color:#2f9514">OK</span>
                                            <span v-else style="color:#d74342">ERR</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="confirmbox-box-body-center-item-right">
                                    <div class="confirmbox-box-body-center-item-name">
                                        <span v-if="lang === 'ch'">尾灯:</span>
                                        <span v-else>Back light:</span>
                                    </div>
                                    <div class="confirmbox-box-body-center-item-content">
                                        <div v-if="lang === 'ch'">
                                            <span v-if="tempData.taillight" style="color:#2f9514">正常</span>
                                            <span v-else style="color:#d74342">损坏</span>
                                        </div>
                                        <div v-else>
                                            <span v-if="tempData.taillight" style="color:#2f9514">OK</span>
                                            <span v-else style="color:#d74342">ERR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="confirmbox-box-body-center-item">
                                <div class="confirmbox-box-body-center-item-left">
                                    <div class="confirmbox-box-body-center-item-name">
                                        <span v-if="lang === 'ch'">后视镜:</span>
                                        <span v-else>Side mirror:</span>
                                    </div>
                                    <div class="confirmbox-box-body-center-item-content">
                                        <div v-if="lang === 'ch'">
                                            <span v-if="tempData.sideMirror" style="color:#2f9514">正常</span>
                                            <span v-else style="color:#d74342">损坏</span>
                                        </div>
                                        <div v-else>
                                            <span v-if="tempData.sideMirror" style="color:#2f9514">OK</span>
                                            <span v-else style="color:#d74342">ERR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="confirmbox-box-body-centerk-item">
                                <div class="confirmbox-box-body-centerk-item-left">
                                    <span v-if="lang === 'ch'">里程:</span>
                                    <span v-else>Kilometers:</span>
                                </div>
                                <div class="confirmbox-box-body-centerk-item-right">
                                    <span>{{tempData.kilometer}}</span>
                                </div>
                            </div>
                            <div class="confirmbox-box-body-centerk-item">
                                <div class="confirmbox-box-body-centerk-item-left">
                                    <span v-if="lang === 'ch'">备注:</span>
                                    <span v-else>Note:</span>
                                </div>
                                <div class="confirmbox-box-body-centerk-item-right" style="height:100px;overflow-y:auto;overflow-x:hidden;word-break: break-all;text-align: left;">
                                    <span>{{tempData.note}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="confirmbox-box-bottom">
                        <div class="confirmbox-box-bottom-button" @click="isShowConfirmDialog = false">
                            <span v-if="lang === 'ch'">取消</span>
                            <span v-else>Cancel</span>
                        </div>
                        <div class="confirmbox-box-bottom-button" style="margin-left:10px" @click="comfirmCheckMtehod()">
                            <span v-if="lang === 'ch'">确定</span>
                            <span v-else>Confirm</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- confirm dialog end -->

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

        <!-- 操作提示 -->
        <transition name="tips-classes-transition"
                    enter-active-class="animated bounceInDown"
                    leave-active-class="animated bounceOutUp">
            <div class="errinfo"
                 v-if="showError"
                 @click="showError = false">
                <span>{{errorInfo}}</span>
            </div>
        </transition>
        <!-- 操作提示 -->
    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";

export default {
    data() {
        return {
            isShowCheckBox: false,
            isShowMissionBox: false,
            billDate: new Date(),
            driverName: null,
            errorInfo: "未知错误",
            showError: false,
            checkMissionArray: [],
            tempData: null,
            showOtherError:true,
            _id:null,
            isShowFirstPageNotice:false,
            isShowBigImageDialog:false,
            isShowConfirmDialog:false,
            isShowPassDialog:false,
            firstPageTextEN:null,
            firstPageText:null
        };
    },
    mounted() {
        this.driverName = localStorage.getItem("drivername");
        this.driver_id = localStorage.getItem("_id");
        this.findCheckWork();
        this.findFirstPageNotice()
    },
    computed: {
        lang() {
            return this.$store.state.lang;
        }
    },
    methods: {
        comfirmPassMtehod(){
            let time = null
            this.tempData.headlight = true
            this.tempData.brakeLight = true
            this.tempData.tyre = true
            this.tempData.drivingRecorder = true
            this.tempData.cart = true
            this.tempData.carWindow = true
            this.tempData.taillight = true
            this.tempData.sideMirror = true
            this.tempData.petrolCard = true
            axios
                .post(config.server + "/checkworker/edit",{
                    _id:this._id,
                    data:this.tempData,
                    time:time,
                    isFinish: true
                })
                .then(doc => {
                    this.isShowMissionBox = false
                    if(doc.data.code === 0){
                        this.findCheckWork();
                        this.isShowPassDialog = false
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "更新成功";
                        } else {
                            this.errorInfo = "update success";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }else{
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "更新出错";
                        } else {
                            this.errorInfo = "update filed";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        openPassDialogMethod(){
            this.isShowPassDialog = true
            this.isShowMissionBox = false
        },

        openConfirmDialogMethod(){
            if(this.tempData.kilometer){
                this.isShowMissionBox = false
                this.isShowConfirmDialog = true
            }else{
                if(this.lang === 'ch'){
                    this.errorInfo = '请输入汽车里程'
                }else{
                    this.errorInfo = 'Please input kilometers'
                }
                this.showError = true
                setTimeout(() => {
                    this.showError = false
                }, 2000);
            }
            console.log(this.tempData)
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
                            this.firstPageTextEN = doc.data.textEN
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

        allFinishCheckMethod(){
            let time = new Date().toISOString()
            axios
                .post(config.server + "/checkworker/finish",{
                    _id:this._id,
                    finishDate:time
                })
                .then(doc => {
                    if(doc.data.code === 0){
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "检查任务完成";
                        } else {
                            this.errorInfo = "Check Done";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }else{
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "检查提交失败";
                        } else {
                            this.errorInfo = "Update mission filed";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

        comfirmCheckMtehod(){
            let time = new Date().toISOString()
            axios
                .post(config.server + "/checkworker/edit",{
                    _id:this._id,
                    data:this.tempData,
                    time:time,
                    isFinish: true
                })
                .then(doc => {
                    this.isShowMissionBox = false
                    if(doc.data.code === 0){
                        this.findCheckWork();
                        this.isShowConfirmDialog = false
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "更新成功";
                        } else {
                            this.errorInfo = "update success";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }else{
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "更新出错";
                        } else {
                            this.errorInfo = "update filed";
                        }
                        setTimeout(() => {
                            this.showError = false;
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        checkButtonMethod(item) {
            if (item === "brake") {
                this.tempData.brakeLight = !this.tempData.brakeLight;
            } else if (item === "light") {
                this.tempData.headlight = !this.tempData.headlight;
            } else if (item === "tyre") {
                this.tempData.tyre = !this.tempData.tyre;
            }else if (item === "cart") {
                this.tempData.cart = !this.tempData.cart;
            }else if (item === "drivingRecorder") {
                this.tempData.drivingRecorder = !this.tempData.drivingRecorder;
            }else if (item === "carWindow") {
                this.tempData.carWindow = !this.tempData.carWindow;
            }else if (item === "taillight") {
                this.tempData.taillight = !this.tempData.taillight;
            }else if (item === "sideMirror") {
                this.tempData.sideMirror = !this.tempData.sideMirror;
            } else {
                this.tempData.petrolCard = !this.tempData.petrolCard;
            }
        },

        openMissionBoxMethod(item) {
            console.log(item)
            this.isShowMissionBox = true;
            this.tempData = item;
        },

        findCheckWork() {
            axios
                .get(config.server + "/checkworker/")
                .then(doc => {
                    if(doc.data.code === 0){
                        this.checkMissionArray = doc.data.doc.missionList;
                        this._id = doc.data.doc._id
                        let tempNum = 0
                        this.checkMissionArray.forEach(element => {
                            if(element.isFinish){
                                tempNum += 1
                            }
                        });
                        if(tempNum === this.checkMissionArray.length) {
                            this.checkMissionArray = []
                            this.allFinishCheckMethod()
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        createCheckMtehod() {
            let createDate = new Date().toISOString();
            axios
                .post(config.server + "/checkworker/create", {
                    createDate: createDate,
                    driverName: this.driverName,
                    driver_id: this.driver_id
                })
                .then(doc => {
                    this.isShowCheckBox = false;
                    if (doc.data.code === 0) {
                        this.findCheckWork();
                    } else {
                        this.showError = true;
                        if (this.lang === "ch") {
                            this.errorInfo = "创建错误出现错误";
                        } else {
                            this.errorInfo = "something error";
                        }
                        setTimeout(() => {
                            this.showError = false;
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
.check-top {
    background-color: #d74342;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.check-icon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-add_circle-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-add_circle-24px.svg);
    width: 42px;
    height: 42px;
}

.baseline-check {
    background: #2f9514;
    mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    width: 46px;
    height: 46px;
}

.brakeLights-icon {
    background: #2f9514;
    mask-image: url(../../public/icons/brakeLights.svg);
    -webkit-mask-image: url(../../public/icons/brakeLights.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.brakeLights-icon-red{
    background: #d74342;
    mask-image: url(../../public/icons/brakeLights.svg);
    -webkit-mask-image: url(../../public/icons/brakeLights.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.light-icon {
    background: #2f9514;
    mask-image: url(../../public/icons/light.svg);
    -webkit-mask-image: url(../../public/icons/light.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.light-icon-red {
    background: #d74342;
    mask-image: url(../../public/icons/light.svg);
    -webkit-mask-image: url(../../public/icons/light.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.drivingRecorder {
    background: #2f9514;
    mask-image: url(../../public/icons/drivingRecorder.svg);
    -webkit-mask-image: url(../../public/icons/drivingRecorder.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.drivingRecorder-red {
    background: #d74342;
    mask-image: url(../../public/icons/drivingRecorder.svg);
    -webkit-mask-image: url(../../public/icons/drivingRecorder.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.carWindow {
    background: #2f9514;
    mask-image: url(../../public/icons/carWindow.svg);
    -webkit-mask-image: url(../../public/icons/carWindow.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.carWindow-red {
    background: #d74342;
    mask-image: url(../../public/icons/carWindow.svg);
    -webkit-mask-image: url(../../public/icons/carWindow.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.cart_icon {
    background: #2f9514;
    mask-image: url(../../public/icons/cart.svg);
    -webkit-mask-image: url(../../public/icons/cart.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.cart_icon-red {
    background: #d74342;
    mask-image: url(../../public/icons/cart.svg);
    -webkit-mask-image: url(../../public/icons/cart.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.headlight {
    background: #2f9514;
    mask-image: url(../../public/icons/headlight.svg);
    -webkit-mask-image: url(../../public/icons/headlight.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.headlight-red {
    background: #d74342;
    mask-image: url(../../public/icons/headlight.svg);
    -webkit-mask-image: url(../../public/icons/headlight.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.side_mirror {
    background: #2f9514;
    mask-image: url(../../public/icons/side_mirror.svg);
    -webkit-mask-image: url(../../public/icons/side_mirror.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.side_mirror-red {
    background: #d74342;
    mask-image: url(../../public/icons/side_mirror.svg);
    -webkit-mask-image: url(../../public/icons/side_mirror.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.tyre-icon {
    background: #2f9514;
    mask-image: url(../../public/icons/tyre.svg);
    -webkit-mask-image: url(../../public/icons/tyre.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.tyre-icon-red {
    background: #d74342;
    mask-image: url(../../public/icons/tyre.svg);
    -webkit-mask-image: url(../../public/icons/tyre.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.card-icon {
    background: #2f9514;
    mask-image: url(../../public/icons/card.svg);
    -webkit-mask-image: url(../../public/icons/card.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.card-icon-red{
    background: #d74342;
    mask-image: url(../../public/icons/card.svg);
    -webkit-mask-image: url(../../public/icons/card.svg);
    width: 46px;
    height: 46px;
    margin: 0 auto;
}

.kilometers-icon {
    background: #2f9514;
    mask-image: url(../../public/icons/icon_kilometers.svg);
    -webkit-mask-image: url(../../public/icons/icon_kilometers.svg);
    width: 46px;
    height: 46px;
}

.check-body {
    font-size: 18px;
}

.check-body-box {
    width: 80%;
    margin: 10px auto 0 auto;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
}

.check-body-box-top {
    margin: 0 auto;
    border-top: 1px solid #d74342;
    width: 90%;
}

.check-body-box-center {
    display: flex;
    display: -webkit-flex;
    padding: 10px 0;
}

.check-body-box-center-left {
    flex-basis: 20%;
    height: 46px;
    line-height: 46px;
    font-size: 32px;
    font-weight: bold;
    color: #6a6a6a;
}

.check-body-box-center-center {
    flex-basis: 60%;
    height: 46px;
    line-height: 46px;
}

.check-body-box-center-right {
    flex-basis: 20%;
}

.check-body-empty {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.checkbody-empty-box {
    width: 120px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    margin-bottom: 160px;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    cursor: pointer;
    border: 1px solid #e0e0e0;
}

.checkbody-empty-box:active {
    box-shadow: none;
    transition: 0.2s;
}

.checkbox-back {
    position: fixed;
    z-index: 25;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
}

.checkbox-front {
    position: fixed;
    z-index: 101;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}

.checkbox-box {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.checkbox-box-top {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.checkbox-box-body {
    font-size: 16px;
    margin: 0 10px;
}

.checkbox-box-body-top {
    border: 1px solid #e0e0e0;
    margin-top: 20px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 10px 0;
    position: relative;
}

.checkbox-box-body-top-title {
    position: absolute;
    top: -16px;
    left: 0;
    right: 0;
}

.checkbox-box-body-top-title div {
    background: #fff;
    margin: 0 auto;
    width: 100px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
}

.checkbox-box-bottom {
    display: flex;
    display: -webkit-flex;
    margin: 10px;
    justify-content: center;
}

.checkbox-body-center-button {
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

.checkbox-body-center-button:active {
    box-shadow: none;
    transition: 0.2s;
}

.checkboxbox-body-item {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    margin-top: 10px;
}

.greentext {
    color: #2f9514;
}

.redtext {
    color: #d74342;
}

.errinfo {
    position: fixed;
    z-index: 19;
    top: 0;
    background-color: rgba(255, 255, 0, 0.7);
    width: 100%;
    z-index: 99;
    height: 40px;
    line-height: 40px;
}

.errinfo span {
    font-size: 16px;
    line-height: 32px;
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

.confirmbox-box-title {
    background: #d74342;
    color: #fff;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.confirmbox-box-body-title{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    width: 140px;
    margin-top: 4px;
}

.confirmbox-box-body{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.confirmbox-box-body-center{
    margin-left: 10px;
    margin-right: 10px;
}

.confirmbox-box-body-center-item{
    display: flex;
    display: -webkit-flex;
    margin-top: 4px;
}

.confirmbox-box-body-center-item-left{
    display: flex;
    display: -webkit-flex;
}

.confirmbox-box-body-center-item-right{
    display: flex;
    display: -webkit-flex;
}

.confirmbox-box-body-center-item-name{
    width: 80px;
    text-align: right;
}

.confirmbox-box-body-center-item-content{
    width: 50px;
    border-bottom: 1px solid #eee;
}

.confirmbox-box-body-centerk-item{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 4px;
}

.confirmbox-box-body-centerk-item-left{
    width: 80px;
    text-align: right;
    height: 30px;
    line-height: 30px;
}

.confirmbox-box-body-centerk-item-right{
    width: 140px;
    border: 1px solid #e0e0e0;
    background-color: #eee;
    border-radius: 4px;
    margin-left: 10px;
    height: 30px;
    line-height: 30px;
}

.confirmbox-box-bottom{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 8px;
    margin-bottom: 8px;
}

.confirmbox-box-bottom-button{
    border: 1px solid #eee;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
}
</style>
