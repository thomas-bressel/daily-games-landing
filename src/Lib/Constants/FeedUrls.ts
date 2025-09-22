import { IRSSFeed } from '@/Types/Feed';
import { CATEGORIES } from '@/Types/Common';

/**
 * Default RSS feeds configuration for retro gaming sources
 */
export const DEFAULT_RSS_FEEDS: IRSSFeed[] = [
  {
    id: 'indie-retro-news',
    name: 'Indie Retro News',
    url: 'http://www.indieretronews.com/feeds/posts/default?alt=rss',
    category: CATEGORIES.RETRO_GAMING,
    description: 'Best gaming website for Indie and Retro Gaming News',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['amstrad-cpc', 'c64', 'zx-spectrum', 'indie', 'homebrew'],
  },
  {
    id: 'amstrad-eu',
    name: 'Amstrad.eu',
    url: 'https://amstrad.eu/feed/',
    category: CATEGORIES.AMSTRAD_CPC,
    description: 'Specialized Amstrad community and news',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['amstrad-cpc', 'hardware', 'community'],
  },
  {
    id: 'octoate',
    name: 'Octoate.de',
    url: 'https://www.octoate.de/feed/',
    category: CATEGORIES.AMSTRAD_CPC,
    description: 'General news on amstrad CPC Tricks',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['amstrad-cpc', 'hardware', 'community'],
  },
  {
    id: 'atariage',
    name: 'Atariage',
    url: 'https://www.atariage.com/news/rss.php',
    category: CATEGORIES.ATARI_ST,
    description: 'General news on Atari ST micro computers',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['atari-st', 'hardware', 'community'],
  },
  {
    id: 'retrogamerie',
    name: 'La Rétrogamerie',
    url: 'https://retrogamerie.fr/feed/',
    category: CATEGORIES.RETRO_GAMING,
    description: 'General news on Atari ST micro computers',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['atari-st', 'hardware', 'community'],
  },
  {
    id: 'itchio',
    name: 'Itch.io',
    url: 'https://itch.io/feed/new.xml',
    category: CATEGORIES.HOMEBREW,
    description: 'General news on homebrew games',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['homebrew', 'hardware', 'community'],
  },
  {
    id: 'retro-rgb',
    name: 'Retro RGB',
    url: 'https://www.retrorgb.com/feed',
    category: CATEGORIES.HOMEBREW,
    description: 'General news on homebrew games',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['homebrew', 'hardware', 'community'],
  },
  {
    id: 'indiedb',
    name: 'Indie DB',
    url: 'https://rss.indiedb.com/articles/feed/rss.xml',
    category: CATEGORIES.HOMEBREW,
    description: 'General news on homebrew games',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['homebrew', 'hardware', 'community'],
  },
  {
    id: 'gameradar',
    name: 'Game Radar',
    url: 'https://www.gamesradar.com/feeds.xml',
    category: CATEGORIES.RETRO_GAMING,
    description: 'General news on homebrew games',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['homebrew', 'hardware', 'community'],
  },
  {
    id: 'vintageisthenewold',
    name: 'Vintage is the New Old',
    url: 'https://www.vintageisthenewold.com/feed/',
    category: CATEGORIES.RETRO_GAMING,
    description: 'General news on homebrew games',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['homebrew', 'hardware', 'community'],
  },
  {
    id: 'scene-world',
    name: 'Scene World',
    url: 'https://feeds.feedburner.com/sceneworldpodcast',
    category: CATEGORIES.RETRO_GAMING,
    description: 'General news on homebrew games',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['demo', 'scene', 'community'],
  },
  {
    id: 'jeux-video',
    name: 'Jeux Video.com',
    url: 'https://www.jeuxvideo.com/rss/rss-news.xml',
    category: CATEGORIES.NEXTGEN,
    description: 'General news on homebrew games',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['demo', 'scene', 'community'],
  },
  {
    id: 'abandonware',
    name: 'Abandoware France',
    url: 'https://www.abandonware-france.org/rss/abandonware/',
    category: CATEGORIES.RETRO_GAMING,
    description: 'General news on homebrew games',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['demo', 'scene', 'community'],
  },
  {
    id: 'rom-game',
    name: 'Rom Game',
    url: 'https://www.rom-game.fr/rss/rss.rss',
    category: CATEGORIES.RETRO_GAMING,
    description: 'General news on homebrew games',
    isActive: true,
    fetchInterval: 60, // 1 hour
    tags: ['demo', 'scene', 'community'],
  },
  // Add more feeds as discovered
];

/**
 * Feed categories for filtering
 */
export const FEED_CATEGORIES = [
  { id: CATEGORIES.AMSTRAD_CPC, name: 'Amstrad CPC', color: 'bg-blue-500' },
  { id: CATEGORIES.ATARI_ST, name: 'Atari ST', color: 'bg-blue-500' },
  { id: CATEGORIES.RETRO_GAMING, name: 'Retro Gaming', color: 'bg-green-500' },
  { id: CATEGORIES.HOMEBREW, name: 'Homebrew', color: 'bg-purple-500' },
  { id: CATEGORIES.HARDWARE, name: 'Hardware', color: 'bg-red-500' },
  { id: CATEGORIES.NEXTGEN, name: 'NextGen', color: 'bg-red-500' },
  { id: CATEGORIES.EMULATION, name: 'Emulation', color: 'bg-yellow-500' },
];

/**
 * Common tags for articles
 */
export const COMMON_TAGS = [
  'amstrad-cpc',
  'cpc-464',
  'cpc-6128',
  'homebrew',
  'demo',
  'game-release',
  'hardware',
  'emulator',
  'review',
  'tutorial',
];

/**
 * Application configuration
 */
export const APP_CONFIG = {
  NAME: 'Daily Games',
  DESCRIPTION: 'Your hub for retro gaming news and updates',
  VERSION: '1.0.0',
  MAX_ARTICLES_PER_FEED: 5,
  DEFAULT_FETCH_INTERVAL: 60, // minutes
  CACHE_DURATION: 5, // minutes
} as const;