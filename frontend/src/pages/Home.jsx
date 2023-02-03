import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import Card from "../components/Card";

function Home() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/post/allpost?country=all`)
      .then((response) => {
        setAllPosts(response.data);
      })
      .catch((error) => console.error("ERROR", error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="allAnnonce__cardWrap">
        {allPosts.length > 0 ? (
          allPosts.map((post) => <Card key={post.id} post={post} />)
        ) : (
          <h2>There's no ad </h2>
        )}
      </div>
    </div>
  );
}

export default Home;
