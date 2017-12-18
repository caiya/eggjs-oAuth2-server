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
      clientId: '111',
      clientSecret: '222', 
      redirectUri: 'http://127.0.0.1:7001/',
      grants: 'password,authorization_code,refresh_token'
    });
    this.ctx.body = {user, client};
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
