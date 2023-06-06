import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import List from "../components/lists/Lists";
import axiosInstance from "../api/axios";
import { Container } from "react-bootstrap";
const UsersPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/user");
      setData(response.data);
    } catch (error) {
      setError({
        statusCode: error.response.data.statusCode,
        message: error.response.data.message,
      });
    }
  };

  const handleAddZookeeper = async (userId) => {
    try {
      await axiosInstance.patch(`/api/user/${userId}/role/zookeeper`);
      console.log("added");
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />

      {error ? (
        <Container className="text-center">
          <h1>{error.statusCode}</h1>
          <p>{error.message}</p>
        </Container>
      ) : (
        <List data={data} handleAddZookeeper={handleAddZookeeper} />
      )}
    </>
  );
};

export default UsersPage;
