import {defineConfig} from 'vitepress'
import { defineTeekConfig } from "vitepress-theme-teek/config";

// Teek 主题配置
const teekConfig = defineTeekConfig({
    teekTheme: true,
    vitePlugins: {
        sidebarOption: {
            sort: true, // 开启 frontmatter.sidebarSort 功能，默认已经开启，无需设置
            defaultSortNum: 9999, // 没有指定 frontmatter.sidebarSort 时的默认值，用于侧边栏排序
            sortNumFromFileName: false, // 是否用文件名的前缀序号作为其侧边栏 Item 的排序序号。如果为 true，当文件名存在序号前缀，则使用序号前缀，否则使用 defaultSortNum
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

    bodyBgImg: {
        imgSrc: ["/img/bg1.jpg"], // body 背景图片链接。单张图片 string | 多张图片 string[], 多张图片时每隔 imgInterval 秒换一张
        imgOpacity: 1, // body 背景图透明度，选值 0.1 ~ 1.0
        imgInterval: 15000, //  body 当多张背景图时（imgSrc 为数组），设置切换时间，单位：毫秒
        imgShuffle: false, // body 背景图是否随机切换，为 false 时按顺序切换
        mask: false, // body 背景图遮罩
        maskBg: "rgba(0, 0, 0, 0.2)", // body 背景图遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。mask 为 true 时生效
    },

    author: {
        name: "Bertram", // 作者名称
        link: "https://github.com/t822876884", // 点击作者名称后跳转的链接
    },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
    extends: teekConfig,
    title: "Bertram's Blog",
    description: "Personal online knowledge base",
    themeConfig: {
        logo: "/teek-logo-mini.svg",
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Examples', link: '/markdown-examples'}
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    {text: 'Markdown Examples', link: '/markdown-examples'},
                    {text: 'Runtime API Examples', link: '/api-examples'}
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ]
    }
})
