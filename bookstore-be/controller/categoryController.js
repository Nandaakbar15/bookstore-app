const prisma = require("../lib/prisma");

exports.getAllCategories = async (req, res) => {
  try {
    const category = await prisma.category.findMany();

    return res.status(200).json({
      statusCode: 200,
      data: category,
    });
  } catch (error) {
    console.error("Error : ", error);
    res.status(404).json({
      statusCode: 404,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.getCategoriesById = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    if (!categoryId) {
      return res.status(401).json({
        statusCode: 401,
        message: `The ID with ${categoryId} is not found!`,
      });
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    return res.status(201).json({
      statusCode: 201,
      data: category,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(404).json({
      statusCode: 404,
      message: "Error, cannot fetch data!",
    });
  }
};

exports.createCategories = async (req, res) => {
  try {
    const { name } = req.body;

    await prisma.category.create({
      data: {
        name,
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Success Create data!",
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(404).json({
      statusCode: 404,
      message: "Error, cannot create the data!",
    });
  }
};

exports.updateCategories = async (req, res) => {
  const parsedCategoryId = parseInt(req.params.id);

  const { name } = req.body;

  const updatedData = {
    name,
  };

  await prisma.category.update({
    where: { id: parsedCategoryId },
    data: updatedData,
  });

  return res.status(201).json({
    statusCode: 201,
    message: "Success update the data!",
  });
};

exports.deleteCategories = async (req, res) => {
  try {
    const parsedCategoryId = parseInt(req.params.id);

    await prisma.category.delete({
      where: { id: parsedCategoryId },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully delete the data!",
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(404).json({
      statusCode: 404,
      message: "Error, cannot delete the data!",
    });
  }
};
