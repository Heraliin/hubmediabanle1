import { LayoutDashboard, FileText, Share2, Video, BarChart3, Users, Shield, Search, FileCheck, Menu } from 'lucide-react';
import type { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ currentView, onNavigate, isOpen }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as ViewType, label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'content' as ViewType, label: 'Quản lý nội dung', icon: FileText },
    { id: 'publisher' as ViewType, label: 'Xuất bản đa kênh', icon: Share2 },
    { id: 'livestream' as ViewType, label: 'Livestream & Video', icon: Video },
    { id: 'analytics' as ViewType, label: 'Phân tích & Báo cáo', icon: BarChart3 },
    { id: 'ugc' as ViewType, label: 'Quản trị UGC', icon: Users },
    { id: 'seo' as ViewType, label: 'SEO & Tối ưu', icon: Search },
    { id: 'permissions' as ViewType, label: 'Phân quyền', icon: Shield },
    { id: 'compliance' as ViewType, label: 'Tuân thủ & Logs', icon: FileCheck },
  ];

  if (!isOpen) {
    return (
      <div className="w-16 bg-gradient-to-b from-pink-600 to-purple-700 text-white flex flex-col items-center py-4 space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`p-3 rounded-lg transition-all ${
                currentView === item.id
                  ? 'bg-white text-pink-600'
                  : 'hover:bg-white/20'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <aside className="w-64 bg-gradient-to-b from-pink-600 to-purple-700 text-white flex flex-col">
      <div className="p-6 border-b border-white/20">
        <h1 className="text-xl tracking-tight">Hub Media Cosmetic</h1>
        <p className="text-pink-100 text-xs mt-1">Quản trị nội dung đa kênh</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentView === item.id
                  ? 'bg-white text-pink-600 shadow-lg'
                  : 'hover:bg-white/20'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-white/20">
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-xs text-pink-100 mb-2">Phiên bản</p>
          <p className="text-sm">v2.0.1 - Beta</p>
          <p className="text-xs text-pink-100 mt-1">www.hubmediacomestictnx2.com</p>
        </div>
      </div>
    </aside>
  );
}
