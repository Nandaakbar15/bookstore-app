const prisma = require("../lib/prisma");

exports.getBookData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [book, totalData] = await prisma.$transaction([
      prisma.book.findMany({
        skip: skip,
        take: limit,
        include: {
          category: true, // Relasi ke Categories
          author: true, // Relasi ke model Author (huruf kapital)
          publisher: true,
        },
      }),
      prisma.book.count(),
    ]);

    return res.status(200).json({
      statusCode: 200,
      data: book,
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

exports.detailsBook = async (req, res) => {
  try {
    const parsedBookId = parseInt(req.params.id);

    const book = await prisma.book.findUnique({
      where: { id: parsedBookId },
      include: {
        author: true,
        publisher: true,
        category: true,
      },
    });

    return res.status(201).json({
      statusCode: 201,
      data: book,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};
