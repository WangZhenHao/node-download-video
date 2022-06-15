const fs = require("fs");
const path = require("path");
const m3u8ToMp4 = require("./m3u8ToMp4.js"); // 引入核心模块，注意路径
const converter = new m3u8ToMp4();

let url = "https://video.twimg.com/ext_tw_video/1530891623474900992/pu/pl/1280x720/0DufoxETtrA6NVUl.m3u8?container=fmp4";
  let output ='video';
  let filename = 'video.mp4';
  let title = '测试视频';
converter
  .setInputFile(url)
  .setOutputFile(path.join(output, filename))
  .start().then((res) => {
    console.log('成功', res)
  }).catch((res) => {
    console.log('失败', res)
  })
// 具体参数可自行修改
// downloadMedia({});

// function downloadMedia (opt, callback) {
//   // 测试视频，如果链接失效的话就自己找一个
//   let url = opt.url || "https://video.twimg.com/ext_tw_video/1530891623474900992/pu/pl/1280x720/0DufoxETtrA6NVUl.m3u8?container=fmp4";
//   let output = opt.output || 'video';
//   let filename = opt.filename + '.mp4' || 'video.mp4';
//   let title = opt.title || '测试视频';
  
//   if (!fs.existsSync(output)) {
//     fs.mkdirSync(output, {
//       recursive: true,
//     });
//   }
//   converter
//   .setInputFile(url)
//   .setOutputFile(path.join(output, filename))
//   .start().then((res) => {
//     console.log('成功', res)
//   }).catch((res) => {
//     console.log('失败', res)
//   })
// //   (async function() {
// //     try {
// //       console.log("准备下载...");

// //       await converter
// //         .setInputFile(url)
// //         .setOutputFile(path.join(output, filename))
// //         .start();

// //       console.log("下载完成!");

// //       if ( typeof callback === 'function' ) callback();
// //     } catch (error) {
// //       throw new Error("哎呀，出错啦! 检查一下参数传对了没喔。", error);
// //     }
//   })(); 

// }

