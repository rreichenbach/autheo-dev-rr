import { 
  GiteaApiResponse, 
  SearchParams, 
  GiteaRepo, 
  GiteaUser, 
  CodeSearchResult,
  CreateRepoParams,
  RepoCreationOptions,
  RepoCreationLimits 
} from './types';

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

export const searchCode = async (params: SearchParams): Promise<GiteaApiResponse<CodeSearchResult>> => {
  const searchParams = new URLSearchParams();
  
  // Always include page and limit
  searchParams.append('page', (params.page || 1).toString());
  searchParams.append('limit', (params.limit || 20).toString());
  
  // Add search parameters
  if (params.q) searchParams.append('q', params.q);
  if (params.language) searchParams.append('language', params.language);
  if (params.fuzzy !== undefined) searchParams.append('fuzzy', params.fuzzy ? '1' : '0');

  try {
    const response = await fetch(`${GITEA_API_URL}/code/search?${searchParams.toString()}`, {
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
        items: (data.data || []).map((result: any) => ({
          repoID: result.repository.id,
          commitID: result.commit_id,
          filename: result.path,
          language: result.language,
          color: result.language_color || '#4F5D95',
          lines: result.lines.map((line: any) => ({
            lineNumber: line.line_number,
            content: line.content,
            highlighted: line.highlighted || false,
          })),
          repo: {
            id: result.repository.id,
            name: result.repository.full_name,
            link: result.repository.html_url,
            isArchived: result.repository.archived,
            isPrivate: result.repository.private,
          },
        })),
        total: data.total_count || 0,
        languages: data.languages?.map((lang: any) => ({
          language: lang.name,
          color: lang.color || '#4F5D95',
          count: lang.count,
        })) || [],
      },
    };
  } catch (error) {
    console.error('Error searching code:', error);
    return {
      ok: false,
      data: {
        items: [],
        total: 0,
        languages: [],
      },
    };
  }
};

export const getRepoCreationOptions = async (): Promise<RepoCreationOptions> => {
  try {
    const response = await fetch(`${GITEA_API_URL}/repos/creation/options`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      gitignores: data.gitignores || [],
      licenses: data.licenses || [],
      readmes: data.readmes || [],
      templates: data.templates || [],
      labelTemplates: data.label_templates || [],
      supportedObjectFormats: data.supported_object_formats || [],
      defaultObjectFormat: data.default_object_format || { name: 'sha1' },
    };
  } catch (error) {
    console.error('Error fetching repo creation options:', error);
    return {
      gitignores: [],
      licenses: [],
      readmes: [],
      templates: [],
      labelTemplates: [],
      supportedObjectFormats: [{ name: 'sha1' }],
      defaultObjectFormat: { name: 'sha1' },
    };
  }
};

export const getRepoCreationLimits = async (): Promise<RepoCreationLimits> => {
  try {
    const response = await fetch(`${GITEA_API_URL}/repos/creation/limits`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      canCreateRepo: data.can_create_repo || false,
      maxCreationLimit: data.max_creation_limit || 0,
      isForcedPrivate: data.is_forced_private || false,
    };
  } catch (error) {
    console.error('Error fetching repo creation limits:', error);
    return {
      canCreateRepo: false,
      maxCreationLimit: 0,
      isForcedPrivate: true,
    };
  }
};

export const createRepository = async (params: CreateRepoParams): Promise<GiteaRepo> => {
  try {
    const response = await fetch(`${GITEA_API_URL}/repos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        owner_id: params.uid,
        name: params.repoName,
        private: params.private,
        description: params.description,
        template: params.repoTemplate,
        git_content: params.gitContent,
        git_hooks: params.gitHooks,
        webhooks: params.webhooks,
        topics: params.topics,
        avatar: params.avatar,
        labels: params.labels,
        protected_branch: params.protectedBranch,
        issue_labels: params.issueLabels,
        gitignores: params.gitignores?.join(','),
        license: params.license,
        readme: params.readme,
        auto_init: params.autoInit,
        default_branch: params.defaultBranch,
        object_format_name: params.objectFormatName,
        is_template: params.isTemplate,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      owner: {
        name: data.owner.login || data.owner.username,
        homeLink: `http://localhost:8082/${data.owner.login || data.owner.username}`,
        visibility: {
          isPrivate: data.private
        }
      },
      link: data.html_url,
      description: data.description || '',
      descriptionHTML: data.description || '',
      isArchived: data.archived || false,
      isPrivate: data.private || false,
      isTemplate: data.is_template || false,
      objectFormatName: data.default_branch || 'main',
      primaryLanguage: null,
      numStars: 0,
      numForks: 0,
      topics: data.topics || [],
      updatedUnix: new Date(data.updated_at).getTime() / 1000,
    };
  } catch (error) {
    console.error('Error creating repository:', error);
    throw error;
  }
};