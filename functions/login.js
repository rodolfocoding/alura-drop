const httpRequest = require('./httpRequest')

async function logIn(email, password) {
  let res = await httpRequest({
    url: "https://cursos.alura.com.br/mobile/token",
    method: "POST",
    body: `password=${password}&client_secret=3de44ac5f5bccbcfba14a77181fbdbb9&client_id=br.com.alura.mobi&username=${email}&grant_type=password`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "alura-mobi/android",
      Host: "cursos.alura.com.br",
      Connection: "Keep-Alive",
    },
  });

  if (res.body.includes("access_token"))
    return JSON.parse(res.body).access_token;

  return false;
}

module.exports = logIn