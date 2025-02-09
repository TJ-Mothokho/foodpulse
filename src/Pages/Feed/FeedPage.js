import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Button, Card, Modal, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import LikeButton from "../../Components/Images/heart.svg";
import LikedButton from "../../Components/Images/heart-fill.svg";
import CommentButton from "../../Components/Images/chat.svg";
import apiClient, { apiEndpoints } from "../../Api/api";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import axios from "axios";
import UserDetails from "../Users/UserDetails";
import Search from "./Search";
import { useSelector } from "react-redux";

const Feed = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [likeCount, setLikeCount] = useState([]);

  const [users, setUsers] = useState([]);

  const userID = useSelector((state) => state.auth.userID);

  const navigate = useNavigate();
  const url = localStorage.getItem("apiUrl");

  // const recipesRef = useRef(null); // Ref to avoid unnecessary re-renders when recipes are updated

  // // Memoize computed values for performance optimization
  // const sortedRecipes = useMemo(() => recipes.slice().sort((a, b) => b.timestamp - a.timestamp), [recipes]);

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
    getRecipes();
    getLikesCount();
    getLikes();

    const cachedUsers = localStorage.getItem("users");
    if (cachedUsers) {
      setUsers(JSON.parse(cachedUsers));
    } else {
      getUsers();
    }
  }, [getRecipes, getLikes, getLikesCount]);

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
        await apiClient.post(
          apiEndpoints.like + `userID=${userID}&recipeID=${recipeID}`
        );
        setLikes((prevLikes) => [...prevLikes, { recipeID, isLiked: true }]);
        updateLikeCount(recipeID, 1);
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
        await apiClient.post(
          apiEndpoints.removeLike + `userID=${userID}&recipeID=${recipeID}`
        );
        setLikes((prevLikes) =>
          prevLikes.filter(
            (like) => like.recipeID !== recipeID || !like.isLiked
          )
        );
        updateLikeCount(recipeID, -1);
      } catch (error) {
        toast.error("Failed to remove like");
        console.error(error);
      }
    },
    [userID]
  );

  const handleProfile = (id) => {
    navigate(`/Profile/${id}`);
  };

  const getRecipeLikeCount = (recipeID) => {
    const countItem = likeCount.find((count) => count.recipeID === recipeID);
    return countItem ? countItem.likeCount : 0; // Return 0 if no match
  };

  // Function to update like count locally
  const updateLikeCount = (recipeID, increment) => {
    setLikeCount((prevLikeCount) =>
      prevLikeCount.map((count) =>
        count.recipeID === recipeID
          ? { ...count, likeCount: count.likeCount + increment }
          : count
      )
    );
  };

  const handleSearch = async (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    getUsers();
    // localStorage.setItem('users', JSON.stringify(users));
  };

  const handleCardClick = (title, instructions) => {
    // Display an alert with additional recipe details
    alert(`Title: ${title} \n Instructions: \n ${instructions}`);
  };

  const [showComment, setShowComment] = useState(false);

  const handleCloseComment = () => setShowComment(false);
  const handleShowComment = () => setShowComment(true);

  return (
    <div className="container mt-4">
      <Row>
        <Col className="col-3">
          <UserDetails />
        </Col>

        {/* Main Feed */}
        <Col className="col-6">
          <div className="main-section">
            <div className="heading">
              <h1>Food Pulse</h1>
            </div>
            <div className="main-feed-section">
              {recipes && recipes.length > 0 ? (
                recipes.map((item, index) => {
                  const isLiked = likes.some(
                    (like) => like.recipeID === item.recipeID && like.isLiked
                  );
                  const likeCountForRecipe = getRecipeLikeCount(item.recipeID);

                  return (
                    <Card
                      style={{ width: "auto" }}
                      className="mt-3"
                      key={index}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <Card.Body>
                        <Card.Title>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault(); // Prevent default anchor behavior
                              handleProfile(item.userID);
                            }}
                            className="text-decoration-none"
                          >
                            <img
                              src={item.profilePicture}
                              alt="profilePicture"
                              className="profile-icon"
                            />
                            @{item.userName}
                          </a>
                        </Card.Title>
                        <hr />
                        <div
                          onClick={(e) =>
                            handleCardClick(item.title, item.instructions)
                          }
                        >
                          <Card.Subtitle className="mb-2 text-muted">
                            {item.title}
                          </Card.Subtitle>
                          <img
                            src={item.image}
                            alt="recipeImage"
                            style={{ width: "400px" }}
                            className="food-image"
                          />
                        </div>

                        <Row className="mt-3">
                          <hr />

                          <Col>
                            {userID &&
                              (isLiked ? (
                                <div>
                                  <img
                                    className="mx-2"
                                    src={LikedButton}
                                    alt="liked button"
                                    onClick={() =>
                                      handleRemoveLike(item.recipeID)
                                    }
                                  />{" "}
                                  {likeCountForRecipe} |
                                  <img
                                    className="mx-2"
                                    src={CommentButton}
                                    alt="comment button"
                                    onClick={handleShowComment}
                                  />
                                </div>
                              ) : (
                                <div>
                                  <img
                                    className="mx-2"
                                    src={LikeButton}
                                    alt="like button"
                                    onClick={() => handleLike(item.recipeID)}
                                  />{" "}
                                  {likeCountForRecipe} |
                                  <img
                                    className="mx-2"
                                    src={CommentButton}
                                    alt="comment button"
                                    onClick={handleShowComment}
                                  />
                                </div>
                              ))}

                            {/* <Button className="btn btn-primary mx-1" onClick={() => console.log("Comment button clicked")} > */}

                            {/* </Button> */}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  );
                })
              ) : (
                <div>
                  <div class="card" aria-hidden="true">
                    <img src="..." class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title placeholder-glow">
                        <span class="placeholder col-6"></span>
                      </h5>
                      <p class="card-text placeholder-glow">
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-8"></span>
                      </p>
                      <a
                        class="btn btn-primary disabled placeholder col-6 "
                        aria-disabled="true"
                      ></a>
                    </div>
                  </div>
                </div> //end
              )}
            </div>
          </div>
        </Col>

        <Col className="col-3">
          <Search />
        </Col>
      </Row>

      <Modal show={showComment} onHide={handleCloseComment}>
        <Modal.Header closeButton>
          <Modal.Title>Add a comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="form-label">Comment:</label>
          <textarea className="form-control" type="text"></textarea>
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
