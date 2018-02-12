/**
 * Scoped so as not to pollute global namespace
 */
var utils = {
  getCoords: function (elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
  },

  /**
   * fetches a json file from the specified path and executes callback
   * @param path
   * @param callback
   */
  fetchJSONFile: function (path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
  },
  /**
   * flattens the specified array (removes nesting)
   * @param array
   */
  flattenArray: function (array) {
      var result = {};
      function recurse (cur, prop) {
          if (Object(cur) !== cur) {
              result[prop] = cur;
          } else if (Array.isArray(cur)) {
               for(var i=0, l=cur.length; i<l; i++)
                   recurse(cur[i], prop + "[" + i + "]");
              if (l == 0)
                  result[prop] = [];
          } else {
              var isEmpty = true;
              for (var p in cur) {
                  isEmpty = false;
                  recurse(cur[p], prop ? prop+"."+p : p);
              }
              if (isEmpty && prop)
                  result[prop] = {};
          }
      }
      recurse(array, "");
      return result;  
  },
  searchArray: function (key, array){
    for (var i=0; i < array.length; i++) {
      if (array[i].name === key) {
        return array[i];
      }
    }
  },
  /**
   * debouncing, executes the function if there was no new event in $wait milliseconds
   * @param func
   * @param wait
   * @param scope
   * @returns {Function}
   */
  debounce: function(func, wait, scope) {
    var timeout;
    return function() {
      var context = scope || this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * In case of a "storm of events", this executes once every $threshold
   * @param fn
   * @param threshold
   * @param scope
   * @returns {Function}
   */
  throttle: function(fn, threshold, scope) {
    threshold || (threshold = 250);
    var last, deferTimer;

    return function() {
      var context = scope || this;
      var now = +new Date, args = arguments;

      if (last && now < last + threshold) {
        // Hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }
};
