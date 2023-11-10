export default [
  {
    url: '/api/resSupervise/role/queryPageList', //这里只能是string格式
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
  {
    url: '/api/resSupervise/user/saveOrUpdate', // 注意，这里只能是string格式
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {},
      }
    },
  },
  {
    url: '/api/resSupervise/user/queryPageList', // 注意，这里只能是string格式
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
              phone: '15651518227',
              roleName:
                '333,3131,1312,阿萨斯昂首,查收到说得出来卡密上档次,参数吗考试的',
            },
          ],
          total: 4,
        },
      }
    },
  },
  {
    url: '/api/resSupervise/notice/queryPageList',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          'records|11': [
            {
              'id|+1': 1,
              first: '1',
              second: '2',
              title: '测试标题',
              content: '测试分页查询内容',
              status: '0',
              ifMessage: '0',
              ifUpload: '0',
              ifComment: '0',
              file: null,
              visit: 0,
              praise: 0,
              comment: 0,
              deleteFlag: '0',
              createBy: 'admin',
              createDate: '2023-11-06T11:46:28.000+00:00',
              updateBy: 'admin',
              updateDate: '2023-11-06T11:46:30.000+00:00',
            },
          ],
          total: 11,
        },
      }
    },
  },
]
