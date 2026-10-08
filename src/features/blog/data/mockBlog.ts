import type { BlogPost } from '../types/blog.types';

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'grain-free-nutrition-guide',
    title: 'Chế độ ăn Grain-Free là gì và khi nào cún cưng của bạn thật sự cần?',
    excerpt: 'Tìm hiểu chi tiết về cơ chế dị ứng protein thực vật và cách chọn hạt không ngũ cốc phù hợp theo độ tuổi và thể trạng của bé.',
    content: `Chế độ ăn Grain-Free (hoàn toàn không chứa các loại ngũ cốc như lúa mì, ngô, đậu nành) đang trở thành xu hướng chăm sóc thú cưng cao cấp hàng đầu hiện nay.

1. Tại sao tổ tiên loài chó không cần ngũ cốc?
Về mặt sinh học và cấu tạo đường ruột, chó là loài động vật ăn thịt tương đối (carnivore). Hệ tiêu hóa của chúng được thiết kế với độ pH dạ dày cực thấp để phân hủy protein từ thịt, xương và nội tạng động vật tươi sống thay vì tinh bột phức tạp từ ngũ cốc giá rẻ.

2. Những dấu hiệu nhận biết bé cưng bị dị ứng ngũ cốc:
• Ngứa ngáy, liếm chân liên tục, da ửng đỏ và rụng lông từng mảng.
• Phân lỏng, đầy hơi hoặc nôn trớ sau bữa ăn.
• Mùi cơ thể nồng dù đã được tắm rửa thường xuyên.

3. Lựa chọn hạt dinh dưỡng sinh học thay thế:
Các dòng thức ăn như Orijen Original sử dụng công thức WholePrey với 85% nguyên liệu động vật và sử dụng đậu lăng, đậu gà hữu cơ với chỉ số đường huyết thấp (Low GI), giúp duy trì lượng đường huyết ổn định và bộ lông óng mượt.`,
    author: {
      name: 'Bác sĩ Thú y Minh Anh',
      role: 'Chuyên gia Dinh dưỡng Pet Luxury',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    },
    date: '04/10/2026',
    category: 'Dinh Dưỡng',
    readTime: '5 phút đọc',
    coverImage: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    tags: ['Dinh Dưỡng', 'Chó Cưng', 'Grain-Free', 'Orijen'],
    recommendedProductSlug: 'hat-orijen-original-cho-cho-2kg',
  },
  {
    id: 'post-2',
    slug: 'how-to-keep-cats-hydrated',
    title: 'Bí quyết giúp mèo cưng uống đủ nước mỗi ngày để phòng ngừa sỏi thận',
    excerpt: 'Mèo có thói quen lười uống nước đọng. Khám phá 5 mẹo từ bác sĩ thú y giúp kích thích bản năng uống nước tự nhiên của boss.',
    content: `Tổ tiên của loài mèo là mèo rừng sa mạc châu Phi, nơi chúng tiến hóa để lấy phần lớn độ ẩm cơ thể từ con mồi tươi sống. Do đó, mèo hiện đại có cảm giác khát rất kém.

1. Tác hại nghiêm trọng của việc thiếu nước:
Khi lượng nước nạp vào cơ thể không đủ, nước tiểu của mèo sẽ bị cô đặc, dẫn đến sự hình thành sỏi struvite hoặc oxalate và gây hội chứng FLUTD (viêm đường tiết niệu) cực kỳ nguy hiểm.

2. Kết hợp Pate ướt vào khẩu phần hàng ngày:
Pate lon hoặc túi như Royal Canin Kitten Instinctive có hàm lượng độ ẩm tự nhiên lên tới 78-82%. Bổ sung ít nhất 1 gói pate mỗi ngày sẽ bù đắp lượng nước thiếu hụt từ hạt khô.

3. Đầu tư máy lọc nước thác chảy tuần hoàn:
Mèo bị kích thích mạnh bởi tiếng nước chảy róc rách. Nước chảy liên tục giàu oxy hòa tan sẽ khiến mèo chủ động uống nhiều hơn gấp 3 lần so với bát nước đứng yên.`,
    author: {
      name: 'ThS. BS Hoàng Nam',
      role: 'Viện Y học Thú cưng Hà Nội',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    date: '29/09/2026',
    category: 'Sức Khỏe',
    readTime: '4 phút đọc',
    coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1200',
    featured: false,
    tags: ['Mèo Cưng', 'Sức Khỏe', 'Pate', 'Sỏi Thận'],
    recommendedProductSlug: 'pate-royal-canin-kitten-instinctive-85g',
  },
  {
    id: 'post-3',
    slug: 'orthopedic-beds-for-large-dogs',
    title: 'Tại sao đệm nằm công thái học lại quan trọng đối với các dòng chó lớn?',
    excerpt: 'Cân nặng của các giống chó lớn tạo áp lực khổng lồ lên khớp gối và cột sống. Một chiếc đệm chuẩn y khoa sẽ bảo vệ bé lâu dài.',
    content: `Đối với các giống chó kích thước lớn như Golden Retriever, Labrador hay Becgie, các vấn đề về thoái hóa khớp hông (Hip Dysplasia) và viêm xương khớp thường xuất hiện từ rất sớm nếu phải nằm trên sàn gạch lạnh và cứng.

Đệm công thái học memory foam cao cấp giúp phân tán áp lực cơ thể đều khắp các điểm tiếp xúc, duy trì nhiệt độ ấm áp vùng khớp và giúp bé có giấc ngủ sâu hồi phục thể lực tốt nhất.`,
    author: {
      name: 'Bác sĩ Thú y Minh Anh',
      role: 'Chuyên gia Dinh dưỡng Pet Luxury',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    },
    date: '25/09/2026',
    category: 'Phụ Kiện',
    readTime: '6 phút đọc',
    coverImage: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=1200',
    featured: false,
    tags: ['Chó Lớn', 'Đệm Nằm', 'Xương Khớp'],
  },
];
