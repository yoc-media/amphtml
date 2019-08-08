'use strict';

(function() {
  var href = context.location.href;
  var queryIndex = href.indexOf('?');

  if (queryIndex === -1) {
    return;
  }

  var queryParams = href.slice(queryIndex + 1).split('&');
  var params = queryParams.map(function(queryParam) {
    var eqIndex = queryParam.indexOf('=');
    if (eqIndex === -1) {
      return {
        prop: decodeParam(queryParam),
        value: '',
      };
    }

    return {
      prop: decodeParam(queryParam.slice(0, eqIndex)),
      value: decodeParam(queryParam.slice(eqIndex + 1)),
    };
  });

  var visxTagParams = params.find(function(param) {
    return param.prop === 'amp-visx-tag-params';
  });

  if (!visxTagParams) {
    return;
  }

  var props;
  try {
    props = JSON.parse(visxTagParams.value);
  } catch (e) {
    return;
  }

  var uaParam = params.find(function(param) {
    return param.prop === 'ua';
  });

  if (uaParam) {
    Object.defineProperty(navigator, 'userAgent', {
      get: function() {
        return uaParam.value;
      },
    });
  }

  var container = document.querySelector('#c');
  var adTag = document.createElement('div');

  adTag.setAttribute('data-visx', '');
  Object.entries(props).forEach(function(prop) {
    adTag.setAttribute(prop[0], prop[1]);
  });
  container.appendChild(adTag);

  var visxTag = document.createElement('script');
  visxTag.async = true;
  visxTag.src = '/examples/visx-tag.js';

  document.head.appendChild(visxTag);

  function decodeParam(str) {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  }
})();
