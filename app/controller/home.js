'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // 发送/token
    console.log(this.ctx.query)
    const result = await this.ctx.curl('http://192.168.20.131:7001/users/token', {
      dataType: 'json',
      // contentType: 'application/x-www-form-urlencoded', // 默认格式
      method: 'POST',
      timeout: 3000,
      data: {
        grant_type: 'authorization_code',
        code: this.ctx.query.code,
        state: this.ctx.query.state,
        client_id: '111',
        client_secret: '222',
        redirect_uri: 'http://127.0.0.1:7001/',
      }
    });
    this.ctx.body = result.data
  }
}

module.exports = HomeController;
