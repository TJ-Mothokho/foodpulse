import axios from "axios";
import React, {useState, useEffect, Fragment, useContext} from "react";
import { Row, Col, Form, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import apiClient, { apiEndpoints} from '../../Api/api';

const AddRecipe = () =>
  {
    const token = useSelector((state) => state.auth.token); 
    const userID = useSelector((state) => state.auth.userID); // Access userID
    const username = useSelector((state) => state.auth.username);
    const profilePicture = useSelector((state) => state.auth.profilePicture);

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

  const navigate = useNavigate();

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
  };
  
  useEffect(() => {
    getCategories();
}, []);
  //Need to dynamically add categories
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