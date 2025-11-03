import { CharacterCard } from './CharacterCard';
import { Loading } from '../common/Loading';
import { Error } from '../common/Error';

export const CharacterList = ({ characters, loading, error, compact = false }) => {
  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  if (characters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No characters found</p>
        <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 ml-1">
        Characters ({characters.length})
      </h2>
      <hr className='mb-1' />
      {
        compact ? (
          <div className="space-y-0.5">
            {
              characters.map(character => (
                <CharacterCard key={character.id} character={character} compact />
              ))
            }
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {
              characters.map(character => (
                <CharacterCard key={character.id} character={character} />
              ))
            }
          </div>
        )
      }
    </div>
  );
};