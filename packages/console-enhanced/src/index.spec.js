/* eslint-env node, mocha */

/* eslint no-console: 0 */
/* eslint no-underscore-dangle: 0 */

import { expect } from 'chai';
import stdMocks from 'std-mocks';

import {
  enhanceConsole,
  log,
  restoreConsole,
} from './index';

/**
 * @var keep references to original methods for later comparison
 */
const originalConsoleMethods = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
};

describe('Library', () => {
  before(() => (stdMocks.use()));
  after(() => (stdMocks.restore()));

  describe('#enhanceConsole()', () => {
    it('should create a _preEnhancement object on console', () => {
      expect(console._preEnhancement).to.equal(undefined);
      enhanceConsole();
      expect(console._preEnhancement).to.be.an('object');
    });

    it('should override the logging methods', () => {
      expect(console.debug).not.to.equal(originalConsoleMethods.debug);
      expect(console.error).not.to.equal(originalConsoleMethods.error);
      expect(console.info).not.to.equal(originalConsoleMethods.info);
      expect(console.log).not.to.equal(originalConsoleMethods.log);
      expect(console.warn).not.to.equal(originalConsoleMethods.warn);
    });
  });

  describe('#log()', () => {
    it('should write to stdout', () => {
      log('hello');
      log('foo');

      expect(stdMocks.flush().stdout.slice(6)).to.equal(3);
    });
  });

  describe('#restoreConsole()', () => {
    it('should restore the console methods', () => {
      restoreConsole();

      expect(console.debug).to.equal(originalConsoleMethods.debug);
      expect(console.error).to.equal(originalConsoleMethods.error);
      expect(console.info).to.equal(originalConsoleMethods.info);
      expect(console.log).to.equal(originalConsoleMethods.log);
      expect(console.warn).to.equal(originalConsoleMethods.warn);
    });

    it('should remove the console._preEnhancement property', () => {
      expect(console._preEnhancement).to.equal(undefined);
    });
  });
});
