
import axiosInstance from "./axiosConfig"
import userServices from "./userServices"
const userService = new userServices()

export default class loginAndRegisterServices {
  constructor() {
    this.axios = axiosInstance
  }

  async sendCode(email) {
    const response = await this.axios.post('/send_code', email)
    console.log(response)
    if (response.data.response) {
      return true
    }
    else {
      return response.data.message
    }
  }

  async checkCode(dados) {
    const response = await this.axios.post('/check_code', dados)
    if (response.data.response) {
      return true
    }
    else {
      return response.data.message
    }
  }

  async register(dados) {
    const response = await this.axios.post('/register', dados)
    if (response.status === 200) {
      return true
    }
    else {
      return response.data.message
    }
  }

  async login(dados) {
    const response = await this.axios.post('/login', dados)
    console.log("response do login abaixo:")
    console.log(response.data)
    if (response.status === 200) {
      return response.data
    } else if (response.status !== 200) {
      return response.data.message
    }
  }

  async isUserTokenValid() {
    const userToken = localStorage.getItem("userToken")
    if (!userToken) {
      return false
    }
  }

  async newPasswordSendCode(email) {
    const response = await this.axios.post('/change_password_send', email)
    if (response.data.response) {
      return true
    }
    else {
      return response.data.message
    }
  }

  async newPasswordCheckCode(dados) {
    const emailAndCode = {
      ...dados.email,
      ...dados.code
    }
    const response = await this.axios.post('/change_password_check', emailAndCode)
    if (response.data.response) {
      return true
    }
    else {
      return response.data.message
    }
  }
  async newPassword(dados) {
    const response = await this.axios.patch('/edit_user', dados)
    if (response.data.response) {
      return true
    }
    else {
      return response.data.message
    }
  }

}