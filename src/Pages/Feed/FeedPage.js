import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import addIcon from "../../Components/Images/plus-circle.svg";
import LikeButton from "../../Components/Images/heart.svg";
import LikedButton from "../../Components/Images/heart-fill.svg";
import CommentButton from "../../Components/Images/chat.svg";
import { useDispatch, useSelector } from "react-redux";
import apiClient, { apiEndpoints } from "../../Api/api";
import { useNavigate } from "react-router-dom";

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
  
  const [formData, setFormData] = useState({
    Title: '',
    Instructions: '',
    ImageUrl: '',
    UserID: userID,
    CategoryID: '',
    Hashtag:[
      'eat'
    ]
  });

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Ensure `UserID` and `CategoryID` are properly set
    const data = {
      Title: formData.Title,
      Instructions: formData.Instructions,
      ImageUrl: formData.ImageUrl,
      UserID: userID, // Fetch UserID from state
      CategoryID: formData.CategoryID, // Make sure this is set correctly
      Hashtags: ['munching'], // Note: match case with API expectation
    };
  
    // Log data for debugging
    console.log(data);
  
    // Send POST request
    try {
      const response = await apiClient.post(apiEndpoints.addRecipe, data);
      toast.success('Recipe added successfully!');
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error('Failed to add recipe.');
    }
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

  return (
    <div className="container mt-4">
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
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{'@' + item.userName}</Card.Subtitle>
                  <Card.Text>{item.instructions}</Card.Text>

                  {userID && (
                    isLiked ? (
                      <Button
                        className="btn btn-primary mx-1"
                        onClick={() => handleRemoveLike(item.recipeID)}
                      >
                        <img className="mx-2" src={LikedButton} alt="liked button" />
                        {likeCountForRecipe}
                      </Button>
                    ) : (
                      <Button
                        className="btn btn-primary mx-1"
                        onClick={() => handleLike(item.recipeID)}
                      >
                        <img className="mx-2" src={LikeButton} alt="like button" />
                        {likeCountForRecipe}
                      </Button>
                    )
                  )}

                  <Button
                    className="btn btn-primary mx-1"
                    onClick={() => console.log("Comment button clicked")}
                  >
                    <img className="mx-2" src={CommentButton} alt="comment button" /> 1
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Recipe</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
      <Row className="mt-4">
        <Col>
          <label className="form-Label">Title: </label>
          <input className="form-control" type="text" value={formData.Title} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, Title: e.target.value}))} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <label className="form-Label">Instructions: </label>
          <input className="form-control" type="text" value={formData.Instructions} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, Instructions: e.target.value}))} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <label className="form-Label">Image Url: </label>
          <input className="form-control" type="text" value={formData.ImageUrl} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, ImageUrl: e.target.value}))} />
        </Col>
        <Col>
          <label className="form-Label">Category: </label>
          {/* <input className="form-control" type="text" value={formData.CategoryID} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, CategoryID: e.target.value}))} /> */}
          <select className="form-select" value={formData.CategoryID} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, CategoryID: e.target.value}))} >
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
         <input className="form-control" type="text" value={formData.UserID} hidden />
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
