import { useState } from 'react';
import { Video, Play, Square, Users, Eye, Heart, MessageCircle, Settings, Upload, Clock, TrendingUp } from 'lucide-react';

interface LiveSession {
  id: number;
  title: string;
  status: 'live' | 'scheduled' | 'ended';
  viewers: number;
  peakViewers: number;
  duration: string;
  channels: string[];
  startTime: string;
  thumbnailUrl?: string;
}

export function LivestreamManager() {
  const [activeTab, setActiveTab] = useState<'live' | 'scheduled' | 'ended'>('live');
  const [showStartModal, setShowStartModal] = useState(false);

  const sessions: LiveSession[] = [
    {
      id: 1,
      title: 'Livestream Review Skincare Mùa Đông 2025',
      status: 'live',
      viewers: 2345,
      peakViewers: 3120,
      duration: '45:23',
      channels: ['Facebook', 'YouTube'],
      startTime: '2025-12-09T14:00'
    },
    {
      id: 2,
      title: 'Q&A: Chăm sóc da dầu mụn - Hỏi đáp trực tiếp',
      status: 'scheduled',
      viewers: 0,
      peakViewers: 0,
      duration: '0:00',
      channels: ['Facebook', 'Zalo', 'TikTok'],
      startTime: '2025-12-10T19:00'
    },
    {
      id: 3,
      title: 'Flash Sale Makeup - Giảm 50% toàn bộ sản phẩm',
      status: 'ended',
      viewers: 0,
      peakViewers: 4580,
      duration: '1:32:45',
      channels: ['Facebook', 'TikTok'],
      startTime: '2025-12-08T20:00'
    }
  ];

  const filteredSessions = sessions.filter(s => s.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'scheduled': return 'bg-blue-500';
      case 'ended': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'ĐANG LIVE';
      case 'scheduled': return 'ĐÃ LÊN LỊCH';
      case 'ended': return 'ĐÃ KẾT THÚC';
      default: return status.toUpperCase();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl text-gray-900">Quản lý Livestream & Video</h2>
          <p className="text-sm text-gray-600 mt-1">Phát trực tiếp và quản lý video clip ngắn</p>
        </div>
        <button
          onClick={() => setShowStartModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all"
        >
          <Play className="w-4 h-4" />
          Bắt đầu Livestream
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 flex gap-2">
        <button
          onClick={() => setActiveTab('live')}
          className={`flex-1 px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'live'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${activeTab === 'live' ? 'bg-white animate-pulse' : 'bg-red-500'}`} />
          Đang Live
        </button>
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`flex-1 px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'scheduled'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          Đã lên lịch
        </button>
        <button
          onClick={() => setActiveTab('ended')}
          className={`flex-1 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'ended'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Đã kết thúc
        </button>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Thumbnail/Preview */}
            <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Video className="w-16 h-16 text-white/50" />
              
              {/* Status Badge */}
              <div className={`absolute top-3 left-3 px-3 py-1 ${getStatusColor(session.status)} text-white rounded-full text-xs flex items-center gap-2`}>
                {session.status === 'live' && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                {getStatusText(session.status)}
              </div>

              {/* Viewers (for live) */}
              {session.status === 'live' && (
                <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 text-white rounded-full text-xs flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {session.viewers.toLocaleString()}
                </div>
              )}

              {/* Duration */}
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white rounded text-xs">
                {session.duration}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-gray-900 mb-3">{session.title}</h3>

              {/* Channels */}
              <div className="flex flex-wrap gap-2 mb-3">
                {session.channels.map((channel, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {channel}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Người xem</p>
                  <p className="text-sm text-gray-900">{session.viewers > 0 ? session.viewers.toLocaleString() : '-'}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Peak</p>
                  <p className="text-sm text-gray-900">{session.peakViewers > 0 ? session.peakViewers.toLocaleString() : '-'}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Thời lượng</p>
                  <p className="text-sm text-gray-900">{session.duration}</p>
                </div>
              </div>

              {/* Start Time */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Clock className="w-4 h-4" />
                <span>{new Date(session.startTime).toLocaleString('vi-VN')}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {session.status === 'live' && (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                      Cài đặt
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                      <Square className="w-4 h-4" />
                      Kết thúc
                    </button>
                  </>
                )}
                {session.status === 'scheduled' && (
                  <>
                    <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                      Chỉnh sửa
                    </button>
                    <button className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm">
                      Bắt đầu ngay
                    </button>
                  </>
                )}
                {session.status === 'ended' && (
                  <>
                    <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                      Xem lại
                    </button>
                    <button className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm">
                      Phân tích
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Clips Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Video clip ngắn</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-colors">
            <Upload className="w-4 h-4" />
            Tải lên clip
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg overflow-hidden mb-2">
                <Video className="absolute inset-0 m-auto w-8 h-8 text-white/50" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="flex items-center gap-2 text-white text-xs">
                    <Eye className="w-3 h-3" />
                    <span>12.5K</span>
                    <Heart className="w-3 h-3 ml-auto" />
                    <span>890</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-900 line-clamp-2">Clip highlight Livestream #{i}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Start Livestream Modal */}
      {showStartModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl text-gray-900">Bắt đầu Livestream mới</h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Tiêu đề livestream</label>
                <input
                  type="text"
                  placeholder="VD: Review sản phẩm mới - Flash Sale cuối tuần"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Mô tả</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả nội dung livestream..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Channel Selection */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Chọn kênh phát</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Facebook', 'YouTube', 'TikTok', 'Zalo'].map((channel) => (
                    <label key={channel} className="flex items-center gap-2 p-3 border-2 border-gray-300 rounded-lg hover:border-pink-500 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-pink-600" />
                      <span className="text-sm text-gray-900">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Schedule or Live Now */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Thời gian</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 border-2 border-pink-600 bg-pink-50 rounded-lg">
                    <Play className="w-5 h-5 text-pink-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-900">Bắt đầu ngay</p>
                  </button>
                  <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-gray-400">
                    <Clock className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-900">Lên lịch</p>
                  </button>
                </div>
              </div>

              {/* Stream Settings */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm text-gray-900 mb-3">Cài đặt stream</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Chất lượng:</span>
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                      <option>1080p (Full HD)</option>
                      <option>720p (HD)</option>
                      <option>480p (SD)</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <span>Bitrate:</span>
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                      <option>4500 kbps</option>
                      <option>3000 kbps</option>
                      <option>1500 kbps</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bật chat:</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tự động lưu:</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-600" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowStartModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Bắt đầu Livestream
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
