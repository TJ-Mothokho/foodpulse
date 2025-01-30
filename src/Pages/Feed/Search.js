import React, {useState, useCallback} from "react";
import axios from "axios";
import { Button, Card, Modal, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const url = localStorage.getItem("apiUrl");
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState('');

    const navigate = useNavigate();

    const handleProfile = (id) => {
        navigate(`/Profile/${id}`);
      };

    const handleSearch = async (e) =>{
        if(e !== undefined)
        {
          e.preventDefault();
        }
        getUsers();
        // localStorage.setItem('users', JSON.stringify(users));
      }
      
      const handleQuery = (e) => {
        const value = e.target.value;
        setQuery(value);
      
        console.log('query: ' + value);
        console.log('users: ' + users);
        console.log('storage: ' + localStorage.getItem('users'));
        
      
        // Filter suggestions based on input
        try{
          const filtered = users.filter(user =>
            user.username.startsWith(value.toLowerCase())
          );
          setSuggestions(filtered);
        }
        catch{
          handleSearch()
        }
        
      };

      // Fetch users
        const getUsers = useCallback(async () => {
          try {
            const response = await axios.get(url + "/Users/GetUsernames");
            setUsers(response.data);
            localStorage.setItem("users", JSON.stringify(response.data));
          } catch (error) {
            console.error(error);
          }
        }, [url]);

    return(
        <div className="search-bar">
    <Card style={{ width: "auto" }} className="mt-3">
      <Card.Body>
        <Card.Title>Search</Card.Title>
        <Form>
          <Row>
            <Col className="col-8">
              <input
                className="form-control"
                placeholder="@..."
                type="text"
                value={query}
                onChange={handleQuery}
              />
            </Col>
            <Col>
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </Col>
          </Row>
          {query && suggestions.length > 0 && (
            <ul className="list-unstyled mt-2">
              {suggestions.map((user, index) => (
                <li key={index}>
                  <button
                    className="btn btn-outline-primary mt-1 col-8 text-start"
                    onClick={() => handleProfile(user.userID)}
                  >
                    {user.username}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {query && suggestions.length === 0 && <p>No users found.</p>}
        </Form>
        {/* <Card.Title className="mt-3">Trending</Card.Title> */}
      </Card.Body>
    </Card>
  </div>
    );
}

export default Search;