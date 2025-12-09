import { useState } from 'react';
import { DashboardView } from './components/DashboardView';
import { ContentManager } from './components/ContentManager';
import { ChannelPublisher } from './components/ChannelPublisher';
import { LivestreamManager } from './components/LivestreamManager';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { UGCModeration } from './components/UGCModeration';
import { UserPermissions } from './components/UserPermissions';
import { SEOTools } from './components/SEOTools';
import { ComplianceManager } from './components/ComplianceManager';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

export type ViewType = 'dashboard' | 'content' | 'publisher' | 'livestream' | 'analytics' | 'ugc' | 'permissions' | 'seo' | 'compliance';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView onNavigate={setCurrentView} />;
      case 'content':
        return <ContentManager />;
      case 'publisher':
        return <ChannelPublisher />;
      case 'livestream':
        return <LivestreamManager />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'ugc':
        return <UGCModeration />;
      case 'permissions':
        return <UserPermissions />;
      case 'seo':
        return <SEOTools />;
      case 'compliance':
        return <ComplianceManager />;
      default:
        return <DashboardView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentView={currentView}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
