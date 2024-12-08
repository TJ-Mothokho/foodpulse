import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { toast } from "react-toastify";

const UsersList = () =>
{
    const [data, setData] = useState('');

    useEffect(() =>
    {
        getUsers();
    },[])
    
    const getUsers = () =>
    {
        axios.get('https://localhost:7297/api/Users/GetAll')
        .then((result) =>{
            setData(result.data);
        })
        .catch((error) => toast.error("Error retrieving users"));
    }

    const handleView = (userID) =>
    {

    }

    const handleBlock = (userID) =>
    {
        if(window.confirm("Are you sure you want to block this user?") == true)
        {
            alert("Block feature coming soon...");
        }

        
    }
    return(
        //<CustomTable headers={['UserID', 'Username', 'Bio']} data={data} actions={(row) => <button className="btn btn-secondary">View</button>} />
        <Container className="mt-3">
            <Table striped vordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Bio</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                        data.map((items, index) =>
                        {
                            return(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{items.username}</td>
                                    <td>{items.bio}</td>
                                    <td colSpan={2}>
                                        <button className="btn btn-primary mx-2" onClick={() => handleView(items.userID)}>View</button>
                                        <button className="btn btn-danger" onClick={() => handleBlock(items.userID)}>Block</button>
                                    </td>
                                </tr>
                            );
                        })
                        :
                        'Loading...'
                    }
                </tbody>
            </Table>
        </Container>
    );
}
export default UsersList;
// <CustomTable headers={['ID', 'Name']} data={[{ ID: 1, Name: 'John' }]} actions={(row) => <Button>Edit</Button>} />