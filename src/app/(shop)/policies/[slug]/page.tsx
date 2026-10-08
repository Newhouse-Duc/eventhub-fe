import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Clock, FileText, ChevronRight } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Bezel } from '@/components/ui/bezel';

interface PolicyData {
  title: string;
  updatedAt: string;
  summary: string;
  sections: { id: string; heading: string; body: string }[];
}

const POLICIES: Record<string, PolicyData> = {
  shipping: {
    title: 'Chính Sách Vận Chuyển & Giao Hàng',
    updatedAt: '01/10/2026',
    summary: 'Pet Luxury cam kết giao hàng hỏa tốc 2H nội thành và miễn phí vận chuyển tiêu chuẩn cho đơn hàng từ 500.000₫ trên toàn quốc.',
    sections: [
      {
        id: 'khu-vuc',
        heading: '1. Phạm vi áp dụng & Khu vực giao hàng',
        body: 'Pet Luxury phục vụ vận chuyển trên 63 tỉnh thành Việt Nam. Đối với dịch vụ Hỏa Tốc 2 Giờ, áp dụng tại các quận nội thành Hà Nội và TP. Hồ Chí Minh với thời gian nhận đơn từ 08:00 đến 18:00 hàng ngày.',
      },
      {
        id: 'cuoc-phi',
        heading: '2. Bảng cước phí vận chuyển',
        body: '• Giao hàng Tiêu Chuẩn (2 - 4 ngày): Miễn phí cho đơn từ 500.000₫; 25.000₫ cho đơn dưới 500.000₫.\n• Giao hàng Nhanh (1 - 2 ngày): Phí cố định 35.000₫ toàn quốc.\n• Giao hàng Hỏa Tốc 2H: Phí cố định 60.000₫ (áp dụng nội thành).',
      },
      {
        id: 'kiem-tra',
        heading: '3. Quy định đồng kiểm khi nhận hàng',
        body: 'Khách hàng được quyền mở hộp bưu kiện kiểm tra số lượng và tính nguyên vẹn của sản phẩm trước khi thanh toán cho shipper (đồng kiểm ngoại quan, không mở seal sản phẩm thức ăn bên trong).',
      },
    ],
  },
  returns: {
    title: 'Chính Sách Đổi Trả & Hoàn Tiền',
    updatedAt: '01/10/2026',
    summary: 'Bảo vệ quyền lợi tối đa của khách hàng với chính sách đổi trả miễn phí trong 7 ngày nếu phát hiện lỗi hoặc không đúng chủng loại yêu cầu.',
    sections: [
      {
        id: 'dieu-kien',
        heading: '1. Điều kiện đổi trả hợp lệ',
        body: '• Sản phẩm còn nguyên bao bì seal, tem chống hàng giả của Pet Luxury và chưa qua sử dụng.\n• Hạn sử dụng của sản phẩm còn tối thiểu trên 6 tháng.\n• Có video quay quá trình bóc mở kiện hàng chứng minh sản phẩm bị móp méo, rách hoặc giao sai mẫu.',
      },
      {
        id: 'thoi-gian',
        heading: '2. Thời gian xử lý hoàn tiền',
        body: 'Tiền hoàn trả sẽ được chuyển khoản trực tiếp về tài khoản ngân hàng của quý khách trong vòng 24 - 48 giờ làm việc sau khi kho nhận lại và thẩm định tình trạng kiện hàng.',
      },
    ],
  },
  privacy: {
    title: 'Chính Sách Bảo Mật Thông Tin & Cookie',
    updatedAt: '01/10/2026',
    summary: 'Chúng tôi tôn trọng quyền riêng tư tuyệt đối của khách hàng và chỉ sử dụng thông tin nhằm mục đích giao hàng và nâng cao dịch vụ.',
    sections: [
      {
        id: 'thu-thap',
        heading: '1. Mục đích thu thập dữ liệu',
        body: 'Thông tin cá nhân (Họ tên, SĐT, Email, Địa chỉ) và hồ sơ thú cưng được thu thập nhằm phục vụ công tác xử lý đơn hàng, tích điểm thành viên Pawfect Club và cá nhân hóa gợi ý thức ăn phù hợp.',
      },
      {
        id: 'cookie',
        heading: '2. Sử dụng Cookie',
        body: 'Cookie giúp hệ thống ghi nhớ trạng thái giỏ hàng, thông tin đăng nhập và hỗ trợ trải nghiệm người dùng tối ưu. Bạn hoàn toàn có quyền từ chối cookie không thiết yếu qua banner đồng thuận.',
      },
      {
        id: 'cam-ket',
        heading: '3. Cam kết không chia sẻ bên thứ ba',
        body: 'Pet Luxury tuyệt đối không bán, trao đổi hoặc chia sẻ dữ liệu người dùng cho bất kỳ bên thứ ba nào vì mục đích thương mại mà không có sự đồng ý của khách hàng.',
      },
    ],
  },
  terms: {
    title: 'Điều Khoản Dịch Vụ',
    updatedAt: '01/10/2026',
    summary: 'Các quy định và thỏa thuận ràng buộc khi mua sắm và sử dụng dịch vụ trên nền tảng Pet Luxury E-Commerce.',
    sections: [
      {
        id: 'tai-khoan',
        heading: '1. Trách nhiệm tài khoản người dùng',
        body: 'Khách hàng có trách nhiệm bảo mật thông tin đăng nhập và mật khẩu cá nhân, đồng thời thông báo ngay cho ban quản trị khi phát hiện có truy cập trái phép.',
      },
      {
        id: 'gia-ca',
        heading: '2. Giá cả & Tình trạng tồn kho',
        body: 'Giá sản phẩm niêm yết trên website đã bao gồm thuế GTGT (VAT). Trường hợp hệ thống xảy ra sai sót kỹ thuật về giá, chúng tôi sẽ liên hệ để thông báo hủy hoặc cập nhật thỏa thuận đơn.',
      },
    ],
  },
};

