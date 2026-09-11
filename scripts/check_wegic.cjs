const https = require("https");

const urls = [
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFKgiCwgTO8_MO54g_a2eip9jFaTFuaCZr5raQOPpPodOki4Jhoapl_2XPNkB19l0cEkg9341weRxsLHFHNaF6_FTI_ZSS3YAI1jSTh4AwUOweknRATgs7zeadvylebq34=",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFE4dte4ItqKOxS8QsC6DGfesBpSOOLWH9IakElzGl-v9UU0ipZ-eSouxAU5veMzSQCpz_1t3c2L7zjYGWjOT4IMKo83lirjsHOL0xRgFJgD_wjL7sUKFKCMWrVOMpn_t06DXYCRd03XD1XIvD8="
];

urls.forEach((u, i) => {
  https.get(u, res => {
    const loc = res.headers.location;
    console.log("Loc:", loc);
    if (!loc) return;
    https.get(loc, res2 => {
      let d = "";
      res2.on("data", c => d += c);
      res2.on("end", () => {
        const reg = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+/g;
        const m = d.match(reg) || [];
        console.log(i, "Images:", [...new Set(m)]);
      });
    });
  });
});
