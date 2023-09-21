const axios = require('axios');
require('dotenv').config()
const delay = ms => new Promise(res => setTimeout(res, ms));

setTimeout( getHoustList = async function(zipcode,limit) {
    await delay(5000);
    console.log("Waited 5s");
    try {
    const options = {
        method: 'POST',
        url: 'https://realtor.p.rapidapi.com/properties/v3/list',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.RapidAPIKey,
          'X-RapidAPI-Host': 'realtor.p.rapidapi.com'
        },
        data: {
          limit: limit,
          offset: 0,
          postal_code: zipcode,
          status: [
            'for_sale'
          ],
          sort: {
            direction: 'desc',
            field: 'list_date'
          }
        }
      };
	const response = await axios.request(options);
	console.log(response.data);
    const FileSystem = require("fs");
    FileSystem.writeFile(`server/database/${zipcode}.json`, JSON.stringify(response.data), (error) => {
    if (error) throw error;
  });
} catch (error) {
	console.error(error);
}
}
, 10000)
for (i=77002;i<=77650;i=i+2){
    console.log(i)
    getHoustList(i.toString(),1000)
}