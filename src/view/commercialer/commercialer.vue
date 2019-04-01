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
            <Row style="margin-bottom: 20px;"><Button type="primary" @click="addUser">添加用户</Button></Row>
            <Row class="adminList_wrapper">
                <Col span="24">
                    <Table :columns="columns1" :data="data1"></Table>
                </Col>
            </Row>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :page-size="pageSize" :current="page" @on-change="changePage" show-total></Page>
                </div>
            </div>
        </Card>
        <Modal v-model="isShowPass" title="修改密码" @on-ok="confirmModifyPass" >
            <Form :model="formLeft" label-position="right" :label-width="80" style="width:300px;text-align:center">
                <FormItem label="新密码">
                    <Input v-model="formLeft.password"></Input>
                </FormItem>
                <FormItem label="确认密码">
                    <Input v-model="formLeft.Repassword"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="isShowProfile" title="修改资料" @on-ok="confirmModifyProfile" >
            <Form :model="profileForm" label-position="right" :label-width="80" style="width:300px;text-align:center">
                <FormItem label="加密token" required>
                    <Input v-model="profileForm.access_token"></Input>
                </FormItem>
                <FormItem label="商户回调地址" required>
                    <Input v-model="profileForm.callback_url"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="isShowCheck" title="审核用户" @on-ok="confirmCheck">
            <RadioGroup v-model="checkStatus">
                <Radio  v-for="value in statusMap" :label="value[0]" :key="value[0]">{{value[1]}}</Radio>
                <!--<Radio label="爪哇犀牛"></Radio>-->
                <!--<Radio label="印度黑羚"></Radio>-->
            </RadioGroup>
        </Modal>
        <Modal v-model="isAddUser" title="添加用户" @on-ok="confirmAddUser" >
            <Form :model="userForm"  ref="userForm" :rules="ruleValidate" label-position="right" :label-width="100" style="width:300px;text-align:center">
                <FormItem label="用户名" prop="account">
                    <Input v-model="userForm.account"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="userForm.password"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="Repassword">
                    <Input v-model="userForm.Repassword"></Input>
                </FormItem>
                <FormItem label="加密Token" prop="access_token">
                    <Input v-model="userForm.access_token"></Input>
                </FormItem>
                <FormItem label="商户回调地址" prop="callback_url">
                    <Input v-model="userForm.callback_url"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
