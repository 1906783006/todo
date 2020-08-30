import category from './cateEnum'

class ItemData {
  id!:number;
  categoryId!:number;
  title!:string;
  content!:string;
  createTime!:string;

  constructor(id:number=-1, catetoryId:category=0, title:string='', content:string='' ) {
    this.id = id;
    this.categoryId = catetoryId;
    this.title = title;
    this.content = content;
    this.createTime = this.toSelfDateStr();
  }

  // 把时间ms数转成日期对象
  toSelfDateStr():string {
    let time = new Date(Date.now());
    let month = time.getMonth();
    let str = time.getFullYear() +'-'+ month + '-' + time.getDate();
    return str
  }
}

export default ItemData;