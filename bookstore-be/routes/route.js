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

const {
  getAllPublisher,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
} = require("../controller/publisherController");

const { getAllUserData, deleteUser } = require("../controller/userController");

const { login, logout, register } = require("../controller/authController");
const {
  getBookData,
  detailsBook,
} = require("../controller/customerController");

router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    message: "Bookstore App Backend",
  });
});

// routes login and register
router.post("/api/login", login);
router.post("/api/register", register);

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

// routes publisher
router.get("/api/admin/getAllPublisher", getAllPublisher);
router.get("/api/admin/getPublisherById/:id", getPublisherById);
router.post("/api/admin/createPublisher", createPublisher);
router.put("/api/admin/updatePublisher/:id", updatePublisher);
router.delete("/api/admin/deletePublisher/:id", deletePublisher);

// routes customers
router.get("/api/customers/getBooksData", getBookData);
router.get("/api/customers/detailBook/:id", detailsBook);

module.exports = router;
