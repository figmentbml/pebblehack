var fs = require('fs'),
    readline = require('readline');


var lineReader = require('line-reader');
var arr = [];

lineReader.eachLine('done.part1.csv', function(line, last) {
  // console.log(arr.length);
  var l = line.split(',');
  if (arr.length === 0) {
    arr.push([l[0]]);
    arr[0].push([[l[1],l[2]]]);
  } else {
    // console.log('else');
    for( var i = 0; i < arr.length; i++) {
      if(arr[i][0] === l[0]){
        var found = false;
        for(var t = 0; t<arr[i][1].length; t++ ){
          // console.log(arr[i][1][t]);
          if (arr[i][1][t] === [l[1],l[2]]){
            found = true;
          }
        }
        if(!found){
          // console.log('not found');
          arr[i][1].push([l[1],l[2]]);

        } else {
          // console.log('found');
          // console.log([l[1],l[2]]);
        }
      } else {
        arr.push([l[0],[[l[1],l[2]]]]);
      }
    }
  }

  // do whatever you want with line...
  if(last){
    // console.log(arr);
    // or check if it's the last one
    // console.log(JSON.stringify(arr));
    fs.writeFile('reallydone.js', JSON.stringify(arr), function (err) {});
  }
});

// rd.on('line', function(line) {
    // var l = line.split(',');
    // if (arr.length === 0) {
      // arr.push([l[0], [[l[1],l[2]]]])
    // } else {
      // for( var i = 0; i < arr.length; i++) {
        // if(arr[i][0] === l[0]){
          // arr[i].push([[l[1],l[2]]]);
        // } else {
          // arr.push([l[0], [[l[1],l[2]]]])
        // }
        // // console.log(arr[i]); 
      // }
    // }
    // // console.log(arr);
// });


// console.log(arr);
