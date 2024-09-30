const axios = require("axios");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

function extractVideoId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function getVideoDetails(videoId, API_KEY) {
  const videoUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${API_KEY}`;
  const vidResponse = await axios.get(videoUrl);
  const videoData = vidResponse.data.items[0];

  const videoDetails = {
    title: videoData.snippet.title.split("|")[0].trim(),
    description: videoData.snippet.description,
    thumbnail: videoData.snippet.thumbnails.standard.url,
    channelTitle: videoData.snippet.channelTitle,
    viewCount: videoData.statistics.viewCount,
    likeCount: videoData.statistics.likeCount,
    commentCount: videoData.statistics.commentCount,
  };
  return videoDetails;
}

async function getComments(videoId, API_KEY) {
  let comments = [];
  let nextPageToken = "";
  const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads`;
  do {
    const response = await axios.get(commentsUrl, {
      params: {
        part: "snippet",
        videoId: videoId,
        key: API_KEY,
        maxResults: 100,
        pageToken: nextPageToken,
      },
    });
    const currentComments = response.data.items.map(
      (item) => item.snippet.topLevelComment.snippet.textOriginal
    );
    comments = comments.concat(currentComments);
    nextPageToken = response.data.nextPageToken;
  } while (nextPageToken);
  return comments;
}

function categorizeComments(comments) {
  let negativeComments = [];
  let positiveComments = [];
  comments.forEach((comment) => {
    const analysis = sentiment.analyze(comment);
    const score = analysis.score;
    if (score < -2) {
      negativeComments.push({ comment, score }); // Negative Comments
    } else if (score > 2) {
      positiveComments.push({ comment, score }); // Positive Comments
    }
  });
  return { negativeComments, positiveComments };
}

export async function POST(req) {
  const { url } = await req.json();
  const videoId = extractVideoId(url);
  const API_KEY = process.env.YT_API_KEY;

  try {
    // Fetch Video Details
    const videoDetails = await getVideoDetails(videoId, API_KEY);

    // Fetch Video Comments
    const comments = await getComments(videoId, API_KEY);

    // Fetch Sentiment Analysis
    const { negativeComments, positiveComments } = categorizeComments(comments);

    return Response.json({
      Success: true,
      videoDetails,
      comments,
      negativeComments,
      positiveComments,
    });
  } catch (error) {
    console.error("Error fetching video details:", error);
    return Response.json({
      Success: false,
      msg: "Failed to fetch data",
    });
  }
}
