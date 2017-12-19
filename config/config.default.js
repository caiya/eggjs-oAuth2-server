'use strict';

module.exports = appInfo => {
  const config = exports = {
    static: { // 配置静态文件请求
      prefix: '/',
    },
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.html': 'nunjucks',
      },
    },
    oAuth2Server: {
      debug: true,
      grants: ['password', 'authorization_code', 'refresh_token']
    },
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'oAuthCenter',
      host: '192.168.20.228',
      port: '3306',
      username: 'root',
      password: 'root'
    },
    security: {
      csrf: {
        enable: false
      }
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513142797863_8350';

  // add your config here
  config.middleware = [];

  return config;
};

