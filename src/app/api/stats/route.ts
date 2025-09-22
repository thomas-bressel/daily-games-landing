import { NextResponse } from 'next/server';
import { FeedService } from '@/Services/FeedService';

/**
 * GET /api/stats - Version ultra-simple
 * Fait seulement : compter les articles, feeds, et articles récents
 */
export async function GET() {
  try {
    const feedService = new FeedService();

    // 1. Récupérer tous les articles
    const { articles } = await feedService.fetchAllArticles();

    // 2. Compter les feeds actifs
    const activeFeeds = feedService.getActiveFeeds();

    // 3. Compter les articles des dernières 24h
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Filtrer les articles publiés après "yesterday"
    const articlesLast24h = articles.filter(article =>
      new Date(article.publishedAt) > yesterday
    ).length;

    // 4. Réponse simple
    return NextResponse.json({
      success: true, data: {
        overview: {
          totalArticles: articles.length,
          activeFeeds: activeFeeds.length,
          articlesLast24h: articlesLast24h,
        },
      },
    });

  } catch (error) {
    console.error('Erreur API stats:', error);
    return NextResponse.json({ success: false, error: 'Erreur lors du chargement des stats' }, { status: 500 });
  }
}