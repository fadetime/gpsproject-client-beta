<template>
    <div id="home">
        <div style="min-height:50px;width:100%;max-height:100px">
            <!-- 占位符 -->
        </div>
        <div style="padding:0px 20px 20px 20px">
            <img src="../../public/img/ebuyLogo.png" style="width:300px">
        </div>
        <div style="padding:10px">
            <input type="text" v-model="username" placeholder="请输入用户名">
        </div>
        <div style="padding:5px">
            <input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <div style="padding:5px;color:#d74342" v-if="errmsg">
            <span>用户名或密码错误</span>
        </div>
        <div style="padding:20px">
            <button @click="login">登 录</button>
        </div>
        <div class="bottom-info">
            <span>WAWA TECHNOLOGY</span>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import config from "../assets/js/config";

export default {
    name: "home",
    data() {
        return {
            username: "",
            password: "",
            errmsg: ""
        };
    },
    methods: {
        login() {
            axios
                .post(config.server + "/clerks/userlogin", {
                    username: this.username,
                    password: this.password
                })
                .then(doc => {
                    if (doc.data.code == 0) {
                        localStorage.drivername = doc.data.drivername;
                        localStorage.drivercard = doc.data.drivercard;
                        localStorage.driverphone = doc.data.driverphone;
                        localStorage.dirverid = doc.data.driverid;
                        localStorage.image = doc.data.image;
                        localStorage._id = doc.data._id;
                        localStorage.drivertoken = doc.data.token;
                        let item = doc.data.token;
                        this.$store.dispatch("setToken", item);
                        this.$router.push("/");
                    } else {
                        this.errmsg = doc.data.msg;
                        console.log("登录出现错误");
                        console.log(doc);
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
#home input {
    border: 1px solid #ccc;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
    -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    height: 40px;
    text-align: center;
    font-size: 20px;
}

#home input:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
}

#home button {
    width: 120px;
    height: 40px;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #d74342;
    color: #fff;
    font-weight: 500;
}

.bottom-info {
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #eee;
    box-shadow: 1px 1px;
    padding: 5px;
}
</style>
