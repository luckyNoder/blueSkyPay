<template>
    <div style="min-height:100vh">
        <Card shadow>
            <div class="search_box">
                <Form :label-width="80">
                    <FormItem label="用户名" class="search_item">
                        <Input type="text" v-model="search.username" placeholder="用户名" style="width:150px">
                        </Input>
                    </FormItem>
                    <FormItem label="昵称搜索" class="search_item">
                        <Input type="text" v-model="search.username" placeholder="昵称" style="width:150px">
                        </Input>
                    </FormItem>
                     <FormItem  class="search_item">
                         <Button type="primary">搜索</Button>
                         <Button type="error" style="margin-left:10px" @click="addAdmin">新增管理员用户</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
        <Card shadow style="margin-top:10px">
            <Row class="adminList_wrapper">
                <Col span="24">
                    <Table :columns="columns1" :data="data1"></Table>
                </Col>
            </Row>
        </Card>
        <Modal v-model="addModal" title="添加管理员" @on-ok="addAdminSrue" >
            <Form :model="formLeft" label-position="right" :label-width="80" style="width:300px;text-align:center">
                <FormItem label="用户名">
                    <Input v-model="formLeft.account"></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input v-model="formLeft.password"></Input>
                </FormItem>
                <FormItem label="确认密码">
                    <Input v-model="formLeft.Repassword"></Input>
                </FormItem>
                <FormItem label="昵称">
                    <Input v-model="formLeft.nickname"></Input>
                </FormItem>
                <FormItem label="电子邮件">
                    <Input v-model="formLeft.email"></Input>
                </FormItem>
                <FormItem label="描述">
                    <Input v-model="formLeft.descript
                    "></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import { adminlist,addAdmin } from "../../api/index.js";
export default {
    name: "adminList",
    data() {
        return {
            //搜索字段
            addModal:false,
            search:{
                username:''
            },
            formLeft:{
                account:"",
                password:'',
                Repassword:'',
                nickname:'',
                email:'',
                descript:''
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
                    key: "CreatedAt"
                },
                {
                    title: "介绍",
                    key: "Descript"
                }
            ],
            data1: []
        };
    },
    created() {
        adminlist("/admin/list").then(res => {
            if (res.code === 200) {
                this.data1 = res.info.list;
                console.log(res.info.list);
            }
        });
    },
    methods:{
        addAdmin(){
            this.addModal = true
        },
        addAdminSrue(){
            debugger
        }
    }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>