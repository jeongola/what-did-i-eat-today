import { useNavigate } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import ExerciseItem from './ExerciseItem';
import { DiaryDispatchContext } from './../App.js';

const exerciseList = [
  {
    exercise_id: 1,
    exercise_img: process.env.PUBLIC_URL + `/assets/exercise1.png`,
    exercise_descript: 'gained weight',
  },
  {
    exercise_id: 2,
    exercise_img: process.env.PUBLIC_URL + `/assets/exercise2.png`,
    exercise_descript: 'weakened',
  },
  {
    exercise_id: 3,
    exercise_img: process.env.PUBLIC_URL + `/assets/exercise3.png`,
    exercise_descript: 'healthy',
  },
  {
    exercise_id: 4,
    exercise_img: process.env.PUBLIC_URL + `/assets/exercise4.png`,
    exercise_descript: 'muscled up',
  },
  {
    exercise_id: 5,
    exercise_img: process.env.PUBLIC_URL + `/assets/exercise5.png`,
    exercise_descript: 'gym rat',
  },
];

const getStrDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const contentRef = useRef();
  const [content, setContent] = useState('');
  const [exercise, setExercise] = useState(3);
  const [date, setDate] = useState(getStrDate(new Date()));

  const { onCreate } = useContext(DiaryDispatchContext);

  const handleClickExercise = (exercise) => {
    setExercise(exercise);
  };
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, exercise);
    navigate('/', { replace: true });
  };

  return (
    <div className='DiaryEditor'>
      <MyHeader
        headText={'What did I eat today?'}
        leftChild={<MyButton text={'< go back'} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>today's date</h4>
          <div className='input_box'>
            <input
              className='input_date'
              value={date}
              type='date'
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>today's exercise</h4>
          <div className='input_box exercise_list_wrapper'>
            {exerciseList.map((it) => (
              <ExerciseItem
                onClick={handleClickExercise}
                isselected={it.exercise_id === exercise}
                key={it.exercise_id}
                {...it}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>today's diary</h4>
          <div className='input_box text_wrapper'>
            <textarea
              placeholder='what did you eat today?'
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className='control_box'>
            <MyButton text={'cancel'} onClick={() => navigate(-1)} />
            <MyButton text={'Done'} type={'positive'} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
