/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {loadScript, validateData} from '../3p/3p';
import {userAssert} from '../src/log';

const AD_UNIT = 'adUnit';
const AD_UNIT_DESKTOP = 'adUnitDesktop';
const AD_UNIT_SMARTPHONE = 'adUnitSmartphone';
const AD_UNIT_TABLET = 'adUnitTablet';
const IS_MOBILE = 'isMobile';
const PAGE_URL = 'pageUrl';
const TARGETING_PROPERTY_RE = /^targeting[A-Z]/;

/**
 * @param {!Window} global
 * @param {!Object} data
 */
export function visx(global, data) {
  const dataKeys = Object.keys(data);
  const targetingProps = dataKeys.filter(dataKey =>
    TARGETING_PROPERTY_RE.test(dataKey)
  );
  const validateProps = [
    AD_UNIT,
    AD_UNIT_DESKTOP,
    AD_UNIT_SMARTPHONE,
    AD_UNIT_TABLET,
    IS_MOBILE,
    PAGE_URL,
  ].concat(targetingProps);

  validateData(data, [], validateProps);

  // array of passed visx attributes to amp-ad tag
  const visxProps = dataKeys.filter(visxProp =>
    validateProps.includes(visxProp)
  );

  userAssert(
    dataKeys.some(dataKey =>
      [AD_UNIT, AD_UNIT_DESKTOP, AD_UNIT_SMARTPHONE, AD_UNIT_TABLET].includes(
        dataKey
      )
    ),
    'visx: at least 1 ad unit id must be specified'
  );

  const {document} = global;
  const adTag = document.createElement('div');

  adTag.setAttribute('data-visx', '');

  visxProps.forEach(dataKey => {
    adTag.dataset[dataKey] = data[dataKey];
  });

  document.getElementById('c').appendChild(adTag);

  loadScript(global, 'https://s.visx.net/tag.js', undefined, () => {
    global.context.noContentAvailable();
  });
}
