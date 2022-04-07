// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import axios from 'axios';

// const config = {
//   apiKey: "AIzaSyDjsMu6na3PEIottwAfdQe_zezU1lPC3ZM",
//   authDomain: "maigo-399b5.firebaseapp.com",
//   databaseURL: "https://maigo-399b5.firebaseio.com",
//   projectId: "maigo-399b5"
// };

// const AUTH = 'FJvGdOdKYj0zyLTuAUytNKYDY0j341ZjgNpbDNdU';

// firebase.initializeApp(config);
// firebase.auth().signInAnonymously()
// .catch((error) => {
//   console.log (error.code + '\n' + error.message);
// })

// // firebase.auth().onAuthStateChanged(function(user) {
// //   if (user) {
// //     // User is signed in.
// //     // console.log(user.isAnonymous + ' : ' + user.uid);
// //   } else {
// //     // User is signed out.
// //   }
// // });

// export default {
//   likes: {
//     get: (cb) => {
//       axios.get(`https://maigo-399b5.firebaseio.com/likes.json?auth=${AUTH}`)
//         .then((succ) => {
//           cb(succ.data);
//         })
//         .catch((err)=> {
//           console.log(err);
//       });
//     },
//     getBySeries: (series, cb) => {
//       axios.get(`https://maigo-399b5.firebaseio.com/likes/${series}.json?auth=${AUTH}`)
//         .then((succ) => {
//           cb(succ.data);
//         })
//         .catch((err)=> {
//           console.log(err);
//       });
//     },
//     getLiked: (series, cb) => {
//       firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//           axios.get(`https://maigo-399b5.firebaseio.com/users/${user.uid}/${series}.json?auth=${AUTH}`)
//             .then((succ) => {
//               cb(succ.data);
//             })
//             .catch((err)=> {
//               console.log(err);
//           });
//         } else {
//         }
//       });
//     },
//     add: (series, cb) => {
//       firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//           axios.get(`https://maigo-399b5.firebaseio.com/likes/${series}.json?auth=${AUTH}`)
//           .then((succ) => {
//             let newLikeAmt = {
//               [series]: Number(succ.data) + 1
//             };
//             axios.patch(`https://maigo-399b5.firebaseio.com/likes.json?auth=${AUTH}`,
//             newLikeAmt)
//             .then((succ) => {
//               cb(true);
//             })
//             .catch((err)=> {
//               console.log(err);
//             });
//           })
//           .catch((err)=> {
//             console.log(err);
//           });

//           // add to user
//           axios.patch(`https://maigo-399b5.firebaseio.com/users/${user.uid}.json?auth=${AUTH}`,
//           { [series]: true })
//           .then((succ) => {
//             // cb(true);
//           })
//           .catch((err)=> {
//             console.log(err);
//           });

//         } else {
//           // User is signed out.
//         }
//       });
//     },
//     delete: (series, cb) => {
//       firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//           axios.get(`https://maigo-399b5.firebaseio.com/likes/${series}.json?auth=${AUTH}`)
//             .then((succ) => {
//               let newLikeAmt = {
//                 [series]: Number(succ.data) - 1
//               };
//               axios.patch(`https://maigo-399b5.firebaseio.com/likes.json?auth=${AUTH}`,
//               newLikeAmt)
//               .then((succ) => {
//                 cb(true);
//               })
//               .catch((err)=> {
//                 console.log(err);
//               });
//           })
//           .catch((err)=> {
//             console.log(err);
//           });

//           // remove from user
//           axios.patch(`https://maigo-399b5.firebaseio.com/users/${user.uid}.json?auth=${AUTH}`,
//           { [series]: false })
//           .then((succ) => {
//             // cb(true);
//           })
//           .catch((err)=> {
//             console.log(err);
//           });
//         } else {
//         }
//       });
//     }
//   }
// };