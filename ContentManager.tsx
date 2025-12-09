import { useState } from 'react';
import { Plus, Search, Filter, Image, Video, FileText, Edit, Trash2, Eye, Calendar, Tag, MoreVertical } from 'lucide-react';

interface Content {
  id: number;
  title: string;
  type: 'video' | 'image' | 'article';
  status: 'draft' | 'published' | 'scheduled';
  thumbnail: string;
  views: number;
  engagement: number;
  date: string;
  tags: string[];
  channels: string[];
}

export function ContentManager() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'video' | 'image' | 'article'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const contents: Content[] = [
    {
      id: 1,
      title: 'Review son lì mới nhất 2025 - Top 10 màu HOT',
      type: 'video',
      status: 'published',
      thumbnail: '#',
      views: 125000,
      engagement: 8500,
      date: '2025-12-08',
      tags: ['son môi', 'review', 'makeup'],
      channels: ['TikTok', 'YouTube', 'Facebook']
    },
    {
      id: 2,
      title: 'Quy trình skincare 10 bước cho da dầu',
      type: 'article',
      status: 'published',
      thumbnail: '#',
      views: 45000,
      engagement: 3200,
      date: '2025-12-07',
      tags: ['skincare', 'da dầu', 'hướng dẫn'],
      channels: ['Website', 'Facebook']
    },
    {
      id: 3,
      title: 'Livestream Q&A: Chăm sóc da mùa đông',
      type: 'video',
      status: 'scheduled',
      thumbnail: '#',
      views: 0,
      engagement: 0,
      date: '2025-12-10',
      tags: ['livestream', 'skincare', 'Q&A'],
      channels: ['Facebook', 'Zalo']
    },
    {
      id: 4,
      title: 'Bộ sưu tập makeup Tết 2025',
      type: 'image',
      status: 'draft',
      thumbnail: '#',
      views: 0,
      engagement: 0,
      date: '2025-12-09',
      tags: ['makeup', 'tết', 'collection'],
      channels: []
    }
  ];

  const filteredContents = contents.filter(content => {
    const matchesTab = selectedTab === 'all' || content.type === selectedTab;
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Đã xuất bản';
      case 'draft': return 'Bản nháp';
      case 'scheduled': return 'Đã lên lịch';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'image': return Image;
      case 'article': return FileText;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl text-gray-900">Quản lý nội dung</h2>
          <p className="text-sm text-gray-600 mt-1">Tạo, chỉnh sửa và quản lý tất cả nội dung đa phương tiện</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Tạo nội dung mới
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm nội dung, thẻ tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedTab === 'all'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedTab('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedTab === 'video'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Video className="w-4 h-4" />
              Video
            </button>
            <button
              onClick={() => setSelectedTab('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedTab === 'image'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Image className="w-4 h-4" />
              Hình ảnh
            </button>
            <button
              onClick={() => setSelectedTab('article')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedTab === 'article'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              Bài viết
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContents.map((content) => {
          const TypeIcon = getTypeIcon(content.type);
          return (
            <div
              key={content.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <TypeIcon className="w-16 h-16 text-pink-400" />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(content.status)}`}>
                    {getStatusText(content.status)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Content Info */}
              <div className="p-4">
                <h3 className="text-gray-900 mb-2 line-clamp-2">{content.title}</h3>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {content.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{content.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(content.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>

                {/* Channels */}
                {content.channels.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Kênh xuất bản:</p>
                    <div className="flex flex-wrap gap-1">
                      {content.channels.map((channel, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Chỉnh sửa</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Xem</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Content Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl text-gray-900">Tạo nội dung mới</h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Content Type Selection */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Loại nội dung</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="p-4 border-2 border-pink-600 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
                    <Video className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-900">Video</p>
                  </button>
                  <button className="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Image className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-900">Hình ảnh</p>
                  </button>
                  <button className="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-900">Bài viết</p>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Tiêu đề</label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề nội dung..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Mô tả</label>
                <textarea
                  rows={4}
                  placeholder="Nhập mô tả chi tiết..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Thẻ tag</label>
                <input
                  type="text"
                  placeholder="Nhập các tag, cách nhau bởi dấu phẩy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Tải lên file</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-500 transition-colors cursor-pointer">
                  <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Kéo thả file hoặc click để chọn</p>
                  <p className="text-xs text-gray-500 mt-1">Hỗ trợ: MP4, MOV, JPG, PNG (tối đa 500MB)</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all">
                Tạo nội dung
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
