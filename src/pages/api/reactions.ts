import type { APIRoute } from 'astro';

const GITHUB_TOKEN = import.meta.env.GH_TOKEN;
const GITHUB_OWNER = 'zerodumb'; // Replace with your GitHub username
const GITHUB_REPO = 'ethics-journal'; // Replace with your repository name

export const POST: APIRoute = async ({ request }) => {
  try {
    const { postId, reaction, previousReaction } = await request.json();

    // Create or update issue for this post
    const issueTitle = `Reactions for post: ${postId}`;
    const issueBody = JSON.stringify({
      postId,
      reactions: {
        [reaction]: 1,
        [previousReaction]: -1
      }
    });

    // First, try to find existing issue
    const searchResponse = await fetch(
      `https://api.github.com/search/issues?q=repo:${GITHUB_OWNER}/${GITHUB_REPO}+is:issue+title:"${issueTitle}"`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    const searchData = await searchResponse.json();
    let issueNumber;

    if (searchData.items.length > 0) {
      // Update existing issue
      issueNumber = searchData.items[0].number;
      await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            body: issueBody
          })
        }
      );
    } else {
      // Create new issue
      const createResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: issueTitle,
            body: issueBody
          })
        }
      );
      const createData = await createResponse.json();
      issueNumber = createData.number;
    }

    return new Response(JSON.stringify({ success: true, issueNumber }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error handling reaction:', error);
    return new Response(JSON.stringify({ error: 'Failed to store reaction' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 