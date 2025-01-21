import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient, { apiEndpoints } from "../../Api/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { clearProfilePicture, clearRole, clearToken, clearUserID, clearUsername } from "../../Store/TokenStore";
import axios from "axios";

const Profile = () => {
    const storeUserID = useSelector((state) => state.auth.userID);
    const url = localStorage.getItem('apiUrl')
    const [data, setData] = useState();

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

    useEffect(async () => {
        await getUserDetail(userID);
        console.log('effect: ' + userID);
      }, []);

    return(
        <div>Hello: </div>
    );
}

export default Profile;