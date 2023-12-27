// import React, { useState } from 'react';
// import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation, gql } from '@apollo/client';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe("pk_test_51ORgtSSCCAPHVW4G3wOr5vYTTyhQNFtp5Za20W2xyR3DJT6FQaPqY1E6ymNUNUFGjNmjhOCH7ZFc1tyO5P4KxMRu0003jPGqgX");

// const client = new ApolloClient({
//     uri: 'http://localhost:5000/graphql',
//     cache: new InMemoryCache(),
// });

// const GET_TASKS = gql`
//     query {
//         tasks {
//             id
//             title
//             description
//             time
//             pro
//         }
//     }
// `;

// const ADD_TASK = gql`
//     mutation AddTask($title: String!, $description: String!, $time: String!, $pro: Boolean!) {
//         addTask(input: { title: $title, description: $description, time: $time, pro: $pro }) {
//             task {
//                 id
//                 title
//                 description
//                 time
//                 pro
//             }
//         }
//     }
// `;

// const UPDATE_TASK = gql`
//     mutation UpdateTask($id: Int!, $title: String!, $description: String!, $time: String!, $pro: Boolean!) {
//         updateTask(id: $id, input: { title: $title, description: $description, time: $time, pro: $pro }) {
//             task {
//                 id
//                 title
//                 description
//                 time
//                 pro
//             }
//         }
//     }
// `;

// const DELETE_TASK = gql`
//     mutation DeleteTask($id: Int!) {
//         deleteTask(id: $id) {
//             success
//         }
//     }
// `;

// function App() {
//     const { loading, error, data } = useQuery(GET_TASKS);
//     const [addTask] = useMutation(ADD_TASK);
//     const [updateTask] = useMutation(UPDATE_TASK);
//     const [deleteTask] = useMutation(DELETE_TASK);
//     const [newTask, setNewTask] = useState({ title: '', description: '', time: '', pro: false });

//     const handleAddTask = async (e) => {
//         e.preventDefault();
//         if (newTask.title.trim() !== '' && newTask.description.trim() !== '' && newTask.time.trim() !== '') {
//             await addTask({
//                 variables: { ...newTask },
//                 refetchQueries: [{ query: GET_TASKS }],
//             });
//             setNewTask({ title: '', description: '', time: '', pro: false });
//         }
//     };

//     const handleUpdateTask = async (id, title, description, time, pro) => {
//         await updateTask({
//             variables: { id, title, description, time, pro },
//             refetchQueries: [{ query: GET_TASKS }],
//         });
//     };

//     const handleDeleteTask = async (id) => {
//         await deleteTask({
//             variables: { id },
//             refetchQueries: [{ query: GET_TASKS }],
//         });
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//     return (
//         <div>
//             <h1>To-Do List</h1>
//             <form onSubmit={handleAddTask}>
//                 <label>Title:</label>
//                 <input
//                     type="text"
//                     value={newTask.title}
//                     onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//                 />
//                 <label>Description:</label>
//                 <input
//                     type="text"
//                     value={newTask.description}
//                     onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//                 />
//                 <label>Time:</label>
//                 <input
//                     type="text"
//                     value={newTask.time}
//                     onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
//                 />
//                 <label>Pro:</label>
//                 <input
//                     type="checkbox"
//                     checked={newTask.pro}
//                     onChange={(e) => setNewTask({ ...newTask, pro: e.target.checked })}
//                 />
//                 <button type="submit">Add Task</button>
//             </form>
//             <ul>
//                 {data.tasks.map((task) => (
//                     <li key={task.id}>
//                         {task.title} - {task.description} - {task.time} - {task.pro ? 'Pro' : 'Free'}
//                         <button
//                             onClick={() => handleUpdateTask(
//                                 task.id,
//                                 prompt('Enter updated task title:', task.title),
//                                 prompt('Enter updated task description:', task.description),
//                                 prompt('Enter updated task time:', task.time),
//                                 prompt('Enter updated task pro status (true/false):', task.pro)
//                             )}
//                         >
//                             Update
//                         </button>
//                         <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// function AppWrapper() {
//     return (
//         <ApolloProvider client={client}>
//             <Elements stripe={stripePromise}>
//                 <App />
//             </Elements>
//         </ApolloProvider>
//     );
// }

