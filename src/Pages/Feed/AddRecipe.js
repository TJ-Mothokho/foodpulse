import axios from "axios";
import React, {useState, useEffect, Fragment} from "react";
import { Row, Col, Form, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddRecipe = () =>
{
  const [formData, setFormData] = useState({
    Title: '',
    Instructions: '',
    ImageUrl: '',
    UserID: '',
    CategoryID: ''
  });

  const navigate = useNavigate();

  const handleSave = () =>
  {
    alert("In Save Handle")
    axios.post('https://localhost:7297/api/Recipes/Add', formData)
     .then((response) => alert(response))
     .catch((error) => alert(error));
     navigate('/')
  };

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
        <Col>
        <label className="form-Label">User ID: </label>
        <input className="form-control" type="text" value={formData.UserID} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, UserID: e.target.value}))} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <label className="form-Label">Image Url: </label>
          <input className="form-control" type="text" value={formData.ImageUrl} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, ImageUrl: e.target.value}))} />
        </Col>
        <Col>
        <label className="form-Label">Category ID: </label>
        <input className="form-control" type="text" value={formData.CategoryID} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, CategoryID: e.target.value}))} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <label className="form-Label">Instructions: </label>
          <input className="form-control" type="textarea" value={formData.Instructions} onChange={(e) => setFormData((prevFormData) => ({...prevFormData, Instructions: e.target.value}))} />
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