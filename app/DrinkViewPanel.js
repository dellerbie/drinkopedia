Drinkopedia.DrinkViewPanel = Ext.extend(Ext.Panel, {
  portraitTpl: new Ext.XTemplate(
     '<div class="wrapper">',
   		'<div id="drink-view" class="content">',
  			'<div id="img-wrapper">',
  				'<img src="resources/images/{glass}.png" width="" height="" />',
  				'<span id="add-to-fave"></span>',
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
   	'</div>'
  ),
  
  initComponent: function() {    
    this.monitorOrientation = true;
    this.scroll = true;
    this.tpl = this.portraitTpl;
    Drinkopedia.DrinkViewPanel.superclass.initComponent.call(this);
  }
});
Ext.reg('dp-drink-view-panel', Drinkopedia.DrinkViewPanel);