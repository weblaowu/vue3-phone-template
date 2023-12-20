#### useRequest 使用文档

`useRequest` 是基于 vue3 的 `components API` 进行封装的 用于接口请求的 `hook`； 它将返回例如 `data` 等多个请求相关的状态化数据，并在 `useRequest` 中自动管理它们，而无需自己维护。

1. 支持 `loading`, 并支持设置 `loading` 延迟时间(默认 300ms)
2. 支持响应式的请求参数： 自动响应外部参数的变化并重新发起请求
3. 实现防抖机制，避免过多不必要的 API 请求
4. 支持取消请求

`useRequest` 有一些默认配置项，这些配置项可以在初始化的时候进行配置

```javascript {.line-numbers}
// 默认的配置项
const defaultConfig = {
  loadingDelay: 300, // loading 延迟时间
  loadingKeep: 300, // loading 保持时间
  immediate: false, // 是否立即发起请求
  initialData: [], // data 数据格式
  params: {}, // 请求初始化参数
  isReactive: false, // 是否开启响应式参数
  onBefore: (resolve) => resolve(), // 请求发送前的钩子函数
  onSuccess: (res) => res, // 请求成功后的钩子函数
}
```

1、基本使用
`useRequest` 第一个参数接受一个请求返回的`Promise`对象，因此可以兼容`fetch`和`axios`; 第二参数是 `config`; 参照上面默认配置项，可以通过 `config` 传入自定义参数，自定义参数会覆盖默认参数；

```js {.line-numbers}
// data , loading 均是响应式参数
const { data, loading } = useRequest(promiseApi, {
  immediate: true, // 立即执行请求，默认是false
  isReactive: true, // 是否开启响应式参数， 默认不开启
  params: {
    pageSize: 10,
    pageNum: 1,
  },
})
```

2、提供了请求成功的钩子函数`onSuccess`, 处理响应数据

```js {.line-numbers}
// data , loading 均是响应式参数
const { data, loading } = useRequest(promiseApi, {
  immediate: true, // 立即执行请求
  params: {
    pageSize: 10,
    pageNum: 1,
  },
  onSuccess(res) {
    // 需要返回处理完成的数据
    return res.map((item) => {
      return item
    })
  },
})
```

3、`onBefore`请求之前执行钩子函数，接受一个`resolve`参数， `resolve`必须要执行调用，请求才会往下进行；

```js {.line-numbers}
// data , loading 均是响应式参数
const { data, loading } = useRequest(promiseApi, {
  immediate: true, // 立即执行请求
  params: {
    pageSize: 10,
    pageNum: 1,
  },
  onBefore(resovle, params) {
    // do something
    resovle()
  },
})
```

4、自定义执行时机
很多时候我们通过触发事件或者回调才会去执行请求，`useRequest` 还返回了 `run` 方法，可以在任何需要执行请求的地方执行；在 `run` 执行函数中参数支持传入 `params`, `onSuccess`, `onBefore` 三个选项，并且 `run` 返回一个 `Promise` 对象

```js {.line-numbers}
const { data, loading, run } = useRequest(promiseApi, {
  params: {
    pageSize: 10,
    pageNum: 1,
  },
})
// 在需要的时候执行
const handleClick = () => {
  run({
    params: {
      id: '123',
    },
  })
}

onMounted(() => {
  run()
    .then((res) => {
      console.log('res: ', res)
    })
    .catch((err) => {
      console.log('err: ', err)
    })
})
```

4、取消请求，使用 `new AbortController` 实现（支持 axios 和 fetch），并在组件卸载时自动取消所有未完成的请求，也支持手动取消; 注意：`axios CancelToken`  从从  v0.22.0  开始已被弃用

```js {.line-numbers}
// API
// useReuqest中会处理取消请求的逻辑，并将signal作为第二个参数传入API中
const queryListApi = (data, signal) => {
  return axios.post('/fox/test', data, {
    ...signal,
  })
}

// 暴露手动取消请求钩子 onAbort
const { data, run, onAbort } = useRequest(queryListApi, {
  params: {
    pageSize: 10,
    pageNum: 1,
  },
})
// 在需要的时候执行
const handleClick = () => {
  run()
  onAbort()
}
```
