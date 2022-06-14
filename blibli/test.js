// function test() {
//     const count = 45086089
//     const len = Math.ceil(count / 512000)

//     const arrRange = []
//     for(let i = 0; i < len; i++) {
//         let start = i === 0 ? 0 : (i * 512000 + 1)
//         let end = i * 512000 + 512000;

//         if(end > count) {
//             end = count
//         }

//         arrRange.push(`${start}-${end}`);
//     }

//     console.log(arrRange)
// }

// test()
// const ibill = require('ibili');
// const fs = require('fs');

// const ibili = require('ibili')
// ibili.downloadVideo({
//     url:'https://www.bilibili.com/video/BV1DU4y1y7Xo'
// }).then(()=>{
//     console.log('视频下载完成！')
// })
const { download } = require("bilibili-save-nodejs");
download({
  downloadRange: "byVedio",
  downloadType: "mp4",
  downloadPath: "https://www.bilibili.com/video/BV1yA4y1d72F?spm_id_from=333.851.b_7265636f6d6d656e64.1",
})
  .then(() => console.log("下载成功"))
  .catch((e) => console.log("下载出错"));
