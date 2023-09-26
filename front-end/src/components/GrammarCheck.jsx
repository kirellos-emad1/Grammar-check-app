import axios from "axios";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function GrammarCheck() {
  const [text, setText] = useState("");
  const [data, setData] = useState({});

  async function grammarChecker(text) {
    try {
      const response = await axios.post("https://api.sapling.ai/api/v1/edits", {
        key: "F505A1ZJ2GD9OP5836GVXJOGIT7DJUJ2", // replace with your API key
        session_id: "test session",
        text,
      });
      const { data } = response;
      setData(data.edits);
    } catch (err) {
      const { msg } = err.response.data;
      console.log({ err: msg });
    }
  }
  function apply_edits(text, edits) {
    text = text.slice();
    const reversed = edits.sort(
      (a, b) =>
        b["sentence_start"] + b["start"] - a["sentence_start"] - a["start"]
    );
    for (const edit of reversed) {
      const start = edit["sentence_start"] + edit["start"];
      const end = edit["sentence_start"] + edit["end"];
      if (start > text.length || end > text.length) {
        continue;
      }
      text = text.slice(0, start) + edit["replacement"] + text.slice(end);
    }
    setText(text);
    grammarChecker(text);
  }
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <h1 className="mt-10 mb-5 text-black-900 p-2.5 text-4xl md:p-0">Check Here</h1>
      <div className="ml-12 w-1/2 h-3/5 flex flex-row items-end justify-center md:flex-col md:items-center md:justify-start md:w-full md:ml-0">
        <textarea
          name="text"
          id=""
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="block p-2.5 w-2/3 h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 md:w-full"
        ></textarea>
        <button
          className="mt-3 inline-flex w-auto justify-center flex-end rounded-md bg-white px-3 py-2 text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto "
          onClick={() => copy(text)}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
      <div>
        <button
          className="mt-3 inline-flex w-auto justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => grammarChecker(text)}
        >
          Check
        </button>
        {data.length > 0 && (
          <button
            className="mt-3 inline-flex w-auto justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => apply_edits(text, data)}
          >
            Fix
          </button>
        )}
      </div>
    </div>
  );
}
