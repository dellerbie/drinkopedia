Drinkopedia.DrinkViewPanel = Ext.extend(Ext.DataView, {
  portraitTpl: new Ext.XTemplate(
    '<tpl for=".">',
     '<div class="wrapper">',
   		'<div class="content">',
  			'<div id="img-wrapper">',
  				'<img src="resources/images/{glass}.png" width="" height="" />',
  				'<span id="add-to-fave" class="{[Drinkopedia.FavoritesStore.find("drinkId", values.id) > -1 ? "selected":""]}"></span>',
  			'</div>',
  			'<div id="ingredients-wrapper">',
  				'<h2>Ingredients:</h2>',
  				'<ul id="ingredients">',
  				  '<tpl for="ingredients">',
  					'<li>',
  						'<span class="amount">{amount}</span>',
  						'<span class="ingredient">{ingredient}</span>',
  					'</li>',
  					'</tpl>',
  				'</ul>',
  			'</div>',
  			'<div id="directions-wrapper">',
  				'<h2>Directions:</h2>',
  				'<ol id="directions">',
  				  '<tpl for="mixingInstructions">',
  					'<li>',
  						'<span class="ordinal">{[xindex]}.</span>',
  						'<span class="direction">{instruction}</span>',
  					'</li>',
  					'</tpl>',
  				'</ol>',
  			'</div>',
  		'</div>',
   	'</div>',
   	'</tpl>'
  ),
  
  initComponent: function() {    
    this.monitorOrientation = true;
    this.scroll = true;
    this.tpl = this.portraitTpl;
    this.store = 'drinkStore';
    this.itemSelector = '#drink-view .content';
    
    Drinkopedia.DrinkViewPanel.superclass.initComponent.call(this);
    
    this.mon(this, "itemtap", this.handleItemTap, this);
  },
  
  handleItemTap: function(dv, idx, item, e){
    if(e.getTarget('#add-to-fave')) {
      var faveEl = Ext.get(e.getTarget('#add-to-fave')).toggleCls('selected');
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
      
      // update the star on the drink list view
      var dl = Ext.getCmp('drink-list');
      Ext.get(dl.getNode(Drinkopedia.DrinksStore.getById(recId))).down('.add-to-favorites').toggleCls('selected');
    } 
  }
});
Ext.reg('dp-drink-view-panel', Drinkopedia.DrinkViewPanel);