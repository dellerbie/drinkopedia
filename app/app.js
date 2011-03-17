Ext.setup({
  tabletStartupScreen: 'splash.png',
  phoneStartupScreen: 'splash-phone.png',
  icon: '72x72.png',
  glossOnIcon: false,

  onReady: function() {
    var mp = new Drinkopedia.MasterPanel();
  }
});
