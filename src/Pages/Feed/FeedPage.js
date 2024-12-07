import React, { useState, useEffect, Fragment } from "react";
import apiClient from '../../api/axiosConfig';
import CustomTable from '../../components/Table';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Feed = () =>
{
    const [recipes, setRecipes] = useState([]);

  // Fetch recipes from the API
  const fetchRecipes = () => {
    apiClient
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
    apiClient
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
      <CustomTable
        headers={['RecipeID', 'Title', 'UserName', 'ProfilePicture']}
        data={recipes}
        actions={(row) => (
          <>
            <Button variant="info" className="mx-1">
              Edit
            </Button>
            <Button
              variant="danger"
              className="mx-1"
              onClick={() => handleDelete(row.ID)}
            >
              Delete
            </Button>
          </>
        )}
      />
    </div>
  );
}

export default Feed;