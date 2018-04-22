const getNyannersGuild = message => message.client.guilds.get('182712193287061504');

const shilkworm = message => {
    const guild = getNyannersGuild(message);
    if (!guild.available) {
        message.channel.send('Server is not available at the moment.');
        return;
    }
    const member = guild.member(message.author);
    if (!member) {
        message.channel.send('Could not find you in the server. Try messaging lipgloss and they will try to help you.');
        return;
    }
    if (!member.roles.get('437436944360800256')) {
        const goodBoyRole = guild.roles.get('437436944360800256')
        member.addRole(goodBoyRole, 'read the rules!');
        message.channel.send('Thanks for the reading the rules. ^_^ Enjoy your role and have fun on the server!');
        return;
    }
    message.channel.send('Looks like you already have the role for reading the rules. ^_^');
}


module.exports = shilkworm;
