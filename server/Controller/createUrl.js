const path = require('path');
const fsPromises = require('fs').promises;
const { nanoid } = require('nanoid');
const Url = require('../model/uri');
async function generateUniqueUrl() {
    let url;
    let exist = true;
    while (exist) {
        url = nanoid(6);
        const duplicate = await Url.findOne({ shortUrl: url });
        if (!duplicate) exist = false;
    }
    return url;
};
const createUrl = async (req, res) => {
    const orgUrl = req.body.orgUrl;
    const customUrl = req.body.customUrl;
    if (!orgUrl) {
        return res.status(400).json({
            message: "Original URL is required"
        });
    }
    try {
        new URL(orgUrl);
    } catch (err) {
        return res.status(400).json({
            message: "Invalid URL"
        });
    }
    let shortUrl;
    if (!customUrl) {
        shortUrl = await generateUniqueUrl();
    } else {
        const chk = /^[a-zA-Z0-9_-]{3,20}$/;
        if (!chk.test(customUrl)) {
            return res.status(400).json({
                message: "Custom URL must be 3-20 characters and contain only letters, numbers, '-' or '_'"
            });
        }
        const duplicate = await Url.findOne({ shortUrl: customUrl });
        if (duplicate) {
            return res.status(409).json({ "message": "Url Already Taken" });
        } else {
            shortUrl = customUrl;
        }
    }
    try {
        await Url.create({
            "shortUrl": shortUrl,
            "orgUrl": orgUrl,
            "createdAt": new Date().toISOString(),
            "clicks": 0
        });
        res.status(201).json({
            "message": `New Url created ${shortUrl}`,
            "orgUrl": orgUrl,
            "shortUrl": `http://localhost:3500/${shortUrl}`,
        });
    } catch (err) {
        res.status(500).json({ "message": err.message })
        console.log(err.message);
    }
}
module.exports = createUrl;