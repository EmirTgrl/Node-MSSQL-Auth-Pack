"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const hashed = await bcrypt.hash("admin123", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@example.com",
          password: hashed,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", { username: "admin" });
  },
};
