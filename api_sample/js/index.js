
var app = {
  // Application Constructor
  initialize: function() {
    this.frobulateManager = null;
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup.
  bindEvents: function() {
    window.addEventListener('load', this.onLoad, false);
  },
  // load Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onLoad: function() {
  	clobberlog();

    if (!('getFrobulate' in navigator)) {
      console.log('navigator.getFrobulate is not defined');
      return;
    }

    console.log('Hooray, we have navigator.getFrobulate');

    navigator.getFrobulate()
      .then(function(frobulate) {
        app.frobulateManager = frobulate;

        app.updateStateValue();
        app.updateLevelValue();

        app.frobulateManager.addEventListener('statechange', app.stateChangedEvent);
        app.frobulateManager.addEventListener('levelchange', app.levelChangedEvent);

        document.getElementById("DoButton").onclick = function () {
          doSomething();
        };

	    });
	},

  updateStateValue: function() {
    if (app.frobulateManager.running) {
      document.getElementById('RunningInput').value = app.frobulateManager.running;
      return;
    }
    document.getElementById('RunningInput').value = "[not supported]";
  },

  updateLevelValue: function() {
    if (app.frobulateManager.level) {
      document.getElementById('LevelInput').value = app.frobulateManager.level;
      return;
    }
    document.getElementById('LevelInput').value = "[not supported]";
  },

  stateChangedEvent: function(evt) {
    console.log('Received Event: ' + evt.type);
    app.updateStateValue();
  },

  levelChangedEvent: function(evt) {
    console.log('Received Event: ' + evt.type);
    app.updateLevelValue();
  }
};

function doSomething () {
  navigator.getFrobulate()
    .then(function(frobulate) {
      frobulate.doSomethingNow();
    });
}

function newLog (arg) {
    var textArea = document.getElementById("console");
    textArea.value = timestamp() + ": " + arg + '\n' + textArea.value;
}

function clobberlog (arg) {
    var oldLog = Function.prototype.bind.call(console.log, console);
    console.log = function (arg) {
	oldLog(arg);
	newLog(arg);
    };
}

function timestamp () {
    var date = new Date();
    var ms = date.getMilliseconds();
    var s = date.getSeconds();
    var mi = date.getMinutes();
    var h = date.getHours();
    var d = date.getDate();
    var mo = date.getMonth() + 1;
    var y = date.getFullYear();
    function z (num) {
	return "" + (num < 10 ? "0" : "") + num;
    }
    return "" + y + ":" + z(mo) + ":" + z(d) + ":" + z(h) + ":" + z(mi) + ":" + z(s) + ":" + (ms < 100 ? "0" : "") + (ms < 10 ? "0" : "") + ms;
}

function objectToString (object) {
    var toPrint = "";
    for (var propertyName in object) {
	if (typeof object[propertyName] === 'function') {
	    continue;
	}
	if (propertyName[0] === '_') {
	    continue;
	}
	toPrint = toPrint + '\n\t' + propertyName + ": " + object[propertyName];
    }
    return toPrint;
}

app.initialize();
