// src/components/KnownForList.tsx
import React from 'react';
import { type TmdbKnownForMedia } from '../types/tmdb';
import { buildProfileImageUrl } from '../api/tmdb';

interface KnownForListProps {
  items: TmdbKnownForMedia[];
}

const formatDate = (value?: string): string => {
  if (!value) {
    return 'Unknown date';
  }
  return value;
};

const getTitle = (media: TmdbKnownForMedia): string => {
  if (media.title) {
    return media.title;
  }
  if (media.name) {
    return media.name;
  }
  if (media.original_title) {
    return media.original_title;
  }
  if (media.original_name) {
    return media.original_name;
  }
  return 'Untitled';
};

export const KnownForList: React.FC<KnownForListProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return <p className="subtle">No known works listed.</p>;
  }

  return (
    <div className="knownfor-list">
      <h3>Known for</h3>
      <ul>
        {items.map((media) => {
          const title = getTitle(media);
          const date =
            media.release_date ?? media.first_air_date ?? undefined;

          return (
            <li key={media.id} className="knownfor-item">
              {media.poster_path && (
                <img
                  className="knownfor-poster"
                  src={buildProfileImageUrl(media.poster_path, 'w154')}
                  alt={title}
                />
              )}
              <div className="knownfor-content">
                <h4>{title}</h4>
                <p className="knownfor-meta">
                  {media.media_type.toUpperCase()} · {formatDate(date)}
                </p>
                <p className="knownfor-overview">{media.overview}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
