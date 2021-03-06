/* global describe, it, expect, before */
/* jshint expr: true */

/* eslint-disable camelcase, no-proto, no-shadow */


const chai = require('chai');
const Passport = require('../..').Passport;
const authenticate = require('../../lib/middleware/authenticate');

describe('middleware/authenticate', () => {
  describe('error with callback', () => {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function authenticate() {
      this.error(new Error('something is wrong'));
    };

    const passport = new Passport();
    passport.use('error', new Strategy());

    let request;
    let error;

    before((done) => {
      function callback(e) {
        error = e;
        done();
      }

      chai.connect.use(authenticate(passport, 'error', callback))
        .req((req) => {
          request = req;
        })
        .dispatch();
    });

    it('should pass error to callback', () => {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('something is wrong');
    });

    it('should pass user as undefined to callback', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(request.user).to.be.undefined;
    });

    it('should not set user on request', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(request.user).to.be.undefined;
    });
  });

  describe('error with callback and options passed to middleware', () => {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function authenticate() {
      this.error(new Error('something is wrong'));
    };

    const passport = new Passport();
    passport.use('error', new Strategy());

    let request;
    let error;

    before((done) => {
      function callback(e) {
        error = e;
        done();
      }

      chai.connect.use(authenticate(passport, 'error', { foo: 'bar' }, callback))
        .req((req) => {
          request = req;
        })
        .dispatch();
    });

    it('should pass error to callback', () => {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('something is wrong');
    });

    it('should pass user as undefined to callback', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(request.user).to.be.undefined;
    });

    it('should not set user on request', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(request.user).to.be.undefined;
    });
  });
});
