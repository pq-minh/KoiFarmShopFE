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
        const response = await api.get("/batchkois/management");
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
        <h2>Danh sách cá koi</h2>
        <div className="d-flex flex-wrap koi-cards">
          {batchKoiList.map((koi) => (
            <div className="koi-card d-flex flex-column m-2" key={koi.batchKoiId} style={{ width: '200px' }}>
              <img className="koi-image img-fluid" src={koi.image} alt={koi.name} />
              <h3>{koi.name}</h3>
              <p>Mô tả: {koi.description}</p>
              <p>Số lượng: {koi.quantity}</p>
              <p>Giới tính: {koi.gender}</p>
              <p>Độ tuổi: {koi.age !== null ? `${koi.age} năm` : 'Chưa xác định'}</p>
              <p>Trọng lượng: {koi.weight} kg</p>
              <p>Kích thước: {koi.size} cm</p>
              <p>Xuất xứ: {koi.origin}</p>
              <img className="koi-image img-fluid" src={koi.certificate} alt={koi.certificate}/>
              <p>Giá: ${koi.price}</p>
              <p>Trạng thái: {koi.status}</p>
              <Button onClick={() => handleKoiId(koi.batchKoiId)}>
                Cập nhật
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewBatchKoi;
