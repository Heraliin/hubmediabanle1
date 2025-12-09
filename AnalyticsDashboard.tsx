import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Eye, Heart, Share2, Users, ArrowUp, ArrowDown, Download } from 'lucide-react';

export function AnalyticsDashboard() {
  const overallStats = [
    { label: 'Tổng lượt tiếp cận', value: '2.4M', change: '+15.3%', trend: 'up' },
    { label: 'Tương tác trung bình', value: '156K', change: '+8.7%', trend: 'up' },
    { label: 'Tỷ lệ tương tác', value: '6.5%', change: '-0.8%', trend: 'down' },
    { label: 'Tỷ lệ chuyển đổi', value: '4.2%', change: '+1.2%', trend: 'up' },
  ];

  const weeklyData = [
    { day: 'T2', reach: 320000, engagement: 28000, clicks: 12000, shares: 3400 },
    { day: 'T3', reach: 380000, engagement: 35000, clicks: 15000, shares: 4200 },
    { day: 'T4', reach: 350000, engagement: 32000, clicks: 14000, shares: 3800 },
    { day: 'T5', reach: 420000, engagement: 41000, clicks: 18000, shares: 5100 },
    { day: 'T6', reach: 480000, engagement: 52000, clicks: 22000, shares: 6200 },
    { day: 'T7', reach: 560000, engagement: 68000, clicks: 28000, shares: 7800 },
    { day: 'CN', reach: 520000, engagement: 62000, clicks: 25000, shares: 7200 },
  ];

  const channelComparison = [
    { channel: 'Facebook', reach: 850000, engagement: 125000, followers: 45000, conversion: 4.8 },
    { channel: 'TikTok', reach: 1200000, engagement: 280000, followers: 89000, conversion: 3.2 },
    { channel: 'YouTube', reach: 420000, engagement: 58000, followers: 32000, conversion: 5.6 },
    { channel: 'Zalo', reach: 380000, engagement: 45000, followers: 28000, conversion: 6.2 },
  ];

  const contentPerformance = [
    { type: 'Video ngắn', posts: 145, avgReach: 45000, avgEngagement: 8500, color: '#FF6B6B' },
    { type: 'Livestream', posts: 28, avgReach: 82000, avgEngagement: 15200, color: '#4ECDC4' },
    { type: 'Bài viết', posts: 89, avgReach: 28000, avgEngagement: 3200, color: '#FFE66D' },
    { type: 'Story', posts: 203, avgReach: 15000, avgEngagement: 2100, color: '#95E1D3' },
  ];

  const demographicData = [
    { age: '13-17', value: 8, color: '#FF6B6B' },
    { age: '18-24', value: 35, color: '#4ECDC4' },
    { age: '25-34', value: 42, color: '#FFE66D' },
    { age: '35-44', value: 12, color: '#95E1D3' },
    { age: '45+', value: 3, color: '#A8E6CF' },
  ];

  const topPosts = [
    { title: 'Review son lì mới 2025 - Top 10 màu HOT', reach: 245000, engagement: 32000, conversion: 5.8 },
    { title: 'Livestream Flash Sale - Giảm 50%', reach: 198000, engagement: 28000, conversion: 7.2 },
    { title: 'Quy trình skincare 10 bước', reach: 156000, engagement: 18500, conversion: 4.3 },
    { title: 'Makeup look Tết 2025', reach: 142000, engagement: 16200, conversion: 3.9 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl text-gray-900">Phân tích & Báo cáo</h2>
          <p className="text-sm text-gray-600 mt-1">Theo dõi hiệu suất và phân tích dữ liệu đa kênh</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
            <option>7 ngày qua</option>
            <option>30 ngày qua</option>
            <option>90 ngày qua</option>
            <option>Tùy chỉnh</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
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
              <span className="text-xs text-gray-500 ml-1">so với tuần trước</span>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Hiệu suất theo ngày</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Area type="monotone" dataKey="reach" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorReach)" name="Tiếp cận" />
            <Area type="monotone" dataKey="engagement" stroke="#ec4899" fillOpacity={1} fill="url(#colorEngagement)" name="Tương tác" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Channel Comparison & Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">So sánh hiệu suất kênh</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="channel" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="reach" fill="#8b5cf6" name="Tiếp cận" radius={[8, 8, 0, 0]} />
              <Bar dataKey="engagement" fill="#ec4899" name="Tương tác" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Demographics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">Độ tuổi người theo dõi</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={demographicData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ age, percent }) => `${age}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {demographicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Type Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Hiệu suất theo loại nội dung</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Loại nội dung</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Số bài đăng</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">TB Tiếp cận</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">TB Tương tác</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Tỷ lệ tương tác</th>
              </tr>
            </thead>
            <tbody>
              {contentPerformance.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-900">{item.type}</span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4 text-sm text-gray-900">{item.posts}</td>
                  <td className="text-right py-4 px-4 text-sm text-gray-900">{item.avgReach.toLocaleString()}</td>
                  <td className="text-right py-4 px-4 text-sm text-gray-900">{item.avgEngagement.toLocaleString()}</td>
                  <td className="text-right py-4 px-4 text-sm text-gray-900">
                    {((item.avgEngagement / item.avgReach) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Bài đăng hiệu suất cao nhất</h3>
        <div className="space-y-3">
          {topPosts.map((post, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm text-gray-900 mb-2">{post.title}</h4>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.reach.toLocaleString()} tiếp cận</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{post.engagement.toLocaleString()} tương tác</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>{post.conversion}% chuyển đổi</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                  Chi tiết
                </button>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${(post.engagement / post.reach) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Channel Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {channelComparison.map((channel, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h4 className="text-gray-900 mb-4">{channel.channel}</h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Tiếp cận</span>
                  <span className="text-sm text-gray-900">{channel.reach.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Tương tác</span>
                  <span className="text-sm text-gray-900">{channel.engagement.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Người theo dõi</span>
                  <span className="text-sm text-gray-900">{channel.followers.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Chuyển đổi</span>
                  <span className="text-sm text-gray-900">{channel.conversion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${channel.conversion * 10}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
