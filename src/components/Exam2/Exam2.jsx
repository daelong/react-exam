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
  :nth-child(1) {
    border-color: blue;
  }
  :nth-child(20n + 1) {
    border-color: blue;
  }
`;

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  const getPosts = async () => {
    const res = await axios.get(
      `https://api.openbrewerydb.org/breweries?page=${page}`
    );
    res.data = res.data.map((item) => {
      return { ...item, visible: true };
    });
    setPosts(res.data);
  };

  const addPosts = async () => {
    const res = await axios.get(
      `https://api.openbrewerydb.org/breweries?page=${page}`
    );

    res.data = res.data.map((item) => {
      return { ...item, visible: true };
    });

    //기존에 있던 데이터에 추가
    setPosts((prevPost) => prevPost.concat(res.data));
  };

  const handleScroll = async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      // 페이지 끝에 도달하면 추가 page state 변경
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    getPosts(page);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    //page 변경 되면 data추가로 받아옴
    page > 1 && addPosts(page);
  }, [page]);

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
