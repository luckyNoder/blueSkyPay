<template>
    <div>
        <Card shadow>
            <div class="search_box">
                <Form :label-width="80">
                    <Button type="error" style="margin-left:10px">搜索</Button>
                </Form>
            </div>
        </Card>

        <Card shadow style="margin-top:10px">
            <Row class="adminList_wrapper">
                <Col span="24">
                    <Table :columns="columns" :data="data" :row-class-name="rowClassName">
                        <template slot-scope="{ row, index }" slot="action">
                              <Button type="warning" size="small" style="margin-right: 5px" @click="" v-if="row.pay_status === 0">补发回调</Button>
                        </template>
                        <template slot-scope="{ row, index }" slot="timer">
                            <span>{{row.pay_time | formatMoment }}</span>
                        </template>
                        <template slot-scope="{ row, index }" slot="amount">
                            <span>{{row.amount | formatMenoy }}</span>
                        </template>
                        <template slot-scope="{ row, index }" slot="real_amount">
                            <span>{{row.real_amount | formatMenoy }}</span>
                        </template>

                        <template slot-scope="{ row, index }" slot="pay_status">
                           <span v-if="row.pay_status === 1">支付成功</span>
                           <span v-if="row.pay_status === 0">未支付</span>
                        </template>
                    </Table>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
import { allOrderListFun } from "../../api/index.js";
export default {
    data() {
        return {
            pageIdex: 1,
            columns: [
                {
                    title: "用户",
                    key: "account"
                },
                {
                    title: "订单编号",
                    key: "ordernum"
                },

                {
                    title: "支付宝订单号",
                    key: "alipayorderNum"
                },
                {
                    title: "订单金额(元)",
                    slot: "amount"
                },
                {
                    title: "实际支付订单金额(元)",
                    slot: "real_amount"
                },
                {
                    title: "用户支付时间",
                    slot: "timer"
                    // CreatedAt
                },
                {
                    title: "订单支付状态",
                    slot: "pay_status"
                },
                {
                    title: "操作",
                    slot: "action"
                }
            ],
            data: []
        };
    },
    created() {
        this.getMianList();
    },
    methods: {
        getMianList() {
            var url = "/admin/order/list/0";
            var data = {
                page: this.pageIdex
            };
            allOrderListFun(url, data).then(res => {
                if (res.code === 200) {
                    this.data = res.info.list;
                    console.log(this.data);
                }
            });
        },
        rowClassName(row, index) {
            if (row.pay_status === 0) {
                return "demo-table-info-row";
            }
        }
    }
};
</script>
<style lang="less" >
 .ivu-table .demo-table-info-row td{
    // background-color: #ed4014;
    // color: #fff;
}
</style>

