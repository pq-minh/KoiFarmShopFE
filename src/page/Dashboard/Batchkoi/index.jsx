import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../../config/axios';
import { useNavigate } from 'react-router-dom';

function ViewBatchKoi() {
  const [batchKoiList, setKoiList] = useState([]);
  const navigate = useNavigate();

  // Call API LIST KOI
  useEffect(() => {
    const fetchKoiData = async () => {
      try {
        const response = await api.get("/batchkois/management/get");
        setKoiList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchKoiData();
  }, []);

  // Navigate update
  const handleKoiId = (id) => {
    navigate(`/admin/updatebatchkoi/${id}`);
  }

  return (
    <>
      <div className="koi-list">
        <h2>BatchKoi List</h2>
        <div className="d-flex flex-wrap koi-cards">
          {batchKoiList.map((koi) => (
            <div className="koi-card d-flex flex-column m-2" key={koi.batchKoiId} style={{ width: '200px' }}>
              <img className="koi-image img-fluid" src={koi.image} alt={koi.name} />
              <h3>{koi.name}</h3>
              <p>Description: {koi.description}</p>
              <p>Quantity: {koi.quantity}</p>
              <p>Gender: {koi.gender}</p>
              <p>Age: {koi.age !== null ? `${koi.age} years` : 'Undefined'}</p>
              <p>Weight: {koi.weight} kg</p>
              <p>Size: {koi.size} cm</p>
              <p>Origin: {koi.origin}</p>
              <p>Price: VND{koi.price}</p>
              <p>Status: {koi.status}</p>
              <Button onClick={() => handleKoiId(koi.batchKoiId)}>
                Update
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewBatchKoi;
