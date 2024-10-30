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

  const handleKoiDetailClick = async (koiId) => {
    try {
      const response = await api.get(`/kois/${koiId}`); // Ensure this endpoint is correct
      setSelectedKoiDetail(response.data);
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
          <Link to="/feedback">
            <Button type="primary">Update Feedback</Button>
          </Link>
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

      {/* Button to navigate to Submit Feedback */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/submit-feedback">
          <Button type="primary">Submit Feedback</Button>
        </Link>
      </div>

      {/* Modal to show koi fish details */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedKoiDetail && (
          <div className="koi-detail-modal">
            <h3>Koi Details</h3>
            <div className="image-container">
              <img
                src={selectedKoiDetail.image}
                alt={selectedKoiDetail.name}
                className="koi-image"
              />
            </div>
            <div className="info-container">
              <div className="info-fields">
                <div className="info-field"><strong>Koi Name:</strong> {selectedKoiDetail.name}</div>
                <div className="info-field"><strong>Type:</strong> {selectedKoiDetail.typeFish}</div>
                <div className="info-field"><strong>Origin:</strong> {selectedKoiDetail.origin}</div>
                <div className="info-field"><strong>Description:</strong> {selectedKoiDetail.description}</div>
                <div className="info-field"><strong>Gender:</strong> {selectedKoiDetail.gender}</div>
                <div className="info-field"><strong>Age:</strong> {selectedKoiDetail.age} years</div>
                <div className="info-field"><strong>Weight:</strong> {selectedKoiDetail.weight} kg</div>
                <div className="info-field"><strong>Size:</strong> {selectedKoiDetail.size} cm</div>
                <div className="info-field"><strong>Personality:</strong> {selectedKoiDetail.personality}</div>
                <div className="info-field"><strong>Status:</strong> {selectedKoiDetail.status}</div>
                <div className="info-field"><strong>Price:</strong> ${selectedKoiDetail.price}</div>
                <div className="info-field"><strong>Certificate:</strong> {selectedKoiDetail.certificate}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllFeedback;
