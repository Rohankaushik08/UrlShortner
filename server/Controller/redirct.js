const path = require('path');
const fsPromises = require('fs').promises;
const Url = require('../model/uri');
const redirect = async (req,res)=>{
    const shortUrl = req.params.shortUrl;
    if(!shortUrl){
        return res.status(400).json({
            message: "Short URL is required"
        });
    }
    const RedUrl = await Url.findOne({shortUrl:shortUrl});
    // RedUrl Redirected karna hai joo
    if(!RedUrl){
        return res.status(404).json({
            message: "404 Not Found"
        });
    }
    RedUrl.clicks +=1;
    await RedUrl.save(); 
    res.redirect(RedUrl.orgUrl);
}
module.exports = redirect;