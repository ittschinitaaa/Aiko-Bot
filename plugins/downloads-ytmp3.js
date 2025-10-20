import fetch from 'node-fetch'
import yts from 'yt-search'
import axios from 'axios'

let handler = async (m, { conn, text, command, usedPrefix }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `✍️ *Ingresa el nombre de la canción o un enlace de YouTube*.
> Ejemplo: ${usedPrefix + command} DJ Malam Pagi`,
        m
      )
    }

    let search = await yts(text)
    let video = search.videos[0]
    if (!video) return conn.reply(m.chat, '☁️ No se encontró ningún resultado.', m)

    const apiUrl = `https://api.zenzxz.my.id/api/downloader/ytmp3v2?url=${encodeURIComponent(video.url)}`
    const res = await fetch(apiUrl)
    const data = await res.json()

    if (!data.success || !data.data?.download_url)
      return conn.reply(m.chat, '❌ Error al obtener el audio desde la API.', m)

    const info = data.data
    const size = await getSize(info.download_url)
    const sizeStr = size ? formatSize(size) : 'Desconocido'

    const caption = `🎶 *ＹＯＵＴＵＢＥ • ＭＰ3* ☁️
────────────────
> 🎵 *𝐓𝐈𝐓𝐔𝐋𝐎:* ${info.title}
> ⏰ *𝐃𝐔𝐑𝐀𝐂𝐈𝐎𝐍:* ${video.timestamp}
> 🎬 *𝐂𝐀𝐍𝐀𝐋:* ${video.author.name}
> 👀 *𝐕𝐈𝐒𝐓𝐀𝐒:* ${video.views.toLocaleString('es-PE')}
> 💾 *𝐓𝐀𝐌𝐀𝐍̃𝐎:* ${sizeStr}
> 🤩 *𝐂𝐀𝐋𝐈𝐃𝐀𝐃:* 128kbps
> 🗓️ *𝐏𝐔𝐁𝐋𝐈𝐂𝐀𝐃𝐎:* ${video.ago}
> 🔗 *𝐋𝐈𝐍𝐊:* ${video.url}
────────────────`

    const thumb = (await conn.getFile(video.thumbnail)).data

    await conn.sendMessage(m.chat, { image: thumb, caption }, { quoted: m })

    const audioBuffer = await (await fetch(info.download_url)).buffer()
    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      fileName: `${info.title}.mp3`,
      mimetype: "audio/mpeg",
      ptt: false
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `❌ Error: ${e.message}`, m)
  }
}

handler.command = ['ytmp3', 'song']
handler.tags = ['downloads']
handler.help = ['ytmp3 <texto o link>', 'song <texto>']

export default handler

async function getSize(url) {
  try {
    const response = await axios.head(url)
    const length = response.headers['content-length']
    return length ? parseInt(length, 10) : null
  } catch {
    return null
  }
}

function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  if (!bytes || isNaN(bytes)) return 'Desconocido'
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(2)} ${units[i]}`
}
