import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient, { apiEndpoints } from "../../Api/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { clearProfilePicture, clearRole, clearToken, clearUserID, clearUsername } from "../../Store/TokenStore";
import axios from "axios";

const Profile = () => {
    const storeUserID = useSelector((state) => state.auth.userID);
    const [data, setData] = useState();

    const {userID} = useParams();

    const getUserDetail = (id) => {
      axios.get('https://localhost:7297/api/Users/Get/' + id)
      .then((result) => 
      {setData(result.data);
        console.log(result.data);
      })
      .catch((error) => 
      {console.log(error)})
    }

    useEffect(() => {
        getUserDetail(userID);
        console.log('effect: ' + userID);
      }, []);

    return(
        <div>Hello: {data.username}</div>
    );
}

export default Profile;