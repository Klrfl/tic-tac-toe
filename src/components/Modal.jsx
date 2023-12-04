import { useEffect, useRef } from "react"

export default function Modal({ isOpen, hasClosed, children }) {
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
    <>
      <dialog ref={dialog} className="modal">
        <form>
          <button onClick={(e) => closeModal(e)}>close</button>
          {children}
        </form>
      </dialog>
    </>
  )
}
