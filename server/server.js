Meteor.methods({
  "GenerateLicense": function(options) {
    if(!options || !(options.openid && options.licenseid && options.businessType && options.typeName && options.companyName && options.businessTerm && options.legalPerson && options.businessMoney)) {
      log('license information not completely', options);
    } else {

      var typeName = options.typeName;
      switch (typeName) {
        case '网络科技': 
          options.businessScope = ['技术开发', '技术咨询', '技术服务', '技术转让，监控设备', '家用电器', '机电设备', '五金交电', '电线电缆', '通讯设备（除卫星电视', '计算机', '软件及辅助设备（除计算机信息系统安全专用产品）', '电子产品的批发', '零售，电子商务（不得从事增值电信', '金融业务），计算机网络工程施工'];
          break;
        case '电子商务': 
          options.businessScope = ['电子商务（不得从事电信增值业务，金融业务）', '服装鞋帽', '箱包', '玩具', '办公用品', '电子产品', '日用百货批发零售', '从事货物'];
          break;
        case '智能科技': 
          options.businessScope = ['技术开发', '技术咨询', '技术服务', '技术转让，计算机信息系统集成，管道建设工程专业施工，建筑智能化建设工程专业施工，计算机网络', '软件及辅助设备（除计算机信息系统安全专用产品）', '锅炉及辅助设备', '自动化设备', '管道', '控制设备的批发', '零售'] ;
        default: 
          options.businessScope = ['技术开发', '技术咨询', '技术服务', '技术转让，监控设备', '家用电器', '机电设备', '五金交电', '电线电缆', '通讯设备（除卫星电视', '计算机', '软件及辅助设备（除计算机信息系统安全专用产品）', '电子产品的批发', '零售，电子商务（不得从事增值电信', '金融业务），计算机网络工程施工'];
          break;  

      }
      var openid = options.openid;

    var mysid = SID.findOne();
    var sidNumber = 10000000;
    if(!mysid) { 
      SID.insert({
        sid: 'sid',
        number: sidNumber
      }, function(err) {
        if(err) {
          log('update sid number error', err);
        } else {
          log('update sid number succeed');
        }
      })  
    } else {
      sidNumber = mysid.number + 1;

      SID.update({sid: 'sid'}, {
        $inc: {
          number: 1
        }
      }, function(err) {
        if(err) {
          log('inscrasing sid number error', err)
        } else {
          log('inscrasing sid number succeed');
        }
      })
    }

      var sid = '9131000035' + sidNumber ;
      var date = new Date();
      var year = date.getFullYear();
      var month = (date.getMonth() + 1);
      var today = date.getDate();
      var day = '';
      if(typeof(today) === 'string') {
        today = parseInt(today);
      }
      if(today < 10) {
        day = '0' + today; 
      } else {
        day = today;
      }
      var uid = '000000' + year + month + day + '';
      var number = 1000;
      var mydate = '' + year + month + day;
      var myuid = UID.findOne({date: mydate})
      if(!myuid) {
        UID.insert({
          date: mydate,
          number: 1000
        }, function(err) {
          if(err) {
            log('insert uid error', err);
          } else {
            log('insert uid succeed');
          }
        })
      } else {
        log('uid not null', typeof myuid.number, myuid.number + 1)
        number = myuid.number + 1;
        UID.update({date: mydate}, {
          $inc: {
            number: 1
          }
        }, function(err) {
          if(err) {
            log('inscrasing number of uid error', err);
          } else {
            log('inscrasing number of uid succeed');
          }
        })
      }

      uid += '' + number;

      options.uid = uid;
      options.sid = sid;

      License.update({openid: openid}, {
        $set: options
      },{
        upsert: true
      }, function(err) {
        if(err) {
          log('insert license error', err);
        } else {
          log('insert license succeed');
        }
      })
    }
  }
})


function log(info) {
  console.log('------------------------------------------------')
  var length = arguments.length;
  for(var i = 0; i < length; i++) {
    console.log(arguments[i]);
  }
}