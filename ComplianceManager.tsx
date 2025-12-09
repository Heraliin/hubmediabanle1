import { useState } from 'react';
import { Shield, FileText, Clock, Download, Eye, CheckCircle, AlertTriangle, Database, Lock } from 'lucide-react';

interface ActivityLog {
  id: number;
  user: string;
  action: string;
  module: string;
  timestamp: string;
  ip: string;
  status: 'success' | 'warning' | 'error';
}

interface ConsentRecord {
  id: number;
  user: string;
  email: string;
  type: 'marketing' | 'analytics' | 'personalization' | 'all';
  status: 'granted' | 'declined' | 'pending';
  date: string;
}

export function ComplianceManager() {
  const [selectedLogFilter, setSelectedLogFilter] = useState<'all' | 'success' | 'warning' | 'error'>('all');
  const [dateRange, setDateRange] = useState('7days');

  const activityLogs: ActivityLog[] = [
    {
      id: 1,
      user: 'admin@hubmedia.com',
      action: 'Duyệt UGC content',
      module: 'UGC Moderation',
      timestamp: '2025-12-09T14:32:15',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: 2,
      user: 'editor@hubmedia.com',
      action: 'Xuất bản bài viết lên Facebook',
      module: 'Channel Publisher',
      timestamp: '2025-12-09T13:45:22',
      ip: '192.168.1.101',
      status: 'success'
    },
    {
      id: 3,
      user: 'moderator@hubmedia.com',
      action: 'Xóa comment vi phạm',
      module: 'UGC Moderation',
      timestamp: '2025-12-09T12:18:09',
      ip: '192.168.1.102',
      status: 'warning'
    },
    {
      id: 4,
      user: 'editor@hubmedia.com',
      action: 'Thử xuất bản lên TikTok (thất bại - token hết hạn)',
      module: 'Channel Publisher',
      timestamp: '2025-12-09T11:23:45',
      ip: '192.168.1.101',
      status: 'error'
    },
    {
      id: 5,
      user: 'admin@hubmedia.com',
      action: 'Thay đổi phân quyền người dùng',
      module: 'User Permissions',
      timestamp: '2025-12-09T10:15:33',
      ip: '192.168.1.100',
      status: 'success'
    }
  ];

  const consentRecords: ConsentRecord[] = [
    {
      id: 1,
      user: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      type: 'all',
      status: 'granted',
      date: '2025-12-08T09:00:00'
    },
    {
      id: 2,
      user: 'Trần Thị B',
      email: 'tranthib@example.com',
      type: 'marketing',
      status: 'declined',
      date: '2025-12-07T14:30:00'
    },
    {
      id: 3,
      user: 'Lê Minh C',
      email: 'leminhc@example.com',
      type: 'analytics',
      status: 'granted',
      date: '2025-12-06T11:15:00'
    }
  ];

  const filteredLogs = selectedLogFilter === 'all' 
    ? activityLogs 
    : activityLogs.filter(log => log.status === selectedLogFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Thành công';
      case 'warning': return 'Cảnh báo';
      case 'error': return 'Lỗi';
      default: return status;
    }
  };

  const getConsentTypeText = (type: string) => {
    switch (type) {
      case 'all': return 'Tất cả';
      case 'marketing': return 'Marketing';
      case 'analytics': return 'Phân tích';
      case 'personalization': return 'Cá nhân hóa';
      default: return type;
    }
  };

  const getConsentStatusColor = (status: string) => {
    switch (status) {
      case 'granted': return 'bg-green-100 text-green-700';
      case 'declined': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getConsentStatusText = (status: string) => {
    switch (status) {
      case 'granted': return 'Đã đồng ý';
      case 'declined': return 'Từ chối';
      case 'pending': return 'Chờ xác nhận';
      default: return status;
    }
  };

  const complianceStats = [
    { label: 'Logs hôm nay', value: '1,234', icon: FileText, color: 'blue' },
    { label: 'Consent đã thu thập', value: '5,678', icon: CheckCircle, color: 'green' },
    { label: 'Cảnh báo bảo mật', value: '3', icon: AlertTriangle, color: 'yellow' },
    { label: 'Dung lượng data', value: '2.4 GB', icon: Database, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-gray-900">Tuân thủ & Nhật ký hệ thống</h2>
        <p className="text-sm text-gray-600 mt-1">Quản lý consent, logs và tuân thủ quy định bảo mật</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-2xl text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Logs */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h3 className="text-gray-900">Nhật ký hoạt động</h3>
          <div className="flex gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="today">Hôm nay</option>
              <option value="7days">7 ngày qua</option>
              <option value="30days">30 ngày qua</option>
              <option value="custom">Tùy chỉnh</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all">
              <Download className="w-4 h-4" />
              Xuất logs
            </button>
          </div>
        </div>

        {/* Log Filters */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedLogFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedLogFilter === 'all'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setSelectedLogFilter('success')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedLogFilter === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Thành công
          </button>
          <button
            onClick={() => setSelectedLogFilter('warning')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedLogFilter === 'warning'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cảnh báo
          </button>
          <button
            onClick={() => setSelectedLogFilter('error')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedLogFilter === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Lỗi
          </button>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Thời gian</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Người dùng</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Hành động</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Module</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">IP Address</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-900">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {new Date(log.timestamp).toLocaleString('vi-VN')}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{log.user}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{log.action}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {log.module}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600 font-mono">{log.ip}</p>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(log.status)}`}>
                      {getStatusText(log.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consent Management */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Quản lý Consent (GDPR/CCPA)</h3>
          <button className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-colors text-sm">
            Xuất báo cáo consent
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Người dùng</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Email</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Loại consent</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Trạng thái</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Ngày cập nhật</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {consentRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{record.user}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{record.email}</p>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {getConsentTypeText(record.type)}
                    </span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getConsentStatusColor(record.status)}`}>
                      {getConsentStatusText(record.status)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">
                      {new Date(record.date).toLocaleString('vi-VN')}
                    </p>
                  </td>
                  <td className="text-right py-4 px-4">
                    <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                      <Eye className="w-4 h-4 inline mr-1" />
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Privacy & Security Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Retention */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">Chính sách lưu trữ dữ liệu</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">Tự động xóa logs sau</p>
                <p className="text-xs text-gray-500 mt-1">Logs hoạt động cũ sẽ bị xóa</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>30 ngày</option>
                <option>60 ngày</option>
                <option>90 ngày</option>
                <option>1 năm</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">Lưu trữ dữ liệu người dùng</p>
                <p className="text-xs text-gray-500 mt-1">Thời gian lưu thông tin cá nhân</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>1 năm</option>
                <option>2 năm</option>
                <option>5 năm</option>
                <option>Vĩnh viễn</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-900">Backup tự động</p>
                <p className="text-xs text-gray-500 mt-1">Sao lưu dữ liệu định kỳ</p>
              </div>
              <button className="w-12 h-6 rounded-full bg-pink-600">
                <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">Tính năng bảo mật</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-900">Xác thực 2 lớp (2FA)</p>
                  <p className="text-xs text-gray-500 mt-1">Bắt buộc cho Admin</p>
                </div>
              </div>
              <button className="w-12 h-6 rounded-full bg-pink-600">
                <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-900">Giới hạn đăng nhập thất bại</p>
                  <p className="text-xs text-gray-500 mt-1">Khóa sau 5 lần thất bại</p>
                </div>
              </div>
              <button className="w-12 h-6 rounded-full bg-pink-600">
                <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-900">Cảnh báo hoạt động bất thường</p>
                  <p className="text-xs text-gray-500 mt-1">Email thông báo real-time</p>
                </div>
              </div>
              <button className="w-12 h-6 rounded-full bg-pink-600">
                <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Checklist */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Checklist tuân thủ pháp lý</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { item: 'Chính sách quyền riêng tư (Privacy Policy)', status: true },
            { item: 'Điều khoản sử dụng (Terms of Service)', status: true },
            { item: 'Cookie consent banner', status: true },
            { item: 'GDPR compliance (EU)', status: true },
            { item: 'CCPA compliance (California)', status: false },
            { item: 'Quyền xóa dữ liệu cá nhân', status: true },
            { item: 'Quyền truy xuất dữ liệu', status: true },
            { item: 'Thông báo vi phạm dữ liệu', status: false },
          ].map((check, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-900">{check.item}</span>
              {check.status ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
