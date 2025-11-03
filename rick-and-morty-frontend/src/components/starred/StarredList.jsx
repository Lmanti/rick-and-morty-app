import { useAppSelector } from '../../redux/hooks';
import { selectStarredCharacters } from '../../redux/slices/starredSlice';
import { CharacterCard } from '../characters/CharacterCard';

export const StarredList = () => {
  const starredCharacters = useAppSelector(selectStarredCharacters);

  if (starredCharacters.length !== 0) {
    return (
      <div className="mb-8 mt-8">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 ml-1">
          Starred Characters ({starredCharacters.length})
        </h2>
        <hr className='mb-1' />
        <div className="space-y-0.5">
          {
            starredCharacters.map(character =>
              ( <CharacterCard key={character.id} character={character} compact /> )
            )
          }
        </div>
      </div>
    );
  }
};