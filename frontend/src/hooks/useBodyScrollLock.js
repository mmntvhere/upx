import { useEffect } from 'react'

let lockCount = 0
let scrollPosition = 0

const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      lockCount++
      if (lockCount === 1) {
        scrollPosition = window.scrollY
        // Strict iOS lock
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollPosition}px`
        document.body.style.width = '100%'
        document.body.style.setProperty('overflow', 'hidden', 'important')
        document.documentElement.style.setProperty('overflow', 'hidden', 'important')
      }
    }

    return () => {
      if (isLocked) {
        lockCount--
        if (lockCount === 0) {
          document.body.style.position = ''
          document.body.style.top = ''
          document.body.style.width = ''
          document.body.style.overflow = ''
          document.documentElement.style.overflow = ''
          window.scrollTo(0, scrollPosition)
        }
      }
    }
  }, [isLocked])
}

export default useBodyScrollLock
