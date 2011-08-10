Ext.regModel('Category', {
  fields: ['name', 'id', 'children'],
  idProperty: 'id'
});

Ext.regModel('Drink', {
  fields: ["name", "ingredients", "mixingInstructions", "short-description", "glass", "tags"],
  idProperty: "id"
});

Ext.regModel('Favorite', {
  fields: ['id', 'drinkId'],
  proxy: {
      type: 'localstorage',
      id  : 'dp-faves'
  }
});

Drinkopedia.DrinksTagFilter = function(tag) {
  return new Ext.util.Filter({
    filterFn: function(item) {
      return item.get('tags').indexOf(tag) != -1;
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
  }]
};

Drinkopedia.Drinks = {
  "drinks": [{
    "id": 1,
    "name": "Moonlight",
    "ingredients": [{
      "amount": "2 oz.",
      "ingredient": "Apple Brandy"
    },{
      "amount": "1 tsp.",
      "ingredient": "Lemon Juice Superfine Sugar (or Simple Syrup)"
    }],
    "mixingInstructions": [{
      "instruction": "Shake with ice and strain into ice-filled old-fashioned glass.",
    },{
      "instruction": "Lorem ipsum dolor sit amet, consectetur adipinsing elit."
    }],
    "short-description": "Lorem ipsum dolor sit amet, consectetur adipinsing elit.",
    "tags": ["brandy", "most-popular", "martini"],
    "glass": "martini"
  },{
    "id": 2,
    "name": "Alfie Cocktail",
    "ingredients": [{
      "amount": "2 oz.",
      "ingredient": "Apple Brandy"
    },{
      "amount": "1 tsp.",
      "ingredient": "Lemon Juice Superfine Sugar (or Simple Syrup)"
    }],
    "mixingInstructions": [{
      "instruction": "ce and strain into ice-filled old-fashioned glass.",
    },{
      "instruction": "Lorem ipsum dolor sit amet, consectetur adipinsing elit."
    }],
    "short-description": "Lorem ipsum dolor sit amet, consectetur adipinsing elit.",
    "tags": ["vodka", "martini"],
    "glass": "martini"
  },{
    "id": 3,
    "name": "Mamie Gilroy",
    "ingredients": [{
      "amount": "2 oz.",
      "ingredient": "Apple Brandy"
    },{
      "amount": "1 tsp.",
      "ingredient": "Lemon Juice Superfine Sugar (or Simple Syrup)"
    }],
    "mixingInstructions": [{
      "instruction": "Shake with ice and strain into ice-filled old-fashioned glass.",
    },{
      "instruction": "Lorem ipsum dolor sit amet, consectetur adipinsing elit."
    }],
    "short-description": "Lorem ipsum dolor sit amet, consectetur adipinsing elit.",
    "tags": ["whiskey", "most-popular", "martini"],
    "glass": "martini"
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

Drinkopedia.DrinkStore = new Ext.data.Store({
  model: 'Drink',
  storeId: 'drinkStore'
});

Drinkopedia.FavoritesStore = new Ext.data.Store({
    model: "Favorite",
    storeId: 'favoritesStore',
    autoLoad: 'true'
});