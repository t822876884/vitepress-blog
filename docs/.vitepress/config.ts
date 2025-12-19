import {defineConfig} from "vitepress";
import llmstxt from "vitepress-plugin-llms";
import {teekConfig} from "./teekConfig";


// https://vitepress.dev/reference/site-config
export default defineConfig({
    extends: teekConfig,
    title: "Bertram's Blog",
    cleanUrls: false,
    lastUpdated: true,
    lang: "zh-CN",
    head: [
        [
            "link",
            {rel: "icon", type: "image/svg+xml", href: "/teek-logo-mini.svg"},
        ],
        ["link", {rel: "icon", type: "image/png", href: "/teek-logo-mini.png"}],
        ["meta", {property: "og:type", content: "website"}],
        ["meta", {property: "og:locale", content: "zh-CN"}],
        ["meta", {property: "og:title", content: "Teek | VitePress Theme"}],
        ["meta", {property: "og:site_name", content: "Teek"}],
        ["meta", {property: "og:image", content: ""}],
        ["meta", {property: "og:url", content: ""}],
        ["meta", {name: "author", content: "Teek"}],
        // 禁止浏览器缩放
        // [
        //   "meta",
        //   {
        //     name: "viewport",
        //     content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
        //   },
        // ],
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
                    permalinkItemBak.push({url: permalink, lastmod: item.lastmod});
            });
            return [...items, ...permalinkItemBak];
        },
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/teek-logo-mini.svg",
        darkModeSwitchLabel: "主题",
        sidebarMenuLabel: "菜单",
        returnToTopLabel: "返回顶部",
        lastUpdatedText: "上次更新时间",
        outline: {
            level: [2, 4],
            label: "本页导航",
        },
        docFooter: {
            prev: "上一页",
            next: "下一页",
        },
        nav: [
            {text: 'Home', link: '/'},
            {
                text: "大数据", items: [
                    {text: "Flink", link: "/bigdata/flink"},
                    {text: "Spark", link: "/bigdata/spark"},
                    {text: "HBase", link: "/bigdata/hbase"},
                    {text: "ES", link: "/bigdata/es"},
                    {text: "Doris", link: "/bigdata/doris"},
                    {text: "Hive", link: "/bigdata/hive"},
                ],
            },
            {
                text: "大模型", items: [
                    {text: "提示词", link: "/ai/prompt"}
                ],
            },
            {
                text: "Java", items: [
                    {text: "Spring", link: "/java/spring"},
                    {text: "MySQL", link: "/java/mysql"},
                ],
            },
            {
                text: "运维", items: [
                    {text: "Linux", link: "/yunwei/linux"},
                    {text: "Docker", link: "/yunwei/docker"},
                ],
            },
            {text: "面试", link: "/interview"},
            {text: "杂项", link: "/other"},
            {
                text: '功能页',
                items: [
                    {text: "归档页", link: "/archives"},
                    {text: "清单页", link: "/articleOverview"},
                    {text: "分类页", link: "/categories"},
                    {text: "标签页", link: "/tags"},
                ],
            },
            {text: "✨ 赞赏", link: "/personal/"},
        ],
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/t822876884",
            },
        ],
        search: {
            provider: "local",
        },
        // editLink: {
        //     text: "在 GitHub 上编辑此页",
        //     pattern:
        //         "https://github.com/t822876884",
        // },
    },
    vite: {
        plugins: [llmstxt() as any],
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
    // transformHtml: (code, id, context) => {
    //   if (context.page !== "404.md") return code;
    //   return code.replace("404 | ", "");
    // },
});
