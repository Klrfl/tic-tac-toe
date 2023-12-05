import { useEffect, useRef } from "react"
import "./Modal.css"

export default function Modal({ closeText = "close", isOpen, hasClosed, children }) {
  const dialog = useRef(null)

  function openModal(isOpen) {
    if (isOpen) dialog.current.showModal()
  }

  function closeModal(e) {
    e.preventDefault()
    dialog.current.close()
    hasClosed()
  }

  useEffect(() => {
    openModal(isOpen)
  }, [isOpen])

  return (
    <dialog ref={dialog} className="modal">
      <form onSubmit={(e) => e.preventDefault()}>
        <button onClick={(e) => closeModal(e)}>{closeText}</button>
        {children}
      </form>
    </dialog>
  )
}
