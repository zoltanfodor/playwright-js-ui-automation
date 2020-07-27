'use strict';

const calc = require('../calc');
const expect = require('chai').expect;

describe.only('calc', () => {
    /*
     * calc(3).v // 3
     * calc(3).add(5).v // 8
     * calc(3).minus(2).v // 1
     * calc(4).sqrt().v // 2
     * calc(3).times(10).v // 30
     * calc(10).divide(2).v // 5
     * calc(10).modulo(5).v // 0
     * calc(5).divide(0) // throw error
     * calc(-3).sqrt() // throw error
     * calc(3).add(4)
     *     .minus(3)
     *     .times(6).v // 24
     */

    // TODO: CREATE A REPO AND PUSH THE CODE INTO THAT
    const values = [[calc(3).v, "calc(3)", 3],
        [calc(3).add(5).v, "3 + 5", 8],
        [calc(3).minus(2).v, "3 - 2", 1],
        [calc(4).sqrt().v, "sqrt(2)", 2],
        [calc(3).times(10).v, "3 * 10", 30],
        [calc(10).divide(2).v, "10 / 2", 5],
        [calc(10).modulo(5).v, "10 modulo 5", 0],
        [calc(3).add(4).minus(3).times(6).v, "3 + 4 - 3 * 6", 24]];

    values.forEach((n) => {
        it(`${n[1]} should return ${n[2]}`, () => {
            expect(n[0]).to.equal(n[2]);
        });
    });

    it("calc(5).divide(0) should throw error", () => {
        expect(() => calc(5).divide(0)).to.throw();
    });

    it("calc(-3).sqrt() should throw error", () => {
        expect(() => calc(-3).sqrt()).to.throw();
    });
});
