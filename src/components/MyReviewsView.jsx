import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Text from './Text';
import Loading from './Loading';
/* import SubmitButton from './SubmitButton';
import RepositoryListItem from './RepositoryList/RepositoryListItem';
import { useParams } from "react-router-native";
import useRepository from './../hooks/useRepository';
import * as Linking from 'expo-linking';
import theme from '../theme';
import { format } from 'date-fns'; */
import { ReviewItem } from './RepositoryView';
import useReviews from './../hooks/useReviews';


/* const mockItem = { 
    id: 'jaredpalmer.formik',
    fullName: ' ',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1619,
    stargazersCount: 21856,
    ratingAverage: 88,
    reviewCount: 3,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
}; */

const ItemSeparator = () => <View style={styles.separator} />;

/* const RepositoryInfo = ({ item, handleShowGithub }) => {
    return (
        <View>
            <RepositoryListItem item={item} />
            <View style={styles.buttonContainer}>
                <SubmitButton text='Open in Github' onSubmit={handleShowGithub} />
            </View>
            <ItemSeparator />
        </View>
    );
}; */

/* 
const ReviewItem = ({ review }) => {
    return <View style={styles.container}>
        <View style={styles.ratingContainer}>
            <Text fontWeight='bold' style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.body}>
            <Text fontWeight='bold'>{review.user.username}</Text>
            <Text color='textSecondary'>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
            <Text style={styles.textContainer}>{review.text}</Text>
        </View>
    </View>
}; */

const MyReviewsView = () => {

    //const { id } = useParams();
    const { reviews, error, loading, /* fetchMore */ } = useReviews({ includeReviews: true });
    const reviewNodes = reviews
        ? reviews.edges.map((edge) => edge.node)
        : [];
    console.log('My REVIEWS', reviewNodes.length)

    /*   const handleShowGithub = () => {
          console.log('SHOW IN GITHUB', id);
          Linking.openURL(repository.url);
      } */

    const onEndReach = () => {
        console.log('END HAS BEEN REACHED')
        // fetchMore();
    };

    /* if (loading) {
        return <Loading />
    } */
    if (error) {
        return <View><Text>Error...</Text></View>
    }
    return (
        <View style={styles.root}>
            {!loading && <FlatList
                data={reviewNodes}
                renderItem={({ item }) => <ReviewItem review={item} myReview />}
                keyExtractor={({ id }) => id}
                // ListHeaderComponent={() => <RepositoryInfo item={repository} handleShowGithub={handleShowGithub} />}
                ItemSeparatorComponent={ItemSeparator}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />}
            {loading && <Loading />}
        </View>
    );
}

export default MyReviewsView;

const styles = StyleSheet.create({
    root: {
        marginBottom: 80,
    },
    /*  buttonContainer: {
         backgroundColor: 'white',
     }, */
    /* container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },
    ratingContainer: {
        flexGrow: 0.5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rating: {
        fontSize: 12,
        color: theme.colors.primary,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderRadius: 20,
        width: 40,
        height: 40,
        textAlign: 'center',
        paddingVertical: 10,
    }, */
    /*   body: {
          flexGrow: 4,
          maxWidth: '85%'
      },
      textContainer: {
          width: '90%',
          marginTop: 2,
      }, */
    separator: {
        height: 10,
    },
});