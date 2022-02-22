require("dotenv").config();

const logger = require("./utils/logger");
const data = require("./dtConfig");
const logIn = require("./functions/login.js");
const getCourse = require("./functions/getCourse.js");
const getVideo = require("./functions/getVideo.js");
const createFolder = require("./functions/createFolder.js");
const videoDownload = require("./functions/videoDownload.js");

async function handle() {
  let email = data.email;
  let password = data.password;
  let courses = data.courses;

  logger.log(10, { email, password });

  for (let i = courses.length - 1; i >= 0; i--) {
    courses[i] = courses[i].split("course/");
  }

  logger.log(1, { email, password });

  let access_token = await logIn(email, password);

  if (!access_token) {
    logger.log(2, { email, password });
    return;
  }

  logger.log(6, { email, password });
  logger.log(7, { email, password });

  for (let i = 0; i < courses.length; i++) {
    let parse = await getCourse(access_token, courses[i][1]);

    logger.log(8, { email, password });
    let infos = JSON.parse(parse);

    console.log(infos)

    logger.log(3, {
      id: infos.id,
      slug: infos.slug,
      name: infos.name,
      totalVideoTime: infos.totalVideoTime,
    });

    let folderName = infos.name.replace(":", " -");
    createFolder(folderName);

    infos.sections.map(async (info) => {
      logger.log(4, { title: info.titulo });

      createFolder(`${folderName}/${info.position} - ${info.titulo}`);

      info.videos.map(async (video) => {
        let folderLesson = video.nome.replace(":", " -");
        let url = await getVideo(video.id, infos.slug, access_token);
        logger.log(5, { lesson: video.nome, id: video.id });
        videoDownload(
          `${folderName}/${info.position} - ${info.titulo}/${video.position} - ${folderLesson}.mp4`,
          url,
          folderLesson
        );
      })
    });
  }
}

handle();
