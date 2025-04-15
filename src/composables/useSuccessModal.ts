import { ElMessageBox } from 'element-plus'

export function useSuccessModal() {
  const showSuccessModal = async (title: string, message: string) => {
    try {
      await ElMessageBox.alert(message, title, {
        confirmButtonText: 'OK',
        type: 'success',
        center: true,
        customClass: 'success-modal',
        showClose: false
      })
      return true
    } catch {
      return false
    }
  }

  return {
    showSuccessModal
  }
} 