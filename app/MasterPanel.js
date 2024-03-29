Drinkopedia.MasterPanel = Ext.extend(Ext.Panel, {
  layout: 'card',
  fullscreen: true,
  cls: 'dp-panel',
  
  initComponent: function(){
    this.tbar = new Drinkopedia.SearchToolbar();
    this.dockedItems = [this.tbar];
    
    this.items = [{
      xtype: 'dp-home-panel',
      id: 'home'
    },{
      xtype: 'dp-drink-list-panel',
      id: 'drink-list'
    },{
      xtype: 'dp-subcategory-list-panel',
      id: 'subcategory-list'
    },{
      xtype: 'dp-drink-view-panel',
      id: 'drink-view'
    }];

    Drinkopedia.MasterPanel.superclass.initComponent.call(this);

    this.mon(this.tbar, 'back', this.onBack, this);
    this.mon(this, 'categorySelected', this.onCategorySelected, this);
    this.mon(this, 'drinkSelected', this.onDrinkSelected, this);
  },

  afterRender: function() {
    Drinkopedia.MasterPanel.superclass.afterRender.apply(this, arguments);
    this.showHome();
  },
  
  showHome: function(anim) {
    this.setActiveItem('home', {type: 'slide', direction: 'right'});
    this.tbar.setTitle('Drinkopedia');
    this.tbar.hideBackButton();
    this.prevPanels = [];
  },
  
  showPanel: function(id, title, anim) {
    var activeItem = this.getLayout().activeItem;
    activeItem.drinkopediaTitle = this.tbar.title;
    if(activeItem.id != 'home') this.prevPanels.push(activeItem);
    this.setActiveItem(id, anim || {type: 'slide', direction: 'left'});
    this.tbar.setTitle(title);
    this.tbar.showBackButton();
  },
  
  onCategorySelected: function(t, record) {
    if(record.get('children')) {
      var subCatStore = Ext.StoreMgr.get(Drinkopedia.SubCategoriesStore.storeId);
      subCatStore.loadData(record.get('children'));
      this.showPanel('subcategory-list', record.get('name'));
    } else {
      this.clearDrinksFilter();
      var drinksStore = Ext.StoreMgr.get(Drinkopedia.DrinksStore.storeId);
      var filter = record.get('id');
      
      switch(filter) {
        case 'all-drinks': break;
        case 'favorites': 
          drinksStore.filterBy(function(record, id) {
            return Drinkopedia.FavoritesStore.find('drinkId', record.getId()) > -1;
          });
          break;
        default: drinksStore.filter(Drinkopedia.DrinksTagFilter(filter));
      }

      this.showPanel('drink-list', record.get('name'));
    }
  },
  
  onDrinkSelected: function(t, record) {
    var drinkStore = Ext.StoreMgr.get(Drinkopedia.DrinkStore.storeId);
    drinkStore.loadData([record.data]);
    this.showPanel('drink-view', record.get('name'));
  },
  
  onBack: function() {
    if(!this.prevPanels || this.prevPanels.length == 0) { 
      this.showHome();
      return;
    }
    var prevPanel = this.prevPanels.pop();
    this.setActiveItem(prevPanel.id, {type: 'slide', direction: 'right'});
    this.tbar.setTitle(prevPanel.drinkopediaTitle);
  },
  
  clearDrinksFilter: function() {
    Ext.StoreMgr.get(Drinkopedia.DrinksStore.storeId).clearFilter();
  }
});
Ext.reg('dp-master-panel', Drinkopedia.MasterPanel);