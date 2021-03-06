/* global describe, it, expect */

/* eslint-disable camelcase, no-proto, no-shadow */

const Authenticator = require('../lib/authenticator');


describe('Authenticator', () => {
  describe('#framework', () => {
    describe('with an authenticate function used for authorization', () => {
      const passport = new Authenticator();
      passport.framework({
        initialize() {
          return function initialize() {};
        },
        authenticate(passport, name, options) {
          return function authenticate() {
            return `authenticate(): ${name} ${options.assignProperty}`;
          };
        },
      });

      const rv = passport.authorize('foo')();
      it('should call authenticate', () => {
        expect(rv).to.equal('authenticate(): foo account');
      });
    });

    describe('with an authorize function used for authorization', () => {
      const passport = new Authenticator();
      passport.framework({
        initialize() {
          return function initialize() {};
        },
        authenticate(passport, name, options) {
          return function authenticate() {
            return `authenticate(): ${name} ${options.assignProperty}`;
          };
        },
        authorize(passport, name, options) {
          return function authorize() {
            return `authorize(): ${name} ${options.assignProperty}`;
          };
        },
      });

      const rv = passport.authorize('foo')();
      it('should call authorize', () => {
        expect(rv).to.equal('authorize(): foo account');
      });
    });
  });
});
