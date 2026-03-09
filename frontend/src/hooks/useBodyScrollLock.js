import { useEffect } from 'react'

let lockCount = 0

const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      lockCount++
      if (lockCount === 1) {
        document.body.style.setProperty('overflow', 'hidden', 'important')
      }
    }

    return () => {
      if (isLocked) {
        lockCount--
        if (lockCount === 0) {
          document.body.style.overflow = ''
        }
      }
    }
  }, [isLocked])
}

export default useBodyScrollLock
