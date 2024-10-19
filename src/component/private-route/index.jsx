import { useState,useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const PrivateRoute = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role; // Giả sử token có trường 'role'

      // Kiểm tra xem vai trò của người dùng có nằm trong danh sách vai trò được phép không
      if (!allowedRoles.includes(userRole)) {
        navigate("/unauthorized"); // Hoặc trang khác khi không có quyền
        return;
      }

      setIsLoading(false); // Token hợp lệ và có quyền truy cập
    } catch (error) {
      navigate("/login"); // Nếu có lỗi khi giải mã token
    }
  }, [navigate, allowedRoles]);

  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị khi đang xác thực
  }

  return <Outlet />;
};

export default PrivateRoute;
