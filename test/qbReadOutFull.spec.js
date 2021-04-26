const qb = require('../components/quarterback/quarterback.js')
const { expect } = require("chai");

describe('the qb stats', async function () {
    it('should console log to match B Rothlisberger season stats', async function () {

        /*passing ->  attempts: 272,  completions 155, tds: 31, int: 27, yds 3778, avg 13.8, comp% 56.9, rating 104.0 */
        /*rushing ->  attempts : 0 , yds : 0, avg 0.0, td 0 */
        const qbRawStats = await qb.mapStats([16, 155, 125, 108, 194, 0, 0, 112, 0])
        let passingAttempts = await qb.calculatePassAttempts(qbRawStats.passAttemptsBase, qbRawStats.passTdBase);
        let passingCompletions = await qb.calculatePassCompletions(qbRawStats.passCompleteBase, qbRawStats.passIntBase);
        let passingTouchdowns = await qb.calculatePassTds(qbRawStats.passTdBase);
        let interceptions = await qb.calculatePassInts(qbRawStats.passIntBase);
        let passingYards = await qb.calculatePassYards(qbRawStats.passYardsBase, qbRawStats.modPassRushYards);
        let rushingAttempts = await qb.calculateRushAttempts(qbRawStats.rushAttempts);
        let rushingYards =  await qb.calculateRushYards(qbRawStats.rushYardsBase,qbRawStats.modPassRushYards);
        let rushingTds = await qb.calculateRushTds(qbRawStats.rushTDsBase);
        qbStats = {
            'passingAttempts': passingAttempts,
            'passingCompletions': passingCompletions,
            'passingTouchdowns': passingTouchdowns,
            'interceptions': interceptions,
            'passingYards': passingYards,
            'avgPassingYards': await qb.calculateAvgYards(passingYards, passingAttempts),
            'completionPercent': await qb.calculateCompletionPercentage(passingAttempts, passingCompletions),
            'rating': await qb.calculateRating(passingYards, passingAttempts, passingCompletions, passingTouchdowns, interceptions),
            'rushingAttempts' : rushingAttempts,
            'rushingYards' : rushingYards,
            'rushingAvg' : await qb.calculateAvgYards(rushingYards, rushingAttempts),
            'rushingTds':     rushingTds   
        }
        expect(qbStats.passingAttempts).to.equal(272) &&
        expect(qbStats.passingCompletions).to.equal(155) &&
        expect(qbStats.passingTouchdowns).to.equal(31) &&
        expect(qbStats.interceptions).to.equal(27) &&
        expect(qbStats.passingYards).to.equal(3778) &&
        expect(qbStats.avgPassingYards).to.equal(13.8) &&
        expect(qbStats.completionPercent).to.equal(56.9) &&
        expect(qbStats.rating).to.equal(104.0) &&
        expect(qbStats.rushingAttempts).to.equal(0) &&
        expect(qbStats.rushingYards).to.equal(0) &&
        expect(qbStats.rushingAvg).to.equal(0.0) &&
        expect(qbStats.rushingTds).to.equal(0);

        console.log(qbStats )

    })
});