import Vue from 'vue';
import Vuex from 'vuex';
import {
  GET_POSTS,
  ADD_POST,
  SEARCH_POSTS,
  SIGNIN_USER,
  SIGNUP_USER,
  GET_CURRENT_USER,
  GET_USER_POSTS,
  UPDATE_USER_POST,
  DELETE_USER_POST,
  INFINITE_SCROLL_POSTS
} from './queries';
import { defaultClient as apolloClient } from './main';
import router from './router';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    userPosts: [],
    searchResults: [],
    user: null,
    loading: false,
    error: null,
    authError: null
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
    setSearchResults(state, payload){
      if(payload !== null){
        state.searchResults = payload;
      }
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setUserPosts: (state, payload) => {
      state.userPosts = payload;
    },
    clearUser(state) {
      state.user = null;
    },
    clearError(state) {
      state.error = null;
    },
    clearSearchResults(state){
      state.searchResults = []
    },
    setError(state, payload) {
      state.error = payload;
    },
    setAuthError(state, payload) {
      state.authError = payload;
    }
  },
  getters: {
    posts: state => state.posts,
    userPosts: state => state.userPosts,
    searchResults: state => state.searchResults,
    loading: state => state.loading,
    user: state => state.user,
    userFavorites: state => state.user && state.user.favorites,
    error: state => state.error,
    authError: state => state.authError
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          commit('setLoading', false);
          commit('setUser', data.getCurrentUser);
        })
        .catch(err => {
          commit('setLoading', false);
          localStorage.removeItem('token')
          router.push('/')
          // console.error('getCurrentUser',err);
        });
    },
    getPosts({ commit }) {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data }) => {
          commit('setPosts', data.getPosts);
          commit('setLoading', false);
        })
        .catch(err => {
          commit('setLoading', false);
          console.error('getPosts',err);
        });
    },
    getUserPosts: ({ commit }, payload) => {
      apolloClient
        .query({
          query: GET_USER_POSTS,
          variables: payload
        })
        .then(({ data }) => {
          commit("setUserPosts", data.getUserPosts);
          // console.log(data.getUserPosts);
        })
        .catch(err => {
          console.error(err);
        });
    },
    updateUserPost: ({ state, commit }, payload) => {
      apolloClient
        .mutate({
          mutation: UPDATE_USER_POST,
          variables: payload
        })
        .then(({ data }) => {
          const index = state.userPosts.findIndex(
            post => post._id === data.updateUserPost._id
          );
          const userPosts = [
            ...state.userPosts.slice(0, index),
            data.updateUserPost,
            ...state.userPosts.slice(index + 1)
          ];
          commit("setUserPosts", userPosts);
        })
        .catch(err => {
          console.error(err);
        });
    },
    deleteUserPost: ({ state, commit }, payload) => {
      apolloClient
        .mutate({
          mutation: DELETE_USER_POST,
          variables: payload
        })
        .then(({ data }) => {
          const index = state.userPosts.findIndex(
            post => post._id === data.deleteUserPost._id
          );
          const userPosts = [
            ...state.userPosts.slice(0, index),
            ...state.userPosts.slice(index + 1)
          ];
          commit("setUserPosts", userPosts);
        })
        .catch(err => {
          console.error(err);
        });
    },
    searchPosts({commit}, payload){
      apolloClient.query({
        query: SEARCH_POSTS,
        variables: payload
      }).then(({data}) => {
        commit('setSearchResults', data.searchPosts)
      }).catch(err => console.error(err))
    },
    addPost({ commit }, payload) {
      apolloClient.mutate({
        mutation: ADD_POST,
        variables: payload,
        update: (cache, {data: {addPost}}) => {
          const data = cache.readQuery({query: GET_POSTS})
          data.getPosts.unshift(addPost)
          cache.writeQuery({
            query: GET_POSTS,
            data
          })
        },
        optimisticResponse: {
          __typename: "Mutation",
          addPost: {
            __typename: "Post",
            _id: -1,
            ...payload
          }
        },
        // Rerun specified queries after performing the mutation in order to get fresh data
        refetchQueries: [
          {
            query: INFINITE_SCROLL_POSTS,
            variables: {
              pageNum: 1,
              pageSize: 2
            }
          }
        ]
      })
      .then(({data}) => {
        
      })
      .catch(err => console.error('addPost',err))
    },
    signinUser({ commit }, payload) {
      commit('clearError');
      commit('setLoading', true);
      localStorage.setItem('token', '');
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false);
          localStorage.setItem('token', data.signinUser.token);
          router.push('/');
        })
        .catch(err => commit('setError', err));
        commit('setLoading', false);
    },
    signupUser: ({ commit }, payload) => {
      commit('clearError');
      commit('setLoading', true);
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false);
          localStorage.setItem('token', data.signupUser.token);
          // to make sure created method is run in main.js (we run getCurrentUser), reload the page
          router.go();
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err);
          console.error('signupUser',err);
        });
    },
    async signoutUser({ commit }, payload) {
      // clear user in state
      commit('clearUser');
      // remove token in localstorage
      localStorage.setItem('token', '');
      // end session
      console.dir(apolloClient);
      await apolloClient.resetStore();
      //redirect home
      router.push('/');
    }
  }
});
