const exemptions = username => {
    return true;
}

const filtering = text => {
    return text;
}

module.exports = {
    censorship: {
        exemptions,
        filtering
    }
};
