Template.license.onRendered(function() {
 Meteor.subscribe('getAllLicense');
  var img, stage;
  function init() {
    img = new Image();
    img.src = "/images/result.jpg";
    img.onload = handleImageLoad;
  }


  function handleImageLoad() {
    setTimeout(function() {
      var license = Session.get('license')
      if(license) {
        var companyType = "有限公司";
        var companyName = '上海' + license.companyName + license.typeName + companyType;
        var legalPerson = license.legalPerson;
        var createTimeL = license.createTime;
        var year = createTimeL.getFullYear();
        var month = createTimeL.getMonth() + 1;
        var date= createTimeL.getDate();
        var createTime =  year+ '年' +  month +'月' + date + '日';
        var businessTerm = license.businessTerm;
        var businessScope = license.businessScope;
        var businessMoney = license.businessMoney;
        var businessScope = license.businessScope;
        var uid = license.uid || '913100002500000001';
        var mymonth = month;
        if(month < 10) {
            mymonth = '0' + month;
        };
        var myday = date;
        if(date < 10) {
            myday = '0' + date;
        }

        var sid = license.sid || '00000000' + year + mymonth + myday + '1001';
        //find canvas and load images, wait for last image to load
        var canvas = document.getElementById("oCanvas");

        // create a new stage and point it at our canvas:
        stage = new createjs.Stage(canvas);

        var bg = new createjs.Bitmap(img);

        // blur and desaturate the background image:
        //bg.filters = [new createjs.BlurFilter(2, 2, 2), new createjs.ColorMatrixFilter(new createjs.ColorMatrix(0, 0, -100, 0))];
        bg.cache(0, 0, img.width, img.height);

        stage.addChild(bg);

        var titleLeft = new createjs.Text("", "24px  Microsoft Yahei UI,Microsoft Yahei,Hiragino Sans GB W3,Hiragino Sans GB,Arial", "#111");
        titleLeft.text = "统一社会信用代码\n\n";
        titleLeft.text += "证照编号\n\n";
        titleLeft.lineHeight = 24;
        titleLeft.textBaseline = "top";
        titleLeft.textAlign = "right";
        titleLeft.y = 564;
        titleLeft.x = 560;
        stage.addChild(titleLeft);
   
        var titleRight = new createjs.Text("", "24px Arial", "#111");
        titleRight.text = sid + "\n\n";
        titleRight.text += uid + "\n\n";
        titleRight.lineHeight = 24;
        titleRight.textBaseline = "top";
        titleRight.textAlign = "left";
        titleRight.y = 564;
        titleRight.x = 580;
        stage.addChild(titleRight);

        var txt = new createjs.Text("", "24px  Microsoft Yahei UI,Microsoft Yahei,Hiragino Sans GB W3,Hiragino Sans GB,Arial", "#111");
        txt.text = "名         称\n\n";
        txt.text += "类         型\n\n";
        txt.text += "住         所\n\n";
        txt.text += "法定代表人\n\n";
            txt.text += "注 册 资 本\n\n";
            txt.text += "成 立 日 期\n\n";
            txt.text += "营 业 期 限\n\n";
            txt.text += "经 营 范 围";
            //txt.lineWidth = 172;
        txt.lineHeight = 16;
        txt.textBaseline = "top";
        txt.textAlign = "left";
        txt.y = 680;
        txt.x = 220;
        stage.addChild(txt);
            
        var content = new createjs.Text("", "24px Arial", "#111");
        content.text = companyName +"\n\n";
        content.text += companyType +"\n\n";
        content.text += '上海市普陀区澳门路356号三维大厦21D\n\n';
        content.text +=  legalPerson +"\n\n";
        content.text += businessMoney +"\n\n";
        content.text += createTime +"\n\n";
        content.text += businessTerm +"\n\n";
        var range= businessScope.toString();
        var reg=/.{20}/g;
        var result=range.match(reg);
        var str=result.join('\n\n');    
        content.text += str;
        var length = range.length;
        var m = Math.floor(length / 20);
        var n = length % 20;
        content.text += '\n\n' + range.substring(m * 20);
        //content.lineWidth = 500;
        content.lineHeight = 16;
        content.textBaseline = "top";
        content.textAlign = "left";
        content.y = 680;          
        content.x = 380;
        stage.addChild(content);

        var datetime = new createjs.Text("", "20px  Microsoft Yahei UI,Microsoft Yahei,Hiragino Sans GB W3,Hiragino Sans GB,Arial", "#111");
        datetime.text = createTime;
        datetime.lineHeight = 24;
        datetime.textBaseline = "top";
        datetime.textAlign = "left";
        datetime.y = 1248;
        datetime.x = 620;
        stage.addChild(datetime)          

        stage.update();
        
      }
      
    }, 500)
  }  
  init();
})


Template.license.events({
    "click .registration": function(event) {
        var currentOpenid = Session.get('openid');
        if(currentOpenid) {
            Router.go('/getRegistrationL?openid=' + currentOpenid);
        }
    }
})
Meteor.subscribe('getAllLicense');
Template.license.helpers({
    "openid": function() {
        return Session.get('openid');
    },
    "licenseL": function() {
        var openid = Session.get('openid');
        var license = License.findOne({openid: openid})
        Session.set('license', license);
    }
})

