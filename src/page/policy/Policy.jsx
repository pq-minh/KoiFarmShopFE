import React,{useState} from 'react'
import Header from "../../component/header";
import "./Policy.css"
const Policy = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='policy-page'>
        <Header setIsLoggedIn={setIsLoggedIn}/>
          <div className="privacy-policy">
      <h1>Chính Sách Bảo Mật và Quyền Riêng Tư</h1>
      <p><strong>Cập nhật lần cuối:</strong> 06 tháng 11, 2024</p>

      <section>
        <h2 className='text-title'>1. Giới thiệu</h2>
        <p>
          Chúng tôi, Koi Farm Shop, cam kết bảo vệ quyền riêng tư và bảo mật thông tin cá nhân của người dùng.
          Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn khi bạn sử dụng dịch vụ của chúng tôi.
        </p>
        <p>
          Vui lòng đọc kỹ Chính sách bảo mật này để hiểu rõ hơn về quyền lợi của bạn và cách chúng tôi xử lý thông tin của bạn.
        </p>
      </section>
    
    
      <section>
        <h2 className='text-title'>2. Về các dịch vụ của Koi Farm Shop</h2>
        <h3>-Về dịch vụ ký gửi cá koi</h3>
        <p>+Shop chúng tôi chỉ cho phép ký gửi cá koi, không nhận ký gửi lô cá koi</p>
        <p>+Sau khi bạn ký gửi cá koi, nhân viên của chúng tôi sẽ quyết định giá của Koi mà bạn gửi</p>
        <p>+Trong thời gian koi chưa được duyệt, bạncó thể từ chối việc ký gửi của mình bất cứ lúc nào</p>
        <p>+Nếu giá cá koi của chúng tôi đưa ra không hợp lý đối với bạn , thì bạn có thể từ chối đơn ký gửi đó </p>
        <p>+Chúng tôi chỉ cho phép ký gửi cá trong khoản thời gian 60 ngày tính từ ngày bắt đầu ký gửi</p>
        <h3>-Về phí phụ thu ký gửi cá koi</h3>
        <p>+Đối với cá trong khoảng giá từ 100.000-600.000VND thì phí phụ thu là 20k</p>
        <p>+Đối với cá trong khoảng giá từ 600.000-1.000.000VND thì phí phụ thu là 50k</p>
        <p>+Đối với cá trong khoảng giá từ 1.000.000-2.000.000VND thì phí phụ thu là 100k</p>
        <p>+Nếu giá trị của koi lớn hơn thì chúng tôi sẽ liên hệ trực tiếp với khách hàng</p>
        <h3>-Về dịch vụ ký gửi cá sau khi mua</h3>
        <p>+Sau khi mua cá , bạn có thể ký gửi cá tại shop để chăm sóc</p>
        <p>+Chúng tôi sẽ chăm sóc cá của bạn trong khoảng thời gian 30 ngày kể từ lúc ký gửi </p>
        <p>+Sau khoảng 27 ngày chúng tôi sẽ liên hệ với bạn</p>
        <p>+Lưu ý : Nếu khách hàng không liên lạc được chúng tôi sẽ vận chuyển cá theo đia chỉ khách hàng đã đặt</p>
      </section>


      <section>
        <h2 className='text-title'>2. Thông tin chúng tôi thu thập</h2>
        <p>
          Chúng tôi có thể thu thập các loại thông tin sau từ người dùng:
        </p>
        <ul>
          <li><strong>Thông tin cá nhân</strong>: Bao gồm tên, địa chỉ email, số điện thoại, địa chỉ giao hàng, và các thông tin liên quan đến tài khoản người dùng của bạn.</li>
          <li><strong>Thông tin thanh toán</strong>: Số thẻ tín dụng, thông tin thanh toán khi bạn thực hiện giao dịch trên nền tảng của chúng tôi.</li>
        </ul>
      </section>

      <section>
        <h2 className='text-title'>3. Cách chúng tôi sử dụng thông tin của bạn</h2>
        <p>
          Chúng tôi sử dụng thông tin cá nhân của bạn vào các mục đích sau:
        </p>
        <ul>
          <li><strong>Cung cấp dịch vụ</strong>: Để xử lý yêu cầu của bạn, hoàn tất giao dịch và cung cấp dịch vụ mà bạn yêu cầu.</li>
          <li><strong>Cải thiện trải nghiệm người dùng</strong>: Để cải thiện sản phẩm và dịch vụ của chúng tôi dựa trên phân tích hành vi người dùng.</li>
          <li><strong>Tiếp thị</strong>: Chúng tôi có thể gửi email hoặc tin nhắn tiếp thị về các sản phẩm, dịch vụ hoặc ưu đãi mới, nếu bạn đã đồng ý nhận thông tin từ chúng tôi.</li>
          <li><strong>Bảo mật</strong>: Để đảm bảo an toàn cho dịch vụ và bảo vệ tài khoản của bạn khỏi các hành vi gian lận hoặc lạm dụng.</li>
        </ul>
      </section>

      <section>
        <h2 className='text-title'>4. Cách chúng tôi bảo vệ thông tin của bạn</h2>
        <p>
          Chúng tôi sử dụng các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi việc truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy. Điều này bao gồm các công nghệ mã hóa, các biện pháp kiểm tra an ninh và đào tạo nhân viên.
        </p>
        <p>
          Tuy nhiên, không có phương thức truyền tải qua Internet hoặc phương thức lưu trữ điện tử nào là hoàn toàn an toàn. Do đó, mặc dù chúng tôi nỗ lực bảo vệ thông tin của bạn, chúng tôi không thể đảm bảo bảo mật tuyệt đối.
        </p>
      </section>

      <section>
        <h2 className='text-title'>5. Chia sẻ thông tin của bạn</h2>
        <p>
          Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba, ngoại trừ các trường hợp sau:
        </p>
        <ul>
          <li><strong>Đối tác và nhà cung cấp dịch vụ</strong>: Chúng tôi có thể chia sẻ thông tin với các đối tác và nhà cung cấp dịch vụ hỗ trợ chúng tôi trong việc cung cấp dịch vụ cho bạn (chẳng hạn như các công ty thanh toán hoặc dịch vụ giao hàng).</li>
          <li><strong>Yêu cầu pháp lý</strong>: Chúng tôi có thể tiết lộ thông tin của bạn khi được yêu cầu bởi pháp luật, ví dụ như để tuân thủ các thủ tục tố tụng, lệnh tòa án hoặc yêu cầu từ cơ quan chức năng.</li>
        </ul>
      </section>

      <section>
        <h2 className='text-title'>6. Quyền của bạn</h2>
        <p>
          Bạn có quyền:
        </p>
        <ul>
          <li><strong>Truy cập thông tin cá nhân</strong>: Bạn có thể yêu cầu sao chép hoặc xem thông tin cá nhân mà chúng tôi đang lưu trữ.</li>
          <li><strong>Chỉnh sửa thông tin cá nhân</strong>: Nếu thông tin của bạn không chính xác hoặc cần cập nhật, bạn có thể yêu cầu chỉnh sửa.</li>
          <li><strong>Xóa thông tin</strong>: Bạn có thể yêu cầu xóa thông tin cá nhân của bạn, trừ khi chúng tôi cần lưu trữ thông tin đó vì lý do pháp lý hoặc hợp đồng.</li>
          <li><strong>Rút lại sự đồng ý</strong>: Nếu bạn đã đồng ý nhận các thông tin tiếp thị từ chúng tôi, bạn có thể rút lại sự đồng ý bất kỳ lúc nào.</li>
        </ul>
      </section>

      <section>
        <h2 className='text-title'>7. Thay đổi Chính sách bảo mật</h2>
        <p>
          Chúng tôi có quyền thay đổi hoặc cập nhật Chính sách bảo mật này vào bất kỳ thời điểm nào. Mọi thay đổi sẽ được đăng tải trên trang web của chúng tôi cùng với ngày cập nhật. Vui lòng kiểm tra định kỳ để nắm bắt các thông tin mới nhất về cách chúng tôi bảo vệ quyền riêng tư của bạn.
        </p>
      </section>
        
      <section>
        <h2 className='text-title'>8. Liên hệ với chúng tôi</h2>
        <p>
          Nếu bạn có bất kỳ câu hỏi nào liên quan đến Chính sách bảo mật này hoặc muốn thực hiện quyền của mình, vui lòng liên hệ với chúng tôi qua địa chỉ email: <a href="mailto:email@example.com">email@example.com</a> hoặc gọi đến số điện thoại: [Số điện thoại].
        </p>
      </section>
    </div>
    </div>
  )
}

export default Policy
