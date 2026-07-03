import { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [orgUrl, setOrgUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [customUrl,setcustomUrl]= useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orgUrl.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(apiUrl, {
        orgUrl,customUrl
      });
      console.log(res);
      setShortUrl(res.data.shortUrl);
      setOrgUrl("");
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>URL Shortener</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your URL..."
            value={orgUrl}
            onChange={(e) => setOrgUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Keyword"
            value={customUrl}
            onChange={(e) => setcustomUrl(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {shortUrl && (
          <div className="result">
            <h3>Short URL</h3>

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}