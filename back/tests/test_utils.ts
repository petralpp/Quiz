import bcrypt from "bcrypt";

import { UserModel } from "../src/models/userModel";

const testUser = {
  username: "testuser",
  name: "tester",
  password: "Testpassword123"
};

const createTestUser = async () => {
  const passwordHash = await bcrypt.hash(testUser.password, 10);
  const user = new UserModel({
    username: testUser.username,
    name: testUser.name,
    passwordHash: passwordHash
  });
  await user.save();
};

export default { testUser, createTestUser };
