const fs = require('fs');
const path = require('path');
const request = require('request');
const child_process = require('child_process');
const mkdirp = require('mkdirp');
// F:\software\InviDownloader1.0.0.4\ffmpeg -i input.txt -acodec copy -vcodec copy -absf aac_adtstoasc input.mp4
function resolvePath(src) {
  return path.join(__dirname, src);
}

const host = 'https://video-hls.yzcdn.cn';

var down = {
  getUrlList(text) {
    var re = /#EXTINF:\d+\.\d+,\s+(.+)/g;
    var arr = text.match(re);
    var list = [];
    for (let name of arr) {
      const url = name.split(',')[1];
      list.push(url.trim());
    }

    return list;
  },
  async download2(text, dir) {
    // return new Promise(async (resolve, reject) => {
      if(typeof text != 'string') { return console.error('text不是字符串类型') }

      const list = this.getUrlList(text);
      const self = this;
      let index = 0;

      const fileList = list.map((item, index) => {
        return `file ${index}.ts`;
      });
      const inputText = ['ffconcat version 1.0', ...fileList];

      await mkdirp(resolvePath(`./video/${dir}`))

      fs.writeFileSync(
        resolvePath(`./video/${dir}/input.txt`),
        inputText.join('\n'),
        undefined,
        'utf-8'
      );

      function d() {
        if (list[index]) {
          self
            .downFile(list[index], resolvePath(`./video/${dir}/${index}.ts`))
            .then(() => {
              index++;
              d();
            })
            .catch(() => {
            //   reject();
            });
        } else {
          self.concatFiles(dir).then(() => {
            self.removeFileTs(`./video/${dir}`);
            // resolve();
          });
        }
      }

      d();
      
      
    // });
  },
  download(file, dir) {
    return new Promise((resolve, reject) => {
      const text = fs.readFileSync(file, 'utf8');
      const list = this.getUrlList(text);
      const self = this;
      let index = 0;
      const fileList = list.map((item, index) => {
        return `file ${index}.ts`;
      });
      const inputText = ['ffconcat version 1.0', ...fileList];

      fs.writeFileSync(
        resolvePath(`./video/${dir}/input.txt`),
        inputText.join('\n'),
        undefined,
        'utf-8'
      );

      function d() {
        if (list[index]) {
          self
            .downFile(list[index], resolvePath(`./video/${dir}/${index}.ts`))
            .then(() => {
              index++;
              d();
            })
            .catch(() => {
              reject();
            });
        } else {
          self.concatFiles(dir).then(() => {
            self.removeFileTs(`./video/${dir}`);
            resolve();
          });
        }
      }

      d();
    });
  },
  removeFileTs(dir) {
    const files = fs.readdirSync(resolvePath(dir));
    files.forEach((item) => {
      var re = /\.ts$/;
      if (re.test(item)) {
        fs.unlinkSync(resolvePath(`${dir}/${item}`));
      }
    });
  },
  concatFiles(dir) {
    // ffmpeg -i tashuo.txt -acodec copy -vcodec copy -absf aac_adtstoasc tashuo.mp4
    // && F:/\software/\InviDownloader1.0.0.4/\ffmpeg -i ${name}.txt -acodec copy -vcodec copy -absf aac_adtstoasc ${name}.mp4
    return new Promise((resolve, reject) => {
      child_process.exec(
        `cd ./wuzhi/video/${dir} && ffmpeg -i input.txt -acodec copy -vcodec copy -absf aac_adtstoasc index.mp4`,
        function (error, stdout, stderr) {
          if (error) {
            console.error('合成失败---', error);
            reject();
          } else {
            console.log('合成成功--', stdout);
            //删除临时文件
            resolve();
          }
        }
      );
    });
  },
  downFile(url, fileName) {
    console.log('开始下载', host + '/' + url);
    return new Promise((resolve, reject) => {
      request
        .get(host + '/' + url)
        .on('response', function (response) {
          console.log('response', response.statusCode);
          if (response.statusCode === 200) {
            console.log('完成下载：', fileName);
            resolve();
          } else {
            console.log('完成错误：', response.statusCode, fileName);
            reject();
          }
        })
        .on('error', function (response) {
          console.log('error', response);
          reject();
        })
        .pipe(fs.createWriteStream(fileName));
    });
  },
};

async function toDown() {
  const files = fs.readdirSync(resolvePath('./m3u8'));
  // const files = ['7_songbiezou.m3u8', '8_caoyaunlen.m3u8']

  for (let i of files) {
    try {
      const folder = i.split('.')[0];
      await mkdirp(resolvePath(`./video/${folder}`));
      await down.download(resolvePath(`./m3u8/${i}`), folder);
    } catch (e) {
      console.log('错误', e);
    }
  }
}

// toDown()

function req(url) {
//   let url =
    // 'https://shop2524074.youzan.com/wscvis/course/detail/3ewkk0tr9w0le?kdt_id=2331906&fromColumn=1y6exswq0wpgi';
  request(
    {
      url,
      method: 'get',
      headers: {
        Referer: url,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36',
        cookie:
          'KDTSESSIONID=YZ984501311452164096YZmrUyFZmH; nobody_sign=YZ984501311452164096YZmrUyFZmH; _kdt_id_=2331906; yz_log_ftime=1654765050195; yz_log_uuid=68e03743-87f0-b58f-0bac-2ceaa5ff6825; _canwebp=1; Hm_lvt_679ede9eb28bacfc763976b10973577b=1655113700; Hm_lpvt_679ede9eb28bacfc763976b10973577b=1655120447; yz_log_seqb=1655181310680; yz_log_seqn=247',
      },
    },
    function (error, response) {
      // console.log(response.body)
      var body = response.body;

      var re = /window\._global\s=\s({.*})/;
      var value = body.match(re)[1];
      var result = JSON.parse(value);
      var goodsData = JSON.parse(unescape(result.goodsData));
      var videoContentDTO = goodsData.content.videoContentDTO;

      var title = goodsData.content.title || '未知';
      var videoUrl = videoContentDTO.videoUrl;

      if(isM3u8Url(videoUrl)) {
        console.log('请求m3u8文件：', videoUrl);
        request(
            {
            url: videoUrl,
            method: 'get',
            headers: {
                Referer: url,
            },
            },
            function (error, res) {
            if (res.statusCode === 200) {
                var text = res.body;

                down.download2(text, title)
            } else {
                console.log('错误', error, res.statusCode);
            }
            }
        );
      } else {
        console.log('下载视频：', videoUrl);
        mkdirp(resolvePath(`./video/${title}`)).then(() => {
            request(
                {
                url: videoUrl,
                method: 'get',
                headers: {
                    Referer: url,
                },
                },
                function (error, res) {
                    console.log('下载成功', res.statusCode, videoUrl)
                }
            ).pipe(fs.createWriteStream(resolvePath(`./video/${title}/input.mp4`)))
        })
        
      }
      
    }
  );
}

function isM3u8Url(url) {
    var arr = url.split('.');
    return arr[arr.length - 1].indexOf('m3u8') > -1
}

req('https://shop2524074.youzan.com/wscvis/course/detail/366hguek4bhci?kdt_id=2331906&fromColumn=1y6exswq0wpgi');
