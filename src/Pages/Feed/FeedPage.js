import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Feed = () =>
{
    const [recipes, setRecipes] = useState([]);

  // Fetch recipes from the API
  const fetchRecipes = () => {
    axios
      .get('/Recipes/GetAll')
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        toast.error('Failed to load recipes');
      });
  };

  // Runs when the component is loaded
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    axios
      .delete(`/Recipes/Delete/${id}`)
      .then(() => {
        toast.success('Recipe deleted');
        fetchRecipes(); // Refresh data
      })
      .catch(() => {
        toast.error('Failed to delete recipe');
      });
  };

  return (
    <div className="container mt-4">
      <h1>Feed</h1>
      <Button variant="primary" href="/users/add">
        Add Recipe
      </Button>
      
      <Card style={{width:'auto'}} className="mt-5">
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            wsedrctfvybguhnijmewrdytfghuijm
            exdrcftvgybhunjimkexrdctfvygbhunijm
            sxrdctfvgybhunijmdcrftvgybhunjmk
            drcftvgbhnjcrftvgybhunjimk
          </Card.Text>
          <Card.Link href="#"><i class="bi bi-star"></i></Card.Link>
          <Card.Link href="#">Card Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Feed;