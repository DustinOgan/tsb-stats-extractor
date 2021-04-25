const { expect } = require("chai");
const qb = require('./quarterback.js');


describe('the qb ', async function () {
    it('should successfully import qb stats', async function () {
        const expectedQb = {
            passAttemptsBase: 20,
            passCompleteBase: 10,
            passTdBase: 8,
            passIntBase: 12,
            passYardsBase: 38,
            rushAttempts: 3,
            rushYardsBase: 28,
            modPassRushYards: 8,
            rushTDsBase: 4
        };
        const testQb = await qb.mapStats([20, 10, 8, 12, 38, 3, 28, 8, 4])
        expect(testQb).to.eql(expectedQb);
    })


    it('should successfully calculate pass attempts for low attempts qb < 255', async function () {
        /* attempts 229 * yards 3068 * completeions 126 * touchdowns 26 * interceptions 20* rushing att 56  rushing yards 306  * rushing tds 4*/
        const testQb = await qb.mapStats([ 229, 126, 104, 80, 252, 56, 50, 89, 16 ])
        const passAttempts = await qb.calculatePassAttempts(testQb.passAttemptsBase, testQb.passTdBase)
        expect(passAttempts).to.equal(229);
    })

   
    
    it('should successfully calculate passing tds for high attempts qb', async function(){
        /* attempts: 272 * Yards 3778 * completions 155 * touchdowns 31 * interceptions 27 */
        const testQb = await qb.mapStats([16, 155, 125, 108, 194, 0, 0, 112, 0])
        const testPassTd = await qb.calculatePassTds(testQb.passTdBase)
        expect(testPassTd).to.equal(31);
    })
    it('should successfully calculate passing tds for low attempts qb', async function(){
        const testQb = await qb.mapStats([20, 10, 8, 12, 38, 3, 28, 8, 4])
        const testPassTd = await qb.calculatePassTds(testQb.passTdBase)
        expect(testPassTd).to.equal(2);
    })
    it('should successfully calculate passing ints for high attempts qb', async function(){
        /* attempts: 272 * Yards 3778 * completions 155 * touchdowns 31 * interceptions 27 */
        const testQb = await qb.mapStats([16, 155, 125, 108, 194, 0, 0, 112, 0])
        const testPassInt = await qb.calculatePassTds(testQb.passIntBase)
        expect(testPassInt).to.equal(27);
    })
    it('should successfully calculate passing ints for low attempts qb', async function(){
        const testQb = await qb.mapStats([20, 10, 8, 12, 38, 3, 28, 8, 4])
        const testPassInt = await qb.calculatePassTds(testQb.passIntBase)
        expect(testPassInt).to.equal(3);
    })

    

    it('should successfully calculate pass attempts for high attempts qb > 255', async function () {
        /* attempts: 272 * Yards 3778 * completions 155 * touchdowns 31 * interceptions 27 */
        const testQb = await qb.mapStats([16, 155, 125, 108, 194, 0, 0, 112, 0])
        const testPassAttempts = await qb.calculatePassAttempts(testQb.passAttemptsBase, testQb.passTdBase)
        expect(testPassAttempts).to.equal(272);
    })
    it('should calculate passing yards over 255', async function () {
        /* attempts: 272 * Yards 3778 * completions 155 * touchdowns 31 * interceptions 27 */
        const testQb = await qb.mapStats([16, 155, 125, 108, 194, 0, 0, 112, 0])
        const testPassYards = await qb.calculatePassYards(testQb.passYardsBase, testQb.modPassRushYards)
        expect(testPassYards).to.equal(3778);
    })
    it('should successfully calculate pass completions', async function(){
        /* attempts: 272 * Yards 3778 * completions 155 * touchdowns 31 * interceptions 27 */
        const testQb = await qb.mapStats([16, 155, 125, 108, 194, 0, 0, 112, 0])
        const testCompletions = await qb.calculatePassCompletions(testQb.passCompleteBase, testQb.passIntBase)
        expect(testCompletions).to.equal(155);
    })

    it('should correclty calculate the avg passing yardage to match tsb on screen', async function(){
        /* attempts: 272 * Yards 3778 * completions 155 *  avg 13.8 */
        const testYardsActual = 3778;
        const testAttemptsActual = 272
        const avgPassingYards = await qb.calculateAvgPassingYards(testYardsActual,testAttemptsActual);
        expect(avgPassingYards).to.equal(13.8)
    })

    it('should return a rating that matches the rating displayed on tsb player info', async function(){
        /* attempts: 272 * Yards 3778 * completions 155 * touchdowns 31 * interceptions 27 */
        const testYardsActual = 3778;
        const testAttemptsActual = 272;
        const testCompletionsActual = 155;
        const testTouchdownsActual = 31;
        const testInterceptionsActual = 27;
        const testQbRating = await qb.calculateRating(testYardsActual,testAttemptsActual,testCompletionsActual, testTouchdownsActual, testInterceptionsActual)
        expect(testQbRating).to.equal(104.0)
    })

    it('should return a completion percentage that matches the rating displayed for a player in tsb', async function(){
        /* attempts: 272 * completions 155 * completion percentage 56.9*/
        const testAttemptsActual = 272;
        const testCompletionsActual = 155;   
        const testCompletionPercentage = await qb.calculateCompletionPercentage(testAttemptsActual,testCompletionsActual)
        expect(testCompletionPercentage).to.equal(56.9)     
    })
    

    /* based on full season of backup qb with 0 for all statistics */
    it( 'should successfully handle the 0 case', async function(){
        const testQb = await qb.mapStats([ 0, 0, 0, 0, 0, 0, 0, 0, 0 ])
        const testPassAttempts = await qb.calculatePassAttempts(testQb.passAttemptsBase, testQb.passTdBase)
        expect(testPassAttempts).to.equal(0);
        const testPassYards = await qb.calculatePassYards(testQb.passYardsBase, testQb.modPassRushYards)
        expect(testPassYards).to.equal(0);

    } )
})