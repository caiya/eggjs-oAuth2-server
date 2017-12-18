module.exports = app => {
  if (app.config.env === 'local') {
    app.beforeStart(async function() {
      await app.model.sync({force: false});
    });
  }
};