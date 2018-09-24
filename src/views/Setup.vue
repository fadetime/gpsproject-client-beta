<template>
	<div id="setup">
		<div class="top">
			<div class="top-pic" v-if="!driverimage">
				<img src="../../public/img/ebuyLogo.png" alt="Avatar" />
			</div>
			<div class="top-pic" v-else>
				<img :src="driverimage | imgurl" alt="Avatar">
			</div>
			<div class="top-title">
				<span>{{drivername}}</span>
			</div>
		</div>
        
        
		<div class="center">
			<md-card style="width:80%;margin:10px auto;">
				<div class="card-item">
					<div class="card-item-title">
						<span>驾照类型</span>
					</div>
					<div class="card-item-body">
						<md-icon style="color:#d74342">commute</md-icon>
						<span>{{drivercard}}</span>
					</div>
				</div>

				<div class="card-item">
					<div class="card-item-title">
						<span>联系方式</span>
					</div>
					<div class="card-item-body">
						<md-icon style="color:#d74342">phone</md-icon>
						<span>{{driverphone}}</span>
					</div>
				</div>

				<div class="card-item">
					<div class="card-item-title">
						<span>准证号码</span>
					</div>
					<div class="card-item-body">
						<md-icon style="color:#d74342">assignment_ind</md-icon>
						<span>{{driverid}}</span>
					</div>
				</div>
			</md-card>
		</div>

		<div class="bottom">
			<md-button class="md-raised md-primary" style="width:80%" @click="showDialog = true">修改密码</md-button>
		</div>
		<!-- 遮罩层 -->
		<transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div v-if="showDialog" class="dialog" @click.self="showDialog = false">
				<div class="dialog-body">
					<div style="width:100%;background-color:#d74342;box-shadow: 1px 1px 5px;">
						<span style="font-size:20px;color:#fff;line-height: 32px;">修改密码</span>
					</div>
					<div class="dialog-body-center">
						<div style="width:250px;margin:10px auto;box-shadow:1px 1px 5px">
							<div class="dialog-body-center-item" style="border-bottom: 1px solid #eee;">
								<div class="dialog-body-center-item-left">
									<label for="oldpsw">原始密码</label>
								</div>
								<div class="dialog-body-center-item-right">
									<input type="password" id="oldpsw" placeholder="请输入原始密码" v-model="oldpassword">
								</div>
							</div>
							<div class="dialog-body-center-item" style="border-bottom: 1px solid #eee;">
								<div class="dialog-body-center-item-left">
									<label for="newpsw">新密码</label>
								</div>
								<div class="dialog-body-center-item-right">
									<input type="password" id="newpsw" placeholder="请输入新密码" v-model="newpassword">
								</div>
							</div>
							<div class="dialog-body-center-item">
								<div class="dialog-body-center-item-left">
									<label for="confirmpsw">确认密码</label>
								</div>
								<div class="dialog-body-center-item-right">
									<input id="confirmpsw" type="password" placeholder="请确认新密码" v-model="conpassword">
								</div>
							</div>
						</div>
					</div>
					<div class="dialog-body-bottom">
						<md-button class="md-raised" @click="showDialog = false">取消</md-button>
						<md-button class="md-raised md-primary" @click="confirmChangePsw">确认</md-button>
					</div>
				</div>
			</div>
		</transition>
		<!-- 遮罩层 -->
		<!-- 操作提示 -->
		<transition name="custom-classes-transition" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
			<div class="errinfo" v-if="showError">
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
            showDialog: false,
            drivername: "",
            drivercard: "",
            driverphone: "",
            driverid: "",
            driverimage: "",
            errorInfo: "",
            oldpassword: "",
            newpassword: "",
            conpassword: "",
            showError: false,
            _id: ""
        };
    },
    mounted() {
        this.drivername = localStorage.getItem("drivername");
        this.drivercard = localStorage.getItem("drivercard");
        this.driverphone = localStorage.getItem("driverphone");
        this.driverid = localStorage.getItem("dirverid");
        this.driverimage = localStorage.getItem("image");
    },
    methods: {
        confirmChangePsw() {
            if (!this.oldpassword) {
                this.errorInfo = "请填写旧密码";
                this.showError = true;
            } else if (!this.newpassword) {
                this.errorInfo = "请填写新密码";
                this.showError = true;
            } else if (!this.conpassword) {
                this.errorInfo = "请确认新密码";
                this.showError = true;
            } else if (this.newpassword != this.conpassword) {
                this.errorInfo = "两次输入密码不一致";
                this.showError = true;
            } else {
                console.log("comit mission");
                this._id = localStorage.getItem("_id");
                axios
                    .post(config.server + "/client-driver/change", {
                        oldpassword: this.oldpassword,
                        newpassword: this.newpassword,
                        conpassword: this.conpassword,
                        _id: this._id
                    })
                    .then(doc => {
						this.oldpassword = "";
                            this.errorInfo = doc.data.msg;
                            this.showError = true;
                        if (doc.data.code === 0) {
                            this.showDialog=false
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            setTimeout(() => {
                this.showError = false;
            }, 2000);
        }
    }
};
</script>

<style scoped>
.top {
    background-image: url(../../public/img/setup-backgroundimg.jpeg);
    background-size: 100% 100%;
    height: 200px;
    box-shadow: 1px 1px 5px;
}

.top-pic {
    background-color: white;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 100%;
    position: relative;
    top: 24px;
    box-shadow: 1px 1px 5px;
    overflow: hidden;
}

.top-pic img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.top-title {
    position: relative;
    top: 36px;
    background-color: rgba(0, 0, 0, 0.5);
    width: 200px;
    margin: 0 auto;
    padding: 8px 0;
    border-radius: 20px;
}

.top-title span {
    font-size: 20px;
    color: #fff;
}

.card-item {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
}

.card-item-title {
    text-align: left;
    padding: 0 0 15px 20px;
    font-size: 20px;
}

.card-item-title span {
    color: #989898;
}

.card-item-body {
    text-align: left;
    padding-left: 30px;
}

.card-item-body span {
    padding-left: 10px;
    font-size: 18px;
}

.dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 14;
    display: flex;
    align-items: center;
}

.dialog-body {
    background-color: #fff;
    width: 300px;
    height: 260px;
    margin: 0 auto;
}

.dialog-body-center-item {
    display: flex;
    display: -webkit-flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    padding: 10px 5px;
}

.dialog-body-center-item-left {
    flex-basis: 30%;
    text-align: left;
    font-size: 16px;
    line-height: 32px;
}

.dialog-body-center-item-right {
    flex-basis: 70%;
}

.dialog-body-center-item-right input {
    width: 150px;
    border: none;
    height: 32px;
}

.errinfo {
    position: fixed;
    z-index: 19;
    top: 8px;
    background-color: rgba(255, 255, 0, 0.6);
    width: 100%;
}

.errinfo span {
    font-size: 16px;
    line-height: 32px;
}


</style>
