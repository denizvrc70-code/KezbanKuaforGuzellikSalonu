const https = require("https");

const redirectUrl = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHX1Rxddgljc5DeW4SpivJw2kY9er0SIloo6OWjzN42Eq_EY1UUHA51-Hkkr1H3adgbnZVg2pu8jVj4T9SMZTPRos_gScg6FKnBE2zhDLK6Bzo6gftvDg==";

https.get(redirectUrl, res => {
  const loc = res.headers.location;
  console.log("Loc:", loc);
  if (!loc) return;
  https.get(loc, res2 => {
    let d = "";
    res2.on("data", c => d += c);
    res2.on("end", () => {
      const reg = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+/g;
      const m = d.match(reg) || [];
      console.log("Images:", [...new Set(m)]);
    });
  });
});
