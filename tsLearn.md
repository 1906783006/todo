## 类

### 类的高级用法

- 类 `定义` 会创建两个东西：`类的实例类型` 和一个 `构造函数` 

- 类具有 `静态部分` 和 `实例部分` 

- 实例化一个对象时，可以声明对象类型，有两种方法

  - ```type
    // 通过这种方法实例化的类，不可以访问类里的静态属性和方法
    let greet1:Greeter;
    greet1 = new Greeter();
    ```

  - ```type
    // 通过这种方法实例化的类，可以访问类里的静态属性和方法
    let greet2: typeof Greeter = Greeter;
    greet2 = new Greeter();
    ```

- 例子

  - ```typescript
    class Greeter {
        static standardGreeting = "Hello, there";
        greeting!: string;
        greet() {
            if (this.greeting) {
                return "Hello, " + this.greeting;
            }
            else {
                return Greeter.standardGreeting;
            }
        }
    }
    //1, 第一种声明实例化对象
    // Greeter类的实例的类型是 Greeter
    let greeter1: Greeter;
    greeter1 = new Greeter();
    greeter1.standarGreeting = 'hahaha'; //报错，不能访问standarGreeting
    console.log(greeter1.greet());
    
    //2.第二种声明方法
    // typeof Greeter，意思是取Greeter类的类型，而不是实例的类型
    let greeterMaker: typeof Greeter = Greeter;
    greeterMaker.standardGreeting = "Hey there!"; //可以访问静态属性
    
    let greeter2: Greeter = new greeterMaker();
    console.log(greeter2.greet());
    ```



### 把类当作接口使用

```typescript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```



## 函数

### this 和箭头函数

- JavaScript里，`this`的值在函数被调用的时候才会指定。（在箭头函数出现之前，每一个新函数根据它是被如何调用的来定义这个函数的this值）

  - ```typescript
    let deck = {
        suits: ['hearts', 'spades', 'clubs', 'diamonds'],
        cards: Array(50),
        createCardPicker: function() {
            return function() {
                let pickedCard = Math.floor(Math.random() * 50);
                let pickedSuit = Math.floor(pickedCard / 13);
    
                return {
                    suit: this.suits[pickedSuit],
                    card: pickedCard % 13
                }
            }
        }
    }
    // 这里调用的函数，this 指向 windows
    let func = deck.createCardPicker();
    let obj = func();
    console.log(obj);
    ```

- 箭头函数能保存函数创建时的 `this` 值，而不是调用时的值。箭头函数不会创建自己的`this,它只会从自己的作用域链的上一层继承this` 
  - ```typescript
    let deck = {
        suits: ['hearts', 'spades', 'clubs', 'diamonds'],
        cards: Array(50),
        createCardPicker: function() {
            return () => {
                let pickedCard = Math.floor(Math.random() * 50);
                let pickedSuit = Math.floor(pickedCard / 13);
    
                return {
                    suit: this.suits[pickedSuit],
                    card: pickedCard % 13
                }
            }
        }
    }
    // 这里返回的函数，调用时 this 指向 deck 对象
    let func = deck.createCardPicker();
    let obj = func();
    console.log(obj);
    ```

- 箭头函数作为 `方法函数` 时，没有定义 this 绑定

```java
'use strict';
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b(); 
// undefined, Window{...}
obj.c(); 
// 10, Object {...}
```

## 类型推论

typescript 中，如果有某处没有指定某种类型，typescript 会自动进行类型推论

```typescript
let x = 3;
console.log(typeof x); // 输出为 number
```

### 根据上下文进行推论

typescript 会根据上下文进行类型推论，比如：

```typescript
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);
}
// 报错，mouseEvent
// 原因：typescript 根据window.onmousedown 来判断 mouseEvent 类型
// 解决办法：给mouseEvent指定类型 mouseEvent:any
```

## 类型兼容性

typescript 里面的类型兼容性是基于 `结构子类型` 的， 例如：

```typescript
interface Named {
    name:string
}

class Person {
    name!:string
}

let p:Named = new Person();
```

### 结构类型和名义类型

- 结构类型是一种用成员来描述类型的方式

- 名义类型是明确的声明

### 开始

```typescript
interface Named {
    name: string;
}

let x: Named;
// y 的类型都能在 x 里找到 
let y = { name: 'Alice', location: 'Seattle' };
x = y;
```

## 装饰器

### 类装饰器

- 修改类

```typescript
//定义类装饰器 target 为传入的构造函数
function sealed(target:Function) {
    Object.seal(target); //Object.seal() 方法为密封类的构造函数和原型
    Object.seal(target.prototype);
}

@sealed
class Greeter {
    greet:string;
    constructor(greet:string) {
        this.greet = greet;
    }
    greeting() {
        console.log(this.greet);
        
    }
}
```

- 重载构造函数

```typescript
function classDecoration<T extends {new (...args:any[]):{}}>(constructor:T) {   
    return class extends constructor {
        newProperty = 'new property';
        hello = 'hello';
    }
}

@classDecoration
class Greeter {
    property = 'property';
    hello:string;
    constructor(s:string) {
        this.hello = s;
    }
}
console.log(new Greeter('nihao'));
//控制台输出为：
// {property: "property", hello: "hello", newProperty: "new property"}
// hello: "hello"
// newProperty: "new property"
// property: "property"
// __proto__: Greeter
```

### 方法装饰器

方法装饰器会被应用到方法的  *属性描述符*   上，可以用来监视，修改或者替换方法定义。 

```type
//这里使用了装饰器工厂，可以传入参数value
function enumerable(value: boolean) {
	//方法装饰器
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {  
        descriptor.enumerable = value;
    };
}

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

- 方法装饰器可以传入三个参数
  - target：对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  - propertyKey：成员名字
  - descriptor: 成员的属性描述符
- 如果方法装饰器返回一个值，它会被用作方法的  *属性描述符* 

### 访问器装饰器

访问器装饰器被应用到访问器的 *属性描述符* 上，可以用来监视，修改或替换一个访问器的定义。

注意： TypeScript不允许同时装饰一个成员的`get`和`set`访问器。取而代之的是，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上。这是因为，在装饰器应用于一个*属性描述符*时，它联合了`get`和`set`访问器，而不是分开声明的。

```typescript
class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(true)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

let point = new Point(1, 2);
console.log(point.x); //1
```

