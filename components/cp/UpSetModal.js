import { useEffect, useState } from 'react'
import {
  XMarkIcon,
  XCircleIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'
import fetchClient from '../../lib/fetchClient'
import MDE from './MDE'
import Notification from './Notification'
import styles from './CP.module.css'
import AsyncMultiSelect from '@components/AsyncMultiSelect'
import Loader from '@components/cp/Loader'

export default function UpSetModal(props) {
  const [content, setContent] = useState(props.dictionary.content)
  const [word, setWord] = useState(props.dictionary.word)
  const [response, setResponse] = useState({})
  const [sentences, setSentences] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(async () => {
        if (props?.dictionary?.id) {
            const url = `/api/dictionaries/${props.dictionary.id}/sentences`

            const { sentences } = await fetch(url).then((response) => response.json())

            setSentences(sentences)

            setLoading(false)

            return;
        }

        setLoading(false)
    }, [])

  function close(dictionary = {}) {
    props.onClick(dictionary)
  }

  async function submit() {
    const body = JSON.stringify({
      word: word.trim(),
      content,
      sentences,
      contentAt: props.dictionary.contentAt ?? new Date(),
    })

    let response = {}

    if (Object.keys(props.dictionary).length !== 0) {
      response = await fetchClient(
        `/api/dictionaries/${props.dictionary.id}`,
        body,
        'PATCH'
      )
    } else {
      response = await fetchClient('/api/dictionaries', body)
    }

    if (response.code === 400) {
      setResponse(response)

      setTimeout(() => {
        setResponse({})
      }, 3000)

      return
    }

    close(response.dictionary)
  }

  return (
    <div
      className={`fixed left-0 top-0 right-0 bottom-0 ${styles['modal']} flex h-full w-screen items-center justify-center`}
    >
      <div
        className={`mx-auto w-3/4 max-w-xl rounded-xl ${styles['max-h-modal']} border bg-white p-5 shadow-lg`}
      >
        <div className="overflow-hidden rounded-md">
          <Notification response={response} />
          <div className="mb-2 flex justify-between font-semibold">
            <div className="text-xl">
              Word<i className="ml-sm text-red-500">*</i>
            </div>
            <div className="cursor-pointer rounded-full border p-1">
              <XMarkIcon className="h-5 w-5" onClick={close} />
            </div>
          </div>
          <input
            className="mb-4 w-full border p-2"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Content</p>
            <MDE
              content={content}
              onChange={(content) => setContent(content)}
            />
          </div>
           <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Sentences</p>
            { isLoading
                ?   (
                    <div className="border-gray-200">
                        <div colSpan="4">
                        <Loader />
                        </div>
                    </div>
                    )
                :   (<AsyncMultiSelect default={sentences} onChange={(sentences) => setSentences(sentences)}/>)
            }
          </div>
          <div className="flex justify-end">
            <button className="mx-2 rounded-full border p-3" onClick={submit}>
              <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
            <button
              className="mx-2 rounded-full border p-3"
              onClick={() => close()}
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
