import { useState, useEffect } from "react";
import { getPersonImages, buildProfileImageUrl } from "../api/tmdb";
import type { TmdbImageProfile } from "../types/tmdb";

interface ImagesForProps {
  personId: number;
}

export const ImagesFor: React.FC<ImagesForProps> = ({ personId }) => {
  const [images, setImages] = useState<TmdbImageProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      setLoading(true);
      setError(null);

      try {
        const profiles = await getPersonImages(personId);
        if (!cancelled) {
          setImages(profiles);
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Unknown error while fetching images.');
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadImages();

    return () => {
      cancelled = true;
    };
  }, [personId]);

  if (loading) {
    return <p className="subtle">Loading images…</p>;
  }

  if (error) {
    return <p className="error">Failed to load images: {error}</p>;
  }

  if (images.length === 0) {
    return <p className="subtle">No profile images available.</p>;
  }

  return (
    <div className="images-grid">
      {images.map((img) => (
        <img
          key={img.file_path}
          src={buildProfileImageUrl(img.file_path, 'w185')}
          alt="Profile"
          className="profile-image"
        />
      ))}
    </div>
  );
};
