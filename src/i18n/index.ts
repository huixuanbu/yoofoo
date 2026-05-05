export type Locale = 'en' | 'zh';

const en = {
  brand: 'Yoofoo',
  brandSub: 'Discover Chinese Entertainment',
  slogan: 'The Best Chinese Dramas & Movies, Curated for You',
  home: 'Home',
  tvDramas: 'TV Dramas',
  movies: 'Movies',
  search: 'Search',
  searchPlaceholder: 'Search dramas, movies, actors...',
  all: 'All',
  topRated: 'Top Rated',
  latestReleases: 'Latest Releases',
  viewAll: 'View All →',
  browseTV: 'Browse TV Dramas',
  exploreAll: 'Explore All',
  noResults: 'No results found.',
  noResultsHint: 'Try different keywords or filters.',
  results: 'Results',
  whereToWatch: 'Where to Watch',
  youMayAlsoLike: 'You May Also Like',
  director: 'Director',
  cast: 'Cast',
  episodes: 'Episodes',
  contentNotFound: 'Content Not Found',
  contentNotFoundHint: 'This title is not available yet.',
  genre: {
    all: 'All', costume: 'Period', xianxia: 'Fantasy', suspense: 'Suspense',
    romance: 'Romance', urban: 'Urban', military: 'Military', history: 'Historical',
    comedy: 'Comedy', scifi: 'Sci-Fi', wuxia: 'Wuxia', palace: 'Palace Drama',
    espionage: 'Espionage', family: 'Family', war: 'War', crime: 'Crime', disaster: 'Disaster', adventure: 'Adventure',
  },
  category: {
    tv: 'TV Dramas', movie: 'Movies', variety: 'Variety', documentary: 'Documentary', anime: 'Anime',
  },
  footer: {
    about: 'About Yoofoo',
    aboutDesc: 'Yoofoo helps global audiences discover the best Chinese TV dramas and movies. We curate and recommend quality content across genres.',
    quickLinks: 'Quick Links',
    resources: 'Resources',
    help: 'Help Center',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    contact: 'Contact Us',
    rights: 'All rights reserved.',
  },
};

const zh: Record<string, unknown> = {
  brand: '有福',
  brandSub: '发现中国好剧',
  slogan: '精选中国电视剧与电影，向世界讲好中国故事',
  home: '首页',
  tvDramas: '电视剧',
  movies: '电影',
  search: '搜索',
  searchPlaceholder: '搜索剧集、电影、演员...',
  all: '全部',
  topRated: '高分推荐',
  latestReleases: '最新上线',
  viewAll: '查看全部 →',
  browseTV: '浏览电视剧',
  exploreAll: '探索全部',
  noResults: '没有找到相关内容',
  noResultsHint: '试试其他关键词或筛选条件',
  results: '个结果',
  whereToWatch: '在哪里观看',
  youMayAlsoLike: '你可能还喜欢',
  director: '导演',
  cast: '主演',
  episodes: '集',
  contentNotFound: '内容未找到',
  contentNotFoundHint: '该影片暂不可用',
  genre: {
    all: '全部', costume: '古装', xianxia: '仙侠', suspense: '悬疑',
    romance: '爱情', urban: '都市', military: '军旅', history: '历史',
    comedy: '喜剧', scifi: '科幻', wuxia: '武侠', palace: '宫斗',
    espionage: '谍战', family: '家庭', war: '战争', crime: '犯罪', disaster: '灾难', adventure: '冒险',
  },
  category: {
    tv: '电视剧', movie: '电影', variety: '综艺', documentary: '纪录片', anime: '动漫',
  },
  footer: {
    about: '关于有福',
    aboutDesc: '有福帮助全球观众发现最好的中国电视剧和电影。我们精选并推荐各类型优质内容。',
    quickLinks: '快速链接',
    resources: '资源',
    help: '帮助中心',
    terms: '服务条款',
    privacy: '隐私政策',
    contact: '联系我们',
    rights: '保留所有权利',
  },
};

const translations = { en, zh } as const;
export type Translations = typeof en;

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let result: unknown = translations[locale];
  for (const k of keys) {
    if (result && typeof result === 'object') {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key; // fallback to key
    }
  }
  return typeof result === 'string' ? result : key;
}

export function getLocaleFromHeaders(headers: Headers): Locale {
  const acceptLang = headers.get('accept-language') || '';
  if (acceptLang.includes('zh')) return 'zh';
  return 'en';
}
