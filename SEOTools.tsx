import { useState } from 'react';
import { Search, TrendingUp, Link, FileText, BarChart, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface SEOScore {
  page: string;
  score: number;
  status: 'good' | 'warning' | 'poor';
  issues: string[];
}

export function SEOTools() {
  const [selectedUrl, setSelectedUrl] = useState('');

  const seoScores: SEOScore[] = [
    {
      page: 'Trang chủ',
      score: 92,
      status: 'good',
      issues: ['Meta description hơi ngắn']
    },
    {
      page: 'Review son lì 2025',
      score: 78,
      status: 'warning',
      issues: ['Thiếu alt text cho 3 ảnh', 'Heading structure không tốt']
    },
    {
      page: 'Skincare routine',
      score: 65,
      status: 'warning',
      issues: ['Tốc độ tải chậm', 'Thiếu structured data', 'Ảnh chưa tối ưu']
    },
    {
      page: 'Flash Sale cuối tuần',
      score: 45,
      status: 'poor',
      issues: ['Không có meta title', 'Duplicate content', 'Broken links', 'Mobile không responsive']
    }
  ];

  const keywords = [
    { keyword: 'mỹ phẩm chính hãng', volume: 12000, difficulty: 'medium', position: 5, trend: 'up' },
    { keyword: 'son lì giá rẻ', volume: 8500, difficulty: 'low', position: 3, trend: 'up' },
    { keyword: 'skincare hàn quốc', volume: 15000, difficulty: 'high', position: 12, trend: 'down' },
    { keyword: 'review mỹ phẩm', volume: 6200, difficulty: 'medium', position: 7, trend: 'stable' },
  ];

  const backlinks = [
    { domain: 'beautyvn.com', authority: 72, links: 15, status: 'active' },
    { domain: 'lamdep.net', authority: 68, links: 8, status: 'active' },
    { domain: 'phunuonline.vn', authority: 81, links: 23, status: 'active' },
    { domain: 'tinmoi.com', authority: 45, links: 3, status: 'lost' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'poor': return XCircle;
      default: return AlertCircle;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-gray-900">Công cụ SEO & Tối ưu</h2>
        <p className="text-sm text-gray-600 mt-1">Phân tích và tối ưu hóa SEO cho nội dung</p>
      </div>

      {/* SEO Analyzer */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Phân tích SEO trang</h3>
        <div className="flex gap-3 mb-6">
          <input
            type="url"
            placeholder="Nhập URL cần phân tích..."
            value={selectedUrl}
            onChange={(e) => setSelectedUrl(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all">
            Phân tích
          </button>
        </div>

        {/* SEO Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seoScores.map((item, index) => {
            const StatusIcon = getStatusIcon(item.status);
            return (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-sm text-gray-900 mb-2">{item.page}</h4>
                    <div className="flex items-center gap-2">
                      <div className={`text-2xl ${getScoreColor(item.score)}`}>
                        {item.score}
                      </div>
                      <span className="text-sm text-gray-500">/100</span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${getScoreBg(item.score)}`}>
                    <StatusIcon className={`w-5 h-5 ${getScoreColor(item.score)}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  {item.issues.map((issue, idx) => (
                    <p key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                      <span className="text-red-500 mt-0.5">•</span>
                      {issue}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyword Research */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Nghiên cứu từ khóa</h3>
          <button className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-colors text-sm">
            Thêm từ khóa
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Từ khóa</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Lượt tìm kiếm</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Độ khó</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Vị trí</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Xu hướng</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((kw, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{kw.keyword}</p>
                  </td>
                  <td className="text-right py-4 px-4">
                    <p className="text-sm text-gray-900">{kw.volume.toLocaleString()}/tháng</p>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(kw.difficulty)}`}>
                      {kw.difficulty === 'low' ? 'Thấp' : kw.difficulty === 'medium' ? 'Trung bình' : 'Cao'}
                    </span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                      #{kw.position}
                    </span>
                  </td>
                  <td className="text-center py-4 px-4">
                    {kw.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600 mx-auto" />}
                    {kw.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-600 mx-auto rotate-180" />}
                    {kw.trend === 'stable' && <span className="text-gray-400">—</span>}
                  </td>
                  <td className="text-right py-4 px-4">
                    <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backlinks Monitor */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Giám sát backlinks</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
              Xuất danh sách
            </button>
            <button className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-colors text-sm">
              Thêm backlink
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {backlinks.map((link, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Link className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-gray-900">{link.domain}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        link.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {link.status === 'active' ? 'Hoạt động' : 'Mất liên kết'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>Authority: {link.authority}</span>
                      <span>•</span>
                      <span>{link.links} liên kết</span>
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* On-Page SEO Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technical SEO */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">Technical SEO</h3>
          <div className="space-y-3">
            {[
              { item: 'Sitemap XML', status: true },
              { item: 'Robots.txt', status: true },
              { item: 'HTTPS/SSL', status: true },
              { item: 'Mobile-friendly', status: true },
              { item: 'Page Speed (Core Web Vitals)', status: false },
              { item: 'Structured Data', status: false },
            ].map((check, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-900">{check.item}</span>
                {check.status ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content SEO */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">Content SEO</h3>
          <div className="space-y-3">
            {[
              { item: 'Meta Title tối ưu', status: true },
              { item: 'Meta Description', status: true },
              { item: 'H1 Heading duy nhất', status: true },
              { item: 'Alt text cho ảnh', status: false },
              { item: 'Internal linking', status: true },
              { item: 'Content length (300+ words)', status: false },
            ].map((check, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-900">{check.item}</span>
                {check.status ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Khuyến nghị tối ưu</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 mb-1">Tối ưu tốc độ tải trang</p>
                <p className="text-xs text-blue-700">
                  Nén ảnh và sử dụng lazy loading để cải thiện Core Web Vitals. Hiện tại LCP là 3.2s, nên giảm xuống dưới 2.5s.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-900 mb-1">Thêm structured data</p>
                <p className="text-xs text-yellow-700">
                  Sử dụng Schema.org markup cho sản phẩm, review và breadcrumb để tăng khả năng hiển thị Rich Snippets.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-900 mb-1">Tối ưu nội dung cho từ khóa dài</p>
                <p className="text-xs text-green-700">
                  Tạo thêm bài viết về long-tail keywords như &ldquo;review son lì giá rẻ dưới 100k&rdquo; để tăng traffic organic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
