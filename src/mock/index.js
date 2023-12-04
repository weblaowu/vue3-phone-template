export default [
  {
    url: '/api/test/queryPageList', //这里只能是string格式
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          'records|5': [
            {
              'id|+1': 1,
              name: '@cname',
              code: /\d{5,10}/,
            },
          ],
        },
      }
    },
  },
]
