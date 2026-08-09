const express = require("express");
const router = express();
const {
  getAllBooks,
  getBooksById,
  createBooks,
  updateBooks,
  deleteBooks,
} = require("../controller/bookController");
const upload = require("../config/upload");
const {
  getAllCategories,
  createCategories,
  getCategoriesById,
  updateCategories,
  deleteCategories,
} = require("../controller/categoryController");

const {
  getAllAuthor,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controller/authorController");

const { getAllUserData, deleteUser } = require("../controller/userController");

const { login, logout } = require("../controller/authController");

router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    message: "Bookstore App Backend",
  });
});

// routes user
router.get("/api/admin/getAllUsersData", getAllUserData);
router.delete("/api/admin/deleteUser", deleteUser);

// routes books
router.get("/api/admin/getAllBooks", getAllBooks);
router.get("/api/admin/getBookById/:id", getBooksById);
router.post("/api/admin/createBooks", upload.single("cover"), createBooks);
router.put("/api/admin/updateBook/:id", upload.single("cover"), updateBooks);
router.delete("/api/admin/deleteBooks", deleteBooks);

// routes category
router.get("/api/admin/getAllCategories", getAllCategories);
router.get("/api/admin/getCategoriesById/:id", getCategoriesById);
router.post("/api/admin/createCategories", createCategories);
router.put("/api/admin/updateCategories/:id", updateCategories);
router.delete("/api/admin/deleteCategories/:id", deleteCategories);

// routes author
router.get("/api/admin/getAllAuthor", getAllAuthor);
router.get("/api/admin/getAuthorById/:id", getAuthorById);
router.post("/api/admin/createAuthor", createAuthor);
router.put("/api/admin/updateAuthor/:id", updateAuthor);
router.delete("/api/admin/deleteAuthor/:id", deleteAuthor);

module.exports = router;
