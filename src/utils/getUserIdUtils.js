import { jwtDecode } from "jwt-decode";

export function getUserId() {
 try {
    const TOKEN = sessionStorage.getItem('TOKEN');
    const decoded = jwtDecode(TOKEN);
    return decoded.userId;
 } catch (error) {
   console.log(error);
   
    return null;
 }
}
