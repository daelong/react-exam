import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import countries from "./country";

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

const FormWrapper = styled.form`
  display: table;
`;

const InputWrapper = styled.div`
  display: table-row;
  margin: 10px;
`;

const FormLabel = styled.label`
  display: table-cell;
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  display: table-cell;
  margin-bottom: 10px;
`;

const FormSelect = styled.select`
  display: table-cell;
  margin-bottom: 10px;
`;

function App() {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [post, setPost] = useState(null);
  const [sort, setSort] = useState("none");
  const [sortOption, setSortOption] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    brewery_type: "",
    country: "",
    state: "",
    phone: "",
    city: "",
    wesiteUrl: "",
  });

  const headerOptions = ["name", "brewery_type", "country", "website_url"];

  const breweryTypeOptions = [
    "micro",
    "contract",
    "brewpub",
    "regional",
    "planning",
    "proprietor",
  ];

  const getPosts = async () => {
    const res = await axios.get(
      `https://api.openbrewerydb.org/breweries?per_page=25`
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

  const addPost = (event) => {
    event.stopPropagation();
    setAddVisible(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    setPosts([...posts, formData]);
    setFormData({
      name: "",
      brewery_type: "",
      country: "",
      state: "",
      phone: "",
      city: "",
      wesiteUrl: "",
    });
    setAddVisible(false);
  };

  useEffect(() => {
    if (sort === "none") {
      getPosts();
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
        <button onClick={(event) => addPost(event)}>추가</button>
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
            <p>website_url: {post.website_url}</p>₩
          </DialogContent>
        )}
      </DialogWrapper>
      <DialogWrapper visible={addVisible}>
        {addVisible && (
          <DialogContent open={addVisible}>
            <button onClick={() => setAddVisible(false)}>X</button>
            <FormWrapper method="post" onSubmit={() => onSubmit()}>
              <InputWrapper>
                <FormLabel htmlFor="name">name:</FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={(event) => handleFormChange(event)}
                  required
                />
              </InputWrapper>

              <InputWrapper>
                <FormLabel htmlFor="brewery_type">brewery_type:</FormLabel>
                <FormSelect
                  type="select"
                  name="brewery_type"
                  id="brewery_type"
                  value={formData.brewery_type}
                  onChange={(event) => handleFormChange(event)}
                  required
                >
                  <option value="">None</option>
                  {breweryTypeOptions.map((type, index) => (
                    <option value={type} key={index}>
                      {type}
                    </option>
                  ))}
                </FormSelect>
              </InputWrapper>

              <InputWrapper>
                <FormLabel htmlFor="country">country:</FormLabel>
                <FormSelect
                  type="select"
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={(event) => handleFormChange(event)}
                >
                  {countries.map((country, index) => (
                    <option value={country.code} key={index}>
                      {country.name}
                    </option>
                  ))}
                </FormSelect>
              </InputWrapper>

              <InputWrapper>
                <FormLabel htmlFor="state">state:</FormLabel>
                <FormInput
                  type="text"
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={(event) => handleFormChange(event)}
                />
              </InputWrapper>

              <InputWrapper>
                <FormLabel htmlFor="phone">phone:</FormLabel>
                <FormInput
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={(event) => handleFormChange(event)}
                />
              </InputWrapper>

              <InputWrapper>
                <FormLabel htmlFor="city">city:</FormLabel>
                <FormInput
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={(event) => handleFormChange(event)}
                />
              </InputWrapper>

              <InputWrapper>
                <FormLabel htmlFor="website_url">website_url:</FormLabel>
                <FormInput
                  type="text"
                  name="website_url"
                  id="website_url"
                  value={formData.wesiteUrl}
                  onChange={(event) => handleFormChange(event)}
                />
              </InputWrapper>

              <InputWrapper>
                <input type="submit" value="submit" />
              </InputWrapper>
            </FormWrapper>
          </DialogContent>
        )}
      </DialogWrapper>
    </div>
  );
}

export default App;
