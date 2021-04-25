const savReader = require("./savReader")
const assert = require('chai').assert;
const expect = require('chai').expect;

describe('savReader', async function(){
    it('should convert a line of hext to a line of decimal', async function(){
        const row1 = 'E5 7E 68 50 FC 38 32 59 10'//.split(' ');
        const decimalArray = await savReader.hexToDecimal9(row1);
        expect(decimalArray).to.eql([ 229, 126, 104, 80, 252, 56, 50, 89, 16 ]);
        
    })
    it('should convert a second line of hex to decimal0', async function(){
        const row1 = '10 9B 7D 6C C2 00 00 70 00'
        const decimalArray = await savReader.hexToDecimal9(row1);
        expect(decimalArray).to.eql([ 16, 155, 125, 108, 194, 0, 0, 112, 0 ])
    })
    it("should just print the decimal array", async function(){
        const row1 = '10 9B 7D 6C C2 00 00 70 00'
        const decimalArray = await savReader.hexToDecimal9(row1);
    })
})

