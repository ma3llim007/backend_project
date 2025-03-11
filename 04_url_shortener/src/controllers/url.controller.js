import { nanoid } from "nanoid";
import { Url } from "../models/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Generate a Short Link
const generateNewShortUrl = asyncHandler(async (req, res) => {
    try {
        const { websiteUrl } = req.body;
        if (!websiteUrl) {
            return res.status(400).json(new ApiError(400, "Website Url Is Required"));
        }

        const existedWesbsite = await Url.findOne({ redirectUrl: websiteUrl });
        if (existedWesbsite) {
            return res.status(409).json(new ApiResponse(409, { website_short_link: existedWesbsite.shortId }, "Website Site Link Is Already Existed"));
        }

        const shortId = nanoid(8);
        const newUrl = await Url.create({
            shortId,
            redirectUrl: websiteUrl,
        });

        return res.status(200).json(new ApiResponse(200, { shortId: newUrl.shortId }, "Short Generate Successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Generate New Short Url"));
    }
});

// fetching the redirect to website
const getRedirectWebsite = asyncHandler(async (req, res) => {
    const { shortID } = req.params;
    if (!shortID) {
        return res.status(400).json(new ApiError(400, "Short Website Url Is Required"));
    }

    const urlData = await Url.findOneAndUpdate({ shortId: shortID }, { $push: { visitedHistory: { timestamp: Date.now() } } }, { new: true });
    if (!urlData) {
        return res.status(404).json(new ApiError(404, "Short Link Not Found"));
    }

    return res.redirect(urlData.redirectUrl);
});

const analytics = asyncHandler(async (req, res) => {
    const { shortID } = req.params;
    if (!shortID) {
        return res.status(400).json(new ApiError(400, "Short Website Url Is Required"));
    }

    const result = await Url.findOne({ shortId: shortID });
    if (!result) {
        return res.status(404).json(new ApiError(404, "Short link Not Found"));
    }

    return res.status(200).json({ id: { totalClicks: result?.visitedHistory?.length, analytics: result?.visitedHistory }, message: "Analytics Fetched Successfully" });
});

export { generateNewShortUrl, getRedirectWebsite, analytics };
