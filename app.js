var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
// var _ = require("./lodash.js");
// var parser = require('xml2json');

var main = new UI.Card({
    subtitle: 'River Data',
    body: '\n     ',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
});

var loadingWindow = new UI.Window({
    backgroundColor: 'black'
});

(function() {
    var textfield = new UI.Text({
        size: new Vector2(140, 60),
        font: 'gothic-24-bold',
        text: '...Fetching...',
        textAlign: 'center'
    });
    
    var windSize = loadingWindow.size();
    var textfieldPos = textfield.position()
    .addSelf(windSize)
    .subSelf(textfield.size())
    .multiplyScalar(0.5);
    textfield.position(textfieldPos);
    loadingWindow.add(textfield);
    loadingWindow.show();
})();

var list = [
    {
      title: 'River Data',
      subtitle: 'Fetching...'
    }
];

var menu = new UI.Menu({
    sections: [{
      items: list
    }]
});

var fetch = function(callback) {
    console.log('going for fetch!');
    ajax({ url: 'https://waterservices.usgs.gov/nwis/iv/?format=waterml,2.0&sites=02146000&parameterCd=00060,00065&siteStatus=all', type: 'xml' }, function(data) {
        console.log('fetch done');
        console.log(data);
        var discharge = data.split('wml2:value>')[1].split('<')[0];
        var gageHeight = data.split("Gage height")[1].split('wml2:value>')[1].split('<')[0];
        list.push({
            title: 'Discharge',
            subtitle: discharge,
        });
        list.push({
            title: 'Gage Height',
            subtitle: gageHeight,
        });
        list[0].subtitle = '';
        menu.show();   
    });
};

fetch();

// main.on('click', 'select', function(e) {
//     console.log('click menu.on select');
//     fetch();
// });
    
// loadingWindow.show();
// setTimeout(function() {
//     loadingWindow.hide();
    
// }, 1000);
// main.show();
