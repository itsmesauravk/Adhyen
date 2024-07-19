class ApiResponse {
  success: boolean
  constructor(public status: number, public message: string, public data: any) {
    this.status = status
    this.message = message
    this.data = data

    if (this.status >= 200 && this.status < 300) {
      this.success = true
    } else {
      this.success = false
    }
  }
}

export default ApiResponse
