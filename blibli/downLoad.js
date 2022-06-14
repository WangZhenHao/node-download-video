const path = require('path');
const request = require('request');
var fs = require('fs');
// 视频地址：https://www.bilibili.com/video/BV1yA4y1d72F?spm_id_from=333.851.b_7265636f6d6d656e64.1
// const url =
  // 'https://xy110x85x56x54xy.mcdn.bilivideo.cn:4483/upgcxcode/16/59/734525916/734525916-1-100023.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1654666251&gen=playurlv2&os=mcdn&oi=3071405462&trid=00005e1597260bc54fbfa013f815cb029e17u&mid=390047391&platform=pc&upsig=51c238cce31afa1b99459379239ce188&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&mcdnid=11000042&bvc=vod&nettype=0&orderid=0,3&agrr=1&bw=29366&logo=A0000400';
const referer = 'https://www.bilibili.com/video/BV1yA4y1d72F?spm_id_from=333.851.b_7265636f6d6d656e64.1'
// const url = 'https://xy218x85x123x7xy.mcdn.bilivideo.cn:4483/upgcxcode/16/59/734525916/734525916-1-30077.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1654161544&gen=playurlv2&os=mcdn&oi=1903091532&trid=0000c9053d4136ac48cbb1068aabf4b44f48u&mid=390047391&platform=pc&upsig=3e99883fcc8a0af99bb19b70e2b21a9b&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&mcdnid=11000036&bvc=vod&nettype=0&orderid=0,3&agrr=1&bw=84642&logo=A0000400'
// const url = 'https://xy218x85x123x8xy.mcdn.bilivideo.cn:4483/upgcxcode/16/59/734525916/734525916-1-100023.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1654664955&gen=playurlv2&os=mcdn&oi=3071405462&trid=0000ce2a82f64fd748f3afbad2fd9465bab3u&mid=390047391&platform=pc&upsig=b473f9e11140adc4a73d0389f7a01b60&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&mcdnid=11000101&bvc=vod&nettype=0&orderid=0,3&agrr=1&bw=29366&logo=A0000400'

// const referer = 'https://www.bilibili.com/video/BV1DU4y1y7Xo/?spm_id_from=333.788.recommend_more_video.-1'
const url = 'https://xy218x85x123x3xy.mcdn.bilivideo.cn:4483/upgcxcode/16/59/734525916/734525916-1-100023.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1654851347&gen=playurlv2&os=mcdn&oi=3071405463&trid=000010071250783c47c89f636e65d71b467fu&mid=390047391&platform=pc&upsig=e05bd9fdbebd60fc19307acc95806809&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&mcdnid=11000032&bvc=vod&nettype=0&orderid=0,3&agrr=1&bw=29366&logo=A0000400'
// request(
//   {
//     url: url,
//     method: 'get',
//     headers: {
//       Range: 'bytes=0-1000',
//       Referer:
//         'https://www.bilibili.com/video/BV1yA4y1d72F?spm_id_from=333.851.b_7265636f6d6d656e64.1',
//       'User-Agent':
//         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
//     },
//   },
//   function (error, response, body) {
//     console.log('error: ', error);
//     console.log('response: ', response.headers);
//     console.log('body: ', body);
//     var writerStream = fs.createWriteStream('1.png');
//     writerStream.write(body);
//     writerStream.end();
//     // 处理流事件 --> finish、error
//     writerStream.on('finish', function () {
//       console.log('写入完成。');
//     });

//     writerStream.on('error', function (err) {
//       console.log(err.stack);
//     });
//   }
// );

async function downFile(url, referer) {
  try {
    const range = await getRange(url, referer);
    console.log(range);
    // range.splitRange.forEach((range, index) => {
    //   downLoad(url, range, referer, path.join(__dirname, `./video/${index}.m4s`) )
    // });
  } catch (e) {
    console.log(e);
  }
}

function downLoad(url, range, referer, fileName) {
  console.log('开始下载:' + fileName)
  return request({
    url,
    method: 'get',
    headers: {
      Range: `bytes=${range}`,
      Referer: referer,
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
    },
  }, function(err, response) {
    console.log('完成：', fileName)
  }).pipe(fs.createWriteStream(fileName));
}

function getRange(url, referer) {
  return new Promise((resolve, reject) => {
    request(
      {
        url,
        method: 'get',
        headers: {
          Range: 'bytes=0-1008',
          Referer: referer,
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
        },
      },
      function (error, response) {
        if (response.statusCode === 206) {
          const contentRange = response.headers['content-range'];
          const countRange = contentRange.split('/')[1];
          const UNIT = 512000;
          let len = Math.ceil(countRange / UNIT);
          const arrRange = [];

          for (let i = 0; i < len; i++) {
            let start = i === 0 ? 0 : i * UNIT + 1;
            let end = i * UNIT + UNIT;

            if (end > countRange) {
              end = countRange;
            }

            arrRange.push(`${start}-${end}`);
          }

          resolve({ range: countRange, splitRange: arrRange });
        } else {
          reject({ status: response.statusCode });
        }
      }
    );
  });
}

// downFile(url, referer);

var arr = ['1065-1696', '0-988', '1697-169522', '169523-349045', '349046-408554']
arr.forEach((item, index) => {
  downLoad(url, item, referer, path.join(__dirname, `./video/${index}.m4s`))
})
// downLoad(url, '169523-349045', referer, path.join(__dirname, `./video/${4}.m4s`))

// async function test() {
//     const a = await t()

//     console.log(a)
// }

// function t() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(2)
//     }, 1000)
//   })
// }
// test()
