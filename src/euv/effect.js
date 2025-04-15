let effectActive = null
let targetMap = new WeakMap()
function effect(fn) {
  effectActive = fn
  effectActive()
  effectActive = null
}

function track(target, prop) {
  if (!effectActive) {
    return
  }
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(prop)
  if (!dep) {
    depsMap.set(prop, (dep = new Set()))
  }
  dep.add(effectActive)
}

function trigger(target, prop, val) {
  let depsMap = targetMap.get(target)
  if (depsMap) {
    let arr = depsMap.get(prop)
    arr.forEach(fn => {
      fn()
    })
  }
}

function reactive(target) {
  return new Proxy(target, {
    get: function (target, prop) {
      track(target, prop)
      return Reflect.get(target, prop)
    },
    set: function (target, prop, val) {
      const oldVal = target[prop]
      let result = Reflect.set(target, prop, val)
      
      if (result && oldVal !== val) {
        trigger(target, prop)
      }
      return result
    }
  })
}

const product = reactive({
  name: 'benjamin',
  age: 60
})
let total = ''
let total1 = ''
function one() {
  total = `${product.name} is ${product.age} years old`
} 

function two() {
  total1 = `add new prop ${product.newname} is ${product.age} years old`
}
effect(one)

effect(two)

product.age = 50
console.log(total)

product.newname = 'Benjamin 0000'
console.log(total1)