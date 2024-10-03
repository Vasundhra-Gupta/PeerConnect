import validator from "validator";
import { OK, BAD_REQUEST, SERVER_ERROR } from "../constants/errorCodes.js";
import getServiceObject from "../db/serviceObjects.js";
import { postObject } from "./postController.js";
import { commentObject } from "./commentController.js";
import { noteObject } from "./noteController.js";

export const likeObject = getServiceObject("likes");

const getLikedPosts = async (req, res) => {
    try {
        const { user_id } = req.user;
        const { orderBy = "desc", limit = 10 } = req.query;
        if (!user_id) {
            return res.status(BAD_REQUEST).json({ message: "MISSING_USERID" });
        }

        const likedPosts = await likeObject.getLikedPosts(user_id, orderBy, limit);
        return res.status(OK).json(likedPosts);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: "something went wrong while getting liked posts.",
            error: err.message,
        });
    }
};

const togglePostLike = async (req, res) => {
    try {
        const { user_id } = req.user;
        const { postId } = req.params;
        let { likedStatus } = req.query;
        likedStatus = likedStatus === "true" ? 1 : 0;

        if (!postId || !validator.isUUID(postId)) {
            return res.status(BAD_REQUEST).json({ message: "MISSING_OR_INVALID_POSTID" });
        }
        if (!user_id) {
            return res.status(BAD_REQUEST).json({ message: "MISSING_USERID" });
        }

        const post = await postObject.getPost(postId, user_id);
        if (post?.message) {
            return res.status(BAD_REQUEST).json(post);
        }

        const response = await likeObject.togglePostLike(postId, user_id, likedStatus);
        return res.status(OK).json(response);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: "something went wrong while toggling post like.",
            error: err.message,
        });
    }
};

const toggleCommentLike = async (req, res) => {
    try {
        const { user_id } = req.user;
        const { commentId } = req.params;
        let { likedStatus } = req.query;
        likedStatus = likedStatus === "true" ? 1 : 0;

        if (!commentId || !validator.isUUID(commentId)) {
            return res.status(BAD_REQUEST).json({ message: "MISSING_OR_INVALID_COMMENTID" });
        }
        if (!user_id) {
            return res.status(BAD_REQUEST).json({ message: "MISSING_USERID" });
        }

        const comment = await commentObject.getComment(commentId);
        if (comment?.message) {
            return res.status(BAD_REQUEST).json(comment);
        }

        const response = await likeObject.toggleCommentLike(commentId, user_id, likedStatus);
        return res.status(OK).json(response);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: "something went wrong while toggling comment like.",
            error: err.message,
        });
    }
};

const toggleNoteVote = async (req, res) => {
    try {
        const { user_id } = req.user;
        const { noteId } = req.params;
        let { voteStatus } = req.query;
        voteStatus = voteStatus === "true" ? 1 : 0;

        if (!noteId || !validator.isUUID(noteId)) {
            return res.status(BAD_REQUEST).json({ message: "MISSING_OR_INVALID_NOTEID" });
        }
        if (!user_id) {
            return res.status(BAD_REQUEST).json({ message: "MISSING_USERID" });
        }

        const note = await noteObject.getNote(noteId);
        if (note?.message) {
            return res.status(BAD_REQUEST).json(note);
        }

        const response = await likeObject.toggleNoteVote(noteId, user_id, voteStatus);
        return res.status(OK).json(response);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: "something went wrong while toggling note vote.",
            error: err.message,
        });
    }
};

export { getLikedPosts, togglePostLike, toggleCommentLike, toggleNoteVote };
