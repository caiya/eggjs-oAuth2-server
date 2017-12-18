'use strict'

module.exports = app => {
  const { STRING} = app.Sequelize;

  const Client = app.model.define('client', {
    clientId: {type: STRING, unique: true},
    clientSecret: STRING, 
    redirectUri: STRING,
    grants: STRING
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });
  
  Client.getClient = async function(clientId, clientSecret) {
    let params = {
      clientId: clientId
    }
    if (clientSecret) {
      params.clientSecret = clientSecret
    }
    const client = await this.findOne({
      where: params
    })
    return client
  }

  Client.queryClient = async function(params) {
    return await this.findOne({
      where: params,
      attributes: {
        exclude: ['clientSecret']
      }
    })
  }

  Client.add = async function (fields) {
    return await this.create(fields);
  }

  return Client;
};
