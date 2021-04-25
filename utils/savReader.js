async function hexToDecimal9(rawHexString){
    const hexArray = rawHexString.split(' ');
    
    let decimalArray = [];
    await hexArray.forEach(x => {
      decimalArray.push(parseInt(x,16));
    })
    console.log({decimalArray})
    return decimalArray;
}

module.exports = {
    hexToDecimal9 : hexToDecimal9
}