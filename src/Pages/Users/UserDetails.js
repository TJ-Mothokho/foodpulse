import React, {useState, useCallback, useEffect} from "react";
import { Button, Card, Modal, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import addIcon from '../../Components/Images/plus-circle.svg'
import { clearProfilePicture, clearRole, clearToken, clearUserID, clearUsername } from "../../Store/TokenStore";
import Feed from "../Feed/FeedPage";
import { toast } from "react-toastify";

const UserDetails = () =>
{
    const url = localStorage.getItem("apiUrl");
    const storeUserID = useSelector((state) => state.auth.userID);
    const username = useSelector((state) => state.auth.username);
    const profilePicture = useSelector((state) => state.auth.profilePicture);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [followers, setFollowers] = useState('');
    const [followings, setFollowings] = useState('');

    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [steps, setSteps] = useState([""]);
    const [title, setTitle] = useState("");
    const [instructions, setInstructions] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [image, setImage] = useState(null);
    
    
    
      
    const handleFollowers = useCallback(async () => {
      if(storeUserID != null) {
        await axios.get(url + '/Users/FollowersCount?userID=' + storeUserID)
        .then((result) => {setFollowers(result.data)})
        .catch((error) => {console.log(error)})
      };
    }, [storeUserID, url]);
  
    const handleFollowings = useCallback(async () => {
      if(storeUserID != null) {
        await axios.get(url + '/Users/FollowingsCount?userID=' + storeUserID)
        .then((result) => {setFollowings(result.data)})
        .catch((error) => {console.log(error)})
      };
    }, [storeUserID, url]);

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
      
    const handleLikedPosts = async () => {
      navigate('/LikedPosts/' + storeUserID)
    };

    //Form
    const handleImageChange = (event) => {
      setImage(event.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const allSteps = steps.join("\n");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructions", allSteps);
    formData.append("userID", storeUserID);
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

    window.location.reload();
  };

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

  // Fetch categories
  const getCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Categories/GetAll`) ;
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [url]);

  // Handle modal visibility
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    handleFollowers();
    handleFollowings();
    getCategories();

  }, [getCategories, handleFollowers, handleFollowings]);

          
  return(
    <div className="side-bar">
      {
        storeUserID ? (
          <div>
            <Card style={{ width: "auto" }} className="mt-3">
        <Card.Body>

          <Card.Title><a href="#" onClick={(e) => {
    e.preventDefault(); // Prevent default anchor behavior
    handleProfile(storeUserID); }} className="text-decoration-none"><img src={profilePicture} alt="profile" className="profile-icon" /> @{username}</a></Card.Title>
          {followers} Followers  {followings} Following
          <div className="Sidebar-Nav">
            <ul>
                <div className="">
                  <Row className="mt-1">
                    <button className="btn btn-primary mx-3 block" onClick={handleShow} >Add Recipe</button>
                  </Row>

                  <Row className="mt-1">
                    <button className="btn btn-outline-secondary mx-3 block" onClick={handleProfile} > Profile </button>
                  </Row>

                  <Row className="mt-1">
                    <button className="btn btn-outline-secondary mx-3 block" onClick={handleLikedPosts} > Liked Posts </button>
                  </Row>

                  <Row className="mt-1">
                    <button className="btn btn-outline-danger mx-3 block" onClick={handleLogout} > Log out </button>
                  </Row>
                </div>
            </ul>
          </div>
        </Card.Body>
      </Card>
          </div>
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
          <input className="form-control" type="text" value={storeUserID} hidden />
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
}
export default UserDetails;