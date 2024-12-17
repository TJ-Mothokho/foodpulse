import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (userID == null || userID == '') {
      navigate('/login')
    }
    else{
      getRecipes();
      getLikesCount();
      getLikes();
    }
  }, []);

  // Fetch data from the API
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
    try{
      const response = await apiClient.get(apiEndpoints.getLikesCount);
      setLikeCount(response.data);
    } catch (error) {
      toast.error("Failed to load like count");
    }
  }

  

  // Handle like action
  const handleLike = async (recipeID) => {
    try {
      await apiClient.post(apiEndpoints.like + `userID=${userID}&recipeID=${recipeID}`);
      setLikes((prevLikes) => [...prevLikes, { recipeID, isLiked: true }]);
    } catch (error) {
      toast.error("Failed to like");
      console.error(error);
    }
  };

  // Handle remove like action
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

  const handleComment = (recipeID) => {
    // Handle comment logic
  };

  // Check if the recipe is liked and get its like count
const getRecipeLikeCount = (recipeID) => {
  const countItem = likeCount.find((count) => count.recipeID === recipeID);
  return countItem ? countItem.likeCount : 0; // Return 0 if no match
};

return (
  <div className="container mt-4">
    <h1>Feed</h1>
    <Button variant="primary" href="/Recipe/add">
      <img src={addIcon} alt="Add" /> Add Recipe
    </Button>
    <div>
      {recipes && recipes.length > 0 ? (
        recipes.map((item, index) => {
          // Check if the current recipe is liked by the user
          const isLiked = likes.some(
            (like) => like.recipeID === item.recipeID && like.isLiked
          );
          const likeCountForRecipe = getRecipeLikeCount(item.recipeID); // Get the like count

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
                  onClick={() => handleComment(item.recipeID)}
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
  </div>
);
};

export default Feed;
