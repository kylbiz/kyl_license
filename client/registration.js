Template.home.events({
  "click .registration": function() {
    var openid = Session.get('openid') || "";
    if(openid) {
      Router.go('/registration?openid=' + openid)
    }
  }
})



Template.registration.onRendered(function() {
  setTimeout(function() {
    var businessType = $("#businessType").val() || "";

    if(businessType) {
      var typename = $("#businessType").find("option:selected").data("typename") || "";
      Session.set('businessType', businessType);
      Session.set("typeName", typename);
    }
  }, 1500)
})

Template.registration.helpers({
  "typeNameL": function() {
    return Session.get('typeName');
  }
})




Template.registration.events({
  'change #businessType': function(event) {
    var businessType = $("#businessType").val() || "";
    var typename = $("#businessType").find("option:selected").data("typename") || "";
    if(businessType) {
      Session.set('businessType', businessType);
      Session.set("typeName", typename);
    }
  }
});





Template.registration.events({
  "click .submit": function(event) {
    var businessType = $("#businessType").val() || "";
    var typeName = $("#businessType").find("option:selected").data("typename") || "";
    var companyName = $(".companyName").val() || "";
    var businessTerm = $(".businessTerm").val() || "";
    var legalPerson = $(".legalPerson").val() || "";
    var businessMoney = $(".businessMoney").val() || "";
    var licenseid = uuid.v1();
    var openid = Session.get('openid');
    if(openid && licenseid && businessType && typeName && companyName && businessTerm && legalPerson && businessMoney) {
      var options = {
        openid: openid,
        licenseid: licenseid,
        businessType: businessType,
        typeName: typeName,
        companyName: companyName,
        businessTerm: businessTerm,
        legalPerson: legalPerson, 
        businessMoney: businessMoney,
        createTime: new Date()
      };
      Router.go('/license?openid=' + openid);
      Meteor.call('GenerateLicense', options);
    }
  }
})