// import { adminlist, addAdmin } from '../../api/index.js'
import { getUserList, deleteUser, modifyPass, updateUserInfo, verifyUser, addUser } from '../../api/userManage'
export default {
  name: 'adminList',
  data () {
    return {
      // 搜索字段
      addModal: false,
      isAddUser: false,
      isShowPass: false,
      isShowProfile: false,
      isShowCheck: false,
      checkStatus: 0,
      operateUser: {},
      search: {
        username: ''
      },
      statusMap: new Map([[1, '正常'], [-1, '冻结'], [0, '待审核']]),
      page: 1,
      pageSize: 10,
      total: 0,
      userForm: {
        account: '',
        password: '',
        Repassword: '',
        access_token: '',
        callback_url: ''
      },
      ruleValidate: {
        account: [{
          required: true, message: 'The name cannot be empty', trigger: 'blur'
        }],
        password: [{
          required: true, message: 'The name cannot be empty', trigger: 'blur'
        }],
        Repassword: [{
          required: true, message: 'The name cannot be empty', trigger: 'blur'
        }],
        access_token: [{
          required: true, message: 'The name cannot be empty', trigger: 'blur'
        }],
        callback_url: [{
          required: true, message: 'The name cannot be empty', trigger: 'blur'
        }]

      },
      formLeft: {
        password: '',
        Repassword: ''
      },
      profileForm: {
        access_token: '',
        callback_url: ''
      },
      dark: 'light',
      columns1: [
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center'
        // },
        {
          title: '用户名',
          key: 'Account'
        },
        {
          title: '创建时间',
          width: 200,
          key: 'CreatedAt',
          render: (h, params) => {
            let time = new Date(params.row.CreatedAt).getTime()
            let date = this.format(time)
            // // let statusMap = new Map([[1, '正常'], [-1, '冻结'], [0, '待审核']])
            return h('span', {
              props: {}
            }, date)
          }
        },
        {
          title: '用户状态',
          width: 100,
          key: 'Status',
          render: (h, params) => {
            let status = params.row.Status
            console.log(params)
            // let statusMap = new Map([[1, '正常'], [-1, '冻结'], [0, '待审核']])
            return h('span', {
              props: {}
            }, this.statusMap.get(status))
          }
        },
        {
          title: 'token',
          key: 'AccessToken'
        },
        {
          title: '商户回调地址',
          key: 'CallbackUrl'
        },
        {
          title: '操作',
          key: 'operate',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                style: {
                  marginRight: '10px'
                },
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.operateUser = params.row
                    this.checkStatus = this.operateUser.Status
                    this.isShowCheck = true
                  }
                }
              }, '审核'),
              h('Button', {
                style: {
                  marginRight: '10px'
                },
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // console.log(params)
                    this.deleteUser(params.row.ID)
                  }
                }
              }, '删除'), h('Button', {
                style: {
                  marginRight: '10px'
                },
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modifyProfile(params.row)
                  }
                }
              }, '修改资料'),
              h('Button', {
                attrs: {
                  style: {
                    'margin-right': '10px'
                  }
                },
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.isShowPass = true
                    this.operateUser = params.row
                  }
                }
              }, '修改密码')
            ])
          }
        }
      ],
      data1: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    changePage (val) {
      this.page = val
      this.getUserList()
    },
    addUser () {
      this.isAddUser = true
    },
    deleteUser (id) {
      deleteUser(id).then(r => {
        if (r.code === 200) {
          this.$Message.success('This is a success tip')
          this.page = 1
          this.getUserList()
        }
      }).catch(() => {
        this.$Message.error('This is a error tip')
      })
    },
    confirmAddUser () {
      debugger
      this.$refs['userForm'].validate(valid => {
        if (valid) {
          addUser(this.userForm).then(r => {
            if (r.code === 200) {
              this.$Message.success('添加成功')
              this.page = 1
              this.getUserList(1)
            }
          })
        } else {
          this.$Message.success('添加失败')
        }
      })
    },
    add0 (m) { return m < 10 ? '0' + m : m },
    format (shijianchuo) {
      let time = new Date(shijianchuo)
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      let h = time.getHours()
      let mm = time.getMinutes()
      let s = time.getSeconds()
      return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    },
    getUserList () {
      let params = {
        page: this.page
      }
      getUserList(params).then(r => {
        if (r.code === 200) {
          this.data1 = r.info.list
          this.total = r.info.total
          console.log(r.info.list)
        }
      })
    },
    modifyProfile (user) {
      this.isShowProfile = true
      this.operateUser = user
      this.profileForm = {
        access_token: user.AccessToken,
        callback_url: user.CallbackUrl
      }
      console.log(params)
    },
    confirmModifyPass () {
      let id = this.operateUser.ID
      modifyPass(id, this.formLeft).then(r => {
        if (r.code === 200) {
          this.$Message.success('修改成功')
          this.formLeft = {
            password: '',
            RePassword: ''
          }
          this.getUserList()
        }
      })
    },
    confirmModifyProfile () {
      let id = this.operateUser.ID
      updateUserInfo(id, this.profileForm).then(r => {
        if (r.code === 200) {
          debugger
          this.$Message.success('修改成功')
          this.getUserList()
        }
      })
    },
    confirmCheck () {
      let id = this.operateUser.ID
      let params = { status: this.checkStatus }
      verifyUser(id, params).then(r => {
        if (r.code === 200) {
          this.$Message.success('修改成功')
          this.getUserList()
        }
      })
    },
    addAdmin () {
      this.addModal = true
    },
    addAdminSrue () {
      debugger
    }
  }
}
</script>

<style lang="less" scoped>
    @import url("../adminList/index.less");
</style>
