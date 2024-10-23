import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import api from '../../../config/axios';
import { useNavigate } from 'react-router-dom';

function ViewKoi() {
    const [koiList, setKoiList] = useState([]); 
    const navigate = useNavigate();
// Call API LIST KOI
    useEffect(() => {
        const fetchKoiData = async () => {
            try {
                const response = await api.get("/kois/management");
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
  <h2>Danh sách cá koi</h2>
  <div className="d-flex flex-wrap koi-cards ">
    {koiList.map((koi) => (
      <div className="koi-card d-flex flex-column m-2" key={koi.koiId} style={{ width: '200px' }}>
        <img className="koi-image img-fluid" src={koi.image} alt={koi.name} />
        <h3>{koi.name}</h3>
        <p>Xuất xứ: {koi.origin}</p>
        <p>Giới tính: {koi.gender}</p>
        <p>Độ tuổi: {koi.age} năm</p>
        <p>Trọng lượng: {koi.weight} kg</p>
        <p>Kích thước: {koi.size} cm</p>
        <p>Tính cách: {koi.personality}</p>
        <p>Giá: ${koi.price}</p>
        <p>Trạng thái: {koi.status}</p>
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
