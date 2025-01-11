import React, { useState, useEffect } from "react";
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

const Feed = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [likeCount, setLikeCount] = useState([]);
  const userID = useSelector((state) => state.auth.userID);
  const username = useSelector((state) => state.auth.username);
  const profilePicture = useSelector((state) => state.auth.profilePicture);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');

  const [steps, setSteps] = useState(['']);

  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  
    const handleLogout = () => {
      dispatch(clearToken()); // Clear the token on logout
      dispatch(clearUserID()); 
      dispatch(clearUsername()); 
      dispatch(clearRole()); 
      dispatch(clearProfilePicture()); 
      navigate('/login')
    };
  

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const allSteps = steps.join('\n');
    // Ensure `UserID` and `CategoryID` are properly set
    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructions", allSteps);
    formData.append("userID", userID);
    formData.append("categoryID", categoryID);
    formData.append("image", image);

    axios.post('https://localhost:7297/api/Recipes/Add', formData)
            .then((result) => toast.success("added"))
            .catch((error) => toast.error(error))
            navigate('/');
  
    // Send POST request
    // try {
    //   const response = apiClient.post(apiEndpoints.addRecipe, formData);
    //   toast.success('Recipe added successfully!');
    //   console.log(response.data);
    //   navigate('/');
    // } catch (error) {
    //   console.error(error.response?.data || error.message);
    //   toast.error('Failed to add recipe.');
    // }

    handleClear();
    handleClose();
  };

  useEffect(() => {
    getCategories();
    if (userID == null || userID === "") {
      navigate("/login");
    } else {
      getRecipes();
      getLikesCount();
      getLikes();
    }
  }, []);

  const getRecipes = async () => {
    try {
      const response = await apiClient.get(apiEndpoints.viewRecipes);
      setRecipes(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to load recipes");
      console.error(error);
    }
  };

  const getLikes = async () => {
    try {
      const response = await apiClient.post(apiEndpoints.getLikes + userID);
      setLikes(response.data);
    } catch (error) {
      toast.error("Failed to load likes");
      console.error(error);
    }
  };

  const getLikesCount = async () => {
    try {
      const response = await apiClient.get(apiEndpoints.getLikesCount);
      setLikeCount(response.data);
    } catch (error) {
      toast.error("Failed to load like count");
    }
  };

  const handleLike = async (recipeID) => {
    try {
      await apiClient.post(apiEndpoints.like + `userID=${userID}&recipeID=${recipeID}`);
      setLikes((prevLikes) => [...prevLikes, { recipeID, isLiked: true }]);
    } catch (error) {
      toast.error("Failed to like");
      console.error(error);
    }
  };

  const handleRemoveLike = async (recipeID) => {
    try {
      await apiClient.post(apiEndpoints.removeLike + `userID=${userID}&recipeID=${recipeID}`);
      setLikes((prevLikes) =>
        prevLikes.filter((like) => like.recipeID !== recipeID || !like.isLiked)
      );
    } catch (error) {
      toast.error("Failed to remove like");
      console.error(error);
    }
  };

  const handleLikedPosts = async => {
    navigate('/LikedPosts/' + userID)
  }

  const handleProfile = async => {
    navigate('/' + userID)
  }

  const getRecipeLikeCount = (recipeID) => {
    const countItem = likeCount.find((count) => count.recipeID === recipeID);
    return countItem ? countItem.likeCount : 0; // Return 0 if no match
  };

  //dynamically add categories
  const getCategories = async () =>
  {
     try {
      const response = await apiClient.get(apiEndpoints.getCategories); // Make the API call
      setCategories(response.data); // Update the state with the recipes
    } catch (error) {
      toast.error("Failed to load recipes"); // Show error toast
      console.error(error); // For debugging
    }
  }

  const addStep = (e) => {
    e.preventDefault();
    setSteps([...steps, '']);
  }

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  }

  const handleClear = () => {
    setTitle('');
    setImage('');
    setCategoryID('');
    setInstructions('');
    setSteps([]);
    
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
};

  return (
    <div className="container mt-4">
      <Row>
        <Col className="col-3">
          <div className="side-bar">
            <Card style={{ width: "auto" }} className="mt-3">
              <Card.Body>
                
                <Card.Title><a href="#" className="text-decoration-none"><img src={profilePicture} alt="profile" className="profile-icon" /> @{username}</a></Card.Title>
                0 Following  0 Followers
                <div className="Sidebar-Nav">
                  <ul>
                    {
                      username ? 
                      (<div className="">
                          <Row className="mt-1">
                            <button className="btn btn-outline-secondary mx-3 block" onClick={handleProfile} > Profile </button>
                          </Row>

                          <Row className="mt-1">
                            <button className="btn btn-outline-secondary mx-3 block" onClick={handleLikedPosts} > Liked Posts </button>
                          </Row>

                          <Row className="mt-1">
                            <button className="btn btn-outline-danger mx-3 block" onClick={handleLogout} > Log out </button>
                          </Row>
                      </div>) : (null)
                    }
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col className="col-6">
          <div className="main-section">
            <h1>Feed</h1>
            <Button variant="primary" onClick={handleShow}>
              <img src={addIcon} alt="Add" /> Add Recipe
            </Button>
            <div>
              {recipes && recipes.length > 0 ? (
                recipes.map((item, index) => {
                  const isLiked = likes.some(
                    (like) => like.recipeID === item.recipeID && like.isLiked
                  );
                  const likeCountForRecipe = getRecipeLikeCount(item.recipeID);
    
                  return (
                    <Card style={{ width: "auto" }} className="mt-3" key={index}>
                      <Card.Body>
                        <Card.Title><a href='{handleProfile}' className="text-decoration-none"><img src={item.profilePicture} alt="profilePicture" className="profile-icon"/>@{item.userName}</a></Card.Title>
                        <hr/>
                        <Card.Subtitle className="mb-2 text-muted">{item.title}</Card.Subtitle>
                        <img src={item.image} alt="recipeImage" style={{width:"400px"}} className="food-image" />
                        <Row className="mt-3">
                          <hr/>
                          <Col>
                        {userID && (
                          isLiked ? (
                            <Button className="btn btn-primary mx-1" onClick={() => handleRemoveLike(item.recipeID)}> <img className="mx-2" src={LikedButton} alt="liked button" /> {likeCountForRecipe} </Button>
                          ) : (
                            <Button className="btn btn-primary mx-1" onClick={() => handleLike(item.recipeID)}> <img className="mx-2" src={LikeButton} alt="like button" /> {likeCountForRecipe} </Button>
                          )
                        )}
    
                        {/* <Button className="btn btn-primary mx-1" onClick={() => console.log("Comment button clicked")} > */}
                          <a href={handleClear}> <img className="mx-2" src={CommentButton} alt="comment button" /> 1 </a>
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
                <input className="form-control" placeholder="@..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
          <img src={addIcon} alt="Add" /> Add Recipe
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>

    </div>
  );
};

export default Feed;
