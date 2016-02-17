Router.route('/home', {
  name: "home",
  data: function() {
    var openid = this.params.query.openid;
    if(openid) {
      Session.set('openid', openid);
    }
  }
});


Router.route('/index', function() {
 name: 'index'
})


Router.route('/registration', {
  name: "registration", 
  subscriptions: function() {
    Meteor.subscribe('getBusinessTypeLists');
  },
  data: function() {
    var openid = this.params.query.openid;
    Session.set('openid', openid);
    var typeLists = BusinessTypeLists.find();
    return {
      typeLists: typeLists
    }
  }  
});

Router.route('/license', {
  name: 'license',
  subscriptions: function() {
    var openid = this.params.query.openid;
    Meteor.subscribe('getAllLicense');
  },
  data: function() {
    Meteor.subscribe('getAllLicense');
    var openid = this.params.query.openid;
     var license = License.findOne({openid: openid});
     if(license) {
       Session.set("openid", openid)
       Session.set('license', license) 
     } 
     Session.set("openid", openid)
     Session.set('license', license)
    return {
      license: license
    }
  }
});


Router.route('oauth');