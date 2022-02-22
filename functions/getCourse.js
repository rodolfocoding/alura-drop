const httpRequest = require('./httpRequest')

async function getCourse(access_token, course) {
  let res = await httpRequest({
    url: `https://cursos.alura.com.br/mobile/v2/course/${course}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "alura-mobi/android",
      Host: "cursos.alura.com.br",
      Authorization: `Bearer ${access_token}`,
      Connection: "Keep-Alive",
    },
  });

  return res.body;
}

module.exports = getCourse