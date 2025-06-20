import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    
    let shortUrl
    if(req.user) {
      shortUrl = await createShortUrlWithUser(data.url,req.user._id, data.customUrl);
    }else{
      shortUrl = await createShortUrlWithoutUser(data.url);
    }
    res.status(201).json({shortUrl :process.env.APP_URL + shortUrl});
  } catch (err) {
    next(err);
  }
};



export const createCustomShortUrl = wrapAsync(async (req, res, next) => {
  try {
    const { url, customUrl } = req.body;
    const shortUrl = await createShortUrlWithUser(url, req.user._id, customUrl);
    res.status(201).json({ shortUrl: process.env.APP_URL + shortUrl });
  } catch (err) {
    next(err);
  }
});

export const redirectFromShortUrl = async (req, res) => {
  const shorturl = req.params.shorturl;
  const url = await getShortUrl(shorturl);
  if (!url) throw new NotFoundError("Url not found");
  url.clicks += 1;
  await url.save();
  res.redirect(url.fullUrl);
};
