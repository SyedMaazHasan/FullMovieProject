import axios from "axios";
import { apiEndPoint } from "../config.json";
function getMovies() {
  const resu = axios.get(apiEndPoint + "/movies");
  // console.log("hahaha");
  // console.log("abc=", resu);
  return resu;
}

export default getMovies;
