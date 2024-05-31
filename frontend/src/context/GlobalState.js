// import { createContext, useEffect, useReducer } from "react";
// import { AppReducer } from "./AppReducer";

// // Initial State
// const initialState = {
//   // watchList: [],
//   // watched: [],

//   // local storage
//   watchList: localStorage.getItem("watchList")
//     ? JSON.parse(localStorage.getItem("watchList"))
//     : [],
//   watched: localStorage.getItem("watched")
//     ? JSON.parse(localStorage.getItem("watched"))
//     : [],
// };

// // create Context

// export const GlobalContext = createContext();

// export const GlobalContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AppReducer, initialState);

//   useEffect(() => {
//     localStorage.setItem("watchList", JSON.stringify(state.watchList));
//     localStorage.setItem("watched", JSON.stringify(state.watched));
//   }, [state]);

//   // actions
//   const addMovieToWatchlist = (movie) => {
//     console.log("1");
//     dispatch({ type: "ADD_MOVIE_TO_WATCH_LIST", payload: movie });
//   };

//   const removeMovieFromWatchList = (id) => {
//     dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
//   };

//   const addMovieToWatched = (movie) => {
//     console.log("2");
//     dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
//   };

//   const moveToWatchlist = (movie) => {
//     dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
//   };

//   const removeFromWatched = (id) => {
//     dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
//   };

//   return (
//     <GlobalContext.Provider
//       value={{
//         watchList: state.watchList,
//         watched: state.watched,
//         addMovieToWatchlist,
//         removeMovieFromWatchList,
//         addMovieToWatched,
//         moveToWatchlist,
//         removeFromWatched,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

import { createContext, useEffect, useReducer } from "react";
import { AppReducer } from "./AppReducer";

const initialState = {
  watchList: [],
  watched: [],
};

// Create Context
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      fetchUserLists(token);
    }
  }, []);

  const fetchUserLists = async (token) => {
    const response = await fetch('https://movie-server-eight.vercel.app/userLists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });
    const data = await response.json();
    if (data.success) {
      dispatch({ type: "SET_WATCHLIST", payload: data.watchList });
      dispatch({ type: "SET_WATCHED", payload: data.watched });
    }
  };

  const getToken = () => localStorage.getItem("auth-token");

  // Actions
  const addMovieToWatchlist = async (movie) => {
    const token = getToken();
    await fetch('https://movie-server-eight.vercel.app/addMovieToWatchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({ movie }),
    });
    dispatch({ type: "ADD_MOVIE_TO_WATCH_LIST", payload: movie });
  };

  const removeMovieFromWatchList = async (id) => {
    const token = getToken();
    await fetch(`https://movie-server-eight.vercel.app/removeMovieFromWatchlist/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  const addMovieToWatched = async (movie) => {
    const token = getToken();
    await fetch('https://movie-server-eight.vercel.app/addMovieToWatched', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({ movie }),
    });
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  const moveToWatchlist = async (movie) => {
    const token = getToken();
    await fetch('https://movie-server-eight.vercel.app/moveToWatchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({ movie }),
    });
    dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
  };

  const removeFromWatched = async (id) => {
    const token = getToken();
    await fetch(`https://movie-server-eight.vercel.app/removeFromWatched/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchList: state.watchList,
        watched: state.watched,
        addMovieToWatchlist,
        removeMovieFromWatchList,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
