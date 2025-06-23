import { jwtDecode } from "jwt-decode";

export function getEmail() {
 try {
    const TOKEN = sessionStorage.getItem('TOKEN');
    const decoded = jwtDecode(TOKEN);
    return decoded.sub;
 } catch (error) {
   console.log(error);
   
    return null;
 }
}