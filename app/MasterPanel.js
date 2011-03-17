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

      if(filter != 'all-drinks') drinksStore.filter(Drinkopedia.DrinksTagFilter(filter));
      this.showPanel('drink-list', record.get('name'));
    }
  },
  
  onBack: function() {
    if(!this.prevPanels || this.prevPanels.length == 0) { 
      this.showHome();
      return;
    }
    var prevPanel = this.prevPanels.pop();
    this.setActiveItem(prevPanel.id, {type: 'slide', direction: 'left'});
    this.tbar.setTitle(prevPanel.drinkopediaTitle);
  },
  
  clearDrinksFilter: function() {
    Ext.StoreMgr.get(Drinkopedia.DrinksStore.storeId).clearFilter();
  }
});
Ext.reg('dp-master-panel', Drinkopedia.MasterPanel);