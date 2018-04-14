const switcher = cases => defaultCase => key => cases.hasOwnProperty(key) ? cases[key] : defaultCase;
const exIfFunction = f => f instanceof Function ? f() : f;
const switchF = cases => defaultCase => key => exIfFunction(switcher(cases)(defaultCase)(key));

module.exports = {
    switchF
}