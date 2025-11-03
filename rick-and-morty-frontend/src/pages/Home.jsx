import { useParams } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterFilters } from '../components/characters/CharacterFilters';
import { CharacterList } from '../components/characters/CharacterList';
import { StarredList } from '../components/starred/StarredList';
import { CharacterDetail } from '../components/characters/CharacterDetail';
import { CharacterDetailPage } from './CharacterDetailPage';

export const Home = () => {
  const { id } = useParams();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  const {
    characters,
    loading,
    error
  } = useCharacters();

  if (!isDesktop && id) {
    return <CharacterDetailPage />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1">
        <div className="lg:sticky lg:top-4 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900"> Rick and Morty list </h1>
          <CharacterFilters /> 
          <StarredList />
          {
            isDesktop && (
              <CharacterList characters={characters} loading={loading} error={error} compact />
            )
          }
        </div>
      </aside>
      <main className="lg:col-span-3">
        {
          id ? ( <CharacterDetail /> ) :
          (
            <div className="hidden lg:flex items-center justify-center min-h-[400px] card">
              <div className="text-center px-6">
                <div className="text-6xl mb-4">👈</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2"> Select a character </h2>
                <p className="text-gray-600"> Click on any character from the list to see their details </p>
              </div>
            </div>
          )
        }
        {
          !isDesktop && (
            <CharacterList characters={characters} loading={loading} error={error} compact />
          )
        }
      </main>
    </div>
  );
};