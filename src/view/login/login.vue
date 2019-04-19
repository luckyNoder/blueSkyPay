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
                         <FormItem >
                            <RadioGroup v-model="form.animal">
                                <Radio label="管理员登录"></Radio>
                                <Radio label="商户登录"></Radio>
                            </RadioGroup>
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
import {adminlogin,businesslogin} from '../../api/index.js'
import {setToken,setbusniessID,setAccess} from '@/libs/util.js'
 import {mapMutations} from 'vuex';
export default {
    data() {
        return {
            form: {
                userName: this.userName,
                password: this.password,
                animal:'商户登录'
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
        ...mapMutations({
            // setAccess
        }),
        handleSubmit() {
            var _this = this
            // if(!this.form.animal ){
            //     debugger
            //      this.$Message.info('请填写登录角色')
            //      return
            // }
            this.$refs["loginForm"].validate(valid => {
                if (valid) {
                    let params = {
                        account:_this.form.userName,
                        password:_this.form.password
                    }
                    if(!this.form.animal ){
                        this.$Message.info('请填写登录角色')
                        return
                    }``
                    if(this.form.animal === '管理员登录'){
                         adminlogin('/login/admin',params).then(res =>{
                             debugger
                            if(res.code === 200){
                                setToken(res.info.Token)
                                setAccess('admin')
                                this.$store.commit('setAccess',"admin")
                                this.$router.push('/')
                            }else{
                                this.$Message.warning(res.info)
                            }
                        })
                    }
                    if(this.form.animal === '商户登录'){
                        businesslogin('/login',params).then(res =>{
                             if(res.code === 200){
                                setToken(res.info.Token)
                                setbusniessID(res.info.ID)
                                setAccess('busniess')
                                this.$store.commit('setAccess',"busniess")
                                this.$router.push('/')
                            }else{
                                this.$Message.warning(res.info)
                            }
                        })
                    }
                }
            });
        }
    }
};
</script>

<style>
</style>
