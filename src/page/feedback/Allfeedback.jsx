import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import Stars from 'react-stars';
import api from "../../config/axios";
import './Allfeedback.scss';
import Header from '../../component/header';
import Modal from '../../component/Modal/modal';

const AllFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedKoiDetail, setSelectedKoiDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      const response = await api.get('/reviews');
      setFeedbackData(response.data);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  const handleKoiDetailClick = async (koiId, batchKoiId = null) => {
    try {
      const response = await api.get("/koisandbatchkois/guest/id", {
        params: {
          koiId: koiId || undefined,
          batchKoiId: batchKoiId || undefined,
        },
      });

      if (response.data.koi) {
        setSelectedKoiDetail({
          type: "koi",
          data: response.data.koi,
        });
      } else if (response.data.batchKoi) {
        setSelectedKoiDetail({
          type: "batchKoi",
          data: response.data.batchKoi,
        });
      }

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching koi details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedKoiDetail(null);
  };

  const feedbackColumns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Koi Name',
      key: 'name',
      render: (text, record) => {
        return record.batchKoiId ? record.batchKoiName : record.koiName;
      },
    },
    {
      title: 'Image',
      key: 'image',
      render: (text, record) => {
        const imageUrl = record.batchKoiId ? record.batchKoiImage : record.koiImage;
        return <img src={imageUrl} alt={record.batchKoiId ? record.batchKoiName : record.koiName} style={{ width: '50px', height: 'auto' }} />;
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (text) => <Stars count={5} value={text} edit={false} size={24} color2="#f39c12" />,
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <>
          {isLoggedIn && (
            <Link to="/submit-feedback">
              <Button type="primary">Update Feedback</Button>
            </Link>
          )}
          <Button type="link" onClick={() => handleKoiDetailClick(record.koiId)}>View Detail</Button>
        </>
      ),
    },
  ];

  return (
    <div className="all-feedback">
      <Header setIsLoggedIn={setIsLoggedIn} />
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All Feedback</h2>
      <Table columns={feedbackColumns} dataSource={feedbackData} rowKey="id" pagination={{ pageSize: 5 }} />

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/submit-feedback">
          <Button type="primary">Submit Feedback</Button>
        </Link>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedKoiDetail && (
            <div className="koi-detail-modal">
              <h3>{selectedKoiDetail.type === "koi" ? "Koi Details" : "Batch Koi Details"}</h3>
              <div className="image-container">
                <img
                  src={selectedKoiDetail.data.image || "placeholder.jpg"}
                  alt={selectedKoiDetail.data.name || "No Image"}
                  className="koi-image"
                />
              </div>
              <div className="info-container">
                {selectedKoiDetail.type === "koi" ? (
                  <>
                    <div className="info-field"><strong>Name:</strong> {selectedKoiDetail.data.name}</div>
                    <div className="info-field"><strong>Type:</strong> {selectedKoiDetail.data.typeFish || "N/A"}</div>
                    <div className="info-field"><strong>Origin:</strong> {selectedKoiDetail.data.origin}</div>
                    <div className="info-field"><strong>Description:</strong> {selectedKoiDetail.data.description}</div>
                    <div className="info-field"><strong>Gender:</strong> {selectedKoiDetail.data.gender}</div>
                    <div className="info-field"><strong>Age:</strong> {selectedKoiDetail.data.age} years</div>
                    <div className="info-field"><strong>Weight:</strong> {selectedKoiDetail.data.weight} kg</div>
                    <div className="info-field"><strong>Size:</strong> {selectedKoiDetail.data.size} cm</div>
                    <div className="info-field"><strong>Personality:</strong> {selectedKoiDetail.data.personality}</div>
                    <div className="info-field"><strong>Status:</strong> {selectedKoiDetail.data.status}</div>
                    <div className="info-field"><strong>Price:</strong> ${selectedKoiDetail.data.price}</div>
                    <div className="info-field"><strong>Certificate:</strong> {selectedKoiDetail.data.certificate || "N/A"}</div>
                  </>
                ) : (
                  <>
                    <div className="info-field"><strong>Batch Name:</strong> {selectedKoiDetail.data.name}</div>
                    <div className="info-field"><strong>Description:</strong> {selectedKoiDetail.data.description || "N/A"}</div>
                    <div className="info-field"><strong>Quantity:</strong> {selectedKoiDetail.data.quantity}</div>
                    <div className="info-field"><strong>Weight:</strong> {selectedKoiDetail.data.weight} kg</div>
                    <div className="info-field"><strong>Size:</strong> {selectedKoiDetail.data.size} cm</div>
                    <div className="info-field"><strong>Age:</strong> {selectedKoiDetail.data.age} years</div>
                    <div className="info-field"><strong>Origin:</strong> {selectedKoiDetail.data.origin}</div>
                    <div className="info-field"><strong>Gender:</strong> {selectedKoiDetail.data.gender}</div>
                    <div className="info-field"><strong>Status:</strong> {selectedKoiDetail.data.status}</div>
                    <div className="info-field"><strong>Price:</strong> ${selectedKoiDetail.data.price}</div>
                    <div className="info-field"><strong>Certificate:</strong> {selectedKoiDetail.data.certificate || "N/A"}</div>
                    <div className="info-field"><strong>Type Batch:</strong> {selectedKoiDetail.data.typeBatch}</div>
                  </>
                )}
              </div>
            </div>
          )}
        </Modal>
    </div>
  );
};

export default AllFeedback;
