import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class OrderChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedOrders: 0,
      pendingOrders: 0,
      totalOrders: 0,
      startDate: '',
      endDate: '',
      isLoading: true,
      noOrders: false
    };
  }

  // Hàm gọi API với startDate và endDate
  fetchData = () => {
    const { startDate, endDate } = this.state;

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates."); // Sử dụng toast cho thông báo lỗi
      return;
    }

    // Đặt lại dữ liệu trước khi gọi API
    this.setState({
      completedOrders: 0,
      pendingOrders: 0,
      totalOrders: 0,
      isLoading: true,
      noOrders: false
    });

    const completedUrl = `http://localhost:5167/api/orders/management/completed?startDate=${startDate}&endDate=${endDate}`;
    const pendingUrl = `http://localhost:5167/api/orders/management/pending?startDate=${startDate}&endDate=${endDate}`;

    Promise.all([
      fetch(completedUrl)
        .then(res => {
          if (!res.ok) {
            // Kiểm tra nếu response không phải là JSON hợp lệ
            return res.text(); // Trả về chuỗi văn bản nếu không phải JSON
          }
          return res.json(); // Phân tích nếu là JSON
        }),
      fetch(pendingUrl)
        .then(res => {
          if (!res.ok) {
            // Kiểm tra nếu response không phải là JSON hợp lệ
            return res.text(); // Trả về chuỗi văn bản nếu không phải JSON
          }
          return res.json(); // Phân tích nếu là JSON
        })
    ])
    .then(([completedData, pendingData]) => {
      // Kiểm tra dữ liệu trả về nếu là chuỗi thông báo
      if (typeof completedData === 'string' || typeof pendingData === 'string') {
        // Hiển thị thông báo nếu không có order
        toast.info("Chưa có order trong khoảng thời gian này.");
        this.setState({
          noOrders: true,
          isLoading: false
        });
        return;
      }

      const completedOrders = Number(completedData) || 0;
      const pendingOrders = Number(pendingData) || 0;
      const totalOrders = completedOrders + pendingOrders;

      if (totalOrders === 0) {
        this.setState({
          noOrders: true,
          isLoading: false
        });
        toast.info("Chưa có order trong khoảng thời gian này.");
      } else {
        this.setState({
          completedOrders: completedOrders,
          pendingOrders: pendingOrders,
          totalOrders: totalOrders,
          isLoading: false
        });
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      this.setState({ isLoading: false });
      toast.error("Error fetching data. Please try again later.");
    });
}


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { completedOrders, pendingOrders, totalOrders, startDate, endDate, isLoading, noOrders } = this.state;

    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light1",
      title: {
        text: "Order Management"
      },
      data: [{
        type: "pie",
        indexLabel: "{label}: {y}",
        startAngle: -90,
        dataPoints: [
          { y: totalOrders, label: "Total Orders" },
          { y: completedOrders, label: "Completed" },
          { y: pendingOrders, label: "Pending" }
        ]
      }]
    };

    return (
      <div>
        <div>
          <label>
            Start Date:
            <input 
              type="date" 
              name="startDate" 
              value={startDate} 
              onChange={this.handleChange}
            />
          </label>
          <label>
            End Date:
            <input 
              type="date" 
              name="endDate" 
              value={endDate} 
              onChange={this.handleChange}
            />
          </label>
          <button onClick={this.fetchData}>Search</button>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          noOrders ? (
            <div>Chưa có order trong khoảng thời gian này.</div>
          ) : (
            <CanvasJSChart options={options} />
          )
        )}

        <ToastContainer />
      </div>
    );
  }
}

export default OrderChart;
