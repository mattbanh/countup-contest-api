const getAPIInfo = async (req, res) => {
  res.status(200).json({ message: "Welcome to VCD Countup App" });
};

module.exports = { getAPIInfo };
