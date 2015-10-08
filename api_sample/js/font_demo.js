
var app = {
  // Application Constructor
  initialize: function() {
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

    if (window.location.protocol === "file:") {
      window.document.title = "(Local) " + window.document.title;
    }
    else if (window.location.protocol != "https:") {
      window.document.title = "(Unsecure) " + window.document.title;
    }

    document.getElementById("DoButton").onclick = function () {
      getFonts();
    };

	},

};

function getFonts () {

  var fontListPromise = FontAccess.getFonts();
  fontListPromise.then(function(fontDescriptionArray) {
      // success
      fontDescriptionArray.forEach(function(fontDescription) {
          console.log("This font is " + fontDescription.family +
                      " with a style of " + fontDescription.style);
      });
  }, function(error) {
      // failure
      console.log("getFonts failed: " + error);
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
