import { defineConfig } from 'vitepress'
import { defineTeekConfig } from "vitepress-theme-teek/config";

// Teek 主题配置
const teekConfig = defineTeekConfig({
    teekTheme: true,
    vitePlugins: {
        sidebarOption: {
            sort: true, // 开启 frontmatter.sidebarSort 功能，默认已经开启，无需设置
            defaultSortNum: 9999, // 没有指定 frontmatter.sidebarSort 时的默认值，用于侧边栏排序
            sortNumFromFileName: false, // 是否用文件名的前缀序号作为其侧边栏 Item 的排序序号。如果为 true，当文件名存在序号前缀，则使用序号前缀，否则使用 defaultSortNum
            ignoreList: ['**/@eaDir', '**/@eaDir/**', '**/.DS_Store', '**/Thumbs.db'], // 忽略 NAS 和系统生成的隐藏文件夹
            // ... 更多配置
        },
        autoFrontmatter: true, //Frontmatter自动生成
        autoFrontmatterOption: {
            permalinkPrefix: "pages", // 默认为 pages，可以修改为自定义值
            permalink: true, // 关闭 permalink 自动生成
        },
    },
    teekHome: true,
    vpHome: true,

    loading: true, // 启用 Loading 动画，为 false 则关闭 Loading 动画
    // loading: "正在加载中...", // 修改 Loading 文案

    anchorScroll: true,

    backTop: {
        enabled: true, // 是否启动回到顶部功能
        content: "icon", // 回到顶部按钮的显示内容，可选配置 progress | icon
        done: TkMessage => TkMessage.success("返回顶部成功"), // 回到顶部后的回调
    },

    toComment: {
        enabled: true, // 是否启动滚动到评论区功能
        done: TkMessage => TkMessage.success("已抵达评论区"), // 滚动到评论区后的回调
    },

    sidebarTrigger: true,

    // bodyBgImg: {
    //     imgSrc: ["/img/bg1.jpg"], // body 背景图片链接。单张图片 string | 多张图片 string[], 多张图片时每隔 imgInterval 秒换一张
    //     imgOpacity: 1, // body 背景图透明度，选值 0.1 ~ 1.0
    //     imgInterval: 15000, //  body 当多张背景图时（imgSrc 为数组），设置切换时间，单位：毫秒
    //     imgShuffle: false, // body 背景图是否随机切换，为 false 时按顺序切换
    //     mask: true, // body 背景图遮罩
    //     maskBg: "rgba(0, 0, 0, 0.2)", // body 背景图遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。mask 为 true 时生效
    // },

    author: {
        name: "Bertram", // 作者名称
        link: "https://github.com/t822876884", // 点击作者名称后跳转的链接
    },

    banner: {
        enabled: false, // 是否启用 Banner
        name: "Bertram", // Banner 标题，默认读取 vitepress 的 title 属性
        bgStyle: "fullImg", // Banner 背景风格：pure 为纯色背景，partImg 为局部图片背景，fullImg 为全屏图片背景
        pureBgColor: "#28282d", // Banner 背景色，bgStyle 为 pure 时生效
        imgSrc: ["/img/bg1.jpg"], // Banner 图片链接。bgStyle 为 partImg 或 fullImg 时生效
        imgInterval: 15000, // 当多张图片时（imgSrc 为数组），设置切换时间，单位：毫秒
        imgShuffle: false, // 图片是否随机切换，为 false 时按顺序切换，bgStyle 为 partImg 或 fullImg 时生效
        imgWaves: true, // 是否开启 Banner 图片波浪纹，bgStyle 为 fullImg 时生效
        mask: true, // Banner 图片遮罩，bgStyle 为 partImg 或 fullImg 时生效
        maskBg: "rgba(0, 0, 0, 0.4)", // Banner 遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。bgStyle 为 partImg 或 fullImg 且 mask 为 true 时生效
        textColor: "#ffffff", // Banner 字体颜色，bgStyle 为 pure 时为 '#000000'，其他为 '#ffffff'
        titleFontSize: "3.2rem", // 标题字体大小
        descFontSize: "1.4rem", // 描述字体大小
        descStyle: "types", // 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
        description: ["梦想还是要有的，剩下的交给时间。。。"], // 描述信息
        switchTime: 4000, // 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
        switchShuffle: false, // 描述信息是否随机切换，为 false 时按顺序切换。descStyle 为 switch 时生效
        typesInTime: 200, // 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
        typesOutTime: 100, // 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
        typesNextTime: 800, // 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
        typesShuffle: false, // 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
    },

    // 文章列表配置
    post: {
        postStyle: "list", // 文章列表风格
        excerptPosition: "top", // 文章摘要位置
        showMore: true, // 是否显示更多按钮
        moreLabel: "阅读全文 >", // 更多按钮文字
        emptyLabel: "暂无文章", // 文章列表为空时的标签
        coverImgMode: "default", // 文章封面图模式
        showCapture: false, // 是否在摘要位置显示文章部分文字，当为 true 且不使用 frontmatter.describe 和 <!-- more --> 时，会自动截取前 300 个字符作为摘要
        splitSeparator: false, // 文章信息（作者、创建时间、分类、标签等信息）是否添加 | 分隔符
        transition: true, // 是否开启过渡动画
        transitionName: "tk-slide-fade", // 自定义过渡动画名称
        listStyleTitleTagPosition: "right", // 列表模式下的标题标签位置（postStyle 为 list）
        cardStyleTitleTagPosition: "left", // 卡片模式下的标题标签位置（postStyle 为 card）
        defaultCoverImg: [], // 默认封面图地址，如果不设置封面图则使用默认封面图地址
    },

    page: {
        disabled: false, // 是否禁用
        pageSize: 20, // 每页显示条目数
        pagerCount: 7, // 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
        layout: "prev, pager, next, jumper, ->, total", // 组件布局，子组件名用逗号分隔
        size: "default", // 分页大小
        background: false, // 是否为分页按钮添加背景色
        hideOnSinglePage: false, // 只有一页时是否隐藏
        // ...
    },

    homeCardListPosition: "right",
    homeCardSort: ["topArticle", "category", "tag", "friendLink", "docAnalysis"],

    tagColor: [
        { border: "#bfdbfe", bg: "#eff6ff", text: "#2563eb" },
        { border: "#e9d5ff", bg: "#faf5ff", text: "#9333ea" },
        { border: "#fbcfe8", bg: "#fdf2f8", text: "#db2777" },
        { border: "#a7f3d0", bg: "#ecfdf5", text: "#059669" },
        { border: "#fde68a", bg: "#fffbeb", text: "#d97706" },
        { border: "#a5f3fc", bg: "#ecfeff", text: "#0891b2" },
        { border: "#c7d2fe", bg: "#eef2ff", text: "#4f46e5" },
    ],

    // 博主信息，显示在首页左边第一个卡片。
    blogger: {
        name: "Bertram", // 博主昵称
        slogan: "与其在遗憾中徘徊，不如在希望中奔跑——毕竟，人生只有一次。", // 博主签名
        avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar1.png", // 博主头像
        shape: "circle", // 头像风格：square 为方形头像，circle 为圆形头像，circle-rotate 可支持鼠标悬停旋转，circle-rotate-last 将会持续旋转 59s
        circleBgImg: "/blog/bg4.webp", // 背景图片
        circleBgMask: true, // 遮罩层是否显示，仅当 shape 为 circle 且 circleBgImg 配置时有效
        circleSize: 100, // 头像大小
        color: "#060606ff", // 字体颜色
        // 状态，仅当 shape 为 circle 相关值时有效
        status: {
            icon: "😪", // 状态图标
            size: 24, // 图标大小
            title: "困", // 鼠标悬停图标的提示语
        },
    },

    topArticle: {
        enabled: true, // 是否启用精选文章卡片
        // title: "${icon}精选文章", // 卡片标题
        emptyLabel: "暂无精选文章", // 精选文章为空时的标签
        limit: 5, // 一页显示的数量
        autoPage: false, // 是否自动翻页
        pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
        dateFormat: "yyyy-MM-dd hh:mm:ss", // 精选文章的日期格式
    },

    category: {
        enabled: true, // 是否启用分类卡片
        path: "/categories", // 分类页访问地址
        // pageTitle: "${icon}全部分类", // 分类页卡片标题
        // homeTitle: "${icon}文章分类", // 卡片标题
        moreLabel: "更多 ...", // 查看更多分类标签
        emptyLabel: "暂无文章分类", // 分类为空时的标签
        limit: 5, // 一页显示的数量
        autoPage: false, // 是否自动翻页
        pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
    },

    tag: {
        enabled: true, // 是否启用标签卡片
        path: "/tags", // 标签页访问地址
        // pageTitle: "${icon}全部标签", // 标签页页卡片标题
        // homeTitle: "${icon}热门标签", // 卡片标题
        moreLabel: "更多 ...", //  查看更多分类标签
        emptyLabel: "暂无标签", // 标签为空时的标签
        limit: 21, // 一页显示的数量
        autoPage: false, // 是否自动翻页
        pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
    },

    friendLink: {
        enabled: true, // 是否启用友情链接卡片
        list: [
            {
                name: "Teeker",
                desc: "朝圣的使徒，正在走向编程的至高殿堂！",
                avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar2.png",
                link: "http://notes.teek.top/",
            }
        ], // 友情链接数据列表
        // title: "${icon}友情链接", // 卡片标题
        emptyLabel: "暂无友情链接", // 友情链接为空时的标签
        limit: 5, // 一页显示的数量
        autoScroll: false, // 是否自动滚动
        scrollSpeed: 2500, // 滚动间隔时间，单位：毫秒。autoScroll 为 true 时生效
        autoPage: false, // 是否自动翻页
        pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
    },

    social: [
        {
            icon: "mdi:github",
            name: "GitHub",
            link: "https://github.com/t822876884",
        },
        // {
        //     icon: "simple-icons:gitee",
        //     name: "Gitee",
        //     link: "https://gitee.com/kele-bingtang",
        // },
    ],

    // footerGroup: [
    //     {
    //         title: "外部链接",
    //         links: [
    //             // { name: "示例 1", link: "https://vp.teek.top", icon: "icon-github" },
    //             // { name: "示例 2", link: "https://vp.teek.top" },
    //             // { name: "示例 3", link: "https://vp.teek.top" },
    //         ],
    //     },
    //     {
    //         title: "内部链接",
    //         links: [
    //             {name: "快速开始", link: "/guide/quickstart"},
    //             {name: "配置简介", link: "/reference/config"},
    //         ],
    //     },
    // ],

    footerInfo: {
        // 页脚信息，支持 HTML 格式（位于主题版权上方）
        // topMessage: ["下面的内容和图标都可以修改（本条内容也可以隐藏的）"],
        // 页脚信息，支持 HTML 格式（位于主题版权下方）
        // bottomMessage: ["上面的内容和图标都可以修改（本条内容也可以隐藏的）"],
        // 主题版权配置
        theme: {
            show: true, // 是否显示主题版权，建议显示
            name: "", // 自定义名称
            link: "", // 自定义链接
        },
        // 博客版权配置
        copyright: {
            show: true, // 是否显示博客版权
            createYear: 2025, // 创建年份
            suffix: "Bertram's Blog", // 后缀
        },
        // ICP 备案信息配置
        icpRecord: {
            name: " 苏ICP备2025210198号-1X",
            link: "http://beian.miit.gov.cn/",
        },
        // 网络安全备案信息配置
        securityRecord: {
            name: "",
            link: "",
        },
    },

    articleBanner: {
        enabled: true, // 是否启用单文章页 Banner
        showCategory: true, // 是否展示分类
        showTag: true, // 是否展示标签
        defaultCoverImg: "", // 默认封面图
        defaultCoverBgColor: "", // 默认封面背景色，优先级低于 defaultCoverImg
    },
    articleAnalyze: {
        showIcon: true, // 作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息的图标是否显示
        dateFormat: "yyyy-MM-dd hh:mm:ss", // 文章日期格式，首页和文章页解析日期时使用
        dateUTC: true, // 是否使用 UTC 时间
        showInfo: true, // 是否展示作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息，分别作用于首页和文章页
        showAuthor: true, // 是否展示作者
        showCreateDate: true, // 是否展示创建日期
        showUpdateDate: false, // 是否展示更新日期，仅在文章页显示
        showCategory: false, // 是否展示分类
        showTag: false, // 是否展示标签
    },

    breadcrumb: {
        enabled: true, // 是否启用面包屑
        showCurrentName: false, // 面包屑最后一列是否显示当前文章的文件名
        separator: "/", // 面包屑分隔符
        homeLabel: "首页", // 鼠标悬停首页图标的提示文案
    },

    pageStyle: "segment", //"default" | "card" | "segment" | "card-nav" | "segment-nav"

    appreciation: {
        position: "doc-after", // 赞赏位置
        // 赞赏配置
        options: {
            icon: "weChatPay", // 赞赏图标，内置 weChatPay 和 alipay
            expandTitle: "打赏支持", // 展开标题，支持 HTML
            collapseTitle: "下次一定", // 折叠标题，支持 HTML
            content: `<img src='/qrcode/wechat-pay.jpg'>`, // 赞赏内容，支持 HTML
            expand: false, // 是否默认展开，默认 false
        },
    },

    articleShare: {
        enabled: true, // 是否开启文章链接分享功能
        text: "分享此页面", // 分享按钮文本
        copiedText: "链接已复制", // 复制成功文本
        query: false, // 是否包含查询参数
        hash: false, // 是否包含哈希值
    },

    articleTopTip: (frontmatter, localeIndex, page) => {
        const tip: Record<string, string> = {
            type: "warning",
            text: "文章发布较早，内容可能过时，阅读注意甄别。",
        };

        // 大于半年，添加提示
        const longTime = 12 * 30 * 24 * 60 * 60 * 1000;
        if (frontmatter.date && Date.now() - new Date(frontmatter.date).getTime() > longTime) return tip;
    },

    articleBottomTip: frontmatter => {
        if (typeof window === "undefined") return;

        const hash = false;
        const query = false;
        const { origin, pathname, search } = window.location;
        const url = `${origin}${frontmatter.permalink ?? pathname}${query ? search : ""}${hash ? location.hash : ""}`;
        const author = "Bertram";

        return {
            type: "tip",
            // title: "声明", // 可选
            text: `<p>作者：${author}</p>
             <p style="margin-bottom: 0">链接：<a href="${decodeURIComponent(url)}" target="_blank">${decodeURIComponent(url)}</a></p>
             <p>版权：此文章版权归 ${author} 所有，如有转载，请注明出处!</p>
            `,
        };
    },

    articleUpdate: {
        enabled: true, // 是否启用文章最近更新栏
        limit: 3, // 文章最近更新栏显示数量
    },
});

