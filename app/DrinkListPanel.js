Drinkopedia.DrinkListPanel = Ext.extend(Ext.DataView, {
  portraitTpl: new Ext.XTemplate(
     '<div class="wrapper">',
   		'<div class="content">',
   			'<ul id="dp-drink-list">',
   			  '<tpl for=".">',
   				  '<li>',
    					'<img src="resources/images/{glass}.png" width="" height="" />',
    					'<div class="drink-content">',
    						'<h2>{name}</h2>',
    						'<p>{short-description}</p>',
    					'</div>',
    					'<div class="add-to-favorites {[Drinkopedia.FavoritesStore.find("drinkId", values.id) > -1 ? "selected":""]}"></div>',
    					'<div class="clear"></div>',
    				'</li>',
   				'</tpl>',
   			'</ul>',
   		'</div>',
   	'</div>'
  ),
  
  
  
  initComponent: function() {
    this.addEvents('drinkSelected');
    this.enableBubble('drinkSelected');
    
    this.monitorOrientation = true;
    this.scroll = true;
    this.tpl = this.portraitTpl;
    this.itemSelector = '#dp-drink-list li';
    this.store = 'drinksStore';
    this.emptyText = 'You havent selected any favorites';
    
    Drinkopedia.DrinkListPanel.superclass.initComponent.call(this);
    
    this.mon(this, "itemtap", this.handleItemTap, this);
  },
  
  handleItemTap: function(dv, idx, el, e){
    if(e.getTarget('.add-to-favorites')) {
      this.handleAddToFave(dv, idx, el, e);
      return;
    } 
    var record = this.store.getAt(idx);
    this.fireEvent('drinkSelected', this, record);
  },
  
  handleAddToFave: function(dv, index, item, e) {
    var faveEl = Ext.get(e.getTarget('.add-to-favorites')).toggleCls('selected');
    var rec = dv.getRecord(item);
    var recId = rec.getId();
    var faveStore = Drinkopedia.FavoritesStore;
    
    var faveIndex = faveStore.find('drinkId', recId);
    
    if(faveEl.hasCls('selected')) {
       if( faveIndex < 0) faveStore.add({drinkId: recId});
    } else {
      faveStore.removeAt(faveIndex);
    }
    faveStore.sync();
  }
});
Ext.reg('dp-drink-list-panel', Drinkopedia.DrinkListPanel);