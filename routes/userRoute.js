const express = require("express");
const {
  creatUser,
  getAllUsers,
  userProfile,
  updateUser,
  deleteUser,
  loginUser,
  whoViewedMyProfile,
  userProfileUpload,
  followingUser,
  unFollowingUser,
} = require("../controllers/userController");

const loggIn = require("../middlware/isLogg");
const storage = require("../config/cloudinaryConfig");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage });
router.post("/register", creatUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/profile/", loggIn, userProfile);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

//........... who Viewed My Profile.............///////
router.get("/profile-viewers/:id", loggIn, whoViewedMyProfile);
// Following User
router.get("/following/:id", loggIn, followingUser);
router.get("/unfollowing/:id", loggIn, unFollowingUser);

// Upload User Profile Route
router.post(
  "/profile-uplaod",
  loggIn,
  upload.single("profile"),
  userProfileUpload
);

module.exports = router;
