const axios = require("axios");
const natural = require("natural");
const sentiment = require("sentiment");
const sentimentAnalyzer = new sentiment();
const tokenizer = new natural.WordTokenizer();

const isDemanding = (comment) => {
  const demandingWords = ["want", "need", "please", "request", "expect"];
  const tokens = tokenizer.tokenize(comment.toLowerCase());
  return demandingWords.some((word) => tokens.includes(word));
};

const isAbusive = (comment) => {
  const abusiveWords = ["hate", "stupid", "idiot", "dumb", "nonsense"];
  const tokens = tokenizer.tokenize(comment.toLowerCase());
  return abusiveWords.some((word) => tokens.includes(word));
};

function categorizeComments(comments) {
  let categorizedComments = {
    positiveComments: [],
    negativeComments: [],
    abusiveComments: [],
    demandingComments: [],
  };

  comments.forEach((comment) => {
    const analysis = sentimentAnalyzer.analyze(comment);
    const score = analysis.score;

    if (isAbusive(comment)) {
      categorizedComments.abusiveComments.push(comment);
    } else if (isDemanding(comment)) {
      categorizedComments.demandingComments.push(comment);
    } else if (score > 2) {
      categorizedComments.positiveComments.push(comment);
    } else if (score < -2) {
      categorizedComments.negativeComments.push(comment);
    }
  });

  return categorizedComments;
}

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

export async function POST(req) {
  const { url } = await req.json();
  const videoId = extractVideoId(url);
  const API_KEY = process.env.YT_API_KEY;

  try {
    // Fetch Video Details
    const videoDetails = await getVideoDetails(videoId, API_KEY);

    // Fetch Video Comments
    const comments = await getComments(videoId, API_KEY);
    console.log(comments.length);

    // Fetch Sentiment Analysis
    const categorizedComments = categorizeComments(comments);
    const {
      positiveComments,
      negativeComments,
      abusiveComments,
      demandingComments,
    } = categorizedComments;

    return Response.json({
      Success: true,
      videoDetails,
      positiveComments,
      negativeComments,
      abusiveComments,
      demandingComments,
    });
  } catch (error) {
    console.error("Error fetching video details:", error);
    return Response.json({
      Success: false,
      msg: "Failed to fetch data",
    });
  }
}
