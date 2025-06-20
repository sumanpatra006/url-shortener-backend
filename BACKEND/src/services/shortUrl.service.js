import { generateNanoId } from "../utils/helper.js";
import { checkCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUser = async(url)=>{
  const shorturl = generateNanoId(7);
  if(!shorturl) throw new Error("Url not generated");
  await saveShortUrl(shorturl,url)
  return shorturl
}

export const createShortUrlWithUser = async(url,userid, customUrl=null)=>{
  const shorturl = customUrl || generateNanoId(7);
  if(!shorturl) throw new Error("Url not generated");
  const exists = await checkCustomShortUrl(customUrl);
  if(exists) throw new Error("Url already exists");
  await saveShortUrl(shorturl,url,userid)
  return shorturl
}