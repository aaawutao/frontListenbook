<template>
  <div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="did"
      label="部门编号"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="dname"
      label="部门名称"
      width="120px">
    </el-table-column>
    <el-table-column label="操作" fixed="right" width="120px">
      <template slot-scope="scope">
        <el-button type="primary" @click="permissionset(scope.row.did)">
          权限分配
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog width="40%" title="权限操作" :visible="logstate"  :before-close="handleClose">
    <el-tree ref="tree"
             :data="treeMenus"
             :props="multiProps"
             :show-checkbox="true"
             node-key="id"
             highlight-current
             :expand-on-click-node="true"
             :check-strictly="true"
             @check="clickDeal">
    </el-tree>
    <el-button type="primary" @click="edit()">修改权限</el-button>
  </el-dialog>
  </div>
</template>

<script>
  //menuid menuname menuurl
  /**
   *id: 1, menuid
   parentId: -1, menuparentid
   label: '一级 1',
   children:
   *
   *
   * */
  export default {
    name: 'PermissionSetting',
    data() {
      return {
        logstate:false,
        tableData:[],
        treeMenus: [],
        multiProps: {
          children: 'children',
          label: 'menuname',
          id:'menuid',
        }
      };
    },
    mounted(){
      this.getDepartment();
      this.getmenu();
    },
    methods: {
      getmenu () {
        this.$axios.get("backstage/menu/menushow").then(response => {
          this.treeMenus = response.data;
        })
      },
      //获取部门 注意 箭头函数才能设置到值
      getDepartment () {
        this.$axios.get("backstage/departmentinfo/departmentinfoAll").then(response => {
          this.tableData = response.data;
        })
      },
      //获取部门所拥有的权限
      permissionset (did) {
        this.logstate = true;
        this.$axios.post("backstage/menu/getids", {"did": did}).then(response => {
          let ids = new Array();
          for (let i in response.data) {
            ids[i] = response.data[i].menuid;
          }
          //设置值
          this.$refs.tree.setCheckedKeys(ids);
        });
      },
      handleClose () {
        this.logstate = false;
      },
      edit () {
        alert(this.$refs.tree.getCheckedKeys());
      },

      clickDeal (currentObj, treeStatus) {
        this.clickCheck(currentObj, treeStatus, this.$refs.tree)
      },
      clickCheck(currentObj, treeStatus, ref) {
        // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
        let selected = treeStatus.checkedKeys.indexOf(currentObj.id); // -1未选中
        // 选中
        if (selected !== -1) {
          // 子节点只要被选中父节点就被选中
          this.selectedParent(currentObj, ref);
          // 统一处理子节点为相同的勾选状态
          this.uniteChildSame(currentObj, true, ref);
        } else {
          // 取消子节点的选中状态触发
          if (currentObj.parentId !== -1) {
            this.removeParent(currentObj, ref);
          }

          // 未选中 处理子节点全部未选中
          if (currentObj.children.length !== 0) {
            this.uniteChildSame(currentObj, false, ref);
          }
        }
      },

      /**   统一处理子节点为相同的勾选状态  **/
      uniteChildSame(treeList, isSelected, ref) {
        let treeListData = treeList.children;
        let len = treeListData.length;

        ref.setChecked(treeList.id, isSelected);

        for (let i = 0; i < len; i++) {
          this.uniteChildSame(treeListData[i], isSelected, ref);
        }
      },

      /**    统一处理父节点为选中    **/
      selectedParent(currentObj, ref) {
        let currentNode = ref.getNode(currentObj);
        if (currentNode.parent.key !== undefined) {
          ref.setChecked(currentNode.parent, true);
          return this.selectedParent(currentNode.parent, ref);
        }
      },

      /**    子节点全没选中取消父级的选中状态   **/
      removeParent(currentObj, ref) {
        let a = 0;
        let b = 0;
        let currentNode = ref.getNode(currentObj);
        if (currentNode.parent !== null) {
          if (currentNode.parent.key !== undefined) {
            ref.setChecked(currentNode.parent, true); //根节点
            this.removeParent(currentNode.parent, ref); //递归判断子节点
          }
        }

        //不为0表示为父节点
        if (currentNode.childNodes.length !== 0) {

          //循环判断父节点下的子节点
          for (let i = 0; i < currentNode.childNodes.length; i++) {

            //判断父节点下的子节点是否全为false
            if (currentNode.childNodes[i].checked === false) {
              ++a;

              //a === currentNode.childNodes.length 表明子节点全为false
              if (a === currentNode.childNodes.length) {

                //等于 undefined 跳过,不等于继续执行
                if (currentNode.childNodes[i].parent.key !== undefined) {
                  ref.setChecked(currentNode.childNodes[i].parent, false); //父元素设置为false
                  //循环上级父节点下的子节点
                  for (let i = 0; i < currentNode.parent.childNodes.length; i++) {

                    //判断父节点下的子节点是否全为false
                    if (currentNode.parent.childNodes[i].checked === false) {
                      ++b;

                      //b === currentNode.parent.childNodes.length 表明子节点全为false
                      if (b === currentNode.parent.childNodes.length) {
                        ref.setChecked(currentNode.parent.key, false); //父元素设置为false
                        return this.removeParent(currentNode.parent, ref); //继续递归循环判断
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },

    }

  };
</script>

<style scoped>

</style>
