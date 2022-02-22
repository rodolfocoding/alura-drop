const httpRequest = require('./httpRequest')

async function getVideo(id, slug, token) {
  let res = await httpRequest({
    url: `https://cursos.alura.com.br/mobile/courses/${slug}/busca-video-${id}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "alura-mobi/android",
      Host: "cursos.alura.com.br",
      Authorization: `Bearer ${token}`,
      Connection: "Keep-Alive",
    },
  });

  let [hd, sd] = JSON.parse(res.body);
  return hd.link;
}


module.exports = getVideo