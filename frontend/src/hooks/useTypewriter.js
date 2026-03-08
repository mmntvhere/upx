// src/hooks/useTypewriter.js
import { useState, useEffect } from "react"

const useTypewriter = (words, typingSpeed = 100, deletingSpeed = 50, pause = 1500) => {
  const [index, setIndex] = useState(0) // индекс текущего слова
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[index % words.length]

    const updateText = () => {
      if (isDeleting) {
        setText((prev) => prev.slice(0, -1))
      } else {
        setText((prev) => currentWord.slice(0, prev.length + 1))
      }
    }

    if (!isDeleting && text === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), pause)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && text === "") {
      setIsDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
    }

    const timeout = setTimeout(updateText, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timeout)
  }, [text, isDeleting, index, words, typingSpeed, deletingSpeed, pause])

  return text
}

export default useTypewriter