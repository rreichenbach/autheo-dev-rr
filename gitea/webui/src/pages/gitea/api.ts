import { GiteaApiResponse, SearchParams, GiteaRepo, GiteaUser } from './types';

const GITEA_API_URL = 'http://localhost:8082/api/v1';

export const searchRepositories = async (params: SearchParams): Promise<GiteaApiResponse<GiteaRepo>> => {
  const searchParams = new URLSearchParams();
  
  // Always include page and limit
  searchParams.append('page', (params.page || 1).toString());
  searchParams.append('limit', (params.limit || 20).toString());
  
  // Add other search parameters
  if (params.q) searchParams.append('q', params.q);
  if (params.sort) searchParams.append('sort', params.sort);
  if (params.language) searchParams.append('language', params.language);
  if (params.topic) searchParams.append('topic', '1');
  if (params.archived !== undefined) searchParams.append('archived', params.archived ? '1' : '0');
  if (params.fork !== undefined) searchParams.append('fork', params.fork ? '1' : '0');
  if (params.mirror !== undefined) searchParams.append('mirror', params.mirror ? '1' : '0');
  if (params.template !== undefined) searchParams.append('template', params.template ? '1' : '0');
  if (params.private !== undefined) searchParams.append('private', params.private ? '1' : '0');

  try {
    const response = await fetch(`${GITEA_API_URL}/repos/search?${searchParams.toString()}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      ok: true,
      data: {
        items: (data.data || []).map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          owner: {
            name: repo.owner?.login || repo.owner?.username || 'Unknown',
            homeLink: `http://localhost:8082/${repo.owner?.login || repo.owner?.username}`,
            visibility: {
              isPrivate: repo.private
            }
          },
          link: repo.html_url || `http://localhost:8082/${repo.full_name}`,
          description: repo.description || '',
          descriptionHTML: repo.description || '',
          isArchived: repo.archived || false,
          isPrivate: repo.private || false,
          isTemplate: repo.is_template || false,
          objectFormatName: repo.default_branch || 'main',
          primaryLanguage: repo.language ? {
            language: repo.language,
            color: '#4F5D95' // Default color
          } : null,
          numStars: repo.stars_count || repo.stargazers_count || 0,
          numForks: repo.forks_count || 0,
          topics: repo.topics || [],
          updatedUnix: new Date(repo.updated_at).getTime() / 1000
        })),
        total: data.total_count || 0,
      },
    };
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return {
      ok: false,
      data: {
        items: [],
        total: 0,
      },
    };
  }
};

export const searchUsers = async (params: SearchParams): Promise<GiteaApiResponse<GiteaUser>> => {
  const searchParams = new URLSearchParams();
  
  // Always include page and limit
  searchParams.append('page', (params.page || 1).toString());
  searchParams.append('limit', (params.limit || 20).toString());
  
  // Add search parameters
  if (params.q) searchParams.append('q', params.q);
  if (params.sort) searchParams.append('sort', params.sort);

  try {
    const response = await fetch(`${GITEA_API_URL}/users/search?${searchParams.toString()}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      ok: true,
      data: {
        items: (data.data || []).map((user: any) => ({
          id: user.id,
          username: user.login || user.username,
          fullName: user.full_name,
          avatarUrl: user.avatar_url,
          location: user.location,
          email: user.email,
          isPrivate: user.visibility === 'private',
          keepEmailPrivate: user.keep_email_private || false,
          createdUnix: new Date(user.created_at).getTime() / 1000,
          profileUrl: `http://localhost:8082/${user.login || user.username}`,
        })),
        total: data.total_count || 0,
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      ok: false,
      data: {
        items: [],
        total: 0,
      },
    };
  }
};