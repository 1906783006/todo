<template>
  <div class="mask">
    <div class="memo-edit">
      <div class="header">
        <input type="text" placeholder="标题" v-model="memo.title"/>
        <select v-model="memo.categoryId" >
          <option value=0>工作</option>
          <option value=1>生活</option>
          <option value=2 selected>学习</option>
        </select>
        <a href="#" @click.prevent="saveMemo">保存</a>
        <a href="#" @click.prevent="closeEdit">关闭</a>
      </div>
      <div class="content">
        <textarea id="" cols="30" rows="10" v-model="memo.content"></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import ItemData from '../model/itemData'

@Component
export default class MemoEdit extends Vue {
  memo:ItemData = new ItemData();

  created():void {    
    this.memo = this.$store.state.transMemo;
  }

  closeEdit():void {
    this.$store.state.isShow = false;
  }
  // 保存新文章
  saveMemo():void {
    // 判断保存时是新增数据还是编辑数据
    if(this.memo.id <= -1) { //新增
      if(this.memo && this.memo.categoryId > -1 && this.memo.title.trim().length > 0 && this.memo.content.trim().length > 0) {
        this.$store.state.aHelper.add(this.memo);
      } else {
        window.alert('对不起，输入错误');
      }
    } else { //编辑
      this.$store.state.aHelper.edit(this.memo);
    }
    
    this.$store.state.isShow = false;
  }
}
</script>

<style lang="less">
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
  }
  .memo-edit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    a {
      &:hover {
        color: #fefefe;
      }
    }
  }
</style>