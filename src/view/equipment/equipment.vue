<template>
    <div>
        <Card shadow style="margin-top:10px">
            <Row class="adminList_wrapper">
                <Col span="24">
                    <Table :columns="columns" :data="data">
                        <!-- <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small" style="margin-right: 5px" @click="checkBusniess(row)">审核</Button>
                            <Button type="primary" size="small" style="margin-right: 5px" @click="infoUpdate(row)">信息修改</Button>
                            <Button type="primary" size="small" style="margin-right: 5px" @click="updatePass(row)">重置密码</Button>
                            <Poptip confirm title="你确定要删除吗?" @on-ok="okdelect(row)" >
                                <Button type="primary" size="small">删除</Button>
                            </Poptip>
                        </template>-->
                        <template slot-scope="{ row, index }" slot="Online">
                                <span v-if="row.Online === 0" style="color:#ff9900;">未在线</span>
                                <span v-if="row.Online === 1" style="color:#19be6b">在线</span>
                        </template>
                        <template slot-scope="{ row, index }" slot="CreatedAt">
                            <span>{{row.CreatedAt | formatMoment}}</span>
                        </template>
                    </Table>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
import {businessEquipment} from '../../api/index.js'
export default {
    data() {
        return {
            pageindex:0,
            online:'',
            columns: [
                {
                    title: "创建时间",
                    slot: "CreatedAt"
                },

                {
                    title: "Uid",
                    key: "Uid"
                },
                {
                    title: "MacUuid",
                    key: "MacUuid"
                },
                 {
                    title: "WsId",
                    key: "WsId"
                },
                {
                    title: "设备状态",
                    slot: "Online"
                }
            ],
            data:[],
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
            var data = {
                page:this.pageindex,
                online:this.online
            }
            businessEquipment('/user/mac/list',data).then(res =>{
                if(res.code === 200){
                    this.data = res.info.list
                }
            })
        }
    }
};
</script>
