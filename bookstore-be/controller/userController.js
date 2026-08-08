const prisma = require("../lib/prisma");

exports.getAllUserData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [user, totalData] = await prisma.$transaction([
      prisma.user.findMany({
        skip: skip,
        take: limit,
      }),
      prisma.user.count(),
    ]);

    return res.status(200).json({
      statusCode: 200,
      data: user,
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

exports.deleteUser = async (req, res) => {
  try {
    const parseUserId = parseInt(req.params.id);

    await prisma.user.delete({
      where: { id: parseUserId },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully delete user data!",
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot delete user data!",
    });
  }
};
