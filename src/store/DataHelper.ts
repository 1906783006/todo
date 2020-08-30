// DataHelper 负责 localStorage 操作
class DataHelper {
  dataKey:string; //本地存储的数据名称
  primaryKey:string; //每条数据的id

  constructor(dataKey:string, primaryKey:string) {
    this.dataKey = dataKey;
    this.primaryKey = primaryKey;
  }

  // 读取数据
  readData():any {
    // 1.读取本地看数据
    let strData:string | null = localStorage.getItem(this.dataKey);
    
    // 2.将本地json 数组格式 转成对象数组格式
    let arrData:any = [];
    if(strData != null) {
      arrData = JSON.parse(strData);
    }

    return arrData;
  }

  // 存入本地数据
  saveData(arrData:Array<Object>):void {
    let str:string = JSON.stringify(arrData);
    localStorage.setItem(this.dataKey, str);
  }

  // 新增数据
  addData(newDataObj:any):number {
    let arrData = this.readData();
    if(arrData == null) {
      arrData = [];
    }

    // 自动生成 主键值 (id 值)
    //  如果 数组 长度 > 0，则 将 最后一个 元素的 id 值 取出 + 1 作为 新元素的 id值
    //               <= 0, 则 将 1 作为 新元素的 id 值
    let newId = arrData.length > 0?arrData[arrData.length - 1][this.primaryKey] + 1:1;
    newDataObj[this.primaryKey] = newId;

    arrData.push(newDataObj);

    this.saveData(arrData);

    return newId;
  }

  // 删除数据
  removeDataById(id:string):boolean {
    let arrData = this.readData();

    let index = arrData.findIndex((ele:any) => {
      return ele[this.primaryKey] == id;
    })

    if(index > -1) {
      arrData.splice(index, 1);
      this.saveData(arrData);
      return true;
    }

    return false;
  }
}

export default DataHelper;