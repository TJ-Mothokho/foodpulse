import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import addIcon from "../../Components/Images/plus-circle.svg";
import LikeButton from '../../Components/Images/heart.svg';
import LikedButton from '../../Components/Images/heart-fill.svg';
import CommentButton from '../../Components/Images/chat.svg';
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
    const [recipes, setRecipes] = useState([]);

    // Fetch recipes from the API
    const getRecipes = () => {
        axios
            .get("https://localhost:7297/api/Recipes/GetAll")
            .then((response) => {
                setRecipes(response.data);
            })
            .catch((error) => {
                toast.error("Failed to load recipes");
                console.error(error); // For debugging
            });
    };

    // Runs when the component is loaded
    useEffect(() => {
        getRecipes();
    }, []);

    // Handle delete action
    const handleDelete = (id) => {
        axios
            .delete(`https://localhost:7297/api/Recipes/Delete/${id}`)
            .then(() => {
                toast.success("Recipe deleted");
                getRecipes(); // Refresh data
            })
            .catch((error) => {
                toast.error("Failed to delete recipe");
                console.error(error); // For debugging
            });
    };

    const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

    return (
        <div className="container mt-4">
            <h1>Feed</h1>
            <Button variant="primary" href="/Recipe/add">
                <img src={addIcon} alt="Add" /> Add Recipe
            </Button>
            <div>
                {recipes && recipes.length > 0 ? (
                    recipes.map((item, index) => (
                        <Card style={{ width: "auto" }} className="mt-3" key={index}>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>{item.instructions}</Card.Text>
                                <Card.Link href="#"><img className='mx-2' src={LikeButton} alt="like button" /></Card.Link>
                                <Card.Link href="#"><img className='mx-2' src={CommentButton} alt="comment button" /></Card.Link>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Feed;
