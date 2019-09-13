(function() {
  var script = document.createElement('script');
  script.async = true;
  script.src =
    'http://localhost:3000/yiva/template.js?creative=http%3A%2F%2Flocalhost%3A3000%2Ftests%2Ffixtures%2Fvast%2Fvast-very-short-localhost3000.xml&adConfig=%7B%22display%22%3A%7B%22effect%22%3A%22inline%22%7D%2C%22advertisementMessage%22%3A%7B%22contentBelow%22%3A%22%3Cspan+id%3D%5C%5C%5C%22advertisement_message%5C%5C%5C%22+style%3D%5C%5C%5C%22font-size%3A+12px%5C%5C%5C%22%3Ead+message%3C%2Fspan%3E%22%7D%2C%22metrics%22%3A%7B%22provider%22%3A%5B%7B%22title%22%3A%22test%22%2C%22type%22%3A%22test%22%7D%5D%7D%7D&product=yiva';

  var slot = document.createElement('div');
  slot.id = 'visx-test_ad_unit_001';

  document.getElementById('c').appendChild(slot);

  document.body.appendChild(script);
})();
