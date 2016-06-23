// CurrentDate by Ruby

function onRun(context) {

  // Set up the date findng stuffs
  var d = new Date();
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var m = month[d.getMonth()];
  var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var w = weekday[d.getDay()];

  // One of the things that the context contains is the current document,
  // so let's fetch that.
  var doc = context.document;

  // From the document, we can fetch the current page that the user is looking at.
  var page = [doc currentPage];

  // This is copied-pasted from another plugin to get all layers in this page
  // which means if your $CurrentDate layer is in different page or in Symbols, this won't work
  var layers = [[doc currentPage] children];

  var CurrentDateLayer = false;

  [[doc currentPage] deselectAllLayers]

  for (var i = 0; i < layers.count(); i++) {
    var layer = layers[i];

    if ([layer name] == "$CurrentDate") {
      CurrentDateLayer = true;
      selection:[layer select:true byExpandingSelection:true];
      //layer.setIsVisible(!layer.isVisible())
      layer.stringValue = w + " " + m + " " + d.getDate() + " " + d.getFullYear()
      layer.adjustFrameToFit()
      doc.showMessage("CurrentDate layer updated!");
    }
  }

  //add a $CurrentDate layer if there's none
  //most of this is from Hello World example
  if(!CurrentDateLayer){
    // Now let's create a new text layer...
    var layer = MSTextLayer.alloc().initWithFrame_(NSMakeRect(0,0,100,100))
    // ...give it a large font...
    layer.font = NSFont.systemFontOfSize_(36.0)
    // ...set its text to a traditional value...
    layer.stringValue = w + " " + m + " " + d.getDate() + " " + d.getFullYear()
    layer.name = "$CurrentDate";
    // ...resize it so that the text just fits...
    layer.adjustFrameToFit()
    // ...and add it to the page
    page.addLayers_([layer])
    // Finally, lets center the view on our new layer
    // so that we can see where it is.
    doc.currentView().centerRect_(layer.rect())
  }
};
