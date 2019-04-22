<template>
    <div id="carrule">
        <div class="carrule_top_pic">
            <img src="../../public/img/carRuleTopPic.png">
        </div>
        <div class="carrule_top_title">
            <div class="carrule_top_color"></div>
            <div class="carrule_top_title_content">
                <div class="carrule_top_title_content_top">
                    <span>Logistics Code</span>
                </div>
                <div class="carrule_top_title_content_bottom">
                    <span>of Conducts</span>
                </div>
            </div>
        </div>
        <div class="carrule_top_body">
            <div class="carrule_top_body_frame">
                <div class="carrule_body_color_green"></div>
                <div class="carrule_top_body_title">
                    <span>Vehicles</span>
                </div>
            </div>
            <div class="carrule_top_body_item">
                <div class="carrule_body_color_title">
                    <div class="carrule_body_color_title_content">
                        <span>正确示例</span>
                    </div>
                </div>
                <div class="carrule_body_color_title_border"></div>
            </div>
            <div class="carrule_top_body_item" style="justify-content: space-around;">
                <div class="carrule_top_body_item_pic_frame">
                    <img src="../../public/img/car_right_front.jpg">
                    <div class="icon_right"></div>
                </div>
                <div class="carrule_top_body_item_pic_frame">
                    <img src="../../public/img/car_right_back.jpg">
                    <div class="icon_right"></div>
                </div>
            </div>
            <div class="carrule_top_body_item">
                <div class="carrule_top_body_item_text">
                    <span>车辆随时准备停好在对的位置，窗口，车门，时刻紧关，后备胎已在车上</span>
                </div>
            </div>
            <div class="carrule_top_body_item">
                <div class="carrule_body_color_title">
                    <div class="carrule_body_color_title_content">
                        <span>备用轮胎</span>
                    </div>
                </div>
                <div class="carrule_body_color_title_border"></div>
            </div>
            <div class="carrule_top_body_item" style="justify-content: space-around;">
                <div class="carrule_top_body_item_pic_frame">
                    <img src="../../public/img/back.jpg">
                    <div class="icon_wrong"></div>
                </div>
            </div>
            <div class="carrule_top_body_item">
                <div class="carrule_top_body_item_text">
                    <span>时刻确保大小后备胎时刻就位</span>
                </div>
            </div>

            <div class="carrule_top_body_item">
                <div class="carrule_body_color_title">
                    <div class="carrule_body_color_title_content">
                        <span>车门未关</span>
                    </div>
                </div>
                <div class="carrule_body_color_title_border"></div>
            </div>
            <div class="carrule_top_body_item" style="justify-content: space-around;">
                <div class="carrule_top_body_item_pic_frame">
                    <img src="../../public/img/20190417170235.jpg">
                    <div class="icon_wrong"></div>
                </div>
                <div class="carrule_top_body_item_pic_frame">
                    <img src="../../public/img/20190417170537.jpg">
                    <div class="icon_wrong"></div>
                </div>
            </div>
            <div class="carrule_top_body_item">
                <div class="carrule_top_body_item_text" style="text-align:left">
                    <span>错误和不良的半路下货离开车辆门没关上，影响他人安全，公司面对物件遗失的风险可能。</span>
                </div>
            </div>

            <div class="carrule_top_body_item">
                <div class="carrule_body_color_title">
                    <div class="carrule_body_color_title_content">
                        <span>车窗未关</span>
                    </div>
                </div>
                <div class="carrule_body_color_title_border"></div>
            </div>
            <div class="carrule_top_body_item" style="justify-content: space-around;">
                <div class="carrule_top_body_item_pic_frame">
                    <img src="../../public/img/20190417170731.jpg">
                    <div class="icon_wrong"></div>
                </div>
                <div class="carrule_top_body_item_pic_frame">
                    <img src="../../public/img/20190417170757.jpg">
                    <div class="icon_wrong"></div>
                </div>
            </div>
            <div class="carrule_top_body_item">
                <div class="carrule_top_body_item_text" style="text-align:left">
                    <span>窗口时刻确保关上。</span>
                </div>
            </div>
        </div>
        <div style="height:56px;"></div>
    </div>
</template>

<style scoped>
.carrule_top_pic{
    margin-top: 48px;
}

.carrule_top_title{
    position: relative;
}

.carrule_top_color{
    width: 100px;
    height: 60px;
    margin-left:-24px;
    transform:skew(-30deg);
    -webkit-transform: skew(-30deg);
    -moz-transform: skew(-30deg);
    -o-transform: skew(-30deg);
    background: #38003d;
}

.carrule_top_title_content{
    position: absolute;
    top: 16px;
    right: 18px;
    font-size: 30px;
}

.carrule_top_title_content div{
    height: 40px;
    line-height: 40px;
    color: #d74342;
}

.carrule_top_title_content_top{
    text-align: left;
    margin-right: 24px;
}

.carrule_top_title_content_bottom{
    text-align: right;
    margin-right: 8px;
}

.carrule_top_body{
    padding: 24px 0;
    margin-top: 80px;
}
.carrule_top_body_frame{
    position: relative;
    margin-bottom: 24px;
}

.carrule_body_color_green{
    width: 180px;
    height: 30px;
    margin-left:-24px;
    transform:skew(-30deg);
    -webkit-transform: skew(-30deg);
    -moz-transform: skew(-30deg);
    -o-transform: skew(-30deg);
    background: #93f9ff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.carrule_top_body_title{
    position: absolute;
    color: #38003d;
    top: 0;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    padding-left: 24px;
}

.carrule_top_body_item{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin: 12px 24px;
    position: relative;
}

.carrule_body_color_title{
    width: 120px;
    height: 30px;
    transform:skew(-30deg);
    -webkit-transform: skew(-30deg);
    -moz-transform: skew(-30deg);
    -o-transform: skew(-30deg);
    background: #93f9ff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: relative;
}

.carrule_body_color_title_content{
    transform:skew(20deg);
    -webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
    -o-transform: skew(20deg);
    color: #2c3e50;
    height: 30px;
    line-height: 30px;
}

.carrule_body_color_title_border{
    border: 2px solid #93f9ff;
    position: absolute;
    width: 100%;
    top: 15px;
    left: 0;
    right: 0;
    z-index: -1;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.carrule_top_body_item_pic_frame{
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 152px;
    border-radius: 10px;
    overflow:hidden;
    height: 120px;
    padding: 8px;
    position: relative;
}

.carrule_top_body_item_pic_frame img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.carrule_top_body_item_text{
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 8px;
}

.icon_right{
    mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    background-color: #00ff87;
    -webkit-mask-image: url(../../public/icons/baseline-check_circle_outline-24px.svg);
    width: 46px;
    height: 46px;
    mask-size: 46px 46px;
    mask-repeat: no-repeat;
    mask-position: center;
    position: absolute;
    bottom: 6px;
    right: 6px;
}

.icon_wrong{
    mask-image: url(../../public/icons/baseline-add_circle_outline-24px.svg);
    background-color: #d74342;
    -webkit-mask-image: url(../../public/icons/baseline-add_circle_outline-24px.svg);
    width: 46px;
    height: 46px;
    mask-size: 46px 46px;
    mask-repeat: no-repeat;
    mask-position: center;
    position: absolute;
    bottom: 6px;
    right: 6px;
    transform:rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
}
</style>
