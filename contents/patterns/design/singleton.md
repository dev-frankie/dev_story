# Singleton 패턴

- 1회에 한하여 인스턴스화가 가능하며 전역에서 접근 가능한 클래스를 지칭한다.
- 만들어진 Singleton 인스턴스는 앱 전역에서 공유되기에 전역 상태를 관리하기 적합하다.

먼저, 예시로 만든 Counter 클래스를 살펴보자.

```jsx
let counter = 0

class Counter {
  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const counter1 = new Counter()
const counter2 = new Counter()

console.log(counter1.getInstance() === counter2.getInstance())  // false
```

new 메서드를 호출하여 counter1, counter를 각각 별개의 인스턴스로 가르키도록 했다. 각 인스턴스의 getInstance 메서드에서 반환되는 인스턴스가 동일하지 않은 이유는 this가 서로 다른 객체를 참조하기 때문이다.

new Counter()를 호출할 때마다 새로운 객체가 생성되고, 객체의 참조가 다르기 때문이다.

이 인스턴스를 한번만 만드는 방법중 하나는 ‘**`instance`** ’라는 변수를 만드는 것이다.

Counter 클래스의 생성자에서 instance 변수가 새로 생성된 인스턴스를 가르키도록 하면 새로운 인스턴스 생성을 막을수 있다. 

```jsx
let instance
let counter = 0

class Counter {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!')
    }
    instance = this
  }

  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const singletonCounter = Object.freeze(new Counter())
export default singletonCounter
```

### 장점과 단점

싱글턴 패턴을 사용하면 많은 메모리를 절약할수있다. 하지만 싱글턴 패턴은 자바스크립트에서는 굳이 구현할 필요가 없다는 의견도 많다. 

그 이유는 모듈 시스템의 기본 제공 기능으로도 충분하기 때문이다.

자바스크립트의 ES 모듈 시스템은 모듈을 한 번만 로드하고 캐싱하기 때문에, 모듈 내에서 단일 인스턴스만 내보내면 싱글턴처럼 동작한다. 객체 리터럴이나 모듈 내에서 정의된 변수만으로도 동일한 효과를 얻을 수 있다.

```jsx
// 객체 리터럴 예시
let count = 0;

const counter = {
  increment() {
    return ++count;
  },
  decrement() {
    return --count;
  }
};

Object.freeze(counter);
export { counter };

```

### React 의 상태관리

React에서는 전역 상태 관리를 위해 Singleton 객체를 만드는 것보다 Redux, Context 등을 사용한다. 

Singleton은 인스턴스의 값을 직접 수정할 수 있는 반면에, 위에 언급한 도구들은 읽기 전용 상태를 제공한다.  

여기서 혼동이 되는 개념이 있는데 Redux에서 상태 값을 변경할수있지 않나요??? 라는 생각이 들 수 있다.

하지만 Redux에서는 상태(State)가 읽기 전용(Read-only)로 취급된다. 직접 수정한느 대신, 컴포넌트는 action을 dispatch 하고, 순수 함수인 reducer가 이전 상태를 복제(immutable하게 업데이트)하여 새로은 상태 객체를 반환하는 것이다. 이러한 패턴은 상태가 언제, 어떻게 변했는지 추적하기 용이하다.  액션로그나 타임 트래블 디버깅등이 가능해지는 이유이다.