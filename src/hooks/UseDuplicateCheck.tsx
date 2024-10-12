import { checkDuplicateId } from '../services/AuthService'
import { useAuthStore } from '../stores/UseCurrentUserStore'
import { DuplicationRequest } from '../model/DuplicationRequest'

export const UseDuplicatCheck = () => {
  const { duplicatedState, setIsDuplicated } = useAuthStore()

  const handleDuplicateCheck = async (username: string) => {
    try {
      const requestData: DuplicationRequest = { id: username }
      const responseCode = await checkDuplicateId(requestData)

      if (responseCode === 409) {
        if (!duplicatedState) {
          setIsDuplicated(true)
        }
      } else if (responseCode === 200) {
        if (duplicatedState) {
          setIsDuplicated(false)
        }
      }
    } catch (error) {
      console.error('오류 발생:', error)
    }
  }

  return { handleDuplicateCheck }
}
