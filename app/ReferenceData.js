Ext.regModel('Category', {
  fields: ['name', 'id', 'children'],
  idProperty: 'id'
});

Ext.regModel('Drink', {
  fields: ['name', 'ingredients', "mixing-instructions", "short-description", "glass", "tags"]
});

Drinkopedia.DrinksTagFilter = function(tag) {
  return new Ext.util.Filter({
    filterFn: function(item) {
      return item.get('tags').indexOf(tag) > 0;
    }
  });
};

Drinkopedia.Categories = {
  "categories": [{
    "name": "Most Popular",
    "id": "most-popular"
  },{
    "name": "All Drinks",
    "id": "all-drinks"
  },{
    "name": "By Liquor Type",
    "id": "liquor-type", 
    "children": [{
      "name": "Whiskey",
      "id": "whiskey"
    },{
      "name": "Vodka",
      "id": "vodka"
    },{
      "name":"Gin",
      "id": "gin"
    }]
  },{
    "name": "By Drink Type",
    "id": "drink-type",
    "children": [{
      "name": "Martini",
      "id":"martini"
    },{
      "name": "Shot",
      "id": "shot"
    }]
  },{
    "name": "Favorites",
    "id": "favorites"
  },{
    "name": "Add Ons",
    "id": "add-ons"
  }]
};

Drinkopedia.Drinks = {
  "drinks": [{
    "name": "Moonlight",
    "ingredients": "2 oz. Apple Brandy<br/>1 oz. Lemon Juice<br/>1 tsp. Superfine Sugar (or Simple Syrup)",
    "mixing-instructions": "Shake with ice and strain into ice-filled old-fashioned glass.",
    "short-description": "Lorem ipsum dolor sit amet, consectetur adipinsing elit.",
    "tags": ["brandy", "most-popular", "martini"],
    "glass": "martini",
  },{
    "name": "Alfie Cocktail",
    "ingredients": "1.5 oz. Lemon-flavored Vodka<br/>1 tbsp. Pineapple Juice<br/>1 dash Triple Sec",
    "mixing-instructions": "Shake with ice and strain into chilled cocktail glass.",
    "short-description": "Lorem ipsum dolor sit amet, consectetur adipinsing elit.",
    "tags": ["vodka", "martini"],
    "glass": "martini",
  },{
    "name": "Mamie Gilroy",
    "ingredients": "1.5 oz. Lemon-flavored Vodka<br/>1 tbsp. Pineapple Juice<br/>1 dash Triple Sec",
    "mixing-instructions": "Shake with ice and strain into chilled cocktail glass.",
    "short-description": "Lorem ipsum dolor sit amet, consectetur adipinsing elit.",
    "tags": ["whiskey", "most-popular", "martini"],
    "glass": "martini",
  }]
};

Drinkopedia.DrinksStore = new Ext.data.Store({
  model: 'Drink',
  storeId: 'drinksStore',
  data: Drinkopedia.Drinks.drinks,
  sorters: [{
    property: "name",
    direction: "ASC"
  }]
});

Drinkopedia.SubCategoriesStore = new Ext.data.Store({
  model: 'Category',
  storeId: 'subCategoryStore'
});