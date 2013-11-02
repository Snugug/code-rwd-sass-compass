(function () {
  Modernizr.load({
    test: Modernizr.cssanimations,
    yep: '../css/enhancements/animations.css',
    nope: '../css/fallbacks/animations.css'
  });
}(window.Modernizr));