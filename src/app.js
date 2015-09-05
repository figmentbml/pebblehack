var UI = require('ui');
var Vector2 = require('vector2');

var companions = [
  {
    id: 1,
    name: 'Urban',
    icon: 'images/menu_icon.png',
    location: 'location',
    date: 'date acquired',
    description: 'lots of text'   
  },
  {
    id: 2,
    name: 'Trees',
    icon: 'images/menu_icon.png',
    location: 'location',
    date: 'date acquired',
    description: 'lots of text'   
  },
  {
    id: 3,
    name: 'Water',
    icon: 'images/menu_icon.png',
    location: 'location',
    date: 'date acquired',
    description: 'lots of text'   
  },
  {
    id: 4,
    name: 'Other',
    icon: 'images/menu_icon.png',
    location: 'location',
    date: 'date acquired',
    description: 'lots of text'   
  }
];

var main = new UI.Card({
  title: 'GeoMonster',
  icon: 'images/menu_icon.png',
  subtitle: 'Gotta catch \'em all!',
  body: 'Exit.'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'GeoMonster',
        icon: 'images/menu_icon.png',
      }, {
        title: 'Exit',
        subtitle: 'don\'t leave us!'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var items = [];
  for (var i=0; i<companions.length; i++) {
    items.push({
      title: companions[i].name,
      subtitle: companions[i].location + ' ' + companions[i].date,
      icon: companions[i].icon
    });
  }
  var companionList = new UI.Menu({
    fullscreen: true,
    sections: [{
      title: 'Acquired Companions',
      items: items
    }]
  });
  companionList.show();
  companionList.on('select', function(e) {
    console.log('menu item was clicked!');
    console.log(e.itemIndex);
    var detailcard = new UI.Card({
      title: companions[e.itemIndex].name,
      subtitle: companions[e.itemIndex].location + ' ' + companions[e.itemIndex].date,
      icon: companions[e.itemIndex].icon,
      body: companions[e.itemIndex].description,
      scrollable: true
    });
    detailcard.show();
  });
});
