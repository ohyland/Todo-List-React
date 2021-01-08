Adding Redux

Redux keeps our application state in one place so we can access it from any component without having to pass it in from a parent component.

Part 1 - Setting up the stores and adding todos
------
Steps for adding a Redux store to you application

1. We need to add some pacakges
    - yarn add react-redux redux recompose
  And their corresponding types
    - yarn add @types/react-redux @types/recompose
2. Add the redux store in your src/index.tsx file
    - const store = createStore()
    - import the createStore function
3.  Wrap your <App/> with the redux <Provider> like so:
    - <Provider store={store}>
        <App />
      </Provider>
    - import the Provider component
    This will make our redux store available to all of the components across the app

4. createStore will be complaining that we didn't pass in a reducer, we will add it in later - we need to create one first!

5. So in redux world we have this idea that when you want something to update state in your app we dispatch an Action that goes off to the reducer to tell it to update the state with its payload. A good example is when we click our submit button to add a todo we will now dispatch an action with the todo object as the payload. Inside the reducer it will update the state. That's it. That's all we are doing.

6. So now lets set up our reducer. 
    - create a new folder src/reducers
    - create a new file inside called todos.reducer.ts
    - create an empty object called defaultState
    - create a function called reducer that takes two arguments state and action

7. DefaultState
    This is what your state looks like when the application loads up first. It is similar to how we previously set the state in the <App/> like this: 
     -  const [todos, setTodos] = useState<Todo[]>([]);

    There we set it to an empty array and told useState to expect an array of Todo's. Let's do the same now for our defaultState.
    - type DefaultState = { todos: Todo[] };
    - const defaultState: DefaultState = { todos: [] };
    We've declared the type DefaultState and then we created our defaultState object and set it's type to DefaultState. So this means our defaultState is of type DefaultState and we are also initialising it with a property called todos and setting it to an empty array.
    +++++++++++++++++
8. The reducer  
    Next we move onto our reducer funtion that we created earlier. There are two arguments, state and action. The state argument is our state and we will set this to the defaultState to begin with. Later, when we dispatch actions this will get updated.

        - const reducer = (state = defaultState, action) => {
            return state;
        };
        export default reducer

    When the app starts, our todos will be empty, just like when we used local state in V2.
    Now go back to the src/index.tsx and pass in our newly created reducer to the createStore function

        - const store = createStore(reducer);
        - import the reducer

9. OK, so far we have our store setup but we can't actually update it. We need to dispatch actions for that to happen. Our actions will dispatch when the user does something in our app, like in this case when they click the submit button to add a todo. Before we set that up let's do some housecleaning
    - App.tsx
        - remove the handle add and remove functions
        - remove the local state 
        - remove the props we were passing in to the CreateTodo and the ListTodos components, we will get what we need from the redux store inside of these components later on.
        - comment out the <ListTodos /> component for now otherwise typescript will complain
10. Dispatching an action. 
    An action is just a function that returns a plain object with two properties - the type and the payload. The type describes what you want to do (ADD_TODO) and the payload is the data (a single todo). 
    - create a new folder called src/actions
    - create a file inside called todos.actions.ts
    - create an exported function called addTodoAction which takes in one argument named todo and returns an object with 
        - type: "ADD_TODO" 
        - payload: todo
11. Dispatching the action
    In the CreateTodo.tsx file you can remove the OuterProps type because we aren't expecting any props to be passed in from the outside anymore. At the bottom of your file, outside of the CreateTodo component we are going to create a new function called mapDispatchToProps. This is a function you will be using a lot. We use this function to dispatch our actions from our components.

    This is what it should look like:

        const mapDispatchToProps = (dispatch) => {
            return {
                addTodo: (todo: Todo) => dispatch(addTodoAction(todo))
            }
        }
        export default connect(null, mapDispatchToProps)(CreateTodo);

    Lets break it down.

    In your handleSubmit you have a function called addTodo. Previously you passed this function in from the parent component and you had it available as one of your props, your outer props. Now it's made available through this special function mapDispatchToProps and becomes part of our InnerProps.
    
    We still need to get addTodo from our props, meaning we access it either by typing props.addTodo inside our component or we destructure like we were already doing.
    
    Later we will come back and add in the correct types for our InnerProps.

    The dispatch function is provided by redux, it doesn't need to be imported.

    The last line is using another function called connect (from the react-redux package) to connect our CreateTodo component to our redux store.

    Don't forget to import your addTodoAction and the connect function.

12. Back to the reducer

    Now we need to listen for the action when it gets dispatched and update our state. For this we can use a switch statement. It's similar to an if else statement and is commonly used inside reducer funtions when using redux. The idea is that we check the type of the action (ADD_TODO) and then we decide what we want to to with it's payload (a todo).

    When we recieve an ADD_TODO action type we want to keep everything we already have in state(in bigger applications we would have more than just one thing in state), keep everything that's inside our todo array, and lastly update our todos with the new todo.

         switch (action.type) {
            case "ADD_TODO": {
                return { ...state, todos: [...state.todos, action.payload] };
            }
            default: 
            return state

    so if the action.type === "ADD_TODO" then keep everything in state, everything currently in our todos, and add the new todo we recieved from the action.payload.
    
    Copy/paste the above code into the body of your reducer function.

13. Testing 
    - We are going to use a browser extension called redux dev tools. Get it from the chrome web store
        - https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
    - In your index.tsx file copy this over your createStore function
    
        const store = createStore(
            reducer,
            (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        );
        
    - yarn start your app, open the dev tools in chrome and find the Redux tab
    - inside the redux dev tools, click the state tab so that we can watch the state updating
    - Create a todo and hit submit, you should see your todos being added to the state!
    - Notice the name of your action being dispatched in the inspector window of the redux dev tools. If you click on an action you can see the type and the payload
    
Part 2 - Displaying the todos stored in our redux store
In this section we will once again connect to our redux store but this time it is to access the current state.
------

1. Uncomment the List componenent in App.tsx
2. Inside the List component, remove the OuterProps, we are going to connect to the store to retrieve our todos. We use a functon called mapStateToProps to connect to our store. Outside of the component paste this:

        const mapStateToProps = (state) => {
            return {
            todos: state.todos,
        };
        };
        export default connect(mapStateToProps)(List);

3. Delete the removeTodo prop, so it should look like
 - const List = ({ todos }) => {...}
4. Comment out the Button for now
5. You should see your todos (minus the button) in your app everytime you submit a new todo
Part 3 - Remove Todos
So now you should have enough info that you can create your own action to reomve a todo. You need to        
    - create the action
    - dispatch the action when an event occurs
    - update the state in your reducer