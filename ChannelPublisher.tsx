import { useState } from 'react';
import { Facebook, Send, Clock, CheckCircle, XCircle, Calendar, Image, Video, FileText } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  followers: number;
  color: string;
}

interface ScheduledPost {
  id: number;
  title: string;
  channels: string[];
  scheduledTime: string;
  status: 'pending' | 'published' | 'failed';
  type: 'video' | 'image' | 'article';
}

export function ChannelPublisher() {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [postContent, setPostContent] = useState('');
  const [scheduleMode, setScheduleMode] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const channels: Channel[] = [
    { id: 'facebook', name: 'Facebook Page', icon: '📘', connected: true, followers: 45000, color: '#1877F2' },
    { id: 'zalo', name: 'Zalo OA', icon: '💬', connected: true, followers: 28000, color: '#0068FF' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', connected: true, followers: 89000, color: '#000000' },
    { id: 'youtube', name: 'YouTube', icon: '📺', connected: true, followers: 32000, color: '#FF0000' },
    { id: 'instagram', name: 'Instagram', icon: '📷', connected: false, followers: 0, color: '#E4405F' },
  ];

  const scheduledPosts: ScheduledPost[] = [
    {
      id: 1,
      title: 'Review son mới 2025 - Top 10 màu HOT nhất',
      channels: ['facebook', 'tiktok', 'youtube'],
      scheduledTime: '2025-12-10T10:00',
      status: 'pending',
      type: 'video'
    },
    {
      id: 2,
      title: 'Flash Sale cuối tuần - Giảm 50% toàn bộ skincare',
      channels: ['facebook', 'zalo'],
      scheduledTime: '2025-12-09T18:00',
      status: 'published',
      type: 'image'
    },
    {
      id: 3,
      title: 'Hướng dẫn chăm sóc da mùa đông',
      channels: ['facebook', 'youtube'],
      scheduledTime: '2025-12-09T14:30',
      status: 'failed',
      type: 'article'
    }
  ];

  const toggleChannel = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      setSelectedChannels(selectedChannels.filter(id => id !== channelId));
    } else {
      setSelectedChannels([...selectedChannels, channelId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'published': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Đang chờ';
      case 'published': return 'Đã xuất bản';
      case 'failed': return 'Thất bại';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'published': return CheckCircle;
      case 'failed': return XCircle;
      default: return Clock;
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
      <div>
        <h2 className="text-xl text-gray-900">Xuất bản đa kênh</h2>
        <p className="text-sm text-gray-600 mt-1">Quản lý và xuất bản nội dung đồng thời lên nhiều nền tảng</p>
      </div>

      {/* Publisher Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Tạo bài đăng mới</h3>

        {/* Channel Selection */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-3">Chọn kênh xuất bản</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => channel.connected && toggleChannel(channel.id)}
                disabled={!channel.connected}
                className={`p-4 border-2 rounded-lg transition-all ${
                  selectedChannels.includes(channel.id)
                    ? 'border-pink-600 bg-pink-50'
                    : channel.connected
                    ? 'border-gray-300 hover:border-gray-400'
                    : 'border-gray-200 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-3xl mb-2">{channel.icon}</div>
                <p className="text-sm text-gray-900">{channel.name}</p>
                {channel.connected ? (
                  <p className="text-xs text-gray-500 mt-1">{channel.followers.toLocaleString()} người theo dõi</p>
                ) : (
                  <p className="text-xs text-red-500 mt-1">Chưa kết nối</p>
                )}
                {selectedChannels.includes(channel.id) && (
                  <div className="mt-2">
                    <CheckCircle className="w-5 h-5 text-pink-600 mx-auto" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Input */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">Nội dung bài đăng</label>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={6}
            placeholder="Nhập nội dung bài đăng của bạn...&#10;&#10;💄 Có thể sử dụng emoji và hashtag&#10;#myphẩm #skincare #beauty"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">{postContent.length} ký tự</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                😀 Emoji
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                # Hashtag
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                📎 Media
              </button>
            </div>
          </div>
        </div>

        {/* Media Upload */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">Đính kèm media</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-500 transition-colors cursor-pointer">
            <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Kéo thả hoặc click để chọn ảnh/video</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG, MP4, MOV (tối đa 100MB)</p>
          </div>
        </div>

        {/* Schedule Toggle */}
        <div className="mb-6 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-900">Lên lịch xuất bản</p>
              <p className="text-xs text-gray-500">Đặt thời gian tự động đăng bài</p>
            </div>
          </div>
          <button
            onClick={() => setScheduleMode(!scheduleMode)}
            className={`w-12 h-6 rounded-full transition-colors ${
              scheduleMode ? 'bg-pink-600' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
              scheduleMode ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Schedule DateTime */}
        {scheduleMode && (
          <div className="mb-6 grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Ngày đăng</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Giờ đăng</label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Lưu nháp
          </button>
          <button className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            {scheduleMode ? 'Lên lịch đăng' : 'Xuất bản ngay'}
          </button>
        </div>
      </div>

      {/* Scheduled Posts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Bài đăng đã lên lịch</h3>
        <div className="space-y-3">
          {scheduledPosts.map((post) => {
            const StatusIcon = getStatusIcon(post.status);
            const TypeIcon = getTypeIcon(post.type);
            return (
              <div key={post.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Type Icon */}
                  <div className="p-3 bg-pink-100 rounded-lg flex-shrink-0">
                    <TypeIcon className="w-5 h-5 text-pink-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-gray-900">{post.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(post.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {getStatusText(post.status)}
                      </span>
                    </div>

                    {/* Channels */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.channels.map((channelId) => {
                        const channel = channels.find(c => c.id === channelId);
                        return channel ? (
                          <span key={channelId} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs flex items-center gap-1">
                            {channel.icon} {channel.name}
                          </span>
                        ) : null;
                      })}
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(post.scheduledTime).toLocaleString('vi-VN')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                      Chỉnh sửa
                    </button>
                    {post.status === 'pending' && (
                      <button className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors">
                        Hủy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Channel Connection Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Cài đặt kết nối kênh</h3>
        <div className="space-y-3">
          {channels.map((channel) => (
            <div key={channel.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{channel.icon}</div>
                <div>
                  <p className="text-sm text-gray-900">{channel.name}</p>
                  {channel.connected ? (
                    <p className="text-xs text-green-600">✓ Đã kết nối - {channel.followers.toLocaleString()} người theo dõi</p>
                  ) : (
                    <p className="text-xs text-gray-500">Chưa kết nối</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {channel.connected ? (
                  <>
                    <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      Cài đặt
                    </button>
                    <button className="px-4 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors">
                      Ngắt kết nối
                    </button>
                  </>
                ) : (
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all">
                    Kết nối ngay
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            💡 <strong>Lưu ý:</strong> Để kết nối API thực tế của Facebook Page, Zalo OA, TikTok và YouTube, bạn cần cung cấp API credentials trong phần cài đặt hệ thống.
          </p>
        </div>
      </div>
    </div>
  );
}
