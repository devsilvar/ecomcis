// import jwt_decode from "jwt-decode";
export const customStyles = {
  rows: {
    style: {
      padding: "12px 0px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
};

// export const userId = () =>{
//   const token = JSON.parse(localStorage.getItem("authToken"));
//   if (token){
//     const decodedToken = jwt_decode(token);
//     const userId = decodedToken.user_id;
//     return userId;
//   }
// }

export const baseUrl = "https://dolphin-app-o8vbk.ondigitalocean.app/api/v1/";
