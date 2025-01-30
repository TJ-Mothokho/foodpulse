import React, {useState, useCallback, useEffect} from "react";
import { Button, Card, Modal, Row, Col, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearProfilePicture, clearRole, clearToken, clearUserID, clearUsername } from "../../Store/TokenStore";

const UserDetails = () =>
{
    const url = localStorage.getItem("apiUrl");
    const userID = useSelector((state) => state.auth.userID);
    const username = useSelector((state) => state.auth.username);
    const profilePicture = useSelector((state) => state.auth.profilePicture);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [followers, setFollowers] = useState('');
      const [followings, setFollowings] = useState('');
    
      useEffect(() => {
          handleFollowers();
          handleFollowings();
      
        }, []);
      
      const handleFollowers = async () => {
        if(userID != null) {
          await axios.get(url + '/Users/FollowersCount?userID=' + userID)
          .then((result) => {setFollowers(result.data)})
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

      // Logout handler
        const handleLogout = useCallback(() => {
          dispatch(clearToken());
          dispatch(clearUserID());
          dispatch(clearUsername());
          dispatch(clearRole());
          dispatch(clearProfilePicture());
          navigate("/");
        }, [dispatch, navigate]);

        const handleProfile = (id) => {
            navigate(`/Profile/${id}`)
        
          };
        
          const handleLikedPosts = async => {
            navigate('/LikedPosts/' + userID)
          };
    return(
        <div className="side-bar">
            {
              userID ? (
                <Card style={{ width: "auto" }} className="mt-3">
              <Card.Body>

                <Card.Title><a href="#" onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          handleProfile(userID); }} className="text-decoration-none"><img src={profilePicture} alt="profile" className="profile-icon" /> @{username}</a></Card.Title>
                {followers} Followers  {followings} Following
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
              ) : (
                <Card style={{ width: "auto" }} className="mt-3">
              <Card.Body>

                <Card.Title>Oops!</Card.Title>
                <div className="mb-3">It seems like you're not logged in!</div>
                Log In or Sign up to post those delicious recipes
                <div className="Sidebar-Nav">
                  <ul>
                      <div className="">
                          <Row className="mt-1">
                            <button className="btn btn-outline-primary mx-3 block" onClick={() => navigate('/login')} > Log In </button>
                          </Row>

                          <Row className="mt-1">
                            <button className="btn btn-primary mx-3 block" onClick={() => navigate('/register')} > Sign Up </button>
                          </Row>
                          </div>
                  </ul>
                </div>
              </Card.Body>
            </Card>
              )
            }
          </div>
    );
}
export default UserDetails;