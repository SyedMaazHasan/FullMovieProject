import React, { Component } from "react";
import axios from "axios";
function getGenres1() {
  const result = axios.get("http://localhost:3900/api/genres");
  //console.log("under genereservice= ", result);
  return result;
}
export default getGenres1;

// const getGenre1 = async () => {
//   const  result = await axios.get("http://localhost:3900/api/genres");
//    return result.data;
//  };
//  export default getGenre1;
