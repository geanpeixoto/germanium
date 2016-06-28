import {Clazz} from '../src/clazz';

describe("Clazz", function() {
  it("expect to return truty", function() {
    let clazz = new Clazz();
    expect(clazz.returnTruty()).toBeTruthy();
  });
});
