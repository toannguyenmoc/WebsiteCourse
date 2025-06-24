import { ref, watchEffect } from 'vue'
import { jwtDecode } from "jwt-decode";

const isLoggedIn = ref(false)
const userName = ref("")

watchEffect(() => {
  const token = sessionStorage.getItem("TOKEN")
  if (token) {
    try {
      const decoded = jwtDecode(token)
      userName.value = decoded.sub
      isLoggedIn.value = true
    } catch (err) {
      isLoggedIn.value = false
      userName.value = ''
    }
  } else {
    isLoggedIn.value = false
    userName.value = ''
  }
})

export function useAuth() {
  return {
    isLoggedIn,
    userName,
    logout: () => {
      sessionStorage.removeItem("TOKEN")
      isLoggedIn.value = false
      userName.value = ''
    }
  }
}
