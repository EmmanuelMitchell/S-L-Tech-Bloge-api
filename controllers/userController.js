const User = require("../models/User/userModel");
const generateToken = require("../utils/generateToken");
const appError = require("../utils/appError");
const bcrypt = require("bcrypt");

const creatUser = async (req, res, next) => {
  const { firstName, lastName, password, email, profilePhoto } = req.body;
  try {
    // Check if email already exist
    const userFound = await User.findOne({ email }); //7
    if (userFound) {
      return next(appError("User Alrady exist"));
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    res.status(201).json({ status: "Success", data: user });
  } catch (error) {
    next(new Error(error.message));
    // return console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user have not been login
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res
        .status(404)
        .json({ status: "failed", msg: "wrong Credentail" });
    }
    // compare and match the password if it's correct
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return res
        .status(404)
        .json({ status: "failed", msg: "wrong Credentail" });
    }
    res.status(200).json({
      status: "Success",
      data: {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    return console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ status: "failed", msg: "User Note found" });
    }
    res
      .status(200)
      .json({ status: "success", totalUsers: users.length, data: users });
  } catch (error) {
    return console.log(error);
  }
};

const userProfile = async (req, res) => {
  // console.log(req.userAuth);
  // const { id } = req.params;
  // const token = getTokenFormHeaders(req);
  // const headerObj = req.headers;
  // const token = headerObj["authorization"].split(" ")[1];
  // console.log(token);
  try {
    const user = await User.findById(req.userAuth);
    res.status(200).json({ status: "Success", data: user });
  } catch (error) {
    return console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    res.status(200).json({ status: "Success", data: "Update User" });
  } catch (error) {
    return console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    res.status(200).json({ status: "Success", data: "Get Single user" });
  } catch (error) {
    return console.log(error);
  }
};

// Following user
const followingUser = async (req, res, next) => {
  try {
    // 1: Find the user to userTofollow
    const userTofollow = await User.findById(req.params.id);
    // 2: find the user whoFollowing
    const userWhoFollow = await User.findById(req.userAuth);
    // 3: check if the userfollow and the Whofollowuser
    if (userTofollow && userWhoFollow) {
      // 4: check if the whoFollow user is the userFollow Array
      const isAlreadyFollow = userTofollow.followers.find(
        (follower) => follower.toString() === userWhoFollow.toString()
      );
      if (isAlreadyFollow) {
        next(appError("you have already followed this user"));
      } else {
        // 5: push the userFollow and Whofollow user
        userTofollow.followers.push(userWhoFollow._id);
        userWhoFollow.following.push(userTofollow._id);
        // 6: Save the userFollow and the whoFollow user
        await userTofollow.save();
        await userWhoFollow.save();
        res.status(200).json({
          status: "Success",
          data: "You have Successfully following this user ",
        });
      }
    }
  } catch (error) {
    return console.log(error);
  }
};

// UnFollowing User
const unFollowingUser = async (req, res, next) => {
  try {
    // Find the User to unfollow
    const userToBeUnFollow = await User.findById(req.params.id);
    // find the Who unFollow
    const userWhoUnFollow = await User.findById(req.userAuth);
    // Check if the userToBeUnFollow and  userWhoUnFollow are found
    if (userToBeUnFollow && userWhoUnFollow) {
      // Check if userWhoUnfollow already exist
      const unfollowAlreadyExist = userToBeUnFollow.followers.find(
        (follow) => follow.toString() === userWhoUnFollow.toString()
      );
      if (!unfollowAlreadyExist) {
        next(appError("you have not yet follow this user"));
      } else {
        // Remove userToBeUnFollow form the user's follower's array
        userToBeUnFollow.followers = userToBeUnFollow.followers.filter(
          (follower) => follower.toString() !== userWhoUnFollow._id.toString()
          // Save userToBeUnFollow
        );
        await userToBeUnFollowed.save();

        //
        // Remove userToBeUnFollow form the user's follower's array
        userWhoUnFollow.followers = userWhoUnFollow.followers.filter(
          (follower) => follower.toString() !== userToBeUnFollow._id.toString()
          // Save userToBeUnFollow
        );
        await userWhoUnFollow.save();
        res
          .status(200)
          .json({
            status: "Success",
            data: "You have Success unFollow this  user",
          });
      }
    }
  } catch (error) {
    return console.log(error);
  }
};

// View user Profile
const whoViewedMyProfile = async (req, res, next) => {
  try {
    // 1: Find who the original user
    const user = await User.findById(req.params.id);
    // 2: find the use Who viewed the original user
    const userWhoViewed = await User.findById(req.userAuth);
    // 3: Check if original  and who viewed user are found
    if (user && userWhoViewed) {
      //4:  check if the userWhoViewed have already viewed the original user
      const userAlreadyViewed = await user.viwers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toJSON()
      );
      if (userAlreadyViewed) {
        next(appError("user have already viewed this profile "));
      } else {
        // Push the userWhoViewed the original user in the array
        user.viwers.push(userWhoViewed._id);
        // Save the user
        await user.save();
      }
    }

    res.status(200).json({
      status: "Success",
      data: "You have successfully viewed this profile",
    });
  } catch (error) {
    return console.log(error);
  }
};

//..............  Upload user profile......................//
const userProfileUpload = async (req, res, next) => {
  console.log(req.file);
  try {
    // Find the user to be updated
    const userToUpdate = await User.findById(req.userAuth);
    // check if user is found
    if (!userToUpdate) {
      next(appError("user not found"));
    }
    // check if the user is block
    if (userToUpdate.isBlock) {
      next(appError("action not allowed user is block"));
    }
    //check if the user is updating their profile
    if (req.file) {
      // update profile photo
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );
    }
    res.status(200).json({
      status: "Success",
      data: "you have Successfully uploaded your profile photo",
    });
  } catch (error) {
    next(appError(error.message, 500));
  }
};
module.exports = {
  creatUser,
  loginUser,
  getAllUsers,
  userProfile,
  updateUser,
  deleteUser,
  userProfileUpload,
  whoViewedMyProfile,
  followingUser,
  unFollowingUser,
};
