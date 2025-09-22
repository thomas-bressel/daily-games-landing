import { NextRequest, NextResponse } from 'next/server';
import { FeedService } from '@/Services/FeedService';
import { ArticleOrchestrator } from '@/Services/ArticleOrchestrator';

interface ProcessedData {
  articles: unknown[];
  pagination: unknown;
}

/**
 * GET /api/articles - Responsabilité unique : Orchestrer la récupération d'articles
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Parser les paramètres de requête
    const params = parseRequestParams(request);
    
    // 2. Récupérer les articles bruts
    const articles = await fetchRawArticles(params.refresh);
    
    // 3. Traiter les articles (délégué au service)
    const processedData = ArticleOrchestrator.processArticles(
      articles.list,
      params.source,
      params.page,
      params.limit
    );
    
    // 4. Construire la réponse
    const response = buildSuccessResponse(processedData, articles.sources);
    
    return NextResponse.json(response);

  } catch (error) {
    return handleError(error);
  }
}

/**
 * Fonction pure : Parser les paramètres - TESTABLE
 */
function parseRequestParams(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  return {
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: parseInt(searchParams.get('limit') || '20', 10),
    source: searchParams.get('source') || undefined,
    refresh: searchParams.get('refresh') === 'true',
  };
}

/**
 * Fonction pure : Récupérer les articles - TESTABLE
 */
async function fetchRawArticles(forceRefresh: boolean) {
  const feedService = new FeedService();
  const { articles } = await feedService.fetchAllArticles(forceRefresh);
  
  return {
    list: articles,
    sources: [...new Set(articles.map(a => a.source))].sort(),
  };
}

/**
 * Fonction pure : Construire la réponse - TESTABLE
 */
function buildSuccessResponse(processedData: ProcessedData, sources: string[]) {
  return {
    success: true,
    data: {
      articles: processedData.articles,
      pagination: processedData.pagination,
      metadata: { sources },
    },
  };
}

/**
 * Fonction pure : Gérer les erreurs - TESTABLE
 */
function handleError(error: unknown) {
  console.error('Erreur API articles:', error);
  
  return NextResponse.json(
    { 
      success: false, 
      error: 'Erreur lors du chargement des articles' 
    },
    { status: 500 }
  );
}

/**
 * POST /api/articles/refresh - Responsabilité unique : Rafraîchir les feeds
 */
export async function POST() {
  try {
    const result = await refreshFeeds();
    const response = buildRefreshResponse(result);
    
    return NextResponse.json(response);

  } catch (error) {
    return handleError(error);
  }
}

/**
 * Fonction pure : Rafraîchir les feeds - TESTABLE
 */
async function refreshFeeds() {
  const feedService = new FeedService();
  feedService.clearCache();
  
  const { articles, stats } = await feedService.fetchAllArticles(true);
  
  return {
    articlesCount: articles.length,
    feedsCount: stats.totalFeeds,
  };
}

/**
 * Fonction pure : Construire la réponse de refresh - TESTABLE
 */
function buildRefreshResponse(result: { articlesCount: number; feedsCount: number }) {
  return {
    success: true,
    data: {
      message: `${result.articlesCount} articles rechargés depuis ${result.feedsCount} feeds`,
      articlesCount: result.articlesCount,
    },
  };
}