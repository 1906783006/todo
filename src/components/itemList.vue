<template>
  <div id="memos" class="container"> 
    <memo-item v-for="item in memoArr" :key="item.id" :memo="item"/>
  </div>
  
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import ItemData from '../model/itemData'
import ActionHelper from '../store/ActionHelper'

import memoItem from './memoItem.vue'

@Component({
  components: {
    memoItem
  }
})
export default class ItemList extends Vue {
  memoArr:Array<ItemData> = this.$store.state.aHelper.memoList;

}
</script>

<style lang="less">

</style>