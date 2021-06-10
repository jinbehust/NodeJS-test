function getImageFile(req, res) {
  res.statusCode = 403;
  return res.json('GET operation not supported on /imageUpload');
}

function postImageFile(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return res.json(req.file);
}

function putImageFile(req, res) {
  res.statusCode = 403;
  return res.json('PUT operation not supported on /imageUpload');
}

function deleteImageFile(req, res) {
  res.statusCode = 403;
  return res.json('DELETE operation not supported on /imageUpload');
}

module.exports = {
  getImageFile,
  postImageFile,
  putImageFile,
  deleteImageFile,
};
