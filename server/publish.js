
Meteor.publish('getIndustrySmall', function(industryBig) {
  industryBig = industryBig || "";
  return Business.find({industryBig: industryBig});
})


Meteor.publish('IndustryLists', function() {
  return Business1.find({});
})


Meteor.publish('getBusinessTypeLists', function() {
  return BusinessTypeLists.find({});
})

Meteor.publish('getLicense', function(licenseid) {
  return License.find({licenseid: licenseid});
})

Meteor.publish('getAllLicense', function() {
  return License.find({});
})