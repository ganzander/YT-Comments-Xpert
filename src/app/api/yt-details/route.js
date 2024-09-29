import axios from "axios";

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export async function POST(req) {
    const { url } = await req.json();
    const videoId = extractVideoId(url);
    const API_KEY = process.env.YT_API_KEY;
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${API_KEY}`;
    const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads`;
    let comments = [];
    let nextPageToken = '';

    try {

        // Fetch Video Details
        const vidResponse = await axios.get(videoUrl);
        const videoData = vidResponse.data.items[0];
        const videoDetails = {
            title: videoData.snippet.title,
            description: videoData.snippet.description,
            publishedAt: videoData.snippet.publishedAt,
            channelTitle: videoData.snippet.channelTitle,
            viewCount: videoData.statistics.viewCount,
            likeCount: videoData.statistics.likeCount,
            commentCount: videoData.statistics.commentCount
        };

        // Fetch Comments
        do {
            const response = await axios.get(commentsUrl, {
                params: {
                    part: 'snippet',
                    videoId: videoId,
                    key: API_KEY,
                    maxResults: 100,
                    pageToken: nextPageToken
                }
            });
            const currentComments = response.data.items.map(item =>
                item.snippet.topLevelComment.snippet.textOriginal
            );
            comments = comments.concat(currentComments);
            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);



        return Response.json({
            Success: true,
            videoDetails,
            comments,
        });

    } catch (error) {
        console.error('Error fetching video details:', error);
    }


}
