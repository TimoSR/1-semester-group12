// src/components/PersonCard.tsx
import React from 'react';
import type { TmdbPerson } from '../types/tmdb';
import { buildProfileImageUrl } from '../api/tmdb';
import { KnownForList } from './KnownForList';
import { ImagesFor } from './ImagesFor';

interface PersonCardProps {
  person: TmdbPerson;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <article className="person-card">
      <header className="person-header">
        <div className="person-main">
          <h2>{person.name}</h2>
          <p className="person-department">
            Department: {person.known_for_department}
          </p>
          <p className="person-meta">
            Popularity: {person.popularity.toFixed(1)} · ID: {person.id}
          </p>
        </div>
        {person.profile_path && (
          <img
            className="person-avatar"
            src={buildProfileImageUrl(person.profile_path, 'w185')}
            alt={person.name}
          />
        )}
      </header>

      <section className="person-images">
        <h3>Profile images</h3>
        <ImagesFor personId={person.id} />
      </section>

      <section className="person-knownfor">
        <KnownForList items={person.known_for} />
      </section>
    </article>
  );
};
