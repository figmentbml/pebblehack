var UI = require('ui');
var Vector2 = require('vector2');

var companions = [
  {
    id: 1,
    name: 'Urban',
    icon: 'images/menu_icon.png',
    location: 'Foxtrot',
    date: '',
    type: 'urban',
    description: 'Foxtrots\' quickstep makes them hard to find. In time of need, whisper Echo Foxtrot and your new friend will appear.'
  },
  {
    id: 2,
    name: 'Trees',
    icon: 'images/menu_icon.png',
    location: 'Everhorn',
    date: '',
    type: 'trees',
    description: 'You might have seen Everhorn before. One of the oldest of the wooded creatures, his horns sometimes get mistaken for large tree branches.'   
  },
  {
    id: 3,
    name: 'Water',
    icon: 'images/menu_icon.png',
    location: 'Riverscale',
    date: '',
    type: 'water',
    description: 'Able to fly and swim, Riverscale likes to stay away from land. Riverscale also enjoys playing in the snow.'   
  },
  {
    id: 4,
    name: 'Other',
    icon: 'images/menu_icon.png',
    location: 'Spark gem',
    date: '',
    type: 'other',
    description: 'Use Spark gems to improve your health and help you explore more "dangerous" areas.'   
  }
];

var types = [
  {type: 'Urban', icon: 'images/urban_black.png'}, 
  {type: 'Trees', icon: 'images/trees_black.png'},
  {type: 'Water', icon: 'images/water_black.png'},
  {type: 'Other', icon: 'images/other_black.png'}
];

var myCompanions = [];

var main = new UI.Card({
  title: ' ',
  icon: 'images/menu_icon.png',
  body: 'Companions'
});
  
main.action({
  up: 'images/play_white.png',
  select: 'images/list_white.png',
});

main.show();

main.on('click', 'up', function(e) {
  var playScreen = new UI.Window({
    backgroundColor: 'white',
  });
  var randomCompanion = companions[Math.floor(Math.random() * companions.length)];
  var text = new UI.Text({
    text: 'You\'ve found the ' + randomCompanion.name + ' companion!',
    position: new Vector2(0,0),
    size: new Vector2(110, 168),
    color: 'black',
    textOverflow: 'wrap',
    textAlign: 'center'
  });
  playScreen.add(text);
  playScreen.show(text);
  var image = new UI.Image({
    image: randomCompanion.icon,
    position: new Vector2(20, 30),
    size: new Vector2(110, 168)
  });
  playScreen.add(image);
  playScreen.show(image);
  
  playScreen.action({
    select: 'images/tick_white.png',
    down: 'images/cross_white.png'
  });
  playScreen.show();
  playScreen.on('click', 'select', function(e) {
    console.log('show capture details');
    myCompanions.push(randomCompanion);
    showCaptureScreen(randomCompanion);
  });
  playScreen.on('click', 'down', function() {
    console.log('let go');
    playScreen.hide();
  });
});

function showCaptureScreen(companion) {
  var captureScreen = new UI.Window({
    backgroundColor: 'white',
  });
  var text = new UI.Text({
    text: 'Captured ' + companion.name,
    position: new Vector2(0,0),
    size: new Vector2(110, 168),
    color: 'black',
    textOverflow: 'wrap',
    textAlign: 'center',
    scrollable: true
  });
  captureScreen.add(text);
  captureScreen.show(text);
  var image = new UI.Image({
    image: companion.icon,
    position: new Vector2(10, 30),
    size: new Vector2(110, 168)
  });
  captureScreen.add(image);
  captureScreen.show(image);
  
  captureScreen.action({
    select: 'images/list_white.png'
  });
  captureScreen.show();
  captureScreen.on('click', 'select', function(e) {
    console.log('show list');
    goToCompanionList();
    captureScreen.hide();
  });
}

function goToCompanionList() {
  var formattedTypes = [];
  for (var i=0; i<types.length; i++) {
    formattedTypes.push({
      title: types[i].type,
      icon: types[i].icon
    });
  }
  var companionTypeList = new UI.Menu({
    fullscreen: true,
    sections: [{
      title: 'Companion Types',
      items: formattedTypes
    }],
    textColor: 'blue'
  });
  companionTypeList.show();
  companionTypeList.on('select', function(e) {
    console.log('menu item was clicked!');
    console.log(e.itemIndex);
    var selectedTypeCompanions = findMatchingType(types[e.itemIndex]);
    displayMyCompanions(selectedTypeCompanions);
  });
}
main.on('click', 'select', function() {
  goToCompanionList();
});

function findMatchingType(type) {
  var results = [];
  for (var i=0; i<myCompanions.length; i++) {
    console.log(myCompanions[i].type);
    var myCompanionType = myCompanions[i].type;
    console.log(type.type);
    if (myCompanionType.toLowerCase() === type.type.toLowerCase()) {
      results.push(myCompanions[i]);
    }
  }
  return results;
}

function displayMyCompanions(companionsByType) {
  var items = [];
  for (var i=0; i<companionsByType.length; i++) {
    items.push({
      title: companionsByType[i].name,
      subtitle: companionsByType[i].location + ' ' + companionsByType[i].date,
      icon: companionsByType[i].icon
    });
  }
  if (companionsByType.length === 0) {
    items.push({
      title: 'None Found!',
      subtitle: 'Get some companions!'
    });
  }
  var companionList = new UI.Menu({
    fullscreen: true,
    sections: [{
      title: 'Captured Companions',
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
}