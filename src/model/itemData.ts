import category from './cateEnum'

class ItemData {
  id!:number;
  categoryId!:number;
  title!:string;
  content!:string;
  createTime!:number;

  constructor(id:number=-1, catetoryId:category=0, title:string='', content:string='' ) {
    this.id = id;
    this.categoryId = catetoryId;
    this.title = title;
    this.content = content;
    this.createTime = Date.now();
  }

  // 把时间ms数转成日期对象
  toSelfDateStr(time:number):string {
    let date = new Date(time);
    let month = date.getMonth()+1;
    let str = date.getFullYear() +'-'+ month + '-' + date.getDate();
    return str
  }
}

export default ItemData;