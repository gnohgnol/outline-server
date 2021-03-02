/*
  Copyright 2020 The Outline Authors

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import * as formatting from './data_formatting';

describe('formatBytesParts', () => {
  if (process?.versions?.node) {
    it('doesn\'t run on Node', () => {
      expect(() => formatting.formatBytesParts(0, 'en')).toThrow();
    });
  } else {
    it('extracts the unit string and value separately', () => {
      const english = formatting.formatBytesParts(0, 'en');
      expect(english.unit).toEqual('B');
      expect(english.value).toEqual('0');

      const korean = formatting.formatBytesParts(2, 'kr');
      expect(korean.unit).toEqual('B');
      expect(korean.value).toEqual('2');

      const russian = formatting.formatBytesParts(3000, 'ru');
      expect(russian.unit).toEqual('кБ');
      expect(russian.value).toEqual('3');

      const simplifiedChinese = formatting.formatBytesParts(1.5 * 10 ** 9, 'zh-CN');
      expect(simplifiedChinese.unit).toEqual('吉字节');
      expect(simplifiedChinese.value).toEqual('1.5');

      const farsi = formatting.formatBytesParts(133.5 * 10 ** 6, 'fa');
      expect(farsi.unit).toEqual('مگابایت');
      expect(farsi.value).toEqual('۱۳۳٫۵');
    });
  }
});

describe('formatBytes', () => {
  if (process?.versions?.node) {
    it('doesn\'t run on Node', () => {
      expect(() => formatting.formatBytes(0, 'en')).toThrow();
    });
  } else {
    it('Formats data amounts', () => {
      expect(formatting.formatBytes(2.1, 'zh-TW')).toEqual('2 byte');
      expect(formatting.formatBytes(7.8 * 10 ** 3, 'ar')).toEqual('8 كيلوبايت');
      expect(formatting.formatBytes(1.5 * 10 ** 6, 'tr')).toEqual('1,5 MB');
      expect(formatting.formatBytes(10 * 10 ** 9, 'jp')).toEqual('10 GB');
      expect(formatting.formatBytes(2.35 * 10 ** 12, 'pr')).toEqual('2.35 TB');
    });

    it('Omits trailing zero decimal digits', () => {
      expect(formatting.formatBytes(10 ** 12, 'en')).toEqual('1 TB');
    });
  }
});
