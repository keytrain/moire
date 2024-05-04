import chData from "./chapterData";

function sortChaps(arr) {
  return arr
    .sort((a, b) => {
      if (Number(a) < Number(b)) {
        return -1;
      } else if (Number(a) > Number(b)) {
        return 1;
      }
      return 0;
    })
    .reverse();
}

export default {
  list: [
    {
      cover: "img/cover/eden.jpg",
      title: "Majo no Eden",
      updated: new Date("May 15 2023 14:49:00 GMT-0800"),
      completed: false,
    },
    {
      cover: "img/cover/muse.jpg",
      title: "Muse no Shinzui",
      updated: new Date("Dec 13 2022 17:27:00 GMT-0800"),
      completed: false,
    },
    {
      cover: "img/cover/kara.jpg",
      title: "Karakida-ke no Kosho Gurashi",
      updated:
        chData["Karakida-ke no Kosho Gurashi"][
          sortChaps(Object.keys(chData["Karakida-ke no Kosho Gurashi"] || {}))[0]
        ].date,
    },
    {
      cover: "img/cover/teotj.jpg",
      title: "The End of the Journey",
      updated: new Date("Aug 30 2022 16:20:00"),
      completed: true,
    },
    {
      cover: "img/cover/kan.jpg",
      title: "Kannou Sensei",
      updated:
        chData["Kannou Sensei"][sortChaps(Object.keys(chData["Kannou Sensei"] || {}))[0]].date,
    },
    {
      cover: "img/cover/cm.jpg",
      title: "Coffee Moon",
      updated: new Date("Apr 6 2022 16:46:00"),
      completed: false,
    },
    {
      cover: "img/cover/sen.jpg",
      title: "Sennetsu",
      updated: new Date("Sep 20 2022 10:41:00 GMT-0700"),
      completed: false,
    },
    {
      cover: "img/cover/mah.jpg",
      title: "Mahoromi",
      updated: new Date("Jan 30 2018"),
      completed: false,
    },
    {
      cover: "img/cover/spo.jpg",
      title: "Spotted Flower",
      updated: new Date("Mar 24 2018"),
      completed: false,
    },
    {
      cover: "img/cover/yome.jpg",
      title: "Mahoutsukai no Yome",
      updated: new Date("July 04 2020"),
      completed: false,
    },
    {
      cover: "img/cover/vamp.jpg",
      title: "Seifuku no Vampiress Lord",
      updated: new Date("May 09 2019"),
      completed: false,
    },
    {
      cover: "img/cover/prunus.jpg",
      title: "Prunus Girl",
      updated: new Date("May 16 2013"),
      completed: true,
    },
    {
      cover: "img/cover/bts.jpg",
      title: "Boku wa Tomodachi ga Sukunai",
      updated: new Date("Oct 01 2014"),
      completed: false,
    },
    {
      cover: "img/cover/taso.jpg",
      title: "Tasogare Otome x Amnesia",
      updated: new Date("Oct 24 2013"),
      completed: true,
    },
    {
      cover: "img/cover/nat.jpg",
      title: "Natsu no Zenjitsu",
      updated: new Date("May 15 2015"),
      completed: true,
    },
    {
      cover: "img/cover/ringo.jpg",
      title: "Chimoguri Ringo to Kingyobachi Otoko",
      updated: new Date("Mar 03 2014"),
      completed: true,
    },
    {
      cover: "img/cover/ashita.jpg",
      title: "Ashita Dorobou",
      updated: new Date("Dec 20 2012"),
      completed: true,
    },
    {
      cover: "img/cover/jigo.jpg",
      title: "Jigokuren - LOVE in the HELL",
      updated: new Date("Jul 09 2013 GMT-0506"),
      completed: true,
    },
    {
      cover: "img/cover/ben.jpg",
      title: "Benten Rock Yuu",
      updated: new Date("May 11 2015"),
      completed: false,
    },
    {
      cover: "img/cover/mech.jpg",
      title: "Boku ni Koisuru Mechanical",
      updated: new Date("Jan 24 2015"),
      completed: true,
    },
    {
      cover: "img/cover/cho.jpg",
      title: "Choku!",
      updated: new Date("Nov 24 2012"),
      completed: true,
    },
    {
      cover: "img/cover/deko.jpg",
      title: "Dekoboko Girlish",
      updated: new Date("Jan 09 2014"),
      completed: false,
    },
    {
      cover: "img/cover/haj.jpg",
      title: "Hajiotsu",
      updated: new Date("Sep 11 2014"),
      completed: false,
    },
    {
      cover: "img/cover/gis.jpg",
      title: "Gisèle Alain",
      updated: new Date("May 16 2016"),
      completed: false,
    },
    {
      cover: "img/cover/hima.jpg",
      title: "Himawari",
      updated: new Date("Oct 12 2012"),
      completed: false,
    },
    {
      cover: "img/cover/kek.jpg",
      title: "Kekkon Yubiwa Monogatari",
      updated: new Date("Feb 07 2015"),
      completed: false,
    },
    {
      cover: "img/cover/gon.jpg",
      title: "Gonensei",
      updated: new Date("Aug 27 2014"),
      completed: true,
    },
    {
      cover: "img/cover/hito.jpg",
      title: "Hitogatana",
      updated: new Date("Jun 26 2013"),
      completed: false,
    },
    {
      cover: "img/cover/mido.jpg",
      title: "Yume Midokoro (oneshot)",
      updated: new Date("Jul 09 2010"),
      completed: true,
    },
    {
      cover: "img/cover/ga.jpg",
      title: "Ga-rei",
      updated: new Date("Oct 30 2010"),
      completed: true,
    },
    {
      cover: "img/cover/hak.jpg",
      title: "Hakoiri Drops",
      updated: new Date("Nov 26 2014"),
      completed: false,
    },
    {
      cover: "img/cover/straw.jpg",
      title: "Straw",
      updated: new Date("April 22 2016"),
      completed: true,
    },
    {
      cover: "img/cover/para.jpg",
      title: "Paradox Blue",
      updated: new Date("Mar 12 2012"),
      completed: false,
    },
    {
      cover: "img/cover/oa.jpg",
      title: "OA",
      updated: new Date("Oct 21 2014"),
      completed: true,
    },
    {
      cover: "img/cover/non.jpg",
      title: "Nonscale",
      updated: new Date("April 27 2016"),
      completed: true,
    },
    {
      cover: "img/cover/neji.jpg",
      title: "Nejimakiboshi to Aoi Sora",
      updated: new Date("Aug 08 2012"),
      completed: true,
    },
    {
      cover: "img/cover/let.jpg",
      title: "Tetsugaku Letra",
      updated: new Date("April 14 2016"),
      completed: true,
    },
    {
      cover: "img/cover/esp.jpg",
      title: "Tokyo ESP",
      updated: new Date("Jan 23 2011"),
      completed: false,
    },
    {
      cover: "img/cover/tai.jpg",
      title: "Taiyou no Ie",
      updated: new Date("Oct 22 2015"),
      completed: true,
    },
    {
      cover: "img/cover/mar.jpg",
      title: "Mardock Scramble",
      updated: new Date("Sep 13 2011"),
      completed: false,
    },
    {
      cover: "img/cover/yum.jpg",
      title: "Yume Tsukai",
      updated: new Date("Nov 21 2014"),
      completed: true,
    },
    {
      cover: "img/cover/ali.jpg",
      title: "Oh, my sweet alien!",
      updated: new Date("Aug 05 2016"),
      completed: true,
    },
    {
      cover: "img/cover/rin.jpg",
      title: "18 Rin",
      updated: new Date("Oct 22 2013"),
      completed: false,
    },
    {
      cover: "img/cover/ama.jpg",
      title: "Amaama to Inazuma",
      updated: new Date("Mar 20 2015"),
      completed: false,
    },
    {
      cover: "img/cover/kyou.jpg",
      title: "Ashita wa Kyouso-sama (oneshot)",
      updated: new Date("Dec 07 2015"),
      completed: true,
    },
    {
      cover: "img/cover/fly.jpg",
      title: "Flying Witch (oneshot)",
      updated: new Date("Aug 29 2011"),
      completed: true,
    },
    {
      cover: "img/cover/fut.jpg",
      title: "Futari no Renai Shoka",
      updated: new Date("Apr 10 2016"),
      completed: true,
    },
    {
      cover: "img/cover/rev.jpg",
      title: "Reversible!",
      updated: new Date("Feb 28 2012"),
      completed: false,
    },
    {
      cover: "./img/cover/gin.jpg",
      title: "Gingitsune",
      updated: new Date("Jul 07 2016"),
      completed: false,
    },
    {
      cover: "img/cover/hero.jpg",
      title: "Hero Mask",
      updated: new Date("Aug 31 2013"),
      completed: false,
    },
    {
      cover: "img/cover/katsu.jpg",
      title: "Katsute Kami Datta Kemonotachi e",
      updated: new Date("Jul 10 2014"),
      completed: false,
    },
    {
      cover: "img/cover/seigi.jpg",
      title: "Sore ga Kanojo no Seigi nara",
      updated: new Date("Jul 01 2011"),
      completed: false,
    },
  ],
};
