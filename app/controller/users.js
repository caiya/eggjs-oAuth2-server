'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {

  async list() {
    const user = await this.ctx.model.User.findByName('test');
    this.ctx.body = user;
  }

  async add() {
    const user = await this.ctx.model.User.register({
      name: 'test',
      password: '123456',
      age: 23,
      firstname: 'chao',
      lastname: 'zhou',
    });
    const client = await this.ctx.model.Client.add({
      clientId: 'hyewfbgawd',
      clientSecret: 'fskefgtarwdbawydrawpdpaiuiawdtg', 
      redirectUri: 'http://127.0.0.1:7002/auth/redirect',
      grants: 'password,authorization_code,refresh_token'
    });
    this.ctx.body = {user, client};
  }

  // 登录页
  async authorize() {
    const query = this.ctx.querystring
    console.log('query: ', query)
    await this.ctx.render('oauth/login.html', {query: query})
  }

  async authenticate() {
    this.ctx.body = {
      msg: 'successed!'
    }
  }

  async token(){
    this.ctx.body = this.ctx.state.oauth.token
  }
}

module.exports = UsersController;
