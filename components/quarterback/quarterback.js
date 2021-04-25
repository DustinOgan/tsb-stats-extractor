async function mapStats(decimalArray){
    const qbRaw = {
    passAttemptsBase : decimalArray[0],
    passCompleteBase : decimalArray[1],
    passTdBase : decimalArray[2], //include attempt Mod
    passIntBase : decimalArray[3], //includes attempt mod
    passYardsBase : decimalArray[4],
    rushAttempts : decimalArray[5],
    rushYardsBase : decimalArray[6],
    modPassRushYards: decimalArray[7],
    rushTDsBase: decimalArray[8]
    };
    
    return qbRaw
}


async function calculatePassAttempts(passAttemptsBase, passTdBase){
    const modifier = (passTdBase % 4) * 256
    const passAttempts = passAttemptsBase + modifier
    return passAttempts;
}

async function calculatePassCompletions(passCompleteBase, passIntBase){
    const modifier = (passIntBase % 4) * 256;
    const passCompletions = passCompleteBase + modifier
    return passCompletions;
}

async function calculatePassYards(passYardsBase, modPassRushYards){
    const modifier = (modPassRushYards / 8) * 256
    const passYards = passYardsBase + modifier;
    return passYards;
}

async function calculatePassTds(passTdBase){
    const actualTouchDowns = Math.floor(passTdBase/4)
    return actualTouchDowns;
}

async function calculatePassInts(passIntBase){
    const actualInts = Math.floor(passIntBase/4);
    return actualInts;
}

async function calculateAvgPassingYards(yards,attempts){
    let avg = yards/attempts
    avg -= avg%.1
    return avg
}

/*
http://primecomputing.com/
NFL Quarterback Rating Formula
(National Football League)
a = (((Comp/Att) * 100) -30) / 20
b = ((TDs/Att) * 100) / 5
c = (9.5 - ((Int/Att) * 100)) / 4
d = ((Yards/Att) - 3) / 4

a, b, c and d can not be greater than 2.375 or less than zero.

QB Rating = (a + b + c + d) / .06
*/
async function calculateRating(yards, attempts, completions, touchdowns, interceptions){
    const factorA = (((completions/attempts) * 100) -30) /20
    const factorB = ((touchdowns/attempts)* 100 ) / 5
    const factorC = (9.5 - ((interceptions/attempts)*100)) /4
    const factorD = ((yards/attempts) -3) /4
    let rating = (factorA + factorB + factorC + factorD) / .06
    rating -= rating%.1
    return rating;
}

module.exports = { 
    mapStats : mapStats,
    calculatePassAttempts : calculatePassAttempts,
    calculatePassCompletions : calculatePassCompletions,
    calculatePassYards : calculatePassYards,
    calculatePassTds : calculatePassTds,
    calculatePassInts : calculatePassInts,
    calculateAvgPassingYards: calculateAvgPassingYards,
    calculateRating: calculateRating
}
