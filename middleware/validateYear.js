module.exports = (req, res, next) => {
  const { year } = req.body;

  if (
    !year ||
    isNaN(year) ||
    year < 1900 ||
    year > new Date().getFullYear()
  ) {
    return res.status(400).json({
      message: "Year must be a valid number between 1900 and current year"
    });
  }

  next();
};
