const isEmpty = async function (objKeyVal) {
    var list = Object.entries(objKeyVal)
    let _empty = false

    for (let i=0; i<list.length; i++) {
        if(typeof list[i][1] === 'undefined' || list[i][1].trim() === '') {
            console.log(`${list[i][0]} is empty or undefined`)
            list[i][1] = ''
            _empty = true
        }
        else {
            list[i][1] = list[i][1].trim();
        }
    }

    return _empty;
}

module.exports = isEmpty;