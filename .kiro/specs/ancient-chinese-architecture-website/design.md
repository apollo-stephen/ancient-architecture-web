# Design Document: 中国古代建筑成就网站

## Overview

本设计文档描述了"中国古代建筑成就（1911年前）"网站的技术架构和实现方案。该网站采用纯前端技术栈（HTML5 + CSS3 + JavaScript），适合初学者学习和实现，同时满足课程作业的所有要求。

网站将包含8个页面，展示中国古代建筑的不同类别，使用响应式设计，包含丰富的媒体内容（图片、音频、动画），并确保良好的用户体验和浏览器兼容性。

## Architecture

### Technology Stack

**核心技术：**
- **HTML5**: 页面结构和语义化标记
- **CSS3**: 样式、布局和动画效果
- **JavaScript (ES6+)**: 交互逻辑和动态行为

**辅助库（通过CDN引入，无需安装）：**
- **AOS.js (Animate On Scroll)**: 滚动动画库，轻量级（~5.7KB）
- **Swiper.js**: 图片轮播组件，功能强大且响应式
- **Font Awesome**: 图标库（可选）

**开发工具：**
- VS Code 或任何文本编辑器
- 现代浏览器（Chrome/Firefox/Edge）用于测试

### Architecture Pattern

采用**传统的多页面应用（MPA）**架构：
- 每个HTML文件代表一个独立页面
- 通过超链接在页面间导航
- 共享CSS和JavaScript文件保持一致性
- 静态资源（图片、音频）集中管理

```
项目结构：
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
│   └── animations.js      # 动画控制
├── images/
│   ├── homepage/          # 首页图片
│   ├── palace/            # 宫殿建筑图片
│   ├── temple/            # 寺庙图片
│   ├── garden/            # 园林图片
│   ├── residence/         # 民居图片
│   └── defense/           # 防御建筑图片
├── audio/
│   ├── background-music.mp3
│   └── sound-effects/
└── README.md
```

## Components and Interfaces

### 1. Navigation System (导航系统)

**职责**: 提供一致的页面导航体验

**HTML结构**:
```html
<nav class="main-navigation">
  <div class="nav-container">
    <div class="logo">中国古代建筑</div>
    <ul class="nav-menu">
      <li><a href="index.html" class="nav-link active">首页</a></li>
      <li><a href="overview.html" class="nav-link">建筑概述</a></li>
      <li><a href="palace.html" class="nav-link">宫殿建筑</a></li>
      <li><a href="temple.html" class="nav-link">宗教建筑</a></li>
      <li><a href="garden.html" class="nav-link">园林建筑</a></li>
      <li><a href="residence.html" class="nav-link">民居建筑</a></li>
      <li><a href="defense.html" class="nav-link">防御建筑</a></li>
      <li><a href="gallery.html" class="nav-link">图片画廊</a></li>
    </ul>
    <div class="mobile-menu-toggle">☰</div>
  </div>
</nav>
```

**CSS特性**:
- 固定在页面顶部（`position: fixed`）
- 响应式设计（移动端显示汉堡菜单）
- 悬停效果和当前页面高亮
- 平滑过渡动画

**JavaScript功能**:
- 自动高亮当前页面链接
- 移动端菜单切换
- 滚动时导航栏样式变化

### 2. Image Gallery Component (图片画廊组件)

**职责**: 展示建筑图片，支持轮播和查看

**实现方案**: 使用Swiper.js库

**HTML结构**:
```html
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img src="images/palace/forbidden-city-1.jpg" alt="故宫太和殿">
      <div class="slide-caption">故宫太和殿 - 明清皇家宫殿的代表</div>
    </div>
    <!-- 更多幻灯片 -->
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
```

**配置**:
```javascript
const swiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
```

### 3. Audio Player Component (音频播放器组件)

**职责**: 播放背景音乐，提供用户控制

**HTML结构**:
```html
<div class="audio-player">
  <audio id="background-music" loop>
    <source src="audio/background-music.mp3" type="audio/mpeg">
    您的浏览器不支持音频播放
  </audio>
  <button id="play-pause-btn" class="audio-control">
    <span class="play-icon">▶</span>
    <span class="pause-icon" style="display:none;">⏸</span>
  </button>
  <input type="range" id="volume-control" min="0" max="100" value="50" class="volume-slider">
  <span class="volume-label">🔊</span>
</div>
```

