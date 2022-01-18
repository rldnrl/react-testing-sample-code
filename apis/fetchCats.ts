import axios from "axios";

export type Cat = {
  id: string;
  name: string;
  phone: string;
  email: string;
  image: string;
  favored: boolean;
  gender: "male" | "female";
};

const fetchCats = async () => {
  const response = await axios.get<Cat[]>("http://localhost:3000/api/pets");
  return response.data;
};

export default fetchCats;
