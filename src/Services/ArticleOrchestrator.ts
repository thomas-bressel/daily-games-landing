import { IArticle } from '@/Types/Article';

/**
 * Service pour filtrer les articles - UNE seule responsabilité
 */
export class ArticleFilterService {
  static filterBySource(articles: IArticle[], source?: string): IArticle[] {
    if (!source) return articles;
    
    return articles.filter(article =>
      article.source.toLowerCase().includes(source.toLowerCase())
    );
  }
}

/**
 * Service pour trier les articles - UNE seule responsabilité  
 */
export class ArticleSortService {
  static sortByDateDesc(articles: IArticle[]): IArticle[] {
    return [...articles].sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }
}

/**
 * Service pour paginer - UNE seule responsabilité
 */
export class PaginationService {
  static paginate<T>(
    items: T[], 
    page: number, 
    limit: number
  ): {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  } {
    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedItems = items.slice(start, start + limit);

    return {
      items: paginatedItems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }
}

/**
 * Service pour transformer en JSON API - UNE seule responsabilité
 */
export class ArticleTransformService {
  static toApiFormat(article: IArticle) {
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      link: article.link,
      publishedAt: article.publishedAt.toISOString(),
      source: article.source,
      category: article.category,
      tags: article.tags,
      imageUrl: article.imageUrl,
    };
  }
}

/**
 * Service orchestrateur - Combine les services
 */
export class ArticleOrchestrator {
  static processArticles(
    articles: IArticle[],
    source: string | undefined,
    page: number,
    limit: number
  ) {
    // Pipeline de traitement
    const filtered = ArticleFilterService.filterBySource(articles, source);
    const sorted = ArticleSortService.sortByDateDesc(filtered);
    const paginated = PaginationService.paginate(sorted, page, limit);
    
    return {
      articles: paginated.items.map(ArticleTransformService.toApiFormat),
      pagination: paginated.pagination,
    };
  }
}