const POLICY_NAV = [
  { slug: 'shipping', label: 'Chính sách vận chuyển' },
  { slug: 'returns', label: 'Đổi trả & Hoàn tiền' },
  { slug: 'privacy', label: 'Bảo mật & Cookie' },
  { slug: 'terms', label: 'Điều khoản sử dụng' },
];

interface PolicyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) return { title: 'Chính sách không tìm thấy — Pet Luxury' };

  return {
    title: `${policy.title} — Pet Luxury`,
    description: policy.summary,
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;
  const policy = POLICIES[slug];

  if (!policy) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Chính sách', href: '/policies/shipping' },
    { label: policy.title, isCurrent: true },
  ];

  return (
    <div className="py-8 space-y-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Nav Sidebar (lg:col-span-4) */}
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          <Bezel className="p-4 bg-white space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1 block">
              Danh Mục Chính Sách
            </span>
            {POLICY_NAV.map((nav) => {
              const isActive = nav.slug === slug;
              return (
                <Link
                  key={nav.slug}
                  href={`/policies/${nav.slug}`}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-600 text-white font-bold shadow-xs'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  <span>{nav.label}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                </Link>
              );
            })}
          </Bezel>
        </aside>

        {/* Right Main Prose Content (lg:col-span-8) */}
        <section className="lg:col-span-8 min-w-0">
          <Bezel className="p-6 sm:p-10 space-y-6">
            <div className="pb-6 border-b border-stone-100">
              <span className="text-xs text-stone-500 flex items-center gap-1.5 font-mono mb-2">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                Cập nhật lần cuối: {policy.updatedAt}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {policy.title}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed bg-amber-500/5 p-4 rounded-xl border border-amber-500/10">
                {policy.summary}
              </p>
            </div>

            <div className="space-y-6">
              {policy.sections.map((sec) => (
                <div key={sec.id} className="space-y-2">
                  <h2 className="text-sm sm:text-base font-bold text-stone-900">
                    {sec.heading}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Ban hành bởi Hội đồng Quản trị Pet Luxury
              </span>
              <Link href="/contact" className="text-amber-700 font-semibold hover:underline">
                Cần giải đáp thêm?
              </Link>
            </div>
          </Bezel>
        </section>
      </div>
    </div>
  );
}
