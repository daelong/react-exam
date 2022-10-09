import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const TableWrapper = styled.table`
  margin: 32px;
  width: calc(100% - 32px);
  border-collapse: collapse;
`;
const ThWrapper = styled.th`
  width: 50px;
  padding: 12px;
  border-bottom: 1px solid black;
  border-collapse: collapse;

  :not(:last-child) {
    border-right: 1px solid black;
  }
`;

const TdWrapper = styled.td`
  width: 50px;
  padding: 12px;
  border-bottom: 1px solid black;
  border-collapse: collapse;
  text-align: center;
  :not(:last-child) {
    border-right: 1px solid black;
  }
  :hover {
    cursor: pointer;
  }
`;

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  const headerOptions = ["name", "brewery_type", "country", "website_url"];

  const getPosts = async () => {
    const res = await axios.get(
      `https://api.openbrewerydb.org/breweries?page=${page}&per_page=50`
    );
    res.data = res.data.map((item) => {
      return { ...item, visible: false };
    });
    setPosts(res.data);
  };

  const addPosts = async () => {
    const res = await axios.get(
      `https://api.openbrewerydb.org/breweries?page=${page}&per_page=50`
    );

    res.data = res.data.map((item) => {
      return { ...item, visible: false };
    });

    //기존에 있던 데이터에 추가
    setPosts((prevPost) => prevPost.concat(res.data));
  };

  const rowClick = (post) => {
    post.visible = !post.visible;
    setPosts([...posts]);
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
    <TableWrapper>
      <thead>
        <tr>
          <ThWrapper></ThWrapper>
          {headerOptions.map((option, index) => (
            <ThWrapper key={index}>{option}</ThWrapper>
          ))}
        </tr>
      </thead>
      {posts.map((post, index) => (
        <tbody key={index}>
          <tr onClick={() => rowClick(post)}>
            <TdWrapper>{index + 1}</TdWrapper>
            <TdWrapper>{post.name}</TdWrapper>
            <TdWrapper>{post.brewery_type}</TdWrapper>
            <TdWrapper>{post.country}</TdWrapper>
            <TdWrapper>{post.website_url}</TdWrapper>
          </tr>
          {post.visible && (
            <tr>
              <td colSpan="5">
                <p>name: {post.name}</p>
                <p>brewery_type: {post.brewery_type}</p>
                <p>country: {post.country}</p>
                <p>state: {post.state}</p>
                <p>city: {post.city}</p>
                <p>phone: {post.phone}</p>
                <p>website_url: {post.website_url}</p>
              </td>
            </tr>
          )}
        </tbody>
      ))}
    </TableWrapper>
  );
}

export default App;
