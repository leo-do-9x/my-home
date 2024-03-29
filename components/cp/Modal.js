import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import MDRender from './MDR'
import styles from './CP.module.css'
import Loader from '@components/cp/Loader'

export default function Modal(props) {
    const [sentences, setSentences] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(async () => {
            const url = `/api/dictionaries/${props.dictionary.id}/sentences`

            const { sentences } = await fetch(url).then((response) => response.json())

            setSentences(sentences)

            setLoading(false)

            return;
    }, [])

  function close() {
    props.onClick()
  }

  return (
    <div
      className={`fixed left-0 top-0 right-0 bottom-0 ${styles['modal']} flex h-full w-screen items-center justify-center`}
    >
      <div
        className={`relative flex w-full max-w-fit ${styles['max-h-modal']} flex-col overflow-hidden rounded-lg bg-white shadow-2xl`}
      >
        <div className="mt-2 flex w-full items-center px-7">
          <div className="w-full text-center font-bold text-yellow-500">
            {props.dictionary.word}
          </div>
          <XMarkIcon
            className="h-5 w-5 cursor-pointer fill-current text-gray-700"
            onClick={close}
          />
        </div>
        <div className="prose my-2 overflow-x-hidden px-7">
          <MDRender content={props.dictionary.content} />
        </div>
        <div className="mb-4 w-full px-7">
            {sentences.length > 0 ?< p className="mb-2 text-xl font-semibold">Sentences</p> : null}
            <ul className="flex flex-wrap">
                  {isLoading ? (
                    <div className="border-b border-gray-200">
                        <div colSpan="4">
                        <Loader />
                        </div>
                    </div>
                    ) : (
                        sentences?.map((sentence) => (
                            <li key={sentence.value} className="my-2 mr-2 border p-2">
                                {sentence.label}
                            </li>
                        ))
                    )}
            </ul>
        </div>
      </div>
    </div>
  )
}
