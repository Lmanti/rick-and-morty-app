import { useQuery, useMutation } from '@apollo/client';
import { GET_COMMENTS, ADD_COMMENT } from '../graphql/queries';

export const useComments = (characterId) => {
  const { data, loading, error, refetch } = useQuery(GET_COMMENTS, {
    variables: { characterId },
    fetchPolicy: 'network-only'
  });

  const [addCommentMutation] = useMutation(ADD_COMMENT);

  const addComment = async (text, author) => {
    await addCommentMutation({
      variables: {
        input: { characterId, text, author }
      }
    });
    await refetch();
  };

  return {
    comments: data?.comments || [],
    loading,
    error,
    addComment
  };
};