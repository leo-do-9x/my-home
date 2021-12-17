import { XIcon } from "@heroicons/react/outline";

export default function Modal(props) {
  function close() {
    props.onClick();
  }

  return (
    <div className="p-7 flex justify-center items-center fixed left-0 top-0 w-full h-full z-50 transition-opacity duration-300 opacity-100">
      <div className="bg-white flex flex-col rounded-lg max-w-xl shadow-2xl">
        <div className="px-7 flex items-center w-full mt-2">
          <div className="text-yellow-500 font-bold w-full text-center">
            {props.dictionary.word}
          </div>
          <XIcon
            className="fill-current text-gray-700 w-5 h-5 cursor-pointer"
            onClick={close}
          />
        </div>
        <div className="px-7 my-2 h-full overflow-hidden whitespace-pre-wrap">
          {props.dictionary.content}
        </div>
      </div>
    </div>
  );
}
