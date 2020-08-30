<template>
  <div class="memo-item">
    <h5> {{memo.title}} </h5>
    <ul class="tools">
      <li>
        <a href="#">编辑</a>
      </li>
      <li>
        <a href="#" @click.prevent="deletea">删除</a>
      </li>
    </ul>
    <h6>
      <span>{{memo.createTime}}</span>
      <span>分类：{{$store.state.aHelper.getCategoryName(memo.categoryId)}} </span>
    </h6>
    <div class="content">
      {{memo.content}}
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import { component } from 'vue/types/umd';
import ItemData from '../model/itemData';

@Component
export default class MemoItem extends Vue {
  @Prop() memo!:ItemData;

  // 删除方法
  deletea():void {
    if(!window.confirm(`确认要删除${this.memo.title}的笔记吗`)) return;
    this.$store.state.aHelper.remove(this.memo.id);
  }
}
</script>

<style lang="less">
  .memo-item {
    float: left;
    background-color: skyblue;
    margin: 6px;
    a {
      &:hover {
        color: #fefefe;
      }
    }
  }
</style>