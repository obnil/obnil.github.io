---
layout: post
title:  "为Jekyll博客添加音乐播放器"
description: "突然想在博客的文章里放一点音乐"
categories: jekyll
date:   2019-01-20 16:30:42 +0800
---

突然想在博客的文章里放一点音乐。

这应该不是什么大问题吧，然而看到的大多数攻略都是使用网易云的iFrame外部链接，缺点是延迟很严重，还有配合Hexo的插件，比如[Aplayer](https://github.com/MoePlayer/APlayer)——为Github Page + Jekyll提供的解决方案似乎很少，并且也不想折腾太大的插件。

经过一番搜索，终于在[这篇文章](https://jekyllcodex.org/without-plugin/open-embed/)里看到了一种可行方案。

### 配置

主要分为以下三步

第一步：下载[open-embed.html](https://raw.githubusercontent.com/jhvanderschee/jekyllcodex/gh-pages/_includes/open-embed.html)（点进链接-右键-存储为）源码如下

```html
<style>
.videoWrapper {
	position: relative;
	padding-bottom: 56.333%;
	height: 0;
    background: black;
}
.videoWrapper iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
    border: 0;
}    
</style>

<script>
function get_youtube_id(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false;
}
function vimeo_embed(url,el) {
    var id = false;
    $.ajax({
      url: 'https://vimeo.com/api/oembed.json?url='+url,
      async: true,
      success: function(response) {
        if(response.video_id) {
          id = response.video_id;
          if(url.indexOf('autoplay=1') !== -1) var autoplay=1; else var autoplay=0;
          if(url.indexOf('loop=1') !== -1) var loop=1; else var loop=0;
          var theInnerHTML = '<div class="videoWrapper"><iframe src="https://player.vimeo.com/video/'+id+'/?byline=0&title=0&portrait=0';
          if(autoplay==1) theInnerHTML += '&autoplay=1';
          if(loop==1) theInnerHTML += '&loop=1';
          theInnerHTML += '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>'; 
          el.innerHTML = theInnerHTML;
        }
      }
    });
}
function video_embed() {
    var p = document.getElementsByTagName('p');
    for(var i = 0; i < p.length; i++) {
        //check if this is an external url (that starts with https:// or http://
        if (p[i].innerHTML.indexOf("http://") == 0 ||
            p[i].innerHTML.indexOf("https://") == 0) {
            var youtube_id = get_youtube_id(p[i].innerHTML);
            if(youtube_id) {
                if(p[i].innerHTML.indexOf('autoplay=1') !== -1) var autoplay=1; else var autoplay=0;
                if(p[i].innerHTML.indexOf('loop=1') !== -1) var loop=1; else var loop=0;
                var theInnerHTML = '<div class="videoWrapper"><iframe width="720" height="420" src="https://www.youtube.com/embed/' + youtube_id + '?rel=0&showinfo=0';
                if(autoplay==1) theInnerHTML += '&autoplay=1';
                if(loop==1) theInnerHTML += '&loop=1&playlist='+youtube_id+'&version=3';
                theInnerHTML += '" frameborder="0" allowfullscreen></iframe></div>';
                p[i].innerHTML = theInnerHTML;
            }
            if(p[i].innerHTML.indexOf('vimeo.com') !== -1) {
                //ask vimeo for the id and place the embed
                vimeo_embed(p[i].innerHTML,p[i]);
            }
        }
    }
}
video_embed();

function mp3_embed() {
    var p = document.getElementsByTagName('p');
    for(var i = 0; i < p.length; i++) {
        if(p[i].innerHTML.indexOf('.mp3') !== -1) {
            var str = p[i].innerHTML.split('?');
            if(str.length == 1) str[1] = '';
            var str1 = str[1];
            str1 = str1.replace('&','').replace('&','');
            str1 = str1.replace('autoplay=1','').replace('autoplay=0','');
            str1 = str1.replace('loop=1','').replace('loop=0','');
            str1 = str1.replace('controls=0','').replace('controls=1','');

            if (str[0].lastIndexOf('.mp3', str[0].length - 4) === str[0].length - 4 && str1.length == 0) {
                if(str[1].indexOf('autoplay=1') !== -1) var autoplay=1; else var autoplay=0;
                if(str[1].indexOf('loop=1') !== -1) var loop=1; else var loop=0;
                if(str[1].indexOf('controls=0') !== -1) var controls=0; else var controls=1;
                var newInnerHTML = '<audio';
                if(autoplay==1) newInnerHTML += ' autoplay';
                if(loop==1) newInnerHTML += ' loop';
                if(controls==1) newInnerHTML += ' controls';
                newInnerHTML += '><source src="'+str[0]+'" type="audio/mpeg">Your browser does not support the audio element.</audio>';
                p[i].innerHTML = newInnerHTML;
            }
        }
    }
}
mp3_embed();
</script>
```

第二步：将上述文件放入Jekyll项目的”_include”文件夹内。

[![img](https://github.com/HusterHope/blogimage/raw/master/music-player.jpg)](https://github.com/HusterHope/blogimage/raw/master/music-player.jpg)

第三步：找到上述文件夹内的_layout.html文件，修改底部内容为：

[![img](https://github.com/HusterHope/blogimage/raw/master/music-player-2.png)](https://github.com/HusterHope/blogimage/raw/master/music-player-2.png)

### 调用

1、借助[七牛云](https://www.qiniu.com/)之类的图床或云端存储，将需要的音乐文件上传至图床，并获得外链。

2、使用[音乐直链搜索](https://music.liuzhijin.cn/)工具，获得外链

然后，在Markdown中直接使用`<p>音乐外链url</p>`这样的格式，即可获得如下效果的播放器（以下音乐为「阿保剛-Der Mond Das Meer」）



Over.