var ImgixClient = require('imgix-core-js');

// set up imgix
var client = new ImgixClient("sarahfederman.imgix.net", "UucTkLWkcRgKy2SZMYe5aHHfXo40bB3Q");
var url = client.path("https://s3.amazonaws.com/sarahfederman-portfolio/logo-o.svg").toUrl().toString();
console.log(url); // => "https://my-social-network.imgix.net/users/1.png?w=400&h=300&s=…"

module.exports.client = client;