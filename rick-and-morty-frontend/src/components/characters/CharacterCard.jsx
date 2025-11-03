import { useNavigate, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleStarred, selectIsStarred } from '../../redux/slices/starredSlice';

export const CharacterCard = ({ character, compact = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: currentId } = useParams();
  const isStarred = useAppSelector(selectIsStarred(character.id));
  const isActive = currentId === character.id.toString();

  const handleToggleStar = (e) => {
    e.stopPropagation();
    dispatch(toggleStarred(character));
  };

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };

  if (compact) {
    return (
      <div onClick={handleClick} className={` flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${isActive ? 'bg-primary/10 border-2 border-primary shadow-sm' : 'bg-white hover:bg-gray-50 border-2 border-transparent' } group `} >
        <img src={character.image} alt={character.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-white" />
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium truncate ${ isActive ? 'text-primary' : 'text-gray-900' }`}>
            {character.name}
          </h3>
          <p className="text-sm text-gray-500 truncate"> {character.species?.name} </p>
        </div>
        <button onClick={handleToggleStar} className="opacity-0 group-hover:opacity-100 transition-opacity p-1" aria-label="Toggle starred" >
          <Heart className={`w-4 h-4 ${ isStarred ? 'fill-green-500 text-green-500' : 'text-gray-400' }`} />
        </button>
      </div>
    );
  }

  return (
    <div onClick={handleClick} className="card overflow-hidden group cursor-pointer transform transition-all hover:scale-[1.02]" >
      <div className="relative">
        <img src={character.image} alt={character.name} className="w-full h-48 object-cover" />
        <button onClick={handleToggleStar} className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10" aria-label="Toggle starred" >
          <Heart className={`w-5 h-5 ${ isStarred ? 'fill-green-500 text-green-500' : 'text-gray-400' }`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate"> {character.name} </h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ character.status?.name === 'Alive' ? 'bg-green-500' : character.status?.name === 'Dead' ? 'bg-red-500' : 'bg-gray-400' }`} />
            <span className="text-gray-600 truncate"> {character.status?.name} - {character.species?.name} </span>
          </div>
          {
            character.origin && (
              <p className="text-gray-500 truncate"> Origin: {character.origin.name || 'Unknown'} </p>
            )
          }
        </div>
      </div>
    </div>
  );
};