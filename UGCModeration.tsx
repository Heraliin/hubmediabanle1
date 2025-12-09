import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Tag, User, Calendar, Image, Video, MessageSquare, Filter, Search } from 'lucide-react';

interface UGCContent {
  id: number;
  author: string;
  avatar: string;
  content: string;
  type: 'image' | 'video' | 'text';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  tags: string[];
  platform: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export function UGCModeration() {
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState<UGCContent | null>(null);

  const ugcContents: UGCContent[] = [
    {
      id: 1,
      author: 'Nguyễn Thị Mai',
      avatar: '👩',
      content: 'Review son mới mua tại shop, màu đẹp lắm ạ! #sonli #makeup #review',
      type: 'image',
      status: 'pending',
      submittedAt: '2025-12-09T10:30:00',
      tags: ['son lì', 'review', 'makeup'],
      platform: 'Facebook',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 2,
      author: 'Trần Hương',
      avatar: '👱‍♀️',
      content: 'Video unboxing bộ skincare mới nhận được. Cảm ơn shop!',
      type: 'video',
      status: 'pending',
      submittedAt: '2025-12-09T09:15:00',
      tags: ['skincare', 'unboxing'],
      platform: 'TikTok',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 3,
      author: 'Lê Minh Anh',
      avatar: '🧑‍🦱',
      content: 'Đã dùng serum này được 2 tuần, da mịn hơn hẳn! Highly recommend',
      type: 'text',
      status: 'approved',
      submittedAt: '2025-12-08T14:20:00',
      tags: ['serum', 'review', 'skincare'],
      platform: 'Zalo',
      engagement: { likes: 45, comments: 12, shares: 8 }
    },
    {
      id: 4,
      author: 'Phạm Quỳnh',
      avatar: '👩‍🦰',
      content: 'Sản phẩm không như mong đợi, giao hàng lâu quá',
      type: 'text',
      status: 'rejected',
      submittedAt: '2025-12-08T11:00:00',
      tags: ['complaint'],
      platform: 'Facebook',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 5,
      author: 'Hoàng Linh',
      avatar: '👧',
      content: 'Makeup look đi tiệc với tông hồng nude. Sản phẩm từ shop rất ổn!',
      type: 'image',
      status: 'pending',
      submittedAt: '2025-12-09T08:45:00',
      tags: ['makeup', 'tutorial'],
      platform: 'Instagram',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
  ];

  const filteredContents = ugcContents.filter(content => {
    const matchesStatus = selectedStatus === 'all' || content.status === selectedStatus;
    const matchesSearch = content.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ duyệt';
      case 'approved': return 'Đã duyệt';
      case 'rejected': return 'Từ chối';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'text': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const stats = [
    { label: 'Chờ duyệt', count: ugcContents.filter(c => c.status === 'pending').length, color: 'yellow' },
    { label: 'Đã duyệt', count: ugcContents.filter(c => c.status === 'approved').length, color: 'green' },
    { label: 'Từ chối', count: ugcContents.filter(c => c.status === 'rejected').length, color: 'red' },
    { label: 'Tổng cộng', count: ugcContents.length, color: 'blue' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-gray-900">Quản trị nội dung người dùng (UGC)</h2>
        <p className="text-sm text-gray-600 mt-1">Duyệt, gắn thẻ và quản lý nội dung từ cộng đồng</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className={`text-3xl text-${stat.color}-600`}>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo nội dung, tác giả, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedStatus === 'all'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedStatus('pending')}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedStatus === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Chờ duyệt
            </button>
            <button
              onClick={() => setSelectedStatus('approved')}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedStatus === 'approved'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đã duyệt
            </button>
            <button
              onClick={() => setSelectedStatus('rejected')}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedStatus === 'rejected'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Từ chối
            </button>
          </div>
        </div>
      </div>

      {/* UGC Content List */}
      <div className="space-y-4">
        {filteredContents.map((content) => {
          const TypeIcon = getTypeIcon(content.type);
          return (
            <div key={content.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* Author Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                  {content.avatar}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm text-gray-900">{content.author}</h4>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                          {content.platform}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(content.submittedAt).toLocaleString('vi-VN')}
                        </div>
                        <div className="flex items-center gap-1">
                          <TypeIcon className="w-3 h-3" />
                          {content.type === 'image' ? 'Hình ảnh' : content.type === 'video' ? 'Video' : 'Văn bản'}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(content.status)}`}>
                      {getStatusText(content.status)}
                    </span>
                  </div>

                  {/* Content Text */}
                  <p className="text-sm text-gray-700 mb-3">{content.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {content.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Engagement Stats */}
                  {content.status === 'approved' && (
                    <div className="flex gap-6 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <span>❤️</span>
                        <span>{content.engagement.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{content.engagement.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>🔄</span>
                        <span>{content.engagement.shares}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {content.status === 'pending' && (
                      <>
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Duyệt
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm">
                          <XCircle className="w-4 h-4" />
                          Từ chối
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                          <Tag className="w-4 h-4" />
                          Gắn thẻ
                        </button>
                      </>
                    )}
                    {content.status === 'approved' && (
                      <>
                        <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm">
                          Xem chi tiết
                        </button>
                        <button className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors text-sm">
                          Chia sẻ lại
                        </button>
                        <button className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm">
                          Gỡ xuống
                        </button>
                      </>
                    )}
                    {content.status === 'rejected' && (
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                        Xem lại
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Thao tác hàng loạt</h3>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors">
            <CheckCircle className="w-4 h-4" />
            Duyệt tất cả (0 đã chọn)
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors">
            <XCircle className="w-4 h-4" />
            Từ chối tất cả (0 đã chọn)
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Tag className="w-4 h-4" />
            Gắn thẻ hàng loạt
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            Lọc nâng cao
          </button>
        </div>
      </div>

      {/* Auto Moderation Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Cài đặt tự động duyệt</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-900">Tự động duyệt nội dung từ người dùng đã xác minh</p>
              <p className="text-xs text-gray-500 mt-1">Người dùng có lịch sử tốt sẽ được duyệt tự động</p>
            </div>
            <button className="w-12 h-6 rounded-full bg-pink-600">
              <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-900">Lọc từ ngữ nhạy cảm</p>
              <p className="text-xs text-gray-500 mt-1">Tự động từ chối nội dung có từ ngữ không phù hợp</p>
            </div>
            <button className="w-12 h-6 rounded-full bg-pink-600">
              <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-900">AI phân tích cảm xúc</p>
              <p className="text-xs text-gray-500 mt-1">Sử dụng AI để phân loại nội dung tích cực/tiêu cực</p>
            </div>
            <button className="w-12 h-6 rounded-full bg-gray-300">
              <div className="w-5 h-5 bg-white rounded-full translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
