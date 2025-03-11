import { nanoid } from "nanoid";
import { Url } from "../models/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// Generate a Short Link
const generateNewShortUrl = asyncHandler(async (req, res) => {
    try {
        const { websiteUrl } = req.body;
        if (!websiteUrl) {
            return res.status(400).json(new ApiError(400, "Website Url Is Required"));
        }
        const shortId = nanoid(8);
        await Url.create({
            shortId,
            redirectUrl: websiteUrl,
        });

        return res.json({ id: shortId, message: "Short Generate Successfully" });
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Generate New Short Url"));
    }
});

// fetching the redirect to website
const getRedirectWebsite = asyncHandler(async (req, res) => {});
export { generateNewShortUrl };