const description = [
    "欢迎来到 vitepress-theme-teek 使用文档",
    "Teek 是一个基于 VitePress 构建的主题，是在默认主题的基础上进行拓展，支持 VitePress 的所有功能、配置",
    "Teek 拥有三种典型的知识管理形态：结构化、碎片化、体系化，可以轻松构建一个结构化知识库，适用个人博客、文档站、知识库等场景",
].toString();

// https://vitepress.dev/reference/site-config
export default defineConfig({
    extends: teekConfig,
    title: "Bertram's Blog",
    description: description,
    cleanUrls: false,
    lastUpdated: true,
    lang: "zh-CN",
    // Vite 配置 - 改善文件监听和热重载
    vite: {
        server: {
            host: '0.0.0.0',
            // 允许的主机列表，支持通过域名访问
            allowedHosts: [
                'localhost',
                '127.0.0.1',
                'www.530312.xyz',
                '.530312.xyz', // 支持所有子域名
            ],
            watch: {
                // 监听所有文件变化，包括新增文件
                usePolling: false,
                // 忽略 node_modules 以提高性能
                ignored: ['**/node_modules/**', '**/.git/**', '**/@eaDir/**', '**/.DS_Store'],
            },
            // 启用文件系统严格模式
            fs: {
                strict: false,
            },
        },
        // 优化依赖预构建
        optimizeDeps: {
            // 强制预构建某些依赖
            include: ['vitepress-theme-teek'],
        },
    },
    head: [
        [
            "link",
            { rel: "icon", type: "image/svg+xml", href: "/teek-logo-mini.svg" },
        ],
        ["link", { rel: "icon", type: "image/png", href: "/teek-logo-mini.png" }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:locale", content: "zh-CN" }],
        ["meta", { property: "og:title", content: "Teek | VitePress Theme" }],
        ["meta", { property: "og:site_name", content: "Teek" }],
        ["meta", { property: "og:image", content: "" }],
        ["meta", { property: "og:url", content: "" }],
        ["meta", { property: "og:description", description }],
        ["meta", { name: "description", description }],
        ["meta", { name: "author", content: "Teek" }],
        // 禁止浏览器缩放
        // [
        //   "meta",
        //   {
        //     name: "viewport",
        //     content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
        //   },
        // ],
        ["meta", { name: "keywords", description }],
    ],
    markdown: {
        // 开启行号
        lineNumbers: true,
        image: {
            // 默认禁用；设置为 true 可为所有图片启用懒加载。
            lazyLoading: true,
        },
        // 更改容器默认值标题
        container: {
            tipLabel: "提示",
            warningLabel: "警告",
            dangerLabel: "危险",
            infoLabel: "信息",
            detailsLabel: "详细信息",
        },
    },
    sitemap: {
        hostname: "https://vp.teek.top", // ** 换成你的域名
        transformItems: (items) => {
            const permalinkItemBak: typeof items = [];
            // 使用永久链接生成 sitemap
            const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig
                .permalinks;
            items.forEach((item) => {
                const permalink = permalinks?.map[item.url];
                if (permalink)
                    permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
            });
            return [...items, ...permalinkItemBak];
        },
    },
    themeConfig: {
        logo: "/teek-logo-mini.svg",
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            {
                text: "大数据", items: [
                    { text: "Flink", link: "/bigdata/flink" },
                    { text: "Spark", link: "/bigdata/spark" },
                    { text: "HBase", link: "/bigdata/hbase" },
                    { text: "ES", link: "/bigdata/es" },
                    { text: "Doris", link: "/bigdata/doris" },
                    { text: "Hive", link: "/bigdata/hive" },
                ],
            },
            {
                text: "大模型", items: [
                    { text: "提示词", link: "/ai/prompt" }
                ],
            },
            {
                text: "Java", items: [
                    { text: "Spring", link: "/java/spring" },
                    { text: "MySQL", link: "/java/mysql" },
                ],
            },
            {
                text: "运维", items: [
                    { text: "Linux", link: "/yunwei/linux" },
                    { text: "Docker", link: "/yunwei/docker" },
                ],
            },
            { text: "面试", link: "/interview" },
            { text: "杂项", link: "/other" },
            {
                text: '功能页',
                items: [
                    { text: "归档页", link: "/archives" },
                    { text: "清单页", link: "/articleOverview" },
                    { text: "分类页", link: "/categories" },
                    { text: "标签页", link: "/tags" },
                ],
            },
            { text: "✨ 赞赏", link: "/personal/" },
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ],

        // 本地全文搜索配置
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                    closeText: '关闭'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})
