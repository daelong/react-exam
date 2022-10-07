import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const UlWrapper = styled.div``;

const Wrapper = styled.div`
  display: inline-block;
  border: 1px solid grey;
  border-radius: 8px;
  margin: 16px;
  padding: 16px;
  width: 25%;
  height: 300px;
  vertical-align: middle;
`;

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const posts = await axios.get("https://api.openbrewerydb.org/breweries");
    posts.data = posts.data.map((item) => {
      return { ...item, visible: true };
    });
    setPosts(posts.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <UlWrapper style={{ listStyle: "none" }}>
      {posts.map((post, index) => (
        <Wrapper key={index}>
          <input
            type="button"
            value="X"
            onClick={() => {
              post.visible = !post.visible;
              setPosts([...posts]);
            }}
            style={{ height: "24px" }}
          ></input>
          {post.visible && (
            <li name="card" style={{ display: "inline" }}>
              <h4>{post.name}</h4>
              <p>{post.brewery_type}</p>
              <p>{post.country}</p>
              <p>{post.website_url}</p>
            </li>
          )}
        </Wrapper>
      ))}
    </UlWrapper>
  );
}

export default App;
