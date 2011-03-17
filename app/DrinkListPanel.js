Drinkopedia.DrinkListPanel = Ext.extend(Ext.DataView, {
  portraitTpl: new Ext.XTemplate(
     '<div class="wrapper">',
   		'<div class="content">',
   			'<ul id="dp-drink-list">',
   			  '<tpl for=".">',
   				  '<li>',
    					'<img src="resources/images/{glass}.png" width="105" height="85" />',
    					'<div class="drink-content">',
    						'<h2>{name}</h2>',
    						'<p>{short-description}</p>',
    					'</div>',
    					'<div class="add-to-favorites"></div>',
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
    this.scroll = false;
    this.tpl = this.portraitTpl;
    this.itemSelector = '#dp-drink-list li';
    this.store = 'drinksStore';
    
    Drinkopedia.DrinkListPanel.superclass.initComponent.call(this);
    
    this.mon(this, "itemtap", this.handleItemTap, this);
  },
  
  handleItemTap: function(dv, idx, el, e){
    var record = this.store.getAt(idx);
    this.fireEvent('drinkSelected', this, record);
  },
});
Ext.reg('dp-drink-list-panel', Drinkopedia.DrinkListPanel);