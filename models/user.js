"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      const v = { ...this.get() };
      delete v.password;
      delete v.resetPasswordToken;
      return v;
    }
    async validPassword(plain) {
      return bcrypt.compare(plain, this.password);
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [3, 30],
            msg: "Username must be between 3 and 30 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Must be a valid email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isStrong(value) {
            if (
              !value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
            ) {
              throw new Error(
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
              );
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        validate: {
          isIn: {
            args: [["user", "admin"]],
            msg: "Role must be either 'user' or 'admin'",
          },
        },
      },
      resetPasswordToken: { type: DataTypes.STRING, allowNull: true },
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
