import { TrendingUp, Users, Eye, Heart, ArrowUp, ArrowDown, Video, FileText, Share2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ViewType } from '../App';

interface DashboardViewProps {
  onNavigate: (view: ViewType) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const stats = [
    { label: 'Tổng lượt xem', value: '2.4M', change: '+12.5%', trend: 'up', icon: Eye, color: 'blue' },
    { label: 'Tương tác', value: '156K', change: '+8.2%', trend: 'up', icon: Heart, color: 'pink' },
    { label: 'Người theo dõi', value: '89.5K', change: '+15.3%', trend: 'up', icon: Users, color: 'purple' },
    { label: 'Tỷ lệ chuyển đổi', value: '4.2%', change: '-0.5%', trend: 'down', icon: TrendingUp, color: 'green' },
  ];

  const channelData = [
    { name: 'Facebook', posts: 145, reach: 450000, engagement: 45000, color: '#1877F2' },
    { name: 'Zalo', posts: 98, reach: 280000, engagement: 32000, color: '#0068FF' },
    { name: 'TikTok', posts: 203, reach: 890000, engagement: 125000, color: '#000000' },
    { name: 'YouTube', posts: 56, reach: 320000, engagement: 28000, color: '#FF0000' },
  ];

  const performanceData = [
    { date: '01/12', views: 45000, engagement: 4200, followers: 850 },
    { date: '02/12', views: 52000, engagement: 5100, followers: 920 },
    { date: '03/12', views: 48000, engagement: 4800, followers: 780 },
    { date: '04/12', views: 61000, engagement: 6300, followers: 1100 },
    { date: '05/12', views: 55000, engagement: 5500, followers: 950 },
    { date: '06/12', views: 72000, engagement: 7800, followers: 1450 },
    { date: '07/12', views: 68000, engagement: 7200, followers: 1320 },
  ];

  const contentTypeData = [
    { name: 'Video ngắn', value: 45, color: '#FF6B6B' },
    { name: 'Livestream', value: 25, color: '#4ECDC4' },
    { name: 'Bài viết', value: 20, color: '#FFE66D' },
    { name: 'Story', value: 10, color: '#95E1D3' },
  ];

  const recentActivities = [
    { id: 1, type: 'publish', text: 'Đã xuất bản video "Review son mới 2025" lên TikTok', time: '10 phút trước', icon: Video },
    { id: 2, type: 'ugc', text: 'Đã duyệt 12 nội dung UGC mới', time: '25 phút trước', icon: FileText },
    { id: 3, type: 'livestream', text: 'Livestream "Skincare routine buổi tối" đã kết thúc - 2.3K người xem', time: '1 giờ trước', icon: Video },
    { id: 4, type: 'share', text: 'Bài viết đã được chia sẻ đồng thời lên 4 kênh', time: '2 giờ trước', icon: Share2 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl text-gray-900 mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">Hiệu suất theo thời gian</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} name="Lượt xem" />
              <Line type="monotone" dataKey="engagement" stroke="#ec4899" strokeWidth={2} name="Tương tác" />
              <Line type="monotone" dataKey="followers" stroke="#06b6d4" strokeWidth={2} name="Người theo dõi" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Content Type Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">Phân bố loại nội dung</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {contentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel Performance & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">Hiệu suất kênh</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="reach" fill="#8b5cf6" name="Охват" radius={[8, 8, 0, 0]} />
              <Bar dataKey="engagement" fill="#ec4899" name="Tương tác" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="p-2 bg-pink-100 rounded-lg flex-shrink-0">
                    <Icon className="w-4 h-4 text-pink-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => onNavigate('content')}
            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all"
          >
            Xem tất cả hoạt động
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => onNavigate('content')}
            className="p-4 border-2 border-pink-200 rounded-lg hover:bg-pink-50 hover:border-pink-400 transition-all text-left"
          >
            <FileText className="w-6 h-6 text-pink-600 mb-2" />
            <p className="text-sm text-gray-900">Tạo nội dung mới</p>
          </button>
          <button 
            onClick={() => onNavigate('publisher')}
            className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-400 transition-all text-left"
          >
            <Share2 className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-sm text-gray-900">Xuất bản đa kênh</p>
          </button>
          <button 
            onClick={() => onNavigate('livestream')}
            className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all text-left"
          >
            <Video className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-sm text-gray-900">Bắt đầu Livestream</p>
          </button>
          <button 
            onClick={() => onNavigate('ugc')}
            className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 hover:border-green-400 transition-all text-left"
          >
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-sm text-gray-900">Duyệt UGC</p>
          </button>
        </div>
      </div>
    </div>
  );
}
