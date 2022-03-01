// const axios = require('axios');
import axios from "axios";
export const dailyQuote = async () =>{

   const res = await axios("https://type.fit/api/quotes");
   let random = Math.floor(Math.random() * 1642);
   
   const author = res.data[random].author;
   const textVal = res.data[random].text;
//    console.log(author);
//    console.log(textVal);
   return textVal
}
