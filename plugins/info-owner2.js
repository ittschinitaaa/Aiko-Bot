var handler = async (m, { conn }) => {
  const ownerNumber = global.owner[0][0] + '@s.whatsapp.net'
  const ownerName = global.owner[0][1] || 'Propietario'
  const github = 'https://github.com/ittschinitaaa/Senko-Bot'
  const instagram = 'https://www.instagram.com/ittschinitaaa/'

  const texto = `
🌸 *INFORMACIÓN DEL OWNER* 🌸

🪪 *Nombre:* ${ownerName}
📞 *Número:* wa.me/${global.owner[0][0]}
💻 *GitHub:* ${github}
📷 *Instagram:* ${instagram}

━━━━━━━━━━━━━━━
🦊 *Senko-Bot* está bajo el cuidado de su creadora.
Cualquier duda, sugerencia o reporte, podés contactarla 💖
`

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/swwwag.jpg' }, // Imagen representativa
    caption: texto,
    footer: 'Senko-Bot 💫 by Chinita',
    templateButtons: [
      { index: 1, urlButton: { displayText: '💻 GitHub Oficial', url: github } },
      { index: 2, urlButton: { displayText: '📷 Instagram', url: instagram } },
      { index: 3, quickReplyButton: { displayText: '🌸 Menú Principal', id: '.menu' } },
      { index: 4, quickReplyButton: { displayText: '📩 Reportar un error', id: '.report' } }
    ],
    headerType: 4
  }, { quoted: m })
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner', 'creadora', 'dueño']

export default handler
