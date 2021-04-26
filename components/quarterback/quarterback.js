async function mapStats(decimalArray){
    const qbRaw = {
    passAttemptsBase : decimalArray[0],
    passCompleteBase : decimalArray[1],
    passTdBase : decimalArray[2],
    passIntBase : decimalArray[3], 
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
    //hacky truncation without rounding to the tenths place
    avg =  (parseInt(avg*10)/10).toFixed(1)  
    return parseFloat(avg)
}

async function calculateRating(yards, attempts, completions, touchdowns, interceptions){
    const factorA = (((completions/attempts) * 100) -30) /20
    const factorB = ((touchdowns/attempts)* 100 ) / 5
    const factorC = (9.5 - ((interceptions/attempts)*100)) /4
    const factorD = ((yards/attempts) -3) /4
    let rating = (factorA + factorB + factorC + factorD) / .06
    rating -= rating%.1
    return rating;
}

async function calculateCompletionPercentage(attempts, completions){
    let completionPercentage = completions/attempts;
    let completionWholeNumber = completionPercentage * 100
    //hacky truncation without rounding to the tenths place
    let computedNumber =  (parseInt(completionWholeNumber*10)/10).toFixed(1)  
    return parseFloat(computedNumber);
}

async function calculateRushAttempts(rushAttempts){
    return rushAttempts;
}

module.exports = { 
    mapStats : mapStats,
    calculatePassAttempts : calculatePassAttempts,
    calculatePassCompletions : calculatePassCompletions,
    calculatePassYards : calculatePassYards,
    calculatePassTds : calculatePassTds,
    calculatePassInts : calculatePassInts,
    calculateAvgPassingYards: calculateAvgPassingYards,
    calculateRating: calculateRating,
    calculateCompletionPercentage: calculateCompletionPercentage,
    calculateRushAttempts: calculateRushAttempts
}
