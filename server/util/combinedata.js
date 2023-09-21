var fs = require("fs");
var files = fs.readdirSync("server/database");
var allHouses = [];
for (i = 0; i < files.length; i++) {
    var jsonPath = `../database/${files[i]}`;
    var jsonObject = require(jsonPath);
    console.log(files[i]);
    var houseArray = jsonObject.data.home_search.results;
    console.log(houseArray.length);
    if (houseArray.length > 0) {
        for (j = 0; j < houseArray.length; j++) {
            var house = houseArray[j]
            // console.log(house);
            try 
            {var newHouse = {
                address: house.location.address.line,
                zipcode: house.location.address.postal_code,
                price: house.list_price,
                photo_link: house.primary_photo.href,
                num_bed: house.description.beds,
                num_bath:house.description.baths
            };
            console.log(newHouse)
            allHouses.push(newHouse)
        } catch(error) {console.log(error)}
        }

        // allHouses = allHouses.concat(houseArray);
    }
    // break;
}
// console.log(allHouses)
const FileSystem = require("fs");
FileSystem.writeFile(
    `server/houseDatabase.json`,
    JSON.stringify(allHouses),
    (error) => {
        if (error) throw error;
    }
);
