
let int = (value) => {
    if(typeof value == 'string') return parseInt(value);
    else if(typeof value == 'number') return value;
    else return 0;
}

module.exports = {
    int,
    toInt : int,
}