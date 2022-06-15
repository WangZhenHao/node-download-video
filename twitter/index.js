var fs = require('fs');
var request = require('request');
var mkdirp = require('mkdirp');
var path = require('path');
const child_process = require('child_process');


function resovePath(dir) {
  return path.join(__dirname, dir);
}
// function getUrlList(text) {
//     var re = /#EXTINF:\d+\.\d+,\s+(.+)/g;
//     var arr = text.match(re);
//     var list = [];
//     for (let name of arr) {
//         const url = name.split(',')[1];
//         list.push(url.trim());
//     }

//     return list;
// }
function getUrlList(text) {
    var list = []
    var re = /#EXT-X-MAP:URI="(.*)"/
    let firstUlr = text.match(re)[1];

    if(firstUlr) {
        list.push(firstUlr)
    }
    

    var re = /#EXTINF:\d+\.\d+,\s+(.+)/g;
    var arr = text.match(re);
    for (let name of arr) {
        const url = name.split(',')[1];
        list.push(url.trim());
    }
    
    return list

}

var down = {
  async download(url, dir) {
    try {
      const list = await this.paraseM3u8File(url);
      await mkdirp(dir);

      await this.downloadFiles(dir, list);
    //   await this.concatFiles(dir);
    //   await this.removeFileTs(dir);
      
      return Promise.resolve()
    } catch (e) {
      console.error('下载错误', e);
      return Promise.reject()
    }
  },
  removeFileTs(dir) {
    return new Promise((resolve, reject) => {
      const files = fs.readdirSync(dir);
      files.forEach((item) => {
        // var re = /\.ts$/;
        var re = new RegExp(`${POSTFIX}$`)
        if (re.test(item)) {
          fs.unlinkSync(path.join(dir, `./${item}`));
        }
      });

      resolve()
    });
  },
  concatFiles(dir) {
    return new Promise((resolve, reject) => {
      child_process.exec(
        `cd ${dir} && ffmpeg -i input.txt -acodec copy -vcodec copy -absf aac_adtstoasc index.mp4`,
        function (error, stdout, stderr) {
          if (error) {
            console.error('合成失败---', error);
            reject('concatFiles');
          } else {
            console.log('合成成功--', stdout);
            //删除临时文件
            resolve();
          }
        }
      );
    });
  },
  downloadFiles(dir, list) {
    return new Promise((reslove, reject) => {
      const fileList = list.map((item, index) => {
        // const name = item.split('/')
        return `file ${index}${POSTFIX}`;
      });
      const inputText = ['ffconcat version 1.0', ...fileList];
      let index = 0;
      const self = this;

      fs.writeFileSync(
        path.join(dir, './input.txt'),
        inputText.join('\n'),
        undefined,
        'utf-8'
      );

      function d() {
        if (list[index]) {
          const url = HOST + list[index];
        //   const name = list[index].split('/')
          const fileName = path.join(dir, `${index}${POSTFIX}`);

          self
            .downFile(url, fileName)
            .then(() => {
              index++;
              d();
            })
            .catch(() => {
              reject('downloadFiles');
            });
        } else {
          reslove();
        }
      }

      d();
    });
  },
  downFile(url, fileName) {
    console.log('开始下载', url);
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .on('response', function (response) {
          console.log('response', response.statusCode);
          if (response.statusCode === 200) {
            console.log('完成下载：', fileName);
            resolve();
          } else {
            console.log('完成错误：', response.statusCode, fileName);
            reject('downFile');
          }
        })
        .on('error', function (response) {
          console.log('error', response);
          reject('downFile');
        })
        .pipe(fs.createWriteStream(fileName));
    });
  },
  
  paraseM3u8File(url) {
    console.log('解析mu38文件地址：', url);
    return new Promise((resolve, reject) => {
      request(
        {
          url,
          method: 'get',
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
            referer: 'https://twitter.com/',
          },
        },
        (error, response) => {
          if (response.statusCode === 200) {
            resolve(getUrlList(response.body));
          } else {
            reject();
          }
        }
      );
    });
  }
};

const HOST = 'https://video.twimg.com';
const POSTFIX = '.m4s'

// const HOST = 'https://video-hls.yzcdn.cn/';
// const POSTFIX = '.ts'

down.download('https://video.twimg.com/ext_tw_video/1536418546259046401/pu/pl/720x960/3LIKyCtjsGzkzKNs.m3u8?container=fmp4', resovePath('./video/test1'))

// down.concatFiles(resovePath('./video/test'))

// const text = fs.readFileSync(resovePath('./5_VR7I59oLhftSUR.m3u8'), 'utf8');
// // console.log(text)
// getUrlList(text)