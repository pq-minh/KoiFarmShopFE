import { Button ,Breadcrumb} from 'antd'
import React, { useEffect, useState } from 'react'
import api from '../../../config/axios';
import { Link, useNavigate } from 'react-router-dom';
import Dashboard from '..';

function ViewKoi() {
    const [koiList, setKoiList] = useState([]); 
    const navigate = useNavigate();
// Call API LIST KOI
    useEffect(() => {
        const fetchKoiData = async () => {
            try {
                const response = await api.get("kois/management/get");
                setKoiList(response.data); 
            } catch (err) {
                console.log(err);
            }
        };

        fetchKoiData(); 
    }, []);
    // Navigate update
    const handleKoiId = (id) => {
         navigate(`/admin/updatekoi/${id}`);
    }
  return (

    <>
  <div className="koi-list">
  <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Dashboard</Link></Breadcrumb.Item>
        <Breadcrumb.Item>ViewKoi</Breadcrumb.Item>
    </Breadcrumb>
  <h2>View Koi List</h2>
  <div className="d-flex flex-wrap koi-cards ">
    {koiList.map((koi) => (
      <div className="koi-card d-flex flex-column m-2" key={koi.koiId} style={{ width: '200px' }}>
        <img className="koi-image img-fluid" src={koi.image} alt={koi.name} />
        <h3>{koi.name}</h3>
        <p>Origin: {koi.origin}</p>
        <p>Gender: {koi.gender}</p>
        <p>Age: {koi.age} năm</p>
        <p>Weight: {koi.weight} kg</p>
        <p>Size: {koi.size} cm</p>
        <p>Personality: {koi.personality}</p>
        <p>Price: ${koi.price}</p>
        <p>Status: {koi.status}</p>
        <Button
          onClick={() => handleKoiId(koi.koiId)}
        >
          Update
        </Button>
      </div>
    ))}
  </div>
</div>

    </>
  )
}

export default ViewKoi
