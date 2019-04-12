<template>
    <div>
        <Card shadow>
            <div class="search_box">
                <Form :label-width="80">
                    <Button type="error" style="margin-left:10px" @click="addBusniess">新增商户</Button>
                </Form>
            </div>
        </Card>
        <Card shadow style="margin-top:10px">
            <Row class="adminList_wrapper">
                <Col span="24">
                    <Table :columns="columns" :data="data">
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small" style="margin-right: 5px" @click="checkBusniess(row)">审核</Button>
                            <Button type="primary" size="small" style="margin-right: 5px" @click="infoUpdate(row)">信息修改</Button>
                            <Button type="primary" size="small" style="margin-right: 5px" @click="updatePass(row)">重置密码</Button>
                            <Poptip confirm title="你确定要删除吗?" @on-ok="okdelect(row)" >
                                <Button type="primary" size="small">删除</Button>
                            </Poptip>
                        </template>
                        <template slot-scope="{ row, index }" slot="Status">
                                <span v-if="row.Status === 0" style="color:#ff9900;">待审核</span>
                                <span v-if="row.Status === 1" style="color:#19be6b">正常</span>
                                <span v-if="row.Status === -1" style="color:#ed4014">冻结</span>
                        </template>
                        <template slot-scope="{ row, index }" slot="CreatedAtsolt">
                            <span>{{row.CreatedAt | formatMoment}}</span>
                        </template>
                    </Table>
                </Col>
            </Row>
        </Card>
        <Modal v-model="addBusniessModel" :title='addorupdataTitle'  :mask-closable="false">
              <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80" style="width:300px;text-align:center" label-position="left">
                <FormItem prop="account" label='用户名'>
                    <Input type="text" v-model="formInline.account" placeholder="请填写用户名">
                    </Input>
                </FormItem>
                <FormItem prop="password" label='密码'>
                    <Input type="text" v-model="formInline.password" placeholder="请填写密码">
                    </Input>
                </FormItem>
                <FormItem prop="Repassword" label='重复密码'>
                    <Input type="text" v-model="formInline.Repassword" placeholder="请重复密码">
                    </Input>
                </FormItem>
                 <FormItem prop="access_token" label='加密Token'>
                    <Input type="text" v-model="formInline.access_token" placeholder="请填写加密Token">
                    </Input>
                </FormItem>
                <FormItem prop="callback_url" label='商户回调'>
                    <Input type="text" v-model="formInline.callback_url" placeholder="请填写加密Token">
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="error" @click="chanleModel('addBusniessModel')">取消</Button>
                <Button type="info" @click="handleaddSubmit()">确认</Button>
            </div>
        </Modal>
        <!-- 审核 -->
        <Modal v-model="checkModel" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <span>审核操作</span>
            </p>
            <div style="text-align:center">
                <RadioGroup v-model="busniessSatus">
                    <Radio label="待审核"></Radio>
                    <Radio label="正常"></Radio>
                    <Radio label="冻结"></Radio>
                </RadioGroup>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="checkBusniessSubmit">审核</Button>
            </div>
        </Modal>
        <Modal v-model="infoUpdateModel" width="360"  :mask-closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <span>修改信息</span>
            </p>
            <div style="text-align:center">
                 <Form :label-width="80"  label-position="left">
                    <FormItem label='加密Token'>
                        <Input type="text" v-model="infoUpdateObj.access_token" placeholder="Username">
                        </Input>
                    </FormItem>
                    <FormItem label='商户回调'>
                        <Input type="text" v-model="infoUpdateObj.callback_url" placeholder="Username">
                        </Input>
                    </FormItem>
                 </Form>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="infoUpdateSubmit">修改</Button>
            </div>
        </Modal>
        <!-- 修改密码 -->
         <Modal v-model="updatePassModel" width="360"  :mask-closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <span>重置密码</span>
            </p>
            <div style="text-align:center">
                 <Form :label-width="80"  label-position="left">
                    <FormItem label='新密码'>
                        <Input type="text" v-model="updatePassObj.password" placeholder="请填写新密码">
                        </Input>
                    </FormItem>
                    <FormItem label='重复密码'>
                        <Input type="text" v-model="updatePassObj.rePassword" placeholder="请重复新密码">
                        </Input>
                    </FormItem>
                 </Form>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="updatePassSubmit">修改</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import {businessList,addBusiness,deleteBusiness,checkBusniess,infoUpdateFun,updatePassFun} from '../../api/index.js'
