import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [webURL, setWebURL] = useState("");

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      console.log("Fontend Receive Data", data);
      if (response.ok) {
        setTitle(data.title); // Store and display the fetched title.
        setWebURL(data.webURL); // Store the fetched web URL
      } else {
        console.error(data.error); // Handle errors.
      }
    } catch (error) {
      console.error("Error fetching title:", error.message);
    } finally {
      setUrl("");
    }
  };

  return (
    <section>
      <div>
        <h1>Search Title & URL</h1>
      </div>
      <div>
        <input
          className="p-2"
          value={url}
          type="text"
          placeholder="Enter URL"
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {title && (
        <h2 className="text-2xl uppercase text-pink-600 py-3">
          Page Title: {title}
        </h2>
      )}
      {/* Display the page title. */}
      {webURL && (
        <h3 className="text-lg uppercase text-green-500">
          WebSite URL: {webURL}
        </h3>
      )}
      {/* Display the original URL */}
    </section>
  );
}

export default App;
