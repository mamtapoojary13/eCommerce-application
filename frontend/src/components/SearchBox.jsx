import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center space-x-2">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="p-1.5 border rounded flex-grow text-black placeholder-gray-500 text-sm"
      />
      <button
        type="submit"
        className="p-1.5 border border-white text-white rounded bg-transparent hover:bg-white hover:text-black transition duration-300 text-sm"
      >
        Search
      </button>
    </form>
  );
}
