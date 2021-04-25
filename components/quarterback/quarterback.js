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

module.exports = { 
    mapStats : mapStats,
    calculatePassAttempts : calculatePassAttempts,
    calculatePassCompletions : calculatePassCompletions,
    calculatePassYards : calculatePassYards,
    calculatePassTds : calculatePassTds,
    calculatePassInts : calculatePassInts
}
