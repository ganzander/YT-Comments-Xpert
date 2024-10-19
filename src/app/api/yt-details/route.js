const axios = require("axios");
const natural = require("natural");
const sentiment = require("sentiment");
const sentimentAnalyzer = new sentiment();
const tokenizer = new natural.WordTokenizer();

function categorizeComments(comments) {
  const categories = {
    positive: [],
    negative: [],
    abusive: [],
    demanding: [],
  };
  const demandingWords = ["want", "need", "please", "request", "expect"];
  const abusiveWords = ["hate", "stupid", "idiot", "dumb", "nonsense"];

  comments.forEach((comment) => {
    const analysis = sentimentAnalyzer.analyze(comment.text);
    const score = analysis.score;
    const tokens = tokenizer.tokenize(comment.text.toLowerCase());

    if (abusiveWords.some((word) => tokens.includes(word))) {
      categories.abusive.push(comment);
    } else if (demandingWords.some((word) => tokens.includes(word))) {
      categories.demanding.push(comment);
    } else if (score > 2) {
      categories.positive.push(comment);
    } else if (score < -2) {
      categories.negative.push(comment);
    }
  });
  return categories;
}

function extractVideoId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
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
    const currentComments = response.data.items.map((item) => ({
      author: item.snippet.topLevelComment.snippet.authorDisplayName,
      text: item.snippet.topLevelComment.snippet.textOriginal,
    }));
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

    // Fetch Sentiment Analysis
    const categorizedComments = categorizeComments(comments);
    const { positive, negative, abusive, demanding } = categorizedComments;

    return Response.json({
      Success: true,
      videoDetails,
      positiveComments: positive,
      negativeComments: negative,
      abusiveComments: abusive,
      demandingComments: demanding,
    });
  } catch (error) {
    console.error("Error fetching video details:", error);
    return Response.json({
      Success: false,
      msg: "Failed to fetch data",
    });
  }
}
