var businessTypeLists = [
  {
    num: 0, 
    name: 'O2O', 
    typeName: '网络科技',
    businessScope: ['技术开发', '技术咨询', '技术服务', '技术转让，监控设备', '家用电器', '机电设备', '五金交电', '电线电缆', '通讯设备（除卫星电视广播地面接收设施）', '计算机', '软件及辅助设备（除计算机信息系统安全专用产品）', '电子产品的批发', '零售，电子商务（不得从事增值电信', '金融业务），计算机网络工程施工']
  },
  {
    num: 1,
    name:'电商',
    typeName: '电子商务',
    businessScope: ['电子商务（不得从事电信增值业务，金融业务）', '服装鞋帽', '箱包', '玩具', '办公用品', '电子产品', '日用百货批发零售', '从事货物及技术进口业务'] 
  },
  {
    num: 2, 
    name:'智能硬件', 
    typeName: '智能科技',
    businessScope: ['技术开发', '技术咨询', '技术服务', '技术转让，计算机信息系统集成，管道建设工程专业施工，建筑智能化建设工程专业施工，计算机网络工程施工，环保建设工程专业施工，计算机', '软件及辅助设备（除计算机信息系统安全专用产品）', '锅炉及辅助设备', '自动化设备', '管道', '控制设备的批发', '零售'] 
  }      
];


Meteor.startup(function() {
  if(BusinessTypeLists.find().count() === 0) {
    businessTypeLists.forEach(function(list) {
      BusinessTypeLists.insert(list);
    })
  };
})