**JavaScript接口**:
```javascript
class AudioPlayer {
  constructor(audioElementId) {
    this.audio = document.getElementById(audioElementId);
    this.isPlaying = false;
  }
  
  play() {
    this.audio.play();
    this.isPlaying = true;
  }
  
  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }
  
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  setVolume(value) {
    this.audio.volume = value / 100;
  }
}
```

### 4. Animation System (动画系统)

**职责**: 提供页面元素的动画效果

**实现方案**: 
- CSS动画用于简单效果（淡入、滑动）
- AOS.js用于滚动触发的动画
- JavaScript用于复杂交互动画

**AOS.js使用示例**:
```html
<div class="content-section" data-aos="fade-up" data-aos-duration="1000">
  <h2>宫殿建筑的特点</h2>
  <p>中国古代宫殿建筑以其宏伟的规模和精美的装饰而闻名...</p>
</div>
```

**CSS动画示例**:
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-element {
  animation: fadeIn 0.8s ease-out;
}
```

### 5. Content Layout System (内容布局系统)

**职责**: 提供一致的内容展示布局

**布局模式**:
- **Hero Section**: 页面顶部的大标题和背景图
- **Content Grid**: 图文混排的网格布局
- **Timeline Layout**: 时间线式的历史展示
- **Card Layout**: 卡片式的内容展示

**响应式设计**:
```css
/* 移动端 */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

