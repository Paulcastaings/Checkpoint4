import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../userContext";
import Card from "../components/Card";
import NavBar from "../components/NavBar";

function MyPosts() {
  const { userInfo } = useUser();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    if (userInfo.id) {
      axios
        .get(`http://localhost:5000/api/post/allUserPost/${userInfo.id}`)
        .then((response) => {
          setAllPosts(response.data);
        })
        .catch((error) => console.error("ERROR", error));
    }
  }, [userInfo]);

  return (
    <div>
      <NavBar />
      <div className="allAnnonce__cardWrap">
        {allPosts.length > 0 ? (
          allPosts.map((post) => <Card key={post.id} post={post} />)
        ) : (
          <h2>You don't have any post yet !</h2>
        )}
      </div>
    </div>
  );
}

export default MyPosts;
