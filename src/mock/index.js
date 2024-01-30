export default [
  {
    url: '/api/mock/userId',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          userId: '123456',
          name: 'test',
        },
      }
    },
  },
]
