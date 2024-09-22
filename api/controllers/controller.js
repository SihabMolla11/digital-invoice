import schema from "../schema/schema.js";

export const registerUser = async (req, res) => {
  try {
    const user_data = req.body;

    const user = await schema?.Store?.findOne({ email: user_data?.email });
    const new_user = await schema?.Store(user_data);

    res.send(new_user);
  } catch (error) {
    console.log(error?.message);
  }
};
