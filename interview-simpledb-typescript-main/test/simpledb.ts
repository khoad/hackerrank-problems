import { SimpleDB, SimpleDBInterface } from '../lib/simpledb';
import * as assert from 'assert';

describe('SimpleDB', function () {
  it('setting a value means it exists', function () {
    let db: SimpleDBInterface = new SimpleDB();

    assert.equal(db.get('a'), null);
    db.set('a', 10);
    assert.equal(db.get('a'), 10);
  });

  it('unsetting a value means it does not exist', function () {
    let db: SimpleDBInterface = new SimpleDB();

    db.set('a', 10);
    assert.equal(db.get('a'), 10);
    db.unset('a');
    assert.equal(db.get('a'), null);
  });

  it('can rollback changes to values', function () {
    let db: SimpleDBInterface = new SimpleDB();

    db.begin();
    db.set('a', 10);
    assert.equal(db.get('a'), 10);

    db.begin();
    db.set('a', 20);
    assert.equal(db.get('a'), 20);

    assert.doesNotThrow(() => db.rollback());
    assert.equal(db.get('a'), 10);

    assert.doesNotThrow(() => db.rollback());
    assert.equal(db.get('a'), null);

    assert.throws(() => db.rollback());
  });

  it('can have a nested commit', function () {
    let db: SimpleDBInterface = new SimpleDB();

    db.begin();
    db.set("a", 30);

    db.begin();
    db.set("a", 40);

    assert.doesNotThrow(() => db.commit());

    assert.equal(db.get('a'), 40);

    assert.throws(() => db.rollback());

    assert.throws(() => db.commit());
  });

  it('can have interleaved keys', function () {
    let db: SimpleDBInterface = new SimpleDB();

    db.set("a", 10);
    db.set("b", 10);
    assert.equal(db.get('a'), 10);
    assert.equal(db.get('b'), 10);

    db.begin();
    db.set("a", 20);
    assert.equal(db.get('a'), 20);
    assert.equal(db.get('b'), 10);

    db.begin();
    db.set("b", 30);
    assert.equal(db.get('a'), 20);
    assert.equal(db.get('b'), 30);

    db.rollback();
    assert.equal(db.get('a'), 20);
    assert.equal(db.get('b'), 10);

    db.rollback();
    assert.equal(db.get('a'), 10);
    assert.equal(db.get('b'), 10);
  });

  it('can rollback an unset key', function () {
    let db: SimpleDBInterface = new SimpleDB();

    db.set("a", 10);
    assert.equal(db.get('a'), 10);

    db.begin();
    assert.equal(db.get('a'), 10);
    db.set("a", 20);
    assert.equal(db.get('a'), 20);

    db.begin();
    db.unset("a");
    assert.equal(db.get('a'), null);

    assert.doesNotThrow(() => db.rollback());
    assert.equal(db.get('a'), 20);

    assert.doesNotThrow(() => db.commit());
    assert.equal(db.get('a'), 20);
  });

  it('can commit an unset key', function () {
    let db: SimpleDBInterface = new SimpleDB();

    db.set("a", 10);
    assert.equal(db.get('a'), 10);

    db.begin();
    assert.equal(db.get('a'), 10);
    db.unset("a");
    assert.equal(db.get('a'), null);

    assert.doesNotThrow(() => db.rollback());
    assert.equal(db.get('a'), 10);

    db.begin();
    db.unset("a");
    assert.equal(db.get('a'), null);

    assert.doesNotThrow(() => db.commit());
    assert.equal(db.get('a'), null);

    db.begin();
    assert.equal(db.get('a'), null);
    db.set("a", 20);
    assert.equal(db.get('a'), 20);

    db.commit();
    assert.equal(db.get('a'), 20);
  });
});