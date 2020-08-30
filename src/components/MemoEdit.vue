<template>
  <div class="mask">
    <div class="memo-edit">
      <div class="header">
        <input type="text" placeholder="标题" />
        <button>工作</button>
        <ul>
          <li>工作</li>
          <li>生活</li>
          <li>学习</li>
        </ul>
        <a href="#">保存</a>
      </div>
      <div class="content">
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import ItemData from '../model/itemData'

@Component
export default class MemoEdit extends Vue {
  memo!:ItemData;
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
  }
</style>