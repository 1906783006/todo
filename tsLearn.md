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