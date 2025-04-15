import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

export function useFormValidation() {
  const formRef = ref<FormInstance>()
  const loading = ref(false)

  const validateForm = async () => {
    if (!formRef.value) return false
    
    try {
      await formRef.value.validate()
      return true
    } catch (error) {
      return false
    }
  }

  return {
    formRef,
    loading,
    validateForm
  }
} 