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
    if (!err) res.send(data);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

/* UPDATE user by id */
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) return res.send(data);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Delete User by id
// module.exports.deleteUser = async (req, res) => {
//     if (!ObjectID.isValid(req.params.id))
//       return res.status(400).send("ID unknown : " + req.params.id);
//     try {
//       await UserModel.findByIdAndDelete(
//         { _id: req.params.id },
//         (err, data) => {
//           if (err) return res.status(500).send({ message: err });
//           else     res.status(200).json({ message: "Successfully deleted. " });

//         }
//       );
//     } catch (err) {
//       return res.status(500).json({ message: err });
//     }
//   };
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
//follow
module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    //add to the following List
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).jsos(err);
      }
    );
    //add to the follower list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, data) => {
        // if (!err) res.status(201).json(data);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//unfollow
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      { new: true, upsert: true },
      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).jsos(err);
      }
    );
    // remove to following list
    UserModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, data) => {
        // if (!err) res.status(201).json(data);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
