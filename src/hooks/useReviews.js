import { useQuery, useMutation } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

const useReviews = (variables) => { 
    const { data, error, loading, refetch/* fetchMore, ...result */ } = useQuery(AUTHORIZED_USER, {
        variables,
        fetchPolicy: 'cache-and-network',
        // Other options
    }); 
    const [mutate/* , result */] = useMutation(DELETE_REVIEW); 

      const deleteReview = async (id) => { 
          try {
              const data = await mutate({ variables: { id } }); 
          } catch (e) {
              console.log('DELETE REVIEW ERROR', e)
          }
      }

    // const handleFetchMore = () => {
    //     const canFetchMore =
    //         !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    //     if (!canFetchMore) {
    //         return;
    //     }

        // fetchMore({
        //     query: GET_REPOSITORY,
        //     variables: {
        //         after: data.repository.reviews.pageInfo.endCursor,
        //         ...variables,
        //     },
        //     updateQuery: (previousResult, { fetchMoreResult }) => {
        //         const nextResult = {
        //             repository: {
        //                 ...fetchMoreResult.repository,
        //                 reviews: {
        //                     ...fetchMoreResult.repository.reviews,
        //                     edges: [
        //                         ...previousResult.repository.reviews.edges,
        //                         ...fetchMoreResult.repository.reviews.edges,
        //                     ],
        //                 }
        //             },
        //         };

        //         return nextResult;
        //     },
        // });
    // };

    const reviews = data && data.authorizedUser.reviews || undefined;
    return { reviews, error, loading, refetch, deleteReview/*  fetchMore: handleFetchMore, ...result  */ };
};

export default useReviews;