/* 平板 */
@media (min-width: 769px) and (max-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面端 */
@media (min-width: 1025px) {
  .content-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Data Models

### Page Structure Model (页面结构模型)

每个页面遵循统一的结构：

```javascript
const PageStructure = {
  header: {
    navigation: NavigationComponent,
    title: String,
    subtitle: String
  },
  hero: {
    backgroundImage: String,
    title: String,
    description: String
  },
  content: {
    sections: [
      {
        id: String,
        title: String,
        text: String,
        images: [String],
        animation: String
      }
    ]
  },
  footer: {
    copyright: String,
    links: [String]
  }
}
```

### Media Asset Model (媒体资源模型)

```javascript
const MediaAsset = {
  images: {
    path: String,
    alt: String,
    caption: String,
    category: String // 'palace', 'temple', 'garden', etc.
  },
  audio: {
    path: String,
    title: String,
    duration: Number,
    autoplay: Boolean,
    loop: Boolean
  }
}
```

### Navigation Item Model (导航项模型)

```javascript
const NavigationItem = {
  label: String,
  href: String,
  isActive: Boolean,
  order: Number
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*



### Property 1: Navigation Consistency Across Pages
*For any* two pages in the website, the navigation structure should be identical, including the same links in the same order and positioned consistently.
**Validates: Requirements 1.4, 2.5**

### Property 2: Complete Navigation Links
*For any* page in the website, the navigation system should contain links to all 8 major pages.
**Validates: Requirements 2.1, 9.3**

### Property 3: Valid Navigation Links
*For any* navigation link on any page, clicking it should reference an existing HTML file in the project.
**Validates: Requirements 2.2**

### Property 4: Active Page Highlighting
*For any* page in the website, the navigation should have exactly one link marked as active, corresponding to the current page.
**Validates: Requirements 2.3**

### Property 5: Image Content Requirement
*For any* content page (excluding homepage), the page should contain at least 3 image elements.
**Validates: Requirements 3.1, 4.1**

### Property 6: Image Accessibility
*For any* image element in the website, it should have either an alt attribute or an associated caption element.
**Validates: Requirements 4.3**

### Property 7: Animation Content Ratio
*For any* page in the website, the proportion of animated elements should not exceed 30% of the total content elements.
**Validates: Requirements 3.4, 6.2**

### Property 8: Mixed Content Types
*For any* content page, it should include both text content (paragraphs, headings) and visual elements (images).
**Validates: Requirements 7.3**

### Property 9: Multiple Content Elements
*For any* page in the website, it should include multiple types of content elements (headings, paragraphs, images, lists).
**Validates: Requirements 8.2**

### Property 10: Consistent Styling
*For any* two pages in the website, they should reference the same CSS files and use consistent color schemes and typography.
**Validates: Requirements 8.5**

### Property 11: Consistent File Naming
*For any* file in the project, it should follow a consistent naming convention (lowercase with hyphens for multi-word names).
**Validates: Requirements 11.2**

### Property 12: Asset Reference Validity
*For any* asset reference (image src, audio src, CSS href, JS src) in any HTML file, the referenced file should exist in the project directory.
**Validates: Requirements 11.5**

## Error Handling

### Missing Assets
- **Problem**: Referenced images or audio files don't exist
- **Solution**: Provide placeholder images and graceful degradation
- **Implementation**: 
  ```javascript
  // Image error handling
  document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
      this.src = 'images/placeholder.jpg';
      this.alt = '图片加载失败';
    };
  });
  ```

### Audio Playback Failures
- **Problem**: Browser doesn't support audio format or autoplay is blocked
- **Solution**: Provide multiple audio formats and user-initiated playback
- **Implementation**:
  ```html
  <audio id="background-music" loop>
    <source src="audio/music.mp3" type="audio/mpeg">
    <source src="audio/music.ogg" type="audio/ogg">
    您的浏览器不支持音频播放
  </audio>
  ```

### JavaScript Disabled
- **Problem**: User has JavaScript disabled
- **Solution**: Ensure core content is accessible without JavaScript
- **Implementation**: Use progressive enhancement - HTML/CSS provides base functionality, JavaScript enhances it

### Responsive Layout Issues
- **Problem**: Content doesn't display well on small screens
- **Solution**: Use CSS media queries and flexible layouts
- **Implementation**:
  ```css
  @media (max-width: 768px) {
    .navigation-menu {
      flex-direction: column;
    }
    .content-grid {
      grid-template-columns: 1fr;
    }
  }
  ```

### Browser Compatibility
- **Problem**: Older browsers don't support modern CSS/JS features
- **Solution**: Use feature detection and fallbacks
- **Implementation**:
  ```javascript
  // Check for IntersectionObserver support (used by AOS)
  if ('IntersectionObserver' in window) {
    AOS.init();
  } else {
    // Fallback: show all content without animations
    document.querySelectorAll('[data-aos]').forEach(el => {
      el.style.opacity = '1';
    });
  }
  ```

## Testing Strategy

本项目采用**双重测试方法**，结合单元测试和基于属性的测试，确保网站的正确性和质量。

### Unit Testing Approach

单元测试用于验证特定示例、边缘情况和错误条件。

**测试工具**: Jest (JavaScript测试框架)

**测试范围**:
1. **HTML结构验证**
   - 验证每个页面包含必需的元素（导航、内容区、页脚）
   - 验证特定页面的特殊元素（如首页的轮播图）
   - 验证HTML语法正确性

2. **CSS样式测试**
   - 验证CSS文件存在且可加载
   - 验证关键样式规则存在（导航样式、响应式媒体查询）
   - 验证颜色和字体变量定义

3. **JavaScript功能测试**
   - 测试音频播放器的play/pause功能
   - 测试导航菜单的切换功能
   - 测试动画初始化

4. **边缘情况**
   - 测试图片加载失败的处理
   - 测试音频不支持时的降级
   - 测试空内容的处理

**示例单元测试**:
```javascript
describe('Homepage Structure', () => {
  test('should have a navigation element', () => {
    const nav = document.querySelector('nav.main-navigation');
    expect(nav).toBeTruthy();
  });
  
  test('should have exactly 8 navigation links', () => {
    const links = document.querySelectorAll('.nav-link');
    expect(links.length).toBe(8);
  });
  
  test('should have a Swiper container', () => {
    const swiper = document.querySelector('.swiper-container');
    expect(swiper).toBeTruthy();
  });
});
```

### Property-Based Testing Approach

基于属性的测试用于验证通用属性在所有输入下都成立。

**测试工具**: fast-check (JavaScript属性测试库)

**测试配置**: 每个属性测试至少运行100次迭代

**测试范围**: 实现设计文档中定义的12个正确性属性

**属性测试标签格式**: 
```javascript
// Feature: ancient-chinese-architecture-website, Property 1: Navigation Consistency Across Pages
```

**示例属性测试**:
```javascript
const fc = require('fast-check');

