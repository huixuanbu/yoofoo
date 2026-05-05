import { Movie, Category } from './types';

export const categories: Category[] = [
  { id: 'all', name: '全部', nameEn: 'All', icon: '🔥' },
  { id: 'tv-drama', name: '电视剧', nameEn: 'TV Drama', icon: '📺' },
  { id: 'movie', name: '电影', nameEn: 'Movie', icon: '🎬' },
  { id: 'variety', name: '综艺', nameEn: 'Variety', icon: '🎭' },
  { id: 'documentary', name: '纪录片', nameEn: 'Documentary', icon: '📹' },
  { id: 'anime', name: '动漫', nameEn: 'Anime', icon: '✨' },
];

export const genres = [
  '全部', '古装', '仙侠', '悬疑', '爱情', '都市', '军旅',
  '历史', '喜剧', '科幻', '武侠', '宫斗', '谍战', '家庭',
];

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: '甄嬛传',
    titleEn: 'Empresses in the Palace',
    year: 2011,
    type: 'tv',
    genre: ['古装', '宫斗', '爱情'],
    poster: 'https://picsum.photos/seed/zhenhuan/400/600',
    description: '雍正元年，十七岁的甄嬛参加选秀，被雍正帝留用，入宫后面对后宫的尔虞我诈...',
    rating: 9.2,
    actors: ['孙俪', '陈建斌', '蔡少芬', '刘雪华'],
    director: '郑晓龙',
    episodes: 76,
    region: '中国大陆',
    links: [
      { platform: 'YouTube', url: 'https://www.youtube.com/results?search_query=甄嬛传', quality: '1080P', region: 'Global' },
      { platform: 'Viki', url: 'https://www.viki.com/search?q=Empresses+in+the+Palace', quality: '1080P', region: 'Global' },
    ],
  },
  {
    id: '2',
    title: '琅琊榜',
    titleEn: 'Nirvana in Fire',
    year: 2015,
    type: 'tv',
    genre: ['古装', '悬疑', '历史'],
    poster: 'https://picsum.photos/seed/langyabang/400/600',
    description: '十二年前的赤焰冤案，七万将士埋骨梅岭。十二年后，化身苏哲的林殊重返金陵...',
    rating: 9.4,
    actors: ['胡歌', '刘涛', '王凯', '黄维德'],
    director: '孔笙', 
    episodes: 54,
    region: '中国大陆',
    links: [
      { platform: 'Netflix', url: 'https://www.netflix.com/search?q=Nirvana+in+Fire', quality: '4K', region: 'Global' },
      { platform: 'YouTube', url: 'https://www.youtube.com/results?search_query=琅琊榜', quality: '1080P', region: 'Global' },
    ],
  },
  {
    id: '3',
    title: '陈情令',
    titleEn: 'The Untamed',
    year: 2019,
    type: 'tv',
    genre: ['仙侠', '古装', '武侠'],
    poster: 'https://picsum.photos/seed/chenqingling/400/600',
    description: '十六年前，天下五分，岐温两家争霸。云梦江氏大弟子魏无羡与岐山温氏嫡子蓝忘机...',
    rating: 8.9,
    actors: ['肖战', '王一博', '孟子义', '宣璐'],
    director: '陈家霖',
    episodes: 50,
    region: '中国大陆',
    links: [
      { platform: 'Netflix', url: 'https://www.netflix.com/search?q=The+Untamed', quality: '4K', region: 'Global' },
      { platform: 'Viki', url: 'https://www.viki.com/search?q=The+Untamed', quality: '1080P', region: 'Global' },
    ],
  },
  {
    id: '4',
    title: '庆余年',
    titleEn: 'Joy of Life',
    year: 2019,
    type: 'tv',
    genre: ['古装', '悬疑', '喜剧'],
    poster: 'https://picsum.photos/seed/qingyunian/400/600',
    description: '范闲十五岁时，父亲范建请来老师教导他。范闲从小学习了大量的书籍，心智成熟...',
    rating: 8.7,
    actors: ['张若昀', '李沁', '陈道明', '吴刚'],
    director: '孙皓',
    episodes: 46,
    region: '中国大陆',
    links: [
      { platform: 'YouTube', url: 'https://www.youtube.com/results?search_query=庆余年', quality: '1080P', region: 'Global' },
    ],
  },
  {
    id: '5',
    title: '三体',
    titleEn: 'Three-Body Problem',
    year: 2023,
    type: 'tv',
    genre: ['科幻', '悬疑', '历史'],
    poster: 'https://picsum.photos/seed/santi/400/600',
    description: '2007年，纳米科学家汪淼被警察史强叫去协助调查一系列科学家自杀事件...',
    rating: 8.5,
    actors: ['张鲁一', '于和伟', '陈瑾', '王子文'],
    director: '杨磊',
    episodes: 30,
    region: '中国大陆',
    links: [
      { platform: 'YouTube', url: 'https://www.youtube.com/results?search_query=Three+Body+Problem+Chinese', quality: '4K', region: 'Global' },
    ],
  },
  {
    id: '6',
    title: '流浪地球2',
    titleEn: 'The Wandering Earth II',
    year: 2023,
    type: 'movie',
    genre: ['科幻', '灾难', '冒险'],
    poster: 'https://picsum.photos/seed/liulangdiqiu2/400/600',
    description: '太阳即将毁灭，人类决定开启流浪地球计划，带着地球逃离太阳系...',
    rating: 8.3,
    actors: ['吴京', '刘德华', '李雪健', '沙溢'],
    director: '郭帆',
    region: '中国大陆',
    links: [
      { platform: 'YouTube', url: 'https://www.youtube.com/results?search_query=Wandering+Earth+2', quality: '4K', region: 'Global' },
    ],
  },
  {
    id: '7',
    title: '长津湖',
    titleEn: 'The Battle at Lake Changjin',
    year: 2021,
    type: 'movie',
    genre: ['战争', '历史', '军旅'],
    poster: 'https://picsum.photos/seed/changjihu/400/600',
    description: '以抗美援朝战争中长津湖战役为背景，讲述志愿军连队在极度严寒中坚守阵地的故事...',
    rating: 7.8,
    actors: ['吴京', '易烊千玺', '朱亚文', '李晨'],
    director: '陈凯歌 / 徐克 / 林超贤',
    region: '中国大陆',
    links: [
      { platform: 'YouTube', url: 'https://www.youtube.com/results?search_query=Battle+Lake+Changjin', quality: '4K', region: 'Global' },
    ],
  },
  {
    id: '8',
    title: '你好，李焕英',
    titleEn: 'Hi, Mom',
    year: 2021,
    type: 'movie',
    genre: ['喜剧', '家庭', '爱情'],
    poster: 'https://picsum.photos/seed/nihao/400/600',
    description: '贾晓玲在母亲意外离世后，悲痛之余穿越回到1981年，和年轻时的母亲相遇...',
    rating: 8.1,
    actors: ['贾玲', '张小斐', '沈腾', '陈赫'],
    director: '贾玲',
    region: '中国大陆',
    links: [
      { platform: 'YouTube', url: 'https://www.youtube.com/results?search_query=Hi+Mom+2021', quality: '1080P', region: 'Global' },
    ],
  },
  {
    id: '9',
    title: '狂飙',
    titleEn: 'The Knockout',
    year: 2023,
    type: 'tv',
    genre: ['悬疑', '犯罪', '都市'],
    poster: 'https://picsum.photos/seed/kuangbiao/400/600',
    description: '京海市一线刑警安欣与黑恶势力高启强展开长达二十年的正邪较量...',
    rating: 8.9,
    actors: ['张译', '张颂文', '李一桐', '张志坚'],
    director: '徐纪周',
    episodes: 39,
    region: '中国大陆',
    links: [
      { platform: 'YouTube', url: 'https://www.youtube.com/results?search_query=The+Knockout+狂飙', quality: '1080P', region: 'Global' },
    ],
  },
  {
    id: '10',
    title: '漫长的季节',
    titleEn: 'The Long Season',
    year: 2023,
    type: 'tv',
    genre: ['悬疑', '犯罪', '家庭'],
    poster: 'https://picsum.photos/seed/manchangde/400/600',
    description: '上世纪九十年代末，东北桦林钢铁厂火车司机王响在一次碎尸案中失去了儿子...',
    rating: 9.4,
    actors: ['范伟', '秦昊', '陈明昊', '刘奕铁'],
    director: '辛爽',
    episodes: 12,
    region: '中国大陆',
    links: [
      { platform: 'YouTube', url: 'https://www.youtube.com/results?search_query=Long+Season+漫长季节', quality: '1080P', region: 'Global' },
    ],
  },
  {
    id: '11',
    title: '去有风的地方',
    titleEn: 'Meet Yourself',
    year: 2023,
    type: 'tv',
    genre: ['爱情', '都市', '家庭'],
    poster: 'https://picsum.photos/seed/quyoufengdedifang/400/600',
    description: '辞职后的许红豆独自前往大理云苗村休息调整，在那里她遇到了回乡创业的谢之遥...',
    rating: 8.5,
    actors: ['刘亦菲', '李现', '胡冰卿', '牛骏峰'],
    director: '丁梓光',
    episodes: 40,
    region: '中国大陆',
    links: [
      { platform: 'Netflix', url: 'https://www.netflix.com/search?q=Meet+Yourself', quality: '1080P', region: 'Global' },
    ],
  },
  {
    id: '12',
    title: '长安十二时辰',
    titleEn: 'The Longest Day in Chang\'an',
    year: 2019,
    type: 'tv',
    genre: ['古装', '悬疑', '历史'],
    poster: 'https://picsum.photos/seed/changanshier/400/600',
    description: '唐天宝三载，上元节前夕，长安城混入可疑人员，靖安司司丞李必破格启用死囚张小敬...',
    rating: 8.6,
    actors: ['雷佳音', '易烊千玺', '周一围', '热依扎'],
    director: '曹盾',
    episodes: 48,
    region: '中国大陆',
    links: [
      { platform: 'YouTube', url: 'https://www.youtube.com/results?search_query=Longest+Day+Changan', quality: '4K', region: 'Global' },
    ],
  },
];

export function getMovieById(id: string): Movie | undefined {
  return mockMovies.find(m => m.id === id);
}

export function searchMovies(query: string): Movie[] {
  const q = query.toLowerCase();
  return mockMovies.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.titleEn.toLowerCase().includes(q) ||
    m.actors.some(a => a.toLowerCase().includes(q)) ||
    m.director.toLowerCase().includes(q) ||
    m.genre.some(g => g.toLowerCase().includes(q))
  );
}
