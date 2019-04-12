<template>
    <div style="min-height:100vh">
        <Card shadow>
            <div class="search_box">
                <Form :label-width="80">
                    <Button type="error" style="margin-left:10px" @click="addAdmin">新增管理员用户</Button>
                </Form>
            </div>
        </Card>
        <Card shadow style="margin-top:10px">
            <Row class="adminList_wrapper">
                <Col span="24">
                    <Table :columns="columns1" :data="data1" >
                        <template slot-scope="{ row, index }" slot="timer">
                             <span>{{row.CreatedAt | formatMoment}}</span>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small" style="margin-right: 5px" @click="updataAdmin(index)">密码修改</Button>
                            <!--<Button type="primary" size="small" @click="removeadmin(row)">删除</Button>-->
                            <Poptip confirm title="你确定要删除吗?" @on-ok="okdelect(row)" >
                                <!--<Button>Delete</Button>-->
                                <Button type="primary" size="small">删除</Button>
                            </Poptip>
                        </template>
                    </Table>
                </Col>
            </Row>
        </Card>
        <Modal v-model="addModal" title="添加管理员"   @on-cancel="handleReset('formCustom')">
            <Form ref="formCustom" :model="formCustom"  :rules="ruleCustom" label-position="right" :label-width="80" style="width:300px;text-align:center">
                <FormItem label="用户名" prop="account">
                    <Input v-model="formCustom.account"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="formCustom.password"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="Repassword">
                    <Input v-model="formCustom.Repassword"></Input>
                </FormItem>
                <FormItem label="昵称" prop="nickname">
                    <Input v-model="formCustom.nickname"></Input>
                </FormItem>
                <FormItem label="电子邮件" prop="email">
                    <Input v-model="formCustom.email"></Input>
                </FormItem>
                <FormItem label="描述" prop="descript">
                     <Input v-model="formCustom.descript" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="error"  @click="handleReset('formCustom')">取消</Button>
                <Button type="info"  @click="addAdminSrue('formCustom')">确认</Button>
            </div>
        </Modal>

        <Modal v-model="updateAdminModal"  title="修改密码"  @on-cancel="updateReset()"  :mask-closable="false">
            <Form label-position="right" ref="updataForm" :label-width="80" style="width:300px;text-align:center">
                <FormItem label="新密码" >
                    <Input v-model="updataForm.newpass"></Input>
                </FormItem>
                <FormItem label="重复新密码" >
                    <Input v-model="updataForm.repeatpass"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="error"  @click="updateReset">取消</Button>
                <Button type="info"  @click="updateSrue">确认</Button>
            </div>

        </Modal>
    </div>
</template>
<script>
import { adminlist,addAdmin,deleteAdmin,updateAdminPass } from "../../api/index.js";
export default {
    name: "adminList",
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('重复密码不能为空'));
            } else {
                if (value !== this.formCustom.password) {
                     callback(new Error('2次密码不相同'));
                }
                callback();
            }
        }
        return {

            //搜索字段
            loading:true,
            addModal:false,
            updateAdminModal:false,
            search:{
                username:''
            },
            updataForm:{
                newpass:'',
                repeatpass:''
            },
            formCustom:{
                account:"",
                password:'',
                Repassword:'',
                nickname:'',
                email:'',
                descript:''
            },
            ruleCustom:{
                account:[
                    { required: true, message: '账户名不能为空', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                Repassword:[
                    { validator:validatePass,trigger: 'blur' }
                ],
                nickname:[
                    { required: true, message: '昵称不能为空', trigger: 'blur' }
                ],
                email:[
                    { required: true, message: '邮件不能为空', trigger: 'blur' }
                ],
                descript:[
                    { required: true, message: '描述不能为空', trigger: 'blur' }
                ]
            },
            dark: "light",
            columns1: [
                {
                    title: "用户名",
                    key: "Account"
                },

                {
                    title: "昵称",
                    key: "Nickname"
                },
                {
                    title: "Email",
                    key: "Email"
                },
                {
                    title: "创建时间",
                    slot: "timer"
                    // CreatedAt
                },
                {
                    title: "介绍",
                    key: "Descript"
                },
                {
                    title: "操作",
                    slot: "action"
                }
            ],
            data1: []
        };
    },
    created() {
        this.getmainList()
    },
    methods:{
        getmainList(){
            adminlist("/admin/list").then(res => {
                if (res.code === 200) {
                    this.data1 = res.info.list;
                }
            });
        },
        addAdmin(){
            this.addModal = true
        },
        updataAdmin(){
            this.updateAdminModal = true
        },
        addAdminSrue (name) {
            var data = {
                account: this.formCustom.account,
                password:this.formCustom.password,
                Repassword : this.formCustom.Repassword,
                nickname: this.formCustom.nickname,
                descript: this.formCustom.descript,
                email: this.formCustom.email
            }
            this.$refs[name].validate((valid) => {
                if (valid) {
                    addAdmin('/admin/add',data).then(res =>{
                        if(res.code === 200){
                            this.addModal = false
                             this.getmainList()
                        }else{
                            this.$Message(res.info)
                        }

                    })
                } else {
                    // this.$Message.error('Fail!');
                }
            })
        },
        handleReset(name){
            this.formCustom = {}
            this.addModal = false
        },
        updateReset(){
            this.updataForm = {}
            this.updateAdminModal = false
        },
        okdelect(item){
            deleteAdmin('/admin/del',item.ID).then(res =>{
                if(res.code === 200){
                    this.$Message.info({

                    });
                    this.getmainList()
                }
                debugger
            })
        },
        updateSrue(){
            var _this = this
            if(!this.updataForm.newpass && !this.updataForm.repeatpass){
                this.$Message.error("请填写完整密码信息")
                return false
            }
            if(this.updataForm.newpass !== this.updataForm.repeatpass){
                this.$Message.error("2次密码不匹配")
                return false
            }
            var url = '/admin/update/password/1'
            var params = {
                password:this.updataForm.newpass,
                Repassword:this.updataForm.repeatpass
            }
            updateAdminPass(url,params).then(res => {
                if(res.code === 200){
                    this.$Message.success({
                        content:'修改成功',
                        onClose:function(){
                            _this.updateAdminModal = false
                        }
                    })
                }

            })
        }
    }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>