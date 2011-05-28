Ext.setup({
  tabletStartupScreen: 'splash.png',
  phoneStartupScreen: 'splash-phone.png',
  icon: '72x72.png',
  glossOnIcon: false,

  onReady: function() {
     MP = new Drinkopedia.MasterPanel();
  }
});
