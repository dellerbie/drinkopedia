Drinkopedia.SearchToolbar = Ext.extend(Ext.Toolbar, {
  dock: 'top',
 
  initComponent: function(){
    this.addEvents('search', 'back');
    
    var self = this;
    this.backButton = new Ext.Button({
      ui: 'back',
      text: 'Back',
      hidden: true,
      handler: function() {
          self.fireEvent('back', this);
      }
    });
    // this.searchField = new Ext.form.Text();
    
    this.items = [
      this.backButton,
      {xtype: 'spacer'},
      // this.searchField
    ];
    
    Drinkopedia.SearchToolbar.superclass.initComponent.call(this);
    // this.addEvents('search');
    
    // this.searchField.on('keyup', this.onSearchKeyUp, this);
  },

  onSearchKeyUp: function(t, e) {
    if (e.browserEvent.keyCode === 13) {
      var field = this.searchField;
      this.fireEvent('search', this, field.getValue());
      field.setValue("");
    }
  },

  showBackButton: function() {
    this.backButton.show();
    this.doComponentLayout();
  },
  
  hideBackButton: function() {
    this.backButton.hide();
    this.doComponentLayout();
  }
});

Ext.reg('dp-searchtoolbar', Drinkopedia.SearchToolbar);