// export default AppWrapper;




// import React, { useState } from 'react';
// import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation, gql } from '@apollo/client';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51ORgtSSCCAPHVW4G3wOr5vYTTyhQNFtp5Za20W2xyR3DJT6FQaPqY1E6ymNUNUFGjNmjhOCH7ZFc1tyO5P4KxMRu0003jPGqgX');  // Replace with your actual Stripe public key

// const client = new ApolloClient({
//     uri: 'http://localhost:5000/graphql',
//     cache: new InMemoryCache(),
// });

// const GET_TASKS = gql`
//     query {
//         tasks {
//             id
//             title
//             description
//             time
//         }
//     }
// `;

// const ADD_TASK = gql`
//     mutation AddTask($title: String!, $description: String!, $time: String!) {
//         addTask(input: { title: $title, description: $description, time: $time }) {
//             task {
//                 id
//                 title
//                 description
//                 time
//             }
//         }
//     }
// `;

// const UPDATE_TASK = gql`
//     mutation UpdateTask($id: Int!, $title: String!, $description: String!, $time: String!) {
//         updateTask(id: $id, input: { title: $title, description: $description, time: $time }) {
//             task {
//                 id
//                 title
//                 description
//                 time
//             }
//         }
//     }
// `;

// const DELETE_TASK = gql`
//     mutation DeleteTask($id: Int!) {
//         deleteTask(id: $id) {
//             success
//         }
//     }
// `;

// const BUY_PRO_LICENSE = gql`
//     mutation BuyProLicense {
//         proLicense {
//             success
//         }
//     }
// `;

// function App() {
//     const { loading, error, data } = useQuery(GET_TASKS);
//     const [addTask] = useMutation(ADD_TASK);
//     const [updateTask] = useMutation(UPDATE_TASK);
//     const [deleteTask] = useMutation(DELETE_TASK);
//     const [buyProLicense] = useMutation(BUY_PRO_LICENSE);
//     const [newTask, setNewTask] = useState({ title: '', description: '', time: '' });

//     const handleAddTask = async (e) => {
//         e.preventDefault();
//         if (newTask.title.trim() !== '' && newTask.description.trim() !== '' && newTask.time.trim() !== '') {
//             await addTask({
//                 variables: { ...newTask },
//                 refetchQueries: [{ query: GET_TASKS }],
//             });
//             setNewTask({ title: '', description: '', time: '' });
//         }
//     };

//     const handleUpdateTask = async (id, title, description, time) => {
//         await updateTask({
//             variables: { id, title, description, time },
//             refetchQueries: [{ query: GET_TASKS }],
//         });
//     };

//     const handleDeleteTask = async (id) => {
//         await deleteTask({
//             variables: { id },
//             refetchQueries: [{ query: GET_TASKS }],
//         });
//     };

//     const handleBuyProLicense = async () => {
//         // In a real scenario, you'd integrate with Stripe to initiate the payment
//         // For now, we'll simulate a successful payment
//         const { data } = await buyProLicense();
//         if (data.proLicense.success) {
//             alert('Pro License purchased successfully!');
//             // Additional logic for handling a successful payment
//         } else {
//             alert('Pro License purchase failed!');
//             // Additional logic for handling a failed payment
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//     return (
//         <div>
//             <h1>To-Do List</h1>
//             <form onSubmit={handleAddTask}>
//                 <label>Title:</label>
//                 <input
//                     type="text"
//                     value={newTask.title}
//                     onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//                 />
//                 <label>Description:</label>
//                 <input
//                     type="text"
//                     value={newTask.description}
//                     onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//                 />
//                 <label>Time:</label>
//                 <input
//                     type="text"
//                     value={newTask.time}
//                     onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
//                 />
//                 <button type="submit">Add Task</button>
//             </form>
//             <ul>
//                 {data.tasks.map((task) => (
//                     <li key={task.id}>
//                         {task.title} - {task.description} - {task.time}
//                         <button
//                             onClick={() => handleUpdateTask(
//                                 task.id,
//                                 prompt('Enter updated task title:', task.title),
//                                 prompt('Enter updated task description:', task.description),
//                                 prompt('Enter updated task time:', task.time)
//                             )}
//                         >
//                             Update
//                         </button>
//                         <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//             <button onClick={handleBuyProLicense}>Buy Pro License</button>
//         </div>
//     );
// }

