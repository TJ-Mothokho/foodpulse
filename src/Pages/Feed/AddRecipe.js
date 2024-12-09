import axios from "axios";
import React, {useState, useEffect, Fragment, useContext} from "react";
import { Row, Col, Form, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddRecipe = () =>
  {
    const token = useSelector((state) => state.auth.token); 
    const userID = useSelector((state) => state.auth.userID); // Access userID
    const username = useSelector((state) => state.auth.username);
    const profilePicture = useSelector((state) => state.auth.profilePicture);

    const [categories, setCategories] = useState('');

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

  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Ensure `UserID` and `CategoryID` are properly set
    const data = {
      Title: formData.Title,
      Instructions: formData.Instructions,
      ImageUrl: formData.ImageUrl,
      UserID: userID, // Fetch UserID from state
      CategoryID: formData.CategoryID, // Make sure this is set correctly
      Hashtags: formData.Hashtag, // Note: match case with API expectation
    };
  
    // Log data for debugging
    console.log(data);
  
    // Send POST request
    axios
      .post('https://localhost:7297/api/Recipes/Add', data)
      .then((response) => {
        toast.success('Recipe added successfully!');
        navigate('/');
      })
      .catch((error) => {
        console.error(error.response?.data || error.message); // Log detailed error
        toast.error('Failed to add recipe.');
      });
  };
  

  //Need to dynamically add categories
  const getCategories = () =>
  {
    axios.post('https://localhost:7297/api/Categories/GetAll')
     .then((response) => alert(response))
     .catch((error) => alert(error));
  }

  return(
    <Container>
      <div>
        <h2 className="display-2 text-center mt-3 mb-3">Add New Recipe</h2>
        <hr/>
      </div>
      <Form>
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
          <label className="form-Label">Category ID: </label>
          {/* <input className="form-control" type="text" value={formData.CategoryID} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, CategoryID: e.target.value}))} /> */}
          <select className="form-select" value={formData.CategoryID} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, CategoryID: e.target.value}))} >
            <option value=''>Select an option...</option>
            <option value='0180cd0a-0adb-49a5-bfb0-08dd167945ba'>Breakfast</option>
            <option value='6963bf08-83f5-4f6c-94d3-08dd1895a605'>Brunch</option>
            <option value='9c650193-5599-4088-94d5-08dd1895a605'>Dinner</option>
            <option value='f6df7ac5-fd49-4c4d-94d4-08dd1895a605'>Lunch</option>
            <option value='e99365a1-e06c-45ac-94d6-08dd1895a605'>Snack</option>
          </select>
        </Col>
      </Row>

      <Row>
        <Col>
         <input className="form-control" type="text" value={formData.UserID} hidden />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <button className="btn btn-primary" onClick={handleSave}>Add</button>
        </Col>
      </Row>

      </Form>
    </Container>
  );
}

export default AddRecipe;