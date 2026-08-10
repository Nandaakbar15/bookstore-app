const prisma = require("../lib/prisma");

exports.getAllPublisher = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [publisher, totalData] = await prisma.$transaction([
      prisma.publisher.findMany({
        skip: skip,
        take: limit,
      }),
      prisma.publisher.count(),
    ]);

    return res.status(200).json({
      statusCode: 200,
      data: publisher,
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

exports.getPublisherById = async (req, res) => {
  try {
    const parsedPublisherId = parseInt(req.params.id);

    if (!parsedPublisherId) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with that ID ${parsedPublisherId} is not found!`,
      });
    }

    const publisher = await prisma.publisher.findUnique({
      where: { id: parsedPublisherId },
    });

    return res.status(201).json({
      statusCode: 201,
      data: publisher,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.createPublisher = async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    await prisma.publisher.create({
      data: {
        name,
        address,
        phone,
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
      message: "Error, cannot add new data!",
    });
  }
};

exports.updatePublisher = async (req, res) => {
  try {
    const parsedPublisherId = parseInt(req.params.id);
    const { name, address, phone } = req.body;

    const checkPublisher = await prisma.publisher.findUnique({
      where: { id: parsedPublisherId },
    });

    if (!checkPublisher) {
      return res.status(404).json({
        statusCode: 404,
        message: `The data with ID ${parsedPublisherId} is not found!`,
      });
    }

    const updateData = {
      name,
      address,
      phone,
    };

    const updatedPublisher = await prisma.publisher.update({
      where: { id: parsedPublisherId },
      data: updateData,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully update the data!",
      data: updatedPublisher,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot update the data!",
    });
  }
};

exports.deletePublisher = async (req, res) => {
  try {
    const parsedPublisherId = parseInt(req.params.id);

    await prisma.publisher.delete({
      where: { id: parsedPublisherId },
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
