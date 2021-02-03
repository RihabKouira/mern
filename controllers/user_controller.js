const UserModel = require("../models/user_model");
const ObjectID = require("mongoose").Types.ObjectId;

// module.exports.getAllUsers = (req, res) => {
//   UserModel.find()
//     .select("-password")
//     .exec((err, data) => {
//       if (err) throw err;
//       else res.send(data);
//     });
// };

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

/* GET by Id */
module.exports.userInfo = (req, res) => {
  // check the id we have passed in parameter 
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, data) => {
    if (err) console.log("ID unknown : " + err);
    else res.send(data);
  }).select("-password");
};

/* UPDATE user by id */
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
   await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { bio: req.body.bio } },
    //   { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (err) return res.status(500).send({ message: err });
        else res.send(data);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Delete User by id
module.exports.deleteUser = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    try {
      UserModel.findByIdAndDelete(
        { _id: req.params.id },
        (err, data) => {
          if (err) return res.status(500).send({ message: err });
          else     res.status(200).json({ message: "Successfully deleted. " });

        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

  //follow
  module.exports.follow = (req, res) => {
    if (!ObjectID.isValid(req.params.id)||
    !ObjectID.isValid(req.body.idToFollow))
      return res.status(400).send("ID unknown : " + req.params.id);
    try {
        //add to the following List
      UserModel.findByIdAndUpdate(
         req.params.id ,
        { $addToSet: { following: req.body.idToFollow } },
        { new: true, upsert: true },
        (err, data) => {
          if (err) return res.status(500).send({ message: err });
        //   else  res.status(200).json(data);

        }
      );
      //add to the follower list
      UserModel.findByIdAndUpdate(
         req.body.idToFollow ,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, data) => {
          if (err) return res.status(500).send({ message: err });
          else  res.status(200).json(data);

        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

  //unfollow
  module.exports.unfollow = (req, res) => {
    if (!ObjectID.isValid(req.params.id)||
    !ObjectID.isValid(req.body.idToUnFollow))
      return res.status(400).send("ID unknown : " + req.params.id);
    try {
        //add to the following List
      UserModel.findByIdAndUpdate(
         req.params.id ,
        { $pull: { following: req.body.idToUnFollow } },
        { new: true, upsert: true },
        (err, data) => {
          if (err) return res.status(500).send({ message: err });
        //   else  res.status(200).json(data);

        }
      );
      //add to the follower list
      UserModel.findByIdAndUpdate(
         req.body.idToUnFollow ,
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, data) => {
          if (err) return res.status(500).send({ message: err });
          else  res.status(200).json(data);

        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };