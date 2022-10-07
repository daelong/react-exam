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
  width: ${(props) => (props.visible ? "25%" : "auto")};
  height: ${(props) => (props.visible ? "200px" : "auto")};
  vertical-align: ${(props) => (props.visible ? "middle" : "top")};
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
        <Wrapper key={index} visible={post.visible}>
          <input
            type="button"
            value={post.visible ? "닫기" : "열기"}
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
