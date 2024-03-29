Drinkopedia.HomePanel = Ext.extend(Ext.DataView, {
  cls: 'home-panel',
  
  portraitTpl: new Ext.XTemplate(
     '<div class="wrapper">',
   		'<div class="content">',
   			'<h1 class="select-drink">Select Your Drink</h1>',
   			'<ul id="dp-menu-items">',
   			  '<tpl for=".">',
   				  '<li class="{id} {[xindex % 2 === 0 ? "last" : ""]}">{name}</li>',
   				'</tpl>',
   				'<div class="clear"></div>',
   			'</ul>',
   			'<div class="clear"></div>',
   		'</div>',
   	'</div>'
  ),
  
  initComponent: function() {
    this.addEvents('categorySelected');
    this.enableBubble('categorySelected');
    
    this.monitorOrientation = true;
    this.scroll = true;
    this.tpl = this.portraitTpl;
    
    this.store = new Ext.data.Store({
      model: 'Category',
      data: Drinkopedia.Categories.categories,
      autoDestroy: true
    });
    
    this.itemSelector = '#dp-menu-items li';
    
    Drinkopedia.HomePanel.superclass.initComponent.call(this);
    
  //  this.mon(this, "orientationChange", this.onOrientation, this);
   this.mon(this, "itemtap", this.handleItemTap, this);
   this.mon(this, "beforeactivate", this.handleBeforeActivate, this);
  },
  
  handleItemTap: function(dv, idx, el, e){
    var record = this.store.getAt(idx),
        category = record.get('id');
    this.fireEvent('categorySelected', this, record);
  },
  
  handleBeforeActivate: function() {
    if(Drinkopedia.FavoritesStore.getCount()) {
      this.getEl().down('.favorites').show();
    } else {
      this.getEl().down('.favorites').hide();
    }
  }
});
Ext.reg('dp-home-panel', Drinkopedia.HomePanel);