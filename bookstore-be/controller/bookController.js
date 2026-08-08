const prisma = require("../lib/prisma");

exports.getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [books, totalData] = await Promise.all([
      prisma.book.findMany({
        skip: skip,
        take: limit,
        include: {
          category: true,
        },
      }),
      prisma.book.count(),
    ]);

    return res.status(200).json({
      statusCode: 200,
      data: books,
      meta: {
        total: totalData,
        page: page,
        last_page: Math.ceil(totalData / limit),
        per_page: limit,
      },
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.getBooksById = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);

    if (!bookId) {
      return res.status(401).json({
        statusCode: 401,
        message: `The data with ${bookId} is not found!`,
      });
    }

    return res.status(201).json({
      statusCode: 201,
      data: bookId,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(404).json({
      statusCode: 404,
      message: "Error, cannot fetch the data with that ID!",
    });
  }
};

exports.createBooks = async (req, res) => {
  try {
    const { title, author, price, categoryId } = req.body;
    const parsedPrice = parseInt(price);
    const cover = req.file ? req.file.filename : null;

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        price: parsedPrice,
        cover,
        category: {
          connect: { id: parseInt(categoryId) },
        },
      },
      include: {
        category: true,
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Book created successfully!",
      data: newBook,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(404).json({
      statusCode: 404,
      message: "Eror, cannot adding new data!",
    });
  }
};

exports.updateBooks = async (req, res) => {
  try {
    const parsedBookId = parseInt(req.params.id);
    const { title, author, price, categoryId } = req.body;

    const checkBook = await prisma.book.findUnique({
      where: { id: parsedBookId },
    });

    if (!checkBook) {
      return res.status(404).json({
        statusCode: 404,
        message: `The data with ID ${parsedBookId} is not found!`,
      });
    }

    const updateData = {
      title,
      author,
      price: price ? parseInt(price) : undefined,
      categoryId: categoryId ? parseInt(categoryId) : undefined,
    };

    if (req.file) {
      updateData.cover = req.file.filename;
    }

    const updatedBook = await prisma.book.update({
      where: { id: parsedBookId },
      data: updateData,
      include: {
        category: true,
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully updated the data!",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot update the data!",
    });
  }
};

exports.deleteBooks = async (req, res) => {
  try {
    const parsedBookId = parseInt(req.params.id);

    await prisma.book.delete({
      where: { id: parsedBookId },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully delete the data!",
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot delete the data!",
    });
  }
};