// function AppWrapper() {
//     return (
//         <ApolloProvider client={client}>
//             <App />
//         </ApolloProvider>
//     );
// }

// export default AppWrapper;



// import React, { useState } from 'react';
// import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation, gql } from '@apollo/client';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51ORgtSSCCAPHVW4G3wOr5vYTTyhQNFtp5Za20W2xyR3DJT6FQaPqY1E6ymNUNUFGjNmjhOCH7ZFc1tyO5P4KxMRu0003jPGqgX');


// const client = new ApolloClient({
//     uri: 'http://localhost:5000/graphql',
//     cache: new InMemoryCache(),
// });

// const GET_TASKS = gql`
//     query {
//         tasks {
//             id
//             title
//             description
//             time
//             hasProLicense
//         }
//     }
// `;

// const ADD_TASK = gql`
//     mutation AddTask($title: String!, $description: String!, $time: String!) {
//         addTask(input: { title: $title, description: $description, time: $time }) {
//             task {
//                 id
//                 title
//                 description
//                 time
//                 hasProLicense
//             }
//         }
//     }
// `;

// const UPDATE_TASK = gql`
//     mutation UpdateTask($id: Int!, $title: String!, $description: String!, $time: String!) {
//         updateTask(id: $id, input: { title: $title, description: $description, time: $time }) {
//             task {
//                 id
//                 title
//                 description
//                 time
//                 hasProLicense
//             }
//         }
//     }
// `;

// const DELETE_TASK = gql`
//     mutation DeleteTask($id: Int!) {
//         deleteTask(id: $id) {
//             success
//         }
//     }
// `;

// const UPGRADE_TO_PRO_LICENSE = gql`
//     mutation UpgradeToProLicense($stripeToken: String!) {
//         upgradeToProLicense(input: { stripeToken: $stripeToken }) {
//             success
//         }
//     }
// `;


// function App() {
//     const { loading, error, data } = useQuery(GET_TASKS);
//     const [addTask] = useMutation(ADD_TASK);
//     const [updateTask] = useMutation(UPDATE_TASK);
//     const [deleteTask] = useMutation(DELETE_TASK);
//     const [upgradeToProLicense] = useMutation(UPGRADE_TO_PRO_LICENSE);
//     const [newTask, setNewTask] = useState({ title: '', description: '', time: '' });

//     const handleAddTask = async (e) => {
//         e.preventDefault();
//         if (newTask.title.trim() !== '' && newTask.description.trim() !== '' && newTask.time.trim() !== '') {
//             await addTask({
//                 variables: { ...newTask },
//                 refetchQueries: [{ query: GET_TASKS }],
//             });
//             setNewTask({ title: '', description: '', time: '' });
//         }
//     };

//     const handleUpdateTask = async (id, title, description, time) => {
//         await updateTask({
//             variables: { id, title, description, time },
//             refetchQueries: [{ query: GET_TASKS }],
//         });
//     };

//     const handleDeleteTask = async (id) => {
//         await deleteTask({
//             variables: { id },
//             refetchQueries: [{ query: GET_TASKS }],
//         });
//     };

//     const handleUpgradeToProLicense = async () => {
//         // Use Stripe.js to handle the payment and get the token
//         const { token, error } = await stripePromise.createToken();
//         if (token) {
//             // Call the GraphQL mutation to upgrade to Pro License
//             const result = await upgradeToProLicense({
//                 variables: { stripeToken: token.id },
//             });

//             if (result.data.upgradeToProLicense.success) {
//                 // Payment successful, update the UI or take appropriate actions
//                 console.log('Upgrade to Pro License successful!');
//             } else {
//                 // Payment failed, handle the error
//                 console.error('Upgrade to Pro License failed!');
//             }
//         } else {
//             // Handle Stripe.js error
//             console.error('Error creating Stripe token:', error);
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//     return (
//         <div>
//             <h1>To-Do List</h1>
//             <form onSubmit={handleAddTask}>
//                 {/* ... (existing form fields) */}
//                 <button type="submit">Add Task</button>
//             </form>
//             <ul>
//                 {data.tasks.map((task) => (
//                     <li key={task.id}>
//                         {task.title} - {task.description} - {task.time}
//                         {task.hasProLicense ? (
//                             <>
//                                 <button
//                                     onClick={() => handleUpdateTask(
//                                         task.id,
//                                         prompt('Enter updated task title:', task.title),
//                                         prompt('Enter updated task description:', task.description),
//                                         prompt('Enter updated task time:', task.time)
//                                     )}
//                                 >
//                                     Update
//                                 </button>
//                                 <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
//                             </>
//                         ) : (
//                             <button onClick={handleUpgradeToProLicense}>Upgrade to Pro</button>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// function AppWrapper() {
//     return (
//         <ApolloProvider client={client}>
//             <Elements stripe={stripePromise}>
//                 <App />
//             </Elements>
//         </ApolloProvider>
//     );
// }

