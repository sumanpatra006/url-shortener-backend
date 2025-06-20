import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shorturl, longurl, userid) => {
  try {
    const newUrl = new urlSchema({
      fullUrl: longurl,
      shortUrl: shorturl,
    });
    if(userid) newUrl.user = userid
    await newUrl.save();
    return shorturl;
  } catch (err) {
    if(err.code == 11000) throw new ConflictError("Url already exists");
    throw new Error(err);
  }
};

export const getShortUrl = async (shorturl) => {
  const url = await urlSchema.findOne({ shortUrl: shorturl });
  return url;
};

export const checkCustomShortUrl = async (customShortUrl) => {
  return await urlSchema.findOne({ shortUrl: customShortUrl });
};
