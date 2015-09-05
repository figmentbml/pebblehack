var UI = require('ui');
var Vector2 = require('vector2');

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
  var menu = new UI.Menu({
    fullscreen: true,
    sections: [{
      title: 'Acquired Monsters',
      items: [{
        title: 'Monster name',
        subtitle: 'location',
        body: 'date added',
        icon: 'images/menu_icon.png'
      }, {
        title: 'Monster name',
        subtitle: 'location',
        body: 'date added',
        icon: 'images/menu_icon.png'
      }]
    }]
  });
  menu.add(sections);
  menu.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
