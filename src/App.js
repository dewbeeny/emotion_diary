import React, { useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';

//component
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [...action.data, ...state];
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
      break;
      }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1709272051205,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1709272051206,
  },
   {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1709272051207,
  },
    {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1709272051208,
  },
     {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1709272051209,
  },
]

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData)

  const dataId = useRef(0);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      emotion,
      },
    })
    dataId.current += 1;
  }
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",targetId
    })
  }
  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      }
    });
  }

  return (
    //data state 공급
    <DiaryStateContext.Provider value={data}> 
      <DiaryDispatchContext.Provider //전달 받은 data를 변경 할 수 있도록 하는 함수들을 뒤에서 받음. 
        value={{
          onCreate,
          onEdit,
          onRemove,
      }}>
      <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/diary' element={<Diary />} />
          <Route path='/new' element={<New />} />
          <Route path='/edit' element={<Edit />} />
      </Routes>
    </div>
        </BrowserRouter>
        </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider >
  );
}

export default App;
