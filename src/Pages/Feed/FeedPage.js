import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Button, Card, Modal, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import addIcon from "../../Components/Images/plus-circle.svg";
import LikeButton from "../../Components/Images/heart.svg";
import LikedButton from "../../Components/Images/heart-fill.svg";
import CommentButton from "../../Components/Images/chat.svg";
import { useDispatch, useSelector } from "react-redux";
import apiClient, { apiEndpoints } from "../../Api/api";
import { clearProfilePicture, clearRole, clearToken, clearUserID, clearUsername } from "../../Store/TokenStore";
import { useNavigate } from "react-router-dom";
import './Feed.css';
import axios from "axios";
import UserDetails from "../Users/UserDetails";

const Feed = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [likeCount, setLikeCount] = useState([]);
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [steps, setSteps] = useState([""]);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([]);

  const userID = useSelector((state) => state.auth.userID);
  const username = useSelector((state) => state.auth.username);
  const profilePicture = useSelector((state) => state.auth.profilePicture);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = localStorage.getItem("apiUrl");

  const recipesRef = useRef(null); // Ref to avoid unnecessary re-renders when recipes are updated

  // Handle modal visibility
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Memoize computed values for performance optimization
  const sortedRecipes = useMemo(() => recipes.slice().sort((a, b) => b.timestamp - a.timestamp), [recipes]);

  // Function to fetch recipes with useCallback for memoization
  const getRecipes = useCallback(async () => {
    try {
      const response = await apiClient.get(apiEndpoints.viewRecipes);
      setRecipes(response.data);
    } catch (error) {
      toast.error("Failed to load recipes");
      console.error(error);
    }
  }, []);

  // Fetch categories
  const getCategories = useCallback(async () => {
    try {
      const response = await apiClient.get(apiEndpoints.getCategories);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Fetch likes
  const getLikes = useCallback(async () => {
    try {
      const response = await apiClient.post(apiEndpoints.getLikes + userID);
      setLikes(response.data);
    } catch (error) {
      console.log("Failed to load likes");
      console.error(error);
    }
  }, [userID]);

  const getLikesCount = useCallback(async () => {
    try {
      const response = await apiClient.get(apiEndpoints.getLikesCount);
      setLikeCount(response.data);
    } catch (error) {
      console.log("Failed to load like count");
    }
  }, []);

  // Consolidate initialization logic into useEffect
  useEffect(() => {
    getCategories();
    getRecipes();
    getLikesCount();
    getLikes();

    const cachedUsers = localStorage.getItem("users");
    if (cachedUsers) {
      setUsers(JSON.parse(cachedUsers));
    } else {
      getUsers();
    }
  }, [getCategories, getRecipes, getLikes, getLikesCount]);

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


  // Optimized event handlers
  const handleLike = useCallback(
    async (recipeID) => {
      try {
        await apiClient.post(apiEndpoints.like + `userID=${userID}&recipeID=${recipeID}`);
        setLikes((prevLikes) => [...prevLikes, { recipeID, isLiked: true }]);
      } catch (error) {
        toast.error("Failed to like");
        console.error(error);
      }
    },
    [userID]
  );

  const handleRemoveLike = useCallback(
    async (recipeID) => {
      try {
        await apiClient.post(apiEndpoints.removeLike + `userID=${userID}&recipeID=${recipeID}`);
        setLikes((prevLikes) =>
          prevLikes.filter((like) => like.recipeID !== recipeID || !like.isLiked)
        );
      } catch (error) {
        toast.error("Failed to remove like");
        console.error(error);
      }
    },
    [userID]
  );

  // Clear form
  const handleClear = () => {
    setTitle("");
    setImage("");
    setCategoryID("");
    setInstructions("");
    setSteps([""]);
  };

  const addStep = (e) => {
    e.preventDefault();
    setSteps((prevSteps) => [...prevSteps, ""]);
  };

  const handleStepChange = (index, value) => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index] = value;
      return newSteps;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const allSteps = steps.join("\n");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructions", allSteps);
    formData.append("userID", userID);
    formData.append("categoryID", categoryID);
    formData.append("image", image);

    try {
      await axios.post(url + "/Recipes/Add", formData);
      toast.success("Recipe added successfully!");
      navigate("/");
      handleClear();
      handleClose();
    } catch (error) {
      toast.error("Failed to add recipe.");
      console.error(error);
    }
  };

  const handleProfile = (id) => {
    navigate(`/Profile/${id}`)

  };

  const getRecipeLikeCount = (recipeID) => {
    const countItem = likeCount.find((count) => count.recipeID === recipeID);
    return countItem ? countItem.likeCount : 0; // Return 0 if no match
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

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
};

const handleCardClick = () => {
  // Display an alert with additional recipe details
  alert(`Recipe: `);
};

const [showComment, setShowComment] = useState(false);

  const handleCloseComment = () => setShowComment(false);
  const handleShowComment = () => setShowComment(true);



  return (
    <div className="container mt-4">
      <Row>
        <Col className="col-3">
          <UserDetails/>
        </Col>

        <Col className="col-6">
          <div className="main-section">
            <div className="heading">
            <h1>Food Pulse</h1>
            <hr/>
            <Button variant="primary" onClick={handleShow}>
              <img src={addIcon} alt="Add" /> Add Recipe
            </Button>
            </div>
            <div className="main-feed-section">
              {recipes && recipes.length > 0 ? (
                recipes.map((item, index) => {
                  const isLiked = likes.some(
                    (like) => like.recipeID === item.recipeID && like.isLiked
                  );
                  const likeCountForRecipe = getRecipeLikeCount(item.recipeID);

                  return (
                    <Card style={{ width: "auto" }} className="mt-3" key={index} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                      <Card.Body>
                        <Card.Title><a href="#" onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          handleProfile(item.userID);
        }}
 className="text-decoration-none"><img src={item.profilePicture} alt="profilePicture" className="profile-icon"/>@{item.userName}</a></Card.Title>
                        <hr/>
                        <div onClick={handleCardClick}>
                        <Card.Subtitle className="mb-2 text-muted">{item.title}</Card.Subtitle>
                        <img src={item.image} alt="recipeImage" style={{width:"400px"}} className="food-image" />
                        
                        </div>
                      
                        <Row className="mt-3">
                          
                          <hr/>
                          
                          <Col>
                        {userID && (
                          isLiked ? (
                            <div>
                              <img className="mx-2" src={LikedButton} alt="liked button" onClick={() => handleRemoveLike(item.recipeID)} /> {likeCountForRecipe} |
                              <img className="mx-2" src={CommentButton} alt="comment button" onClick={handleShowComment} />
                            </div> 
                          ) : (
                            <img className="mx-2" src={LikeButton} alt="like button" onClick={() => handleLike(item.recipeID)} /> 
                          )
                        )}

                        {/* <Button className="btn btn-primary mx-1" onClick={() => console.log("Comment button clicked")} > */}
                         
                        {/* </Button> */}
                        </Col>
                        </Row>
                        </Card.Body>
                    </Card>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </Col>

        <Col className="col-3">
            <div className="search-bar">
            <Card style={{ width: "auto" }} className="mt-3">
              <Card.Body>
                <Card.Title>Search</Card.Title>
                <Form>
                  <Row>
                    <Col className="col-8">
                <input className="form-control" placeholder="@..." type="text" value={query} onChange={handleQuery} />
                </Col>
                <Col>
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                </Col>
                </Row>
                {query && suggestions.length > 0 && (
        <ul>
          {suggestions.map((user, index) => (
            <li key={index}>
              {user.username}
            </li>
          ))}
        </ul>
      )}
      {query && suggestions.length === 0 && <p>No users found.</p>}
      </Form>
                <Card.Title className="mt-3">Trending</Card.Title>
              </Card.Body>
            </Card>
            </div>
        </Col>
      </Row>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Recipe</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
      <Row className="mt-4">
        <Col>
          <label className="form-Label">Title: </label>
          <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Col>
      </Row>

      <Row className="mt-4">
          <label className="form-Label">Instructions: </label>
        <Col>
          {steps.map((step, index) => (
            <div key={index}>
              <input type="text" placeholder={`Step ${index + 1}`} value={step} onChange={(e) => handleStepChange(index, e.target.value)}  className="form-control"/>
            </div>
          ))}
        </Col>
      </Row>

      <Row className="mt-1">
        <Col>
          <button className="btn btn-outline-primary" onClick={addStep}>Next step</button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="col-7">
          <label className="form-Label">Image: </label>
          <input className="form-control" type="file"  onChange={handleImageChange} />
        </Col>
        <Col>
          <label className="form-Label">Category: </label>
          {/* <input className="form-control" type="text" value={formData.CategoryID} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, CategoryID: e.target.value}))} /> */}
          <select className="form-select" value={categoryID} onChange={(e) => setCategoryID(e.target.value)} >
          <option value="">Select an option...</option>
  {categories.map((category) => (
    <option key={category.categoryID} value={category.categoryID}>
      {category.name}
    </option>
  ))}
            </select>
        </Col>
      </Row>

      <Row>
        <Col>
         <input className="form-control" type="text" value={userID} hidden />
        </Col>
      </Row>

    


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseComment}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
          <img src={addIcon} alt="Add" /> Add Recipe
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showComment} onHide={handleCloseComment}>
        <Modal.Header closeButton>
          <Modal.Title>Add a comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="form-label">Comment:</label>
          <textarea className="form-control" type='text'></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseComment}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseComment}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Feed;
