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

import {validateData, loadScript} from '../3p/3p';

/**
 * @param {!Window} global
 * @param {!Object} data
 */
export function visx(global, data) {
  const adTag = global.document.createElement('div');
  validateData(data, ['auid']);
  adTag.setAttribute('data-visx', '');
  adTag.setAttribute('data-ad-unit', data.auid);
  adTag.setAttribute('data-amp', '');
  global.document.getElementById('c').appendChild(adTag);
  loadScript(global, 'http://localhost:8082/tmp/tag.js');
}
