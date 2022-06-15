const request = require("request");
const imageBuffer = require("request").defaults({ encoding: null });

const OCR = async (pic) => {
  const image = imageBuffer.get(pic, function (err, res, body) {
    // console.log(res);
  });
  return new Promise(function (resolve, reject) {
    const options = {
      method: "POST",
      url: "https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/",
      headers: {
        "content-type":
          "multipart/form-data; boundary=---011000010111000001101001",
        "X-RapidAPI-Host": "pen-to-print-handwriting-ocr.p.rapidapi.com",
        "X-RapidAPI-Key": "c4fdf805cbmsh662331b53cf3d1bp10b6cbjsnf42c00c623ce",
        useQueryString: true,
      },
      formData: {
        srcImg: {
          value: image,
          options: {},
        },
        Session: "string",
      },
    };
    request(options, function (error, response, body) {
      if (error) reject(error);
      resolve(JSON.parse(body).value);
    });
  });
};

module.exports = OCR;
