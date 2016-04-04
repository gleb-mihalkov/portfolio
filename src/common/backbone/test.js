var ViewA = View.extend({
  className: "class-1",
  events: {
    "click .block-1": "foo"
  }
});

var ViewB = ViewA.extend({
  className: "class-1 class-2",
  events: {
    "click .block-2": "bar"
  }
});

var b = new ViewB();