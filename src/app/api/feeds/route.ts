import { NextRequest, NextResponse } from 'next/server';
import { FeedService } from '@/Services/FeedService';
import { FeedModel } from '@/Models/FeedModel';
import { IApiResponse } from '@/Types/Common';

/**
 * GET /api/feeds - Get all RSS feeds
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';
    
    const feedService = new FeedService();
    const feeds = includeInactive ? feedService.getFeeds() : feedService.getActiveFeeds();
    
    // Transform feeds for API response
    const apiFeeds = feeds.map(feed => FeedModel.toApiFormat(feed));
    
    // Get feed statuses
    const feedStatuses = feedService.getFeedStatuses();
    
    // Get cache stats
    const cacheStats = feedService.getCacheStats();

    const response: IApiResponse<{
      feeds: typeof apiFeeds;
      stats: {
        total: number;
        active: number;
        inactive: number;
        needingUpdate: number;
      };
      cacheStats: typeof cacheStats;
      statuses: typeof feedStatuses;
    }> = {
      success: true,
      data: {
        feeds: apiFeeds,
        stats: {
          total: feeds.length,
          active: feeds.filter(f => f.isActive).length,
          inactive: feeds.filter(f => !f.isActive).length,
          needingUpdate: feedService.getFeedsNeedingUpdate().length,
        },
        cacheStats,
        statuses: feedStatuses,
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching feeds:', error);
    
    const errorResponse: IApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      message: 'Failed to fetch feeds',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * POST /api/feeds - Add new RSS feed
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.url || !body.category) {
      const errorResponse: IApiResponse<null> = {
        success: false,
        error: 'Missing required fields: name, url, category',
        message: 'Invalid feed data',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const feedService = new FeedService();
    
    // Add the feed
    const result = await feedService.addFeed({
      name: body.name,
      url: body.url,
      category: body.category,
      description: body.description,
      isActive: body.isActive !== undefined ? body.isActive : true,
      fetchInterval: body.fetchInterval || 60,
      tags: body.tags || [],
    });

    if (!result.success) {
      const errorResponse: IApiResponse<null> = {
        success: false,
        error: result.error,
        message: 'Failed to add feed',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const response: IApiResponse<{ feed: ReturnType<typeof FeedModel.toApiFormat> }> = {
      success: true,
      data: {
        feed: FeedModel.toApiFormat(result.feed!),
      },
      message: 'Feed added successfully',
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Error adding feed:', error);
    
    const errorResponse: IApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      message: 'Failed to add feed',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * PUT /api/feeds - Update feed
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      const errorResponse: IApiResponse<null> = {
        success: false,
        error: 'Feed ID is required',
        message: 'Invalid request',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const feedService = new FeedService();
    
    const result = feedService.updateFeed(body.id, {
      name: body.name,
      url: body.url,
      category: body.category,
      description: body.description,
      isActive: body.isActive,
      fetchInterval: body.fetchInterval,
      tags: body.tags,
    });

    if (!result.success) {
      const errorResponse: IApiResponse<null> = {
        success: false,
        error: result.error,
        message: 'Failed to update feed',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const response: IApiResponse<{ feed: ReturnType<typeof FeedModel.toApiFormat> }> = {
      success: true,
      data: {
        feed: FeedModel.toApiFormat(result.feed!),
      },
      message: 'Feed updated successfully',
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error updating feed:', error);
    
    const errorResponse: IApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      message: 'Failed to update feed',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * DELETE /api/feeds - Remove feed
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const feedId = searchParams.get('id');
    
    if (!feedId) {
      const errorResponse: IApiResponse<null> = {
        success: false,
        error: 'Feed ID is required',
        message: 'Invalid request',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const feedService = new FeedService();
    
    const result = feedService.removeFeed(feedId);

    if (!result.success) {
      const errorResponse: IApiResponse<null> = {
        success: false,
        error: result.error,
        message: 'Failed to remove feed',
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const response: IApiResponse<{ removed: boolean }> = {
      success: true,
      data: { removed: true },
      message: 'Feed removed successfully',
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error removing feed:', error);
    
    const errorResponse: IApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      message: 'Failed to remove feed',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}