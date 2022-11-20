import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { getStrDate } from './../Util/date';
import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import { exerciseList } from '../Util/exerciseList';

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert('No diary page!');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className='DiaryPage'>Loading...</div>;
  } else {
    const currentExerciseData = exerciseList.find(
      (it) => parseInt(it.exercise_id) === parseInt(data.exercise),
    );
    console.log(currentExerciseData);
    return (
      <div className='DiaryPage'>
        <MyHeader
          headText={`${getStrDate(new Date(data.date))}`}
          leftChild={<MyButton text={'< back'} onClick={() => navigate(-1)} />}
          rightChild={<MyButton text={'Edit'} onClick={() => navigate(`/edit/${data.id}`)} />}
        />
        <article>
          <section>
            <h4>My Body Condition Today</h4>
            <div className='diary_img_wrapper'>
              <img alt='/' src={currentExerciseData.exercise_img} style={{ width: 300 }} />
              <div className='exercise_descript'>{currentExerciseData.exercise_descript}</div>
            </div>
          </section>
          <section>
            <h4>today's diary</h4>
            <div className='diary_content_wrapper'>
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