// export default AppWrapper;





import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql,useMutation} from '@apollo/client';
import './styles.css';

import StripeContainer from './components/StripeContainer';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
});

const GET_TASKS = gql`
    query {
        tasks {
            id
            title
            description
            time
        }
    }
`;
const ADD_TASK = gql`
    mutation AddTask($title: String!, $description: String!, $time: String!) {
        addTask(input: { title: $title, description: $description, time: $time }) {
            task {
                id
                title
                description
                time
            }
        }
    }
`;

const UPDATE_TASK = gql`
    mutation UpdateTask($id: Int!, $title: String!, $description: String!, $time: String!) {
        updateTask(id: $id, input: { title: $title, description: $description, time: $time }) {
            task {
                id
                title
                description
                time
            }
        }
    }
`;
const DELETE_TASK = gql`
    mutation DeleteTask($id: Int!) {
        deleteTask(id: $id) {
            success
        }
    }
`;

function App() {
    const { loading, error, data } = useQuery(GET_TASKS);
    const [addTask] = useMutation(ADD_TASK);
    const [updateTask] = useMutation(UPDATE_TASK);
    const [showItem, setShowItem] = useState(false);
    const [deleteTask] = useMutation(DELETE_TASK);
    const [newTask, setNewTask] = useState({ title: '', description: '', time: '' });

  //   const handleAddTask = async () => {
  //     const title = prompt('Enter task title:');
  //     if (title) {
  //         await addTask({
  //             variables: { title },
  //             refetchQueries: [{ query: GET_TASKS }],
  //         });
  //     }
  // };
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.title.trim() !== '' && newTask.description.trim() !== '' && newTask.time.trim() !== '') {
        await addTask({
            variables: { ...newTask },
            refetchQueries: [{ query: GET_TASKS }],
        });
        setNewTask({ title: '', description: '', time: '' });
    }
};
const handleUpdateTask = async (id, title, description, time) => {
  await updateTask({
      variables: { id, title, description, time },
      refetchQueries: [{ query: GET_TASKS }],
  });
};

const handleDeleteTask = async (id) => {
  await deleteTask({
      variables: { id },
      refetchQueries: [{ query: GET_TASKS }],
  });
};
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  //   return (
  //     <div>
  //         <h1>To-Do List</h1>
  //         <button onClick={handleAddTask}>Add Task</button>
  //         <ul>
  //             {data.tasks.map((task) => (
  //                 <li key={task.id}>{task.title}</li>
  //             ))}
  //         </ul>
  //     </div>
  // );
  return (
    <div>
        <h1>To-Do List</h1>
        <form onSubmit={handleAddTask}>
            <label>Title:</label>
            <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <label>Description:</label>
            <input
                type="text"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <label>Time:</label>
            <input
                type="text"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            />
            <button type="submit">Add Task</button>
        </form>
        <ul>
            {data.tasks.map((task) => (
                <li key={task.id}>
                    {task.title} - {task.description} - {task.time}
                    <button
                        onClick={() => handleUpdateTask(
                            task.id,
                            prompt('Enter updated task title:', task.title),
                            prompt('Enter updated task description:', task.description),
                            prompt('Enter updated task time:', task.time)
                        )}
                    >
                        Update
                    </button>
                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
        {/* <h1>The Spatula Store</h1>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<h3>$10.00</h3>
					<img src={spatula} alt='Spatula' />
					<button onClick={() => setShowItem(true)}>Purchase Spatula</button>
				</>
			)} */}
    </div>
);
}

function AppWrapper() {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
}

export default AppWrapper;
