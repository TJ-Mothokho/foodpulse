import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient, { apiEndpoints } from "../../Api/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { clearProfilePicture, clearRole, clearToken, clearUserID, clearUsername } from "../../Store/TokenStore";
import axios from "axios";
import { Button, Card, Modal, Row, Col, Form, Container } from "react-bootstrap";
import './User.css';

const Profile = () => {
    const storeUserID = useSelector((state) => state.auth.userID);
    const url = localStorage.getItem('apiUrl');
    const [data, setData] = useState();
    const [recipes, setRecipes] = useState([]);
    const [likes, setLikes] = useState([]);
    const [likeCount, setLikeCount] = useState([]);

    const {userID} = useParams();

    const getUserDetail = async (id) => {
      await axios.get(url + '/Users/Get/' + id)
      .then((result) => 
      {setData(result.data);
        console.log(result.data);
      })
      .catch((error) => 
      {console.log(error)})
    }

    const getRecipesByUserID = async (id) => {
      await axios.get(url + '/Recipes/user/' + id)
      .then((result) => {setRecipes(result.data)})
      .catch((error) => {console.log(error)})
    };

    useEffect(() => {
       const fetchData = async () => {
        await getUserDetail(userID);
        await getRecipesByUserID(userID);
        await getLikesCount();
        await getLikes();
        await getFollowDetails();
        await handleFollowers();
        await handleFollowings();
        console.log('effect: ' + userID);
        console.log('store: ' + storeUserID);

       };

       fetchData();
      }, []);

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

      const handleDemo = () => {
        const num = 1;
      };

      const navigate = useNavigate();

      const handleProfile = (id) => {
        navigate(`/Profile/${id}`)
    
      };

      const followData = {
        'followerID': storeUserID,
        'userID': userID
      };

      const handleFollow = async () => {
            console.log('here1');     
            
              await axios.post(url + "/Users/Follow", followData)
              .then((result) => {toast.success("Followed!")})
              .catch ((error) => {console.log(error)})
            
      };

      const [followers, setFollowers] = useState([]);
const [isFollowed, setIsFollowed] = useState(false);

const getFollowDetails = async () => {
  try {
    const result = await axios.get(`${url}/Users/Followers?userID=${userID}`);
    setFollowers(result.data);

    // Check if storeUserID exists in the followers list
    const followed = result.data.some(follower => follower.userID === storeUserID);
    setIsFollowed(followed);
  } catch (error) {
    console.error(error);
  }
};

//checking followers
const [follower, setFollower] = useState('');
  const [followings, setFollowings] = useState('');

  const handleFollowers = async () => {
    if(userID != null) {
      await axios.get(url + '/Users/FollowersCount?userID=' + userID)
      .then((result) => {setFollower(result.data)})
      .catch((error) => {console.log(error)})
    };
  }

  const handleFollowings = async () => {
    if(userID != null) {
      await axios.get(url + '/Users/FollowingsCount?userID=' + userID)
      .then((result) => {setFollowings(result.data)})
      .catch((error) => {console.log(error)})
    };
  }

    return(
        <Container className="mt-3">
          {
            data ? (
              <div>
                <Card style={{ width: "auto" }} className="mt-3">
                  <Card.Body>
                    <Card.Title><img src={data.profilePicture} alt="Profile-Picture" className="profile-image"/> @{data.username}</Card.Title>
                    <Card.Subtitle className="mb-2 mt-2 text-muted">{data.bio}</Card.Subtitle>
                    <Card.Text><a href={data.website}>{data.website}</a></Card.Text>
                    <Card.Text className="member">Member since: {data.createdAt}</Card.Text>
                    {
                      follower == 1 ? (
                        <Card.Text>{follower} Follower   {followings} Following</Card.Text>
                      ) : (
                        <Card.Text>{follower} Followers   {followings} Following</Card.Text>
                      )
                    }
                    {
                      isFollowed ? (
                        <button onClick={(e) => handleFollow()} className="btn btn-outline-danger">Unfollow</button>
                      ) : (
                        <button onClick={(e) => handleFollow()} className="btn btn-primary">Follow</button>
                      )
                    }
                  </Card.Body>
                </Card>

                <hr/>

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
                        <Card.Title><a href="#" onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          handleProfile(item.userID);
        }}
 className="text-decoration-none"><img src={item.profilePicture} alt="profilePicture" className="profile-icon"/>@{item.userName}</a></Card.Title>
                        <hr/>
                        <Card.Subtitle className="mb-2 text-muted">{item.title}</Card.Subtitle>
                        <img src={item.image} alt="recipeImage" style={{width:"400px"}} className="food-image" />
                        <Row className="mt-3">
                          <hr/>
                          <Col>
                        {userID && (
                          isLiked ? (
                            <Button className="btn btn-primary mx-1" onClick={() => handleRemoveLike(item.recipeID)}> <img className="mx-2" src={handleDemo} alt="liked button" /> {likeCountForRecipe} </Button>
                          ) : (
                            <Button className="btn btn-primary mx-1" onClick={() => handleLike(item.recipeID)}> <img className="mx-2" src={handleDemo} alt="like button" /> {likeCountForRecipe} </Button>
                          )
                        )}

                        {/* <Button className="btn btn-primary mx-1" onClick={() => console.log("Comment button clicked")} > */}
                          <a href={handleDemo}> <img className="mx-2" src={handleDemo} alt="comment button" /> 1 </a>
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
              ) 
            : 
            (<p>loading</p>)
          }
        </Container>
    );
}

export default Profile;