<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="ios-person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="md-lock"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">用数据的心态去超越</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import {adminlogin} from '../../api/index.js'
export default {
    data() {
        return {
            form: {
                userName: "admin",
                password: "admin"
            },
            rules: {
                userName: [
                    { required: true, message: "账户不能为空", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        handleSubmit() {
            var _this = this
            debugger
            this.$refs["loginForm"].validate(valid => {
                if (valid) {
                    // this.$Message.success("Success!")
                    let params = {
                        account:_this.form.userName,
                        password:_this.form.password
                    }
                    console.log(params)
                    adminlogin('/login/admin',params).then(res =>{
                        debugger
                    })
                }
            });
        }
    }
};
</script>

<style>
</style>
