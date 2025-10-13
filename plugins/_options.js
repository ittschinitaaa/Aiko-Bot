const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const chat = global.db.data.chats[m.chat]
const { antiLink, antiLinks, detect, welcome, modoadmin, nsfw, economy, gacha } = global.db.data.chats[m.chat]
let type = command.toLowerCase()
let isEnable = chat[type] !== undefined ? chat[type] : false
switch (type) {
case 'welcome': case 'bienvenida': {
if (m.isGroup && !(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
chat.welcome = isEnable
break
}
case 'modoadmin': case 'onlyadmin': {
if (m.isGroup && !(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
chat.modoadmin = isEnable
break
}
case 'detect': case 'alertas': {
if (m.isGroup && !(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
chat.detect = isEnable
break
}
case 'antilink': case 'antienlace': {
if (m.isGroup && !(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
chat.antiLink = isEnable
break
}
case 'antilinks': case 'antienlaces': {
if (m.isGroup && !(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
chat.antiLinks = isEnable
break
}
case 'nsfw': case 'modohorny': {
if (m.isGroup && !(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
chat.nsfw = isEnable
break
}
case 'economy': case 'economia': {
if (m.isGroup && !(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
chat.economy = isEnable
break
}
case 'rpg': case 'gacha': {
if (m.isGroup && !(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
chat.gacha = isEnable
break
}}
if (args[0] === 'on' || args[0] === 'enable') {
if (isEnable) return conn.reply(m.chat, `ꕥ *${type}* ya estaba *activado*.`, m)
isEnable = true
} else if (args[0] === 'off' || args[0] === 'disable') {
if (!isEnable) return conn.reply(m.chat, `ꕥ *${type}* ya estaba *desactivado*.`, m)
isEnable = false
} else {
return conn.reply(m.chat, `「🌱」Un administrador puede activar o desactivar el *${command}* utilizando:\n\n● _Activar_ » *${usedPrefix}${command} enable*\n● _Desactivar_ » *${usedPrefix}${command} disable*\n\nꕥ Estado actual » *${isEnable ? '✓ Activado' : '✗ Desactivado'}*`, m)
}
chat[type] = isEnable
conn.reply(m.chat, `🍄 Has *${isEnable ? 'activado' : 'desactivado'}* el *${type}* para este grupo.`, m)
}

handler.help = ['welcome', 'bienvenida', 'modoadmin', 'onlyadmin', 'nsfw', 'modohorny', 'economy', 'economia', 'rpg', 'gacha', 'detect', 'alertas', 'antilink', 'antienlace', 'antilinks', 'antienlaces']
handler.tags = ['nable']
handler.command = ['welcome', 'bienvenida', 'modoadmin', 'onlyadmin', 'nsfw', 'modohorny', 'economy', 'economia', 'rpg', 'gacha', 'detect', 'alertas', 'antilink', 'antienlace', 'antilinks', 'antienlaces']
handler.group = true

export default handler
