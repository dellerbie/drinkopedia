Drinkopedia.MasterPanel = Ext.extend(Ext.Panel, {
  layout: 'card',
  fullscreen: true,
  

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
    }];

    Drinkopedia.MasterPanel.superclass.initComponent.call(this);

    this.mon(this.tbar, 'back', this.onBack, this);
    // this.mon(this.tbar, 'search', this.onSearch, this);
    this.mon(this, 'categorySelected', this.onCategorySelected, this);
  },

  afterRender: function() {
    Drinkopedia.MasterPanel.superclass.afterRender.apply(this, arguments);
    this.showHome();
  },
  
  showHome: function(anim) {
    this.setActiveItem('home', anim || 'fade');
    this.tbar.setTitle('Drinkopedia');
    this.tbar.hideBackButton();
  },
  
  onCategorySelected: function(t, record) {
    console.log('category selected');
    if(record.get('children')) {
      var subCatStore = Ext.StoreMgr.get(Drinkopedia.SubCategoriesStore.storeId);
      subCatStore.loadData(record.get('children'));
      this.setActiveItem('subcategory-list', 'fade');
    } else {
      console.log('inside else');
      this.clearDrinksFilter();
      var drinksStore = Ext.StoreMgr.get(Drinkopedia.DrinksStore.storeId);
      var filter = record.get('id');
      console.log("filter => %s", filter);

      if(filter != 'all-drinks') drinksStore.filter(Drinkopedia.DrinksTagFilter(filter));
      this.setActiveItem('drink-list', 'fade');
    }
    
    this.tbar.setTitle(record.get('name'));
    this.tbar.showBackButton();
  },
  
  onBack: function() {
    var current = this.getLayout().activeItem;
    if (current instanceof Drinkopedia.DrinkListPanel) {
      this.showHome({type: 'slide', direction: 'right'});
      this.clearDrinksFilter();
    }
  },
  
  clearDrinksFilter: function() {
    Ext.StoreMgr.get(Drinkopedia.DrinksStore.storeId).clearFilter();
  }
});
Ext.reg('dp-master-panel', Drinkopedia.MasterPanel);