describe('Property Tests', () => {
  test('Property 1: Navigation Consistency Across Pages', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allPagePaths),
        fc.constantFrom(...allPagePaths),
        (page1, page2) => {
          const nav1 = getNavigationStructure(page1);
          const nav2 = getNavigationStructure(page2);
          return JSON.stringify(nav1) === JSON.stringify(nav2);
        }
      ),
      { numRuns: 100 }
    );
  }, 'Feature: ancient-chinese-architecture-website, Property 1: Navigation Consistency Across Pages');
  
  test('Property 5: Image Content Requirement', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...contentPagePaths),
        (page) => {
          const images = getImageElements(page);
          return images.length >= 3;
        }
      ),
      { numRuns: 100 }
    );
  }, 'Feature: ancient-chinese-architecture-website, Property 5: Image Content Requirement');
});
```

### Testing Balance

- **单元测试**: 专注于具体示例和集成点
  - 测试首页是否有轮播图
  - 测试音频播放器控件是否存在
  - 测试特定CSS类是否定义
  
- **属性测试**: 专注于通用规则
  - 所有页面的导航一致性
  - 所有内容页的图片数量要求
  - 所有图片的可访问性属性

两种测试方法互补，共同确保网站的全面正确性。

### Test Execution

**运行测试**:
```bash
# 安装测试依赖
npm install --save-dev jest fast-check jsdom

# 运行所有测试
npm test

# 运行特定测试文件
npm test navigation.test.js

# 运行属性测试
npm test -- --testNamePattern="Property"
```

**持续集成**: 
- 每次代码提交前运行测试
- 确保所有测试通过后再部署

## Implementation Notes

### Development Workflow

1. **设置项目结构**: 创建目录和基础文件
2. **创建HTML页面**: 从首页开始，逐个创建8个页面
3. **实现导航系统**: 确保所有页面有一致的导航
4. **添加样式**: 编写CSS，实现响应式设计
5. **集成媒体内容**: 添加图片、音频和动画
6. **实现交互功能**: 编写JavaScript代码
7. **测试和优化**: 运行测试，修复问题，优化性能
8. **浏览器测试**: 在不同浏览器中测试

### Key Design Decisions

1. **为什么选择纯前端技术栈？**
   - 适合初学者，学习曲线平缓
   - 无需服务器，可直接在浏览器中打开
   - 满足作业要求，无需复杂后端

2. **为什么使用CDN引入库而不是npm？**
   - 简化开发流程，无需构建工具
   - 适合小型项目和初学者
   - 快速开始，专注于学习核心概念

3. **为什么选择多页面应用（MPA）而不是单页面应用（SPA）？**
   - 更简单，符合传统网页开发模式
   - SEO友好（虽然这是静态作业）
   - 每个页面独立，易于理解和维护

4. **为什么使用AOS.js和Swiper.js？**
   - 轻量级，易于使用
   - 文档完善，社区活跃
   - 提供专业效果，无需从零实现

5. **如何确保动画不超过30%？**
   - 定义清晰的内容元素计数规则
   - 动画元素：带有data-aos属性的元素、CSS动画元素、GIF图片
   - 静态内容：文本段落、静态图片、标题
   - 通过属性测试验证比例

### Accessibility Considerations

虽然不是主要要求，但我们仍然考虑基本的可访问性：

1. **语义化HTML**: 使用正确的HTML5标签（nav, main, article, section）
2. **图片alt属性**: 所有图片都有描述性的alt文本
3. **键盘导航**: 确保可以用Tab键导航
4. **颜色对比**: 确保文字和背景有足够的对比度
5. **音频控制**: 用户可以控制音频播放

### Performance Optimization

1. **图片优化**: 
   - 使用适当的图片格式（JPEG用于照片，PNG用于图形）
   - 压缩图片大小
   - 使用响应式图片（srcset）

2. **CSS优化**:
   - 合并CSS文件减少HTTP请求
   - 使用CSS压缩

3. **JavaScript优化**:
   - 延迟加载非关键JavaScript
   - 使用事件委托减少事件监听器

4. **资源加载**:
   - 关键CSS内联
   - 异步加载第三方库

## References

- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [AOS.js Documentation](https://michalsnik.github.io/aos/)
- [Swiper.js Documentation](https://swiperjs.com/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/)
- [Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)
