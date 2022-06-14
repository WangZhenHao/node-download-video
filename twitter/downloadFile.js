var fs = require('fs');
var request = require('request');
var mkdirp = require('mkdirp');
var path = require('path');

function resovePath(dir) {
    return path.join(__dirname, dir);
}

var down = {
    download(url, dir, filename) {
        // request.head(url, function (err, res, body) {
        //   console.log('下载图片：', url)
        //   request(url).pipe(fs.createWriteStream(dir + '/' + filename))
        // })

        console.log('下载中...', url)
        request.get(url, function(err) {
            console.log('完成下载：', url)
        }).pipe(fs.createWriteStream(dir + '/' + filename))
    }
}


var arr = [
    '/ext_tw_video/1530891623474900992/pu/vid/0/0/1280x720/wILU3GqgAvyJhAin.mp4',
    '/ext_tw_video/1530891623474900992/pu/vid/0/3000/1280x720/iPZRmEjXgkio80ef.m4s',
    '/ext_tw_video/1530891623474900992/pu/vid/3000/6000/1280x720/PgAxd55ViFMu58S9.m4s',
    '/ext_tw_video/1530891623474900992/pu/vid/6000/9000/1280x720/W7wf2QssJjH2Ll2Z.m4s',
    '/ext_tw_video/1530891623474900992/pu/vid/9000/12000/1280x720/TMl7p9w7XHpDUiy4.m4s',
    '/ext_tw_video/1530891623474900992/pu/vid/12000/15000/1280x720/UJble7A-HmndSHsf.m4s',
    '/ext_tw_video/1530891623474900992/pu/vid/15000/18000/1280x720/zv7O5Ky9E2sQNUt5.m4s',
    '/ext_tw_video/1530891623474900992/pu/vid/18000/21000/1280x720/s2H8xRlyn8MB4BZt.m4s',
    '/ext_tw_video/1530891623474900992/pu/vid/21000/24000/1280x720/zbUdw4uXCTNb5S7u.m4s',
    '/ext_tw_video/1530891623474900992/pu/vid/24000/27000/1280x720/bSWFnkzT6mTPautX.m4s',
    '/ext_tw_video/1530891623474900992/pu/vid/27000/30000/1280x720/CkdFg2PW9Qi9tBFk.m4s',
    '/ext_tw_video/1530891623474900992/pu/vid/30000/34100/1280x720/Cz-xJyMSFYeJ9EJ-.m4s'
]
// down.download('https://upos-sz-mirrorhw.bilivideo.com/upgcxcode/04/32/96673204/96673204_nb2-1-30066.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1653999515&gen=playurlv2&os=hwbv&oi=1903091691&trid=350dfc6d616b482bad0931847f16247au&platform=pc&upsig=29b130ef69a3bb048b14c37a08c41293&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=390047391&bvc=vod&nettype=0&orderid=0,3&agrr=0&bw=96330&logo=80000000', resovePath('./video'), 'bibi.m4s')

// var arr = [
//     '/ext_tw_video/1530891623474900992/pu/vid/0/0/480x270/hLF8prt1FbbNMCtB.mp4',
//     '/ext_tw_video/1530891623474900992/pu/vid/0/3000/480x270/xXhRuYLddzwZwYwL.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/3000/6000/480x270/PpY9O-HqYieUNzXh.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/6000/9000/480x270/wTZrftSZCEGbtv-T.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/9000/12000/480x270/zsgZ8aXeRyE11250.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/12000/15000/480x270/crOKmnv3P919wHLT.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/15000/18000/480x270/Q9oc3TmtbxkJ3jd6.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/18000/21000/480x270/yXT75wrqh_Zq-vMD.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/21000/24000/480x270/aysYeaKRc-cMLBQX.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/24000/27000/480x270/Ih39vjejiVUwQZk-.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/27000/30000/480x270/Tf8FQ5NKRW5Qi0NS.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/30000/34100/480x270/-wpwCscOE0MWknCW.m4s',
// ]
// var arr = [
//     '/ext_tw_video/1530891623474900992/pu/vid/0/0/640x360/daGs9RFFck5Lc33R.mp4',
//     '/ext_tw_video/1530891623474900992/pu/vid/0/3000/640x360/OElASIcIGzIQvjIA.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/3000/6000/640x360/sqtowRKYWdmyZ_h1.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/6000/9000/640x360/uGntWXGmleoPSJfw.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/9000/12000/640x360/2wyRcuQcR60nuxBU.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/12000/15000/640x360/OlXeCvyuGVNu4OdY.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/15000/18000/640x360/AxhEjztYn-02kiWp.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/18000/21000/640x360/GD1mLCVxp0oLXgOX.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/21000/24000/640x360/bstXLaFqntJVJQ85.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/24000/27000/640x360/WMjxehXZf89rL27D.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/27000/30000/640x360/oYVXPasuGa_BC8cF.m4s',
//     '/ext_tw_video/1530891623474900992/pu/vid/30000/34100/640x360/s8eZp3izjFsgALG3.m4s'
// ]

arr.forEach((item, index) => {
    down.download('https://video.twimg.com' + item, resovePath('./video/1280x720'), `${index}.m4s`)
})