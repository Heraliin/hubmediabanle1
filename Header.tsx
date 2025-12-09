import { Bell, Settings, User, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import type { ViewType } from '../App';

interface HeaderProps {
  currentView: ViewType;
  onToggleSidebar: () => void;
}

const viewTitles: Record<ViewType, string> = {
  dashboard: 'Tổng quan hệ thống',
  content: 'Quản lý nội dung',
  publisher: 'Xuất bản đa kênh',
  livestream: 'Quản lý Livestream & Video',
  analytics: 'Phân tích & Báo cáo',
  ugc: 'Quản trị nội dung người dùng',
  permissions: 'Quản lý phân quyền',
  seo: 'Công cụ SEO & Tối ưu',
  compliance: 'Tuân thủ & Nhật ký',
};

export function Header({ currentView, onToggleSidebar }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, text: 'Bài viết mới cần duyệt UGC', time: '5 phút trước', unread: true },
    { id: 2, text: 'Livestream đã kết thúc: 1.2K người xem', time: '1 giờ trước', unread: true },
    { id: 3, text: 'Facebook post đạt 500 tương tác', time: '2 giờ trước', unread: false },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-gray-900">{viewTitles[currentView]}</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm text-gray-900">Thông báo</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      notif.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p className="text-sm text-gray-900">{notif.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-gray-200">
                <button className="text-xs text-pink-600 hover:text-pink-700">
                  Xem tất cả thông báo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">Quản trị viên</p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm text-gray-900">admin@hubmedia.com</p>
                <p className="text-xs text-gray-500 mt-1">Quản trị viên cấp cao</p>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg text-left transition-colors">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Hồ sơ của tôi</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg text-left transition-colors">
                  <Settings className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Cài đặt</span>
                </button>
              </div>
              <div className="p-2 border-t border-gray-200">
                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-lg text-left transition-colors">
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600">Đăng xuất</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
