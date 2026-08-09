const prisma = require("../lib/prisma");

exports.getAllAuthor = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [author, totalData] = await prisma.$transaction([
      prisma.author.findMany({
        skip: skip,
        take: limit,
      }),
      prisma.author.count(),
    ]);

    return res.status(200).json({
      statusCode: 200,
      data: author,
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

exports.getAuthorById = async (req, res) => {
  try {
    const parsedAuthorId = parseInt(req.params.id);

    if (!parsedAuthorId) {
      return res.status(401).json({
        statusCode: 401,
        message: `The data with that ID ${parsedAuthorId} is not found!`,
      });
    }

    const author = await prisma.author.findUnique({
      where: { id: parsedAuthorId },
    });

    return res.status(200).json({
      statusCode: 200,
      data: author,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.createAuthor = async (req, res) => {
  try {
    const { name } = req.body;

    await prisma.author.create({
      data: {
        name,
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully add new data!",
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, could not add new data!",
    });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const parsedAuthorId = parseInt(req.params.id);
    const { name } = req.body;

    const updateData = {
      name,
    };

    const author = await prisma.author.update({
      where: { id: parsedAuthorId },
      data: updateData,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully update the data!",
      data: author,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, could not update the data!",
    });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const parsedAuthorId = parseInt(req.params.id);

    await prisma.author.delete({
      where: { id: parsedAuthorId },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully delete the data!",
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, could not delete the data!",
    });
  }
};
