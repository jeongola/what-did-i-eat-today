import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';

const DiaryItem = ({ id, exercise, content, date }) => {
  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };
  return (
    <div className='DiaryItem'>
      <div onClick={goDetail} className='exercise_img_wrapper'>
        <img alt='/' src={process.env.PUBLIC_URL + `assets/exercise${exercise}.png`} />
      </div>
      <div onClick={goDetail} className='info_wrapper'>
        <div className='diary_date'>{strDate}</div>
        <div className='diary_content'>{content.slice(0, 25)}</div>
      </div>
      <div className='btn_wrapper'>
        <MyButton onClick={goEdit} text={'수정하기'} />
      </div>
    </div>
  );
};

export default DiaryItem;
