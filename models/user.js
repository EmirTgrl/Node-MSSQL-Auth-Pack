"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      const v = { ...this.get() };
      delete v.password;
      return v;
    }
    async validPassword(plain) {
      return bcrypt.compare(plain, this.password);
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
    },
    { sequelize, modelName: "User" }
  );

  User.addHook("beforeCreate", async (user) => {
    if (user.password) user.password = await bcrypt.hash(user.password, 10);
  });
  User.addHook("beforeUpdate", async (user) => {
    if (user.changed("password"))
      user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
