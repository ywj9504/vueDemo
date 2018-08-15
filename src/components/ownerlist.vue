<template>
    <div class="fillcontain">
      <head-top></head-top>
      <div class="table_container">
        <el-table
          :data = "tableData"
          highlight-current-row
          style="width: 100%">
          <el-table-column
            type="index"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
          prop="areasnum"
          label="资源区域数量">
        </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button
                size="mini"
                @click="handleSearch(scope.$index)">查看
              </el-button>
              <!--<el-button-->
                <!--size="mini"-->
                <!--@click="handleSearch(scope.$index)">更改-->
              <!--</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <!--<div class="Pagination" style="text-align: left;margin-top: 10px;">-->
          <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPage"-->
            <!--:page-size="20"-->
            <!--layout="total, prev, pager, next"-->
            <!--:total="count">-->
          <!--</el-pagination>-->
        <!--</div>-->
      </div>
    </div>
</template>

<script>
    import HeadTop from "./headTop";
    export default {
        name: "ownerlist",
      data(){
          return{
            tableData:[],
            currentRow: null,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
          }
      },
      components: {HeadTop},
      created(){
          this.initData();
      },
      methods:{
          async initData(){
            let url = '/users/all/';
            this.$axios.get(url)
              .then(res=>{
                this.tableData = [];
                res.data.forEach(item =>{
                  const tD = {};
                  tD.id = item.id;
                  tD.username = item.username;
                  tD.areasnum = item.areas.length;
                  this.tableData.push(tD);
                })
              }).catch(error=>{
              console.log(error.data);
            });
          },
          handleSearch: function (index) {
            let a = this.tableData[index].id;
            console.log(a);
            this.$router.push({path:'/arealist',query:{userid:a}});
          }
      },
      // handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      // },
      // handleCurrentChange(val) {
      //   this.currentPage = val;
      //   this.offset = (val - 1)*this.limit;
      //   this.getUsers()
      // },
      // async getUsers(){
      //   const Users = await getUserList({offset: this.offset, limit: this.limit});
      //   this.tableData = [];
      //   Users.forEach(item => {
      //     const tableData = {};
      //     tableData.username = item.username;
      //     tableData.registe_time = item.registe_time;
      //     tableData.city = item.city;
      //     this.tableData.push(tableData);
      //   })
      // }
    }
</script>

<style lang="less">
  @import '../style/mixin';
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .table_container{
    padding: 20px;
  }
  .Pagination{
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
