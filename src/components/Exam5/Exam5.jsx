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
const TrWrapper = styled.tr`
  :nth-child(even) {
    background: lightslategray;
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

const DialogWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const DialogContent = styled.dialog`
  position: fixed;
  top: 25%;
  left: 0;
  width: 500px;
  height: 400px;
  maring: 0;
  background-color: white;
`;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: center;
`;

const Pagenation = styled.div`
  display: inline-block;
  div {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
  }
`;

const PageButton = styled.div`
  cursor: pointer;
  border: 1px solid black;
  border-radius: 4px;
  margin-right: 3px;
  background-color: ${(props) => (props.now ? "lightslategray" : "white")};
`;

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [post, setPost] = useState(null);
  const [sort, setSort] = useState("none");
  const [sortOption, setSortOption] = useState("");

  const headerOptions = ["name", "brewery_type", "country", "website_url"];
  const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const getPosts = async () => {
    const res = await axios.get(
      `https://api.openbrewerydb.org/breweries?page=${page}&per_page=25`
    );
    res.data = res.data.map((item) => {
      return { ...item, visible: false };
    });
    setPosts(res.data);
  };

  const rowClick = (post) => {
    setPost(post);
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
  };

  const onSort = (option, sortType) => {
    setSortOption(option);
    const sortedPost = posts.sort((a, b) => {
      if (sortType === "none") {
        setSort("desc");
        if (a[option] > b[option]) return 1;
        if (a[option] < b[option]) return -1;
        return 0;
      } else if (sortType === "desc") {
        setSort("asc");
        if (a[option] > b[option]) return -1;
        if (a[option] < b[option]) return 1;
        return 0;
      } else {
        setSort("none");
      }
    });

    setPosts(sortedPost);
  };

  const setSortArrow = (sortType) => {
    switch (sortType) {
      case "none":
        return "";
      case "desc":
        return "↑";
      case "asc":
        return "↓";
    }
  };

  useEffect(() => {
    //page 변경 되면 page 변경
    page > 0 && getPosts(page);
  }, [page]);

  useEffect(() => {
    if (sort === "none") {
      getPosts(page);
    }
  }, [sort]);

  return (
    <div>
      <TableWrapper>
        <thead>
          <tr>
            <ThWrapper></ThWrapper>
            {headerOptions.map((option, index) => (
              <ThWrapper key={index} onClick={() => onSort(option, sort)}>
                {option}
                {option === sortOption ? setSortArrow(sort) : ""}
              </ThWrapper>
            ))}
          </tr>
        </thead>

        <tbody>
          {posts.map((post, index) => (
            <TrWrapper key={index} onClick={() => rowClick(post)}>
              <TdWrapper>{index + 1}</TdWrapper>
              <TdWrapper>{post.name}</TdWrapper>
              <TdWrapper>{post.brewery_type}</TdWrapper>
              <TdWrapper>{post.country}</TdWrapper>
              <TdWrapper>{post.website_url}</TdWrapper>
            </TrWrapper>
          ))}
        </tbody>
      </TableWrapper>
      <DialogWrapper visible={visible}>
        {visible && (
          <DialogContent open={visible}>
            <button onClick={() => closeDialog()}>X</button>
            <p>name: {post.name}</p>
            <p>brewery_type: {post.brewery_type}</p>
            <p>country: {post.country}</p>
            <p>state: {post.state}</p>
            <p>city: {post.city}</p>
            <p>phone: {post.phone}</p>
            <p>website_url: {post.website_url}</p>
          </DialogContent>
        )}
      </DialogWrapper>
      <NavWrapper aria-label="pagination">
        <Pagenation>
          <PageButton onClick={() => setPage(page - 1)}>
            « 이전 페이지
          </PageButton>
          {pageNumbers.map((pageNum, index) => (
            <PageButton
              key={index}
              onClick={() => setPage(pageNum)}
              now={page === pageNum}
            >
              {pageNum}
            </PageButton>
          ))}
          <PageButton onClick={() => setPage(page + 1)}>
            다음 페이지 »
          </PageButton>
        </Pagenation>
      </NavWrapper>
    </div>
  );
}

export default App;
