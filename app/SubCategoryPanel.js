Drinkopedia.SubCategoryPanel = Ext.extend(Ext.DataView, {
  portraitTpl: new Ext.XTemplate(
     '<div class="wrapper">',
   		'<div class="content">',
   			'<ul id="dp-subcategory-list">',
   			  '<tpl for=".">',
   				  '<li><h2>{name}</h2></li>',
   				'</tpl>',
   			'</ul>',
   		'</div>',
   	'</div>'
  ),
  
  initComponent: function() {
    this.addEvents('categorySelected');
    this.enableBubble('categorySelected');
    
    this.monitorOrientation = true;
    this.scroll = false;
    this.tpl = this.portraitTpl;
    this.itemSelector = '#dp-subcategory-list li';
    this.store = 'subCategoryStore';
    
    Drinkopedia.DrinkListPanel.superclass.initComponent.call(this);
    
    this.mon(this, "itemtap", this.handleItemTap, this);
  },
  
  handleItemTap: function(dv, idx, el, e){
    var record = this.store.getAt(idx);
    this.fireEvent('categorySelected', this, record);
  },
});
Ext.reg('dp-subcategory-list-panel', Drinkopedia.SubCategoryPanel);