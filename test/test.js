import chai, { expect } from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

// import server from '../src/server';

describe('test', () => {
  it('true is true', () => expect(true).to.equal(true));
});

// ------------------------------

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;

describe('capitalize', () => {
  it('capitalizes single words', () => {
    expect(capitalize('express')).to.equal('Express');
    expect(capitalize('mongoose')).to.equal('Mongoose');
  });

  it('leaves strings with no words alone', () => {
    expect(capitalize('')).to.equal('');
    expect(capitalize('123')).to.equal('123');
  });
});

// ------------------------------

const hello = (name, cb) => {
  cb(`hello ${name}`);
};

describe('hello', () => {
  it('should call callback with correct greeting', () => {
    const cb = spy();
    hello('foo', cb);
    expect(cb).to.have.been.calledWith('hello foo');
  });
});

// ------------------------------

const once = fn => {
  let returnValue;
  let called = false;

  return function () {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, arguments);
    }

    return returnValue;
  };
};

describe('once', () => {
  let cb, proxy;

  beforeEach(() => {
    cb = spy();
    proxy = once(cb);
  });

  it('calls the original function', () => {
    proxy();

    expect(cb).to.have.been.called;
  });

  it('calls the original function only once', () => {
    proxy();
    proxy();

    expect(cb).to.have.been.calledOnce;
  });

  it('calls original function with right this and args', () => {
    const obj = {};
    proxy.call(obj, 1, 2, 3);

    expect(cb).to.have.been.calledOn(obj);
    expect(cb).to.have.been.calledWith(1, 2, 3);
  });
});
