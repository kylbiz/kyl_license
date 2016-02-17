var OAuth = Meteor.npmRequire('wechat-oauth');

var config = {
  appId: 'your_wx_appId',
  appSecret: 'your_wx_appSecret',
  redirectURI: 'http://blicense.kyl.biz/oauth'
}

function log(info) {
  console.log('--------------------------');
  for(var i = 0; i < arguments.length; i++) 
    console.log(arguments[i]);
}


WebApp.connectHandlers.use('/index', function(req, res, next) {
   var appId = config.appId;
  var appSecret = config.appSecret;
  var client = new OAuth(appId, appSecret);
  var url = client.getAuthorizeURL(config.redirectURI, 'blicense', 'snsapi_base'); 
  log(url);
  res.writeHead(302, {'Location': url});
      res.end();

})



WebApp.connectHandlers.use('/oauth', function(req, res, next) {
  log('oauth');
  var appId = config.appId;
  var appSecret = config.appSecret;
  var client = new OAuth(appId, appSecret);
  var Fiber = Meteor.npmRequire('fibers');

  client.getAccessToken(req.query.code, function(err, result) {
    if(!err) {
      // var state = req.query.state;
      var fn = Fiber(function() {
        var openid = result.data.openid;
        log('openid = ' + openid)
        var license = License.find({openid: openid});
        log('find license done')
        if(license.count() >= 1) {
          log('license not null')
          res.writeHead(302, {'Location': 'http://blicense.kyl.biz/license?openid=' + openid});
          res.end();
        } else {
          log('license null')
          res.writeHead(302, {'Location': 'http://blicense.kyl.biz/home?openid=' + openid});
          res.end();
        }
      })
      fn.run();

    } else {
      res.writeHead(302, {'Location': '/registration'});
    }
  })  
})




WebApp.connectHandlers.use('/getRegistrationL', function(req, res, next) {
   var appId = config.appId;
  var appSecret = config.appSecret;
  var client = new OAuth(appId, appSecret);
  var currentOpenid = req.query.openid;

  var redirectURI = 'http://blicense.kyl.biz/oauth2'

  var url = client.getAuthorizeURL(redirectURI, 'blicense_'+currentOpenid, 'snsapi_base'); 
  log(url);
  res.writeHead(302, {'Location': url});
      res.end();
})


WebApp.connectHandlers.use('/oauth2', function(req, res, next) {
  log('oauth2');
  var appId = config.appId;
  var appSecret = config.appSecret;
  var client = new OAuth(appId, appSecret);
  var Fiber = Meteor.npmRequire('fibers');
  var state = req.query.state;
  var currentOpenid = state.substring(state.indexOf('_') + 1) || '00';
  client.getAccessToken(req.query.code, function(err, result) {
    if(!err) {
      var userOpenid = result.data.openid;
      log('userOpenid: ' + userOpenid, 'currentOpenid: ' + currentOpenid);
      if(userOpenid !== currentOpenid) {
        res.writeHead(302, {'Location': 'http://blicense.kyl.biz/home?openid=' + userOpenid});
        res.end();   
      } else {
        res.writeHead(302, {'Location': 'http://blicense.kyl.biz/registration?openid=' + userOpenid});
        res.end();
      }

    } else {
      log('oauth2: error')
      res.writeHead(302, {'Location': '/home?openid=' + currentOpenid});
    }
  })  
})



