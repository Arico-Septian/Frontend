import axios from "axios";

const API_URL="https://localhost:3000"

export const loginService = (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(API_URL + "/auth/login", data)
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((err: any) => reject(err));
    });
  };