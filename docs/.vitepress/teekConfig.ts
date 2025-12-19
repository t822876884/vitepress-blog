import {defineTeekConfig} from "vitepress-theme-teek/config";
import {version} from "vitepress-theme-teek/es/version";

export const teekConfig = defineTeekConfig({
    teekHome: true, // 是否开启博客首页
    vpHome: true, // 是否隐藏 VP 首页
    sidebarTrigger: true, // 是否开启侧边栏折叠功能
    author: {
        name: "Bertram", // 作者名称
        link: "https://github.com/t822876884", // 点击作者名称后跳转的链接
    },
    banner: {
        enabled: true, // 是否启用 Banner
        // name: "Bertram", // Banner 标题，默认读取 vitepress 的 title 属性
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
    footerInfo: {
        // 页脚信息，支持 HTML 格式（位于主题版权上方）
        // topMessage: ["下面的内容和图标都可以修改（本条内容也可以隐藏的）"],
        // 页脚信息，支持 HTML 格式（位于主题版权下方）
        // bottomMessage: ["上面的内容和图标都可以修改（本条内容也可以隐藏的）"],
        // 主题版权配置
        theme: {
            show: false, // 是否显示主题版权，建议显示
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
    codeBlock: {
        copiedDone: (TkMessage) => TkMessage.success("复制成功！"),
    },
    articleShare: {enabled: true},
    vitePlugins: {
        sidebarOption: {
            initItems: false,
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
});
