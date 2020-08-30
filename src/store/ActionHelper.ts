import DataHelper from './DataHelper'
import ItemData from '../model/itemData'
// 业务处理
class ActionHelper {
  // 负责数据处理
  dataHelper:DataHelper = new DataHelper('memoData', 'id');
  memoList!:Array<ItemData>;

  // 负责业务处理
  constructor() {
    // 读取本地数据，将笔记数据保存到 this.memoList 变量中
    this.memoList = this.readData();
  }

  readData():Array<ItemData> {
    let arr = this.dataHelper.readData();
    arr.map((ele:any) => {
      let item:ItemData = new ItemData();
      item.id = ele.id;
      item.title = ele.title;
      item.content = ele.content;
      item.categoryId = ele.categoryId;
      item.createTime = ele.createTime;
      return item;
    })
    return arr;
  }

  // 新增笔记
  add(item:ItemData):number {
    item.id = this.dataHelper.addData(item);
    this.memoList.push(item);
    this.dataHelper.saveData(this.memoList);
    return -1;
  }

  // 修改笔记
  edit(item:ItemData):void {
    let editItem:ItemData | undefined = this.memoList.find((ele) => {
      return item.id == ele.id;
    })

    if(editItem) {
      editItem.categoryId = item.categoryId;
      editItem.title = item.title;
      editItem.content = item.content;

      this.dataHelper.saveData(this.memoList);
    }
  }

  // 删除笔记
  remove(id:number):void {
    let index:number = this.memoList.findIndex(ele => {
      return ele.id == id;
    })

    if(index > -1) {
      this.memoList.splice(index, 1);
      this.dataHelper.saveData(this.memoList);
    }
  }
}

export default ActionHelper;