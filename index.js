const Discord = require('discord.js');
const bot = new Discord.Client();

bot.login(process.env.TOKEN);

stevenID = process.env.stevenID;

isSteven = false;

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async (message) => {
    if (message.content.startsWith("!kick ") && message.channel.id == process.env.botmusicid) {
	    
	    noms = process.env.noms.split(",");
	    
		message.content = message.content.substring(6);
		for(i = 0; i < noms.length; i++){
			if (message.content.toLowerCase().trim() == noms[i]){
				kickSteven(message)
				return;
			}
		}
	}
});

bot.on('guildMemberAdd', async (member) => {
	if (member.id == stevenID) {
		
		role = member.guild.roles.get(process.env.roleID);

		oldName = role.name.split(" - ");

		number = deromanize(oldName[0]);
		
		if(isSteven)
			number--;
		else
			number++;

		isSteven = false;
		
		role.setName(romanize(number) + " - " + oldName[1]);
		
		await member.addRole(member.guild.roles.get(process.env.roleID));
		await member.addRole(member.guild.roles.get(process.env.DjID));
		await member.addRole(member.guild.roles.get(process.env.mauditsID));
		await member.setNickname(process.env.nomSteven);
		
	}
});

async function kickSteven(message){
	
	let steven = message.mentions.members.first() || message.guild.members.get(stevenID);
	
	if(message.author == steven)
		isSteven = true;
	
	reason = "";
	
	await steven.kick(reason);
	
	message.channel.send(":boot: <:Stivan:453296826859388958> :dash: :ok_hand:");
}

function romanize (num) {
	if (!+num)
		return false;
	var	digits = String(+num).split(""),
		key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
		       "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
		       "","I","II","III","IV","V","VI","VII","VIII","IX"],
		roman = "",
		i = 3;
	while (i--)
		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	return Array(+digits.join("") + 1).join("M") + roman;
}

function deromanize (str) {
	var	str = str.toUpperCase(),
		validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
		token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
		key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
		num = 0, m;
	if (!(str && validator.test(str)))
		return false;
	while (m = token.exec(str))
		num += key[m[0]];
	return num;
}
