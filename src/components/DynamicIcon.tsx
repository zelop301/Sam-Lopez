import React from 'react';
import * as Icons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = '', size = 20 }) => {
  // Safe dynamic resolution
  const IconComponent = (Icons as any)[name];
  
  if (!IconComponent) {
    // Default fallback icon
    return <Icons.ExternalLink className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
