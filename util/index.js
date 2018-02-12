const exemptions = username => {
    console.log(username);
    return true;
}

const filtering = text => {
    console.log('filtering:', text);
    return text;
}

module.exports = {
    censorship: {
        exemptions,
        filtering
    }
};
