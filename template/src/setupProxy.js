/* eslint-disable */
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  var ssoHost = 'https://ruexp.demo.rooxteam.com/sso';
  app.use(proxy('/sso', { target: ssoHost }));
  app.use(proxy('/customer-webapi-1.0', { target: ssoHost }));
  app.use(proxy('/oauth2-consumer', { target: ssoHost }));

  app.use(proxy('/bpmn', { target: 'http://bpmn-api-service.d.exportcenter.ru/bpmn' }));
};
