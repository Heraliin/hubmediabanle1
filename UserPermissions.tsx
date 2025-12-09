import { useState } from 'react';
import { Shield, User, Edit, Trash2, Plus, Check, X, Search } from 'lucide-react';

interface UserRole {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'moderator' | 'viewer';
  avatar: string;
  status: 'active' | 'inactive';
  lastActive: string;
  permissions: string[];
}

interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  color: string;
}

export function UserPermissions() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const allPermissions = [
    { id: 'content_create', label: 'Tạo nội dung', category: 'Quản lý nội dung' },
    { id: 'content_edit', label: 'Chỉnh sửa nội dung', category: 'Quản lý nội dung' },
    { id: 'content_delete', label: 'Xóa nội dung', category: 'Quản lý nội dung' },
    { id: 'content_publish', label: 'Xuất bản nội dung', category: 'Quản lý nội dung' },
    { id: 'ugc_moderate', label: 'Duyệt UGC', category: 'UGC' },
    { id: 'ugc_delete', label: 'Xóa UGC', category: 'UGC' },
    { id: 'analytics_view', label: 'Xem phân tích', category: 'Analytics' },
    { id: 'analytics_export', label: 'Xuất báo cáo', category: 'Analytics' },
    { id: 'user_manage', label: 'Quản lý người dùng', category: 'Hệ thống' },
    { id: 'settings_manage', label: 'Quản lý cài đặt', category: 'Hệ thống' },
    { id: 'livestream_start', label: 'Bắt đầu livestream', category: 'Livestream' },
    { id: 'livestream_moderate', label: 'Kiểm duyệt livestream', category: 'Livestream' },
  ];

  const roleTemplates: RoleTemplate[] = [
    {
      id: 'admin',
      name: 'Admin',
      description: 'Toàn quyền truy cập và quản lý hệ thống',
      permissions: allPermissions.map(p => p.id),
      color: 'red'
    },
    {
      id: 'editor',
      name: 'Editor',
      description: 'Quản lý và xuất bản nội dung',
      permissions: ['content_create', 'content_edit', 'content_delete', 'content_publish', 'analytics_view', 'livestream_start'],
      color: 'blue'
    },
    {
      id: 'moderator',
      name: 'Moderator',
      description: 'Kiểm duyệt UGC và nội dung người dùng',
      permissions: ['ugc_moderate', 'ugc_delete', 'analytics_view', 'livestream_moderate'],
      color: 'green'
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Chỉ xem và theo dõi',
      permissions: ['analytics_view'],
      color: 'gray'
    }
  ];

  const users: UserRole[] = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      email: 'admin@hubmedia.com',
      role: 'admin',
      avatar: '👨‍💼',
      status: 'active',
      lastActive: '2025-12-09T14:30:00',
      permissions: roleTemplates.find(r => r.id === 'admin')!.permissions
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      email: 'editor@hubmedia.com',
      role: 'editor',
      avatar: '👩‍💻',
      status: 'active',
      lastActive: '2025-12-09T13:15:00',
      permissions: roleTemplates.find(r => r.id === 'editor')!.permissions
    },
    {
      id: 3,
      name: 'Lê Minh Cường',
      email: 'moderator@hubmedia.com',
      role: 'moderator',
      avatar: '👨‍🔧',
      status: 'active',
      lastActive: '2025-12-09T12:00:00',
      permissions: roleTemplates.find(r => r.id === 'moderator')!.permissions
    },
    {
      id: 4,
      name: 'Phạm Thu Dung',
      email: 'viewer@hubmedia.com',
      role: 'viewer',
      avatar: '👩',
      status: 'inactive',
      lastActive: '2025-12-08T10:00:00',
      permissions: roleTemplates.find(r => r.id === 'viewer')!.permissions
    }
  ];

  const filteredUsers = selectedRole === 'all' 
    ? users 
    : users.filter(u => u.role === selectedRole);

  const getRoleColor = (role: string) => {
    const template = roleTemplates.find(r => r.id === role);
    return template?.color || 'gray';
  };

  const getRoleName = (role: string) => {
    const template = roleTemplates.find(r => r.id === role);
    return template?.name || role;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl text-gray-900">Quản lý phân quyền</h2>
          <p className="text-sm text-gray-600 mt-1">Quản lý người dùng và phân quyền truy cập hệ thống</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Thêm người dùng
        </button>
      </div>

      {/* Role Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roleTemplates.map((template) => (
          <div key={template.id} className={`bg-white rounded-xl p-6 shadow-sm border-2 border-${template.color}-200`}>
            <div className={`w-12 h-12 bg-${template.color}-100 rounded-lg flex items-center justify-center mb-3`}>
              <Shield className={`w-6 h-6 text-${template.color}-600`} />
            </div>
            <h3 className="text-gray-900 mb-2">{template.name}</h3>
            <p className="text-xs text-gray-600 mb-3">{template.description}</p>
            <p className="text-sm text-gray-500">{template.permissions.length} quyền</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex gap-2">
        <button
          onClick={() => setSelectedRole('all')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedRole === 'all'
              ? 'bg-pink-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tất cả
        </button>
        {roleTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedRole(template.id)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedRole === template.id
                ? `bg-${template.color}-500 text-white`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Người dùng</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Vai trò</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Trạng thái</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Hoạt động lần cuối</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Quyền hạn</th>
                <th className="text-right py-4 px-6 text-sm text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-xl">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 bg-${getRoleColor(user.role)}-100 text-${getRoleColor(user.role)}-700 rounded-full text-xs`}>
                      {getRoleName(user.role)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-600">
                      {new Date(user.lastActive).toLocaleString('vi-VN')}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-900">{user.permissions.length} quyền</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Ma trận phân quyền</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Quyền hạn</th>
                {roleTemplates.map((template) => (
                  <th key={template.id} className="text-center py-3 px-4 text-sm text-gray-600">
                    {template.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(
                allPermissions.reduce((acc, perm) => {
                  if (!acc[perm.category]) acc[perm.category] = [];
                  acc[perm.category].push(perm);
                  return acc;
                }, {} as Record<string, typeof allPermissions>)
              ).map(([category, perms]) => (
                <>
                  <tr key={category} className="bg-gray-50">
                    <td colSpan={roleTemplates.length + 1} className="py-2 px-4 text-sm text-gray-900">
                      {category}
                    </td>
                  </tr>
                  {perms.map((perm) => (
                    <tr key={perm.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">{perm.label}</td>
                      {roleTemplates.map((template) => (
                        <td key={template.id} className="text-center py-3 px-4">
                          {template.permissions.includes(perm.id) ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl text-gray-900">Thêm người dùng mới</h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Họ và tên</label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Vai trò</label>
                <div className="grid grid-cols-2 gap-3">
                  {roleTemplates.map((template) => (
                    <label key={template.id} className={`p-4 border-2 border-gray-300 rounded-lg hover:border-${template.color}-500 cursor-pointer`}>
                      <input type="radio" name="role" className="mb-2" />
                      <p className="text-sm text-gray-900">{template.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom Permissions */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Tùy chỉnh quyền (tùy chọn)</label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-4 border border-gray-300 rounded-lg">
                  {allPermissions.map((perm) => (
                    <label key={perm.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="w-4 h-4 text-pink-600" />
                      <span className="text-gray-700">{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowAddUser(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all">
                Thêm người dùng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
