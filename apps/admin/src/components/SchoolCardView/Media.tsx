import type { SchoolMedia } from '@/types/School2.type';
import { Badge } from '../ui/badge';
import { ExternalLink } from 'lucide-react';

const MediaCardContent = ({ section }: { section?: SchoolMedia }) => {
  if (!section) return null;

  const links = [
    { label: 'BQA Report', url: section.bqaReportLink, icon: '📄' },
    { label: 'Brochure', url: section.brochureLink, icon: '📄' },
    { label: 'Photo Gallery', url: section.galleryLink, icon: '🖼️' },
    { label: 'Virtual Tour', url: section.videoTourLink, icon: '🎥' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2">
        {links
          .filter((link) => link.url)
          .map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        {links.filter((link) => link.url).length === 0 && (
          <p className="text-sm text-gray-500">No media links provided</p>
        )}
      </div>
    </div>
  );
};

export default MediaCardContent;