export default {
    data() {
        return {
            updatePassModel:false,
            infoUpdateModel:false,
            checkModel:false,
            busniessSatus:'',
            businessItem:'',
            addBusniessModel:false,
            pageindex:0,
            columns: [
                {
                    title: "用户名",
                    key: "Account"
                },

                {
                    title: "AccessToken",
                    key: "AccessToken"
                },
                {
                    title: "回调地址",
                    key: "CallbackUrl"
                },
                 {
                    title: "注册时间",
                    slot: "CreatedAtsolt"
                },
                {
                    title: "状态",
                    slot: "Status"
                },
                {
                    title: "操作",
                    slot: "action"
                }
            ],
            data:[],
            formInline:{
                account:'',
                password:'',
                Repassword:'',
                access_token:'',
                callback_url:''
            },
            ruleInline:{
                account:[
                    { required: true, message: '账户名不能为空', trigger: 'blur' }
                ],
                password:[
                     { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                Repassword:[
                     { required: true, message: '重复密码不能为空', trigger: 'blur' }
                ],
                access_token:[
                     { required: true, message: 'Token不能为空', trigger: 'blur' }
                ],
                callback_url:[
                     { required: true, message: '回调地址不能为空', trigger: 'blur' }
                ]
            },
            infoUpdateObj:{
                access_token:'',
                callback_url:''
            },
            infoUpdateItem:'',
            updatePassObj:{
                password:'',
                rePassword:''
            },
            updatePassItem:''
        };
    },
    computed:{
        addorupdataTitle(){
            if(this.addBusniessModel){
                return '新增商户'
            }
        }
    },
    created(){
        this.getBusniessList()
    },
    methods:{
        getBusniessList(){
            businessList('/admin/user/list',{page:this.pageindex}).then(res =>{
                this.data = res.info.list
            })
        },
        addBusniess(){
            this.addBusniessModel = true
        },
        handleaddSubmit(){
            var _this = this
            if(this.formInline.password !== this.formInline.Repassword){
                this.$Message.error('2次密码不同样')
                return false
            }
            this.$refs['formInline'].validate((valid) =>{
                if(valid){
                    var data = {
                        account:this.formInline.account,
                        password:this.formInline.password,
                        Repassword:this.formInline.Repassword,
                        access_token:this.formInline.access_token,
                        callback_url:this.formInline.callback_url
                    }
                    addBusiness('/login/reg',data).then( res =>{
                        if(res.code === 200){
                            this.$Message.success({
                                content:'添加成功',
                                onClose(){
                                    _this.addBusniessModel = false
                                    _this.getBusniessList()
                                }
                            })
                        }else{
                             this.$Message.info(res.info)
                        }
                    })
                }else{

                }
             })
        },
        // 关闭model层
        chanleModel( type ){
            this[type] = false
            this.formInline = {}
        },
        okdelect( row ){
            var _this = this
            deleteBusiness('/admin/del/user',row.ID).then(res =>{
                if(res.code === 200){
                     this.$Message.success({
                        content:'删除成功',
                        onClose(){
                            _this.getBusniessList()
                        }
                    })
                }
            })
        },
        checkBusniess(row){
            this.businessItem = row
            this.checkModel = true
            switch (row.Status) {
                case 1:
                    this.busniessSatus = '正常'
                    break;
                case 0:
                    this.busniessSatus = '待审核'
                    break;
                case -1:
                    this.busniessSatus = '冻结'
                    break;
                default:
                    break;
            }
        },
        checkBusniessSubmit(){
            var _this = this
            var data  = {}
            switch (this.busniessSatus) {
                case "正常":
                    data.status = 1
                    break;
                case "待审核":
                    data.status = 0
                    break;
                case "冻结":
                    data.status = -1
                    break;
                default:
                    break;
            }
            var url = '/admin/user/verify/' + this.businessItem.ID
            checkBusniess(url,data).then(res =>{
                if(res.code === 200){
                     this.$Message.success({
                        content:'审核成功',
                        onClose(){
                            _this.checkModel = false
                            _this.getBusniessList()
                        }
                    })
                }
            })
        },
        infoUpdate(item){
            this.infoUpdateObj.access_token = item.AccessToken
            this.infoUpdateObj.callback_url = item.CallbackUrl
            this.infoUpdateItem = item
            this.infoUpdateModel = true
        },
        infoUpdateSubmit(){
            var _this = this
            var url =  '/admin/user/update/'+this.infoUpdateItem.ID
            if(!this.infoUpdateObj.access_token){
                this.$Message.error('请填写Token信息')
                return false
            }
            if(!this.infoUpdateObj.callback_url){
                this.$Message.error('请填写回调地址')
                return false
            }
            var data = {
                access_token: this.infoUpdateObj.access_token,
                callback_url:this.infoUpdateObj.callback_url
            }
            infoUpdateFun(url,data).then(res =>{
                if(res.code === 200){
                    this.$Message.success({
                        content:'审核成功',
                        onClose(){
                            _this.infoUpdateModel = false
                            _this.getBusniessList()
                        }
                    })
                }
            })
        },
        updatePass(item){
            this.updatePassModel = true
            this.updatePassItem = item
        },
        updatePassSubmit(){
            var _this = this
            var url = '/admin/update/user/password/'+ this.updatePassItem.ID
            var data = {
                password: this.updatePassObj.password,
                Repassword:this.updatePassObj.rePassword
            }
            if(!this.updatePassObj.password){
                this.$Message.error('请填写新密码')
                return false
            }
            if(!this.updatePassObj.rePassword){
                this.$Message.error('请填写重复新密码')
                return false
            }
            updatePassFun(url,data).then(res =>{
                if(res.code === 200){
                    this.$Message.success({
                        content:'修改成功',
                        onClose(){
                            _this.updatePassModel = false
                            _this.getBusniessList()
                        }
                    })
                }
            })
        }
    }
};
</script>
