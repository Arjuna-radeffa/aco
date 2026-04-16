import React from 'react';

interface MaterialIconProps {
  icon: string;
  size?: 'small' | 'medium' | 'large';
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({ icon, size = 'medium' }) => {
  const sizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }[size];

  return (
    <i className={`material-icons ${sizeClass}`} style={{ fontSize: size === 'large' ? '24px' : size === 'medium' ? '20px' : '16px' }}>
      {icon}
    </i>
  );
};

// Icon mapping untuk dashboard
export const dashboardIcons = {
  // Wakif
  wakif: 'domain',
  building: 'apartment',
  chart: 'show_chart',
  people: 'people',
  shield: 'security',
  
  // Mustahiq
  gift: 'card_giftcard',
  program: 'school',
  trending: 'trending_up',
  star: 'star',
  
  // Investment Officer
  pipeline: 'list',
  approved: 'check_circle',
  review: 'schedule',
  rejected: 'cancel',
  
  // Portfolio Monitor
  healthy: 'favorite',
  warning: 'warning',
  critical: 'error',
  health: 'monitoring',
  
  // Finance Officer
  cash: 'account_balance',
  lock: 'lock',
  verified: 'verified',
  trending_up: 'trending_up',
  
  // Admin
  users: 'group',
  system: 'storage',
  security_admin: 'security',
  logs: 'description',
  
  // Munfiq
  heart: 'favorite',
  donor_program: 'volunteer_activism',
  beneficiary: 'people_alt',
  impact: 'trending_up'
};
