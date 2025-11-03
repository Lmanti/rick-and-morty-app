import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ArrowLeft, Heart, MapPin, Globe } from 'lucide-react';
import { GET_CHARACTER } from '../../graphql/queries';
import { Loading } from '../common/Loading';
import { Error } from '../common/Error';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleStarred, selectIsStarred } from '../../redux/slices/starredSlice';
import { CommentsSection } from '../common/CommentsSection';

export const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: {
      characterId: parseInt(id, 10)
    },
  });

  const character = data?.character;
  const isStarred = useAppSelector(selectIsStarred(parseInt(id, 10)));

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!character) return <Error message="Character not found" />;

  const handleToggleStar = () => {
    dispatch(toggleStarred(character));
  };

  return (
    <div className="flex flex-col w-full p-6 card overflow-hidden">
      <button
        onClick={() => navigate('/')}
        className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to list</span>
      </button>

      <div className="flex flex-col px-20 py-3">
        <img
          src={character.image}
          alt={character.name}
          className="rounded-full w-40 h-40 object-cover mb-4 shadow"
        />
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            {character.name}
          </h1>
          <button
            onClick={handleToggleStar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={isStarred ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-6 h-6 ${
                isStarred ? 'fill-green-500 text-green-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            />
          </button>
        </div>

        <div className="w-full space-y-4">
          <div className="pt-2 mt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Specie</h3>
            <p className="text-gray-500">{character.species?.name}</p>
          </div>
          <div className="border-t pt-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Type</h3>
            <p className="text-gray-500">{character.type || '-'}</p>
          </div>  
          <div className="border-t pt-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Status</h3>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full flex-shrink-0 ${ character.status?.name === 'Alive' ? 'bg-green-500' : character.status?.name === 'Dead' ? 'bg-red-500' : 'bg-gray-400' }`} />
              <p className="text-gray-500">{character.status?.name}</p>
            </div>
          </div>
          <div className="border-t pt-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Gender</h3>
            <p className="text-gray-500">{character.gender?.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">Origin</h3>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <p className="text-gray-500">{character.origin?.name}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">Last known location</h3>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <p className="text-gray-500">{character.location?.name}</p>
            </div>
          </div>
          <div className="border-t pt-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Appearances</h3>
            <p className="text-gray-500">{character.episodeCount} episode(s)</p>
          </div>
          <div className="border-t pt-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Comments</h3>
            <CommentsSection characterId={character.id} />
          </div>
        </div>
      </div>
    </div>
  );
};