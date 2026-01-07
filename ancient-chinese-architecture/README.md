# 中国古代建筑成就网站

## 快速启动

在项目目录下运行以下命令启动本地服务器：

```bash
cd ancient-chinese-architecture
python3 -m http.server 8080
```

然后在浏览器中访问 http://localhost:8080 即可查看网站。

> ⚠️ 注意：请勿直接双击 HTML 文件打开，否则部分功能可能无法正常工作。

## 项目简介

这是一个展示中国古代建筑成就（1911年前）的多页面网站，旨在弘扬中华优秀自然科学成就。网站包含8个页面，涵盖宫殿、寺庙、园林、民居、防御建筑等多种建筑类型。

## 项目结构

```
ancient-chinese-architecture/
├── index.html              # 首页
├── overview.html           # 建筑概述页
├── palace.html             # 宫殿建筑页
├── temple.html             # 宗教建筑页
├── garden.html             # 园林建筑页
├── residence.html          # 民居建筑页
├── defense.html            # 防御建筑页
├── gallery.html            # 图片画廊页
├── css/
│   ├── style.css          # 主样式文件
│   ├── navigation.css     # 导航栏样式
│   └── animations.css     # 动画样式
├── js/
│   ├── main.js            # 主JavaScript文件
│   ├── audio-player.js    # 音频播放器
│   ├── animations.js      # 动画控制
│   └── gallery.js         # 图片画廊功能
├── images/                 # 图片资源目录
│   ├── homepage/          # 首页图片
│   ├── overview/          # 概述页图片
│   ├── palace/            # 宫殿建筑图片
│   ├── temple/            # 寺庙图片
│   ├── garden/            # 园林图片
│   ├── residence/         # 民居图片
│   ├── defense/           # 防御建筑图片
│   └── gallery/           # 画廊图片
├── audio/                  # 音频资源目录
│   └── background-music.mp3
└── README.md              # 项目说明文件
```

## 技术栈

- **HTML5**: 页面结构和语义化标记
- **CSS3**: 样式、布局和动画效果
- **JavaScript (ES6+)**: 交互逻辑和动态行为
- **AOS.js**: 滚动动画库
- **Swiper.js**: 图片轮播组件

## 功能特点

1. **响应式设计**: 适配桌面、平板和手机等不同设备
2. **滚动动画**: 使用AOS.js实现元素滚动时的动画效果
3. **图片轮播**: 使用Swiper.js实现精美的图片轮播
4. **音频播放器**: 支持背景音乐播放，可控制播放/暂停和音量
5. **图片画廊**: 支持分类筛选和灯箱查看
6. **导航系统**: 固定顶部导航，支持移动端汉堡菜单

## 使用说明

### 本地运行

1. 下载或克隆项目到本地
2. 直接用浏览器打开 `index.html` 文件即可

### 添加图片

1. 将图片文件放入对应的 `images/` 子目录
2. 在HTML文件中更新图片路径
3. 建议图片格式：JPG（照片）、PNG（图形）
4. 建议图片宽度：800-1200px

### 添加音频

1. 将音频文件放入 `audio/` 目录
2. 支持格式：MP3、OGG
3. 在HTML中更新音频源路径

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 注意事项

1. 图片需要自行准备，当前使用占位图片
2. 背景音乐需要自行准备MP3文件
3. 由于浏览器限制，音频需要用户点击才能播放

## 作者

课程大作业 - 网页设计与制作

## 许可

仅供学习使用
