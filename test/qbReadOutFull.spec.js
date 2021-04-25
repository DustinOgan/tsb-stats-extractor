const qb = require('../components/quarterback/quarterback.js')
describe('the qb stats', async function () {
    it('should print out in their entirety', async function () {

        const qbRawStats = await qb.mapStats([16, 155, 125, 108, 194, 0, 0, 112, 0])
        qbStats = {
            passingCompletions: await qb.calculatePassCompletions(qbRawStats.passCompleteBase, qbRawStats.passIntBase),
            passingAttempts: await qb.calculatePassAttempts(qbRawStats.passAttemptsBase, qbRawStats.passTdBase),
            passingYards: await qb.calculatePassYards(qbRawStats.passYardsBase, qbRawStats.modPassRushYards),
            passingTouchdowns: await qb.calculatePassTds(qbRawStats.passTdBase),
            interceptions: await qb.calculatePassInts(qbRawStats.passIntBase)
        }


        console.log({ qbStats })

    })
});